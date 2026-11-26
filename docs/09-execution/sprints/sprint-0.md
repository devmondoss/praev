# Sprint 0 · Arranque

**Fechas:** jueves 26 nov 2026 · **Objetivo:** el proyecto arranca: la app vacía está desplegada con health, el toolchain Stellar está listo y la fuente LIVE tiene decisión GO/NO-GO.

## Sprint backlog

| Historia | Pts | Estado | Tareas |
|---|---:|---|---|
| HU-01 · Proyecto Next.js base | 3 | Por hacer | Scaffold en carpeta temporal sin pisar docs · mover a la raíz · TS estricto · scripts `lint`, `typecheck`, `test`, `build` · Vitest con un test de humo · `.env.example` · registrar versiones |
| HU-02 · Toolchain Stellar y cuentas | 2 | Por hacer | Instalar stellar-cli 30.0.1 · `rustup target add wasm32v1-none` · contrato mínimo con soroban-sdk fijado · `stellar keys generate curator/resolver/agent --network testnet --fund` |
| HU-03 · Postgres y migrador | 2 | Por hacer | `compose.yaml` · `scripts/migrate.ts` con checksums · crear Neon y guardar la URL *pooled* en el gestor de secretos |
| HU-04 · Deploy en Vercel con health | 2 | Por hacer | `/api/v1/health` (app, db, rpc) · proyecto Vercel enlazado · variables de entorno · grep del bundle sin secretos |
| HU-05 · Spike de la fuente LIVE (máx. 2 h) | 3 | Por hacer | Probar la colección de estaciones de SENAMHI · muestra de 3 días · variable, unidad, intervalo, latencia, licencia · ADR GO/NO-GO |

**Total:** 12 puntos.

## Daily log

### 26 nov
- Ayer: documentación organizada, blueprint adoptado, backlog en historias.
- Hoy: S0 completo.
- Bloqueos: ninguno conocido.

## Review

_Pendiente._

## Retrospectiva

_Pendiente._
