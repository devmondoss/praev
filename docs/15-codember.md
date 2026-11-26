# 15 · Stellar Codember Perú 2026 — estrategia de evaluación

Fuente: bases de la buildathon proporcionadas, secciones 2, 5–8, 9 y 12. Las fechas pueden cambiar por comunicación oficial. El objetivo interno es aspirar a la máxima puntuación (100/100), no predecir la decisión del jurado.

## Rúbrica y evidencias

| Criterio oficial | Peso | Objetivo interno | Qué debe poder comprobar el jurado |
|---|---:|---:|---|
| Uso de Stellar | 25% | 25/25 | Contratos Soroban reales en testnet, firmas, eventos, identidad/credencial, pago y enlaces a explorador; justificar por qué ledger y no solo DB |
| Funcionalidad y calidad técnica | 25% | 25/25 | Clone reproducible, pruebas, contratos, indexación, errores, demo E2E, documentación y seguridad |
| Problema e impacto | 20% | 20/20 | Decisor concreto, riesgo/decisión, tiempo y consecuencias, evidencia de entrevistas si existen, métrica de impacto y limitaciones |
| Innovación | 15% | 15/15 | Relevance + comparación humano/IA + reputación probabilística + pruebas verificables + pago por información; benchmark y comparación sin claims absolutos |
| Presentación y UX | 15% | 15/15 | Video <=3 min, navegación simple, flujos sin jerga innecesaria, estados, contraste, verificación y datos claramente etiquetados |
| Total | 100% | 100/100 | Meta aspiracional; cada punto depende de implementación y evaluación |

### Checklist por criterio

- [ ] Stellar: contrato Registry, router y activo de prueba identificados; al menos un commit, reveal, resolución, snapshot y pago con pruebas reales; no usar otra red.
- [ ] Técnica: tests unitarios y de integración, instrucciones de ejecución, lockfiles, CI, manejo de fallos de RPC, replay y firma; secretos fuera de Git.
- [ ] Impacto: pregunta ligada a una acción con fecha límite y fuente; 1 caso real documentado (si hay evidencia), fixture separado; usuarios objetivo claros y método para medir valor.
- [ ] Innovación: explicar las tres métricas distintas; muestra y comparación Brier; verificador reproducible; limitaciones de oráculo e identidad; diferenciación validada cuando sea posible.
- [ ] UX: lectura pública, flujo mobile, teclado, estados y confirmación de firma; 3 min máximo; audio/subtítulos y enlaces accesibles.

## Compatibilidad temática y elegibilidad

Temática libre, una sola categoría. Las bases contemplan identidad, credenciales y reputación, así como stablecoins. Excluyen proyectos centrados en especulación, apuestas, rendimientos prometidos o tokens especulativos. Pravef se presenta como inteligencia verificable y pago fijo por contenido, sin apostar sobre resultados. Esto favorece el encaje, pero la decisión de elegibilidad corresponde a organización.

Requisitos: Stellar testnet, repo GitHub público con historial durante periodo, declarar código previo/terceros/uso de IA, solo se evalúa trabajo del periodo. Proyectos premiados en hackatones previas o financiados por Instaward/SCF no son elegibles según bases; verificar que Pravef cumple. No ocultar procedencia de código ni presentar trabajo anterior como nuevo. Cada miembro registro individual, 1–4 miembros, al menos un peruano/residente en Perú y demás condiciones de la sección 3.

## Calendario oficial (Lima)

| Hito | Fecha |
|---|---|
| Apertura | 11 nov |
| Kickoff | 14 nov, 09:00 |
| Desarrollo | 14 nov–4 dic |
| Cierre inscripción | 24 nov, 23:59 |
| Checkpoint obligatorio del repo | 25 nov, 23:59 |
| Entrega APEX | 4 dic, 23:59 |
| Demo Day | 5 dic, 09:00, Lima |
| Evaluación | 5–7 dic |
| Anuncio | 8 dic |

El checkpoint es obligatorio para entrega final; Demo Day no determina la clasificación, según las bases. El jurado evalúa repositorio, testnet y video. Premios: US$300/200/100 en XLM para 1.º/2.º/3.º, sujetos a verificación; no se garantiza financiamiento posterior.

## Entregables

- [ ] Repositorio GitHub público registrado en Hub antes de checkpoint.
- [ ] README con problema, solución, arquitectura, ejecución, IDs/direcciones testnet y explorador, integrantes, IA y código previo.
- [ ] Video demo de máximo 3 minutos (YouTube no listado, Drive o Loom con acceso abierto).
- [ ] App desplegada si aplica y URL comprobada.
- [ ] Entrega única por equipo en APEX antes de cierre; verificar recepción.
- [ ] Revisión de enlaces desde sesión no autenticada y copia de respaldo.

## Descripción para registro (ES)

Pravef es una infraestructura de inteligencia predictiva verificable que ayuda a personas y organizaciones a tomar decisiones bajo incertidumbre. Personas y agentes de IA registran pronósticos sobre acontecimientos con consecuencias reales; Stellar permite sellarlos antes del resultado, verificar su historial y liquidar pagos no custodiales por análisis. Pravef selecciona preguntas por utilidad, mide desempeño por dominio y combina pronósticos con pesos históricos, sin apuestas.

## Short description (EN)

Pravef is verifiable predictive intelligence for real-world decisions. Humans and AI agents commit forecasts on Stellar before outcomes are known, build portable track records and produce reputation-weighted insights. Users can pay for intelligence through authorized non-custodial stablecoin transfers, without betting on outcomes.

## Pitch 3 minutos (guion base)

0:00–0:30: «Una empresa debe decidir antes de saber qué ocurrirá. El problema no es falta de opiniones, sino no saber qué preguntas importan ni qué fuentes predicen bien».

0:30–1:00: presentar Pravef, caso climático/operativo y pregunta con fecha/fuente. Mostrar decisión y relevancia.

1:00–1:45: mostrar dos perfiles, commit y reveal confirmados de testnet, verificación, resolución y score. Usar fixtures y decirlo si son sintéticos.

1:45–2:20: consenso con muestra y corte; compra de informe con wallet, recibo y acceso; explicar que no es apuesta ni custodia directa.

2:20–2:45: evidencias Stellar, tests y arquitectura. Explicar qué es verificable y dependencia del resolvedor.

2:45–3:00: «Proof of Foresight. Verifiable Intelligence for Real-World Decisions». Próximo paso: validar valor con decisores y reputación con más resultados.

Grabar solo funcionalidad existente; indicar si operaciones se prepararon previamente para cumplir tiempos. No rellenar con pantallas de features futuras.
