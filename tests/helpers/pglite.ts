import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { PGlite, type Transaction } from "@electric-sql/pglite";

import type { Db } from "@/server/db/sql";

const DIR = path.resolve(__dirname, "../../db/migrations");
const MIGRATIONS = readdirSync(DIR)
  .filter((name) => /^\d{3}_[a-z0-9_]+\.sql$/.test(name))
  .sort()
  .map((name) => readFileSync(path.join(DIR, name), "utf8"));

export function pgliteDb(pg: PGlite | Transaction): Db {
  return {
    async query<T extends object>(text: string, params: readonly unknown[] = []) {
      return (await pg.query<T>(text, [...params])).rows;
    },
    async transaction<R>(fn: (tx: Db) => Promise<R>) {
      if (!("transaction" in pg)) throw new Error("transacción anidada no soportada");
      return pg.transaction((tx) => fn(pgliteDb(tx)));
    },
  };
}

/** Postgres en memoria con todas las migraciones de db/migrations aplicadas en orden. */
export async function migratedDb(): Promise<Db> {
  const pg = new PGlite();
  for (const sql of MIGRATIONS) await pg.exec(sql);
  return pgliteDb(pg);
}
