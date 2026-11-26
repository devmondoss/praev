/**
 * Applies db/migrations/NNN_name.sql in order, each in its own transaction,
 * and records a SHA-256 checksum so an applied file can never change silently.
 * Usage: npm run db:migrate
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { loadEnvConfig } from "@next/env";
import postgres from "postgres";
import { parseServerEnv } from "../src/lib/env";
import { MIGRATION_FILE, planMigrations } from "../src/server/db/migrations";

const LOCK_ID = 7_310_001; // arbitrary advisory lock id for praev migrations

async function main() {
  loadEnvConfig(process.cwd());
  const env = parseServerEnv(process.env);
  const url = env.DATABASE_URL_UNPOOLED ?? env.DATABASE_URL;
  if (!url) throw new Error("Falta DATABASE_URL (o DATABASE_URL_UNPOOLED)");

  const local = ["localhost", "127.0.0.1"].includes(new URL(url).hostname);
  const sql = postgres(url, { max: 1, ssl: local ? false : "require", onnotice: () => {} });
  try {
    const dir = path.join(process.cwd(), "db", "migrations");
    const names = (await readdir(dir)).filter((n) => MIGRATION_FILE.test(n));
    const files = await Promise.all(
      names.map(async (name) => ({ name, sql: await readFile(path.join(dir, name), "utf8") })),
    );

    await sql`select pg_advisory_lock(${LOCK_ID})`;
    await sql`create table if not exists schema_migrations (
      name text primary key,
      checksum text not null check (checksum ~ '^[0-9a-f]{64}$'),
      applied_at timestamptz not null default now()
    )`;
    const applied = await sql<{ name: string; checksum: string }[]>`select name, checksum from schema_migrations`;
    const pending = planMigrations(files, applied);

    if (pending.length === 0) {
      console.log(`Base de datos al día (${applied.length} migraciones aplicadas).`);
      return;
    }
    for (const migration of pending) {
      await sql.begin(async (tx) => {
        await tx.unsafe(migration.sql);
        await tx`insert into schema_migrations (name, checksum) values (${migration.name}, ${migration.checksum})`;
      });
      console.log(`Aplicada ${migration.name}`);
    }
  } finally {
    await sql`select pg_advisory_unlock(${LOCK_ID})`.catch(() => {});
    await sql.end();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
