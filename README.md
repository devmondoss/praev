# praev

**Anticipa lo que importa.**
Inteligencia anticipatoria verificable para decisiones expuestas a riesgos externos.

praev convierte acontecimientos con consecuencias humanas o económicas en preguntas de probabilidad que se pueden resolver y auditar. Esos acontecimientos pueden ser un fenómeno climático, una disrupción logística, una veda, un cambio regulatorio o un shock de precios.

Es un mercado de anticipación con dos lados. Los **takers** (quienes tienen que decidir) traen la pregunta que les importa. Los **makers**, personas reales que compiten con un agente de IA como rival, responden con una **tesis**: una probabilidad y sus fundamentos (ancla histórica, factores, evidencia y qué les haría cambiar de opinión). praev les da las herramientas para pensar y **sella** cada tesis en Stellar antes del resultado, oculta hasta el cierre para que nadie copie a nadie. Al cierre se revela el consenso, una fuente oficial pactada de antemano resuelve, y cada maker acumula un historial auditable, como el de un trader, que dice a quién creerle y en qué.

> Una API dice qué pasó. Una IA da un número. praev registra **quién anticipa bien, qué cosa y por qué**, y eso no se puede copiar.

- **Qué:** preguntas binarias con regla, fuente y fecha congeladas; tesis selladas hasta el cierre; resolución con evidencia oficial; perfil de cada maker con métricas verificables; registro de decisiones.
- **Para quién:** takers (organizaciones y personas que deciden bajo incertidumbre externa) y makers (analistas y personas con criterio que quieren un historial que demuestre su juicio). Las comunidades afectadas acceden gratis a la capa pública.
- **Cuándo:** antes del evento, mientras todavía hay una ventana para actuar.
- **Desde dónde:** nace en Latinoamérica, pensada para economías productivas expuestas a shocks externos (agro, pesca, minería, logística, agua), con fuentes oficiales como autoridad de resolución.

> La anticipación no debería ser un privilegio. No pronosticamos todo: pronosticamos lo que importa.

---

## Lean Canvas

| Bloque | Resumen |
|---|---|
| **Problema** | Demasiadas señales y pronósticos, y ninguna forma de saber quién anticipa bien; nadie rinde cuentas de lo que dijo; quien sabe anticipar no tiene cómo demostrarlo; la probabilidad no se conecta con la decisión |
| **Segmentos** | Takers: responsables de decisiones expuestas a riesgos externos (tesorería, importación, operaciones, abastecimiento). Makers: analistas y personas con criterio, con agentes de IA como rivales. Capa pública: comunidades y productores |
| **Propuesta de valor única** | Para el taker: el consenso independiente de quienes más aciertan, con sus razones, a tiempo para decidir. Para el maker: un historial sellado que demuestra su juicio |
| **Solución** | Preguntas con especificación congelada; tesis estructurada y sellada hasta el cierre; resolución con fuente oficial; perfil del maker con métricas tipo trader; propuesta de preguntas y registro de decisiones |
| **Canales** | Capa pública gratuita, preguntas de interés público, torneos y benchmark de agentes, API, pilotos directos |
| **Ingresos** | El taker paga un precio fijo por pregunta, repartido entre makers según su reputación previa (nunca según el resultado); suscripción por workflow de decisión, API y research por encargo. Nunca apuestas |
| **Costos** | Curación y resolución, datos y licencias, inferencia de IA, infraestructura, cumplimiento |
| **Métricas clave** | Makers activos y tesis selladas por pregunta, Brier y skill frente al ancla, preguntas propuestas por takers, decisiones revisadas, conversión de piloto a pago |
| **Ventaja injusta** | El historial acumulado de personas reales: tesis → resolución → métricas, sellado en una red pública y verificable por terceros; cada resolución lo hace más valioso |

### 1. Problema

