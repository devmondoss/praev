# Criterios de aceptación funcional

**Estado:** Normativo P0 · **Versión:** 1.1 · **Fecha:** 2026-11-26

| ID | Prueba observable | Evidencia |
|---|---|---|
| A01 | Crear pregunta con spec congelado y resolver asignado | tx + hash + export |
| A02 | Sellar una tesis desde wallet y otra del agente rival con su cuenta | 2 tx SUCCESS con compromiso, versiones y recibos |
| A03 | Rechazar p fuera de rango (API), cutoff, signer incorrecto y compromiso cero (Rust) | test Rust y API |
| A04 | Antes del cierre no se expone ninguna tesis; al cierre, mediana de las últimas versiones reveladas, ancla separada | test TS, API y UI |
| A05 | Guardar snapshot de decisión demo local | export JSON y test browser |
| A06 | Resolver solo tras ventana con evidencia y firma | tx + archivo + hash |
| A07 | Brier determinista, no score a invalidadas ni DEMO en LIVE | test fixture |
| A08 | Verificador distingue válido, mismatch y no disponible | pruebas de alteración |
| A09 | Lectura sin wallet; error/rechazo de firma manejado | Playwright/manual |
| A10 | Clon limpio compila, tests y testnet deploy documentados | logs, commit, contrato |
| A11 | Fuente real comprobada o bloqueo visible; sin falso forecast | muestra de dataset o nota |
| A12 | Una tesis revelada coincide con su compromiso; una alterada da `invalid`; una perdida se revela con el recibo | test TS y verificador |
| A13 | Perfil del maker con Brier, skill frente al ancla, acierto, frente al consenso, frente a la IA y P&L de decisión, recalculado desde datos públicos | test fixture y UI |
| A14 | Un taker propone una pregunta firmada con su wallet y el curador la publica | firma verificada + tx create |
| A15 | Preguntas LIVE de tipo de cambio resueltas con la fuente oficial | tx resolve + manifest por pregunta |

Estado inicial de todas: PENDIENTE. No marcar A02 agente cumplido con fixture. La entrega técnica se considera completa solo cuando P0 está demostrado o limitaciones explícitas; no prometer puntaje.
