# Indexer y reconciliación

**Estado:** P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

Dos mecanismos: (1) consulta de receipt individual después de cada envío, (2) script `chain:reconcile` que lee eventos del contrato desde deployment ledger y avanza cursor. Cada evento trae event_id, txHash, ledger y payload. Validar red/contract/schema, decode XDR, guardar raw y proyección en una transacción. Si falta spec/payload, guardar raw y marca huérfano; esperar llegada de contenido y reprocesar. Los `get_question/get_forecast/get_resolution` sirven para verificar estado y reparar. Un receipt SUCCESS no basta si no corresponde al intent.

Pseudocódigo:
```text
load cursor and oldestLedger
if cursor outside retention: mark GAP, do not pretend synced
fetch page filtered by contract
for event in page:
  transaction:
    insert raw event if absent; compare if existing
    apply expected transition/upsert projection if possible
    persist cursor after processed page/event according to RPC cursor semantics
reconcile pending tx hashes; report mismatch and gaps
```
Usar getEvents cursor real (no inventar offset); persistir cursor de página solo al completar todos los eventos de esa página. Un fallo intermedio permite reingestión deduplicada. No saltar eventos desconocidos sin registrar. Si RPC pierde historia, consultar estado y receipts persistidos o indexer alternativo; no afirmar historia completa si hay gap. En demo ejecutar script antes y después, on-demand tras confirmación. Fuente: [getEvents](https://developers.stellar.org/docs/data/apis/rpc/api-reference/methods/getEvents), [getTransaction](https://developers.stellar.org/docs/data/apis/rpc/api-reference/methods/getTransaction).
