# Stack técnico seleccionado

**Estado:** Decisión propuesta P0 · **Versión:** 1.1 · **Fecha:** 2026-11-26

| Capa | Elección | Por qué |
|---|---|---|
| Runtime | Node.js 24 LTS objetivo, npm | Next.js requiere al menos 20.9 según docs; fijar versión exacta en implementación |
| App | Next.js App Router + React + TypeScript estricto | Una app, SSR lectura, Route Handlers API |
| Estilos | Tailwind CSS, CSS tokens, lucide-react | Pocas dependencias; no UI framework pesado |
| Validación | Zod | Contratos de API y salida IA |
| DB | PostgreSQL 17 + `postgres` (Postgres.js) | SQL simple, transacciones, local Docker y DB gestionada remota |
| Chain | `@stellar/stellar-sdk`, RPC, Rust/Soroban, Stellar CLI | Toda prueba en Stellar testnet |
| Wallet | `@creit.tech/stellar-wallets-kit` v2, probar Varial (antes Freighter) | Adapter único, firma no custodial |
| IA | OpenRouter vía SDK `openai` (`baseURL` `https://openrouter.ai/api/v1`), Responses con `json_schema` estricto + Zod, modelo configurable (ADR-021) | Una sola integración y libertad para cambiar de modelo; salida explícita, sin framework de agentes |
| Tests | Vitest, Playwright, `cargo test` con testutils | Unitarias, E2E y contrato |
| Deploy | Vercel + Neon Postgres (ADR-019) | Sin worker permanente obligatorio; usar la URL *pooled* de Neon con Postgres.js |

No ORM, Redis, colas, Kubernetes, LangChain, Supabase Auth, Graph DB o vector store en P0. No instalar versiones supuestamente últimas sin probar. Usar releases estables compatibles y registrar `node -v`, `npm ls`, `rustc --version`, `stellar --version`, `Cargo.lock` y `package-lock.json`. Rust mínimo 1.91 (`rust_version` de soroban-sdk 30 en crates.io) y target `wasm32v1-none`. No se ejecutaron instalaciones en este paquete.

## Versiones verificadas (26 nov 2026, ADR-018)

| Pieza | Versión | Nota |
|---|---|---|
| Red | Testnet, protocolo 30 | Ledger ≈ 5 s |
| `soroban-sdk` | `=30.0.0` | Publicado el 24 nov; si el spike del día 1 falla, `=28.0.0`. Fijar con `=` |
| `stellar-cli` | 30.0.1 | Contratos con SDK 30 requieren CLI ≥ 30 |
| Bindings TS | `npx @stellar/stellar-sdk generate` | `stellar contract bindings typescript` está obsoleto |
| `@stellar/stellar-sdk` | 17.4.0 | Node ≥ 22.12; devuelve `Uint8Array`, no `Buffer`; namespace `rpc` |
| `@creit.tech/stellar-wallets-kit` | 2.8.0 | Confirmar el id del módulo Varial/Freighter en esta versión |
| OpenZeppelin Stellar | No se usa | 0.8.0 exige `soroban-sdk ^28`; un rol `curator` no lo justifica |

Fuentes: [Next.js instalación](https://nextjs.org/docs/app/getting-started/installation), [Stellar setup](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup), [Wallet Kit v2](https://github.com/stellar/ecosystem-resources/blob/main/wallet-integration/stellar-wallets-kit.md), [Varial](https://stellar.org/blog/foundation-news/freighter-is-now-varial), [OpenRouter Structured Outputs](https://openrouter.ai/docs/features/structured-outputs).

## Versiones instaladas en el Sprint 0 (26 nov 2026)

Comprobadas con `npm ci`, `cargo test` y `stellar contract build`. Fijadas sin `^` en `package.json` y en `contracts/Cargo.toml`.

| Pieza | Versión |
|---|---|
| Node / npm | 24.20.0 / 11.19.0 (`engines` ≥ 22.12, `.nvmrc` 24) |
| Rust / cargo | 1.98.0 |
| stellar-cli | 30.0.1 (binario oficial, SHA-256 verificado) |
| soroban-sdk | 30.0.0, confirmado: compila, pasa tests y despliega en testnet con CLI 30.0.1 |
| next / react / react-dom | 16.4.6 / 19.3.0 / 19.3.0 (Cache Components activado) |
| typescript / eslint | 5.9.3 / 9.39.5 |
| tailwindcss / @tailwindcss/turbopack | 4.3.3 / 4.3.3 |
| zod / postgres / server-only | 4.6.7 / 4.1.1 / 0.0.1 |
| vitest / tsx | 5.1.0 / 4.23.15 |
| Base de datos | Neon Postgres (plan free) vía Vercel Marketplace; `compose.yaml` queda como alternativa local con Docker |

Los paquetes de Stellar en JS, Wallets Kit y el SDK `openai` se instalan en el sprint que los usa, con la misma regla: versión exacta publicada hace al menos dos semanas.
