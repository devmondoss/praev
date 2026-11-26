# Praev: dónde está el whitespace real en Decision Intelligence para riesgos externos

**Investigación a 26 de noviembre de 2026**

**Praev — Proof of Foresight.**  
*Verifiable Intelligence for Real-World Decisions.*

La conclusión principal de esta investigación cambia ligeramente la tesis inicial: **“Decision Intelligence for External Risks” es una categoría atractiva, pero por sí sola no es diferenciada**. Ya existen compañías sofisticadas que detectan señales externas, anticipan disrupciones, las conectan con activos o cadenas de suministro del cliente y sugieren qué priorizar. Crisis24 AiiA, Prewave, Everstream, Interos, Signal AI, Dataminr y Seerist cubren distintas partes de esa cadena; algunas ya utilizan explícitamente los términos *anticipatory intelligence* o *decision intelligence*. citeturn306785search0turn513935search0turn203527search0turn203527search3

Lo que sí aparece mucho menos cubierto públicamente es una combinación más precisa:

> **evento externo resoluble → probabilidad explícita y versionada → evidencia → desempeño histórico de quien/modelo que pronostica → exposición específica del cliente → umbral de decisión → decisión tomada → resolución → evaluación posterior tanto del forecast como de la decisión.**

No encontré evidencia pública de un proveedor maduro que reúna **toda** esa cadena, especialmente la evaluación continua de humanos, agentes de IA y modelos según forecasts ex ante resueltos, junto con un registro de las decisiones empresariales que esos forecasts provocaron. Eso no demuestra que nadie lo haga internamente; significa que no aparece como una propuesta comercial claramente documentada en los productos revisados.

Mi recomendación resultante sería estrechar la definición de Praev:

**Praev no debería ser otro sistema que “encuentra riesgos antes”. Debería ser la capa que convierte incertidumbre externa en decisiones cuantificadas y auditables, y demuestra con el tiempo qué fuentes de inteligencia merecen confianza.**

## El mercado ya está llegando a la tesis de Praev

La primera observación importante es que el mercado de *risk intelligence* está evolucionando exactamente desde “te muestro información” hacia “te digo qué significa para ti”.

Prewave es probablemente el mejor ejemplo. Ya no vende únicamente alertas sobre proveedores. Su propuesta de **Quantified Resilience** toma una disrupción, la cruza con BOM, inventarios, proveedores, ventas y fuentes alternativas del cliente, y calcula *revenue at risk*. La compañía explica explícitamente que sin los datos operativos puede detectar qué proveedor está expuesto, pero que necesita inventario, piezas y ventas para decir cuánto dinero está en riesgo. citeturn513935search0turn513935search1turn513935search2

Ese detalle es crucial para Praev: **“external risk only” es una buena frontera para lo que predices, pero probablemente una mala frontera para el producto que vendes**. El fenómeno puede ser externo; la decisión no lo es.

Crisis24 AiiA llega todavía más cerca de la formulación que veníamos explorando. Se presenta como una plataforma de **Anticipatory Decision Intelligence**, construida sobre Palantir Foundry, que une inteligencia externa, datos empresariales y AI para anticipar impactos, analizar escenarios y actuar antes. Conecta acontecimientos geopolíticos, económicos, regulatorios, de seguridad y de mercado con operaciones, proveedores, mercados y prioridades estratégicas del cliente. citeturn306785search0

Signal AI va en la misma dirección desde otro ángulo. Su Risk Scanner, lanzado en junio de 2026, permite importar el *risk register* propio de una empresa y contrastarlo continuamente contra señales externas; asigna scores de impacto y probabilidad y mapea señales a unidades, portfolios o cadenas de suministro. Es decir: incluso una plataforma nacida en monitorización de medios está aprendiendo que la inteligencia genérica vale poco hasta que se cruza con el contexto específico de la organización. citeturn203527search0turn203527search6

Dataminr, históricamente concentrada en detectar eventos antes que otros, añadió en septiembre de 2026 **Near-Term Predictive Intelligence**: sus agentes analizan el archivo histórico de eventos para anticipar cómo puede evolucionar una amenaza durante las siguientes horas. Además combina corroboración autónoma, contexto y predicción continua. citeturn203527search3turn203527search4

Y el mercado de forecasting puro también se está moviendo rápido. Mantic ya produce probabilidades sobre acontecimientos mundiales mediante AI y en el Metaculus Cup de verano de 2026 superó a los 676 participantes humanos; Reuters confirmó tanto el resultado como su ronda semilla de US$25 millones. citeturn513935search5turn513935news9

Eso elimina varias tesis débiles para Praev:

“Usaremos AI para hacer forecasts” ya no es diferenciación.

“Detectaremos riesgos externos” tampoco.

“Daremos alertas tempranas” tampoco.

