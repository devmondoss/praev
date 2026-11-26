# Storage, eventos e indexación

**Estado:** P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

Instance storage: curator y schemaVersion. Persistent keys tipadas: `Question(id)`, `Forecast(id,address,seq)`, `LatestSeq(id,address)`, `Resolution(id)`, `CancelReason(id)`. No Vec global de participantes ni scans dentro del contrato. Cada forecast es append-only; `LatestSeq` puede avanzar. No almacenar PII, rationale o PDF.

Eventos conceptuales (topics símbolo + id; datos struct tipado): `q_created` con specHash, curator/resolver, mode y fechas; `forecast` con address, seq, p, rationaleHash, submittedAt; `resolved` con outcome,evidenceHash,time; `invalid` mismo con outcome 2; `cancelled` con reasonHash,time. Usar símbolos compatibles con SDK; definir schema y test de decode. Eventos no sustituyen persistencia. El índice guarda ID único de evento, tx, ledger, decoded payload y raw XDR; proyección en transacción SQL. No emitir `ScoreRecorded` si no existe atestación on-chain real.

TTL: medir límites de red y extender entradas persistentes/instancia/Wasm con mecanismo documentado; mantenimiento explícito antes de archivado, no hardcode de días→ledgers sin comprobar. Si archivada, restaurar según CLI/RPC y volver a simular. P0 documenta prueba de lectura antes demo; evitar claims “para siempre”. RPC retiene historial acotado; persistir receipts y estado, monitorizar rango `getHealth` y cursor. Fuentes: [persistent storage](https://developers.stellar.org/docs/build/guides/storage/use-persistent), [conventions](https://developers.stellar.org/docs/build/guides/conventions), [getEvents](https://developers.stellar.org/docs/data/apis/rpc/api-reference/methods/getEvents).
