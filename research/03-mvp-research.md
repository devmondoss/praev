# Praev — definición estratégica y técnica final para el MVP

**Fecha de corte: 26 de noviembre de 2026**

Praev — **Proof of Foresight · Verifiable Intelligence for Real-World Decisions** — tiene una tesis más defendible si deja de presentarse como “una plataforma de forecasting” y se define como **infraestructura de inteligencia anticipatoria para acontecimientos externos que afectan decisiones reales**. El producto no debería competir por predecir cualquier cosa que genere atención; debería seleccionar aquello que tenga consecuencias humanas o económicas, pueda modificar una decisión antes de ocurrir y pueda resolverse posteriormente con evidencia verificable.

La recomendación central de esta investigación es cerrar el MVP en **riesgo climático y abastecimiento alimentario en Perú**, con expansión conceptual hacia Chile, Colombia y Bolivia. No porque sea el único mercado posible, sino porque es el punto donde convergen mejor el impacto humano, la utilidad empresarial, la disponibilidad de datos oficiales, el forecasting probabilístico y una justificación real para Stellar. En paralelo, la investigación muestra que **“impacto comercial” no debería convertirse en un tercer eje de impacto al mismo nivel que humano y económico**. Es mejor modelarlo como una capa de **exposición y valor de decisión**: cuánto puede ganar, perder o mejorar una organización si anticipa un acontecimiento suficientemente temprano.

Esto tampoco es un espacio vacío. ClimateAi vende inteligencia climática a empresas para decisiones de producción, sourcing, colocación de producto y expansión; Prewave y Everstream venden alerta temprana y cuantificación de exposición en supply chains; Blue Yonder utiliza variables externas, incluido el clima, para mejorar planificación de demanda y abastecimiento, y tiene un caso publicado de Supermercados Peruanos. La oportunidad de Praev no es afirmar que nadie hace “risk intelligence”, sino combinar algo menos habitual: **preguntas probabilísticas explícitas + historial verificable de quién las pronosticó + resolución auditable + relevancia humana/comercial + humanos y agentes de IA evaluados con las mismas reglas**. citeturn680650search0turn680650search4turn680650search5turn680650search6

Para Codember, esta tesis además encaja mejor que un prediction market: las bases permiten identidad, credenciales, reputación e impacto social, exigen uso efectivo de Stellar en testnet y excluyen proyectos centrados en especulación o apuestas. La entrega final es el **4 de diciembre de 2026 a las 11:59 p. m. de Lima**, el Demo Day es el **5 de diciembre**, y la evaluación pondera uso de Stellar 25%, funcionalidad/calidad técnica 25%, problema/impacto 20%, innovación 15% y UX 15%. fileciteturn0file1

## Tesis de producto, impacto y negocio

La distinción que faltaba es esta:

**Impacto humano** responde a “¿qué cambia para las personas?”. Seguridad alimentaria, acceso a agua, prevención, ingresos, salud, continuidad de comunidades.

**Impacto económico** responde a “¿qué actividad productiva o sistémica queda expuesta?”. Producción agrícola, pesca, energía, logística, exportaciones, disponibilidad de productos, precios.

**Valor comercial** responde a otra pregunta: **“¿qué decisión concreta puede tomar una organización gracias a saber esto antes?”**. Esa decisión puede ser cambiar proveedor, adelantar compras, aumentar inventario de seguridad, redirigir distribución, modificar una campaña, replantear pricing, activar contingencias, adelantar cosecha o suspender operaciones.

Por eso no recomiendo crear tres círculos llamados “humano / económico / comercial”. Comercial no describe una clase distinta de consecuencia; describe **quién captura valor actuando sobre una consecuencia**.

El modelo conceptual de Praev debería ser:

**Evento externo → Probabilidad → Consecuencia → Exposición → Decisión → Resultado observado.**

Esa quinta pieza —la exposición— es donde aparece el negocio.

Prewave ilustra bien este principio: ya no vende solamente “hay riesgo en proveedor X”; conecta el evento externo con piezas, inventario e ingresos del cliente para cuantificar qué interrupciones importan. Everstream hace algo similar integrando inteligencia externa con ERP, procurement, logística y sistemas internos. Esa evidencia favorece que Praev no intente ser únicamente un “feed de probabilidades”: el valor B2B aparece cuando el evento está conectado con una decisión del comprador. citeturn680650search4turn680650search5

La separación debería verse así:

| Capa | Ejemplo |
|---|---|
| Evento | “Precipitación acumulada en Chulucanas superará X mm” |
| Forecast | 68% |
| Impacto humano | riesgo para comunidades / cultivos / movilidad |
| Impacto económico | exposición agrícola y logística |
| Exposición comercial | proveedor, zona de abastecimiento o ruta de una empresa |
| Acción | adelantar compra, cambiar ruta, activar proveedor alterno |
| Evidencia posterior | dato oficial SENAMHI |
| Aprendizaje | qué forecasters anticiparon correctamente el evento |