1. **Ruido sin criterio.** Las organizaciones reciben miles de señales de riesgo externo, pero no saben cuáles importan para *su* decisión ni quién sabe anticiparlas de verdad.
2. **Pronósticos sin rendición de cuentas.** Una plataforma dice "riesgo alto" y meses después nadie comprueba si acertó. Un analista recuerda sus aciertos y un modelo de IA puede explicar con fluidez y aun así estar mal calibrado. Y quien sí sabe anticipar no tiene cómo probarlo: no existe para el juicio lo que el historial auditado es para un trader.
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

- **Takers (demanda):** quien tiene que decidir antes de que ocurra algo: un importador que debe pagar en dólares, una tesorería, un responsable de abastecimiento. Traen la pregunta y, más adelante, pagan por ella.
- **Makers (oferta):** analistas, estudiantes, profesionales del sector y cualquier persona con criterio que quiera construir un historial verificable. Compiten con un agente de IA como rival de referencia.
- **Capa pública (beneficiarios):** comunidades y productores expuestos, investigadores y periodistas. Leen sin cuenta y sin pagar.
- **Extensiones, aún no validadas:** ONG, bancos, aseguradoras y gobierno.
- Usuario, comprador y beneficiario pueden ser distintos: una ONG puede financiar una vista territorial que usa una comunidad.

> Lo público financia confianza. Lo empresarial monetiza exposición y decisión.

### 3. Propuesta de valor única

**praev convierte acontecimientos externos relevantes en preguntas verificables, reúne a personas reales que las responden con tesis selladas, mide quién anticipa mejor y entrega ese consenso a quien tiene que decidir.**

Concepto de alto nivel: *la contabilidad de la incertidumbre*. Así como la contabilidad registra qué pasó con el dinero, praev registra qué se creía antes, qué ocurrió y qué se decidió.

### 4. Solución

| Problema | Capacidad de praev |
|---|---|
| Ruido sin criterio | **Preguntas con relevancia:** solo entran preguntas con beneficiario, consecuencia, decisión posible antes del resultado, fuente verificable y fecha. Un taker puede proponerlas; un curador las revisa. La especificación se congela |
| Pronósticos sin fundamento ni rendición de cuentas | **Tesis estructurada y sellada:** probabilidad, ancla histórica, factores, evidencia y qué haría cambiar de opinión. Se sella en Stellar y permanece oculta hasta el cierre, así que nadie copia a nadie. La fuente que ayuda a pronosticar nunca es la que decide la verdad |
| Quien anticipa bien no puede demostrarlo | **Perfil del maker, como el historial de un trader:** Brier, skill frente al ancla, tasa de acierto, calibración, frente al consenso, frente a la IA y P&L de decisión hipotético, por categoría y horizonte, recalculables por cualquiera |
| La probabilidad no llega a la decisión | **Consenso al cierre y Decision Register:** el taker recibe la mediana de tesis independientes antes del evento, la compara con su umbral de acción (p* = C/L) y guarda su decisión para revisarla al resolverse |

**Herramientas para el maker:** gráfico de la serie oficial, ancla histórica calculada por praev y un brief de evidencia generado por IA, igual para todos y sin probabilidad sugerida: la IA informa, no piensa por el maker.

### 5. Canales

- Capa pública gratuita: radar de preguntas, verificador y perfiles de makers como embudo de confianza.
- Preguntas de interés público, con patrocinio divulgado cuando lo haya.
- Torneos por categoría y **praev Bench**: ¿le ganas a la IA? Humanos y modelos medidos por categoría y horizonte.
- API y SDK para distribuir probabilidades con su procedencia.
- Pilotos directos con organizaciones expuestas, primero vía entrevistas de discovery.

### 6. Fuentes de ingreso

