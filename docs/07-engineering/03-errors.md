# Errores, reintentos e idempotencia

**Estado:** P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

Envelope `{"error":{"code":"QUESTION_CLOSED","message":"El plazo de pronóstico terminó.","requestId":"uuid","retryable":false}}`. No stack traces, SQL, prompt ni claves.

| HTTP | Código | Manejo |
|---|---|---|
| 400 | INVALID_INPUT / INVALID_XDR / WRONG_NETWORK | Corregir input, no retry automático |
| 404 | QUESTION_NOT_FOUND / PROOF_NOT_FOUND | Mostrar ausencia |
| 409 | QUESTION_CLOSED / SEQ_CONFLICT / TERMINAL / INTENT_MISMATCH | Refrescar estado, preparar nueva tx solo con confirmación |
| 410 | INTENT_EXPIRED | Preparar de nuevo |
| 413 | PAYLOAD_TOO_LARGE | Reducir contenido |
| 429 | RATE_LIMITED | Backoff y Retry-After |
| 502/503 | RPC_UNAVAILABLE / SOURCE_UNAVAILABLE / DB_UNAVAILABLE | Reintentar lectura, no inventar datos |
| 500 | INTEGRITY_ERROR / INTERNAL_ERROR | Bloquear verificación, correlación en log |

Idempotencia: intent UUID + expected tx hash; almacenar hash antes de envío o en misma operación lógica; reconciliar por hash si proceso muere. Un submit repetido de mismo envelope no duplica forecast. `NOT_FOUND` permanece unknown/pending hasta expiración y comprobación de ledger; no deducir que jamás se ejecutó. Un nuevo intent tras `bad_seq` no altera p sin usuario. Para create/resolve scripts, verificar estado y confirmar que terminal coincide antes de reintentar. Bloqueos SQL por fila para proyección; conflicto mismatch requiere investigación, no overwrite.