“Conectaremos riesgos con la empresa” tampoco es suficiente.

“Mediremos forecasters” tampoco es nuevo: Good Judgment mantiene score histórico de todos sus forecasts, y Metaculus selecciona forecasters profesionales por historial de preguntas resueltas y ya posee una infraestructura explícita para benchmarking de bots de forecasting. citeturn306785search3turn306785search6turn306785search7

La oportunidad aparece **entre** esas categorías.

## Quién está más cerca y qué falta realmente

La matriz siguiente se basa exclusivamente en funcionalidades que pude verificar públicamente. **✓** significa documentado; **△** significa que existe algo cercano o parcial; **?** significa que no encontré evidencia pública suficiente, no que pueda afirmar que la funcionalidad no existe.

| Plataforma | Señales externas | Forecast probabilístico explícito | Evidencia / actualización | Resolución y scoring posterior | Reputación humano/IA | Exposición específica empresa | Impacto económico | Escenarios / acción | API / integración | Verificación criptográfica |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| **Prewave** | ✓ | △ | ✓ | ? | ? | ✓ | ✓ | ✓ | ✓ | ? |
| **Everstream** | ✓ | △ | ✓ | ? | ? | ✓ | △ | ✓ | ✓ | ? |
| **Interos** | ✓ | △ | ✓ | ? | ? | ✓ | △ | ✓ | ✓ | ? |
| **Crisis24 AiiA** | ✓ | △ | ✓ | ? | ? | ✓ | △ | ✓ | ✓ | ? |
| **Signal AI** | ✓ | △ | ✓ | ? | ? | ✓ | △ | ✓ | ✓ | ? |
| **Dataminr** | ✓ | △ | ✓ | ? | ? | ✓ | ? | △ | ✓ | ? |
| **NERAI** | ✓ | **✓** | ✓ | **✓ / backtesting** | ? | △ | ? | ✓ | **✓** | ? |
| **Mantic** | △ | **✓** | ✓ | **✓** | △ | ? | ? | △ | ? | ? |
| **Good Judgment** | △ | **✓** | **✓** | **✓** | **✓ humanos** | △ | ? | ✓ | △ | ? |
| **Metaculus** | △ | **✓** | **✓** | **✓** | **✓ humanos/bots** | ? | ? | △ | **✓** | ? |

Prewave está especialmente avanzado en convertir exposición en dinero: calcula riesgo sobre piezas, stock y ventas del cliente, y ya organiza la respuesta según *revenue at risk*. Su propio material distingue explícitamente entre una señal de “probable impacto” y una probabilidad estadística; su *impact likelihood* es un ranking relativo, no una probabilidad de evento. citeturn513935search0turn513935search1

Everstream combina AI, NLP, modelos predictivos y especialistas para mapear redes multicapas y detectar exposición a disrupciones; ofrece integración con sistemas empresariales y análisis de múltiples tipos de riesgo. Su material comercial enfatiza anticipación, scoring y mitigación más que mercados probabilísticos resueltos con scoring público. citeturn787168search0turn787168search7

Interos utiliza un knowledge graph para mapear y monitorizar redes extendidas y múltiples dominios de riesgo —incluyendo geopolítico, financiero, restricciones y catástrofes— con el objetivo explícito de anticipar problemas en cadenas de suministro. citeturn787168search6turn787168search15

Crisis24 AiiA probablemente invalida cualquier claim de que Praev sería el primero en hacer “decision intelligence para riesgos externos”. Ese producto conecta señales globales con contexto empresarial, evalúa escenarios y produce recomendaciones para ejecutivos. La diferencia potencial está en **cómo se mide la calidad de las predicciones y cómo se demuestra retrospectivamente quién merece confianza**, no en la frase *decision intelligence*. citeturn306785search0

Hay además un competidor menos conocido que considero especialmente importante estudiar: **NERAI**. Su producto ya expone probabilidades calibradas de disrupción por país y producto, forecasts a distintos horizontes, histórico completo de probabilidades, backtesting fuera de muestra, escenarios geopolíticos y un MCP/API para que agentes de AI consulten esas predicciones. Incluso `get_forecast_desk` devuelve preguntas binarias con probabilidad y horizonte sobre sanciones, chokepoints, cadenas de suministro y conflictos. citeturn306785search1turn306785search2

Eso significa que una API que devuelva simplemente:

`evento + probabilidad + fecha + fuentes`

**tampoco basta como moat.**

Donde la matriz queda sorprendentemente vacía es en cuatro columnas combinadas:

**forecast verificable → resolución → reputación longitudinal del predictor → decisión empresarial registrada.**

Good Judgment sí conserva un track record explícito. A agosto de 2026 reportaba cientos de preguntas resueltas y publica post-mortems; sus clientes reciben probabilidades agregadas, racionales y evolución temporal del forecast. citeturn306785search3turn306785search4

