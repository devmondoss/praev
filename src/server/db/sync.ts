import "server-only";

import { type Db, toSafeInt } from "./sql";

export type SyncState = { cursor: string | null; lastLedger: number | null; lastLedgerTime: number | null };

/**
 * Avanza el último ledger procesado. Nunca retrocede: un ledger o tiempo menor
 * que el guardado se ignora, para que un reintento atrasado no vuelva a ocultar
 * tesis ya reveladas ni reabra preguntas cerradas.
 */
export async function advanceSyncState(
  db: Db,
  deploymentId: string,
  next: { cursor: string | null; lastLedger: number; lastLedgerTime: number },
): Promise<SyncState> {
  await db.query(
    `insert into sync_state (deployment_id, cursor, last_ledger, last_ledger_time)
     values ($1::uuid, $2, $3::bigint, $4::bigint)
     on conflict (deployment_id) do update
       set cursor = excluded.cursor,
           last_ledger = excluded.last_ledger,
           last_ledger_time = excluded.last_ledger_time,
           updated_at = now()
     where sync_state.last_ledger is null
        or (excluded.last_ledger >= sync_state.last_ledger
            and excluded.last_ledger_time >= sync_state.last_ledger_time)`,
    [deploymentId, next.cursor, next.lastLedger, next.lastLedgerTime],
  );
  const state = await getSyncState(db, deploymentId);
  if (!state) throw new Error(`sin sync_state para ${deploymentId}`);
  return state;
}

export async function getSyncState(db: Db, deploymentId: string): Promise<SyncState | null> {
  const [row] = await db.query<{ cursor: string | null; last_ledger: unknown; last_ledger_time: unknown }>(
    `select cursor, last_ledger, last_ledger_time from sync_state where deployment_id = $1::uuid`,
    [deploymentId],
  );
  if (!row) return null;
  return {
    cursor: row.cursor,
    lastLedger: row.last_ledger === null ? null : toSafeInt(row.last_ledger, "last_ledger"),
    lastLedgerTime: row.last_ledger_time === null ? null : toSafeInt(row.last_ledger_time, "last_ledger_time"),
  };
}