**Decisión recomendada:** el dashboard público puede mostrar las primeras cuatro capas; el producto empresarial monetizable empieza en la quinta.

### Quién compra y quién se beneficia

En el primer vertical, el **usuario**, el **comprador** y el **beneficiario** no tienen por qué ser la misma persona.

Un responsable de abastecimiento de una agroexportadora puede ser usuario y comprador. Un agricultor pequeño puede ser beneficiario de una alerta financiada por otra organización. Una ONG puede comprar una vista territorial para apoyar comunidades. Un banco puede comprar inteligencia para vigilar exposición de cartera agrícola. Un gobierno puede ser tanto fuente de datos como usuario institucional.

La evidencia disponible hoy demuestra que empresas ya pagan por herramientas que incorporan clima y señales externas en planificación. ClimateAi describe casos de agricultura, food & beverage, sourcing y demanda; Blue Yonder publica que Supermercados Peruanos pasó de procesos de forecast manuales a una solución que combina variables internas y externas, incluidas condiciones meteorológicas. Eso valida la **categoría de gasto**, pero no valida todavía que un comprador pagaría específicamente por Praev. Esa disposición a pagar sigue siendo una hipótesis que hay que probar. citeturn680650search0turn680650search1turn680650search6

Los dos compradores iniciales que investigaría primero son:

1. **Agroexportadores / procesadores de alimentos**, porque tienen exposición clara a clima, disponibilidad, producción y logística.
2. **Distribuidores o retailers alimentarios**, porque el abastecimiento, desperdicio, inventario y disponibilidad convierten una señal externa en una decisión recurrente.

Aseguradoras y bancos tienen presupuestos interesantes, pero incorporan riesgo regulatorio, underwriting y procesos comerciales más largos; los dejaría para después del MVP.

### Cómo trabajar con marcas sin corromper la inteligencia

Sí hay una vía fuerte para trabajar con marcas, pero no debería parecer publicidad.

El producto puede ofrecer **suscripciones sectoriales, dashboards, alertas, API, integraciones y research commissions**. También puede permitir que una empresa financie una pregunta de interés público, por ejemplo: “¿Existe riesgo elevado de interrupción de abastecimiento de determinado producto durante las próximas cuatro semanas?”. Esa pregunta debería llevar una etiqueta visible de patrocinio, mientras que **el patrocinador no podría editar el resultado, comprar una probabilidad determinada ni alterar reputaciones**.

La regla propuesta debería ser:

> **A sponsor may fund a question, never its answer.**

Praev debería mantener un firewall editorial: especificación de resolución congelada antes de abrir forecasts; disclosure de patrocinador; fuente de resolución independiente; historial completo de revisiones; nada de publicidad encubierta; nada de vender datos personales; ningún mecanismo por el que una marca pueda pagar para subir su score, borrar errores o esconder forecasts adversos.

Eso mantiene alineados propósito e ingresos.

La hipótesis de negocio queda entonces más clara:

**Lo público financia confianza. Lo empresarial monetiza exposición y decisión.**

## Mercado y diferenciación real

Praev se encuentra en la intersección de varias categorías que ya existen.

**Forecasting estructurado.** Metaculus obliga a definir criterios de resolución con precisión, permite forecasts probabilísticos y utiliza scoring propio; su Community Prediction agrega forecasts recientes y busca reducir ruido. Good Judgment comercializa forecasting profesional, mantiene scoring sistemático y basa su metodología en selección, entrenamiento, trabajo en equipo y agregación. citeturn575296search0turn575296search1turn575296search3turn575296search5turn575296search6

**Prediction markets.** Kalshi define para cada mercado reglas, fuente de verificación y procedimiento de settlement; puede esperar a la publicación oficial antes de resolver. Polymarket utiliza reglas predefinidas y el Optimistic Oracle de UMA, con propuestas, bond, ventana de disputa y escalamiento. Esas plataformas son excelentes referencias para diseño de resolución, pero Praev no necesita reproducir su incentivo financiero ni sus instrumentos negociables. citeturn338985search0turn338985search1turn278398search0turn278398search1

**Climate intelligence.** ClimateAi convierte escenarios meteorológicos y climáticos en decisiones de supply chain, producción, ubicación y demanda. citeturn680650search0turn680650search1

**Supply-chain risk intelligence.** Prewave y Everstream detectan eventos, relacionan exposición y llevan alertas a workflows empresariales. citeturn680650search4turn680650search5