- **Pregunta pagada:** el taker paga un precio fijo por pregunta y se reparte entre los makers según la reputación que ya tenían al comprar, nunca según si aciertan esa vez. Así no es una apuesta y el incentivo a acertar sigue intacto: la reputación de hoy es el ingreso de mañana.
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
| Mercado | Makers activos, tesis selladas por pregunta, % de tesis completas, preguntas propuestas por takers |
| Calidad del pronóstico | Brier, skill frente al ancla (BSS), calibración, humanos frente a la IA, tamaño de muestra |
| Valor de decisión | % de alertas que generan una revisión o decisión, tiempo de anticipación, decisiones revisadas al resolverse |
| Social | Alcance gratuito, consultas antes del evento, % que declara haber cambiado una decisión |
| Comercial | Preguntas solicitadas por clientes, conversión de piloto a pago, retención |

Las pérdidas evitadas solo se reportan con un contrafactual defendible.

### 9. Ventaja injusta

El moat no es el modelo de pronóstico ni el código, y menos el acceso a una API: es el **historial acumulado y verificable de personas reales** pregunta → tesis sellada → identidad → resolución → métricas → decisión. Cualquiera puede llamar a un LLM; nadie puede fabricar retroactivamente un historial sellado. La mayoría de las plataformas se detiene en la resolución. Ese historial, anclado en una red pública, es verificable por terceros sin confiar en praev, y su conexión con decisiones reales es difícil de replicar. Se suma el conocimiento de fuentes oficiales y workflows locales de la región.

---

## Hipótesis críticas (Build → Measure → Learn)

| # | Hipótesis | Experimento | Se descarta si |
|---|---|---|---|
| H1 | Los decisores prefieren una probabilidad con regla y fuente a una alerta genérica | Comparar ambos formatos con responsables reales | Menos del 30 % prefiere el formato probabilístico |
| H2 | Fuente y regla explícitas aumentan la confianza | Prueba A/B de la misma pregunta con y sin especificación | No hay diferencia significativa |
| H3 | El historial de acierto cambia a quién se le cree | Presentar pronósticos contradictorios con su track record | Los compradores ignoran el historial |
| H4 | Las alertas generan decisiones | Piloto con Decision Register | Menos del 30 % de las alertas produce revisión o decisión |
| H5 | Hay disposición a pagar | 15–20 entrevistas y 3 pilotos con precio | Nadie acepta una propuesta pagada ni firma una LOI |
| H6 | Hay skill real frente al ancla | 100 o más preguntas pre-registradas | El consenso no supera al ancla |
| H7 | Hay makers dispuestos a sellar tesis para construir historial, sin pago inicial | Invitar makers a las preguntas LIVE del MVP | Menos de 5 personas sellan tesis o casi nadie completa los fundamentos |
| H8 | Los humanos con tesis aportan sobre la IA | Comparar consenso humano y rival de IA en las mismas preguntas | El rival de IA iguala o supera al consenso humano de forma sostenida |

**El MVP de esta buildathon valida la base técnica de todas ellas** y da una primera señal de H7 y H8: que el ciclo completo (propuesta → tesis sellada → revelado → decisión → resolución → perfil) funciona y es verificable de punta a punta. No pretende demostrar mercado ni superioridad predictiva.

---

## Por qué Stellar

La pregunta que guía el diseño es **"¿seguiría existiendo praev sin Stellar?"**. Como SaaS cerrado bastaría una base de datos con firmas. Pero praev promete que **cualquiera puede verificar el historial de un maker sin confiar en praev**, que nadie (ni praev) puede cambiar una tesis después de sellarla, y que ese historial pertenece al maker. Eso exige un registro neutral, público, barato y rápido. Ahí Stellar no es decoración: es la capa de confianza.

### Función por función

