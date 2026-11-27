# API REST y contratos de transporte

**Estado:** P0 especificación · **Versión:** 1.1 · **Fecha:** 2026-11-26

Base `/api/v1`, JSON UTF-8; timestamps Unix segundos; bps integer; IDs UUID; hashes lowercase hex. Lecturas públicas, sin credenciales. Escrituras de usuario son preparación y envío de tx, no autoridad de negocio. Admin por CLI local, no ruta pública de resolución.

| Método y ruta | Input | Respuesta |
|---|---|---|
| GET `/questions?mode=LIVE&status=OPEN&limit=20` | filtros allowlist, limit 1..50 | `{items,nextCursor}` |
| GET `/questions/{id}` | UUID | `{spec,proof,status,sealedCount,consensus,humanConsensus,anchor,brief,resolution}`; `consensus` es `null` antes del cierre |
| GET `/questions/{id}/forecasts?limit=50` | cursor opcional | `{items,nextCursor}`; antes del cierre cada item trae solo address, seq, commitment, hora y tx; después, la tesis y su estado `revealed/unrevealed/invalid` |
| GET `/questions/{id}/evidence` | purpose opcional | `{items}` metadata |
| GET `/evidence/{id}/content` | UUID | bytes exactos si publicables, MIME seguro |
| GET `/makers?mode=LIVE&category=economy_finance` | filtros | `{items:[{address,kind,n,brier,provisional}]}` |
| GET `/makers/{address}` | dirección G | perfil con las métricas de [10-reputation](../04-domain/10-reputation.md) por cohorte e historial paginado con enlaces a tx |
| GET `/proof/{id}` | UUID pregunta | spec bytes b64, chain ID, contract, hashes, status, receipts y manifest si existe |
| POST `/forecasts/prepare` | `ThesisPayload` completo (con sal del cliente) | intentId, commitment, expected, unsignedXdr, expiresAt |
| POST `/forecasts/reveal` | `ThesisPayload` del recibo | 200 si el hash coincide con el compromiso on-chain y la pregunta ya cerró; 409 si no |
| POST `/proposals` | propuesta canónica + firma `signMessage` de la wallet | 201 `{id,status}`; sin montos ni PII |
| POST `/transactions/submit` | intentId, signedXdr | 202 `{txHash,state}` o receipt idempotente |
| GET `/transactions/{hash}` | hash exacto | `{state,txHash,ledger,reason}` |
| GET `/health` | ninguno | `{app:'ok',db:'ok|error',rpc:'ok|error'}`; no secretos |

Ejemplo prepare:
```json
{"schema":"praev.thesis.v1","questionId":"6acaa9ba-0d32-4bb8-936c-48d96e82fb0d","forecaster":"<dirección G válida de testnet>","seq":1,"kind":"human","probabilityBps":7000,"anchorBps":4200,"factors":[{"label":"Presión compradora de fin de mes","direction":"up"}],"evidence":[],"changeMyMind":"Una baja del dólar global mayor a 1 % antes del cierre","note":"","informationCutoff":1795000000,"agent":null,"salt":"<64 hex del CSPRNG del navegador>"}
```
La dirección ejemplo es placeholder, no ejecutable. Server valida question OPEN, address, rango de p, longitudes, sal y IDs; comprueba que `seq` es el siguiente leído de la cadena; canonicaliza, calcula el compromiso y guarda el payload en `thesis_payloads` (no visible hasta el cierre), guarda intent con expected args, simula. No firma ni cobra. `submit` parsea XDR con testnet passphrase, rechaza operación extra/fee bump no soportado, compara hash de envelope sin firmas (transaction hash), source, contract y args con intent, valida expiración, envía a RPC. La firma y require_auth se validan en red; no crear sesión de login a partir de mera conexión wallet. Enviar XDR firmada repetida devuelve estado existente si coincide; jamás crear otra versión automática.

No endpoint para actualizar forecast existente. `GET proof` incluye bytes de spec base64 y hashes; historial de forecast paginado, evidencia descarga bajo content. Metadata pública puede ser cacheada brevemente, estados y prepare no-cache. Limitaciones: indexación eventualmente consistente, 202 no es SUCCESS, cursor opaco y estable. Documentar OpenAPI futuro; contrato de MVP en este archivo.
