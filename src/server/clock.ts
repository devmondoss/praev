import "server-only";

import { connection } from "next/server";

/**
 * Hora de la petición en segundos Unix. `connection()` primero: con Cache
 * Components un timestamp solo se lee en tiempo de petición, nunca en el
 * prerender (01-app/01-getting-started/08-caching).
 */
export async function requestNow(): Promise<number> {
  await connection();
  return Math.floor(Date.now() / 1000);
}
