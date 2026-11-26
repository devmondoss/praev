# Praev: de “reputación predictiva” a infraestructura de decisión verificable

A fecha **26 de noviembre de 2026**, la conclusión principal de esta investigación es incómoda pero útil: **Praev, tal como está formulado hoy, contiene una idea potente, pero todavía mezcla demasiados productos distintos**. Reputación de forecasters, benchmark de agentes, marketplace de inteligencia, motor de consenso, alertas, pagos, credenciales y blockchain pueden convivir técnicamente; estratégicamente, intentar venderlos todos a la vez diluye la propuesta.

La oportunidad más interesante no parece ser construir “otro prediction market sin apuestas”, ni tampoco un “FICO de forecasters” aislado. El espacio está evolucionando rápidamente hacia algo más amplio: **sistemas que convierten incertidumbre futura en probabilidades auditables y luego conectan esas probabilidades con decisiones concretas**. Mantic ya vende forecasting automatizado y monitoreo; Sooth Labs se presenta como un “global foresight engine”; Cultivate Labs combina equipos humanos, AI Forecaster y continuous sensemaking; Good Judgment vende monitoreo y superforecasting a organizaciones; mientras que Polymarket y Kalshi están transformando los precios de mercado en una nueva clase de datos institucionales. citeturn284565search0turn284565search1turn284565search2turn127328search5turn439073search7

La tesis que recomiendo explorar para Praev es más concreta:

> **Praev debería intentar convertirse en una capa independiente de “decision-grade forecasting”: un sistema que descubre las preguntas cuyo futuro realmente cambia una decisión, genera y agrega probabilidades humanas, de IA y de mercados, mantiene un historial verificable de cada fuente y alerta cuando el cambio probabilístico cruza un umbral de acción.**

Eso es distinto de vender predicciones. **El producto final es una decisión mejor informada y defendible.**

## Qué está ocurriendo realmente en forecasting y prediction markets

Los prediction markets han dejado de ser una curiosidad de nicho. Kalshi es hoy un Designated Contract Market regulado por la CFTC; la propia CFTC registra un número creciente de exchanges de event contracts y Polymarket US aparece también como DCM. Kalshi anunció en mayo de 2026 una ronda de US$1.000 millones a una valoración de US$22.000 millones y afirmó que su volumen institucional había crecido 800% en seis meses. Es una afirmación de la propia empresa, no una auditoría independiente, pero el crecimiento institucional del sector es inequívoco. citeturn439073search4turn439073search1

Polymarket, por su parte, ya no está posicionando sus probabilidades únicamente como producto para traders. Su oferta institucional distribuye señales probabilísticas normalizadas a través de infraestructura de ICE, y su documentación deja claro que los datos de mercados, trades y wallets son accesibles mediante APIs. Es decir, **la probabilidad misma se está convirtiendo en un data product**. citeturn439073search6turn439073search7

Esto importa mucho para Praev. Intentar competir con Polymarket o Kalshi produciendo “la probabilidad del mundo” sería poco defendible. Ellos tienen un mecanismo económico para financiar price discovery y una enorme corriente de información. Pero tampoco significa que sus probabilidades resuelvan todo. Una investigación de Kalshi sobre más de 2,2 millones de observaciones encontró que la calibración mejora con cercanía al vencimiento, profundidad y participación. Estudios recientes sobre Polymarket también muestran buena calibración agregada, pero heterogeneidad importante entre categorías y momentos del ciclo de vida del mercado. citeturn439073search2turn589453search0turn589453search3

Hay además una observación especialmente relevante para Praev: un trabajo de 2026 sobre el universo de transacciones de Polymarket atribuye buena parte de su precisión no a una multitud homogénea, sino a una pequeña minoría de traders persistentemente hábiles, alrededor del 3% de las cuentas en ese análisis. Esto no prueba que esa cifra sea universal, pero sí respalda la hipótesis de que **la identidad histórica del predictor contiene información adicional al precio agregado**. citeturn589453search2

