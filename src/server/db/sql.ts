import "server-only";

import type postgres from "postgres";

/**
 * Interfaz mínima de consulta. Toda consulta usa placeholders `$n` con sus
 * valores aparte (nunca interpolación), así el mismo SQL corre en postgres.js
 * (producción) y en PGlite (tests de integración).
 */
export interface Db {
  query<T extends object>(text: string, params?: readonly unknown[]): Promise<T[]>;
  transaction<R>(fn: (tx: Db) => Promise<R>): Promise<R>;
}

type Queryable = Pick<postgres.Sql, "unsafe">;

function wrap(sql: Queryable, begin?: postgres.Sql["begin"]): Db {
  return {
    async query<T extends object>(text: string, params: readonly unknown[] = []) {
      const rows = await sql.unsafe(text, params as postgres.ParameterOrJSON<never>[]);
      return rows as unknown as T[];
    },
    async transaction<R>(fn: (tx: Db) => Promise<R>) {
      if (!begin) throw new Error("transacción anidada no soportada");
      return (await begin((tx) => fn(wrap(tx)))) as R;
    },
  };
}

export function postgresDb(sql: postgres.Sql): Db {
  return wrap(sql, sql.begin.bind(sql));
}

/** `int8` llega como string en postgres.js y como number/bigint en PGlite. */
export function toSafeInt(value: unknown, field: string): number {
  const n = typeof value === "bigint" ? Number(value) : Number(value);
  if (!Number.isSafeInteger(n)) throw new Error(`${field}: entero fuera de rango (${String(value)})`);
  return n;
}

export function toBytes(value: unknown, field: string): Uint8Array {
  if (!(value instanceof Uint8Array)) throw new Error(`${field}: se esperaba bytea`);
  return new Uint8Array(value);
}
