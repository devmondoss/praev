import "server-only";
import postgres from "postgres";
import { getServerEnv } from "@/server/env";

let client: postgres.Sql | undefined;

export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super("DATABASE_URL no está configurada");
    this.name = "DatabaseNotConfiguredError";
  }
}

export function isLocalDatabase(url: string): boolean {
  const { hostname } = new URL(url);
  return hostname === "localhost" || hostname === "127.0.0.1";
}

/**
 * Shared Postgres.js client. The pooled Neon URL runs through PgBouncer in
 * transaction mode, so prepared statements are disabled.
 */
export function getDb(): postgres.Sql {
  if (client) return client;
  const url = getServerEnv().DATABASE_URL;
  if (!url) throw new DatabaseNotConfiguredError();
  client = postgres(url, {
    max: 5,
    prepare: false,
    ssl: isLocalDatabase(url) ? false : "require",
    connect_timeout: 5,
  });
  return client;
}