Al mismo tiempo, el lado no financiero del forecasting está convergiendo hacia el mismo lugar. Good Judgment lleva años construyendo superforecasters, midiendo calibración y agregando juicio humano; Cultivate Labs vende forecasting empresarial con probabilidades, scoring, agregación y AI; Metaculus opera torneos humanos y ahora competiciones enteras para bots. Su FutureEval incluso evita deliberadamente buena parte del contenido de entretenimiento típico de prediction markets y se concentra en acontecimientos globales de importancia. citeturn127328search4turn284565search3turn391314search7

Y ahora está llegando una nueva generación de startups puramente AI. **Mantic**, fundada en Londres en 2024, afirma haber superado a los 676 participantes humanos del Metaculus Cup de verano de 2026 y haber levantado aproximadamente US$29 millones en total; Reuters reportó una ronda seed de US$25 millones en septiembre. **Sooth Labs** está construyendo una arquitectura explícitamente orientada a forecasting longitudinal, signal detection y cryptographic proof. **Preseen**, YC S25, está construyendo agentes para forecasting macro. Ninguna de estas empresas fue “ganadora de YC”; fueron aceptadas en sus respectivos batches, que es una distinción importante. citeturn284565search0turn284565news6turn284565search1turn127328search2

También existe otra rama de forecasting empresarial que no tiene nada que ver con eventos binarios. The Forecasting Company, YC S24, trabaja con foundation models para series temporales aplicadas a demanda, ventas y revenue. Google lanzó TimesFM-3 en agosto de 2026; Amazon publicó Chronos-2; Salesforce mantiene Moirai. Este ecosistema importa porque demuestra que **“forecasting” ya se está separando en al menos dos clases tecnológicas muy distintas: eventos discretos de juicio y series temporales cuantitativas**. citeturn127328search0turn397001search0turn397001search2turn397001search4

Praev no debería mezclarlas conceptualmente. Una pregunta como “¿BCRP recortará la tasa antes de marzo?” es un **event forecast**. “¿Cuál será la inflación mensual durante seis meses?” es un **time-series forecast**. “¿Qué ocurriría con nuestra cartera si BCRP recorta?” es **scenario analysis**. “¿Debemos reducir exposición?” es **decision support**. “¿El recorte causó la caída en mora?” es **causal inference**. Son problemas relacionados, pero metodológicamente distintos.

El error estratégico sería llamarlos a todos “predicción” y meterlos en un mismo score.

## Qué puede aportar realmente la IA

La IA ya es suficientemente buena como para que Praev no pueda basar su moat en “tenemos un agente que predice”. Metaculus mantiene un benchmark dinámico precisamente porque forecasting es una prueba particularmente útil de razonamiento: el resultado todavía no existe en el momento del pronóstico, lo que reduce leakage por construcción. Su metodología mide accuracy, calibration y discrimination mediante proper scoring rules. citeturn391314search7

ForecastBench mostró en 2024 que los mejores humanos todavía superaban a los LLM evaluados en su muestra. Pero la frontera se ha movido rápido: los resultados de 2026 de Mantic y los torneos de Metaculus muestran que agentes bien construidos están acercándose o superando agregados humanos en algunos entornos. Esto no significa que “AI ya sea mejor que humanos” universalmente; significa que **la unidad competitiva ya no es el modelo base, sino el forecasting system completo: retrieval + herramientas + modelado + actualización + calibración + ensemble**. citeturn284565academia9turn284565search0turn391314search6

La literatura reciente apunta en esa dirección. Bench to the Future propone un entorno de pastcasting reproducible para evitar leakage. MIRAI mide agentes capaces de buscar información, usar APIs y razonar temporalmente. Un trabajo de 2026 sobre ensembles encuentra que añadir más muestras del mismo tipo de modelo produce rendimientos decrecientes cuando sus errores están correlacionados; los mejores ensembles combinan forecasters competentes **y diversos**. citeturn284565academia7turn284565academia8turn589453academia11

Eso cambia la arquitectura ideal de Praev. No construiría “Praev AI”. Construiría un **forecast orchestration layer** con forecasters heterogéneos:

**Baseline → Market → Statistical model → LLM A → LLM B → Human → Ensemble → Calibration → Decision threshold.**

