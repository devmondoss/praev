import type { QuestionSpec } from "@/domain/questions/spec";

export const CURATOR = "GBM6H4HBGNXGNKM4BX32CC3TCH6ALKDTAFRTNMBNSHB34ZSQL4QGBUPU";
export const RESOLVER = "GAN5CFF43LTYGVV46YBFD3ICYVWWCXDS2GLI3J3AHF3FQC3ZCR52257G";
export const TAKER = "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF";
export const PET = (iso: string) => Date.parse(`${iso}-05:00`) / 1000;

/** Pregunta de tipo de cambio de un día hábil (plantilla `fx_daily`). */
export const fx = (): QuestionSpec => ({
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
export const rain = (): QuestionSpec => ({
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
