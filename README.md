# praev

**Anticipa lo que importa.**
Inteligencia anticipatoria verificable para decisiones reales, construida sobre Stellar.

praev convierte eventos externos con consecuencias humanas o económicas en preguntas de probabilidad. Registra en Stellar quién los anticipó y con qué probabilidad, y conecta cada pronóstico con una decisión concreta y con su resultado verificado.

> La anticipación no debería ser un privilegio. No pronosticamos todo: pronosticamos lo que importa.

## El problema

Muchas decisiones dependen de algo que todavía no ha ocurrido: una lluvia intensa, una cosecha perdida, una ruta de abastecimiento cortada. Hay que decidir antes de saber qué pasará. Las alertas avisan de que algo *puede* ocurrir, pero no dicen con qué probabilidad, quién la estimó, qué tan bien ha acertado antes ni qué conviene hacer con ese dato. Sin un historial verificable no hay forma de saber en qué pronóstico confiar.

## Cómo funciona

1. **Pregunta.** Se formula con una regla objetiva, una fuente oficial y una fecha. Ejemplo candidato: *¿la precipitación acumulada en la estación Chulucanas (Piura) superará 25 mm entre el 1 y el 4 de diciembre?*
2. **Pronóstico.** Personas con su wallet y un agente de IA registran su probabilidad en Stellar antes del cierre.
3. **Consenso.** Se muestra la mediana de los pronósticos junto a un baseline de referencia.
4. **Decisión.** El Decision Register compara la probabilidad con el umbral de acción (coste de actuar frente a pérdida evitable) y guarda qué se decidió en ese momento.
5. **Resolución.** Un resolvedor autorizado publica el resultado con el hash de su evidencia.
6. **Score y verificación.** Cada participante recibe su Brier score, y cualquiera puede contrastar la pregunta, los pronósticos y el resultado con la cadena.

## Por qué Stellar

El contrato Soroban `PraevRegistry` guarda la especificación de cada pregunta (su hash), los pronósticos firmados y versionados, y la resolución. La firma identifica a cada participante, y el ledger prueba que un pronóstico existía antes del cierre y que nadie lo cambió después. La cadena demuestra integridad y orden, no la verdad del clima: la resolución declara su fuente y su autoridad. No hay custodia de fondos, tokens ni apuestas.

## Primer caso: clima y abastecimiento en Perú

El MVP se centra en lluvias en Piura y en su efecto sobre cosechas, transporte y acceso a alimentos. Tiene impacto **humano** (agua, alimentación, movilidad) y **económico** (producción, logística, abastecimiento). Chile, Colombia y Bolivia son mercados candidatos, no cobertura actual.

## Qué no es

- No es un mercado de predicción ni de apuestas: ningún dinero depende del resultado.
- No sustituye las alertas oficiales ni recomienda evacuar, cosechar o invertir.
- No afirma precisión superior ni ahorros medidos. El MVP demuestra que el ciclo es íntegro y verificable.

## Alcance del MVP

praev se construye para Stellar Codember Perú 2026, en Stellar Testnet.

| Incluido (P0) | Más adelante (P1) |
|---|---|
| Un contrato Soroban en testnet | Pago fijo en USDC por informes |
| Una pregunta LIVE con fuente validada y un escenario DEMO etiquetado | Segunda fuente de datos |
| Pronóstico humano (wallet) y de un agente de IA | Ponderación por reputación |
| Mediana, baseline, Brier y verificador público | Credencial portable |
| Decision Register local con umbral de acción | Decisiones en servidor con autenticación |

## Stack

Next.js (App Router) + TypeScript + Tailwind · PostgreSQL (Neon) · Rust/Soroban en Stellar Testnet · `@stellar/stellar-sdk` y Stellar Wallets Kit · OpenRouter para el agente de IA, con salida estructurada validada con Zod · Vitest, Playwright y `cargo test` · despliegue en Vercel.

Las versiones fijadas están en [docs/03-architecture/01-stack.md](docs/03-architecture/01-stack.md).

## Documentación

Empieza por [AGENTS.md](AGENTS.md), el [scope](docs/02-mvp/01-scope.md), el [backlog](docs/09-execution/01-backlog.md) y las [decisiones (ADRs)](docs/10-decisions/01-adrs.md).

| Carpeta | Contenido |
|---|---|
| [00-foundation](docs/00-foundation) | Visión, principios, impacto, región, negocio, síntesis de la investigación |
| [01-product](docs/01-product) | Usuarios, recorridos, navegación, sistema visual, pantallas, copy y accesibilidad |
| [02-mvp](docs/02-mvp) | Scope, caso vertical, fixture de demo, criterios de aceptación |
| [03-architecture](docs/03-architecture) | Stack, topología, fronteras de confianza, árbol del repo |
| [04-domain](docs/04-domain) | Pregunta, ciclo de vida, relevancia, pronóstico, evidencia, consenso, exposición, decisión, oráculo, reputación, identidad |
| [05-ai](docs/05-ai) | Agente de forecasting, esquema de salida, evaluación y leakage |
| [06-stellar](docs/06-stellar) | Red, interfaz del contrato, storage y eventos, hashes, wallet, prueba on-chain, pagos |
| [07-engineering](docs/07-engineering) | SQL, API, errores, reconciliación, fuentes de datos, entorno, setup, despliegue |
| [08-quality](docs/08-quality) | Seguridad, privacidad, pruebas, fixtures, CI |
| [09-execution](docs/09-execution) | Backlog, calendario, guion de demo, checklist Codember, definition of done |
| [10-decisions](docs/10-decisions) | ADRs, preguntas abiertas, fuentes |

La investigación de base está en [research/](research/README.md). Las versiones anteriores de la documentación están en [archive/](archive/README.md) y se eliminarán cuando empiece el desarrollo.

## Equipo

| Integrante | GitHub | Rol |
|---|---|---|
| Por completar | [@devmondoss](https://github.com/devmondoss) | Por completar |

## Uso de IA

La investigación (informes Deep Research) y la documentación se elaboraron y organizaron con asistencia de herramientas de IA, entre ellas Claude Code. El equipo revisa y es responsable del contenido. Cuando se use IA para generar código, se indicará aquí qué partes y con qué herramienta. Dentro del producto, el agente de forecasting usa modelos a través de OpenRouter.

## Código previo y de terceros

Ninguno. Este repositorio se creó durante el periodo oficial de la buildathon (14 nov – 4 dic 2026) y por ahora contiene solo documentación. Cualquier código reutilizado o dependencia relevante se declarará aquí con su origen, su licencia y los cambios hechos durante el periodo.

## Licencia

Por definir antes de publicar código. Las bases recomiendan MIT, pero todavía no se ha concedido ninguna licencia.
