# Backlog ejecutable y ruta crítica

**Estado:** P0, orden obligatorio sugerido · **Versión:** 1.1 · **Fecha:** 2026-11-26

| ID | Tarea | Dependencia | Resultado observable |
|---|---|---|---|
| B01 | Bootstrap Next, DB, repo, env, CI básico | ninguna | build + health |
| B02 | Spike SENAMHI/MIDAGRI y decidir spec LIVE | ninguna | GO/NO-GO con muestra |
| B03 | Schema dominio, hashes, mediana, Brier, threshold | B01 | unit tests |
| B04 | Contrato Rust y tests roles/timestamps | B03 | Wasm + tests |
| B05 | Deploy testnet, bindings, cuentas | B04 | ID y receipt |
| B06 | DB migration y repositorios | B01,B03 | integración DB |
| B07 | Scripts create, resolver, evidence fixture | B05,B06 | ciclo CLI |
| B08 | Reconcile y tx intents | B05,B06 | idempotencia |
| B09 | UI radar y detalle lectura | B03,B06 | rutas navegables |
| B10 | Wallet prepare/submit/confirm | B08,B09 | tx humana SUCCESS |
| B11 | Agente único y output schema | B03,B07 | tx agente real |
| B12 | Decision Register local y outcome review | B09 | snapshot export |
| B13 | Forecasters/verifier | B07,B08,B09 | score y prueba pública |
| B14 | E2E, fuente real, accesibilidad, errores | B02,B10–B13 | matriz A/T |
| B15 | Deploy app, README final, video y submission | B14 | URL + commit + demo |

Ruta crítica: B01→B03→B04→B05→B07/B08→B10/B13→B14→B15. B02 paralelo y gate LIVE. Una sola persona (ADR-017): se trabaja la ruta crítica en serie. No asignar horas garantizadas; si falta tiempo, recortar P1, segundo adapter, charts y polish antes del ciclo principal.

**Orden de recorte para una persona** (propuesta; aplicar de arriba abajo solo si el calendario se retrasa):
1. B02 con un máximo de 2 h el 26 nov; si no hay GO, solo DEMO y bloqueo LIVE visible.
2. B10 sin `tx_intents` completos: el cliente firma y envía con los bindings, el servidor reconcilia por hash.
3. B08 con cursor de `getEvents` + `getTransaction`, sin `raw_xdr` ni gestión de huecos.
4. B12 como calculadora de umbral con un solo snapshot, sin historial ni export.
5. B14: E2E de Playwright pasa a checklist manual; se mantienen Vitest y `cargo test`.

No recortar B04, B05, B07, B11 (LLM real), B13 ni el ciclo DEMO resuelto en testnet. Al tener B05 (contrato en testnet), solicitar el hito "Stellar testnet" del Hub. Registrar bloqueos al día, no esconder. Todos pendientes al entregar esta documentación.
