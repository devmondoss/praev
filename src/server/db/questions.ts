import "server-only";

import { parseQuestionSpec, type QuestionSpec } from "@/domain/questions/spec";
import { bytesToHex, canonicalBytes, chainIdFromUuid, isCanonicalJson, sha256Hex } from "@/lib/hash";

import type { Db } from "./sql";

export type QuestionStatus = "DRAFT" | "REVIEW" | "OPEN" | "RESOLVED" | "INVALID" | "CANCELLED";

export type StoredQuestion = {
  id: string;
  deploymentId: string;
  chainId: string;
  specHash: string;
  spec: QuestionSpec;
  status: QuestionStatus;
  createdTx: string | null;
  cancelReasonHash: string | null;
};

export class SpecBytesError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SpecBytesError";
  }
}

/**
 * Comprueba que `bytes` son exactamente `praev-c14n-v1(spec válida)` y que su
 * SHA-256 es `specHash`. Se guardan los bytes recibidos, nunca una
 * reserialización, para que el hash anclado se pueda recalcular siempre.
 */
export async function verifySpecBytes(bytes: Uint8Array, specHash: string): Promise<QuestionSpec> {
  if ((await sha256Hex(bytes)) !== specHash) throw new SpecBytesError("los bytes no corresponden al specHash");
  if (!isCanonicalJson(bytes)) throw new SpecBytesError("los bytes de la spec no son canónicos");
  const spec = parseQuestionSpec(JSON.parse(new TextDecoder().decode(bytes)));
  // La validación normaliza a NFC: si cambió algo, los bytes no eran la forma final.
  if (bytesToHex(canonicalBytes(spec)) !== bytesToHex(bytes)) {
    throw new SpecBytesError("la spec validada no reproduce los mismos bytes");
  }
  return spec;
}

type QuestionRow = {
  id: string;
  deployment_id: string;
  chain_id: string;
  spec_hash: string;
  spec: QuestionSpec;
  status: QuestionStatus;
  created_tx: string | null;
  cancel_reason_hash: string | null;
};

const COLUMNS = "id, deployment_id, chain_id, spec_hash, spec, status, created_tx, cancel_reason_hash";

function fromRow(row: QuestionRow): StoredQuestion {
  return {
    id: row.id,
    deploymentId: row.deployment_id,
    chainId: row.chain_id,
    specHash: row.spec_hash,
    spec: parseQuestionSpec(row.spec),
    status: row.status,
    createdTx: row.created_tx,
    cancelReasonHash: row.cancel_reason_hash,
  };
}

export type NewQuestion = {
  deploymentId: string;
  specBytes: Uint8Array;
  specHash: string;
  status: QuestionStatus;
  createdTx?: string | null;
};

/**
 * Inserta la pregunta tras verificar sus bytes. Idempotente si se repite con
 * la misma spec; si el id ya existe con otra spec, falla.
 */
export async function insertQuestion(db: Db, input: NewQuestion): Promise<StoredQuestion> {
  const spec = await verifySpecBytes(input.specBytes, input.specHash);
  const chainId = await chainIdFromUuid(spec.id);
  await db.query(
    `insert into questions (
       id, deployment_id, chain_id, mode, category, subcategory, country, requester,
       reference_threshold_bps, spec, spec_bytes, spec_hash, curator, resolver,
       closes_at, observation_start, observation_end, resolve_after, resolve_by,
       status, relevance, relevance_reason, created_tx)
     values ($1::uuid, $2::uuid, $3, $4, $5, $6, $7, $8, $9::integer, $10::jsonb, $11::bytea, $12, $13, $14,
       $15::bigint, $16::bigint, $17::bigint, $18::bigint, $19::bigint, $20, $21, $22, $23)
     on conflict (id) do nothing`,
    [
      spec.id,
      input.deploymentId,
      chainId,
      spec.mode,
      spec.category,
      spec.subcategory,
      spec.country,
      spec.requester,
      spec.referenceThresholdBps,
      new TextDecoder().decode(input.specBytes),
      input.specBytes,
      input.specHash,
      spec.curator,
      spec.resolver,
      spec.closesAt,
      spec.observationStart,
      spec.observationEnd,
      spec.resolveAfter,
      spec.resolveBy,
      input.status,
      spec.relevance,
      spec.relevanceReason,
      input.createdTx ?? null,
    ],
  );
  const stored = await getQuestion(db, spec.id);
  if (!stored || stored.specHash !== input.specHash || stored.deploymentId !== input.deploymentId) {
    throw new Error(`la pregunta ${spec.id} ya existe con otra spec o en otro despliegue`);
  }
  return stored;
}

export async function getQuestion(db: Db, id: string): Promise<StoredQuestion | null> {
  const [row] = await db.query<QuestionRow>(`select ${COLUMNS} from questions where id = $1::uuid`, [id]);
  return row ? fromRow(row) : null;
}

export async function listQuestions(
  db: Db,
  deploymentId: string,
  filter: { mode?: "LIVE" | "DEMO" } = {},
): Promise<StoredQuestion[]> {
  const rows = await db.query<QuestionRow>(
    `select ${COLUMNS} from questions
     where deployment_id = $1::uuid and status <> 'DRAFT' and ($2::text is null or mode = $2::text)
     order by closes_at asc, id asc`,
    [deploymentId, filter.mode ?? null],
  );
  return rows.map(fromRow);
}

/** Bytes guardados de la spec, re-verificados contra su hash al leer. */
export async function getSpecBytes(db: Db, id: string): Promise<Uint8Array | null> {
  const [row] = await db.query<{ spec_bytes: Uint8Array; spec_hash: string }>(
    `select spec_bytes, spec_hash from questions where id = $1::uuid`,
    [id],
  );
  if (!row) return null;
  const bytes = new Uint8Array(row.spec_bytes);
  if ((await sha256Hex(bytes)) !== row.spec_hash) throw new Error(`spec_bytes de ${id} no coincide con su hash`);
  return bytes;
}

