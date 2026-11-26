# Entidad Question y especificación canónica

**Estado:** P0 · **Versión:** 1.1 · **Fecha:** 2026-11-26

La unidad de dominio es la pregunta binaria resoluble, no mercado financiero. Una pregunta abierta es una versión congelada; una corrección material crea un ID nuevo y cancela la versión previa de forma explícita.

```ts
type QuestionSpec = {
 schema: 'praev.question.v1'; id: string; mode: 'LIVE'|'DEMO';
 title: string; domain: 'climate'|'food_supply'; country: 'PE'; region: string;
 beneficiaries: string[]; humanImpact: string; economicImpact: string;
 decisionContext: string; source: {name:string; url:string; dataset:string; stationOrSeries:string};
 unit: string; operator: 'gt'; thresholdScaled: number; scale: number;
 closesAt: number; observationStart: number; observationEnd: number; resolveAfter: number;
 resolveBy: number; timezone: 'America/Lima'; aggregation: 'sum'|'single';
 missingPolicy: 'invalidate' | 'partial_yes_else_invalidate'; revisionPolicy: 'first_eligible_publication';
 resolver: string; creator: string; sponsor: null;
};
```

Timestamps Unix segundos enteros UTC, display PET; rango medio abierto [start,end). `closesAt <= observationStart < observationEnd <= resolveAfter < resolveBy`. `scale` entero positivo (p.ej. 1000 para mm). `thresholdScaled` no float. `id` UUID canónico lowercase, chain key SHA256 del UTF-8 del UUID (ver hashes). `specHash` externo al objeto, no circular. Fuente LIVE HTTPS exacta; DEMO usa URI `urn:praev:fixture:...`. `title` y rule deben concordar. `partial_yes_else_invalidate` (ADR-023) solo aplica a `aggregation:'sum'` de magnitudes no negativas: si la suma de los intervalos presentes ya cumple `> threshold`, el resultado es YES aunque falten intervalos; NO exige todos los intervalos de la ventana; si faltan y la suma parcial no supera el umbral, se espera hasta `resolveBy` y luego se invalida. Valores de la fuente con ruido de coma flotante se normalizan a la precisión declarada (0,1 mm → `round(v*10)*100` con `scale` 1000) antes de sumar. Criterio: spec válida genera hash idéntico en todos los runtimes; no edición tras confirmación. Ninguna pregunta sin fuente concreta.
