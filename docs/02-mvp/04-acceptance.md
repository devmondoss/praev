# Criterios de aceptación funcional

**Estado:** Normativo P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

| ID | Prueba observable | Evidencia |
|---|---|---|
| A01 | Crear pregunta con spec congelado y resolver asignado | tx + hash + export |
| A02 | Publicar forecast desde wallet y agente separado | 2 tx SUCCESS y versiones |
| A03 | Rechazar p fuera de rango, cutoff, signer incorrecto | test Rust y API |
| A04 | Mediana de últimas versiones confirmadas, baseline separado | test TS y UI |
| A05 | Guardar snapshot de decisión demo local | export JSON y test browser |
| A06 | Resolver solo tras ventana con evidencia y firma | tx + archivo + hash |
| A07 | Brier determinista, no score a invalidadas ni DEMO en LIVE | test fixture |
| A08 | Verificador distingue válido, mismatch y no disponible | pruebas de alteración |
| A09 | Lectura sin wallet; error/rechazo de firma manejado | Playwright/manual |
| A10 | Clon limpio compila, tests y testnet deploy documentados | logs, commit, contrato |
| A11 | Fuente real comprobada o bloqueo visible; sin falso forecast | muestra de dataset o nota |

Estado inicial de todas: PENDIENTE. No marcar A02 agente cumplido con fixture. La entrega técnica se considera completa solo cuando P0 está demostrado o limitaciones explícitas; no prometer puntaje.
