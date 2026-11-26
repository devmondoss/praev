# Estados y transiciones

**Estado:** P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

| Estado | Origen | Transición |
|---|---|---|
| DRAFT | DB | REVIEW después de completar campos |
| REVIEW | DB | DRAFT si falla; OPEN solo tras tx create SUCCESS |
| OPEN | chain, t < closesAt | CLOSED derivado de ledger time; CANCELLED por curador antes de cutoff |
| CLOSED | chain, t ≥ closesAt | RESOLUTION_PENDING durante ventana y latencia |
| RESOLUTION_PENDING | vista derivada | RESOLVED/INVALID por resolver, con regla |
| RESOLVED | chain | terminal |
| INVALID | chain | terminal, sin score |
| CANCELLED | chain | terminal, sin score |

P0 no introduce estado PROVISIONAL persistido ni ventana de disputa on-chain. La propuesta de resolución se prepara off-chain y se revisa antes de única tx final. `resolve` solo a partir de resolveAfter y hasta resolveBy inclusive; `invalidate` por resolver después de resolveAfter con hash de motivo/evidencia, o después de resolveBy si expiró. Ninguna transición reabre una pregunta. Si no hay resolver, queda pendiente/expirada y no puntúa. `CLOSED` es derivado, no requiere keeper. Reloj autoritativo: timestamp del ledger para chain; UI reloj estimado solo para visualización. Un usuario que firma a último segundo puede fallar, avisar.

Criterio: pruebas de límite exacto de cierre (t==closesAt rechaza), resolución temprana, terminal doble, cancelación tardía. SQL puede representar vista efectiva, pero no autoridad para autorizar.