**Demand sensing.** Blue Yonder combina datos internos y externos para forecasts operativos de demanda e inventario. Eso es un sustituto parcial, pero hay que distinguirlo: Praev debería pronosticar **eventos externos**, no pretender reemplazar el demand planning interno de una empresa. citeturn680650search6turn680650search7

Por tanto, el posicionamiento no debería ser “somos los únicos que predicen riesgos externos”. Eso sería insostenible.

La diferencia defendible sería:

> **Praev convierte acontecimientos externos relevantes en preguntas probabilísticas verificables, identifica quién los anticipa mejor y conecta esas probabilidades con decisiones humanas y empresariales.**

En inglés:

> **Praev turns consequential external events into verifiable forecasts, measures who predicts them best, and connects foresight to real-world decisions.**

Hay dos alternativas razonables si las entrevistas comerciales debilitan esta tesis.

**Alternativa A — Public-interest forecasting infrastructure.** Menos B2B inicialmente; universidades, comunidades, organismos públicos y ONGs crean y pronostican preguntas verificables. Monetización posterior mediante API, research y enterprise workspaces.

**Alternativa B — Enterprise external-risk forecasting.** Elimina casi por completo la capa pública y vende un workspace de preguntas privadas para supply chain, procurement y risk teams. Es comercialmente más convencional, pero pierde parte del propósito social y hace menos diferenciadora la propuesta.

La tesis recomendada es la intermedia porque permite que la misma infraestructura sostenga ambos lados.

## Praev Event Engine

El mayor cambio conceptual respecto del planteamiento anterior es correcto: **Praev no debería depender estructuralmente de que Polymarket o Kalshi decidan qué merece ser pronosticado**.

Puede consumir sus mercados como una señal adicional en el futuro, pero la unidad fundamental debe ser una **Praev Question** propia.

Metaculus es una referencia más útil que un exchange para esta parte: enfatiza que los criterios de resolución son la columna vertebral de una pregunta y que ambigüedades posteriores pueden obligar a anularla. Kalshi refuerza la misma idea desde otra arquitectura: valor medido, ventana temporal y fuente oficial deben quedar determinados previamente. citeturn575296search3turn575296search0turn338985search3

### Qué componentes son distintos

No conviene llamar “oráculo” a todo.

**Curator / moderator:** decide si una pregunta es útil, clara, ética y pronosticable.

**Event Engine:** transforma una señal o necesidad en una especificación formal de pregunta.

**Forecast Engine:** recibe probabilidades humanas/IA y produce agregados.

**Data Oracle:** obtiene un dato externo verificable.

**Resolution Oracle:** aplica la regla predefinida al dato y produce el outcome.

**Reputation Engine:** actualiza accuracy, Brier/calibración y reputación por dominio una vez resuelto el evento.

Esta separación evita un error fundamental: **la fuente que ayuda a pronosticar nunca debería confundirse automáticamente con la fuente que decide la verdad final.**

Un forecast puede usar Copernicus, modelos meteorológicos, noticias, imágenes satelitales y análisis experto. La resolución puede depender exclusivamente del dato publicado por SENAMHI.

### Pipeline recomendado

`Signal → Relevance → Draft question → Human review → Freeze resolution spec → Publish → Forecast → Updates → Evidence ingestion → Proposed resolution → Review/dispute → Final resolution → Score → Reputation`

La IA puede ayudar en `Signal`, `Relevance`, `Draft question` y `Evidence ingestion`. No debería ser la autoridad final de `Final resolution`.

### Schema mínimo de una pregunta

```text
question_id
version
title
region
country
sector[]
domain
beneficiaries[]
decision_context
impact_human
impact_economic
exposure_tags[]

question_type
unit
operator
threshold
observation_window_start
observation_window_end
timezone
forecast_close_at

primary_resolution_source
secondary_resolution_source
source_dataset
expected_publication_delay

resolution_rule
revision_policy
missing_data_policy
ambiguity_policy
invalidation_policy

creator
sponsor
conflicts[]
resolver
reviewers[]

spec_hash
status
created_at
published_at
resolved_at
outcome
evidence_hash
```

Los **estados** mínimos deberían ser:

`DRAFT → REVIEW → OPEN → CLOSED → RESOLUTION_PENDING → PROVISIONAL → RESOLVED`

Con salidas excepcionales `INVALID` y `CANCELLED`.

Después de `OPEN`, cualquier cambio semántico importante debería crear una **nueva versión**, no sobrescribir silenciosamente la anterior. Esa política sigue la lección de Metaculus: aclaraciones tardías pueden alterar injustamente el scoring de forecasters. citeturn575296search0turn575296search3

### Controles de integridad

