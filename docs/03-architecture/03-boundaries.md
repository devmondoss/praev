# Fronteras y fuentes de verdad

**Estado:** P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

| Dato | Autoridad | Copia/proyección |
|---|---|---|
| Spec publicada | Hash y registro en contrato | JSON canónico en DB |
| Forecast firmado | Contrato + ledger | Historial SQL |
| Evidencia externa | Fuente definida / fixture | Bytes y hash DB |
| Outcome | Resolver autorizado + regla y evidencia | Estado contrato y SQL |
| Brier / consenso | Código determinista sobre registros confirmados | Consulta SQL/calculado |
| Decisión demo | Navegador del usuario | localStorage y export JSON |
| Identidad | Address técnica y autorización | Tipo declarado en DB |

Si SQL y chain discrepan, mostrar `sync_pending` o `integrity_error`, no sobreescribir chain ni decir confirmado. Reconstruir proyección desde receipts/eventos. Si bytes desaparecen, hash no permite reconstrucción: marcar no verificable. Una firma no garantiza origen oficial del PDF/CSV; validar URL, captura y regla. La reputación se deriva; no permitir un admin editar Brier a mano.
