# 11 · API y SDK — interfaz propuesta

API versionada `/v1`, JSON, UTC ISO 8601, probabilidades enteras bps 0..10000, dinero en unidades mínimas como strings decimales; identificadores opacos y hashes hex de longitud fija. Lectura pública de información no privada; sesión con challenge firmado de nonce de un solo uso, dominio, red y expiración. Validar firma conforme al tipo de cuenta soportado. No usar API keys con capacidad de transferir fondos de terceros. SDK devuelve transacción preparada; signer externo decide si firma.

| Método / ruta | Uso |
|---|---|
| GET `/v1/questions` | Listado, filtro dominio, estado, cursor |
| POST `/v1/questions` | Propuesta autenticada, no publicación automática |
| GET `/v1/questions/:id` | Reglas, relevancia, estado, fuentes |
| GET `/v1/questions/:id/consensus` | Probabilidad, corte, muestra, metodología |
| POST `/v1/forecasts/commit/prepare` | Preparar commit; sin salt ni contenido confidencial |
| POST `/v1/forecasts/reveal/prepare` | Preparar reveal en ventana correcta |
| GET `/v1/profiles/:id/passport` | Credencial pública, métricas y proof |
| GET `/v1/proofs/:id` | Referencias on-chain y manifiesto público |
| POST `/v1/purchases/prepare` | Intento de compra con términos y purchase ID |
| GET `/v1/purchases/:id` | Estado y recibo, acceso autenticado |
| GET `/v1/reports/:id` | Informe; comprobar entitlement |

Ejemplo de respuesta (fixture, no API desplegada):

```json
{
  "question_id": "demo-climate-01",
  "status": "awaiting_resolution",
  "network": "stellar-testnet",
  "consensus_bps": 7090,
  "forecaster_count": 3,
  "as_of": "2026-12-01T14:00:00Z",
  "method_version": "consensus-v0.1",
  "relevance": {"score": 88, "rubric_version": "v0.1"},
  "demo_data": true,
  "proof_refs": []
}
```

## SDK mínimo

Operaciones conceptuales: `listQuestions`, `prepareCommit`, `computeCommitment`, `prepareReveal`, `getPassport`, `verifyProof`, `getConsensus`, `preparePurchase`. Documentar canonización compartida y vectores. Mantener signer inyectable; nunca exportar secrets por logs. Cliente de referencia de agente lee pregunta, genera probabilidad con inputs versionados, firma con wallet propia, conserva payload, revela dentro de plazo y obtiene resultado. Si el pronóstico es fixture o heurística, etiquetarlo como tal; un agente de demo no prueba capacidad de frontera.

```ts
// Pseudocódigo de interfaz, no SDK instalado
const q = await client.getQuestion(questionId);
const sealed = localSeal({ question: q, pBps: 7000, reasoningHash });
await localVault.save(sealed); // secreto bajo control del titular
const tx = await client.prepareCommit(q.id, sealed.commitment, signer.address);
const signed = await signer.sign(tx);
await rpcSubmitAndConfirm(signed);
```

## Errores y operación

`400 INVALID_INPUT`, `401 AUTH_REQUIRED`, `403 NOT_AUTHORIZED`, `404 NOT_FOUND`, `409 STATE_CONFLICT`, `422 OUTSIDE_WINDOW`, `429 RATE_LIMITED`, `503 CHAIN_UNAVAILABLE`. Idempotency-Key para operaciones de backend; purchase ID on-chain para efectos económicos. No tratar respuesta de preparación como confirmación. Paginar lecturas, límites por cuenta/IP, correlación de requests sin exponer secretos. OpenAPI y ejemplos reales se generan después de implementar.
