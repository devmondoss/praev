# Arranque local y dependencias

**Estado:** Runbook propuesto, no ejecutado · **Versión:** 1.1 · **Fecha:** 2026-11-26

Requisitos: Git, Node 24 LTS objetivo, npm, Docker, Rust stable ≥1.91, Stellar CLI, wallet testnet. [Guía oficial Next](https://nextjs.org/docs/app/getting-started/installation), [Setup Stellar](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup). Desde repo vacío, conservar docs y generar scaffold en directorio temporal si CLI no acepta carpeta no vacía; mover código sin sobrescribir README/AGENTS. No ejecutar init destructivo.

```bash
node -v && npm -v
rustc --version && stellar --version
rustup target add wasm32v1-none
# desde repo con scaffold y scripts implementados:
npm ci
docker compose up -d db
npm run db:migrate
npm run dev
```
`compose.yaml` propuesto (crear durante bootstrap, no existe en ZIP):
```yaml
services:
  db:
    image: postgres:17
    environment:
      POSTGRES_DB: praev
      POSTGRES_USER: praev
      POSTGRES_PASSWORD: local_only_change_me
    ports: ["127.0.0.1:5432:5432"]
    volumes: ["praev_pg:/var/lib/postgresql/data"]
volumes:
  praev_pg:
```
Solo contraseña de desarrollo local; no reusar remoto. DATABASE_URL local `postgres://praev:local_only_change_me@127.0.0.1:5432/praev`. Migrator ordena migrations y registra checksums; no aplicar mismo archivo dos veces. Esperar DB readiness (`pg_isready`) antes de migrar.

Inicializar contrato con scaffold Stellar vigente; seguir ayuda CLI local, confirmar versión exacta y registrar Cargo.lock. No inventar paquete compilado. Tras implementar: `cargo test --manifest-path contracts/Cargo.toml`, build desde workspace; ver deployment runbook. Prueba smoke: home, health, DB, testnet account funded, resolver y agent distintos. Si una dependencia rompe build, fijar versión compatible y ADR, no cambiar stack por intuición.
