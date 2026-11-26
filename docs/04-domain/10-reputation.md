# Brier, calibración y reputación

**Estado:** P0 determinista · **Versión:** 1.0 · **Fecha:** 2026-11-26

Para cada pregunta binaria resuelta, con p=probabilityBps/10000, y∈{0,1}: Brier=(p−y)^2. Menor es mejor. Implementar entero exacto `lossUnits=(probabilityBps-10000*y)^2` (0..100000000), promedio `sum(lossUnits)/(n*1e8)` para display. Solo última versión pre-cutoff por address. Invalid/cancel/pending no puntúan. Nunca mezclar DEMO con LIVE, ni cohortes no comparables. n cuenta preguntas únicas, no revisiones.

Baseline comparable: calcular Brier sobre idéntico subconjunto; `BSS=1−BS/BSbaseline` si baseline>0 y datos suficientes; si cero, N/D. Mostrar n siempre. n<20 provisional (umbral de interfaz propuesto, no garantía estadística), no leaderboard ordenado por score si insuficiente. Accuracy por umbral .5 no sustituye calibración. P0 no score universal 0–100, yield, rachas o retorno financiero.

Ejemplo demo y=1; A=.7 → .09; B=.6 → .16; baseline=.5 → .25. Caso y=0, p=.7 → .49. Perfecto p=1,y=1→0; p=1,y=0→1. Recalcular desde chain y SQL confirmados, no tabla editable de reputación. P1 intervalos de incertidumbre, log score, curvas de calibración, horizontes, evaluación contra climatología y detección Sybil/copying. Una sola muestra no demuestra skill.