Cada forecast debería conservar no solamente `p(event)`, sino también `forecast_time`, `information_cutoff`, `model/version`, `sources`, `domain`, `horizon`, `resolution_rule` y una huella del razonamiento. Sin esto, comparar agentes a lo largo del tiempo es casi inútil porque los modelos, prompts y fuentes cambian.

Los modelos de series temporales deberían entrar sólo cuando la pregunta lo requiera. TimesFM-3 y Chronos-2 muestran avances importantes en forecasting multivariante y covariates, pero investigación reciente sobre retornos financieros es una advertencia útil: en un benchmark preregistrado de futuros intradía, ninguna de 160 combinaciones modelo-representación-horizonte superó al baseline no-change. Otro trabajo encuentra ganancias escasas frente a random walk para retornos de acciones. **Un modelo sofisticado no sustituye un baseline trivial.** citeturn397001search0turn397001academia6turn397001academia7turn397001academia9

Éste debería convertirse en un principio de Praev:

> **No se publica “AI accuracy”. Se publica skill respecto del mejor baseline relevante.**

Para una pregunta electoral, el baseline puede ser prediction-market probability. Para lluvia, climatología y modelos meteorológicos. Para inflación, consenso económico o ARIMA/ETS. Para inventario, seasonal-naive. Para política monetaria, OIS/forwards si existen y consenso de analistas.

También evitaría convertir Brier Score en una métrica totalizante. Es una proper scoring rule útil para probabilidades binarias, pero la literatura recomienda múltiples scoring rules para caracterizar diferentes propiedades de un forecast. Y cuando hay pocas observaciones, un score puntual puede ser engañoso. citeturn589453academia12

Praev debería mostrar al menos:

**Brier / log score + calibration curve + discrimination + sample size + domain + horizon + uncertainty interval del score.**

Para agentes, añadiría **temporal freshness**, porque Metaculus ya observa deterioro de modelos cuando aumenta la distancia respecto de su training cutoff. citeturn391314search7

Hay otra oportunidad todavía más interesante: tratar la discrepancia como información. Un sistema podría mostrar:

**Market 42% · Human ensemble 61% · AI ensemble 68% · official model 47%.**

La anomalía no necesita ser resuelta automáticamente. Puede convertirse en una **investigation trigger**. Muchas decisiones empresariales se beneficiarían más de saber “las fuentes normalmente correlacionadas divergen” que de recibir un único número artificialmente preciso.

## El producto que merece existir

La hipótesis original de “reputación verificable” sigue siendo valiosa, pero **reputation alone is not a product**. W3C Verifiable Credentials ya permite representar afirmaciones portables firmadas, y sistemas como Ethereum Attestation Service permiten crear reputación y attestations on-chain u off-chain. Por tanto, “credenciales verificables para forecasters” puede ser una capa, pero difícilmente un moat suficiente. citeturn341177search7turn341177search0

La diferenciación potencial aparece cuando Praev une tres cosas:

**qué pregunta vale la pena responder + quién o qué merece peso al responderla + qué decisión cambia cuando cambia la probabilidad.**

Eso introduce un concepto más importante que el Reputation Score: **Value of Information (VoI)**.

La teoría de decisión define el valor de información en función de cuánto mejora la utilidad esperada de una decisión al disponer de nueva información. En forecasting meteorológico existe una larga tradición de evaluar el valor económico de probabilidades, no sólo su accuracy. citeturn138435search0turn138435search1

Esto permite convertir el “Relevance Engine” de una intuición UX en una disciplina cuantitativa. Para cada forecast candidate:

\[
VoI(q,d) \approx EU(d \mid forecast_q)-EU(d \mid baseline)
\]

No se necesita resolver perfectamente esa ecuación en el MVP. Basta con capturar cuatro variables:

**decision deadline, loss if wrong, reversible/irreversible action, probability threshold that changes action.**

Ejemplo: “¿Habrá lluvias extremas en Piura en los próximos 30 días?” sólo es útil si existe una acción antes del evento: mover inventario, activar cobertura, adelantar cosecha, reposicionar transporte, elevar reservas operativas. Una probabilidad de 70% sin decisión asociada puede ser informativa, pero no necesariamente valiosa.

