import { parseQuestionSpec, QUESTION_SCHEMA, type QuestionSpec } from "../spec";

/**
 * Plantilla `fx_daily` (04-domain/12-categories): «¿El {serie} publicado por
 * {fuente} para el {fecha} será mayor que {umbral}?». Compartida entre
 * navegador y servidor; sin red.
 *
 * Una fuente entra aquí solo con GO de su spike (HU-45, 07-engineering/05).
 * Los cuatro países de la tabla usan una hora local sin horario de verano,
 * por eso basta un desfase fijo.
 */
export type FxSource = {
  country: string;
  name: string;
  url: string;
  dataset: string;
  series: string;
  seriesLabel: string;
  unit: string;
  /**
   * Escala de comparación: 10^(decimales máximos que publica la fuente), para
   * que cada valor publicado sea un entero exacto y `gt` no necesite redondeo.
   */
  scale: number;
  /** Decimales admitidos en el umbral (los que la fuente usa al mostrar). */
  thresholdDecimals: number;
  timezone: string;
  utcOffsetMinutes: number;
  /** Días que se da a la fuente para publicar antes de invalidar. */
  resolveWindowDays: number;
};

export const FX_SOURCES: Record<string, FxSource> = {
  PE: {
    country: "PE",
    name: "BCRP",
    url: "https://estadisticas.bcrp.gob.pe/estadisticas/series/api/PD04638PD/json",
    dataset: "Series diarias",
    series: "PD04638PD",
    seriesLabel: "tipo de cambio interbancario venta (S/ por US$)",
    unit: "PEN/USD",
    // La API publica promedios con hasta 14 decimales (3.49157142857143) aunque
    // declara "dec":"3" para mostrar; 10^14 los representa sin pérdida.
    scale: 100_000_000_000_000,
    thresholdDecimals: 3,
    timezone: "America/Lima",
    utcOffsetMinutes: -300,
    resolveWindowDays: 7,
  },
};

export type FxQuestionInput = {
  id: string;
  /** Día observado, `YYYY-MM-DD` en la hora local de la fuente. */
  date: string;
  /** Umbral decimal con punto, p. ej. `"3.385"`. */
  threshold: string;
  country: string;
  mode: "LIVE" | "DEMO";
  curator: string;
  resolver: string;
};

const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const DAY = 86_400;

/** `"3.385"` con 3 decimales → 3385, sin pasar por coma flotante. */
export function scaleDecimal(value: string, decimals: number): number {
  const match = /^(\d{1,9})(?:\.(\d+))?$/.exec(value);
  if (!match) throw new Error(`umbral inválido: ${JSON.stringify(value)} (usa punto decimal)`);
  const fraction = match[2] ?? "";
  if (fraction.length > decimals) throw new Error(`el umbral admite como máximo ${decimals} decimales`);
  const scaled = Number(match[1] + fraction.padEnd(decimals, "0"));
  if (!Number.isSafeInteger(scaled)) throw new Error("umbral fuera de rango");
  return scaled;
}

function localMidnight(date: string, offsetMinutes: number): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) throw new Error(`fecha inválida: ${JSON.stringify(date)} (usa YYYY-MM-DD)`);
  const utc = Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  const back = new Date(utc);
  if (back.toISOString().slice(0, 10) !== date) throw new Error(`fecha inexistente: ${date}`);
  return utc / 1000 - offsetMinutes * 60;
}

function spanishDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return `${d} ${MONTHS[m! - 1]} ${y}`;
}

function formatThreshold(scaled: number, decimals: number): string {
  const s = String(scaled).padStart(decimals + 1, "0");
  return `${s.slice(0, -decimals)},${s.slice(-decimals)}`;
}

/**
 * Genera y valida la spec. Cierre: 18:00 locales del día anterior. Observación:
 * el día completo. Resolución: desde el fin del día hasta `resolveWindowDays`
 * después. Rechaza sábados y domingos (sin publicación: la pregunta `single`
 * se invalidaría); los feriados los revisa el curador.
 */
export function fxDailySpec(input: FxQuestionInput): QuestionSpec {
  const source = FX_SOURCES[input.country];
  if (!source) {
    throw new Error(`sin fuente fx_daily con GO para ${input.country}; disponibles: ${Object.keys(FX_SOURCES).join(", ")}`);
  }
  const start = localMidnight(input.date, source.utcOffsetMinutes);
  const weekday = new Date((start + source.utcOffsetMinutes * 60) * 1000).getUTCDay();
  if (weekday === 0 || weekday === 6) throw new Error(`${input.date} cae en fin de semana: la fuente no publica`);

  const threshold = scaleDecimal(input.threshold, source.thresholdDecimals);
  const thresholdScaled = threshold * (source.scale / 10 ** source.thresholdDecimals);
  if (!Number.isSafeInteger(thresholdScaled)) throw new Error("umbral fuera de rango para la escala");
  const prefix = input.mode === "DEMO" ? "DEMO: " : "";
  const when = spanishDate(input.date);

  return parseQuestionSpec({
    schema: QUESTION_SCHEMA,
    id: input.id,
    mode: input.mode,
    title: `${prefix}¿El ${source.seriesLabel} del ${input.mode === "DEMO" ? "fixture" : source.name} del ${when} será mayor que ${formatThreshold(threshold, source.thresholdDecimals)}?`,
    category: "economy_finance",
    subcategory: "fx_daily",
    country: source.country,
    region: null,
    beneficiaries: ["Importadores y exportadores con pagos en dólares", "Hogares con deudas o ahorros en dólares"],
    humanImpact: "",
    economicImpact: `Quien debe pagar o cobrar en dólares decide si cambia antes del ${when} o espera.`,
    decisionContext: `Comprar o vender dólares antes del ${when} o esperar.`,
    relevance: "standard",
    relevanceReason: "Decisión de cobertura cambiaria con plazo de un día y fuente oficial diaria.",
    referenceThresholdBps: null,
    // DEMO nunca apunta a la fuente real: se resuelve con un fixture etiquetado.
    source:
      input.mode === "DEMO"
        ? {
            name: "Fixture praev",
            url: `urn:praev:fixture:fx-${source.country.toLowerCase()}-${input.date}`,
            dataset: "Simulación técnica",
            stationOrSeries: source.series,
          }
        : { name: source.name, url: source.url, dataset: source.dataset, stationOrSeries: source.series },
    unit: source.unit,
    operator: "gt",
    thresholdScaled,
    scale: source.scale,
    closesAt: start - 6 * 3600,
    observationStart: start,
    observationEnd: start + DAY,
    resolveAfter: start + DAY,
    resolveBy: start + DAY + source.resolveWindowDays * DAY,
    timezone: source.timezone,
    aggregation: "single",
    missingPolicy: "invalidate",
    revisionPolicy: "first_eligible_publication",
    resolver: input.resolver,
    curator: input.curator,
    requester: null,
  });
}
