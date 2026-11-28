import "server-only";

import { type Db, toSafeInt } from "./sql";

/**
 * Makers distintos con al menos una tesis sellada por pregunta, desde la
 * proyección de la cadena (`forecasts`). Solo cuenta compromisos: no lee tesis.
 */
export async function countSealedMakers(db: Db, questionIds: readonly string[]): Promise<Map<string, number>> {
  const counts = new Map<string, number>(questionIds.map((id) => [id, 0]));
  if (questionIds.length === 0) return counts;
  const rows = await db.query<{ question_id: string; n: unknown }>(
    `select question_id, count(distinct address) as n from forecasts
     where question_id::text = any(string_to_array($1::text, ',')) group by question_id`,
    // Texto y no array: postgres.js y PGlite serializan los arrays distinto.
    [questionIds.join(",")],
  );
  for (const row of rows) counts.set(row.question_id, toSafeInt(row.n, "count"));
  return counts;
}
