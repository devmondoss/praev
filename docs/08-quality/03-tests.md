# Matriz de pruebas reproducibles

**Estado:** P0; en curso · **Versión:** 1.2 · **Fecha:** 2026-11-27

**Pasan al 27 nov:** T01–T04, T05 (parte Rust), T06–T08 con `npm run contract:test`; T12, T13 y T29 con `npm test`. El resto sigue pendiente.

| ID | Nivel | Caso | Esperado |
|---|---|---|---|
| T01 | Rust | crear válido | state y evento |
| T02 | Rust | creator no autorizado | host rechaza |
| T03 | Rust | ID duplicado | Exists |
| T04 | Rust | roles iguales / tiempos inválidos | RoleConflict / InvalidTime |
| T05 | Rust + API | compromiso cero (Rust); p=0, 10000 y 10001 en `prepare` | InvalidHash; dos válidos, último rechazado |
| T06 | Rust | forecast exactamente cutoff | Closed |
| T07 | Rust | seq repetida/salto, address ajena | rechazo |
| T08 | Rust | resolver/curator forecast | rechazo |
| T09 | Rust | resolve temprano / tarde / sin auth | rechazo |
| T10 | Rust | resolve YES/NO, doble | terminal, doble falla |
| T11 | Rust | invalid y cancel válidos | sin score |
| T12 | TS | canonicalización key order/NFC/float | igual/igual/rechazo |
| T13 | TS | alterar byte | mismatch |
| T14 | TS | mediana n=0,1,2,3 y versiones | null y valores exactos |
| T15 | TS | Brier extremos, demo/live | correcto, separado |
| T16 | TS | threshold L=0, C>L, igualdad | N/D, no cruce, indiferencia |
| T17 | TS | parser faltante/duplicado/igualdad | invalidar, no doble suma, NO |
| T18 | TS | IA IDs inventados/refusal/late source | no firma |
| T19 | DB | evento duplicado, conflicto distinto | idempotente, alerta |
| T20 | API | signed XDR alterado/otra red/operación extra | rechazo |
| T21 | API | timeout RPC, retry submit | unknown, no duplicación |
| T22 | browser | lectura sin wallet y mobile | usable |
| T23 | browser | rechazo firma | draft persiste |
| T24 | browser | snapshot cambia p, recarga, export/delete | registro intacto |
| T25 | testnet manual | ciclo real con dos direcciones | hashes, receipts, score |
| T26 | testnet | verifier con contrato diferente / historia vieja | mismatch/unavailable |
| T27 | source | acceso LIVE y muestra | GO o bloqueo explícito |
| T28 | CI | clon limpio, lint/types/tests/build | todo verde |
| T29 | TS | compromiso de tesis: misma tesis con otra sal, sal inválida, byte alterado | distinto, rechazo, mismatch |
| T30 | API | lectura de tesis antes del cierre (lista, detalle, proof, makers) | nunca devuelve probabilidad ni fundamentos |
| T31 | TS | revelado: última versión `unrevealed` con versión anterior revelada | el maker queda fuera, no se usa la anterior |
| T32 | API | `reveal` con recibo correcto, alterado y antes del cierre | 200, 409, 409 |
| T33 | TS | ancla `fx_daily` y `precipitation` con fixtures; menos de 30 ventanas | valor exacto; control 5000 etiquetado |
| T34 | TS | métricas del perfil: acierto con p=5000, BSS con ancla 0, P&L de decisión YES/NO, consenso leave-one-out | valores exactos del ejemplo de 10-reputation |
| T35 | TS | parser `single`: dato `n.d.`, dos valores el mismo día, igualdad con el umbral | faltante, invalidar, NO |
| T36 | API | propuesta con firma inválida, de otra dirección o con montos | rechazo |

Tests Rust usan `Env` y testutils, ledger timestamps controlados solo en unitarias. Verificar auth negativa sin `mock_all_auths` indiscriminado. Vitest dominio puro, integración con DB aislada, Playwright UI con adapter fake marcado solo en test; no usar mock para evidencia final. T25 es manual con wallet real testnet. Registrar comando, fecha, versión, commit y resultado. No escribir PASS antes de ejecutar.