Esta separación permite evaluar las principales direcciones de producto:

| Dirección | Buyer | Job-to-be-done | Cold start | Defensibilidad | Monetización | Evaluación |
|---|---|---|---|---|---|---|
| **Decision monitoring** | risk/ops/strategy teams | “Avísame cuando un riesgo cambie lo suficiente para actuar” | Medio | Alta si acumula feedback decisión→resultado | SaaS | **La más prometedora** |
| **Forecast API** | fintechs, agentes, software | “Dame probabilidades auditables” | Alto | Dataset + performance history | usage/API | Muy escalable, difícil al inicio |
| **Forecaster/agent benchmark** | AI labs, empresas | “¿Qué agente/humano predice mejor?” | Bajo-medio | Benchmark histórico | certification/API | Excelente wedge |
| **Reputation protocol** | plataformas externas | “Dame historial portable” | Muy alto | Network effects potenciales | API/protocol fee | Prematuro |
| **Marketplace de reports** | analistas/SMEs | “Compra criterio especializado” | Alto | Supply + reputation graph | take rate | Riesgo de volverse expert network |
| **Vertical decision support** | agro/seguros/logística/etc. | “Ayúdame con esta decisión concreta” | Bajo | Workflow + proprietary feedback | SaaS/seat | Mejor para encontrar PMF |
| **Consensus engine** | instituciones | “Crea nuestra house probability” | Medio | Internal data + organizational history | enterprise SaaS | Competido por Cultivate/GJ |

Mi recomendación es **no lanzar seis módulos**. Praev podría empezar como:

### Tesis principal

**Praev Monitor: decision intelligence para riesgos externos.**

El usuario define una decisión o exposición. Praev identifica preguntas resolubles, mantiene probabilidades de múltiples fuentes, evalúa sus track records y alerta cuando la situación cambia materialmente.

La pantalla central no sería:

**“El Niño: 72%”**

sino:

**“Riesgo de interrupción logística norte del Perú: 72%, +18 pp en 12 días. Umbral de acción configurado: 65%. Fuentes que impulsan el cambio: ENFEN, modelo AI-3, forecasters de clima. Próxima decisión: reposicionar inventario antes del 10 de diciembre.”**

Eso transforma forecasting en workflow.

### Alternativa fuerte

**Praev Bench: infraestructura para evaluar y certificar forecasting agents y humanos.**

Ésta sería técnicamente más limpia y muy alineada con la dirección de la industria. FutureEval ya demuestra una demanda investigativa por evaluar forecasting bots; Praev podría diferenciarse en evaluación por dominios empresariales, versiones de modelos, reproducibilidad, signed forecasts y exposición mediante API. citeturn391314search6turn391314search7

Su ventaja es que resuelve el cold start mejor: no necesita compradores de intelligence el día uno; necesita preguntas, agentes y ground truth.

### Alternativa de largo plazo

**Praev Probability API.**

Una API que responda:

`GET /forecast?question=...`

y devuelva no “la respuesta del modelo”, sino:

`market`, `human`, `ai`, `baseline`, `ensemble`, `confidence`, `provenance`, `track_record`.

Si Praev logra producir esa capa con evaluación histórica real, puede convertirse en infraestructura para otros sistemas de IA. Pero sería irresponsable venderla antes de demostrar skill.

Lo que **evitaría** en esta etapa es competir como expert network generalista. Good Judgment ya tiene años de track record; Cultivate tiene casos empresariales; plataformas de expert insights compiten con enormes redes y procesos comerciales. Tampoco construiría un prediction market propio: Praev no tiene necesidad de asumir el problema de liquidez, regulación y market making.

Las lecciones históricas de Augur son útiles. El protocolo resolvió problemas criptográficos difíciles, pero su UX, costos, liquidez y resolución obstaculizaron la adopción. La infraestructura técnicamente elegante no garantizó product-market fit. citeturn829888search0turn829888search1

## Dónde existe valor real para empezar