| Función | Qué aporta Stellar / Soroban | Cuándo ocurre | Por qué encaja |
|---|---|---|---|
| **Identidad (praev ID)** | Cuenta Stellar como identidad técnica; `require_auth` garantiza que solo el titular firma | Al conectar la wallet y en cada acción de escritura | Nadie puede publicar a nombre de otro; la reputación sigue a la dirección y no a una cuenta en nuestra base de datos |
| **Publicar la pregunta** | `create_question` registra el hash de la especificación, los tiempos estructurados (cierre, ventana de observación, resolución), el resolvedor y el modo LIVE/DEMO | Cuando el curador abre la pregunta | Las reglas quedan congeladas y fechadas antes de que nadie pronostique; el verificador compara la especificación publicada con la cadena |
| **Tesis sellada** | `submit_forecast` guarda solo el **compromiso** de la tesis (hash con sal de probabilidad y fundamentos), con versiones (`seq`) solo hacia adelante | Desde la apertura hasta el cierre | Prueba qué creía cada maker **antes** del resultado sin revelarlo antes del cierre: nadie copia y nadie edita. Con un ledger cada ≈5 s y fees mínimos, actualizar una tesis cuesta casi nada |
| **Cierre y revelado** | El timestamp del ledger es el reloj autoritativo; el contrato rechaza compromisos en `t ≥ closesAt` | Automático, sin keeper | Nadie, ni siquiera praev, puede colar una tesis tarde. Al cierre cada tesis revelada se compara con su compromiso; como el número de compromisos es público, una tesis ocultada se nota |
| **Resolución** | `resolve` exige la firma del resolvedor asignado, solo dentro de su ventana, y guarda resultado + hash de evidencia; el estado terminal es inmutable. El contrato impide que el resolvedor pronostique | Tras la ventana de observación | Separa a quien pronostica de quien decide la verdad y deja constancia pública de qué evidencia se usó |
| **Perfil del maker** | Eventos tipados (`#[contractevent]`) con cada pregunta, compromiso y resolución | Tras cada resolución | Brier, acierto, calibración y P&L de decisión se recalculan off-chain desde registros públicos; no existe una tabla de reputación editable por un administrador |
| **Verificación pública** | RPC y exploradores públicos (Stellar Expert, Stellar Lab) | En cualquier momento, sin cuenta | Un tercero descarga la evidencia, recalcula los hashes y compara con la cadena: coincide, no coincide o no disponible |
| **Rival de IA** | El agente sella su tesis con su propia cuenta; el payload incluye modelo, proveedor, versión del prompt y fecha de corte | Cuando el agente pronostica | Humanos e IA compiten bajo las mismas reglas y el mismo sellado; el historial de un modelo es auditable y una versión nueva no hereda el previo |
| **Pagos (P1)** | USDC nativo vía Stellar Asset Contract; una transacción del taker con un pago directo a cada maker, repartido por reputación previa | Al pagar una pregunta | Sin custodia, sin pool y sin pagos condicionados al resultado: se paga por información, no se apuesta. Micropagos a makers de cualquier país sin banco de por medio |
| **Acceso desde Latinoamérica (futuro)** | Anchors y SEP-24 para entrar y salir de moneda local; costos por transacción de fracciones de centavo | Al escalar la capa comercial y los pagos | Hace viable cobrar y pagar montos pequeños en la región sin la fricción de la banca tradicional |

### Lo que Stellar no prueba

Stellar demuestra **integridad, orden y autorización**: quién publicó qué, cuándo, bajo qué regla y con qué evidencia, sin reescritura silenciosa. **No demuestra que el hecho sea verdadero**: un resolvedor podría mentir, y por eso la resolución declara su fuente y su autoridad, y en el futuro tendrá comités y disputas. Tampoco usamos un oráculo de precios como Reflector (SEP-40) como juez: cada pregunta pacta de antemano una fuente oficial concreta (por ejemplo, el tipo de cambio interbancario que publica un banco central para un día), y muchas preguntas (lluvia, vedas, regulación) ni siquiera son precios. Un oráculo on-chain podría sumarse en el futuro como fuente adicional.

### Por qué ahora

