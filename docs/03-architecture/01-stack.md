# Stack técnico seleccionado

**Estado:** Decisión propuesta P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

| Capa | Elección | Por qué |
|---|---|---|
| Runtime | Node.js 24 LTS objetivo, npm | Next.js requiere al menos 20.9 según docs; fijar versión exacta en implementación |
| App | Next.js App Router + React + TypeScript estricto | Una app, SSR lectura, Route Handlers API |
| Estilos | Tailwind CSS, CSS tokens, lucide-react | Pocas dependencias; no UI framework pesado |
| Validación | Zod | Contratos de API y salida IA |
| DB | PostgreSQL 17 + `postgres` (Postgres.js) | SQL simple, transacciones, local Docker y DB gestionada remota |
| Chain | `@stellar/stellar-sdk`, RPC, Rust/Soroban, Stellar CLI | Toda prueba en Stellar testnet |
| Wallet | `@creit.tech/stellar-wallets-kit` v2, probar Varial (antes Freighter) | Adapter único, firma no custodial |
| IA | SDK `openai`, Responses structured output + Zod, modelo configurable | Un proveedor, salida explícita, sin framework de agentes |
| Tests | Vitest, Playwright, `cargo test` con testutils | Unitarias, E2E y contrato |
| Deploy | Next.js Node server + PostgreSQL gestionado, opcional Vercel si smoke test pasa | Sin worker permanente obligatorio |

No ORM, Redis, colas, Kubernetes, LangChain, Supabase Auth, Graph DB o vector store en P0. No instalar versiones supuestamente últimas sin probar. Usar releases estables compatibles y registrar `node -v`, `npm ls`, `rustc --version`, `stellar --version`, `Cargo.lock` y `package-lock.json`. Rust mínimo 1.84 y target `wasm32v1-none` según guía oficial; SDK concreto se selecciona con scaffold actual y prueba de testnet. No se ejecutaron instalaciones en este paquete.

Fuentes: [Next.js instalación](https://nextjs.org/docs/app/getting-started/installation), [Stellar setup](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup), [Wallet Kit v2](https://github.com/stellar/ecosystem-resources/blob/main/wallet-integration/stellar-wallets-kit.md), [Varial](https://stellar.org/blog/foundation-news/freighter-is-now-varial), [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs).
