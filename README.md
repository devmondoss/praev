# praev

**Anticipa lo que importa.**
Inteligencia anticipatoria verificable para decisiones expuestas a riesgos externos.

praev convierte acontecimientos con consecuencias humanas o económicas en preguntas de probabilidad que se pueden resolver y auditar. Esos acontecimientos pueden ser un fenómeno climático, una disrupción logística, una veda, un cambio regulatorio o un shock de precios.

Personas y agentes de IA publican su probabilidad **antes** de que ocurra el hecho. Cada pronóstico queda firmado y fechado en Stellar. Un resolvedor autorizado cierra la pregunta con evidencia de una fuente oficial, y cada participante acumula un historial medible de acierto por dominio. Las organizaciones conectan esas probabilidades con su propia exposición y registran qué decidieron, con qué probabilidad y por qué.

- **Qué:** preguntas binarias con regla, fuente y fecha congeladas; pronósticos firmados; resolución con evidencia; score Brier; registro de decisiones.
- **Para quién:** organizaciones que deciden bajo incertidumbre externa y comunidades afectadas por esas mismas incertidumbres, que acceden gratis a la capa pública.
- **Cuándo:** antes del evento, mientras todavía hay una ventana para actuar.
- **Desde dónde:** nace en Latinoamérica, pensada para economías productivas expuestas a shocks externos (agro, pesca, minería, logística, agua), con fuentes oficiales como autoridad de resolución.

> La anticipación no debería ser un privilegio. No pronosticamos todo: pronosticamos lo que importa.

---

## Lean Canvas

| Bloque | Resumen |
|---|---|
| **Problema** | Demasiadas señales de riesgo y ninguna forma de saber quién anticipa bien; nadie rinde cuentas de los pronósticos; la probabilidad no se conecta con la decisión |
| **Segmentos** | Capa pública: comunidades, productores, investigadores, forecasters y agentes de IA. Capa comercial: responsables de operaciones y abastecimiento en empresas expuestas |
| **Propuesta de valor única** | Probabilidades verificables sobre lo que importa, de fuentes con historial medido, conectadas a una decisión concreta |
| **Solución** | Motor de preguntas con especificación congelada; pronósticos firmados y resolución con evidencia; reputación por dominio y registro de decisiones |
| **Canales** | Capa pública gratuita, preguntas de interés público, torneos y benchmark de agentes, API, pilotos directos |
| **Ingresos** | Suscripción por workflow de exposición y decisión, API, research por encargo, preguntas patrocinadas con firewall editorial. Nunca apuestas |
| **Costos** | Curación y resolución, datos y licencias, inferencia de IA, infraestructura, cumplimiento |
| **Métricas clave** | Brier y skill frente al baseline, decisiones revisadas por alerta, tiempo de anticipación, conversión de piloto a pago |
| **Ventaja injusta** | El historial acumulado pregunta → pronóstico → resolución → decisión → resultado, verificable por terceros |

### 1. Problema

1. **Ruido sin criterio.** Las organizaciones reciben miles de señales de riesgo externo, pero no saben cuáles importan para *su* decisión ni quién sabe anticiparlas de verdad.
2. **Pronósticos sin rendición de cuentas.** Una plataforma dice "riesgo alto" y meses después nadie comprueba si acertó. Un analista recuerda sus aciertos y un modelo de IA puede explicar con fluidez y aun así estar mal calibrado.
3. **La probabilidad no llega a la decisión.** "Alto / medio / bajo" no dice cuándo actuar, y casi nadie registra qué se decidió con qué probabilidad para aprender después.

**Alternativas actuales**

| Categoría | Ejemplos | Qué les falta |
|---|---|---|
| Risk y supply-chain intelligence | Prewave, Everstream, Interos, Crisis24, Signal AI, Dataminr, Seerist | Conectan señales con exposición, pero no publican resolución ni scoring posterior; sus "likelihood" son rankings relativos, no probabilidades auditables |
| Forecasting estructurado | Metaculus, Good Judgment, Mantic, Cultivate Labs, NERAI | Rigurosos en scoring, pero no giran alrededor de la decisión concreta de una organización |
| Mercados de predicción | Kalshi, Polymarket | Buena referencia de resolución, pero dependen de especulación, liquidez y regulación de apuestas |
| Clima y demanda | ClimateAi, Blue Yonder | Pronostican variables, pero no rinden cuentas pública y verificablemente |
| Lo que se hace hoy | Analistas internos, consultoras, alertas oficiales, intuición | Sin historial medible, sin trazabilidad de la decisión |

