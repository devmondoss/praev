// HU-22: plantilla fx_daily y orquestación de createQuestion con Postgres
// real (PGlite) y una cadena falsa que registra cada llamada.
import { beforeEach, describe, expect, it } from "vitest";

import { fxDailySpec, scaleDecimal } from "@/domain/questions/templates/fx-daily";
import { hashQuestionSpec } from "@/domain/questions/spec";
import { chainIdFromUuid } from "@/lib/hash";
import { DEPLOYMENT } from "@/lib/stellar/deployment";
import { ensureDeployment } from "@/server/db/deployments";
import { getQuestion, listQuestions } from "@/server/db/questions";
import type { Db } from "@/server/db/sql";
import {
  createQuestion,
  expectedOnChain,
  type CreateQuestionArgs,
  type OnChainQuestion,
  type QuestionChain,
} from "@/server/questions/create";

import { migratedDb } from "../helpers/pglite";
import { CURATOR, fx, PET, RESOLVER } from "../helpers/specs";

const ID = "3a1f6c2e-7b4d-4e8a-9c10-2d3e4f5a6b7c";

describe("plantilla fx_daily", () => {
  const base = { id: ID, date: "2026-12-02", threshold: "3.5", country: "PE", mode: "LIVE" as const, curator: CURATOR, resolver: RESOLVER };

  it("reproduce los tiempos de la pregunta de ejemplo (cierre 18:00 PET del día anterior)", () => {
    const spec = fxDailySpec(base);
    expect(spec.closesAt).toBe(PET("2026-12-01T18:00:00"));
    expect(spec.observationStart).toBe(PET("2026-12-02T00:00:00"));
    expect(spec.observationEnd).toBe(PET("2026-12-03T00:00:00"));
    expect(spec.resolveAfter).toBe(fx().resolveAfter);
    expect(spec.resolveBy).toBe(fx().resolveBy);
    expect(spec.aggregation).toBe("single");
    expect(spec.missingPolicy).toBe("invalidate");
    expect(spec.title).toBe(
      "¿El tipo de cambio interbancario venta (S/ por US$) del BCRP del 2 dic 2026 será mayor que 3,500?",
    );
  });

  it("escala el umbral a 10^14 sin coma flotante", () => {
    expect(fxDailySpec({ ...base, threshold: "3.485" }).thresholdScaled).toBe(348_500_000_000_000);
    expect(fxDailySpec(base).scale).toBe(100_000_000_000_000);
    expect(scaleDecimal("0.1", 3)).toBe(100);
    expect(() => scaleDecimal("3.4855", 3)).toThrow(/3 decimales/);
    expect(() => scaleDecimal("3,48", 3)).toThrow(/punto decimal/);
    expect(() => scaleDecimal("-1", 3)).toThrow();
  });

  it("rechaza fines de semana, fechas inexistentes y países sin GO", () => {
    expect(() => fxDailySpec({ ...base, date: "2026-12-05" })).toThrow(/fin de semana/);
    expect(() => fxDailySpec({ ...base, date: "2026-12-06" })).toThrow(/fin de semana/);
    expect(() => fxDailySpec({ ...base, date: "2026-02-30" })).toThrow(/inexistente/);
    expect(() => fxDailySpec({ ...base, country: "MX" })).toThrow(/sin fuente/);
  });

  it("BR y AR usan su zona, escala y fuente; CO queda fuera (HU-45)", () => {
    const br = fxDailySpec({ ...base, country: "BR", threshold: "5.6500" });
    expect(br.closesAt).toBe(Date.parse("2026-12-01T18:00:00-03:00") / 1000);
    expect(br.thresholdScaled).toBe(56_500);
    expect(br.scale).toBe(10_000);
    expect(br.source.name).toBe("BCB");
    const ar = fxDailySpec({ ...base, country: "AR", threshold: "1630.50" });
    expect(ar.thresholdScaled).toBe(163_050);
    expect(ar.timezone).toBe("America/Argentina/Buenos_Aires");
    expect(ar.title).toContain("mayor que 1630,50");
    expect(() => fxDailySpec({ ...base, country: "CO" })).toThrow(/sin fuente/);
  });

  it("marca DEMO en el título y valida la spec completa", () => {
    const demo = fxDailySpec({ ...base, mode: "DEMO" });
    expect(demo.title.startsWith("DEMO: ")).toBe(true);
    expect(demo.source.url).toBe("urn:praev:fixture:fx-pe-2026-12-02");
    expect(() => fxDailySpec({ ...base, resolver: CURATOR })).toThrow(/resolver/);
  });
});

