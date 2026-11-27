/**
 * Tesis sellada `praev.thesis.v1` (docs/04-domain/04-forecast.md, ADR-025/026).
 *
 * En la cadena solo queda `commitment = SHA256(c14n(ThesisPayload))`. La sal de
 * 32 bytes impide descubrir la probabilidad probando los 10 001 valores
 * posibles. Este módulo es puro y corre igual en el navegador (antes de
 * firmar) y en el servidor (prepare, revelado y verificador).
 */
import { z } from "zod";

import {
  bytesToHex,
  canonicalBytes,
  hashEquals,
  isCanonicalJson,
  isHash32Hex,
  sha256Hex,
} from "@/lib/hash";
import { bps, httpsUrl, stellarAccount, text, unixSeconds, uuidLower } from "@/lib/schemas/common";

export const THESIS_SCHEMA = "praev.thesis.v1";

export const THESIS_LIMITS = {
  factors: 3,
  factorLabel: 120,
  evidence: 8,
  evidenceUrl: 2048,
  changeMyMind: 240,
  note: 500,
  agentField: 120,
} as const;

const evidenceRef = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("praev"), ref: uuidLower }),
  z.strictObject({ kind: z.literal("url"), ref: httpsUrl(THESIS_LIMITS.evidenceUrl) }),
]);

const agentInfo = z.strictObject({
  model: text(THESIS_LIMITS.agentField, { required: true }),
  provider: text(THESIS_LIMITS.agentField, { required: true }),
  promptVersion: text(THESIS_LIMITS.agentField, { required: true }),
});

export const thesisPayloadSchema = z
  .strictObject({
    schema: z.literal(THESIS_SCHEMA),
    questionId: uuidLower,
    forecaster: stellarAccount,
    seq: z.int().min(1).max(0xffff_ffff),
    kind: z.enum(["human", "agent"]),
    probabilityBps: bps,
    anchorBps: bps.nullable(),
    factors: z
      .array(
        z.strictObject({
          label: text(THESIS_LIMITS.factorLabel, { required: true }),
          direction: z.enum(["up", "down"]),
        }),
      )
      .max(THESIS_LIMITS.factors),
    evidence: z.array(evidenceRef).max(THESIS_LIMITS.evidence),
    changeMyMind: text(THESIS_LIMITS.changeMyMind, { multiline: true }),
    note: text(THESIS_LIMITS.note, { multiline: true }),
    informationCutoff: unixSeconds,
    agent: agentInfo.nullable(),
    salt: z.string().refine(isHash32Hex, { message: "la sal debe ser 64 hex en minúsculas" }),
  })
  .superRefine((thesis, ctx) => {
    if (thesis.kind === "agent" && thesis.agent === null) {
      ctx.addIssue({ code: "custom", path: ["agent"], message: "obligatorio si kind = 'agent'" });
    }
    if (thesis.kind === "human" && thesis.agent !== null) {
      ctx.addIssue({ code: "custom", path: ["agent"], message: "debe ser null si kind = 'human'" });
    }
    const refs = thesis.evidence.map((e) => `${e.kind}:${e.ref}`);
    if (new Set(refs).size !== refs.length) {
      ctx.addIssue({ code: "custom", path: ["evidence"], message: "evidencia repetida" });
    }
  });

export type ThesisPayload = z.infer<typeof thesisPayloadSchema>;

export class ThesisValidationError extends Error {
  readonly issues: z.core.$ZodIssue[];

  constructor(issues: z.core.$ZodIssue[]) {
    super(`tesis inválida: ${issues.map((i) => `${i.path.join(".") || "$"} ${i.message}`).join("; ")}`);
    this.name = "ThesisValidationError";
    this.issues = issues;
  }
}

export function parseThesis(input: unknown): ThesisPayload {
  const result = thesisPayloadSchema.safeParse(input);
  if (!result.success) throw new ThesisValidationError(result.error.issues);
  return result.data;
}

/** 32 bytes de un CSPRNG (`crypto.getRandomValues`) en hex. Nunca reutilizar. */
export function generateSalt(): string {
  return bytesToHex(globalThis.crypto.getRandomValues(new Uint8Array(32)));
}

/** Valida la tesis y devuelve sus bytes canónicos y el compromiso a sellar. */
export async function sealThesis(
  input: unknown,
): Promise<{ thesis: ThesisPayload; bytes: Uint8Array<ArrayBuffer>; commitment: string }> {
  const thesis = parseThesis(input);
  const bytes = canonicalBytes(thesis);
  return { thesis, bytes, commitment: await sha256Hex(bytes) };
}

export type OpenedThesis =
  | { status: "match"; thesis: ThesisPayload }
  | { status: "mismatch" }
  | { status: "invalid"; reason: "not_canonical" | "schema"; issues?: z.core.$ZodIssue[] };

/**
 * Abre un compromiso con los bytes revelados, sin reserializar: primero el
 * hash de los bytes exactos, luego la forma canónica y el esquema. Comprobar
 * `questionId`/`forecaster`/`seq` contra la cadena y el corte temporal es
 * responsabilidad de quien llama (revelado, HU-47).
 */
export async function openCommitment(bytes: Uint8Array, commitment: string): Promise<OpenedThesis> {
  if (!isHash32Hex(commitment)) throw new Error("compromiso inválido: se esperan 64 hex");
  if (!hashEquals(await sha256Hex(bytes), commitment)) return { status: "mismatch" };
  if (!isCanonicalJson(bytes)) return { status: "invalid", reason: "not_canonical" };

  const parsed = thesisPayloadSchema.safeParse(JSON.parse(new TextDecoder().decode(bytes)));
  if (!parsed.success) return { status: "invalid", reason: "schema", issues: parsed.error.issues };
  return { status: "match", thesis: parsed.data };
}
