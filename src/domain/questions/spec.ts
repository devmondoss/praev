/**
 * QuestionSpec `praev.question.v2` (docs/04-domain/01-question.md, ADR-028/030).
 *
 * Una pregunta abierta es una versión congelada: `specHash = SHA256(c14n(spec))`
 * se ancla en la cadena y cualquier corrección material crea un ID nuevo.
 * Módulo puro: lo usan la API, la CLI del curador y el verificador.
 */
import { z } from "zod";

import { hashCanonical } from "@/lib/hash";
import { httpsUrl, bps, stellarAccount, text, unixSeconds, uuidLower } from "@/lib/schemas/common";

import { CATEGORY_IDS, enabledAggregation, isCategoryEnabled, isKnownSubcategory } from "./categories";

export const QUESTION_SCHEMA = "praev.question.v2";

const FIXTURE_URI = /^urn:praev:fixture:[a-z0-9][a-z0-9._:-]{0,199}$/;

/** Los 249 códigos oficiales de ISO 3166-1 alfa-2 (sin reservados ni usos privados). */
const ISO_3166_ALPHA2 = new Set(
  [
    "AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE",
    "BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD",
    "CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM",
    "DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF",
    "GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU",
    "ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN",
    "KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME",
    "MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA",
    "NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM",
    "PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI",
    "SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK",
    "TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI",
    "VN VU WF WS YE YT ZA ZM ZW",
  ]
    .join(" ")
    .split(" "),
);

/** ISO 3166-1 alfa-2 asignado, o `XX` para preguntas globales. */
export function isCountryCode(code: string): boolean {
  return code === "XX" || ISO_3166_ALPHA2.has(code);
}

export function isIanaTimeZone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz });
    return tz.includes("/") || tz === "UTC";
  } catch {
    return false;
  }
}

const sourceSchema = z.strictObject({
  name: text(120, { required: true }),
  url: z.string().max(2048),
  dataset: text(200, { required: true }),
  stationOrSeries: text(200, { required: true }),
});

export const questionSpecSchema = z
  .strictObject({
    schema: z.literal(QUESTION_SCHEMA),
    id: uuidLower,
    mode: z.enum(["LIVE", "DEMO"]),
    title: text(200, { required: true }),
    category: z.enum(CATEGORY_IDS as [string, ...string[]]),
    subcategory: z.string().regex(/^[a-z][a-z0-9_]{0,39}$/),
    country: z.string().refine(isCountryCode, { message: "código de país ISO 3166-1 alfa-2 o XX" }),
    region: text(120, { required: true }).nullable(),
    beneficiaries: z.array(text(120, { required: true })).min(1).max(8),
    humanImpact: text(500, { multiline: true }),
    economicImpact: text(500, { multiline: true }),
    decisionContext: text(500, { required: true, multiline: true }),
    relevance: z.enum(["high", "standard"]),
    relevanceReason: text(400, { required: true, multiline: true }),
    referenceThresholdBps: bps.nullable(),
    source: sourceSchema,
    unit: text(40, { required: true }),
    operator: z.literal("gt"),
    thresholdScaled: z.int(),
    scale: z.int().min(1),
    closesAt: unixSeconds,
    observationStart: unixSeconds,
    observationEnd: unixSeconds,
    resolveAfter: unixSeconds,
    resolveBy: unixSeconds,
    timezone: z.string().refine(isIanaTimeZone, { message: "zona horaria IANA inválida" }),
    aggregation: z.enum(["sum", "single"]),
    missingPolicy: z.enum(["invalidate", "partial_yes_else_invalidate"]),
    revisionPolicy: z.literal("first_eligible_publication"),
    resolver: stellarAccount,
    curator: stellarAccount,
    requester: stellarAccount.nullable(),
  })
  .superRefine((spec, ctx) => {
    const issue = (path: (string | number)[], message: string) =>
      ctx.addIssue({ code: "custom", path, message });

    // Categoría habilitada y regla coherente con su plantilla (ADR-028).
    if (!isCategoryEnabled(spec.category)) {
      issue(["category"], "categoría no habilitada: falta una fuente con spike GO");
    } else if (!isKnownSubcategory(spec.category, spec.subcategory)) {
      issue(["subcategory"], "subcategoría desconocida para esta categoría");
    } else {
      const allowed = enabledAggregation(spec.category, spec.subcategory);
      if (allowed === null) issue(["subcategory"], "subcategoría no habilitada");
      else if (allowed !== spec.aggregation) issue(["aggregation"], `esta subcategoría usa '${allowed}'`);
    }

    // Admisión: beneficiario, consecuencia y decisión posible (03-relevance).
    if (spec.humanImpact.trim() === "" && spec.economicImpact.trim() === "") {
      issue(["humanImpact"], "declara al menos una consecuencia humana o económica");
    }

    // Tiempos: closesAt ≤ observationStart < observationEnd ≤ resolveAfter < resolveBy.
    if (!(spec.closesAt <= spec.observationStart)) issue(["closesAt"], "debe ser ≤ observationStart");
    if (!(spec.observationStart < spec.observationEnd)) issue(["observationEnd"], "debe ser > observationStart");
    if (!(spec.observationEnd <= spec.resolveAfter)) issue(["resolveAfter"], "debe ser ≥ observationEnd");
    if (!(spec.resolveAfter < spec.resolveBy)) issue(["resolveBy"], "debe ser > resolveAfter");

    // Regla de agregación y faltantes (ADR-023).
    if (spec.aggregation === "single" && spec.missingPolicy !== "invalidate") {
      issue(["missingPolicy"], "'single' exige 'invalidate'");
    }
    if (spec.missingPolicy === "partial_yes_else_invalidate" && spec.thresholdScaled < 0) {
      issue(["thresholdScaled"], "'partial_yes_else_invalidate' solo aplica a magnitudes no negativas");
    }

    // Roles: el resolvedor no puede ser el curador; el requester no otorga permisos.
    if (spec.resolver === spec.curator) issue(["resolver"], "resolver y curator deben ser distintos");

    // Fuente: LIVE exige HTTPS exacta; DEMO exige un URI de fixture.
    if (spec.mode === "LIVE" && !httpsUrl().safeParse(spec.source.url).success) {
      issue(["source", "url"], "una pregunta LIVE exige una URL HTTPS de la fuente");
    }
    if (spec.mode === "DEMO" && !FIXTURE_URI.test(spec.source.url)) {
      issue(["source", "url"], "una pregunta DEMO exige un URI urn:praev:fixture:…");
    }
  });

export type QuestionSpec = z.infer<typeof questionSpecSchema>;

export class QuestionSpecError extends Error {
  readonly issues: z.core.$ZodIssue[];

  constructor(issues: z.core.$ZodIssue[]) {
    super(`spec inválida: ${issues.map((i) => `${i.path.join(".") || "$"} ${i.message}`).join("; ")}`);
    this.name = "QuestionSpecError";
    this.issues = issues;
  }
}

export function parseQuestionSpec(input: unknown): QuestionSpec {
  const result = questionSpecSchema.safeParse(input);
  if (!result.success) throw new QuestionSpecError(result.error.issues);
  return result.data;
}

/** Valida y devuelve los bytes canónicos que se guardan y el `specHash` que se ancla. */
export async function hashQuestionSpec(
  input: unknown,
): Promise<{ spec: QuestionSpec; bytes: Uint8Array<ArrayBuffer>; specHash: string }> {
  const spec = parseQuestionSpec(input);
  const { bytes, hash } = await hashCanonical(spec);
  return { spec, bytes, specHash: hash };
}
