import { createHash } from "node:crypto";

export const MIGRATION_FILE = /^(\d{3})_[a-z0-9_]+\.sql$/;

export type MigrationFile = { name: string; sql: string };
export type AppliedMigration = { name: string; checksum: string };
export type PlannedMigration = MigrationFile & { checksum: string };

export function checksum(sql: string): string {
  return createHash("sha256").update(sql, "utf8").digest("hex");
}

/**
 * Decides which migrations still need to run. Refuses to continue if an
 * applied file changed, disappeared, or a new file sorts before an applied one.
 */
export function planMigrations(files: MigrationFile[], applied: AppliedMigration[]): PlannedMigration[] {
  for (const file of files) {
    if (!MIGRATION_FILE.test(file.name)) throw new Error(`Nombre de migración inválido: ${file.name}`);
  }
  const sorted = [...files].sort((a, b) => a.name.localeCompare(b.name));
  const numbers = sorted.map((f) => f.name.slice(0, 3));
  const duplicate = numbers.find((n, i) => numbers.indexOf(n) !== i);
  if (duplicate) throw new Error(`Número de migración duplicado: ${duplicate}`);

  const byName = new Map(sorted.map((f) => [f.name, f]));
  for (const done of applied) {
    const file = byName.get(done.name);
    if (!file) throw new Error(`La migración aplicada ${done.name} ya no existe`);
    if (checksum(file.sql) !== done.checksum) throw new Error(`La migración aplicada ${done.name} fue modificada`);
  }

  const appliedNames = new Set(applied.map((a) => a.name));
  const lastApplied = [...appliedNames].sort().at(-1);
  const pending = sorted.filter((f) => !appliedNames.has(f.name));
  if (lastApplied && pending.some((f) => f.name < lastApplied)) {
    throw new Error(`Hay una migración nueva anterior a ${lastApplied}; renumérala`);
  }
  return pending.map((f) => ({ ...f, checksum: checksum(f.sql) }));
}
