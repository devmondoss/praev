# Variables de entorno y configuración

**Estado:** P0; plantilla no secretos · **Versión:** 1.2 · **Fecha:** 2026-11-28

Copiar bloque a `.env.example`; valores reales en `.env.local` o gestor del deploy. Validar al arranque con Zod. Scripts cargan env de forma explícita (Next loadEnvConfig o mecanismo equivalente documentado).
```dotenv
DATABASE_URL=
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_RPC_URL=
NEXT_PUBLIC_PRAEV_CONTRACT_ID=
PRAEV_DEPLOYMENT_ID=
STELLAR_RPC_URL=
OPENROUTER_API_KEY=
OPENROUTER_MODEL=
PRAEV_CURATOR_ADDRESS=
PRAEV_RESOLVER_ADDRESS=
PRAEV_AGENT_ADDRESS=
```
RPC URL pública solo si no contiene API key; si requiere credencial, proxy server con allowlist y límites. Public env solo network, contract ID y RPC no secreto. Secret operativo de CLI se guarda en keystore local de Stellar, no en deployment web ni DB. El runner firma usando una cuenta testnet separada vía mecanismo local explícito; si requiere env temporal `PRAEV_AGENT_SECRET`, no incluir en env pública, logs ni CI, borrar al terminar. No llaves de mainnet. DB conexión TLS según proveedor y pool pequeño (p.ej. max 5 inicial, medir). Validar `NEXT_PUBLIC` contract/chain contra server config. **Implementado (28 nov):** el contract ID sale de `deployment.json`, versionado; `NEXT_PUBLIC_PRAEV_CONTRACT_ID` es opcional y, si se define con otro valor, `resolveContractId` lanza error en vez de leer otro contrato.

No fallback silencioso a mainnet, mock o fixture por falta de env. `demo` es bandera de datos, no de red. Read-only puede mostrar estado de configuración faltante, pero no permite firmar. `.gitignore`: .env*, excepto .env.example, `.stellar/`, target, node_modules, playwright artifacts con secretos. Criterio: build sin exponer secret, grep de bundle público, fail closed al faltar chain.

**Direcciones operativas (28 nov).** `PRAEV_CURATOR_ADDRESS`, `PRAEV_RESOLVER_ADDRESS` y `PRAEV_AGENT_ADDRESS` se validan como StrKey `G…` en `src/lib/env.ts`. Son públicas; las claves siguen solo en el keystore de stellar-cli. `question:create` exige `PRAEV_RESOLVER_ADDRESS` y, si está definido, que `PRAEV_CURATOR_ADDRESS` sea el curador de `deployment.json`. `PRAEV_CURATOR_KEY` (opcional, por defecto `curator`) es el **nombre** de la identidad en el keystore, nunca un secreto.