Praev debe congelar ex ante: umbral, unidad, timezone, fuente, ventana, política de revisiones y condiciones de invalidación.

Si la fuente oficial corrige un dato, la pregunta debe decir con anticipación si usa: primera publicación, dato vigente al momento T, o dato final revisado.

Si la API cae, el resolver debería conservar el documento/response original, timestamp, content hash y, cuando sea posible, una segunda fuente de respaldo.

Si falta el dato final, no se improvisa. Se ejecuta `missing_data_policy`.

Si existe conflicto entre fuentes, manda la fuente primaria definida previamente. La secundaria sirve solamente si la política de fallback lo permite.

Un forecaster vinculado materialmente con el resultado puede participar, pero debería declarar conflicto cuando exista riesgo de información privilegiada. Para reputación pública, Praev puede separar forecasts “open”, “conflicted” y “independent”.

Contra Sybil, no intentaría resolver identidad global en el hackathon. Para P0: una wallet = una identidad técnica; reputación basada en historial, no en “una persona única”. P1 puede añadir credenciales verificadas y mecanismos anti-Sybil.

## Fuentes y preguntas resolubles

La disponibilidad de datos en la región es mejor de lo que parecía.

En **Perú**, SENAMHI publica datos hidrometeorológicos y dispone de catálogos WMS/WFS; además, su nodo WIS 2.0 ya expone estaciones peruanas, incluida **CHULUCANAS**, identificada como estación operativa. ANA ofrece servicios y visualizadores hidrológicos, IMARPE dispone de INFOMAR/SIOFEN para condiciones oceánicas y pesqueras, y MIDAGRI publica geoservicios y datasets de precios/agricultura. citeturn891518search0turn891518search1turn891518search4turn891518search6turn891518search7turn891518search8turn498742search3

En **Chile**, DMC publica servicios JSON y datos meteorológicos; DGA opera una red hidrométrica nacional y advierte explícitamente que datos en línea pueden revisarse; ODEPA ofrece datasets abiertos y API para precios, comercio exterior y agricultura; SERNAPESCA publica datos abiertos del sector pesquero y acuícola. citeturn527936search0turn527936search2turn527936search3turn527936search7turn527936search8turn527936search10

En **Colombia**, IDEAM publica datos abiertos y servicios ArcGIS REST; DANE dispone de SIPSA para precios y abastecimiento agrícola; XM ofrece una API pública del mercado eléctrico mediante SIMEM/PyDataXM. citeturn435067search0turn435067search1turn435067search4turn435067search5turn435067search2

En **Bolivia**, SENAMHI ya opera un nodo WIS 2.0 con observaciones meteorológicas e hidrológicas accesibles mediante OGC API; el INE mantiene estadísticas agrícolas y de precios; el Observatorio Agroambiental y Productivo publica boletines recientes de precios. citeturn826913search0turn826913search1turn826913search8turn826913search9turn826913search12

Globalmente, NOAA/NCEI mantiene APIs de clima, Copernicus ofrece acceso programático vía Climate Data Store, FAOSTAT tiene API y WMO WIS 2.0 funciona operacionalmente desde enero de 2025 como infraestructura internacional de intercambio de datos meteorológicos e hidrológicos. citeturn987761search0turn987761search1turn987761search6turn987761search8turn987761search10turn987761search11

Para el MVP, sin embargo, **no integraría diez fuentes**.

Usaría máximo dos:

**Fuente automática:** SENAMHI/WIS 2.0 para una variable meteorológica verificable.

**Fuente manual/documental:** MIDAGRI/SISAP o SENAMHI descarga oficial para demostrar resolución con evidencia.

### Preguntas de demo propuestas

Estas son plantillas operativas; antes de abrirlas se debe verificar que la variable exacta esté disponible de forma continua y congelar el identificador de dataset/estación. No deben publicarse con datos inventados.

**Impacto social**

> ¿La precipitación acumulada registrada por SENAMHI en la estación Chulucanas superará 25 mm entre las 00:00 PET del 1 de diciembre y las 23:59 PET del 3 de diciembre de 2026?

Fuente primaria propuesta: SENAMHI / estación CHULUCANAS `0-604-1-08602104`. La existencia y estado operativo de la estación están publicados en WIS 2.0; la presencia y granularidad de la variable de precipitación debe validarse antes de congelar la pregunta. citeturn498742search3turn498742search1

Decisión asociada: revisar prevención local, movilidad, cosecha y logística.

**Impacto económico**

> ¿La precipitación acumulada en la misma estación superará el umbral operativo definido para riesgo de cosecha durante la ventana 1–3 de diciembre?

Para una pregunta real, el “umbral operativo” **no puede inventarlo Praev**: debe provenir de literatura técnica o del propio comprador y quedar declarado ex ante.