Perú ofrece un laboratorio particularmente bueno porque existen fuentes oficiales que generan ground truth periódico y porque varios sectores toman decisiones expuestas a shocks externos.

El caso climático es probablemente el mejor demostrador, aunque no necesariamente el mercado final. ENFEN publica comunicados periódicos y, al 13 de noviembre de 2026, mantiene una alerta de El Niño Costero y anticipa que el evento continuaría hasta inicios del invierno de 2027. Sus propios comunicados exhortan explícitamente a los tomadores de decisiones a utilizar escenarios de riesgo actualizados. citeturn935884search0turn935884search1

Esto crea preguntas resolubles del tipo:

**“¿La región Niño 1+2 superará X °C de anomalía en la ventana Y?”**

Fuente: ENFEN/SENAMHI.

Pero el usuario no compra esa predicción por curiosidad. El producto tendría que transformarla en:

**“¿Debo adelantar cosecha?”**  
**“¿Debo mover stock desde Piura?”**  
**“¿Debo elevar reservas o pricing de determinada exposición aseguradora?”**

Existe evidencia académica de valor económico de información meteorológica incluso en pequeños agricultores peruanos: un estudio sobre productores de quinua en el Altiplano estimó valor anual positivo para alertas de heladas, aunque esos valores pertenecen a ese contexto específico y no deberían extrapolarse directamente a otros cultivos o regiones. citeturn138435search5

El sector pesquero también es interesante porque produce resoluciones oficiales y eventos discretos. IMARPE publica desembarques y temporadas de anchoveta con fuente PRODUCE, lo que permite preguntas sobre apertura, duración, cuotas o cumplimiento de capturas. citeturn935884search5

Macro/fintech tiene ground truth excelente: BCRP publica tasa de referencia y datos históricos mediante API. Pero el problema comercial es distinto: muchas instituciones financieras ya tienen research, Bloomberg, Reuters, economistas y precios de mercado. Praev necesitaría demostrar **incremental forecasting skill** o mejor workflow, no simplemente pronosticar la tasa. citeturn935884search6turn935884search9

Logística y supply chain tienen alto costo de error y ventanas de acción atractivas, pero ground truth puede volverse más fragmentado. Una buena pregunta sería:

**“¿El tránsito por X corredor caerá más de Y% durante los próximos 14 días?”**

pero únicamente si existe una fuente confiable y predefinida para resolverla.

Riesgo regulatorio es interesante porque los acontecimientos son discretos y las consecuencias empresariales grandes. Sin embargo, sus horizons pueden ser largos y producir pocas resoluciones, lo que ralentiza muchísimo la construcción de reputation scores.

Seguros presenta uno de los mejores economics porque probabilidades y pérdidas ya viven dentro de la operación del comprador. Sin embargo, vender a aseguradoras exige precisión, integración y compliance más altos.

Mi ranking preliminar sería:

**climate/logistics para demostrar → insurance/agro-enterprise para monetizar → macro/regulatory como expansión.**

El contexto peruano refuerza el caso de riesgo climático: el Banco Mundial estima que los shocks de agua cuestan al Perú entre 1,3% y 3,5% del PIB anual y que una gran proporción del territorio es altamente vulnerable a peligros asociados a El Niño y cambio climático. Es una estimación macro, no el TAM de Praev, pero demuestra que la incertidumbre climática tiene consecuencias económicas reales. citeturn138435search9

## Stellar: dónde aporta y dónde sería teatro blockchain

La buildathon obliga a que el proyecto interactúe con Stellar testnet y otorga **25% de la evaluación al uso de Stellar**, además de 25% a funcionalidad técnica. Las bases también excluyen proyectos centrados en apuestas o especulación. fileciteturn0file1

Eso justifica maximizar Stellar en el MVP. No justifica convertir toda la arquitectura futura en blockchain.

La pregunta correcta es:

> **¿Qué información necesita una prueba independiente de que existía antes de conocerse el resultado?**

Ahí Stellar sí tiene una función genuina.

Para cada forecast, Praev puede construir:

`commitment = hash(question_id | probability | timestamp | forecaster_id | model_version | evidence_hash | salt)`

