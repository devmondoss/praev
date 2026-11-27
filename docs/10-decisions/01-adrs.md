# Decision log y reconciliación de hipótesis

**Estado:** Decisiones propuestas vigentes para P0 · **Versión:** 1.2 · **Fecha:** 2026-11-26

| ADR | Decisión | Alternativa descartada ahora | Razón |
|---|---|---|---|
| 001 | Decision intelligence verificable (precisada por 024) | marketplace generalista | tesis consecuencial |
| 002 | Impacto humano/económico; comercial exposición | 3 ejes independientes | consistencia con informe final |
| 003 | ~~Perú clima/abastecimiento~~ **Reemplazada por 028** | cuatro países/multivertical | alcance |
| 004 | Rust/Soroban Stellar | Solidity/EVM | red objetivo |
| 005 | Next monolito + PostgreSQL | microservicios y backend separado | una persona (ver 017) |
| 006 | ~~Un registro público por versión~~ **Reemplazada por 026** | commit/reveal | menos fricción; copying residual |
| 007 | Mediana y Brier | score 0–100/weighting | sin datos para validación |
| 008 | Resolver autorizado con evidencia | DAO/disputa optimista | tiempo; confianza explícita |
| 009 | Decision Register local demo | SaaS enterprise/tenant | prueba valor sin PII |
| 010 | Un agente IA estructurado (su rol lo redefine 027) | multiagente | integración verificable |
| 011 | Pago P1 (confirmada y precisada por 030) | checkout core | evitar desviar ruta crítica |
| 012 | LIVE vs DEMO estrictos | replay como skill | honestidad temporal |
| 013 | Wallet técnica, metadata declarada | identidad legal/VC | MVP mínimo |
| 014 | Score calculado off-chain | scoring on-chain agregado | gas/iteración y simplicidad |
| 015 | Curación manual | ingestión masiva automática | pregunta de calidad |
| 016 | Wallet Kit v2/Varial | API antigua Freighter | docs actuales, spike compatibilidad |
| 017 | Desarrollo a cargo de una persona (26 nov) | reparto A/B de dos personas | equipo real; ver orden de recorte en backlog |
| 018 | Versiones fijadas tras verificación del 26 nov (ver stack) | "última versión" sin fijar | reproducibilidad; SDK 30 con alternativa 28 |
| 019 | Vercel + Neon Postgres (26 nov) | Node server en hosting genérico | decisión del equipo; deploy temprano |
| 020 | `extend_ttl` en cada escritura (≥30 días) y renovación el 4 dic | TTL por defecto | evitar archivado durante la evaluación del 5–7 dic |
| 021 | LLM vía OpenRouter con API Responses y `json_schema` (26 nov) | OpenAI directo, un solo proveedor | cambiar de modelo sin reescribir código; mismo SDK `openai` |
| 022 | Nombre `praev` y definición "Anticipa lo que importa" (26 nov) | "Proof of Foresight" como tagline | la tesis pasó de reputación a decisión; Proof of Foresight queda solo como nombre técnico de la prueba on-chain |
| 023 | Fuente LIVE: GO para SENAMHI Chulucanas; política de faltantes `partial_yes_else_invalidate` (26 nov) | `invalidate` ante cualquier hora faltante | el spike mostró ≈2 % de horas faltantes sin backfill, que invalidaría ~73 % de ventanas de 72 h; como la lluvia no es negativa, una suma parcial que ya supera el umbral prueba SÍ, mientras que NO exige cobertura completa |
| 024 | **Lógica de producto: mercado de anticipación con personas reales** (26 nov). Los makers (personas, y un agente de IA como rival) publican pronósticos con fundamentos; los takers traen preguntas atadas a decisiones. praev da las herramientas, sella, resuelve con la fuente pactada y mide el historial | agregador de APIs de datos más un promedio de LLMs | una API dice qué pasó, no qué pasará; el pronóstico de una IA es una commodity. Lo escaso y defendible es el historial verificado de personas que anticipan bien y por qué. Las fuentes de datos solo resuelven y alimentan el ancla histórica |
| 025 | **Tesis estructurada** (26 nov): probabilidad, ancla, hasta 3 factores con dirección, evidencia citada y "qué me haría cambiar de opinión", sellados juntos | texto breve opcional | un párrafo libre no se compara ni se mide; la estructura permite enseñar a fundamentar, comparar makers y auditar el razonamiento sin guardar cadena de pensamiento |
| 026 | **Sellado hasta el cierre** (26 nov): on-chain solo va el compromiso `SHA256(c14n(tesis + sal de 32 bytes))`; praev guarda el contenido y lo revela al cerrar la pregunta; el maker descarga un recibo de sellado para revelarlo por su cuenta si praev fallara. Reemplaza 006 | registro público inmediato (006); commit-reveal 100 % on-chain | público inmediato permite copiar al que más acierta y destruye la independencia del consenso; commit-reveal on-chain exige una segunda firma al cierre y provoca abandonos. Con una firma, el número de compromisos es público y la ocultación de una tesis se detecta. El contrato ya no valida la probabilidad: se valida al preparar y al revelar |
| 027 | **Un agente de IA con dos funciones** (26 nov): (a) *brief de evidencia* por pregunta, generado por el operador y visible para todos los makers, sin proponer probabilidad; (b) *rival de referencia* que sella su propia tesis con su cuenta y aparece en el perfil con la etiqueta IA | varios agentes makers; asistente que sugiere la probabilidad | el centro es el juicio humano; la IA lo informa y le sirve de vara de medir ("¿le ganas a la IA?"). Sin endpoint público de LLM: menos coste y menos superficie de abuso |
| 028 | **Taxonomía abierta y dos macrocategorías en el MVP** (26 nov): Economía y finanzas (tipo de cambio diario, inflación mensual) y Clima y ambiente (lluvia SENAMHI). Categoría, subcategoría y país ISO son datos, no valores fijos. Reemplaza 003 | solo Perú y clima/abastecimiento; las 11 macros a la vez | para el 4 dic hacen falta decenas de preguntas resueltas con datos reales: el tipo de cambio diario se resuelve en 1–3 días con fuentes oficiales que respondieron en vivo; el clima demuestra que praev no es solo finanzas. Las otras 9 macros quedan como mapa ([12-categories](../04-domain/12-categories.md)) |
| 029 | **Perfil del maker al estilo de un historial de trader** (26 nov): Brier, skill frente al ancla, tasa de acierto, calibración, frente al consenso, frente a la IA y P&L de decisión hipotético | solo Brier medio | el taker necesita saber a quién creerle con métricas que entiende; todas se recalculan desde registros públicos. El P&L de decisión usa el umbral de referencia de la pregunta y se etiqueta como hipotético, nunca como ahorro real |
| 030 | **Lado taker en el MVP sin pagos** (26 nov): el taker propone una pregunta con su contexto de decisión y un umbral de referencia, firmada con su wallet; el curador la revisa y la publica; el taker registra su decisión en el Decision Register. El pago taker → makers sigue en P1, como transferencia directa repartida por reputación previa | pago en el MVP; escrow en el contrato | `AGENTS.md` prohíbe custodia: el contrato no puede retener fondos, y el pago directo con reparto exige más trabajo del que cabe con calidad antes del 4 dic. La demanda se demuestra con preguntas propuestas, no con dinero |

ADRs son decisiones de diseño del presente blueprint, no aprobación formal del equipo ni pruebas ejecutadas. Para cambiar: nuevo ADR con fecha, contexto, alternativas, consecuencias y actualización de docs dependientes. No reescribir informe original para ocultar contradicción.
