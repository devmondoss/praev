# Sprint 0 · Arranque

**Fechas:** jueves 26 nov 2026 · **Objetivo:** el proyecto arranca: la app vacía está desplegada con health, el toolchain Stellar está listo y la fuente LIVE tiene decisión GO/NO-GO. **Resultado: objetivo cumplido.**

## Sprint backlog

| Historia | Pts | Estado | Evidencia |
|---|---:|---|---|
| HU-01 · Proyecto Next.js base | 3 | Hecha | Next.js 16.4.6, TS estricto, `lint`, `typecheck`, `test`, `build` en verde desde un clon limpio; `.env.example`; versiones en [01-stack](../../03-architecture/01-stack.md) |
| HU-02 · Toolchain Stellar y cuentas | 2 | Hecha | stellar-cli 30.0.1; `soroban-sdk` 30.0.0 confirmado (sin bajar a 28); cuentas `curator`, `resolver` y `agent` fondeadas; contrato mínimo desplegado como prueba de humo |
| HU-03 · Postgres y migrador | 2 | Hecha | Neon (plan free) conectado a Vercel; `npm run db:migrate` con checksums, advisory lock y una transacción por archivo; `compose.yaml` para Docker |
| HU-04 · Deploy en Vercel con health | 2 | Hecha | https://praev.vercel.app y `/api/v1/health` → `app`, `db` y `rpc` en `ok` (el RPC se valida contra la passphrase de testnet); bundle sin secretos |
| HU-05 · Spike de la fuente LIVE | 3 | Hecha: **GO** | [ADR-023](../../10-decisions/01-adrs.md), [05-data-sources](../../07-engineering/05-data-sources.md), muestra real en `fixtures/sources/senamhi/` |

**Velocidad:** 12 de 12 puntos en una tarde.

## Daily log

### 26 nov
- Ayer: documentación organizada, blueprint adoptado, backlog en historias.
- Hoy: S0 completo.
- Bloqueos: no hay Docker ni Homebrew en la máquina. Se usa Neon también para desarrollo y `compose.yaml` queda para quien tenga Docker.

## Review

- **Incremento:** app pública en https://praev.vercel.app con health real contra Neon y el RPC de testnet; workspace Soroban compilando con SDK 30; migrador listo para la migración 001 (HU-18).
- **Prueba de humo en testnet:** contrato mínimo `CDXPDYB3GJ6QKW5WD42EGGALIWG44UGRRB7JA3J2WY4VA7D6PDYYWO3F`, desplegado con constructor y leído por CLI. **No** es el despliegue oficial de HU-17.
- **Hallazgo de la fuente LIVE:**
  - SENAMHI publica la lluvia horaria de Chulucanas con menos de 1 h de latencia.
  - Cerca del 2 % de las horas falta y no se recupera después. Por eso se adopta la política `partial_yes_else_invalidate` (ADR-023).
  - La pregunta LIVE debe publicarse a más tardar el 30 nov y se puede resolver la mañana del 4 dic.
- **Aceptadas:** HU-01 a HU-05.

## Retrospectiva

- **Mantener:** fijar versiones con fecha de publicación comprobada; probar cada pieza contra la red real (testnet, Neon) y no solo en local.
- **Cambiar:** la CLI de Vercel reescribe `.gitignore` al hacer `link` o `env pull`. Hay que revisar el diff antes de cada commit.
- **Acción para S1:** empezar por HU-08 (canonicalización y hashes), porque el contrato, la API y el verificador dependen de ella.