y publicar el commitment on-chain. Tras la resolución, revela el payload y demuestra que el forecast fue generado previamente y no reescrito.

Eso resuelve **tamper evidence**, no truth.

La distinción es crucial. W3C señala expresamente que una credencial verificable prueba autenticidad e integridad, no que la afirmación subyacente sea verdadera. Lo mismo ocurre con una blockchain: puede probar que alguien registró “72%” en cierto momento; no prueba que el forecaster sea bueno ni que la fuente de resolución sea correcta. citeturn341177search7

En Stellar, Soroban ya ofrece smart contracts, autorización, storage y eventos; Stellar también soporta activos y pagos nativos. citeturn399474search0turn399474search5

Yo pondría **on-chain**:

`forecast commitment`  
`question specification hash`  
`resolution source hash`  
`result attestation`  
`score checkpoint`  
`credential/attestation anchor`  
`USDC payment receipt`

Y mantendría **off-chain**:

documentos completos, evidencia, artículos, embeddings, razonamiento del agente, PII, data feeds, modelos, scores recalculables y lógica de agregación.

Eso evita almacenar información cara, privada o mutable dentro del ledger.

Soroban storage tiene mecanismos de TTL y archival que deben gestionarse conscientemente; no debe venderse la idea de “guardamos todo para siempre gratis”. citeturn399474search1turn399474search5

USDC sí puede convertirse en un componente natural si existe marketplace o pagos API. Circle soporta USDC nativo en Stellar y CCTP ya conecta Stellar con otras cadenas compatibles. Stellar también dispone de infraestructura de anchors para depósitos y retiros mediante estándares como SEP-24. citeturn399474search7turn399474search8turn399474search10

Pero hay que mantener el principio no custodial: Praev no debería poder mover unilateralmente fondos de usuarios. Y “smart contract” no equivale automáticamente a “no custodial” desde una perspectiva regulatoria; depende de las claves, permisos y flujo concreto.

Después de la hackathon yo haría una prueba brutal:

**¿Seguiría existiendo Praev si quitáramos Stellar?**

Si la respuesta es “sí, y sería casi igual”, blockchain no es el moat. Puede seguir siendo útil para auditabilidad y pagos, pero no debe convertirse en la narrativa central.

Si terceros empiezan a consumir y verificar los historiales de Praev sin confiar en Praev como operador, entonces el ledger sí empieza a producir valor estratégico.

## Economía, moat y riesgos

El mercado aparente es enorme, pero un TAM top-down sería engañoso. “Todas las empresas toman decisiones bajo incertidumbre” no significa que todas compren forecasting.

Un cálculo bottom-up razonable para una primera vertical sería:

\[
TAM_{wedge}=N_{accounts}\times ACV
\]

Por ejemplo, si Praev identificara **500 organizaciones realmente plausibles** en agro, seguros, logística y riesgo en un conjunto inicial de países, y asumiera un ACV hipotético de US$12.000, el wedge sería US$6 millones anuales. Si el ACV fuera US$50.000, serían US$25 millones. Esos números **no son estimaciones de mercado**: son escenarios para obligarnos a justificar número de compradores y willingness-to-pay.

La pregunta crítica no es TAM. Es:

**¿Quién tiene hoy un presupuesto y qué partida reemplaza?**

Praev podría competir con cuatro presupuestos distintos:

risk intelligence;  
research/data subscriptions;  
consulting/expert networks;  
internal analyst labor.

Es preferible encontrar un buyer que ya pague por reducir incertidumbre a intentar crear una categoría presupuestaria nueva.

El moat tampoco será el código de forecasting. Mantic puede usar frontier models; Metaculus produce benchmarks públicos; foundation models de series temporales están abiertos o disponibles por API. citeturn284565search0turn391314search7turn397001search2

El moat potencial es un **compounding dataset**:

`question → information set → forecast versions → forecaster/model identity → market state → resolution → decision → action → economic outcome`

La mayoría de sistemas llegan hasta `resolution`.

