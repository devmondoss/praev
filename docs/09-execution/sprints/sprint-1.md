# Sprint 1 · Ciclo on-chain

**Fechas:** viernes 27 – domingo 29 nov 2026 · **Objetivo:** una pregunta DEMO se crea, recibe tesis selladas y se resuelve en Stellar Testnet desde la CLI; las primeras preguntas LIVE (tipo de cambio y lluvia) están publicadas con su ancla, y la app las muestra en el Radar.

**Hito del Hub al cerrar:** Integración Stellar en testnet (10), solicitado al terminar HU-17.

## Sprint backlog

| Historia | Pts | Día | Estado | Tareas |
|---|---:|---|---|---|
| HU-08 · Canonicalización, hashes y sellado de la tesis | 5 | Vie 27 | Hecha | `praev-c14n-v1`, SHA-256 con Web Crypto, `chainId`, `ThesisPayload` con Zod, sal CSPRNG, compromiso, vectores T12, T13 y T29 |
| HU-07 · QuestionSpec v2 validada | 5 | Vie 27 | Hecha | Zod, catálogo de categorías, ISO país, tiempos, `sum`/`single`, `specHash` |
| HU-13 · `create_question` | 5 | Vie 27 | Hecha | Constructor, auth del curador, validaciones, tests T01–T04 |
| HU-14 · `submit_forecast` con compromiso | 5 | Vie 27 | Hecha | Auth del maker, roles excluidos, `seq`, cierre, tests T05–T08 |
| HU-26 · Shell y sistema visual | 3 | Vie 27 | En revisión: falta probar 360 px y zoom 200 % en navegador | Tokens, header, footer, foco, 360 px |
| HU-15 · Resolver, invalidar, cancelar | 3 | Sáb 28 | Hecha | Ventana, estado terminal, T09–T11 |
| HU-16 · Eventos y TTL | 2 | Sáb 28 | Hecha | `#[contractevent]`, `extend_ttl` ≥ 518 400 |
| HU-17 · Despliegue oficial y bindings | 3 | Sáb 28 | Hecha: `CD6NNKKS…KY5X` | `deployment.json`, bindings TS, pedir hito |
| HU-18 · Migración inicial y repositorios | 3 | Sáb 28 | Hecha: aplicada en Neon | `001_initial.sql`, regla de ocultar payloads antes del cierre |
| HU-22 · CLI de preguntas | 3 | Sáb 28 | Hecha: DEMO publicada en testnet (tx `d864f0c9…`); el ancla se engancha con HU-46 | `question:create` y `question:fx`, misma función que la API |
| HU-45 · Spike FX BR, CO, AR | 2 | Sáb 28 | Hecha: GO PE, BR, AR · NO-GO CO | GO/NO-GO por fuente |
| HU-27 · Radar con datos tipados | 3 | Sáb–Dom | En curso: lee la base real (sábado); el domingo, conteo del indexador (HU-19) y API (HU-20) | Tarjetas, filtros, DEMO visible |
| HU-44 · Adaptadores SENAMHI y BCRP | 3 | Dom 29 | Pendiente | Bytes exactos, normalización |
| HU-46 · Ancla histórica | 2 | Dom 29 | Pendiente | `anchor.v1` para `fx_daily` y `precipitation` |
| HU-12 · Regla `sum`/`single` | 3 | Dom 29 | Pendiente | T17, T35, muestras reales |
| HU-19 · Indexador de eventos | 5 | Dom 29 | Pendiente | Cursor `getEvents`, reconciliación |
| HU-20 · Endpoints públicos | 3 | Dom 29 | Pendiente | Preguntas y pronósticos, errores estándar |
| HU-23 · Semilla DEMO | 2 | Dom 29 | Pendiente | `demo:seed` con cierre a +15 min, fixtures etiquetados |
| HU-24 · CLI de resolución | 5 | Dom 29 | Pendiente | Manifest, preview, confirmación, lote `fx_daily` |
| HU-25 · Preguntas LIVE publicadas | 3 | Dom 29 | Pendiente | FX del 30 nov al 3 dic y lluvia, con ancla |

**Compromiso:** 68 puntos. Si a fin de un día vamos con más de medio día de retraso, se aplica el [orden de recorte](../06-scrum.md#7-capacidad-y-plan-de-recorte).

## Daily log

### 27 nov
- Ayer: S0 cerrado (12/12) y reenfoque documentado en ADR-024 a ADR-030.
- Hoy: HU-08, HU-07, HU-13, HU-14, HU-26.
- Bloqueos: ninguno.
- Cierre: HU-08, HU-07, HU-13 y HU-14 hechas (20 pts); HU-26 en revisión (3 pts) hasta probar 360 px y zoom 200 % en navegador. 66 tests Vitest y 17 tests del contrato en verde; shell desplegado en praev.vercel.app con health ok. Ajuste: `relevance` y `relevanceReason` entran a QuestionSpec v2 para que HU-07 pueda exigir la justificación.

## Review

Pendiente (dom 29).

## Retrospectiva

Pendiente (dom 29).
