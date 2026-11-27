# Consensus Engine y ancla histórica

**Estado:** P0 · **Versión:** 2.0 · **Fecha:** 2026-11-26

**Cuándo existe el consenso.** Como las tesis están selladas (ADR-026), el consenso se calcula **desde el cierre**. Antes del cierre la pregunta muestra cuántas tesis selladas hay y de cuántos makers distintos, nunca un número de probabilidad. El cierre es la fecha en que el taker tiene que decidir (`closesAt ≤ observationStart`), así que recibe el consenso a tiempo y antes de que ocurra el evento.

**Mediana.** Mediana de las últimas versiones reveladas y válidas por address elegible (ver [04-forecast](04-forecast.md)), en una pregunta y un modo. Excluir resolver, ancla, `unrevealed` e `invalid`. El agente rival entra en la mediana con su etiqueta, y además se muestra la **mediana humana** por separado. Ordenar enteros. n impar: elemento central; n par: promedio de los dos centrales redondeado a bps, empate .5 hacia arriba. n=0: `null`, no inventar 50 %. Mostrar n y la hora de corte. No interpretar la mediana como calibrada sin evaluación.

**Ancla histórica (baseline).** Para cada pregunta LIVE se fija, **antes del cierre**, la frecuencia histórica con la que se habría cumplido la regla, calculada con la misma fuente oficial:

| Subcategoría | Método `anchor.v1` |
|---|---|
| `fx_daily` | De los últimos 250 días hábiles publicados, fracción en que el valor a `h` días hábiles superó al valor del día base en al menos la variación que exige el umbral (`h` = días hábiles entre el último dato publicado y la fecha observada) |
| `precipitation` | Fracción de ventanas de la misma duración en el historial disponible de la estación que superaron el umbral; si hay menos de 30 ventanas, ancla de control 5000 bps etiquetada "control" |

Se guarda en `baselines` con `method`, `probability_bps`, `sample_size`, `fixed_at` y evidencia de los datos usados. La UI la ofrece al maker como punto de partida y el perfil compara contra ella (ADR-029). Nunca se calcula ni se ajusta después del cierre. En DEMO se usa el control 5000 bps.

Ejemplo DEMO: A=7000, rival IA B=6000 → mediana 6500; si A actualiza a 8000 antes del cierre → 7000. Si la última versión de A queda `unrevealed`, la mediana es solo B.

P1: ponderación por historial con shrinkage y validación fuera de muestra, diversidad y errores correlacionados. No asignar peso reputacional con n pequeño ni vender el consenso como mejor que un mercado.
