import "server-only";

import { hashQuestionSpec, type QuestionSpec } from "@/domain/questions/spec";
import { chainIdFromUuid } from "@/lib/hash";
import { insertQuestion, markQuestionOpen, type StoredQuestion } from "@/server/db/questions";
import type { Db } from "@/server/db/sql";

/** Lo que el contrato guarda de una pregunta y hace falta comparar. */
export type OnChainQuestion = {
  specHash: string;
  curator: string;
  resolver: string;
  mode: number;
  closesAt: number;
  observationStart: number;
  observationEnd: number;
  resolveAfter: number;
  resolveBy: number;
};

export type CreateQuestionArgs = OnChainQuestion & { chainId: string };

export interface QuestionChain {
  readQuestion(chainId: string): Promise<OnChainQuestion | null>;
  /** Firma, envía y devuelve solo tras `SUCCESS` con el evento `q_created` esperado. */
  createQuestion(args: CreateQuestionArgs): Promise<{ txHash: string; ledger: number }>;
}

export type CreateQuestionPorts = {
  db: Db;
  deploymentId: string;
  chain: QuestionChain;
  curator: string;
  resolver: string;
  now: () => number;
};

export type CreateQuestionResult = {
  question: StoredQuestion;
  chainId: string;
  txHash: string | null;
  outcome: "created" | "already_on_chain";
};

/** Margen mínimo entre la creación y el cierre: una tx tarda segundos, no minutos. */
export const MIN_SECONDS_BEFORE_CLOSE = 300;

export function expectedOnChain(spec: QuestionSpec, specHash: string): OnChainQuestion {
  return {
    specHash,
    curator: spec.curator,
    resolver: spec.resolver,
    mode: spec.mode === "LIVE" ? 0 : 1,
    closesAt: spec.closesAt,
    observationStart: spec.observationStart,
    observationEnd: spec.observationEnd,
    resolveAfter: spec.resolveAfter,
    resolveBy: spec.resolveBy,
  };
}

function sameQuestion(a: OnChainQuestion, b: OnChainQuestion): boolean {
  return (Object.keys(a) as (keyof OnChainQuestion)[]).every((k) => a[k] === b[k]);
}

/**
 * Publica una pregunta (HU-22). Mismo camino para la CLI y, más adelante, la API:
 *  1. valida la spec y calcula `specHash` y `chainId`;
 *  2. guarda los bytes exactos como DRAFT (no aparece en el Radar);
 *  3. si ya está on-chain con los mismos datos, solo reconcilia; si difiere, falla;
 *  4. si no, crea on-chain y espera SUCCESS con su evento;
 *  5. relee el contrato, compara cada campo y pasa a OPEN con la tx.
 */
export async function createQuestion(ports: CreateQuestionPorts, input: unknown): Promise<CreateQuestionResult> {
  const { spec, bytes, specHash } = await hashQuestionSpec(input);
  if (spec.curator !== ports.curator) {
    throw new Error(`la spec nombra al curador ${spec.curator}, pero el contrato es de ${ports.curator}`);
  }
  if (spec.resolver !== ports.resolver) {
    throw new Error(`la spec nombra al resolvedor ${spec.resolver}, distinto del configurado ${ports.resolver}`);
  }
  const chainId = await chainIdFromUuid(spec.id);
  const expected = expectedOnChain(spec, specHash);

  await insertQuestion(ports.db, { deploymentId: ports.deploymentId, specBytes: bytes, specHash, status: "DRAFT" });

  const existing = await ports.chain.readQuestion(chainId);
  if (existing) {
    if (!sameQuestion(existing, expected)) {
      throw new Error(`la pregunta ${spec.id} ya existe on-chain con otros datos (specHash ${existing.specHash})`);
    }
    const question = await markQuestionOpen(ports.db, spec.id, null);
    return { question, chainId, txHash: question.createdTx, outcome: "already_on_chain" };
  }

  if (spec.closesAt - ports.now() < MIN_SECONDS_BEFORE_CLOSE) {
    throw new Error(`la pregunta cierra en menos de ${MIN_SECONDS_BEFORE_CLOSE} s: no se publica`);
  }

  const { txHash } = await ports.chain.createQuestion({ ...expected, chainId });
  const confirmed = await ports.chain.readQuestion(chainId);
  if (!confirmed || !sameQuestion(confirmed, expected)) {
    throw new Error(`tras ${txHash} el contrato no tiene la pregunta esperada; no se marca OPEN`);
  }
  const question = await markQuestionOpen(ports.db, spec.id, txHash);
  return { question, chainId, txHash, outcome: "created" };
}