Metaculus también evalúa humanos y bots mediante scoring rules y ofrece infraestructura específica para benchmark de agentes; FutureEval puede construir pipelines personalizados de creación de preguntas, scoring y resolución. citeturn306785search5turn306785search7turn306785search8

Sin embargo, ninguno de esos dos está diseñado principalmente alrededor de **“esta empresa tiene estas cinco plantas, esta ruta logística, este inventario y esta decisión que debe tomar el jueves”**.

Ahí aparece la intersección interesante.

Una forma útil de visualizar el mercado es:

| | **Poca conexión con decisión específica** | **Alta conexión con decisión específica** |
|---|---|---|
| **Forecast probabilístico riguroso** | Mantic, Good Judgment, Metaculus | **Whitespace potencial de Praev**; NERAI se acerca |
| **Monitoring / scoring de riesgo** | Dataminr, Seerist, inteligencia convencional | Prewave, Everstream, Interos, AiiA, Signal AI |

Praev tendría que vivir **arriba a la derecha**, no competir en los otros tres cuadrantes.

## La cadena de valor que todavía está rota

La industria suele describirse como una cadena lineal:

**data → signal → alert → analysis → decision.**

Pero para construir una empresa realmente defensible hace falta extenderla:

**signal → forecast → evidence → exposure → impact → action threshold → decision → outcome → score → learning.**

Las compañías actuales son muy buenas en unas partes y mucho menos transparentes en otras.

La primera capa, **señales**, ya está extremadamente competida. Dataminr afirma procesar más de un millón de fuentes públicas en 150 idiomas; Signal AI trabaja sobre enormes volúmenes de información externa; Prewave monitoriza múltiples categorías de riesgo global. Competir simplemente por “leer más noticias con LLMs” sería una mala posición para una startup pequeña. citeturn203527search3turn203527search5turn513935search7

La segunda capa, **predicción**, está entrando rápidamente en una fase de commoditización. Mantic demuestra que AI especializada ya puede competir con humanos de élite; Metaculus mantiene infraestructura de benchmarking de bots; NERAI ya ofrece probabilidades geopolíticas por API. citeturn513935search6turn306785search7turn306785search2

La tercera capa, **exposición**, exige datos del cliente. Éste probablemente será uno de los descubrimientos comerciales más importantes para Praev. Saber que existe un 60% de probabilidad de cierre de un puerto tiene valor informativo; saber que **el 38% del inventario que necesitas para entregar pedidos la próxima semana atraviesa ese puerto** tiene valor decisional. Prewave documenta precisamente esta diferencia: sin ERP puede señalar exposición, pero necesita piezas, stock y ventas para traducirla a impacto económico. citeturn513935search0turn513935search1

Por eso no aconsejaría definir Praev como una plataforma “solo de datos externos”. Definiría así su frontera:

**Praev predice incertidumbre externa.  
Praev contextualiza esa incertidumbre con exposición interna mínima.**

No necesita convertirse en ERP ni almacenar toda la empresa. Puede recibir únicamente el contexto necesario: ubicaciones, rutas, proveedores, productos, fechas críticas, dependencias y tolerancia al riesgo.

La cuarta capa es **impacto económico**. Aquí Prewave está mucho más avanzada que la mayoría: su sistema convierte disrupciones en *revenue at risk* y permite comparar el coste de mitigación contra el valor protegido. Esto demuestra que la dirección es valiosa, pero también que “quantify risk” ya es una batalla competitiva. citeturn513935search0turn513935search2

La quinta capa es donde veo mayor espacio: **accountability**.

Una plataforma puede decir hoy “riesgo alto”, mañana “riesgo moderado” y dentro de seis meses nadie sabe si realmente era buena anticipando ese tipo de evento. Un AI agent puede generar una explicación magnífica y aun así estar mal calibrado. Un analista humano puede recordar únicamente sus aciertos. Un mercado puede ser preciso en política pero mediocre en eventos poco líquidos.

Praev podría tratar cada fuente de inteligencia como un forecaster evaluable.

No bastaría con preguntar “¿qué dice GPT-6?” o “¿qué dice el mercado?”. El sistema podría responder:

**Este agente tiene Brier 0.14 en 183 forecasts regulatorios a horizonte de 30–90 días. Este humano tiene 0.18 en 61. Este mercado tiene 0.12 en 43 comparables. Este modelo climático tiene otra metodología y no debe compararse directamente sin normalización.**

Good Judgment demuestra el valor de mantener un historial de forecast y hacer post-mortems; Metaculus demuestra que humanos y bots pueden evaluarse con proper scoring rules. citeturn306785search3turn306785search7

La sexta capa sería todavía más potente: **decision accountability**.

El sistema registra qué información tenía la empresa, qué probabilidad observó, qué decisión tomó, cuánto costó y qué ocurrió después.

