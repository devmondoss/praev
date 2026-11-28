// HU-18: la migración 001 y los repositorios contra Postgres real (PGlite,
// Postgres 18 en Wasm), sin red ni base compartida.
import { beforeEach, describe, expect, it } from "vitest";

import { sealThesis, type ThesisPayload } from "@/domain/forecasts/thesis";
import { hashQuestionSpec } from "@/domain/questions/spec";
import { bytesToHex, canonicalBytes, chainIdFromUuid } from "@/lib/hash";
import { DEPLOYMENT } from "@/lib/stellar/deployment";
import { ensureDeployment } from "@/server/db/deployments";
import { getQuestion, getSpecBytes, insertQuestion, listQuestions, SpecBytesError } from "@/server/db/questions";
import type { Db } from "@/server/db/sql";
import { advanceSyncState, getSyncState } from "@/server/db/sync";
import { insertThesisPayload, isRevealable, listRevealedTheses, ThesisBytesError } from "@/server/db/theses";

import { migratedDb } from "../helpers/pglite";
import { fx, rain } from "../helpers/specs";
const MAKER = "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF";
const OTHER_MAKER = "GCJ3KM7QAMN3XOYDIMBRAXSFHFBUPSGVA2KQGDPDX4UP7NY7LDQ36CEK";

let db: Db;
let deploymentId: string;

beforeEach(async () => {
  db = await migratedDb();
  deploymentId = await ensureDeployment(db, DEPLOYMENT);
});

async function storeFx() {
  const { bytes, specHash } = await hashQuestionSpec(fx());
  return insertQuestion(db, { deploymentId, specBytes: bytes, specHash, status: "OPEN" });
}

function thesisFor(overrides: Partial<ThesisPayload> = {}): ThesisPayload {
  return {
    schema: "praev.thesis.v1",
    questionId: fx().id,
    forecaster: MAKER,
    seq: 1,
    kind: "human",
    probabilityBps: 6200,
    anchorBps: 5500,
    factors: [{ label: "Presión compradora de fin de mes", direction: "up" }],
    evidence: [{ kind: "url", ref: "https://example.org/demo-fx" }],
    changeMyMind: "Si el BCRP interviene vendiendo dólares, bajo a 40 %.",
    note: "DEMO: tesis de prueba.",
    informationCutoff: fx().closesAt - 3600,
    agent: null,
    salt: "11".repeat(32),
    ...overrides,
  };
}

describe("migración 001_initial", () => {
  it("crea las tablas del esquema y ninguna de score", async () => {
    const tables = await db.query<{ table_name: string }>(
      `select table_name from information_schema.tables where table_schema = 'public' order by table_name`,
    );
    const names = tables.map((t) => t.table_name);
    expect(names).toEqual(
      [
        "actors",
        "ai_runs",
        "baselines",
        "chain_events",
        "deployments",
        "evidence",
        "forecasts",
        "question_proposals",
        "questions",
        "resolution_payloads",
        "resolutions",
        "sync_state",
        "thesis_payloads",
        "tx_intents",
      ].sort(),
    );
    expect(names.some((n) => n.includes("score"))).toBe(false);
  });

  it("Postgres rechaza bytes que no corresponden a su hash", async () => {
    await storeFx();
    const { bytes, commitment } = await sealThesis(thesisFor());
    const tampered = new Uint8Array(bytes);
    tampered[10] ^= 1;
    await expect(
      db.query(
        `insert into thesis_payloads (question_id, address, seq, commitment, probability_bps, payload_bytes, source)
         values ($1::uuid, $2, 1, $3, 6200, $4::bytea, 'prepare')`,
        [fx().id, MAKER, commitment, tampered],
      ),
    ).rejects.toThrow(/check constraint/);
  });

  it("Postgres exige chain_id = SHA256(uuid) y resolver ≠ curator", async () => {
    const { bytes, specHash } = await hashQuestionSpec(fx());
    const insert = (chainId: string, resolver: string) =>
      db.query(
        `insert into questions (id, deployment_id, chain_id, mode, category, subcategory, country, spec, spec_bytes,
           spec_hash, curator, resolver, closes_at, observation_start, observation_end, resolve_after, resolve_by,
           status, relevance, relevance_reason)
         values ($1::uuid, $2::uuid, $3, 'LIVE', 'economy_finance', 'fx_daily', 'PE', '{}'::jsonb, $4::bytea, $5,
           $6, $7, 1, 2, 3, 3, 4, 'OPEN', 'standard', 'motivo')`,
        [fx().id, deploymentId, chainId, bytes, specHash, fx().curator, resolver],
      );
    await expect(insert("ab".repeat(32), fx().resolver)).rejects.toThrow(/check constraint/);
    await expect(insert(await chainIdFromUuid(fx().id), fx().curator)).rejects.toThrow(/check constraint/);
  });
});

