# Entidad Question y especificación canónica

**Estado:** P0 · **Versión:** 1.3 · **Fecha:** 2026-11-27

La unidad de dominio es la pregunta binaria resoluble, no mercado financiero. Una pregunta abierta es una versión congelada; una corrección material crea un ID nuevo y cancela la versión previa de forma explícita.

```ts
type QuestionSpec = {
 schema: 'praev.question.v2'; id: string; mode: 'LIVE'|'DEMO';
 title: string;
 category: CategoryId; subcategory: string;          // ver 12-categories (ADR-028)
 country: string; region: string | null;             // ISO 3166-1 alfa-2 o 'XX' global
 beneficiaries: string[]; humanImpact: string; economicImpact: string;
 decisionContext: string;
 relevance: 'high' | 'standard'; relevanceReason: string;   // ver 03-relevance; 1–2 frases obligatorias
 referenceThresholdBps: number | null;               // umbral de decisión de referencia C/L (ADR-029/030)
 source: {name:string; url:string; dataset:string; stationOrSeries:string};
 unit: string; operator: 'gt'; thresholdScaled: number; scale: number;
 closesAt: number; observationStart: number; observationEnd: number; resolveAfter: number;
 resolveBy: number; timezone: string;                // IANA, p. ej. 'America/Lima'
 aggregation: 'sum'|'single';
 missingPolicy: 'invalidate' | 'partial_yes_else_invalidate'; revisionPolicy: 'first_eligible_publication';
 resolver: string; curator: string; requester: string | null;  // requester = taker que la propuso
};
```

Timestamps Unix segundos enteros UTC, display PET; rango medio abierto [start,end). `closesAt <= observationStart < observationEnd <= resolveAfter < resolveBy`. `scale` entero positivo (p.ej. 1000 para mm). `thresholdScaled` no float. `id` UUID canónico lowercase, chain key SHA256 del UTF-8 del UUID (ver hashes). `specHash` externo al objeto, no circular. Fuente LIVE HTTPS exacta; DEMO usa URI `urn:praev:fixture:...`. `title` y rule deben concordar. `partial_yes_else_invalidate` (ADR-023) solo aplica a `aggregation:'sum'` de magnitudes no negativas: si la suma de los intervalos presentes ya cumple `> threshold`, el resultado es YES aunque falten intervalos; NO exige todos los intervalos de la ventana; si faltan y la suma parcial no supera el umbral, se espera hasta `resolveBy` y luego se invalida. Valores de la fuente con ruido de coma flotante se normalizan a la precisión declarada (0,1 mm → `round(v*10)*100` con `scale` 1000) antes de sumar. Criterio: spec válida genera hash idéntico en todos los runtimes; no edición tras confirmación. Ninguna pregunta sin fuente concreta.

**Cambios de v2 (ADR-028, ADR-030):** `domain` y `country:'PE'` pasan a `category`, `subcategory` y `country` libres, validados contra el catálogo de [12-categories](12-categories.md); en P0 solo se aceptan `economy_finance` y `climate_environment`. `creator` se renombra `curator` para coincidir con el contrato y el SQL. `sponsor` se reemplaza por `requester` (dirección G del taker o `null`), que nunca otorga permisos sobre la pregunta ni sobre su resolución. `referenceThresholdBps` (0–10000 o `null`) es el umbral público de la decisión de referencia; el taker declara la razón C/L, nunca montos privados. `aggregation:'single'` exige exactamente una observación en `[observationStart, observationEnd)` (p. ej., el tipo de cambio de un día) y usa `missingPolicy:'invalidate'`. El ancla histórica no forma parte de la spec: se fija como baseline antes del cierre (ver [06-consensus](06-consensus.md)).

**Relevancia en la spec (27 nov).** `relevance` y `relevanceReason` estaban en la tabla `questions` pero faltaban en el tipo; se añaden a la spec para que la justificación del curador quede dentro del `specHash` y sea auditable. No cambia la semántica: todavía no existía ninguna pregunta creada.

**Implementación (HU-07).** `src/domain/questions/spec.ts` (`parseQuestionSpec`, `hashQuestionSpec`) y el catálogo `src/domain/questions/categories.ts`. Además de los tipos, se valida: categoría y subcategoría habilitadas y con la agregación de su plantilla (`fx_daily` e `inflation_monthly` → `single`, `precipitation` → `sum`); `country` entre los 249 códigos oficiales ISO 3166-1 alfa-2 o `XX` (lista fija, igual en todos los runtimes); zona horaria IANA; al menos un beneficiario, una consecuencia humana o económica y `decisionContext`; textos normalizados a NFC con límite en puntos de código; `resolver ≠ curator`; LIVE con URL HTTPS sin credenciales y DEMO con `urn:praev:fixture:…`; `partial_yes_else_invalidate` sin umbral negativo. `now < closesAt` lo comprueban el contrato y la CLI de creación, no la spec.
