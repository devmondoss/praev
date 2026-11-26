# Manifest y scripts npm propuestos

**Estado:** Plantilla para bootstrap; no lockfile generado · **Versión:** 1.0 · **Fecha:** 2026-11-26

Inicializar Next.js con TS, App Router, Tailwind, `src/` y npm. Instalar dependencias con versiones exactas seleccionadas y verificadas; guardar lockfile. No pegar un manifest con números de versión no comprobados. Paquetes: `next`, `react`, `react-dom`, `zod`, `postgres`, `@stellar/stellar-sdk`, `@creit.tech/stellar-wallets-kit`, `openai`, `lucide-react`, `server-only`; dev: `typescript`, `@types/node`, `@types/react`, `@types/react-dom`, `eslint`, `eslint-config-next`, `tailwindcss`, adaptador PostCSS de la versión elegida, `tsx`, `vitest`, `@playwright/test`.

Fragmento de `package.json` a completar por scaffold (JSON válido, no manifest instalable completo):
```json
{"name":"praev","private":true,"version":"0.1.0","scripts":{"dev":"next dev","build":"next build","start":"next start","lint":"eslint .","typecheck":"tsc --noEmit","test":"vitest run","test:e2e":"playwright test","db:migrate":"tsx scripts/migrate.ts","demo:seed":"tsx scripts/seed-demo.ts","chain:reconcile":"tsx scripts/reconcile.ts","agent:forecast":"tsx scripts/forecast-agent.ts","question:create":"tsx scripts/create-question.ts","question:resolve":"tsx scripts/resolve.ts"}}
```

Cada script debe fallar con exit code no cero y error claro si faltan parámetros o env. Los scripts TS aún no existen. No ejecutar `npm run ...` antes de implementarlos. Criterio: `npm ci`, `npm run lint`, `typecheck`, `test`, `build` en clon limpio. `package-lock.json` real se genera en bootstrap, no en documentación.