Si Praev logra capturar **qué decisión se tomó y qué pasó económicamente después**, obtiene algo mucho más difícil de copiar: no sólo “quién predice”, sino **qué forecasts generan valor para qué decisiones**.

Ahí aparece la verdadera posibilidad de un Relevance Engine.

También hay riesgos serios.

**Goodhart / gaming.** Si los forecasters saben exactamente cómo se calcula el score, pueden especializarse en preguntas fáciles.

**Selection bias.** Un forecaster puede elegir sólo preguntas donde tiene alta seguridad.

**Sybil identities.** Un actor puede crear múltiples identidades y conservar sólo la ganadora.

**Copying.** Si los forecasts son visibles antes del cierre, reputación puede construirse copiando al consenso.

**Insider information.** La precisión puede provenir de información material no pública, generando riesgos legales según dominio.

**Resolution capture.** Un forecast puede ser correcto intelectualmente pero puntuado incorrectamente si las reglas son ambiguas. Investigación de 2026 sobre Polymarket separa explícitamente la calidad de price discovery de los riesgos de resolución. citeturn589453search1

**Correlation.** Diez agentes sobre el mismo foundation model no son diez fuentes independientes. La evidencia reciente sobre AI ensembles lo confirma. citeturn589453academia11

**Small-n reputation.** Cinco aciertos no hacen a un superforecaster.

**Temporal leakage.** Backtesting de LLMs con datos que pudieron existir en el training corpus puede producir resultados falsos. Bench to the Future fue creado en parte para resolver exactamente esta dificultad. citeturn284565academia7

Por eso Praev debería diseñar evaluación como producto, no como feature.

## Recomendación estratégica y roadmap

Mi matriz final sería:

| Oportunidad | Dolor | Diferenciación | Facilidad MVP | Revenue temprano | Moat futuro | Veredicto |
|---|---:|---:|---:|---:|---:|---|
| Reputation passport | 2/5 | 3/5 | 5/5 | 1/5 | 3/5 | feature |
| Prediction marketplace | 2/5 | 2/5 | 3/5 | 3/5 | 2/5 | evitar |
| AI forecasting engine | 4/5 | 2/5 | 3/5 | 4/5 | 2/5 | demasiado competido |
| Forecast benchmark | 4/5 | 4/5 | 4/5 | 2/5 | 4/5 | excelente wedge |
| Probability API | 4/5 | 4/5 | 3/5 | 4/5 | 5/5 | visión infraestructura |
| Decision monitoring | 5/5 | 4/5 | 4/5 | 5/5 | 5/5 | **tesis principal** |
| Vertical climate-risk | 5/5 | 3/5 | 5/5 | 4/5 | 4/5 | mejor entrada |
| Generic protocol | 2/5 | 4/5 | 2/5 | 1/5 | 5/5 | demasiado temprano |

La tesis principal sería:

> **Praev converts uncertain futures into auditable decision signals.**
>
> No intenta predecir todo. Selecciona preguntas que pueden cambiar una acción, compara AI, humanos, modelos y mercados bajo evaluación común, genera una probabilidad calibrada y mantiene un historial verificable de cada fuente.

La buildathon debería demostrar esa tesis en miniatura, no construir la empresa entera.

### Próximos diez días

Construiría un único flujo impecable:

**Decision → Forecast Question → Multiple Forecasters → Commit → Aggregate → Resolve → Score → Alert → Pay.**

Tres fuentes serían suficientes:

1. un agente AI;  
2. un forecaster humano;  
3. un baseline externo, por ejemplo una probabilidad oficial o de prediction market cuando exista.

Usaría 10–20 preguntas históricas para demostrar scoring y 3–5 preguntas vivas para demostrar commits reales.

Stellar debe aparecer de manera visible: el usuario debería poder inspeccionar el commitment, resolución y pago en testnet. Esa dependencia técnica es consistente con los criterios de la buildathon. fileciteturn0file1

El video no debería hablar diez minutos de Brier scores. La secuencia debe ser:

**“Una empresa necesita decidir → hoy recibe opiniones imposibles de auditar → Praev convierte la incertidumbre en probabilidades rastreables → Stellar prueba que nadie reescribió el forecast → cuando cambia el riesgo, Praev dice que es momento de actuar.”**

