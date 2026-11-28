import "server-only";

import type { Deployment } from "@/lib/stellar/deployment";

import type { Db } from "./sql";

/**
 * Registra el despliegue oficial y devuelve su id. Idempotente; si ya existe
 * una fila para el mismo contrato con otro Wasm o tx, falla en vez de ocultar
 * la discrepancia (01-database: ON CONFLICT no oculta payload distinto).
 */
export async function ensureDeployment(db: Db, deployment: Deployment): Promise<string> {
  await db.query(
    `insert into deployments (id, network, contract_id, wasm_hash, deploy_tx)
     values ($1::uuid, $2, $3, $4, $5)
     on conflict (network, contract_id) do nothing`,
    [crypto.randomUUID(), deployment.network, deployment.contractId, deployment.wasmHash, deployment.deployTx],
  );
  const [row] = await db.query<{ id: string; wasm_hash: string; deploy_tx: string }>(
    `select id, wasm_hash, deploy_tx from deployments where network = $1 and contract_id = $2`,
    [deployment.network, deployment.contractId],
  );
  if (!row) throw new Error(`no se pudo registrar el despliegue ${deployment.contractId}`);
  if (row.wasm_hash !== deployment.wasmHash || row.deploy_tx !== deployment.deployTx) {
    throw new Error(
      `el despliegue ${deployment.contractId} ya existe con otro Wasm o tx (${row.wasm_hash}, ${row.deploy_tx})`,
    );
  }
  return row.id;
}

/** Id del despliegue sin escribir: una lectura pública nunca registra filas. */
export async function findDeploymentId(db: Db, deployment: Deployment): Promise<string | null> {
  const [row] = await db.query<{ id: string }>(
    `select id from deployments where network = $1 and contract_id = $2`,
    [deployment.network, deployment.contractId],
  );
  return row?.id ?? null;
}
