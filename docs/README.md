# Documentación de PRAEV

Índice de la especificación. Los archivos conservan su numeración para que los enlaces no cambien; aquí se agrupan por área.

## Por área

### Producto e impacto
| Doc | Contenido |
|---|---|
| [01 · Visión y tesis](01-vision.md) | Identidad, problema, principios, diferenciación |
| [02 · Impacto y casos de uso](02-impacto.md) | Usuarios, decisiones, hipótesis de valor, piloto |
| [03 · Relevance](03-relevance.md) | Qué preguntas vale la pena pronosticar y cómo se puntúan |
| [04 · Producto y MVP](04-producto-mvp.md) | Roles, prioridades P0/P1/P2, flujo vertical, requisitos |
| [05 · UX/UI](05-ux-ui.md) | Pantallas, microcopy, accesibilidad |
| [13 · Negocio y validación](13-negocio-validacion.md) | Propuesta de valor, métricas, experimentos |

### Técnica y Stellar
| Doc | Contenido |
|---|---|
| [06 · Arquitectura](06-arquitectura.md) | Capas, estados, servicios y fronteras de confianza |
| [07 · Smart contracts](07-smart-contracts.md) | Registry y payment router en Soroban |
| [08 · ID, Score y Consensus](08-reputacion.md) | Brier, calibración, pesos, benchmarks |
| [09 · Verify](09-verificacion.md) | Commit/reveal, resolución, controversias |
| [10 · Pay](10-pagos.md) | Pagos no custodiales en stablecoins |
| [11 · API y SDK](11-api-sdk.md) | Rutas `/v1` y cliente |
| [12 · Datos y seguridad](12-datos-seguridad.md) | Modelo de datos, privacidad, amenazas |

### Ejecución en la buildathon
| Doc | Contenido |
|---|---|
| [14 · Roadmap](14-roadmap.md) | Hitos M0–M8 del 25 nov al 4 dic, reparto y recortes |
| [15 · Codember y evaluación](15-codember.md) | Bases, rúbrica, reglas del Hub, entregables, pitch |
| [16 · Pruebas y demo](16-pruebas-demo.md) | Fixtures sintéticos, casos de aceptación, guion de demo |
| [17 · Repositorio](17-repositorio.md) | Estructura de carpetas, toolchain, ADRs, convenciones |

## Por dónde empezar

- **Todo el equipo:** 01 → 04 → 14 → 15.
- **Stellar/Soroban:** 06 → 07 → 09 → 10.
- **Backend, datos e IA:** 08 → 11 → 12 → 16.
- **Frontend y UX:** 04 → 05 → 16.
- **Pitch y entrega:** 02 → 13 → 15 (guion de 3 minutos).

## Convenciones de estos documentos

- Son una especificación: describen lo que se va a construir, no algo ya implementado.
- Las cifras y ejemplos de demo son sintéticos salvo que se indique la fuente.
- Cuando algo se implemente, enlazar aquí la evidencia (IDs de contrato, transacciones, PR) en vez de reescribir la especificación.
