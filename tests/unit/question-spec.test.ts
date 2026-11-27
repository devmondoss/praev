import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import { enabledAggregation, isCategoryEnabled } from "@/domain/questions/categories";
import {
  QuestionSpecError,
  hashQuestionSpec,
  isCountryCode,
  isIanaTimeZone,
  parseQuestionSpec,
  type QuestionSpec,
} from "@/domain/questions/spec";
import { canonicalString } from "@/lib/hash";

const CURATOR = "GBM6H4HBGNXGNKM4BX32CC3TCH6ALKDTAFRTNMBNSHB34ZSQL4QGBUPU";
const RESOLVER = "GAN5CFF43LTYGVV46YBFD3ICYVWWCXDS2GLI3J3AHF3FQC3ZCR52257G";
const TAKER = "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF";
const PET = (iso: string) => Date.parse(`${iso}-05:00`) / 1000;

/** Pregunta de tipo de cambio de un día hábil (plantilla `fx_daily`). */
const fx = (): QuestionSpec => ({
  schema: "praev.question.v2",
  id: "3a1f6c2e-7b4d-4e8a-9c10-2d3e4f5a6b7c",
  mode: "LIVE",
  title: "¿El tipo de cambio interbancario venta (S/ por US$) del BCRP del 2 dic 2026 será mayor que 3,500?",
  category: "economy_finance",
  subcategory: "fx_daily",
  country: "PE",
  region: null,
  beneficiaries: ["Importadores con pagos en dólares"],
  humanImpact: "",
  economicImpact: "Un importador decide si compra dólares hoy o espera al pago.",
  decisionContext: "Comprar dólares antes del 2 dic o esperar.",
  relevance: "standard",
  relevanceReason: "Decisión de cobertura con plazo corto y fuente oficial diaria.",
  referenceThresholdBps: 5500,
  source: {
    name: "BCRP",
    url: "https://estadisticas.bcrp.gob.pe/estadisticas/series/api/PD04638PD/json",
    dataset: "Series diarias",
    stationOrSeries: "PD04638PD",
  },
  unit: "PEN/USD",
  operator: "gt",
  thresholdScaled: 350_000,
  scale: 100_000,
  closesAt: PET("2026-12-01T18:00:00"),
  observationStart: PET("2026-12-02T00:00:00"),
  observationEnd: PET("2026-12-03T00:00:00"),
  resolveAfter: PET("2026-12-03T00:00:00"),
  resolveBy: PET("2026-12-10T00:00:00"),
  timezone: "America/Lima",
  aggregation: "single",
  missingPolicy: "invalidate",
  revisionPolicy: "first_eligible_publication",
  resolver: RESOLVER,
  curator: CURATOR,
  requester: TAKER,
});

/** Pregunta DEMO de lluvia acumulada (plantilla `precipitation`). */
const rain = (): QuestionSpec => ({
  ...fx(),
  id: "9e8d7c6b-5a4f-4e3d-8c2b-1a0f9e8d7c6b",
  mode: "DEMO",
  title: "DEMO: ¿La lluvia acumulada en la estación de prueba superará 25 mm?",
  category: "climate_environment",
  subcategory: "precipitation",
  region: "Piura",
  humanImpact: "Simulación técnica, no observación oficial.",
  referenceThresholdBps: null,
  source: {
    name: "Fixture praev",
    url: "urn:praev:fixture:rain-demo-1",
    dataset: "Simulación técnica",
    stationOrSeries: "demo-station",
  },
  unit: "mm",
  thresholdScaled: 25_000,
  scale: 1000,
  aggregation: "sum",
  missingPolicy: "partial_yes_else_invalidate",
  requester: null,
});

const rejects = (spec: unknown, path: string) => {
  try {
    parseQuestionSpec(spec);
  } catch (error) {
    expect(error).toBeInstanceOf(QuestionSpecError);
    const paths = (error as QuestionSpecError).issues.map((i) => i.path.join("."));
    expect(paths).toContain(path);
    return;
  }
  throw new Error(`se esperaba rechazo en ${path}`);
};

describe("QuestionSpec v2 válida", () => {
  it("acepta las plantillas fx_daily y precipitation", () => {
    expect(parseQuestionSpec(fx()).subcategory).toBe("fx_daily");
    expect(parseQuestionSpec(rain()).aggregation).toBe("sum");
  });

  it("specHash es SHA256 de los bytes canónicos y no depende del orden de claves", async () => {
    const { bytes, specHash } = await hashQuestionSpec(fx());
    expect(specHash).toBe(createHash("sha256").update(bytes).digest("hex"));
    expect(new TextDecoder().decode(bytes)).toBe(canonicalString(fx()));
    const reordered = Object.fromEntries(Object.entries(fx()).reverse());
    expect((await hashQuestionSpec(reordered)).specHash).toBe(specHash);
    expect((await hashQuestionSpec({ ...fx(), thresholdScaled: 350_001 })).specHash).not.toBe(specHash);
  });
});

