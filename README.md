# Pravef

**Proof of Foresight.**  
Verifiable Intelligence for Real-World Decisions.

> We don't predict everything. We predict what matters.

Pravef es una infraestructura de inteligencia predictiva verificable para personas, organizaciones y agentes de IA. Permite formular preguntas relevantes para decisiones reales, registrar pronósticos antes de conocer su resultado, medir el desempeño de sus autores y agregar probabilidades en función de su historial. Los análisis pueden monetizarse mediante pagos autorizados por los usuarios en stablecoins, sin apostar sobre el resultado.

**Built on Stellar.** El MVP utiliza Stellar Testnet y Soroban para registrar compromisos criptográficos, resoluciones y credenciales, y para liquidar pagos de información sin custodia directa de fondos por Pravef.

## El problema

La incertidumbre tiene costos reales: una empresa debe comprar inventario antes de conocer el precio futuro; un agricultor debe decidir cuándo sembrar; una aseguradora debe estimar exposición antes de que ocurra un fenómeno climático. No basta con tener más opiniones: hace falta saber qué preguntas importan, quién ha demostrado capacidad para responderlas y qué evidencia respalda su historial.

## El producto

| Módulo | Función |
|---|---|
| Pravef Relevance | Selección de preguntas por utilidad para decisiones. |
| Pravef ID | Identidad predictiva portable para humanos y agentes. |
| Pravef Verify | Sellado, apertura, resolución y auditoría de pronósticos. |
| Pravef Score | Reputación por dominio, calibración y evidencia histórica. |
| Pravef Consensus | Agregación de probabilidades con pesos históricos. |
| Pravef Pay | Pagos por información y financiación de wallets controladas por sus titulares. |
| Pravef Protocol | Contratos, esquemas y reglas de interoperabilidad. |
| Pravef SDK | Integración programática con aplicaciones y agentes. |

## Documentación

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

## Estado

**Especificación inicial — 25 de noviembre de 2026.** Este repositorio documental no contiene aún una aplicación, contratos desplegados, credenciales emitidas ni transacciones reales. Los ejemplos y cifras de demostración son sintéticos, salvo los pesos y fechas de la convocatoria. La implementación y las verificaciones técnicas deben producirse durante la buildathon. No se declara ninguna integración ni resultado como conseguido.

## Quick start (documentación)

1. Leer visión, producto MVP y arquitectura.
2. Registrar el repositorio público en el Hub dentro del checkpoint obligatorio.
3. Crear los paquetes de aplicación, contratos y SDK descritos en la guía de repositorio.
4. Implementar y validar el flujo vertical en Stellar Testnet.
5. Añadir aquí instrucciones reproducibles, IDs de contratos, direcciones de activos de prueba, transacciones y enlace a la aplicación cuando existan.

**Nota:** las reglas permiten código previo si se declara en el README; no presentar código reutilizado como trabajo nuevo. Esta especificación no presupone reutilización. La licencia de software se elegirá antes de publicar código; MIT es una opción recomendada por las bases, no una licencia ya concedida.
