# Matriz de pruebas reproducibles

**Estado:** P0; todos pendientes · **Versión:** 1.0 · **Fecha:** 2026-11-26

| ID | Nivel | Caso | Esperado |
|---|---|---|---|
| T01 | Rust | crear válido | state y evento |
| T02 | Rust | creator no autorizado | host rechaza |
| T03 | Rust | ID duplicado | Exists |
| T04 | Rust | roles iguales / tiempos inválidos | RoleConflict / InvalidTime |
| T05 | Rust | p=0,10000 y 10001 | dos válidos, último rechazado |
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

Tests Rust usan `Env` y testutils, ledger timestamps controlados solo en unitarias. Verificar auth negativa sin `mock_all_auths` indiscriminado. Vitest dominio puro, integración con DB aislada, Playwright UI con adapter fake marcado solo en test; no usar mock para evidencia final. T25 es manual con wallet real testnet. Registrar comando, fecha, versión, commit y resultado. No escribir PASS antes de ejecutar.
