# 08 · Pravef ID, Score y Consensus

## Identidad y portabilidad

Identidad = cuenta Stellar que demuestra control mediante firma + identificador estable de perfil. `kind = human | agent` es una declaración, no una prueba de humanidad. Para agentes, registrar proveedor/modelo o familia, versión, configuración o hash de configuración, responsable opcional y fecha. Un cambio material de versión crea una nueva cohorte; no heredar desempeño automáticamente. La recuperación/rotación de claves requiere diseño posterior y no debe borrar historia.

Passport exportable: ID, dirección, tipo, versión, dominio, periodo, pronósticos elegibles, Brier, baseline, calibración cuando proceda, estado provisional, versión de método, corte, hash de dataset, transacción de anclaje y evidencias. Credencial P0 = atestación del publicador Pravef; no afirmar certificación independiente ni compatibilidad formal con W3C VC sin implementarla.

## Evaluación de probabilidades binarias

Para cada pregunta resuelta, p en [0,1], y en {0,1}:

`loss_i = (p_i - y_i)^2`

`BS = sum(loss_i) / n`

Menor es mejor. Ejemplo: probabilidades 0.8, 0.3, 0.6 con resultados 1,0,1: Brier = (0.04+0.09+0.16)/3 = 0.096667. Tres aciertos binarios si se umbraliza en 0.5, pero esa métrica no refleja bien calidad probabilística. Mostrar accuracy como secundaria si se define umbral y empate; no usar yield de apuestas.

Benchmark: probabilidad fija 0.5 (Brier 0.25 para binario) como baseline pedagógico; además, cuando exista, comparar contra tasa base histórica calculada antes del evento o un modelo de referencia con las mismas preguntas y cortes. `Brier skill = 1 - BS / BS_baseline` si baseline >0. No comparar participantes con datasets disjuntos sin advertir dificultad, cobertura y mezcla de preguntas.

## Score regularizado experimental

MVP: por dominio d, usar únicamente pronósticos válidos de preguntas finalizadas antes del cutoff. Una predicción por identidad/pregunta, sin ediciones retroactivas. Prior pedagógico `b0=0.25`, `k=20` observaciones equivalentes; `BS_shrunk = (sum(loss_i)+k*b0)/(n+k)`; `score = round(100*(1-BS_shrunk))`. Esto es una transformación monotónica ilustrativa del Brier regularizado, NO porcentaje de acierto, probabilidad de confiabilidad ni certificación estadística. Baseline neutral se muestra como 75 bajo esta escala; documentar para evitar que se interprete como un excelente score. Con n=0 mostrar `Sin historial` en lugar de 75. Mostrar Brier crudo y skill como métricas primarias. La escala y prior deberán validarse antes de producción.

Estado `provisional` si n<20 (umbral de diseño, no garantía estadística); con n>=20 mostrar muestra y advertencia si preguntas correlacionadas. Una sola resolución no certifica habilidad. En el MVP no usar rachas, likes, capital o compras para aumentar reputación. No agregar dominios como si fuesen equivalentes. Incluir cobertura: cantidad de preguntas abiertas respondidas, compromisos no revelados y anulaciones; investigar selección adversa, abstenciones estratégicas y cuentas múltiples.

Calibración: agrupar p en bins predefinidos (p.ej. intervalos de 0.2) y comparar media de p con frecuencia observada, junto con n por bin. Con pocos casos no mostrar curvas interpretables como evidencia fuerte; usar aviso `insufficient data`. Un único punto no mide calibración. Para estudios posteriores usar intervalos, bootstrap agrupado por evento y benchmarks fuera de muestra.

## Consenso

Para pregunta q en dominio d, congelar historial al momento de corte t anterior al resultado; no incluir datos de q ni resultados conocidos después de t. Para cada entrada elegible, `w_i = clip(1 - BS_shrunk_i, 0.05, 1)`; `p_consensus = sum(w_i*p_i)/sum(w_i)`. Con n=0 se usa peso neutral 0.75 y perfil provisional; si nadie ha pronosticado, no hay consenso. No convertir número de participantes en precisión garantizada. Las ponderaciones pueden ser débiles y los forecasters correlacionados; comparar contra media simple y baseline. Si hay sospecha de clones o cuentas relacionadas, revisar y documentar exclusiones antes del cálculo; evitar doble conteo de versiones en el piloto.

Ejemplo sintético: p=[0.8,0.7,0.6], pesos=[0.85,0.75,0.65], resultado ponderado 0.7089 ≈ 70.9%. El peso mide desempeño regularizado, no dinero. Mostrar n de contribuyentes, corte, versión de método y dispersión de pronósticos. No mostrar intervalo de confianza estadístico sin método validado.

## Benchmark de humanos y agentes

Mismas preguntas, deadlines, reglas, acceso a datos y resolución. Registrar versión del agente, fuentes disponibles y coste aproximado; evitar acceso futuro y data leakage. Comparar Brier en un conjunto común y por dominio. No atribuir mejora a ponderación hasta superar de forma reproducible el baseline; no entrenar con el conjunto de evaluación. El MVP demuestra cálculo y trazabilidad, no superioridad predictiva.

## Publicación y reproducibilidad

El worker construye un dataset canónico ordenado por question ID y forecast ID con referencias a transacciones; registra cutoff, código/method version, política de exclusión y hash SHA-256. El contrato ancla ese hash y emisor. Un tercero descarga el manifiesto público y recalcula métricas. Si la resolución se corrige, emitir nuevo snapshot enlazado al anterior y explicar cambios. El score no es trustless: el verificador debe contrastar completitud, fuente y algoritmo.
