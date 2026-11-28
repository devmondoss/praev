// HU-27: modelo del Radar (puro) y su carga desde Postgres (PGlite).
import { describe, expect, it } from "vitest";

import { radarHref } from "@/components/radar/radar-filters";
import { hashQuestionSpec } from "@/domain/questions/spec";
import {
  countryName,
  formatPet,
  parseRadarFilters,
  phaseOf,
  type RadarQuestion,
  selectRadar,
  signalLabel,
} from "@/lib/radar";
import { DEPLOYMENT } from "@/lib/stellar/deployment";
import { ensureDeployment } from "@/server/db/deployments";
import { insertQuestion, markQuestionOpen } from "@/server/db/questions";
import { advanceSyncState } from "@/server/db/sync";
import { loadRadar } from "@/server/radar";

import { migratedDb } from "../helpers/pglite";
import { fx, PET, rain } from "../helpers/specs";

const item = (over: Partial<RadarQuestion> & { spec?: RadarQuestion["spec"] } = {}): RadarQuestion => ({
  id: over.spec?.id ?? fx().id,
  spec: fx(),
  status: "OPEN",
  createdTx: null,
  sealedMakers: 0,
  ...over,
});

describe("filtros", () => {
  it("por defecto: todas las modalidades, abiertas, todas las categorías", () => {
    expect(parseRadarFilters({})).toEqual({ mode: "all", state: "open", category: "all" });
  });

  it("ignora valores desconocidos y toma el primero si se repite", () => {
    expect(parseRadarFilters({ modo: "MAINNET", estado: "x", categoria: "__proto__" })).toEqual({
      mode: "all",
      state: "open",
      category: "all",
    });
    expect(parseRadarFilters({ modo: ["DEMO", "LIVE"], categoria: "climate_environment" })).toEqual({
      mode: "DEMO",
      state: "open",
      category: "climate_environment",
    });
  });

  it("radarHref omite los valores por defecto", () => {
    expect(radarHref({ mode: "all", state: "open", category: "all" })).toBe("/");
    expect(radarHref({ mode: "DEMO", state: "all", category: "economy_finance" })).toBe(
      "/?modo=DEMO&estado=all&categoria=economy_finance",
    );
  });
});

describe("fase y orden", () => {
  it("abierta hasta el cierre exacto, luego por resolver; los terminales mandan", () => {
    const q = item();
    expect(phaseOf(q, fx().closesAt - 1)).toBe("open");
    expect(phaseOf(q, fx().closesAt)).toBe("awaiting_resolution");
    expect(phaseOf({ ...q, status: "RESOLVED" }, 0)).toBe("resolved");
    expect(phaseOf({ ...q, status: "CANCELLED" }, 0)).toBe("cancelled");
  });

  it("LIVE antes que DEMO aunque la DEMO cierre antes; luego cierre y relevancia", () => {
    const demo = item({ spec: { ...rain(), closesAt: fx().closesAt - 3600 } });
    const late = item({ spec: { ...fx(), id: "00000000-0000-4000-8000-000000000002", closesAt: fx().closesAt + 60 } });
    const high = item({ spec: { ...fx(), id: "00000000-0000-4000-8000-000000000001", relevance: "high" } });
    const order = selectRadar([demo, late, item(), high], parseRadarFilters({ estado: "all" }), 0).map((q) => q.id);
    expect(order).toEqual([high.id, fx().id, late.id, demo.id]);
  });

  it("filtra por modo, categoría y estado", () => {
    const now = fx().closesAt + 1;
    const all = [item(), item({ spec: rain() }), item({ spec: { ...fx(), id: "00000000-0000-4000-8000-000000000003" }, status: "RESOLVED" })];
    expect(selectRadar(all, parseRadarFilters({ modo: "DEMO", estado: "all" }), now)).toHaveLength(1);
    expect(selectRadar(all, parseRadarFilters({ categoria: "climate_environment", estado: "all" }), now)).toHaveLength(1);
    expect(selectRadar(all, parseRadarFilters({ estado: "resolved" }), now)).toHaveLength(1);
    expect(selectRadar(all, parseRadarFilters({ estado: "closed" }), now)).toHaveLength(2);
    expect(selectRadar(all, parseRadarFilters({}), now)).toHaveLength(0);
  });
});