describe("QuestionSpec v2 rechazada (HU-07)", () => {
  it("tiempos desordenados", () => {
    const s = fx();
    rejects({ ...s, closesAt: s.observationStart + 1 }, "closesAt");
    rejects({ ...s, observationEnd: s.observationStart }, "observationEnd");
    rejects({ ...s, resolveAfter: s.observationEnd - 1 }, "resolveAfter");
    rejects({ ...s, resolveBy: s.resolveAfter }, "resolveBy");
    // Los bordes permitidos: closesAt = observationStart y resolveAfter = observationEnd.
    expect(() => parseQuestionSpec({ ...s, closesAt: s.observationStart })).not.toThrow();
  });

  it("operador distinto de gt y números no enteros", () => {
    rejects({ ...fx(), operator: "gte" }, "operator");
    rejects({ ...fx(), thresholdScaled: 3.5 }, "thresholdScaled");
    rejects({ ...fx(), scale: 0 }, "scale");
    rejects({ ...fx(), closesAt: 1.5 }, "closesAt");
    rejects({ ...fx(), referenceThresholdBps: 10_001 }, "referenceThresholdBps");
  });

  it("fuente vacía o que no corresponde al modo", () => {
    rejects({ ...fx(), source: { ...fx().source, name: "" } }, "source.name");
    rejects({ ...fx(), source: { ...fx().source, stationOrSeries: "  " } }, "source.stationOrSeries");
    rejects({ ...fx(), source: { ...fx().source, url: "http://estadisticas.bcrp.gob.pe" } }, "source.url");
    rejects({ ...fx(), source: { ...fx().source, url: "urn:praev:fixture:x" } }, "source.url");
    rejects({ ...rain(), source: { ...rain().source, url: "https://example.org/demo" } }, "source.url");
  });

  it("resolver igual al curator y direcciones inválidas", () => {
    rejects({ ...fx(), resolver: CURATOR }, "resolver");
    rejects({ ...fx(), requester: "GABC" }, "requester");
  });

  it("relevancia sin justificación y admisión incompleta", () => {
    rejects({ ...fx(), relevanceReason: "" }, "relevanceReason");
    rejects({ ...fx(), relevance: "viral" }, "relevance");
    rejects({ ...fx(), beneficiaries: [] }, "beneficiaries");
    rejects({ ...fx(), decisionContext: "" }, "decisionContext");
    rejects({ ...fx(), humanImpact: "", economicImpact: "" }, "humanImpact");
  });

  it("categoría o subcategoría no habilitada", () => {
    rejects({ ...fx(), category: "health", subcategory: "alerts" }, "category");
    rejects({ ...fx(), category: "sports" }, "category");
    rejects({ ...fx(), subcategory: "policy_rate" }, "subcategory");
    rejects({ ...fx(), subcategory: "precipitation" }, "subcategory");
    rejects({ ...fx(), aggregation: "sum", missingPolicy: "invalidate" }, "aggregation");
  });

  it("país que no es ISO 3166-1 alfa-2", () => {
    rejects({ ...fx(), country: "PER" }, "country");
    rejects({ ...fx(), country: "pe" }, "country");
    rejects({ ...fx(), country: "ZZ" }, "country");
    rejects({ ...fx(), country: "UK" }, "country");
    expect(parseQuestionSpec({ ...fx(), country: "XX" }).country).toBe("XX");
  });

  it("single con missingPolicy distinta de invalidate", () => {
    rejects({ ...fx(), missingPolicy: "partial_yes_else_invalidate" }, "missingPolicy");
    rejects({ ...rain(), thresholdScaled: -1 }, "thresholdScaled");
  });

  it("ID, zona horaria y campos desconocidos", () => {
    rejects({ ...fx(), id: "3A1F6C2E-7B4D-4E8A-9C10-2D3E4F5A6B7C" }, "id");
    rejects({ ...fx(), timezone: "Lima" }, "timezone");
    rejects({ ...fx(), sponsor: "x" }, "");
    rejects({ ...fx(), schema: "praev.question.v1" }, "schema");
  });
});

describe("catálogo de categorías", () => {
  it("habilita solo las macros con fuente GO", () => {
    expect(isCategoryEnabled("economy_finance")).toBe(true);
    expect(isCategoryEnabled("climate_environment")).toBe(true);
    for (const off of ["commodities_energy", "agri_food", "health", "tech_networks", "__proto__"]) {
      expect(isCategoryEnabled(off)).toBe(false);
    }
    expect(enabledAggregation("economy_finance", "fx_daily")).toBe("single");
    expect(enabledAggregation("climate_environment", "precipitation")).toBe("sum");
    expect(enabledAggregation("climate_environment", "temperature")).toBeNull();
    expect(enabledAggregation("economy_finance", "toString")).toBeNull();
  });

  it("valida países y zonas horarias", () => {
    for (const code of ["PE", "BR", "CO", "AR", "US"]) expect(isCountryCode(code)).toBe(true);
    for (const tz of ["America/Lima", "America/Bogota", "UTC"]) expect(isIanaTimeZone(tz)).toBe(true);
    for (const tz of ["EST", "America/Nowhere", ""]) expect(isIanaTimeZone(tz)).toBe(false);
  });
});
