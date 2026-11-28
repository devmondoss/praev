import "server-only";

import type { RadarQuestion } from "@/lib/radar";
import { DEPLOYMENT } from "@/lib/stellar/deployment";
import { findDeploymentId } from "@/server/db/deployments";
import { countSealedMakers } from "@/server/db/forecasts";
import { listQuestions } from "@/server/db/questions";
import type { Db } from "@/server/db/sql";
import { getSyncState } from "@/server/db/sync";

/**
 * Preguntas publicadas del despliegue oficial. Solo lee columnas públicas
 * (spec, estado, tx de creación y conteo de compromisos): nunca `thesis_payloads`.
 */
export async function loadRadar(db: Db): Promise<RadarQuestion[]> {
  const deploymentId = await findDeploymentId(db, DEPLOYMENT);
  if (!deploymentId) return [];
  const questions = (await listQuestions(db, deploymentId)).filter(
    (q): q is typeof q & { status: RadarQuestion["status"] } => q.status !== "DRAFT" && q.status !== "REVIEW",
  );
  // Sin cursor del indexador el conteo sería un 0 no verificado: se muestra como pendiente.
  const indexed = (await getSyncState(db, deploymentId))?.lastLedger != null;
  const counts = indexed ? await countSealedMakers(db, questions.map((q) => q.id)) : null;
  return questions.map((q) => ({
    id: q.id,
    spec: q.spec,
    status: q.status,
    createdTx: q.createdTx,
    sealedMakers: counts ? (counts.get(q.id) ?? 0) : null,
  }));
}
