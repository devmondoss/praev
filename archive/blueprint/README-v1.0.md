# Praev — MVP Blueprint

**Proof of Foresight · Verifiable Intelligence for Real-World Decisions**

Versión 1.0 · 26 noviembre 2026 · Documentación de implementación, no aplicación construida.

## Objetivo
Demostrar el ciclo de inteligencia anticipatoria verificable: pregunta relevante propia → probabilidades firmadas en Stellar → consenso → decisión simulada → resultado con evidencia → Brier y verificación. La misión social y la utilidad comercial coexisten, pero no se construye un negocio completo.

**Stack elegido:** Next.js App Router, TypeScript, Tailwind, PostgreSQL, Stellar SDK/Rust/Soroban, Stellar Wallets Kit v2, OpenAI Responses, Zod, Vitest/Playwright. Un monolito y un contrato. Stellar testnet exclusivamente.

## Empezar aquí
1. [AGENTS.md](AGENTS.md): reglas de implementación.
2. [Scope](docs/02-mvp/01-scope.md): P0 vs P1, exclusiones.
3. [Stack](docs/03-architecture/01-stack.md) y [topología](docs/03-architecture/02-topology.md).
4. [Contrato](docs/06-stellar/02-contract-interface.md), [SQL](docs/07-engineering/01-database.md), [API](docs/07-engineering/02-api.md).
5. [Backlog](docs/09-execution/01-backlog.md), [criterios](docs/02-mvp/04-acceptance.md), [pruebas](docs/08-quality/03-tests.md).
6. [ADRs](docs/10-decisions/01-adrs.md) y [bloqueadores](docs/10-decisions/02-open-questions.md).

## Estado y límites
No hay código ejecutable, DB creada, contrato desplegado, integración de datos probada, lockfiles generados ni tests de software ejecutados. Las interfaces y SQL son especificaciones. La pregunta LIVE depende de validar estación/serie y la fuente de resolución; fixture DEMO siempre etiquetado. No Solidity: el contrato nativo de Stellar se diseña en Rust/Soroban. La decisión demo vive en navegador; no enterprise SaaS. Pagos fuera de P0. No claims de PMF, precisión superior ni impacto medido.

## Inventario navegable

### Fundamentos y visión

- [Visión y posicionamiento](docs/00-foundation/01-vision.md)
- [Principios de producto](docs/00-foundation/02-principles.md)
- [Impacto humano y económico](docs/00-foundation/03-impact.md)
- [Mercados regionales y motores productivos](docs/00-foundation/04-region.md)
- [Coexistencia pública y comercial](docs/00-foundation/05-business.md)
- [Síntesis de las tres investigaciones](docs/00-foundation/06-research-synthesis.md)
- [Visión de largo plazo y productos](docs/00-foundation/07-future.md)

### Producto y UX

- [Usuarios, permisos y beneficiarios](docs/01-product/01-users.md)
- [Recorridos del producto](docs/01-product/02-journeys.md)
- [Mapa de navegación y rutas](docs/01-product/03-navigation.md)
- [Sistema visual y responsive](docs/01-product/04-visual-system.md)
- [Pantalla Radar](docs/01-product/05-radar.md)
- [Pantalla Decision Forecast](docs/01-product/06-question-screen.md)
- [Pantalla Forecasters y verificador](docs/01-product/07-reputation-screen.md)
- [Microcopy y accesibilidad](docs/01-product/08-copy-accessibility.md)

### Alcance y prueba funcional

- [Scope P0, P1 y exclusiones](docs/02-mvp/01-scope.md)
- [Caso vertical: clima y abastecimiento](docs/02-mvp/02-vertical.md)
- [Fixture y demostración end-to-end](docs/02-mvp/03-demo-fixture.md)
- [Criterios de aceptación funcional](docs/02-mvp/04-acceptance.md)

### Stack y arquitectura

- [Stack técnico seleccionado](docs/03-architecture/01-stack.md)
- [Arquitectura monolito modular](docs/03-architecture/02-topology.md)
- [Fronteras y fuentes de verdad](docs/03-architecture/03-boundaries.md)
- [Árbol objetivo de repositorio](docs/03-architecture/04-repo.md)
- [Manifest y scripts npm propuestos](docs/03-architecture/05-package.md)

