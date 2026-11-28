import "server-only";

import { openCommitment, type ThesisPayload } from "@/domain/forecasts/thesis";

import { type Db, toSafeInt } from "./sql";

/**
 * Única puerta a `thesis_payloads` (ADR-026, 01-database). Ninguna lectura
 * devuelve una tesis de una pregunta cuyo `closes_at` sea mayor que el tiempo
 * del último ledger conocido; si todavía no se conoce ninguno, no se revela nada.
 */
export function isRevealable(closesAt: number, lastLedgerTime: number | null): boolean {
  return lastLedgerTime !== null && closesAt <= lastLedgerTime;
}

export class ThesisBytesError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ThesisBytesError";
  }
}

export type NewThesisPayload = {
  questionId: string;
  address: string;
  seq: number;
  commitment: string;
  bytes: Uint8Array;
  source: "prepare" | "receipt" | "agent";
};

/**
 * Guarda los bytes exactos de una tesis después de abrir el compromiso:
 * hash, forma canónica, esquema y que la tesis sea de esa pregunta, maker y
 * versión. Reintentar con los mismos bytes no hace nada.
 */
export async function insertThesisPayload(db: Db, input: NewThesisPayload): Promise<ThesisPayload> {
  const opened = await openCommitment(input.bytes, input.commitment);
  if (opened.status === "mismatch") throw new ThesisBytesError("los bytes no corresponden al compromiso");
  if (opened.status === "invalid") throw new ThesisBytesError(`tesis inválida (${opened.reason})`);
  const { thesis } = opened;
  if (thesis.questionId !== input.questionId || thesis.forecaster !== input.address || thesis.seq !== input.seq) {
    throw new ThesisBytesError("la tesis no corresponde a esa pregunta, maker o versión");
  }
  await db.query(
    `insert into thesis_payloads (question_id, address, seq, commitment, probability_bps, payload_bytes, source)
     values ($1::uuid, $2, $3::integer, $4, $5::integer, $6::bytea, $7)
     on conflict (question_id, address, seq, commitment) do nothing`,
    [input.questionId, input.address, input.seq, input.commitment, thesis.probabilityBps, input.bytes, input.source],
  );
  return thesis;
}

export type RevealedThesis = {
  address: string;
  seq: number;
  commitment: string;
  thesis: ThesisPayload;
};

/**
 * Tesis guardadas de una pregunta ya cerrada según el último ledger indexado.
 * El filtro está en el SQL, no después: antes del cierre no sale ni una fila.
 */
export async function listRevealedTheses(db: Db, questionId: string): Promise<RevealedThesis[]> {
  const rows = await db.query<{ address: string; seq: unknown; commitment: string; payload_bytes: Uint8Array }>(
    `select t.address, t.seq, t.commitment, t.payload_bytes
     from thesis_payloads t
     join questions q on q.id = t.question_id
     join sync_state s on s.deployment_id = q.deployment_id
     where t.question_id = $1::uuid
       and s.last_ledger_time is not null
       and q.closes_at <= s.last_ledger_time
     order by t.address asc, t.seq asc`,
    [questionId],
  );
  const out: RevealedThesis[] = [];
  for (const row of rows) {
    const bytes = new Uint8Array(row.payload_bytes);
    const opened = await openCommitment(bytes, row.commitment);
    if (opened.status !== "match") {
      throw new ThesisBytesError(`payload guardado de ${row.address} seq ${String(row.seq)} no abre su compromiso`);
    }
    out.push({ address: row.address, seq: toSafeInt(row.seq, "seq"), commitment: row.commitment, thesis: opened.thesis });
  }
  return out;
}