- Las probabilidades se volvieron un producto de datos: mercados de predicción regulados distribuyen sus probabilidades a instituciones.
- Los agentes de IA ya compiten con pronosticadores humanos en torneos públicos: el pronóstico se vuelve abundante y lo escaso es saber a quién creerle. Nadie audita ese historial de forma neutral.
- Las plataformas de riesgo empiezan a lanzar productos "predictivos" sin rendición de cuentas posterior.
- Los datos meteorológicos oficiales se abren vía estándares como WMO WIS 2.0, que ya tiene nodos en la región.

Estos datos vienen de la investigación de `research/` y se verifican antes de usarlos en el pitch.

---

## Cómo funciona

```text
 TAKER                    MAKERS (personas + rival IA)            praev / Stellar                 FUENTE OFICIAL
 propone la pregunta ──▶  arman su tesis con ancla, datos  ──▶  sella el compromiso        ──▶  resuelve con la
 (decisión en juego)      y brief de evidencia                   (oculto hasta el cierre)        regla pactada
        ◀──── consenso revelado al cierre ◀──── tesis reveladas ◀────            perfil del maker ◀──── score
```

| Rol | Qué hace |
|---|---|
| Visitante | Lee preguntas, tesis reveladas, perfiles, evidencia y verificador sin cuenta |
| Taker | Propone una pregunta con su contexto de decisión, firmada con su wallet; recibe el consenso al cierre y registra su decisión |
| Maker | Arma su tesis con las herramientas de praev, la sella con su wallet y puede actualizarla hasta el cierre; construye su perfil |
| Rival de IA | Sella su propia tesis con su cuenta, como vara de medir; además genera el brief de evidencia, sin sugerir probabilidades |
| Curador | Revisa las propuestas y publica la pregunta con su especificación |
| Resolvedor | Aplica la regla a la evidencia oficial y firma el resultado |

## MVP — Stellar Codember Perú 2026

El MVP demuestra el mercado completo en Stellar Testnet con dos categorías de partida, elegidas porque tienen fuentes oficiales que respondieron en vivo:

- **Economía y finanzas:** tipo de cambio diario de bancos centrales de la región, con preguntas que se resuelven en 1–3 días. Así, para la entrega habrá decenas de resoluciones reales y perfiles de makers con datos, no simulados.
- **Clima y ambiente:** lluvia acumulada en una estación meteorológica oficial, con consecuencias humanas y económicas.

Son casos de prueba, no un límite: la [taxonomía](docs/04-domain/12-categories.md) tiene 11 macrocategorías y cada una se habilita cuando tiene una fuente verificada.

| Incluido (P0) | Más adelante (P1) |
|---|---|
| Contrato Soroban `PraevRegistry` en testnet con tesis selladas | Pago del taker repartido entre makers por reputación previa (USDC) |
| Preguntas LIVE de tipo de cambio y lluvia, y un escenario DEMO etiquetado | Más categorías de la taxonomía |
| Tesis estructurada con wallet, recibo de sellado y revelado al cierre | Varios agentes makers |
| Rival de IA y brief de evidencia vía LLM real | Consenso ponderado por reputación |
| Perfil del maker con métricas y verificador público | Credencial portable |
| Propuesta de pregunta del taker y Decision Register local | Decisiones en servidor con autenticación |

## Qué no es

- No es un mercado de predicción ni de apuestas: ningún dinero depende del resultado.
- No es un agregador de APIs ni un pronóstico de IA: las fuentes solo resuelven y la IA es una herramienta y un rival; el centro es el juicio de personas reales.
- No sustituye las alertas oficiales ni la asesoría profesional: informa decisiones, no las toma.
- No afirma precisión superior ni ahorros medidos. El MVP demuestra que el ciclo es íntegro y verificable.

## Stack

Next.js (App Router) + TypeScript + Tailwind · PostgreSQL (Neon) · Rust/Soroban en Stellar Testnet · `@stellar/stellar-sdk` y Stellar Wallets Kit · OpenRouter para el agente de IA, con salida estructurada validada con Zod · Vitest, Playwright y `cargo test` · despliegue en Vercel.