/** Cadena falsa: guarda lo creado y registra el orden de las llamadas. */
class FakeChain implements QuestionChain {
  readonly calls: string[] = [];
  readonly stored = new Map<string, OnChainQuestion>();
  failCreate = false;
  tamperReadback = false;

  async readQuestion(chainId: string) {
    this.calls.push("read");
    const q = this.stored.get(chainId) ?? null;
    return q && this.tamperReadback ? { ...q, specHash: "00".repeat(32) } : q;
  }

  async createQuestion(args: CreateQuestionArgs) {
    this.calls.push("create");
    if (this.failCreate) throw new Error("sin confirmación: estado desconocido");
    const { chainId, ...question } = args;
    this.stored.set(chainId, question);
    return { txHash: "ab".repeat(32), ledger: 1 };
  }
}

describe("createQuestion", () => {
  let db: Db;
  let deploymentId: string;
  let chain: FakeChain;
  const now = () => fx().closesAt - 86_400;
  const ports = () => ({ db, deploymentId, chain, curator: CURATOR, resolver: RESOLVER, now });

  beforeEach(async () => {
    db = await migratedDb();
    deploymentId = await ensureDeployment(db, DEPLOYMENT);
    chain = new FakeChain();
  });

  it("guarda DRAFT, crea on-chain, relee y solo entonces abre", async () => {
    const result = await createQuestion(ports(), fx());
    expect(result.outcome).toBe("created");
    expect(result.txHash).toBe("ab".repeat(32));
    expect(result.chainId).toBe(await chainIdFromUuid(fx().id));
    expect(chain.calls).toEqual(["read", "create", "read"]);
    expect(result.question.status).toBe("OPEN");
    expect(result.question.createdTx).toBe("ab".repeat(32));

    const { specHash } = await hashQuestionSpec(fx());
    expect(chain.stored.get(result.chainId)).toEqual(expectedOnChain(fx(), specHash));
  });

  it("si la tx no se confirma, la pregunta queda DRAFT y fuera del Radar", async () => {
    chain.failCreate = true;
    await expect(createQuestion(ports(), fx())).rejects.toThrow(/desconocido/);
    expect((await getQuestion(db, fx().id))?.status).toBe("DRAFT");
    expect(await listQuestions(db, deploymentId)).toEqual([]);
  });

  it("si el contrato no tiene lo esperado tras SUCCESS, no la abre", async () => {
    chain.tamperReadback = true;
    await expect(createQuestion(ports(), fx())).rejects.toThrow(/no se marca OPEN/);
    expect((await getQuestion(db, fx().id))?.status).toBe("DRAFT");
  });

  it("un reintento tras crear on-chain reconcilia sin crear otra vez", async () => {
    chain.failCreate = false;
    await createQuestion(ports(), fx());
    chain.calls.length = 0;
    const retry = await createQuestion(ports(), fx());
    expect(retry.outcome).toBe("already_on_chain");
    expect(chain.calls).toEqual(["read"]);
    expect(retry.question.createdTx).toBe("ab".repeat(32));
  });

  it("falla si el id ya está on-chain con otra spec", async () => {
    const chainId = await chainIdFromUuid(fx().id);
    const { specHash } = await hashQuestionSpec(fx());
    chain.stored.set(chainId, { ...expectedOnChain(fx(), specHash), specHash: "cd".repeat(32) });
    await expect(createQuestion(ports(), fx())).rejects.toThrow(/otros datos/);
    expect(chain.calls).not.toContain("create");
  });

  it("exige el curador del contrato y el resolvedor configurado", async () => {
    await expect(createQuestion({ ...ports(), curator: RESOLVER }, fx())).rejects.toThrow(/curador/);
    const other = "GCJ3KM7QAMN3XOYDIMBRAXSFHFBUPSGVA2KQGDPDX4UP7NY7LDQ36CEK";
    await expect(createQuestion({ ...ports(), resolver: other }, fx())).rejects.toThrow(/resolvedor/);
    expect(chain.calls).toEqual([]);
  });

  it("no publica si faltan menos de 5 minutos para el cierre", async () => {
    await expect(createQuestion({ ...ports(), now: () => fx().closesAt - 299 }, fx())).rejects.toThrow(/menos de 300/);
    expect(chain.calls).toEqual(["read"]);
  });

  it("rechaza una spec inválida antes de tocar la base o la cadena", async () => {
    await expect(createQuestion(ports(), { ...fx(), closesAt: fx().observationStart + 1 })).rejects.toThrow(/spec inválida/);
    expect(await getQuestion(db, fx().id)).toBeNull();
    expect(chain.calls).toEqual([]);
  });
});
