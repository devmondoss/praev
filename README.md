# PRAEV

**Proof of Foresight.**  
Verifiable Intelligence for Real-World Decisions.

> We don't predict everything. We predict what matters.

PRAEV es una infraestructura de inteligencia predictiva verificable para personas, organizaciones y agentes de IA. Permite formular preguntas relevantes para decisiones reales, registrar pronósticos antes de conocer su resultado, medir el desempeño de sus autores y agregar probabilidades en función de su historial. Los análisis pueden monetizarse mediante pagos autorizados por los usuarios en stablecoins, sin apostar sobre el resultado.

**Built on Stellar.** El MVP utiliza Stellar Testnet y Soroban para registrar compromisos criptográficos, resoluciones y credenciales, y para liquidar pagos de información sin custodia directa de fondos por PRAEV.

## El problema

La incertidumbre tiene costos reales: una empresa debe comprar inventario antes de conocer el precio futuro; un agricultor debe decidir cuándo sembrar; una aseguradora debe estimar exposición antes de que ocurra un fenómeno climático. No basta con tener más opiniones: hace falta saber qué preguntas importan, quién ha demostrado capacidad para responderlas y qué evidencia respalda su historial.

## El producto

| Módulo | Función |
|---|---|
| PRAEV Relevance | Selección de preguntas por utilidad para decisiones. |
| PRAEV ID | Identidad predictiva portable para humanos y agentes. |
| PRAEV Verify | Sellado, apertura, resolución y auditoría de pronósticos. |
| PRAEV Score | Reputación por dominio, calibración y evidencia histórica. |
| PRAEV Consensus | Agregación de probabilidades con pesos históricos. |
| PRAEV Pay | Pagos por información y financiación de wallets controladas por sus titulares. |
| PRAEV Protocol | Contratos, esquemas y reglas de interoperabilidad. |
| PRAEV SDK | Integración programática con aplicaciones y agentes. |

## Documentación

El [índice de docs](docs/README.md) agrupa los documentos por área y sugiere un orden de lectura para cada rol.

| Documento | Contenido |
|---|---|
| [01 — Visión y tesis](docs/01-vision.md) | Problema, principios, diferenciación, propuesta de valor. |
| [02 — Impacto y casos de uso](docs/02-impacto.md) | Usuarios, decisiones, hipótesis de valor y piloto. |
| [03 — Relevance](docs/03-relevance.md) | Admisión, scoring de relevancia, curación y métricas. |
| [04 — Producto y MVP](docs/04-producto-mvp.md) | Flujos, alcance, módulos, requisitos y aceptación. |
| [05 — UX/UI](docs/05-ux-ui.md) | Pantallas, composición, microcopy y accesibilidad. |
| [06 — Arquitectura Stellar](docs/06-arquitectura.md) | Capas, datos, estados, servicios y fronteras de confianza. |
| [07 — Smart contracts](docs/07-smart-contracts.md) | Interfaces propuestas, autorización, eventos y seguridad. |
| [08 — Identidad, reputación y consenso](docs/08-reputacion.md) | Brier, calibración, muestras, pesos, benchmarks. |
| [09 — Verificación y resolución](docs/09-verificacion.md) | Commit/reveal, fuentes, controversias, evidencias. |
| [10 — Pagos no custodiales](docs/10-pagos.md) | USDC, recargas, liquidación, acceso y límites. |
| [11 — API y SDK](docs/11-api-sdk.md) | Contratos de integración y ejemplos. |
| [12 — Datos y seguridad](docs/12-datos-seguridad.md) | Modelo, privacidad, amenazas y operación. |
| [13 — Negocio y validación](docs/13-negocio-validacion.md) | Hipótesis comerciales, métricas y experimentos. |
| [14 — Roadmap y ejecución](docs/14-roadmap.md) | Plan por hitos, responsabilidades y recortes. |
| [15 — Codember y evaluación](docs/15-codember.md) | Rúbrica, entregables, pitch y checklist. |
| [16 — Pruebas y demo](docs/16-pruebas-demo.md) | Fixtures, casos de aceptación y guion de demo. |
| [17 — Arranque de repositorio](docs/17-repositorio.md) | Estructura, comandos previstos y decisiones pendientes. |

## Próximos pasos

1. Congelar la especificación del MVP (M1 en el [roadmap](docs/14-roadmap.md)).
2. Crear los paquetes de aplicación, contratos y SDK según la [guía de repositorio](docs/17-repositorio.md).
3. Implementar y validar el flujo vertical en Stellar Testnet.
4. Añadir aquí instrucciones reproducibles, IDs de contratos, direcciones de activos de prueba, transacciones y enlace a la aplicación cuando existan.

## Equipo

| Integrante | GitHub | Rol |
|---|---|---|
| Por completar | [@devmondoss](https://github.com/devmondoss) | Por completar |

## Uso de IA

La documentación inicial se redactó y organizó con asistencia de herramientas de IA (entre ellas Claude Code). El equipo revisa y es responsable del contenido. Cuando se use IA para generar código, se indicará aquí qué partes y con qué herramienta.

## Código previo y de terceros

Ninguno. Este repositorio se creó durante el periodo oficial de la buildathon (14 nov – 4 dic 2026) y por ahora contiene solo documentación. Cualquier código reutilizado o dependencia relevante se declarará aquí con su origen, su licencia y los cambios hechos durante el periodo.

## Licencia

Por definir antes de publicar código. Las bases recomiendan MIT, pero todavía no se ha concedido ninguna licencia.