**Comercial**

> ¿El precio mayorista oficial de un producto agrícola seleccionado en Lima aumentará al menos 10% entre el dato base del 26 de noviembre y el dato publicado para el 4 de diciembre de 2026?

Fuente propuesta: MIDAGRI/SISAP. MIDAGRI mantiene información de precios mayoristas y abastecimiento, aunque para el MVP hay que verificar que el producto elegido tenga publicación suficiente en ambas fechas. citeturn404165search0turn404165search2turn404165search8

Decisión asociada: procurement, inventario, sourcing o distribución.

**Expansión Chile — no P0**

> ¿El precio mayorista oficial de una fruta u hortaliza seleccionada superará un umbral definido el 4 de diciembre de 2026?

ODEPA publica precios y volúmenes diarios de productos frescos y expone API. citeturn527936search7turn527936search8

**Expansión Colombia — no P0**

> ¿El precio de energía de una variable definida del mercado colombiano superará un umbral durante una ventana determinada?

XM dispone de API pública para SIMEM, pero el nombre exacto de variable, unidad y serie debe seleccionarse desde su catálogo antes de abrir la pregunta. citeturn435067search2turn435067search3

Para la demo del 5 de diciembre se debe diferenciar visualmente:

**FORECAST FUTURO — aún no resuelto**

de

**EJEMPLO HISTÓRICO / SIMULADO — solo demostrativo**

Nunca backdatear un forecast ni fingir que una predicción fue enviada antes del resultado.

## Arquitectura del oráculo y dependencia real de Stellar

Este punto puede convertirse en una de las mejores partes técnicas del MVP si se mantiene sobrio.

Stellar define los oráculos como servicios que conectan contratos con información off-chain. Reflector ya implementa oráculos descentralizados sobre Stellar, pero su foco verificable actualmente son principalmente **precios de activos, FX e índices**, mediante feeds compatibles con SEP-40. Eso lo hace útil para pricing financiero, pero no resuelve por sí solo preguntas como lluvia en Piura, una veda pesquera o un cambio regulatorio. citeturn728031search8turn411850search1turn411850search2

El principio importante es que **el contrato Soroban no debería intentar hacer HTTP directamente**. La arquitectura de oráculos de Stellar presupone un componente externo que obtiene el dato y lo entrega on-chain; los contratos procesan datos deterministas dentro de su entorno. citeturn728031search8turn728031search0

### Opciones evaluadas

| Modelo | Confianza | Complejidad | MVP |
|---|---:|---:|---|
| Resolución manual + evidencia firmada | media | baja | **sí** |
| Adaptador determinista de API | media/alta | media | **sí, uno** |
| Comité 2-de-3 | alta frente a error individual | media | P1 |
| Optimistic dispute | alta si hay participantes | alta | P1/P2 |
| Oracle descentralizado propio | potencialmente alta | muy alta | no |
| Oracle externo existente | depende del dominio | baja | cuando aplique |

UMA demuestra que un sistema optimista puede funcionar mediante propuesta, bond, ventana de disputa y escalamiento; Polymarket utiliza ese patrón. Pero replicar ahora incentivos, bonds y una red de disputadores sería una desviación del MVP. citeturn278398search0turn278398search1turn278398search4

### Arquitectura recomendada para Codember

```text
SENAMHI / MIDAGRI
        │
        ▼
Praev Resolver Service
(fetch + normalize + hash)
        │
        ├── raw evidence → off-chain DB/object storage
        │
        └── signed outcome + evidence_hash
                       │
                       ▼
              Soroban Contract
          ┌─────────────────────┐
          │ question spec hash  │
          │ forecast timestamp  │
          │ forecaster address  │
          │ probability         │
          │ outcome             │
          │ evidence hash       │
          │ score event         │
          └─────────────────────┘
                       │
                       ▼
                Stellar testnet
```

Lo que Stellar garantiza aquí no es “la verdad meteorológica”. Garantiza otra cosa: **quién publicó qué, cuándo, bajo qué especificación, qué evidencia fue utilizada después y que esos registros no fueron silenciosamente reescritos por Praev**.

Esa es una dependencia legítima.

Una versión centralizada podría guardar `created_at`, forecast y resultado en PostgreSQL y un administrador podría modificarlos. En Praev, el contrato y las transacciones introducen una referencia externa verificable para commitments, resolución y reputación. Soroban tiene autorización de contratos, almacenamiento persistente y eventos consumibles desde Stellar RPC; el estado contractual además tiene consideraciones de TTL/archival que deben contemplarse en diseño y tests. citeturn483970search1turn616845search0turn616845search1turn483970search3

### Interfaz contractual mínima

Pseudocódigo conceptual:

