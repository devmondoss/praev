# Fuentes, trazabilidad y límites de verificación

**Estado:** Referencias consultadas y entregadas · **Versión:** 1.0 · **Fecha:** 2026-11-26

## Material del usuario
Los originales se preservan byte a byte en `../../research/01-strategic-research.md`, `02-market-whitespace.md`, `03-mvp-research.md`. Fecha de corte declarada 26 nov 2026. Las citas internas `turn...` son referencias de una sesión ChatGPT, no enlaces públicos portables; se conservan sin inventar bibliografía. La síntesis incorpora conversaciones previas: misión, relevancia, región, no custodia, arquitectura conceptual y Decision Register. Las bases Codember aportadas se usan para checklist; no se incluye documento privado de aplicación ni datos personales. No se revalidaron todos los claims de mercado, fuentes de estaciones o casos comerciales.

## Verificación web técnica de esta consolidación (26 nov 2026)
- [Stellar: setup](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup): Rust ≥1.84 y target wasm32v1-none.
- [Stellar: deploy testnet](https://developers.stellar.org/docs/build/smart-contracts/getting-started/deploy-to-testnet): cuentas, CLI, despliegue e invocación.
- [Stellar: authorization](https://developers.stellar.org/docs/learn/fundamentals/contract-development/authorization): framework auth y replay.
- [Stellar: persistent storage](https://developers.stellar.org/docs/build/guides/storage/use-persistent), [conventions](https://developers.stellar.org/docs/build/guides/conventions): storage y TTL.
- [Stellar RPC getTransaction](https://developers.stellar.org/docs/data/apis/rpc/api-reference/methods/getTransaction), [getEvents](https://developers.stellar.org/docs/data/apis/rpc/api-reference/methods/getEvents): estado, cursor, retención limitada y deduplicación.
- [Stellar ecosystem Wallet Kit v2](https://github.com/stellar/ecosystem-resources/blob/main/wallet-integration/stellar-wallets-kit.md), [Varial antes Freighter](https://stellar.org/blog/foundation-news/freighter-is-now-varial): integración y cambio de marca.
- [Next.js instalación](https://nextjs.org/docs/app/getting-started/installation), [Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers), [deploy](https://nextjs.org/docs/app/getting-started/deploying): runtime mínimo, arquitectura y hosting.
- [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs): esquema y manejo de refusal.
- [PostgreSQL isolation](https://www.postgresql.org/docs/17/transaction-iso.html): transacciones y retry de conflictos.

Los ejemplos de schema, contratos, SQL, API, algoritmos, UX y scripts son diseño propuesto del asistente. No fueron compilados ni ejecutados; las versiones exactas y compatibilidad deben fijarse con smoke tests. Los portales oficiales de datos son candidatos, no integraciones verificadas. No hay repo publicado ni transacciones reales generadas por este trabajo.
