/**
 * Modelo del Radar (01-product/05-radar, HU-27). Puro y compartido: no lee la
 * base ni la red. Nunca inventa una probabilidad: antes del cierre solo se
 * muestra cuántas tesis hay selladas; el consenso llega con el revelado.
 */
import { CATEGORIES, type CategoryId } from "@/domain/questions/categories";
import type { QuestionSpec } from "@/domain/questions/spec";

export type RadarMode = "all" | "LIVE" | "DEMO";
export type RadarState = "open" | "closed" | "resolved" | "all";
export type RadarFilters = { mode: RadarMode; state: RadarState; category: CategoryId | "all" };

export type Phase = "open" | "awaiting_resolution" | "resolved" | "invalid" | "cancelled";

export type RadarQuestion = {
  id: string;
  spec: QuestionSpec;
  status: "OPEN" | "RESOLVED" | "INVALID" | "CANCELLED";
  createdTx: string | null;
  /** Makers con al menos una tesis sellada; `null` si el indexador aún no corrió. */
  sealedMakers: number | null;
};

const MODES: readonly RadarMode[] = ["all", "LIVE", "DEMO"];
const STATES: readonly RadarState[] = ["open", "closed", "resolved", "all"];

type Params = Record<string, string | string[] | undefined>;

function one(params: Params, key: string): string | undefined {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

/** Valores desconocidos caen al defecto: la URL nunca rompe la página. */
export function parseRadarFilters(params: Params): RadarFilters {
  const mode = one(params, "modo");
  const state = one(params, "estado");
  const category = one(params, "categoria");
  return {
    mode: MODES.includes(mode as RadarMode) ? (mode as RadarMode) : "all",
    state: STATES.includes(state as RadarState) ? (state as RadarState) : "open",
    category: category !== undefined && Object.hasOwn(CATEGORIES, category) ? (category as CategoryId) : "all",
  };
}

export function phaseOf(q: Pick<RadarQuestion, "status" | "spec">, now: number): Phase {
  if (q.status === "RESOLVED") return "resolved";
  if (q.status === "INVALID") return "invalid";
  if (q.status === "CANCELLED") return "cancelled";
  return now < q.spec.closesAt ? "open" : "awaiting_resolution";
}

function matchesState(phase: Phase, state: RadarState): boolean {
  if (state === "all") return true;
  if (state === "open") return phase === "open";
  if (state === "closed") return phase === "awaiting_resolution";
  return phase === "resolved" || phase === "invalid" || phase === "cancelled";
}

/**
 * Filtra y ordena: LIVE antes que DEMO (la DEMO nunca encabeza), luego por
 * cierre más próximo, alta relevancia primero y el id como desempate estable.
 */
export function selectRadar(questions: RadarQuestion[], filters: RadarFilters, now: number): RadarQuestion[] {
  return questions
    .filter((q) => filters.mode === "all" || q.spec.mode === filters.mode)
    .filter((q) => filters.category === "all" || q.spec.category === filters.category)
    .filter((q) => matchesState(phaseOf(q, now), filters.state))
    .sort(
      (a, b) =>
        Number(a.spec.mode === "DEMO") - Number(b.spec.mode === "DEMO") ||
        a.spec.closesAt - b.spec.closesAt ||
        Number(b.spec.relevance === "high") - Number(a.spec.relevance === "high") ||
        a.id.localeCompare(b.id),
    );
}

const PET = new Intl.DateTimeFormat("es-PE", {
  timeZone: "America/Lima",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** Cierre en hora de Lima, p. ej. «30 nov 2026, 18:00 PET». */
export function formatPet(unixSeconds: number): string {
  return `${PET.format(new Date(unixSeconds * 1000)).replace(/\./g, "")} PET`;
}

/** Texto del bloque de señal: nunca un número de consenso antes del revelado. */
export function signalLabel(q: RadarQuestion, phase: Phase): string {
  if (phase === "cancelled") return "Cancelada antes del cierre";
  if (q.sealedMakers === null) return "Conteo de tesis pendiente del indexador";
  if (q.sealedMakers === 0) return phase === "open" ? "Sin tesis selladas todavía" : "Cerró sin tesis selladas";
  const n = q.sealedMakers === 1 ? "1 tesis sellada" : `${q.sealedMakers} tesis selladas`;
  return phase === "open" ? `${n} · el consenso se revela al cierre` : `${n} · consenso pendiente de revelado`;
}

export const PHASE_LABEL: Record<Phase, string> = {
  open: "Abierta",
  awaiting_resolution: "Cerrada · por resolver",
  resolved: "Resuelta",
  invalid: "Invalidada",
  cancelled: "Cancelada",
};

const REGIONS = new Intl.DisplayNames(["es"], { type: "region" });

export function countryName(code: string): string {
  if (code === "XX") return "Sin país";
  try {
    return REGIONS.of(code) ?? code;
  } catch {
    return code;
  }
}

export function categoryLabel(id: string): string {
  return Object.hasOwn(CATEGORIES, id) ? CATEGORIES[id as CategoryId].label : id;
}
