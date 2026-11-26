# API REST y contratos de transporte

**Estado:** P0 especificación · **Versión:** 1.0 · **Fecha:** 2026-11-26

Base `/api/v1`, JSON UTF-8; timestamps Unix segundos; bps integer; IDs UUID; hashes lowercase hex. Lecturas públicas, sin credenciales. Escrituras de usuario son preparación y envío de tx, no autoridad de negocio. Admin por CLI local, no ruta pública de resolución.

| Método y ruta | Input | Respuesta |
|---|---|---|
| GET `/questions?mode=LIVE&status=OPEN&limit=20` | filtros allowlist, limit 1..50 | `{items,nextCursor}` |
| GET `/questions/{id}` | UUID | `{spec,proof,status,consensus,baseline,resolution}` |
| GET `/questions/{id}/forecasts?limit=50` | cursor opcional | `{items,nextCursor}` |
| GET `/questions/{id}/evidence` | purpose opcional | `{items}` metadata |
| GET `/evidence/{id}/content` | UUID | bytes exactos si publicables, MIME seguro |
| GET `/forecasters?mode=DEMO&domain=climate` | filtros | `{items:[{address,kind,n,brier,provisional}]}` |
| GET `/proof/{id}` | UUID pregunta | spec bytes b64, chain ID, contract, hashes, status, receipts y manifest si existe |
| POST `/forecasts/prepare` | questionId, address, p, rationale breve, evidenceIds | intentId, expected, unsignedXdr, expiresAt |
| POST `/transactions/submit` | intentId, signedXdr | 202 `{txHash,state}` o receipt idempotente |
| GET `/transactions/{hash}` | hash exacto | `{state,txHash,ledger,reason}` |
| GET `/health` | ninguno | `{app:'ok',db:'ok|error',rpc:'ok|error'}`; no secretos |

Ejemplo prepare:
```json
{"questionId":"6acaa9ba-0d32-4bb8-936c-48d96e82fb0d","address":"<dirección G válida de testnet>","probabilityBps":7000,"rationale":"Evidencia disponible al corte.","evidenceIds":[]}
```
La dirección ejemplo es placeholder, no ejecutable. Server valida question OPEN, address, p, length y IDs; arma payload, hash y seq desde chain, guarda intent con expected args, simula. No firma ni cobra. `submit` parsea XDR con testnet passphrase, rechaza operación extra/fee bump no soportado, compara hash de envelope sin firmas (transaction hash), source, contract y args con intent, valida expiración, envía a RPC. La firma y require_auth se validan en red; no crear sesión de login a partir de mera conexión wallet. Enviar XDR firmada repetida devuelve estado existente si coincide; jamás crear otra versión automática.

No endpoint para actualizar forecast existente. `GET proof` incluye bytes de spec base64 y hashes; historial de forecast paginado, evidencia descarga bajo content. Metadata pública puede ser cacheada brevemente, estados y prepare no-cache. Limitaciones: indexación eventualmente consistente, 202 no es SUCCESS, cursor opaco y estable. Documentar OpenAPI futuro; contrato de MVP en este archivo.