```rust
create_question(
    id,
    spec_hash,
    domain,
    closes_at,
    resolver
)

submit_forecast(
    id,
    forecaster,
    probability_bps,
    rationale_hash
)
// require_auth(forecaster)

propose_resolution(
    id,
    outcome,
    evidence_hash
)
// require_auth(resolver)

finalize_resolution(id)

get_question(id)
get_forecast(id, forecaster)
```

El contrato debería emitir eventos como:

```text
QuestionCreated
ForecastSubmitted
ResolutionProposed
ResolutionFinalized
ScoreRecorded
```

El backend escucha esos eventos y los indexa. Stellar documenta explícitamente el consumo e indexación de Soroban events mediante RPC. citeturn483970search3

No almacenaría textos largos, datasets, documentos ni PII on-chain. Se almacena **hash + identificadores mínimos + outcome**; el contenido vive off-chain.

### Commit/reveal

Para este MVP **no lo recomiendo**.

Si los forecasts son públicos, una transacción autenticada y timestamped ya demuestra que el usuario no cambió retrospectivamente su predicción.

Commit/reveal añade dos problemas: hay que gestionar salts y obliga a una segunda transacción. También puede destruir UX si un usuario pierde el salt y no puede revelar.

Tiene sentido posteriormente para preguntas donde se quiera evitar anchoring o copiar al consenso. Metaculus de hecho oculta temporalmente su agregación en determinadas circunstancias para reducir ese efecto de anclaje. citeturn575296search0

Por ahora: forecast público, firmado, inmutable.

### Pagos

USDC existe nativamente en Stellar y Circle publica tanto dirección mainnet como testnet. citeturn845681search0turn845681search2

Pero **no metería pagos en P0** salvo que las funciones principales estén terminadas antes.

Si sobra tiempo, un flujo opcional puede ser: una organización paga en testnet por financiar una pregunta o informe, directamente a la dirección del destinatario mediante Stellar. Nada de pool, saldo interno, escrow especulativo o payout condicionado al outcome. Si se usa un activo de prueba distinto de USDC, debe etiquetarse claramente como test asset.

No se necesita token propio.

## IA, forecasting y reputación

La IA puede hacer mucho por Praev, pero su valor principal no es “preguntarle al LLM qué ocurrirá”.

El flujo recomendable es human-in-the-loop:

**Detección.** El sistema analiza publicaciones, datasets y señales y propone eventos candidatos.

**Normalización.** Un LLM transforma una señal vaga en una pregunta estructurada.

**Crítica.** Otro paso busca ambigüedad, unidades faltantes, timezone, source mismatch y condiciones imposibles de resolver.

**Enriquecimiento.** Identifica sectores afectados, beneficiarios y decisiones potenciales.

**Forecast.** Humanos y agentes producen probabilidades independientes, con evidencia.

**Resolución.** Código determinista o un humano autorizado consulta la fuente oficial. El LLM puede extraer o resumir evidencia, pero **no es source of truth**.

**Scoring.** Código normal calcula Brier u otra proper scoring rule.

El Brier score sigue siendo una buena métrica para preguntas binarias porque castiga probabilidades incorrectamente extremas y permite evaluar calibración a lo largo de múltiples eventos. Metaculus utiliza proper scoring y destaca que el interés está en el desempeño agregado, no en juzgar a una persona por una sola pregunta. citeturn575296search1turn575296search4

Praev debería mostrar reputación por **dominio**, no una cifra universal:

```text
Clima               0.82
Agro                0.77
Energía             0.61
Macro               insufficient data
```

Y siempre `n = número de preguntas resueltas`.

Un usuario con 2/2 no debe aparecer por encima de alguien con 74/100 solo porque su accuracy cruda sea mayor.

El consenso del MVP tampoco necesita machine learning sofisticado. Empezaría con:

`median probability`

y mostraría al lado:

`reputation-weighted probability — experimental`

Esto evita afirmar que un algoritmo no validado es superior.

La evidencia de Good Judgment sí respalda que selección de forecasters, entrenamiento, colaboración y agregación pueden mejorar resultados, mientras que Metaculus muestra que agregados comunitarios y scoring sistemático son un enfoque maduro. Eso respalda la tesis general de medir track record, pero no demuestra todavía que el weighting específico de Praev supere una mediana. citeturn575296search5turn575296search6turn575296search2

## Alcance del MVP y decision memo

### Vertical elegido

**Climate & Food Supply Risk — Perú.**

No “climate intelligence” genérico.

No “agriculture analytics” completo.

No “mercado de predicciones”.

La unidad de producto es:

> **A consequential external event, forecast probabilistically, resolved from independent evidence, and connected to a real decision.**

### Público inicial