Esto no permite afirmar causalmente “Praev ahorró US$400.000”. El resultado de una decisión está contaminado por ejecución interna, suerte, intervenciones y acontecimientos concurrentes. Pero sí permite crear algo que hoy aparece poco visible en los proveedores revisados: **un historial auditable de cómo una organización toma decisiones bajo incertidumbre**.

Eso puede acabar siendo más defensible que cualquier LLM.

## El feature stack que haría a Praev diferente

La cuestión no es acumular veinte features. Es construir un objeto central nuevo.

Lo llamaría provisionalmente **Decision Forecast**.

Una unidad de Praev no sería un artículo, una alerta ni un “market”. Sería algo como:

```text
DECISION FORECAST

Pregunta
¿El puerto X estará cerrado ≥24 h antes del 18 de enero?

Resolución
Autoridad Portuaria / fuente oficial
Fecha límite
18 Ene · 23:59

Probabilidad actual
64%
Δ 7 días
+18 pp

Forecast sources
Agent A      71%   reliability 0.86
Agent B      58%   reliability 0.74
Human pool   62%   reliability 0.82
Base rate    29%
Market       N/A

Evidence
12 supporting signals
4 contradicting signals
2 high-quality primary sources

Your exposure
3 shipments
$182k merchandise
4.2 days buffer

Decision threshold
Rerouting becomes economically preferable at 57%

STATUS
Threshold crossed

Decision
Reroute shipment #143
Recorded 12 Jan · 14:32

Resolution
Pending
```

El valor diferencial no está en ninguna fila aislada. Está en unirlas.

La evaluación crítica de features quedaría así:

| Feature | Problema que resuelve | Cómo funcionaría | Competencia existente | Papel para Praev |
|---|---|---|---|---|
| **Decision-first question builder** | Empresas monitorizan “temas”, no decisiones | AI convierte decisión + plazo + criterio en pregunta objetivamente resoluble | Good Judgment hace framing personalizado; AiiA trabaja con escenarios. citeturn306785search4turn306785search0 | **Core / MVP** |
| **Probabilistic Risk Radar** | “Alto/medio/bajo” no permite decidir racionalmente | Probabilidades versionadas, horizonte y cambio temporal | Mantic, NERAI, Good Judgment ya hacen forecast probabilístico. citeturn513935search6turn306785search1turn306785search4 | Necesario, pero **commodity** |
| **Evidence graph** | Una probabilidad sin trazabilidad genera poca confianza | Fuentes primarias, contradicciones, base rates y cambios que movieron p | Dataminr hace corroboración/contexto; Good Judgment incluye racionales. citeturn203527search3turn306785search4 | **Core** |
| **Exposure graph** | Un riesgo mundial puede no importar a una empresa concreta | Conecta ubicaciones, proveedores, rutas, contratos y fechas | Prewave, Everstream e Interos son fuertes aquí. citeturn513935search0turn787168search0turn787168search6 | **Core B2B**, no diferenciador |
| **Economic action threshold** | Una probabilidad no dice cuándo actuar | Coste esperado, rango de pérdida y coste de mitigación según inputs del usuario | Prewave ya cuantifica revenue at risk; AiiA usa escenarios. citeturn513935search2turn306785search0 | **Diferenciador si se une a calibración** |
| **Forecast vintages** | Cambiar silenciosamente un forecast destruye accountability | Conserva cada estado p(t), evidencia y modelo utilizado | Forecasting platforms conservan series; no es exclusivo | **Core** |
| **Resolver** | Sin outcome no existe aprendizaje | Reglas explícitas + fuente de ground truth + AI asistiendo resolución + revisión humana | Metaculus y plataformas de forecasting ya resuelven preguntas. citeturn306785search5turn306785search7 | **Core** |
| **Calibration ledger** | Nadie sabe qué AI/analista funciona en qué dominio | Brier/log score, reliability curves por dominio/horizonte | Good Judgment, Metaculus, Mantic lo demuestran en forecasting. citeturn306785search3turn306785search7turn513935search6 | **Diferenciador empresarial** |
| **Human–AI–market ensemble** | Ninguna fuente domina siempre | Ponderación dinámica por performance histórico y error correlacionado | Hay investigación y forecasting híbrido; Good Judgment compara contra híbridos. citeturn306785search3 | **Diferenciador**, después del MVP |
| **Decision Register** | Se pierde el vínculo forecast → acción | Registra decisión, forecast disponible, threshold y rationale | No encontré equivalente público fuerte en los productos revisados | **Diferenciador principal** |
| **Outcome Review** | Empresas no aprenden sistemáticamente de decisiones pasadas | Compara forecast, resultado, decisión y resultado operacional sin atribuir causalidad automáticamente | No encontré evidencia pública de un loop completo comparable | **Moat potencial** |
| **Conditional scenario tree** | Los riesgos se propagan | P(A), P(B\|A), dependencias y segundo orden | AiiA y NERAI ya trabajan escenarios; NERAI incluso publica redes de señales. citeturn306785search0turn306785search1 | **Expansión** |
| **Risk Probability API / MCP** | AI agents necesitan datos estructurados | JSON con p, horizon, provenance, calibration, exposure | NERAI y Metaculus ya ofrecen interfaces; Signal AI también se integra con agentes. citeturn306785search2turn306785search5turn203527search8 | Distribución, **no moat** |
| **Agent Certification** | Empresas no saben qué risk-agent confiar | Benchmark continuo sobre preguntas reales resueltas | FutureEval hace evaluación genérica de bots. citeturn306785search7turn306785search8 | **Gran adyacencia** |
| **Cryptographic proof** | Historial controlado por una sola empresa puede manipularse | Hash/time-stamp de forecast, resolución y score | No encontré que competidores principales lo destaquen | Útil sólo si la portabilidad importa |