describe("despliegue", () => {
  it("es idempotente y no oculta un Wasm distinto", async () => {
    expect(await ensureDeployment(db, DEPLOYMENT)).toBe(deploymentId);
    await expect(ensureDeployment(db, { ...DEPLOYMENT, wasmHash: "00".repeat(32) })).rejects.toThrow(/otro Wasm/);
  });
});

describe("preguntas", () => {
  it("guarda los bytes exactos, el chain_id y la proyección", async () => {
    const { bytes, specHash } = await hashQuestionSpec(fx());
    const stored = await storeFx();
    expect(stored.chainId).toBe(await chainIdFromUuid(fx().id));
    expect(stored.specHash).toBe(specHash);
    expect(stored.spec).toEqual(fx());
    expect(bytesToHex((await getSpecBytes(db, fx().id))!)).toBe(bytesToHex(bytes));

    const [row] = await db.query<{ closes_at: unknown; relevance_reason: string }>(
      `select closes_at, relevance_reason from questions where id = $1::uuid`,
      [fx().id],
    );
    expect(Number(row!.closes_at)).toBe(fx().closesAt);
    expect(row!.relevance_reason).toBe(fx().relevanceReason);
  });

  it("la proyección jsonb es un objeto; un string JSON se rechaza (002)", async () => {
    await storeFx();
    const [row] = await db.query<{ t: string }>(`select jsonb_typeof(spec) as t from questions`);
    expect(row!.t).toBe("object");
    await expect(
      db.query(`update questions set spec = to_jsonb($1::text) where id = $2::uuid`, ['{"a":1}', fx().id]),
    ).rejects.toThrow(/questions_spec_is_object/);
  });

  it("es idempotente con la misma spec y rechaza otra spec con el mismo id", async () => {
    await storeFx();
    await storeFx();
    const changed = await hashQuestionSpec({ ...fx(), title: `${fx().title} (editada)` });
    await expect(
      insertQuestion(db, { deploymentId, specBytes: changed.bytes, specHash: changed.specHash, status: "OPEN" }),
    ).rejects.toThrow(/ya existe/);
  });

  it("verifica el hash, la forma canónica y el esquema antes de insertar", async () => {
    const { bytes, specHash } = await hashQuestionSpec(fx());
    await expect(insertQuestion(db, { deploymentId, specBytes: bytes, specHash: "00".repeat(32), status: "OPEN" })).rejects.toThrow(
      SpecBytesError,
    );
    const spaced = new TextEncoder().encode(JSON.stringify(fx(), null, 1));
    const spacedHash = bytesToHex(new Uint8Array(await crypto.subtle.digest("SHA-256", spaced)));
    await expect(insertQuestion(db, { deploymentId, specBytes: spaced, specHash: spacedHash, status: "OPEN" })).rejects.toThrow(
      /no son canónicos/,
    );
    const invalid = canonicalBytes({ ...fx(), resolver: fx().curator });
    const invalidHash = bytesToHex(new Uint8Array(await crypto.subtle.digest("SHA-256", invalid)));
    await expect(insertQuestion(db, { deploymentId, specBytes: invalid, specHash: invalidHash, status: "OPEN" })).rejects.toThrow(
      /spec inválida/,
    );
    expect(await getQuestion(db, fx().id)).toBeNull();
    expect(specHash).toHaveLength(64);
  });

  it("lista por cierre, filtra por modo y omite borradores", async () => {
    await storeFx();
    const demo = await hashQuestionSpec(rain());
    await insertQuestion(db, { deploymentId, specBytes: demo.bytes, specHash: demo.specHash, status: "OPEN" });
    expect((await listQuestions(db, deploymentId)).map((q) => q.spec.mode).sort()).toEqual(["DEMO", "LIVE"]);
    expect((await listQuestions(db, deploymentId, { mode: "DEMO" })).map((q) => q.id)).toEqual([rain().id]);
  });
});