**Usuario público:** ciudadano, productor, investigador o forecaster que consulta y pronostica eventos.

**Comprador inicial a validar:** empresa agroalimentaria/agroexportadora y distribuidor/retailer alimentario.

**Beneficiarios sociales:** productores, comunidades y personas expuestas a los mismos eventos.

### P0 — debe funcionar

Una home con 3–6 eventos relevantes.

Un detalle de evento con:

- pregunta;
- probabilidad;
- por qué importa;
- impacto humano;
- impacto económico;
- decisión empresarial posible;
- fuente de resolución;
- deadline;
- participantes;
- estado on-chain.

Wallet Stellar.

Envío de forecast probabilístico.

Transacción Soroban verificable.

Una pregunta con resolución manual transparente.

Una pregunta compatible con adaptador automático determinista.

Brier simple tras resolución.

Leaderboard básico por dominio.

Página de evidencia con hash y referencia a transacción.

Contrato desplegado en testnet y enlazado a explorer, que es requisito explícito de Codember. fileciteturn0file1

### P1 — solo si P0 está cerrado

Propuestas de preguntas asistidas por IA.

Reputation-weighted consensus.

Sponsor visible de una pregunta.

Pago testnet en USDC.

Segundo país o segunda fuente.

Sistema de challenge sencillo antes de finalizar resolución.

### No construir

Nada de CLOB.

Nada de apuestas.

Nada de shares YES/NO.

Nada de token.

Nada de copy trading.

Nada de oráculo descentralizado propio.

Nada de cuatro países operativos.

Nada de modelos meteorológicos propios.

Nada de marketplace completo.

Nada de predicción interna de demanda.

Nada de integración ERP.

Nada de “AI superforecaster” entrenado.

Nada de claims de pérdidas evitadas sin evidencia.

Nada relacionado con “TIS” mientras el término no esté definido.

### Flujo de jurado en dos o tres minutos

**Pantalla 1 — problema.**

> “Las organizaciones reciben miles de señales sobre riesgos externos, pero no saben cuáles importan ni quién realmente sabe anticiparlos.”

Seleccionar evento:

> “¿La precipitación en Chulucanas superará X mm antes del 3 de diciembre?”

Mostrar:

**68% forecast · Food & Climate · Perú**

**Human impact:** cultivos / movilidad / comunidades.

**Economic exposure:** agricultura / logística.

**Commercial decision:** procurement / routing.

**Resolution source:** SENAMHI.

**Pantalla 2 — foresight.**

Conectar wallet.

Enviar:

`Mi forecast: 72%`

Stellar firma la transacción.

La UI devuelve tx + explorer.

Explicar:

> “Praev no registra una opinión después del hecho. Registra qué creías antes de conocer el resultado.”

**Pantalla 3 — resolution.**

Abrir un caso histórico claramente marcado **DEMO HISTÓRICA**.

Mostrar evidencia oficial.

Resolver.

Contrato registra `outcome + evidence_hash`.

Score se actualiza.

Leaderboard cambia.

Cerrar:

> “Con el tiempo, Praev no solo sabe qué está ocurriendo. Sabe quién ha demostrado capacidad para anticiparlo.”

Eso demuestra los cuatro componentes sin necesitar slides extensos:

**problema → utilidad → Stellar → reputación.**

### Plan del 26 de noviembre al 4 de diciembre

**26 nov:** freeze de tesis, schema, eventos y arquitectura. Validar fuente exacta de SENAMHI/WIS2.

**27 nov:** contrato Soroban + unit tests: create question, forecast, resolution.

**28 nov:** backend/indexer + database + wallet flow.

**29 nov:** Event Engine básico y creación/moderación manual.

**30 nov:** integración de una fuente oficial y evidence hashing.

**1 dic:** scoring/Brier + leaderboard + consensus simple.

**2 dic:** UX completa, datos demo, estados/error handling.

**3 dic:** testnet end-to-end, explorer links, README, arquitectura, tests.

**4 dic:** freeze funcional, video demo ≤3 min, documentación y entrega antes de 11:59 p. m. Lima. La fecha y los entregables proceden de las bases oficiales proporcionadas. fileciteturn0file1

La matriz de prioridad frente a la rúbrica queda así: Stellar debe ser visible en el core del producto, no añadido al final; funcionalidad debe demostrar un ciclo completo `question → forecast → resolve → score`; problema/impacto debe mostrarse con un evento concreto; innovación está en la reputación verificable y la conexión evento-decisión; UX debe permitir entender todo el ciclo sin conocer Soroban. Los pesos oficiales son los indicados en las bases, pero eso no implica ningún puntaje ni resultado garantizado. fileciteturn0file1

### Métricas después del hackathon

**Impacto social**

