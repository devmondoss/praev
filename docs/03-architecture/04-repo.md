# Árbol objetivo de repositorio

**Estado:** Especificación; no código creado · **Versión:** 1.0 · **Fecha:** 2026-11-26

```text
praev/
  README.md  AGENTS.md  package.json  package-lock.json
  .env.example  .gitignore  compose.yaml
  src/app/{page.tsx,q/[id]/page.tsx,forecasters/page.tsx,verify/[id]/page.tsx,methodology/page.tsx,api/v1/...}
  src/components/{radar,question,wallet,decision,verify,ui}/
  src/domain/{questions,forecasts,evidence,scoring,decisions}/
  src/server/{db,stellar,ai,reconcile,services}/
  src/lib/{schemas,hash,errors}/
  contracts/praev-registry/{Cargo.toml,src/lib.rs,src/test.rs}
  contracts/Cargo.toml  contracts/Cargo.lock
  db/migrations/001_initial.sql
  scripts/{migrate,create-question,forecast-agent,resolve,reconcile,seed-demo}.ts
  fixtures/{questions,evidence,expected}/
  tests/{unit,integration,e2e}/
  .github/workflows/ci.yml
  docs/  research/
```

No scaffolding de módulos P1. `src/domain` puro; `src/server` no importable por client; `src/components/decision` no DB. Scripts usan las mismas funciones que API. Guardar bindings generados (o instrucción reproducible) tras build del contrato. No commitear .env, seed, DB dump, screenshots con claves, node_modules o target. Los archivos de este ZIP son especificaciones Markdown, no esta aplicación.