Hay tres features que parecen particularmente poderosas juntas.

**Calibration-as-a-Service.** Praev podría evaluar no sólo su propia AI, sino cualquier agente externo. Una empresa podría conectar seis agentes y preguntar: *¿cuál ha sido realmente mejor anticipando regulación financiera en LatAm a 90 días?* Metaculus ya demuestra que existe demanda por infraestructura de evaluación de forecasting bots, pero su foco es general; una capa especializada en agentes empresariales de riesgo sería una posición más estrecha. citeturn306785search7turn306785search8

**Decision Register.** Cada forecast que cruza un threshold puede generar una decisión documentada. Con el tiempo, el producto aprende no sólo “quién predice”, sino **cómo una organización utiliza probabilidades**. Eso genera datos propios imposibles de comprar en Reuters o replicar simplemente con otro LLM.

**Value of Information.** En vez de decir únicamente “hay 42% de riesgo”, Praev podría calcular si obtener información adicional tiene sentido antes de decidir. Ejemplo simplificado: si una decisión es idéntica tanto con p=40% como con p=60%, gastar dinero intentando afinar el forecast probablemente aporta poco. Si el threshold está en 51%, reducir incertidumbre tiene mucho más valor. Esto requiere modelar pérdidas y preferencias del cliente; no debe confundirse con causal inference ni presentarse como una recomendación financiera automática.

Hay también varias cosas que **no construiría**: otro feed de noticias geopolíticas, un chatbot genérico de riesgo, un “risk score” sin definición matemática, cobertura de cien categorías desde el primer día, ni un motor que prometa causalidad a partir de correlaciones. Esas áreas están saturadas o son fáciles de copiar.

## Tres Praev posibles, y cuál tiene mejores probabilidades

Hay al menos tres empresas distintas escondidas dentro de la idea actual.

### Praev como External Risk Decision OS

Ésta sería la versión más vendible inicialmente.

El comprador sería alguien de operaciones, procurement, risk, logística o estrategia. Praev comenzaría en un dominio estrecho y convertiría riesgos externos en Decision Forecasts vinculados a exposición, impacto y thresholds.

La competencia sería fuerte: Prewave, Everstream y AiiA ya tienen productos muy completos. citeturn513935search0turn787168search0turn306785search0

La forma de entrar no sería decir “hacemos supply-chain risk mejor que Prewave”, sino:

**“Prewave sabe qué supplier está expuesto. Praev te dice qué probabilidad tiene el evento, quién merece confianza en esa probabilidad, qué decisión cruza tu threshold y después demuestra si esa inteligencia fue buena.”**

El moat eventual sería el dataset:

`forecast → evidence → exposure → decision → resolution → outcome`.

Eso no existe el día uno. Se construye lentamente.

### Praev como Verified Forecast Infrastructure

Aquí Praev deja de ser principalmente una interfaz para gestores de riesgo y se convierte en una infraestructura para aplicaciones.

Su unidad fundamental sería algo parecido a:

```json
{
  "question": "...",
  "resolution_rule": "...",
  "horizon": "...",
  "probability": 0.64,
  "epistemic_uncertainty": "...",
  "sources": [],
  "forecasters": [],
  "calibration": {},
  "forecast_vintage": "...",
  "resolver": "...",
  "status": "open"
}
```

Los clientes serían AI agents, risk platforms, fintechs, consultoras o software vertical.

Esta arquitectura escala mejor, pero su *cold start* es mucho peor. NERAI ya ofrece un MCP con forecasts probabilísticos, Metaculus posee API y benchmarking, y Mantic está construyendo forecasting AI de alto rendimiento. citeturn306785search2turn306785search5turn513935search6

Una API sin un corpus diferencial de forecasts resueltos sería fácil de sustituir.