### 2. Segmentos de clientes

- **Capa pública (beneficiarios):** comunidades y productores expuestos, investigadores, periodistas y forecasters humanos y agentes de IA que construyen historial. Leen sin cuenta y sin pagar.
- **Capa comercial (compradores):** primeros early adopters: agroexportadores y procesadores de alimentos, después distribuidores y retailers. El usuario es el responsable de operaciones o abastecimiento.
- **Extensiones, aún no validadas:** ONG, bancos, aseguradoras y gobierno.
- Usuario, comprador y beneficiario pueden ser distintos: una ONG puede financiar una vista territorial que usa una comunidad.

> Lo público financia confianza. Lo empresarial monetiza exposición y decisión.

### 3. Propuesta de valor única

**praev convierte acontecimientos externos relevantes en preguntas probabilísticas verificables, identifica quién los anticipa mejor y conecta esas probabilidades con decisiones.**

Concepto de alto nivel: *la contabilidad de la incertidumbre*. Así como la contabilidad registra qué pasó con el dinero, praev registra qué se creía antes, qué ocurrió y qué se decidió.

### 4. Solución

| Problema | Capacidad de praev |
|---|---|
| Ruido sin criterio | **Motor de preguntas con relevancia:** solo entran preguntas con beneficiario, consecuencia, decisión posible antes del resultado, fuente verificable y fecha. La especificación se congela y un cambio material crea una versión nueva |
| Sin rendición de cuentas | **Pronósticos firmados y resolución con evidencia:** humanos y agentes de IA bajo las mismas reglas. La fuente que ayuda a pronosticar nunca es la que decide la verdad. Score Brier por dominio, con muestra visible y comparación contra un baseline |
| La probabilidad no llega a la decisión | **Decision Register:** compara la probabilidad con el umbral de acción (coste de actuar frente a pérdida evitable, p* = C/L) y guarda la decisión con la probabilidad de ese momento, para revisarla al resolverse |

### 5. Canales

- Capa pública gratuita: radar de preguntas, verificador y perfiles de forecasters como embudo de confianza.
- Preguntas de interés público, con patrocinio divulgado cuando lo haya.
- Torneos por vertical y **praev Bench**, para evaluar humanos, modelos y agentes por dominio y horizonte.
- API y SDK para distribuir probabilidades con su procedencia.
- Pilotos directos con organizaciones expuestas, primero vía entrevistas de discovery.

### 6. Fuentes de ingreso

- **Suscripción por workflow:** exposición privada, alertas, umbrales, registro de decisiones e integración. Se paga por el contexto y el workflow, nunca por mover un pronóstico.
- **API** de probabilidades con procedencia.
- **Research por encargo** y **preguntas patrocinadas**: *un patrocinador puede financiar una pregunta, nunca su respuesta*. El patrocinio se divulga, la regla se congela y el resolvedor es independiente.
- **praev Bench:** evaluación de agentes de IA.
- Hipótesis de precio de piloto: US$500–2.000 al mes por workflow (según la investigación; por validar con ofertas reales).
- Sin token propio. Todos los pagos son fijos por servicio y no dependen del resultado.

### 7. Estructura de costos

Curación y resolución con revisión humana; acceso, licencias y almacenamiento de fuentes y evidencia; inferencia de modelos de IA; infraestructura (base de datos, RPC, fees de red mínimos); cumplimiento y privacidad para clientes enterprise.

### 8. Métricas clave

| Dimensión | Qué medimos |
|---|---|
| Calidad del pronóstico | Brier, skill frente al baseline (BSS), calibración, tamaño de muestra, cobertura y abstenciones |
| Valor de decisión | % de alertas que generan una revisión o decisión, tiempo de anticipación, decisiones revisadas al resolverse |
| Social | Alcance gratuito, consultas antes del evento, % que declara haber cambiado una decisión |
| Comercial | Preguntas solicitadas por clientes, conversión de piloto a pago, retención |

Las pérdidas evitadas solo se reportan con un contrafactual defendible.

### 9. Ventaja injusta

