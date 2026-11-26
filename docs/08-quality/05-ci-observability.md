# CI y observabilidad

**Estado:** P0 propuesta · **Versión:** 1.0 · **Fecha:** 2026-11-26

GitHub Actions workflow futuro: checkout, setup Node versión fijada, npm ci, lint, typecheck, vitest, build; job Rust con toolchain fijado, target wasm32v1-none, cargo test --locked, build Wasm. DB integración con servicio postgres:17 y migraciones. Playwright instalar browsers y ejecutar tests con adapter mock controlado. No incluir secretos operativos; testnet smoke manual o job protegido independiente. No usar acción automática que despliegue mainnet. Cache lockfile; adjuntar test reports sin datos sensibles.

Logs estructurados: timestamp, requestId, module, action, questionId, txHash (si existe), result, latency, errorCode; no signed XDR completo ni raw prompts/secret. Health separa DB/RPC, no devuelve URLs con tokens. Reconcile report: lastLedger, cursor status, pending count, gap, mismatches. Si gap o mismatch, banner integridad y evitar afirmar sincronía. Monitorizar tiempos LLM y coste por run si metadata disponible. No prometemos SLA. Antes de demo revisar contract TTL, DB, endpoint real y estado wallet.
