# Variables de entorno y configuración

**Estado:** P0; plantilla no secretos · **Versión:** 1.0 · **Fecha:** 2026-11-26

Copiar bloque a `.env.example`; valores reales en `.env.local` o gestor del deploy. Validar al arranque con Zod. Scripts cargan env de forma explícita (Next loadEnvConfig o mecanismo equivalente documentado).
```dotenv
DATABASE_URL=
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_RPC_URL=
NEXT_PUBLIC_PRAEV_CONTRACT_ID=
PRAEV_DEPLOYMENT_ID=
STELLAR_RPC_URL=
OPENAI_API_KEY=
OPENAI_MODEL=
PRAEV_CURATOR_ADDRESS=
PRAEV_RESOLVER_ADDRESS=
PRAEV_AGENT_ADDRESS=
```
RPC URL pública solo si no contiene API key; si requiere credencial, proxy server con allowlist y límites. Public env solo network, contract ID y RPC no secreto. Secret operativo de CLI se guarda en keystore local de Stellar, no en deployment web ni DB. El runner firma usando una cuenta testnet separada vía mecanismo local explícito; si requiere env temporal `PRAEV_AGENT_SECRET`, no incluir en env pública, logs ni CI, borrar al terminar. No llaves de mainnet. DB conexión TLS según proveedor y pool pequeño (p.ej. max 5 inicial, medir). Validar `NEXT_PUBLIC` contract/chain contra server config.

No fallback silencioso a mainnet, mock o fixture por falta de env. `demo` es bandera de datos, no de red. Read-only puede mostrar estado de configuración faltante, pero no permite firmar. `.gitignore`: .env*, excepto .env.example, `.stellar/`, target, node_modules, playwright artifacts con secretos. Criterio: build sin exponer secret, grep de bundle público, fail closed al faltar chain.
