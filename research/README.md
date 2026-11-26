# Investigación

**Estado:** Referencia histórica · **Versión:** 1.1 · **Fecha:** 2026-11-26

Contiene el informe Deep Research que sigue vigente como antecedente del blueprint. No es una especificación ejecutable: cuando haya contradicciones, mandan los ADRs y P0 (`AGENTS.md`).

| Archivo | Contenido |
|---|---|
| [03-mvp-research.md](03-mvp-research.md) | Informe final: alcance del MVP, oráculo, Event Engine y Stellar. Es la base directa del blueprint |
| [03-mvp-research.pdf](03-mvp-research.pdf) | El mismo informe en PDF; es el único que conserva la bibliografía con las URLs completas (22 fuentes) |

Los dos informes anteriores (`01-strategic-research`, `02-market-whitespace`) y el PDF del primero están en [`archive/`](../archive/README.md) y se eliminarán al empezar el desarrollo.

## Diferencias del informe 03 frente al blueprint (gana el blueprint)

- Resolución en un solo paso `resolve`, sin estado `PROVISIONAL` ni `propose/finalize`.
- No hay evento `ScoreRecorded`: el score se calcula off-chain (ADR-014).
- Una sola fuente LIVE en P0; la segunda es P1.
- La demo usa un fixture sintético, no un replay histórico (ADR-012).
- No hay leaderboard ordenado con menos de 20 preguntas.
- El schema admite una sola fuente y el operador `gt`, así que una pregunta de precio "+10 %" no se puede expresar sin ampliarlo.
- Sí hay agente de IA en P0 (ADR-010).

## Datos rescatados de los informes archivados (para pitch y Q&A)

Vienen de informes generados con IA y **no se han verificado**. Hay que comprobar la fuente antes de usar cualquiera en el video o en el README.

- **Por qué ahora:** ENFEN mantenía la alerta de El Niño Costero al 13 nov 2026, con continuación hasta inicios del invierno de 2027. Según el Banco Mundial, los shocks hídricos le cuestan al Perú entre 1,3 % y 3,5 % del PIB (informe 01).
- **Mercado:** Kalshi es un mercado regulado por la CFTC, con una ronda de US$1.000M a una valoración de US$22.000M. En Polymarket, alrededor del 3 % de las cuentas explica la precisión, lo que respalda la tesis de reputación (informe 01).
- **Competidores que no están en el blueprint:**
  - Del informe 01: Mantic (superó a 676 humanos; unos US$29M levantados), Sooth Labs, Cultivate Labs, Preseen y The Forecasting Company.
  - Del informe 02: Dataminr, Interos y Seerist.
  - Del informe 03: ClimateAi, y el caso Blue Yonder con Supermercados Peruanos.
- **Posicionamiento:** "Prewave sabe qué proveedor está expuesto; praev te dice qué probabilidad hay y qué decisión tomar" (informe 02).
- **Precio piloto hipotético:** US$500–2.000 al mes. Como referencia, NERAI publica una licencia de €4.900 al año (informe 02).
- **Preguntas de expansión:** suspensión de la pesca de anchoveta (PRODUCE), cierre del puerto del Callao (DICAPI/APN) y normas SBS/BCRP (informe 02).
- **Riesgos para Q&A:** Goodhart, sesgo de selección, información privilegiada, captura de la resolución y agentes correlacionados (informe 01).
- **Para el jurado:** la prueba "¿seguiría existiendo praev sin Stellar?" y la lección de Augur (informe 01). Por qué no usar Reflector (SEP-40) como oráculo (informe 03).