### Motores y dominio

- [Entidad Question y especificación canónica](docs/04-domain/01-question.md)
- [Estados y transiciones](docs/04-domain/02-lifecycle.md)
- [Relevance Engine mínimo](docs/04-domain/03-relevance.md)
- [Forecast y versiones](docs/04-domain/04-forecast.md)
- [Evidence Engine y procedencia](docs/04-domain/05-evidence.md)
- [Consensus Engine y baseline](docs/04-domain/06-consensus.md)
- [Exposición y contexto comercial](docs/04-domain/07-exposure.md)
- [Decision Register](docs/04-domain/08-decision-register.md)
- [Oracle Engine: resolución auditable](docs/04-domain/09-oracle.md)
- [Brier, calibración y reputación](docs/04-domain/10-reputation.md)
- [Praev ID y tipos de predictor](docs/04-domain/11-identity.md)

### IA y evaluación

- [Agente de forecasting único](docs/05-ai/01-agent.md)
- [Contrato de salida estructurada IA](docs/05-ai/02-output-schema.md)
- [Evaluación de forecasting y leakage](docs/05-ai/03-evaluation.md)

### Protocolo Stellar

- [Stellar, Soroban y red](docs/06-stellar/01-network.md)
- [Interfaz contractual PraevRegistry](docs/06-stellar/02-contract-interface.md)
- [Storage, eventos e indexación](docs/06-stellar/03-storage-events.md)
- [Canonicalización, hashes y verificador](docs/06-stellar/04-hashes.md)
- [Wallet, firma y confirmación](docs/06-stellar/05-wallet-transactions.md)
- [Proof of Foresight: garantías y límites](docs/06-stellar/06-proof-of-foresight.md)
- [Praev Pay, pagos no custodiales](docs/06-stellar/07-payments.md)

### Ingeniería

- [Esquema SQL inicial](docs/07-engineering/01-database.md)
- [API REST y contratos de transporte](docs/07-engineering/02-api.md)
- [Errores, reintentos e idempotencia](docs/07-engineering/03-errors.md)
- [Indexer y reconciliación](docs/07-engineering/04-reconcile.md)
- [Inventario de fuentes y prueba de viabilidad](docs/07-engineering/05-data-sources.md)
- [Variables de entorno y configuración](docs/07-engineering/06-env.md)
- [Arranque local y dependencias](docs/07-engineering/07-setup.md)
- [Despliegue testnet y aplicación](docs/07-engineering/08-deployment.md)

### Calidad y seguridad

- [Threat model y controles](docs/08-quality/01-security.md)
- [Privacidad, gobernanza y ética](docs/08-quality/02-privacy.md)
- [Matriz de pruebas reproducibles](docs/08-quality/03-tests.md)
- [Vectores de prueba y datasets demo](docs/08-quality/04-fixtures.md)
- [CI y observabilidad](docs/08-quality/05-ci-observability.md)

### Ejecución y demo

- [Backlog ejecutable y ruta crítica](docs/09-execution/01-backlog.md)
- [Plan de construcción 26 nov–4 dic](docs/09-execution/02-calendar.md)
- [Guion de demo ≤3 minutos](docs/09-execution/03-demo.md)
- [Checklist Codember y rúbrica](docs/09-execution/04-codember.md)
- [Definition of Done y entrega](docs/09-execution/05-release.md)

### Decisiones y fuentes

- [Decision log y reconciliación de hipótesis](docs/10-decisions/01-adrs.md)
- [Bloqueadores, preguntas abiertas y experimentos](docs/10-decisions/02-open-questions.md)
- [Fuentes, trazabilidad y límites de verificación](docs/10-decisions/03-sources.md)

### Investigación original

- [Archivo de investigaciones](research/README.md)
- [Inventario y hashes](MANIFEST.md)

Prioridad: ADR vigente > P0 > visión > informes históricos. Consultar fuentes técnicas enlazadas; fijar versiones con pruebas reales. No ejecutar scripts propuestos hasta que existan.