El moat no es el modelo de pronóstico ni el código: es el **historial acumulado y verificable** pregunta → versiones de pronóstico → identidad → resolución → decisión → resultado. La mayoría de las plataformas se detiene en la resolución. Ese historial, anclado en una red pública, es verificable por terceros sin confiar en praev, y su conexión con decisiones reales es difícil de replicar. Se suma el conocimiento de fuentes oficiales y workflows locales de la región.

---

## Hipótesis críticas (Build → Measure → Learn)

| # | Hipótesis | Experimento | Se descarta si |
|---|---|---|---|
| H1 | Los decisores prefieren una probabilidad con regla y fuente a una alerta genérica | Comparar ambos formatos con responsables reales | Menos del 30 % prefiere el formato probabilístico |
| H2 | Fuente y regla explícitas aumentan la confianza | Prueba A/B de la misma pregunta con y sin especificación | No hay diferencia significativa |
| H3 | El historial de acierto cambia a quién se le cree | Presentar pronósticos contradictorios con su track record | Los compradores ignoran el historial |
| H4 | Las alertas generan decisiones | Piloto con Decision Register | Menos del 30 % de las alertas produce revisión o decisión |
| H5 | Hay disposición a pagar | 15–20 entrevistas y 3 pilotos con precio | Nadie acepta una propuesta pagada ni firma una LOI |
| H6 | Hay skill real frente al baseline | 100 o más preguntas pre-registradas | El consenso no supera al baseline |

**El MVP de esta buildathon valida la base técnica de todas ellas:** que el ciclo completo (pregunta → pronóstico → decisión → resolución → score) funciona y es verificable de punta a punta. No pretende demostrar mercado ni superioridad predictiva.

---

## Por qué Stellar

La pregunta que guía el diseño es **"¿seguiría existiendo praev sin Stellar?"**. Como SaaS cerrado bastaría una base de datos con firmas. Pero la capa pública de praev promete que **cualquiera puede verificar un historial de pronósticos sin confiar en praev**, y que ese historial pertenece al forecaster. Eso exige un registro neutral, público, barato y rápido. Ahí Stellar no es decoración: es la capa de confianza.

### Función por función

| Función | Qué aporta Stellar / Soroban | Cuándo ocurre | Por qué encaja |
|---|---|---|---|
| **Identidad (praev ID)** | Cuenta Stellar como identidad técnica; `require_auth` garantiza que solo el titular firma | Al conectar la wallet y en cada acción de escritura | Nadie puede publicar a nombre de otro; la reputación sigue a la dirección y no a una cuenta en nuestra base de datos |
| **Publicar la pregunta** | `create_question` registra el hash de la especificación, los tiempos estructurados (cierre, ventana de observación, resolución), el resolvedor y el modo LIVE/DEMO | Cuando el curador abre la pregunta | Las reglas quedan congeladas y fechadas antes de que nadie pronostique; el verificador compara la especificación publicada con la cadena |
| **Pronóstico** | `submit_forecast` guarda la probabilidad (en puntos básicos) y el hash del razonamiento, con versiones (`seq`) solo hacia adelante | Desde la apertura hasta el cierre | Prueba qué creía cada uno **antes** del resultado, sin edición retroactiva. Con un ledger cada ≈5 s y fees mínimos, actualizar un pronóstico cuesta casi nada |
| **Cierre** | El timestamp del ledger es el reloj autoritativo; el contrato rechaza pronósticos en `t ≥ closesAt` | Automático, sin keeper | Nadie, ni siquiera praev, puede colar un pronóstico tarde |
| **Resolución** | `resolve` exige la firma del resolvedor asignado, solo dentro de su ventana, y guarda resultado + hash de evidencia; el estado terminal es inmutable. El contrato impide que el resolvedor pronostique | Tras la ventana de observación | Separa a quien pronostica de quien decide la verdad y deja constancia pública de qué evidencia se usó |
| **Score y reputación** | Eventos tipados (`#[contractevent]`) con cada pregunta, pronóstico y resolución | Tras cada resolución | El Brier se recalcula off-chain desde registros públicos; no existe una tabla de reputación editable por un administrador |
| **Verificación pública** | RPC y exploradores públicos (Stellar Expert, Stellar Lab) | En cualquier momento, sin cuenta | Un tercero descarga la evidencia, recalcula los hashes y compara con la cadena: coincide, no coincide o no disponible |
| **Agentes de IA** | Cada agente opera con su propia cuenta y firma separada; el hash de su razonamiento incluye modelo, versión, fuentes y fecha de corte | Cuando el agente pronostica | Humanos y agentes compiten bajo las mismas reglas; el historial de un modelo es auditable y una versión nueva no hereda el historial previo |
| **Pagos (P1)** | USDC nativo vía Stellar Asset Contract; transferencia directa y atómica del comprador al autor | Al comprar un informe o financiar una pregunta | Sin custodia, sin pool y sin pagos condicionados al resultado: se paga por información, no se apuesta |
| **Acceso desde Latinoamérica (futuro)** | Anchors y SEP-24 para entrar y salir de moneda local; costos por transacción de fracciones de centavo | Al escalar la capa comercial y los pagos | Hace viable cobrar y pagar montos pequeños en la región sin la fricción de la banca tradicional |