### Praev como Trust Layer for Decision Agents

Ésta es la alternativa que encuentro intelectualmente más distintiva.

No vende principalmente “pronósticos”. Vende **evidencia de qué sistemas de pronóstico son confiables**.

Imagina una empresa con:

Claude Risk Agent  
GPT-based macro agent  
modelo interno  
consultora humana  
Polymarket  
Good Judgment  
modelo climático oficial.

Praev los observa bajo reglas homogéneas cuando sea metodológicamente apropiado, conserva cada forecast ex ante y produce:

**Who should I trust, for this domain, at this horizon?**

Metaculus FutureEval ya ha identificado el problema general de evaluar forecasting bots y ofrece pipelines personalizados de creación, resolución y scoring. citeturn306785search7turn306785search8

Pero la oportunidad empresarial sería llevar ese principio al riesgo operacional:

**model governance for future-facing decisions.**

El problema es comercial: todavía no sabemos si existe un presupuesto claramente asignado a “forecast-agent reliability”. Puede convertirse en una categoría importante a medida que las empresas deleguen más research y decisión a agentes, o puede ser percibido simplemente como una feature de model evaluation.

Por eso no empezaría vendiéndolo aislado.

La arquitectura que escogería es una combinación asimétrica:

**Producto visible:** External Risk Decision OS muy vertical.  
**Kernel interno:** Verified Forecast + Calibration Engine.  
**Moat futuro:** Trust Layer for humans, AI agents and models.

En otras palabras, primero resolvemos una decisión que alguien ya tiene. Mientras lo hacemos, acumulamos el dataset necesario para construir la infraestructura más ambiciosa.

Mi ranking estratégico, deliberadamente subjetivo y basado en diferenciación, posibilidad de distribución, coste de datos, cold start y capacidad de ejecución de una startup pequeña, es:

| Oportunidad | Atractivo | Motivo |
|---|---:|---|
| **Decision-linked external risk en un vertical LatAm** | **4.4 / 5** | Problema concreto, puede empezar con datos abiertos y genera dataset propio |
| **Trust/calibration layer para AI risk agents** | **4.1 / 5** | Whitespace mayor y fuerte tendencia AI, pero comprador aún incierto |
| **Verified Risk Probability API** | **3.7 / 5** | Escalable, pero NERAI/Metaculus/Mantic hacen partes significativas |
| **Plataforma genérica de external risk** | **2.7 / 5** | Demasiado cerca de incumbentes mejor financiados |
| **Protocolo blockchain de reputación como producto principal** | **2.3 / 5** | Interesante técnicamente, pero no resuelve por sí mismo el dolor del comprador |

## Workflows donde la idea deja de ser abstracta

Perú y LatAm son un buen laboratorio precisamente porque existen riesgos externos con fuentes oficiales de resolución y consecuencias empresariales muy tangibles.

### Agro y El Niño

La fuente oficial ENFEN publica escenarios y probabilidades relacionadas con El Niño Costero, mientras SENAMHI publica perspectivas probabilísticas mensuales y estacionales de precipitación y temperatura para sectores como agricultura, agua y gestión de riesgos. citeturn780978search0turn780978search7turn780978search8

Un Decision Forecast podría ser:

**Pregunta:** “¿La precipitación acumulada en la zona X estará en el tercil superior durante diciembre–febrero según SENAMHI?”

**Ground truth:** reporte oficial SENAMHI.

**Inputs externos:** ENFEN, SENAMHI, océano, meteorología, forecasts AI/humanos.

**Contexto interno:** cultivo, hectáreas, fase fenológica, agua disponible, contratos de entrega.

**Output Praev:** probabilidad + tendencia + evidencia + exposición.

**Threshold:** definido por el agricultor/empresa según coste de modificar fecha de siembra frente a pérdida potencial.

**Resultado medible:** forecast accuracy, anticipación conseguida, decisión tomada y eventual resultado productivo.

Praev no tendría que competir con SENAMHI prediciendo mejor el tiempo. Puede agregar, evaluar y traducir múltiples señales al **riesgo de una decisión concreta**.

### Pesca y anchoveta

PRODUCE e IMARPE generan resoluciones y datos oficiales sobre temporadas, cuotas y cierres de pesca; en 2026, por ejemplo, las decisiones de temporada y suspensiones continuaron siendo publicadas oficialmente. citeturn482133search1turn482133search11

Pregunta:

**“¿PRODUCE suspenderá la pesca industrial de anchoveta en la zona norte-centro durante siete días consecutivos antes de [fecha]?”**

Ground truth: resolución oficial.

Inputs: biomasa, condiciones oceanográficas, comunicados de IMARPE, ENFEN, históricos de suspensiones.

Exposición interna: embarcaciones, capacidad de planta, contratos, inventario y ventanas logísticas.

