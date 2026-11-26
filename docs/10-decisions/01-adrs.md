# Decision log y reconciliación de hipótesis

**Estado:** Decisiones propuestas vigentes para P0 · **Versión:** 1.1 · **Fecha:** 2026-11-26

| ADR | Decisión | Alternativa descartada ahora | Razón |
|---|---|---|---|
| 001 | Decision intelligence verificable | marketplace generalista | tesis consecuencial |
| 002 | Impacto humano/económico; comercial exposición | 3 ejes independientes | consistencia con informe final |
| 003 | Perú clima/abastecimiento | cuatro países/multivertical | alcance |
| 004 | Rust/Soroban Stellar | Solidity/EVM | red objetivo |
| 005 | Next monolito + PostgreSQL | microservicios y backend separado | una persona (ver 017) |
| 006 | Un registro público por versión | commit/reveal | menos fricción; copying residual |
| 007 | Mediana y Brier | score 0–100/weighting | sin datos para validación |
| 008 | Resolver autorizado con evidencia | DAO/disputa optimista | tiempo; confianza explícita |
| 009 | Decision Register local demo | SaaS enterprise/tenant | prueba valor sin PII |
| 010 | Un agente IA estructurado | multiagente | integración verificable |
| 011 | Pago P1 | checkout core | evitar desviar ruta crítica |
| 012 | LIVE vs DEMO estrictos | replay como skill | honestidad temporal |
| 013 | Wallet técnica, metadata declarada | identidad legal/VC | MVP mínimo |
| 014 | Score calculado off-chain | scoring on-chain agregado | gas/iteración y simplicidad |
| 015 | Curación manual | ingestión masiva automática | pregunta de calidad |
| 016 | Wallet Kit v2/Varial | API antigua Freighter | docs actuales, spike compatibilidad |
| 017 | Desarrollo a cargo de una persona (26 nov) | reparto A/B de dos personas | equipo real; ver orden de recorte en backlog |
| 018 | Versiones fijadas tras verificación del 26 nov (ver stack) | "última versión" sin fijar | reproducibilidad; SDK 30 con alternativa 28 |
| 019 | Vercel + Neon Postgres (26 nov) | Node server en hosting genérico | decisión del equipo; deploy temprano |
| 020 | `extend_ttl` en cada escritura (≥30 días) y renovación el 4 dic | TTL por defecto | evitar archivado durante la evaluación del 5–7 dic |

ADRs son decisiones de diseño del presente blueprint, no aprobación formal del equipo ni pruebas ejecutadas. Para cambiar: nuevo ADR con fecha, contexto, alternativas, consecuencias y actualización de docs dependientes. No reescribir informe original para ocultar contradicción.
