# Consensus Engine y baseline

**Estado:** P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

Mediana de las últimas probabilidades confirmadas por address elegible, en una pregunta y un modo. Excluir resolver, baseline, pending, fail. Ordenar enteros. n impar: elemento central; n par: promedio de los dos centrales redondeado a bps más cercano, empate .5 hacia arriba. n=0: null, no inventar 50%. Mostrar n y hora de corte. No interpretar mediana como calibrada sin evaluación.

Baseline control 5000 bps predefinido para demo; para LIVE preferir climatología documentada y comparable cuando exista (no requerida para ciclo). No comparar skill contra un baseline posterior al evento. Mediana A=7000/B=6000 =6500; incorporar actualización B=8000 →7500. Si A falla tx, usar solo B confirmado. El baseline se presenta separado.

P1: ponderación por Brier con shrinkage, validación out-of-sample, diversidad y errores correlacionados. No asignar peso reputacional a n pequeño ni vender consenso como mejor que mercado. Las probabilidades externas, incluido mercado de predicción cuando corresponda, pueden integrarse en futuro sin dependencia estructural.