Tiempo medio de anticipación.

Número de usuarios con acceso gratuito.

Número de alertas consultadas antes del evento.

Porcentaje que declara haber modificado una decisión.

Cobertura territorial.

Daños evitados **solo cuando puedan demostrarse con contrafactual o evidencia suficiente**, nunca como estimación de marketing.

**Valor comercial**

Tiempo ahorrado por analista.

Eventos útiles / eventos enviados.

Alertas que generaron una acción.

Retención semanal/mensual.

Número de preguntas solicitadas por comprador.

Conversión de piloto a pago.

Willingness-to-pay mediante ofertas reales, no encuestas abstractas.

Reducción de expected loss únicamente cuando el cliente tenga datos suficientes para calcularla.

### Experimentos falsables de los primeros noventa días

**Hipótesis:** responsables de abastecimiento consideran útil una probabilidad explícita frente a una alerta genérica.

Falsación: menos de 30% prefiere el formato probabilístico después de usar ambos.

**Hipótesis:** conocer source + resolution rule aumenta confianza.

Falsación: usuarios no muestran diferencia significativa entre una alerta verificable y una alerta convencional.

**Hipótesis:** la reputación del forecaster cambia decisiones.

Falsación: compradores ignoran consistentemente el track record al recibir dos forecasts contradictorios.

**Hipótesis:** existe disposición real a pagar por monitoreo recurrente de eventos externos.

Falsación: después de 15–20 entrevistas cualificadas y 3 pilotos, nadie acepta ni una propuesta pagada ni una carta de intención con precio.

**Hipótesis:** una misma infraestructura sirve a impacto público y B2B.

Falsación: las preguntas empresariales requieren tanta información privada y personalización que dejan de ser reutilizables.

### Decisiones cerradas

**Praev no es un prediction market.**

**Praev no vende apuestas ni contratos sobre outcomes.**

**Praev crea y modera sus propias preguntas.**

**Praev pronostica eventos externos con consecuencias reales.**

**El impacto se modela en dos ejes: humano y económico.**

**El valor comercial es una capa de exposición/decisión, no un tercer tipo de impacto.**

**La capa pública y la comercial utilizan el mismo Event Engine.**

**El comprador paga por mayor contexto, exposición, workflow e inteligencia; no por alterar la probabilidad.**

**La resolución utiliza fuentes externas independientes fijadas antes del forecast.**

**La IA ayuda a descubrir, estructurar y analizar; nunca es la fuente final de verdad.**

**Stellar registra commitments, provenance, resolución y reputación; no “demuestra que el mundo real ocurrió”.**

**El MVP se concentra en Climate & Food Supply Risk en Perú.**

**La expansión natural es Chile → Colombia → Bolivia, pero no pertenece al MVP operativo.**

**Máximo dos fuentes externas en el MVP.**

**Un contrato Soroban pequeño, auditable y funcional es preferible a una arquitectura descentralizada incompleta.**

### Bloqueadores que todavía deben resolverse antes de escribir el resolver automático

Hay tres pendientes reales.

Primero, validar **hoy mismo** que la observación exacta seleccionada de SENAMHI/WIS2 incluye la variable, frecuencia y continuidad necesarias para la pregunta de Chulucanas; la estación está confirmada, pero no debe asumirse la disponibilidad de cada variable sin probar el endpoint. citeturn498742search3

Segundo, seleccionar el producto y serie exactos de MIDAGRI si se quiere utilizar una pregunta de precios. MIDAGRI publica información de precios y abastecimiento, pero la resolución automática exige comprobar formato, fechas y estabilidad concreta del recurso. citeturn404165search0turn404165search8

Tercero, definir si el resolver P0 será una única wallet del equipo o si vale la pena emplear autorización multisig. Para el tiempo disponible, recomiendo **una wallet de resolver + evidencia pública + hash on-chain**, dejando 2-de-3 y disputa optimista para la siguiente versión.

### Tesis final

**ES**

> **Praev es infraestructura de inteligencia anticipatoria verificable para decisiones del mundo real. Convierte acontecimientos externos con impacto humano y económico en preguntas probabilísticas, mide quién los anticipa mejor y conecta esa foresight con las personas y organizaciones que pueden actuar antes de que ocurran.**

**EN**

> **Praev is verifiable foresight infrastructure for real-world decisions. It turns consequential external events into probabilistic questions, measures who anticipates them best, and connects foresight with the people and organizations that can act before they happen.**

Y la frase que mejor preserva la ambición social sin destruir el modelo comercial sigue siendo:

> **Foresight should not be a privilege.**

El negocio no consiste en vender “el futuro”. Consiste en hacer que la capacidad de anticiparse sea **medible, auditable y accionable**.