describe("tesis selladas: regla de revelado (ADR-026, T30 en repositorio)", () => {
  it("isRevealable solo con un ledger conocido en o después del cierre", () => {
    expect(isRevealable(100, null)).toBe(false);
    expect(isRevealable(100, 99)).toBe(false);
    expect(isRevealable(100, 100)).toBe(true);
    expect(isRevealable(100, 101)).toBe(true);
  });

  it("no devuelve ninguna fila antes del cierre y todas después", async () => {
    await storeFx();
    const first = await sealThesis(thesisFor());
    const second = await sealThesis(thesisFor({ forecaster: OTHER_MAKER, probabilityBps: 3000 }));
    for (const sealed of [first, second]) {
      await insertThesisPayload(db, {
        questionId: fx().id,
        address: sealed.thesis.forecaster,
        seq: 1,
        commitment: sealed.commitment,
        bytes: sealed.bytes,
        source: "prepare",
      });
    }

    // Sin ledger indexado todavía: nada.
    expect(await listRevealedTheses(db, fx().id)).toEqual([]);
    // Un segundo antes del cierre: nada.
    await advanceSyncState(db, deploymentId, { cursor: "c1", lastLedger: 100, lastLedgerTime: fx().closesAt - 1 });
    expect(await listRevealedTheses(db, fx().id)).toEqual([]);
    // En el cierre exacto (el contrato ya rechaza tesis en t ≥ closesAt): todas.
    await advanceSyncState(db, deploymentId, { cursor: "c2", lastLedger: 101, lastLedgerTime: fx().closesAt });
    const revealed = await listRevealedTheses(db, fx().id);
    expect(revealed.map((r) => [r.address, r.thesis.probabilityBps])).toEqual(
      [
        [MAKER, 6200],
        [OTHER_MAKER, 3000],
      ].sort(),
    );
    expect(revealed[0]!.commitment).toMatch(/^[0-9a-f]{64}$/);
  });

  it("el reloj no retrocede con un reintento atrasado", async () => {
    await advanceSyncState(db, deploymentId, { cursor: "c2", lastLedger: 200, lastLedgerTime: 2000 });
    await advanceSyncState(db, deploymentId, { cursor: "c1", lastLedger: 150, lastLedgerTime: 1500 });
    expect(await getSyncState(db, deploymentId)).toEqual({ cursor: "c2", lastLedger: 200, lastLedgerTime: 2000 });
  });

  it("abre el compromiso antes de guardar y es idempotente", async () => {
    await storeFx();
    const sealed = await sealThesis(thesisFor());
    const input = {
      questionId: fx().id,
      address: MAKER,
      seq: 1,
      commitment: sealed.commitment,
      bytes: sealed.bytes,
      source: "prepare" as const,
    };
    await insertThesisPayload(db, input);
    await insertThesisPayload(db, input);
    const [count] = await db.query<{ n: unknown }>(`select count(*) as n from thesis_payloads`);
    expect(Number(count!.n)).toBe(1);

    const tampered = new Uint8Array(sealed.bytes);
    tampered[20] ^= 1;
    await expect(insertThesisPayload(db, { ...input, bytes: tampered })).rejects.toThrow(/no corresponden/);
    await expect(insertThesisPayload(db, { ...input, seq: 2 })).rejects.toThrow(ThesisBytesError);
    await expect(insertThesisPayload(db, { ...input, address: OTHER_MAKER })).rejects.toThrow(/no corresponde/);
  });
});
