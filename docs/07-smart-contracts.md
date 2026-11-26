# 07 · Smart contracts — especificación Soroban

Interfaces conceptuales (no código compilado). Implementar con tipos, serialización, autorización y eventos compatibles con la versión de Soroban escogida. P0 puede agrupar identidad, preguntas y snapshots en un contrato Registry para reducir despliegues; pago separado.

## Registry

| Método conceptual | Autorización | Restricción |
|---|---|---|
| `register_identity(owner, kind, metadata_hash, version)` | owner | Tipo declarado; versión única por owner |
| `create_question(id, rules_hash, deadlines, domain)` | curator | ID único, plazos crecientes |
| `commit(id, owner, commitment)` | owner | Ventana abierta; 1 por identidad/pregunta P0 |
| `reveal(id, owner, p_bps, reasoning_hash, salt)` | owner | Ventana reveal, hash coincidente, 0..10000 bps |
| `propose_resolution(id, outcome, evidence_hash)` | resolver | Después de ventana observable; resultado 0/1 o cancelación |
| `finalize_resolution(id)` | resolver según política | Propuesta válida; final única |
| `cancel_question(id, reason_hash)` | curator/resolver | Política pública; nunca score cancelado |
| `anchor_score(owner, domain, snapshot_hash, method_version, cutoff)` | score publisher | Corte válido, snapshot inmutable y versionado |

Roles explícitos con inicialización protegida; no `init` reejecutable. Una wallet no puede firmar por otra. Evitar upgrade no controlado: P0 preferir contratos sin función de upgrade o documentar de forma visible autoridad y limitaciones. No almacenar secrets de apertura antes de revelar.

## Payment router

| Método conceptual | Autorización | Restricción |
|---|---|---|
| `create_offer(offer_id, seller, asset, amount, content_hash, fee_bps, expiry)` | seller | Asset permitido, monto >0, fee visible y acotado |
| `purchase(offer_id, buyer, purchase_id, expected_terms_hash)` | buyer | Oferta vigente; términos exactos, ID único, comprador firma |
| `get_receipt(purchase_id)` | lectura | Devuelve referencias verificables |

Usar transferencias atómicas de activo Stellar compatible con Soroban desde comprador a vendedor y, si existe, receptor de comisión. El router no acumula balances. Verificar autorización de subinvocaciones y transferencia de tokens en pruebas; no inventar API exacta. Si alguna transferencia falla, aborta toda la operación. `purchase_id` y términos evitan doble ejecución lógica; evitar usar un token no permitido. No ejecutar transferencias de compradores desde un servicio con firma propia.

## Eventos y auditoría

`identity_registered`, `question_created`, `forecast_committed`, `forecast_revealed`, `resolution_proposed`, `resolution_finalized`, `question_cancelled`, `score_anchored`, `offer_created`, `purchase_completed`. Payload mínimo versionado, sin PII; el indexador asocia hash de tx, ledger, contrato y cursor. Consumidores toleran eventos repetidos y desconocidos. Conservar historial aun si cambian los parámetros del producto.

## Invariantes

1. No alterar reglas después del primer compromiso; nueva versión implica nueva pregunta.
2. Ningún reveal válido antes de cerrar commits ni después de su plazo; ventana de observación posterior al reveal para el piloto.
3. Una resolución final no se sobrescribe; correcciones deben crear registro explícito y nueva versión de métricas.
4. No score sin resolución final, ni entradas no abiertas, ni preguntas canceladas.
5. No mover dinero sin autorización verificable del titular; ni función de retiro de fondos de usuarios, ni delegación general a Pravef.
6. La suma de vendedor y fee iguala monto total; usar enteros, overflow checks y política de redondeo.
7. No emitir dos recibos válidos por el mismo purchase ID.

## Seguridad y costos

Probar autorización negativa, entradas extremas, doble inicialización, deadlines, colisiones de identificadores, replay, transferencias parciales, activos no permitidos, tamaños máximos y agotamiento de presupuesto. Evitar iteraciones on-chain sobre historial completo. Definir TTL/extend/restoration y límites de almacenamiento; registrar sus costos en testnet. Revisar contratos antes de mainnet: pasar tests no equivale a auditoría.

Referencias técnicas oficiales para verificar durante implementación: https://developers.stellar.org/ ; https://developers.stellar.org/docs/build/smart-contracts ; repositorio SDK https://github.com/stellar/rs-soroban-sdk . No se fijan comandos ni versiones sin comprobar toolchain local.