### Lo que Stellar no prueba

Stellar demuestra **integridad, orden y autorización**: quién publicó qué, cuándo, bajo qué regla y con qué evidencia, sin reescritura silenciosa. **No demuestra que el hecho sea verdadero**: un resolvedor podría mentir, y por eso la resolución declara su fuente y su autoridad, y en el futuro tendrá comités y disputas. Tampoco usamos un oráculo de precios como Reflector (SEP-40): las preguntas de praev (lluvia, vedas, regulación) no son precios de mercado y necesitan un resolvedor con evidencia documental.

### Por qué ahora

- Las probabilidades se volvieron un producto de datos: mercados de predicción regulados distribuyen sus probabilidades a instituciones.
- Los agentes de IA ya compiten con forecasters humanos en torneos públicos, pero nadie audita su historial de forma neutral.
- Las plataformas de riesgo empiezan a lanzar productos "predictivos" sin rendición de cuentas posterior.
- Los datos meteorológicos oficiales se abren vía estándares como WMO WIS 2.0, que ya tiene nodos en la región.

Estos datos vienen de la investigación de `research/` y se verifican antes de usarlos en el pitch.

---

## Cómo funciona

```text
Pregunta ──▶ Pronóstico ──▶ Consenso ──▶ Decisión ──▶ Resolución ──▶ Score y verificación
(regla,      (firmado en     (mediana +    (umbral de    (fuente oficial  (Brier por dominio,
 fuente,      Stellar antes   baseline)     acción y      + evidencia)     auditable por
 fecha)       del cierre)                   registro)                      cualquiera)
```

| Rol | Qué hace |
|---|---|
| Visitante | Lee preguntas, pronósticos, evidencia y verificador sin cuenta; simula una decisión |
| Forecaster humano | Conecta su wallet y publica su probabilidad, que puede actualizar hasta el cierre |
| Agente de IA | Produce un pronóstico estructurado con evidencia anterior al corte; un operador lo revisa y el agente firma con su propia cuenta |
| Curador | Formula y publica la pregunta con su especificación |
| Resolvedor | Aplica la regla a la evidencia oficial y firma el resultado |

## MVP — Stellar Codember Perú 2026

El MVP demuestra el ciclo completo en Stellar Testnet. Lo hace con un primer caso concreto: lluvias en Piura (Perú) y su efecto en el abastecimiento de alimentos, elegido porque tiene impacto humano y económico, fuente oficial (SENAMHI) y una decisión de contingencia clara. Es un caso de prueba, no un límite de lo que praev pronostica.

| Incluido (P0) | Más adelante (P1) |
|---|---|
| Contrato Soroban `PraevRegistry` en testnet | Pago fijo en USDC por informes |
| Una pregunta LIVE con fuente validada y un escenario DEMO etiquetado | Segunda fuente de datos |
| Pronóstico humano (wallet) y de un agente de IA | Consenso ponderado por reputación |
| Mediana, baseline, Brier y verificador público | Credencial portable |
| Decision Register local con umbral de acción | Decisiones en servidor con autenticación |

## Qué no es

- No es un mercado de predicción ni de apuestas: ningún dinero depende del resultado.
- No sustituye las alertas oficiales ni la asesoría profesional: informa decisiones, no las toma.
- No afirma precisión superior ni ahorros medidos. El MVP demuestra que el ciclo es íntegro y verificable.

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