Acciones posibles —no recomendaciones automáticas— podrían incluir reprogramar operaciones, mantenimiento o contratación de capacidad.

Este workflow me gusta mucho para Praev porque la pregunta es resoluble, el evento es externo, la empresa puede modelar exposición económica y Perú ofrece una ventaja de conocimiento/localización.

### Logística portuaria

APN y DICAPI ofrecen información oficial relativa al estado operativo de puertos y cierres relacionados con condiciones marítimas. citeturn225704search3turn225704search5

Pregunta:

**“¿El puerto de Callao permanecerá cerrado por oleaje durante al menos 12 horas dentro de los próximos 10 días?”**

Ground truth: DICAPI/APN.

Datos externos: oleaje, meteorología, avisos oficiales, históricos.

Datos privados mínimos: ruta, ETA, mercancía, plazo contractual y coste estimado de rerouting.

Praev podría mostrar:

`p(cierre)=37% → 61%`

y luego:

`threshold operativo del cliente = 55%`

En ese momento no dice necesariamente “desvía el barco”; dice:

**“Se cruzó el threshold que tu propia política define para evaluar una alternativa.”**

Esa separación es muy importante tanto para la confianza como para evitar fingir que una correlación equivale a una recomendación causal.

### Riesgo regulatorio

En 2026 siguieron publicándose normas relevantes para fintech y pagos en Perú, incluidas nuevas disposiciones de la SBS y del BCRP. citeturn482133search13turn482133search20

Una empresa podría preguntar:

**“¿La norma X entrará en vigor con el requisito Y antes del 30 de junio?”**

Ground truth: publicación oficial y texto final.

Inputs: proyectos normativos, comentarios públicos, agenda regulatoria, precedentes, pronosticadores especializados y AI.

Exposición: producto afectado, ingresos, roadmap técnico, tiempo de cumplimiento.

Aquí el gran valor no está en “predecir política”. Está en poder decidir **cuándo empezar una migración costosa**.

Estos cuatro ejemplos comparten una propiedad importante: hay una acción con fecha, un evento resoluble y una fuente de verdad. Ése debería ser el filtro de entrada de Praev.

No “¿es interesante saber esto?”

Sino:

**“¿Quién cambia qué decisión si esta probabilidad cambia?”**

## Qué construiría, qué validaría y qué podría matar la tesis

El MVP convincente no requiere construir un Dataminr latinoamericano. Requiere demostrar el loop completo.

La primera versión tendría una sola vertical, quizá logística/operaciones o agro-pesca, entre 20 y 50 preguntas con resolución inequívoca, dos o tres forecasters AI diferentes, un baseline simple, registro de evidencia, historial completo de probabilidades, resolución automática/semi-automática, Brier Score, carga manual de exposición por CSV y un Decision Register.

Una pantalla principal debería parecerse más a esto que a un prediction market:

```text
PRAEV / RISK RADAR

3 decisions need attention

──────────────────────────────────────────
PORT CLOSURE · CALLAO · 10-DAY HORIZON

61%        ↑ 18 pp this week
Forecast reliability: HIGH
Resolution source: DICAPI

Why probability changed
+ abnormal swell forecast
+ 2 correlated official warnings
– wind forecast improved

YOUR EXPOSURE
3 shipments · $182K merchandise
4.2 days average buffer

YOUR ACTION THRESHOLD
55%
▲ CROSSED 6h ago

[Review evidence]   [Record decision]
──────────────────────────────────────────

FORECAST SOURCES

Praev Ensemble       61%   Brier 0.142
Agent A              68%   Brier 0.136
Agent B              52%   Brier 0.181
Human forecasters    59%   Brier 0.151

Scores shown only where sample size is sufficient.
```

Eso comunica una filosofía completamente distinta a Polymarket: **la probabilidad no es el producto final; la decisión es el producto final.**

Durante los primeros 90 días buscaría probar cinco hipótesis falsables, no acumular features.

| Hipótesis | Experimento | Señal positiva provisional | Qué significaría fallar |
|---|---|---|---|
| Hay decisiones recurrentes suficientemente valiosas | 15–20 entrevistas con responsables reales de operaciones/risk/procurement | ≥5 describen la misma clase de decisión, con plazo y pérdida cuantificable | El problema es interesante pero no recurrente |
| Una probabilidad añade más valor que una alerta | Comparar “alerta de riesgo” vs “forecast + threshold” en shadow mode | Usuarios cambian prioridad/acción con el segundo formato | Risk scores convencionales son suficientes |
| El forecast tiene skill real | Pre-registrar ≥100 preguntas y comparar contra base rate / baseline público | Mejora consistente de proper score fuera de muestra | AI storytelling ≠ forecasting |
| El cliente paga por el workflow | Tres pilotos pagados | Hipótesis inicial: US$500–2.000/mes por workflow limitado | Si todos quieren usarlo gratis, puede ser *nice-to-have* |
| El Decision Register genera valor | Registrar decisiones durante 6–8 semanas | Equipos revisan decisiones anteriores y cambian thresholds/procesos | La auditoría es demasiado tediosa o no importa |