describe("señal: nunca un consenso inventado", () => {
  it("antes del cierre solo cuenta tesis; sin indexador no dice 0", () => {
    expect(signalLabel(item({ sealedMakers: null }), "open")).toBe("Conteo de tesis pendiente del indexador");
    expect(signalLabel(item({ sealedMakers: 0 }), "open")).toBe("Sin tesis selladas todavía");
    expect(signalLabel(item({ sealedMakers: 1 }), "open")).toBe("1 tesis sellada · el consenso se revela al cierre");
    expect(signalLabel(item({ sealedMakers: 3 }), "awaiting_resolution")).toBe(
      "3 tesis selladas · consenso pendiente de revelado",
    );
  });

  it("ninguna etiqueta contiene un porcentaje", () => {
    for (const sealedMakers of [null, 0, 1, 7]) {
      for (const phase of ["open", "awaiting_resolution", "resolved", "invalid", "cancelled"] as const) {
        expect(signalLabel(item({ sealedMakers }), phase)).not.toMatch(/%|\d+\s*por ciento/);
      }
    }
  });
});

describe("formato", () => {
  it("cierre en hora de Lima", () => {
    expect(formatPet(PET("2026-12-01T18:00:00"))).toBe("1 dic 2026, 18:00 PET");
  });

  it("nombre del país en español", () => {
    expect(countryName("PE")).toBe("Perú");
    expect(countryName("XX")).toBe("Sin país");
  });
});

describe("loadRadar", () => {
  it("omite borradores, muestra la tx y no inventa el conteo sin indexador", async () => {
    const db = await migratedDb();
    const deploymentId = await ensureDeployment(db, DEPLOYMENT);
    for (const spec of [fx(), rain()]) {
      const { bytes, specHash } = await hashQuestionSpec(spec);
      await insertQuestion(db, { deploymentId, specBytes: bytes, specHash, status: "DRAFT" });
    }
    expect(await loadRadar(db)).toEqual([]);

    await markQuestionOpen(db, fx().id, "ab".repeat(32));
    const before = await loadRadar(db);
    expect(before.map((q) => [q.id, q.createdTx, q.sealedMakers])).toEqual([[fx().id, "ab".repeat(32), null]]);

    await advanceSyncState(db, deploymentId, { cursor: "c1", lastLedger: 10, lastLedgerTime: 1 });
    await db.query(
      `insert into forecasts (question_id, address, seq, commitment, ledger_time, tx_hash, ledger)
       values ($1::uuid, $2, 1, $3, 1, $4, 10), ($1::uuid, $2, 2, $5, 2, $6, 11), ($1::uuid, $7, 1, $3, 3, $8, 12)`,
      [
        fx().id,
        "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF",
        "11".repeat(32),
        "a1".repeat(32),
        "22".repeat(32),
        "a2".repeat(32),
        "GCJ3KM7QAMN3XOYDIMBRAXSFHFBUPSGVA2KQGDPDX4UP7NY7LDQ36CEK",
        "a3".repeat(32),
      ],
    );
    // Dos makers, uno con dos versiones: cuenta makers, no versiones.
    expect((await loadRadar(db))[0]!.sealedMakers).toBe(2);
  });

  it("sin despliegue registrado devuelve vacío sin escribir", async () => {
    const db = await migratedDb();
    expect(await loadRadar(db)).toEqual([]);
    const [row] = await db.query<{ n: unknown }>(`select count(*) as n from deployments`);
    expect(Number(row!.n)).toBe(0);
  });
});
