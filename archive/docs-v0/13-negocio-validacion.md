# 13 · Negocio, experimentos y validación

## Propuesta de valor por usuario

Decisores: menos tiempo buscando opiniones y mayor trazabilidad de la información previa a actuar. Pronosticadores: un historial verificable independiente de likes o dinero arriesgado, y la oportunidad de cobrar por análisis. Agentes: benchmark comparable y reputación portable. Desarrolladores: acceso a preguntas, pruebas y métricas mediante interfaces estables.

## Beachhead propuesto

Empezar por responsables de operaciones expuestos a riesgos climáticos/económicos en Perú, sin limitar la arquitectura a ese dominio. Elegir uno de agricultura, logística o seguros después de entrevistas; no intentar vender a todos a la vez. Empresas financieras y equipos de IA son segmentos posteriores a validar. Las categorías internas permiten medir especialidad; la adquisición se centra en decisiones concretas.

## Monetización (hipótesis)

| Modelo | Qué paga el cliente | Cuándo explorar |
|---|---|---|
| Informe individual | Precio fijo por acceso a análisis | MVP / experimento |
| Pregunta patrocinada | Formular una pregunta y recibir síntesis | Después de validar demanda; compensación fija, no dependiente del resultado |
| Suscripción B2B | Monitor de preguntas, alertas y export | Tras recurrencia demostrada |
| API/SDK comercial | Consultas, verificación o integración | Tras estabilidad y uso externo |
| Credenciales | Emisión o verificación según servicio | Tras aceptación por terceros |

Una comisión por transacción es posible, pero no está fijada. No vender datos personales, garantizar ganancias o cobrar por una posición de mercado. Medir costos de red, almacenamiento, inferencia, soporte y resolución. Diferenciar volumen procesado de ingresos propios. No incluir cifras de mercado o tracción sin evidencia específica de PRAEV.

## Experimentos

| Hipótesis | Método | Evidencia de éxito propuesta |
|---|---|---|
| Relevancia | Entrevistas sobre una decisión concreta y priorización de preguntas | 3 de 5 decisores identifican acción y fecha útil |
| Reputación | Comparación de perfiles con y sin historial | Usuarios distinguen muestra y calibración; recalculabilidad |
| Inteligencia | Backtest temporal, mismo conjunto de preguntas | Comparar Brier ponderado, simple y baseline sin leakage |
| Monetización | Checkout de prueba y entrevista de precio | Intención documentada; pago testnet demuestra flujo, no demanda real |
| Stellar | Verificar pruebas y liquidación con un tercero | Auditor reproduce una predicción y un recibo sin confiar en la UI |
| Experiencia | Prueba moderada de cinco usuarios | Al menos cuatro comprenden la tarjeta y completan tarea principal |

Registrar fecha, muestra, método, criterios antes del ensayo, resultado, limitaciones y siguiente decisión. No seleccionar solo resultados favorables. Una prueba sintética valida funcionalidad, no poder predictivo ni impacto económico.

## Indicadores

North star candidata: decisiones documentadas para las que se consultó una pregunta útil antes del plazo de actuación. Complementarias: preguntas admitidas, cobertura de respuestas, reveals válidos, preguntas resueltas, Brier por dominio, tasa de calibración/insuficiencia, usuarios recurrentes, conversiones a informes, latencia de acceso, pagos confirmados, incidencias y costos. Para la buildathon priorizar evidencia de funcionamiento y comprensión frente a métricas de crecimiento sin historia.

## Incertidumbres abiertas

Demanda y voluntad de pago por dominio; acceso y resolución de datos; dificultad de preguntas; sesgo de selección; sinergia real humano/IA; costos de resolución; seguridad y regulación de pagos; aceptación de credenciales. Mantener un registro de hipótesis refutadas. No afirmar unicidad, TAM, ingresos ni alianzas no verificados.