### Próximos noventa días

No construiría más módulos hasta entrevistar entre **30 y 50 decision-makers** de dos verticales.

No preguntar: “¿usarías esto?”

Preguntar:

**¿Cuál fue la última decisión donde un evento externo les costó dinero?**  
**¿Qué información tenían antes?**  
**¿Qué probabilidad habría cambiado la decisión?**  
**¿Cuánto tiempo antes necesitaban saberlo?**  
**¿Qué fuente utilizaron?**  
**¿Cuánto costó equivocarse?**  
**¿Quién paga actualmente por esa información?**

Después ejecutar tres experimentos falsables:

**Experimento de skill.**  
H0: Praev ensemble no supera al baseline.  
Go: mejora estadísticamente y consistentemente en varias ventanas.

**Experimento de decision value.**  
H0: los forecast changes no cambian acciones reales.  
Go: ≥30% de alerts producen una revisión, escalamiento o decisión verificable.

**Experimento de willingness-to-pay.**  
H0: las organizaciones sólo encuentran el dashboard interesante.  
Go: al menos cinco pagan un piloto o firman LOI con precio concreto.

### Próximos doce meses

Si funciona el decision monitoring:

construir feedback de decisiones;  
integrar fuentes propias de clientes;  
crear forecasting tournaments por vertical;  
exponer API;  
introducir agent certification;  
medir economic value, no sólo Brier;  
comenzar a vender probabilidades como infraestructura.

Si funciona el benchmark pero no el decision product, pivotaría hacia **Praev Bench/API**.

Si compradores quieren reports humanos pero no probabilities, se estaría convirtiendo en expert network; decidiría explícitamente si ése es el negocio, en lugar de fingir que sigue siendo software.

Si nadie paga y los usuarios sólo disfrutan ver rankings, detendría el B2B thesis.

### Visión a tres–cinco años

La versión ambiciosa no es un dashboard de forecasts.

Es un **reputation and decision graph** donde cada nodo representa:

human;  
AI agent;  
market;  
statistical model;  
data source;  
event;  
decision.

Y cada arista registra:

“forecasted”,  
“used”,  
“disagreed with”,  
“resolved”,  
“outperformed”,  
“changed decision”.

Entonces Praev podría responder preguntas mucho más interesantes:

**“¿Qué combinación de fuentes predice mejor disruptions marítimos con 30 días de anticipación?”**

**“¿Qué agentes funcionan bien en macro pero mal en regulación?”**

**“¿Qué forecasts históricamente cambiaron decisiones rentables para empresas similares?”**

**“¿Cuándo debo confiar en el mercado y cuándo en expertos?”**

**“¿Cuánta confianza epistemológica tenemos realmente en esta probabilidad?”**

Esa capa no existe de manera completa hoy. Pero partes importantes sí existen en Mantic, Sooth, Cultivate, Good Judgment, Metaculus, prediction markets y attestation systems. Por eso la oportunidad no es “nadie ha pensado esto”.

La oportunidad es construir la **intersección**.

La principal amenaza a Praev tampoco es Polymarket. Es que Mantic, Sooth o Cultivate lleguen naturalmente a decision monitoring antes de que Praev produzca una ventaja propia. Mantic ya habla de Scan, Forecast y Monitor; Sooth ya habla de capital allocation, risk management y cryptographic proof; Cultivate ya vende continuous sensemaking y alertas. citeturn284565search0turn284565search1turn284565search2

Por tanto, “reputación + IA + blockchain” no es una diferenciación suficiente.

La diferenciación que sí podría sobrevivir es:

> **Praev identifica qué futuros tienen valor económico para una decisión concreta, mide todas las fuentes predictivas bajo el mismo sistema de evidencia y conserva una prueba independiente de qué sabía cada una, cuándo lo sabía y cuánto valor produjo.**

Eso convierte **Proof of Foresight** de tagline en arquitectura.

Y también produce una regla estratégica bastante clara:

**No predecir más cosas. Construir una mejor conexión entre predicción, confianza y acción.**