Las versiones fijadas están en [docs/03-architecture/01-stack.md](docs/03-architecture/01-stack.md).

## Documentación

Empieza por [AGENTS.md](AGENTS.md), el [scope](docs/02-mvp/01-scope.md), el [plan Scrum](docs/09-execution/06-scrum.md), el [product backlog](docs/09-execution/07-product-backlog.md) y las [decisiones (ADRs)](docs/10-decisions/01-adrs.md).

| Carpeta | Contenido |
|---|---|
| [00-foundation](docs/00-foundation) | Visión, principios, impacto, región, negocio, síntesis de la investigación |
| [01-product](docs/01-product) | Usuarios, recorridos, navegación, sistema visual, pantallas, copy y accesibilidad |
| [02-mvp](docs/02-mvp) | Scope, casos iniciales, fixture de demo, criterios de aceptación |
| [03-architecture](docs/03-architecture) | Stack, topología, fronteras de confianza, árbol del repo |
| [04-domain](docs/04-domain) | Pregunta, ciclo de vida, relevancia, tesis sellada, evidencia, consenso y ancla, exposición, decisión, oráculo, perfil del maker, identidad, categorías |
| [05-ai](docs/05-ai) | Agente de IA (brief y rival), esquema de salida, evaluación y leakage |
| [06-stellar](docs/06-stellar) | Red, interfaz del contrato, storage y eventos, hashes, wallet, prueba on-chain, pagos |
| [07-engineering](docs/07-engineering) | SQL, API, errores, reconciliación, fuentes de datos, entorno, setup, despliegue |
| [08-quality](docs/08-quality) | Seguridad, privacidad, pruebas, fixtures, CI |
| [09-execution](docs/09-execution) | Plan Scrum, product backlog (épicas e historias), sprints, calendario, guion de demo, checklist Codember, definition of done |
| [10-decisions](docs/10-decisions) | ADRs, preguntas abiertas, fuentes |

La investigación de base está en [research/](research/README.md). Las versiones anteriores de la documentación están en [archive/](archive/README.md) y se eliminarán cuando empiece el desarrollo.

## Equipo

| Integrante | GitHub | Rol |
|---|---|---|
| Por completar | [@devmondoss](https://github.com/devmondoss) | Por completar |

## Uso de IA

La investigación (informes Deep Research) y la documentación se elaboraron y organizaron con asistencia de herramientas de IA, entre ellas Claude Code. El equipo revisa y es responsable del contenido. El código se escribe en pair programming con Claude Code y lo revisa y commitea el equipo. Dentro del producto, el agente de IA (brief de evidencia y rival de referencia) usa modelos a través de OpenRouter.

## Ejecutar en local

Requisitos: Node ≥ 22.12, Rust ≥ 1.91 con el target `wasm32v1-none` y stellar-cli 30.0.1.

```bash
npm ci
cp .env.example .env.local      # completar DATABASE_URL (Neon o Docker con compose.yaml)
npm run db:migrate
npm run dev                     # http://localhost:3000 · health en /api/v1/health
npm run lint && npm run typecheck && npm test
npm run contract:test && npm run contract:build
```

App desplegada: https://praev.vercel.app

## Código previo y de terceros

No hay código previo: todo se escribe durante el periodo oficial de la buildathon (14 nov – 4 dic 2026). Código de terceros:

| Origen | Uso | Licencia |
|---|---|---|
| `create-next-app` 16.4.6 | Scaffold inicial de la app (configuración de Next.js, TypeScript, ESLint y Tailwind), adaptado después | MIT |
| Dependencias npm y crates | Listadas con versión exacta en `package.json` y `contracts/Cargo.toml` | Las de cada paquete |

## Licencia

Por definir antes de publicar código. Las bases recomiendan MIT, pero todavía no se ha concedido ninguna licencia.
