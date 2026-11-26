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

## Reglas del Stellar Build Hub (consultado el 25 nov 2026)

Fuente: textos publicados en el Hub ([stellar.mintedinpe.com/codember](https://stellar.mintedinpe.com/codember)). Las bases completas están en [/codember/bases](https://stellar.mintedinpe.com/codember/bases) y prevalecen sobre este resumen.

### Checkpoint del repositorio

- Obligatorio para poder hacer la entrega final. Crear el repo **no** equivale a registrarlo: hay que enviarlo desde el Hub.
- Formulario: URL del repo con el formato `https://github.com/equipo/proyecto` (sin rutas ni parámetros) y una descripción de 20 a 3000 caracteres.
- Si se usa código previo, se declara el hash del commit base (7–40 caracteres hex), y ese commit debe estar en el historial de la rama principal. PRAEV no parte de código previo, así que este campo va vacío.
- Completar el checkpoint emite un certificado, aunque luego no se haga la entrega en APEX.

### Puntuación de progreso en el Hub

Es independiente de la nota del jurado en APEX.

- **Constancia:** 1 punto por día con actividad del equipo, máximo 5 por semana (lunes a domingo, hora de Lima).
- Solo se cuenta la **rama principal** (`main`).
- Solo suman los commits de integrantes aprobados cuyo autor coincida con el GitHub de su inscripción. No suman los bots, los merges, los autores externos ni los commits cuyo correo no esté asociado a una cuenta de GitHub.
- **Hitos** revisados por la organización (cada uno suma una sola vez): funcionalidad (5), integración de Stellar en testnet (10), pruebas, documentación o demo (5).

### Qué significa para el equipo

- Cada integrante configura en git (`git config user.email`) un correo verificado en la misma cuenta de GitHub con la que se inscribió.
- Commitear en días distintos, no todo el último día. Lo ideal es hacer commits pequeños y con mensajes descriptivos al cerrar cada módulo.
- Integrar en `main` con rebase o squash: los commits de merge no cuentan.
- No commitear desde cuentas compartidas ni desde bots de CI.

## Compatibilidad temática y elegibilidad

Temática libre, una sola categoría. Las bases contemplan identidad, credenciales y reputación, así como stablecoins. Excluyen proyectos centrados en especulación, apuestas, rendimientos prometidos o tokens especulativos. PRAEV se presenta como inteligencia verificable y pago fijo por contenido, sin apostar sobre resultados. Esto favorece el encaje, pero la decisión de elegibilidad corresponde a organización.

Requisitos: Stellar testnet, repo GitHub público con historial durante periodo, declarar código previo/terceros/uso de IA, solo se evalúa trabajo del periodo. Proyectos premiados en hackatones previas o financiados por Instaward/SCF no son elegibles según bases; verificar que PRAEV cumple. No ocultar procedencia de código ni presentar trabajo anterior como nuevo. Cada miembro registro individual, 1–4 miembros, al menos un peruano/residente en Perú y demás condiciones de la sección 3.

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

PRAEV es una infraestructura de inteligencia predictiva verificable que ayuda a personas y organizaciones a tomar decisiones bajo incertidumbre. Personas y agentes de IA registran pronósticos sobre acontecimientos con consecuencias reales; Stellar permite sellarlos antes del resultado, verificar su historial y liquidar pagos no custodiales por análisis. PRAEV selecciona preguntas por utilidad, mide desempeño por dominio y combina pronósticos con pesos históricos, sin apuestas.

## Short description (EN)

PRAEV is verifiable predictive intelligence for real-world decisions. Humans and AI agents commit forecasts on Stellar before outcomes are known, build portable track records and produce reputation-weighted insights. Users can pay for intelligence through authorized non-custodial stablecoin transfers, without betting on outcomes.

## Pitch 3 minutos (guion base)

0:00–0:30: «Una empresa debe decidir antes de saber qué ocurrirá. El problema no es falta de opiniones, sino no saber qué preguntas importan ni qué fuentes predicen bien».

0:30–1:00: presentar PRAEV, caso climático/operativo y pregunta con fecha/fuente. Mostrar decisión y relevancia.

1:00–1:45: mostrar dos perfiles, commit y reveal confirmados de testnet, verificación, resolución y score. Usar fixtures y decirlo si son sintéticos.

1:45–2:20: consenso con muestra y corte; compra de informe con wallet, recibo y acceso; explicar que no es apuesta ni custodia directa.

2:20–2:45: evidencias Stellar, tests y arquitectura. Explicar qué es verificable y dependencia del resolvedor.

2:45–3:00: «Proof of Foresight. Verifiable Intelligence for Real-World Decisions». Próximo paso: validar valor con decisores y reputación con más resultados.

Grabar solo funcionalidad existente; indicar si operaciones se prepararon previamente para cumplir tiempos. No rellenar con pantallas de features futuras.