Esos precios son **hipótesis de experimentación**, no benchmarks de mercado. La mayoría de las plataformas empresariales revisadas no publica pricing comparable. Una excepción es NERAI, que muestra públicamente una licencia anual de €4.900 para parte de su plataforma, además de ofertas API/enterprise bajo consulta. citeturn306785search1

A doce meses, si el loop funciona, agregaría una segunda y tercera vertical, conectores internos, un ensemble humano–AI–modelos, API/MCP, benchmarks de agentes, reliability reports, privacidad empresarial y automatización del resolver.

Sólo entonces intentaría convertir la reputación predictiva en una infraestructura externa.

### Dónde encaja Stellar

Stellar puede aportar algo real, pero **no debería ser la razón por la que un cliente compra Praev**.

Soroban permite contratos con estado persistente y eventos verificables, y las transacciones pueden ser firmadas por usuarios; Stellar además proporciona primitives de activos, cuentas y pagos. citeturn726462search0turn726462search1turn726462search2turn726462search3

Eso permite una arquitectura útil:

```text
Off-chain
research
AI inference
private exposure
scenario simulation
economic impact

          ↓ hash / commitment

Stellar
forecast timestamp
forecaster identity
model/version hash
resolution hash
score attestation
portable credential
optional USDC settlement
```

La blockchain tiene sentido si Praev llega a ser una **red neutral** en la que diferentes forecasters, agentes, compradores y plataformas necesitan demostrar que un forecast existía antes del resultado y transportar reputación entre organizaciones.

Si Praev termina siendo únicamente un SaaS cerrado usado por un departamento dentro de una empresa, una base de datos append-only, firmas digitales y controles de auditoría serían bastante más sencillos. Usar Stellar en ese caso sería infraestructura añadida sin resolver una necesidad del usuario. Ésta es una decisión de arquitectura, no una cuestión ideológica.

El uso particularmente interesante de Stellar no es almacenar PDFs ni poner toda la inteligencia on-chain. Es crear un **proof of foresight**:

```text
Forecast F
hash(F) → Stellar at t0

event happens at t1

Resolver R
hash(outcome) → Stellar at t2

Score(F, outcome)
attestation → Stellar

Praev ID
domain: maritime-risk
n: 184
Brier: 0.137
period: Jan–Nov 2027
```

Ahí el nombre **Proof of Foresight** deja de ser sólo branding y se convierte en una primitive técnica.

### La tesis que conservaría

Después de revisar el mercado, no utilizaría esta formulación:

> “Praev uses AI to predict external risks for companies.”

Es correcta pero fácil de confundir con AiiA, Prewave, Dataminr, Signal AI o decenas de productos que inevitablemente incorporarán más AI. citeturn306785search0turn513935search0turn203527search3turn203527search0

Tampoco:

> “Praev is a prediction market for real-world risk.”

Eso desplaza el producto hacia especulación, liquidez y trading, que no son la tesis.

La formulación que mejor sobrevivió la investigación es:

# **Praev turns external uncertainty into auditable decisions.**

**Proof of Foresight.**  
**Verifiable Intelligence for Real-World Decisions.**

Y el producto podría explicarse con una sola cadena:

**Predict → Prove → Contextualize → Decide → Resolve → Learn.**

El mayor whitespace no parece ser **predecir el futuro**. La competencia ya está consiguiendo hacerlo cada vez mejor. Mantic, NERAI, Good Judgment y Metaculus son evidencia clara de ello. citeturn513935search6turn306785search1turn306785search3turn306785search7

Tampoco parece ser **detectar riesgos**. Dataminr, Signal AI, Prewave, Interos y Everstream ya son muy fuertes en eso. citeturn203527search3turn203527search0turn513935search0turn787168search6turn787168search0

El espacio interesante es construir **la contabilidad de la incertidumbre**:

quién dijo qué,  
con qué probabilidad,  
basándose en qué evidencia,  
cuánto sabía realmente ese predictor históricamente,  
qué estaba expuesto,  
qué decisión justificaba esa probabilidad,  
qué decisión se tomó,  
qué ocurrió finalmente,  
y qué aprendemos para la próxima vez.

Si Praev consigue capturar sistemáticamente esa secuencia, el activo difícil de copiar deja de ser el modelo de AI o el dashboard.

Pasa a ser el historial longitudinal de **predicciones, decisiones y resultados**.

Eso sí podría convertirse, con el tiempo, en el verdadero **Proof of Foresight**.