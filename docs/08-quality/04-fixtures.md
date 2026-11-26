# Vectores de prueba y datasets demo

**Estado:** P0 sintético · **Versión:** 1.1 · **Fecha:** 2026-11-26

Guardar JSON fixtures bajo `fixtures/`, separados de LIVE. Ejemplo de observación con unidad mm *1000 y dos intervalos completos (tiempos relativos que seed traduce a ventana futura):
```json
{"mode":"DEMO","source":"urn:praev:fixture:rain:v1","unit":"mm","scale":1000,"operator":"gt","thresholdScaled":25000,"observations":[{"startOffset":0,"endOffset":60,"valueScaled":12000},{"startOffset":60,"endOffset":120,"valueScaled":16000}],"expectedOutcome":1}
```
Casos extra: `[10000,15000]` suma 25000 → NO; `[10000,10000]` → NO; segundo faltante con suma parcial ≤ umbral → esperar e invalidar; `[30000, faltante]` → YES por `partial_yes_else_invalidate` (ADR-023); valor `0.6000000000000001` → 600 escalado; dos intervalos solapados → invalidar. No cargar expectedOutcome al prompt del agente; archivo expected separado del bundle de forecast. Crear pregunta y cutoff reales en testnet; generar evidencia fixture tras ventana y conservar fecha real de registro. Para live, no usar este dataset como fuente oficial.

Forecast fixture A=7000, B=6000, baseline=5000; mediana 6500; YES lossUnits 9000000 y 16000000; NO 49000000 y 36000000. `seq=2` de A=8000 → mediana 7000, Brier YES .04 para A. n sigue una pregunta, no dos. Comparar hash vector abc y canonicalizer en tests. Los números son resultados aritméticos esperados, no performance medida.
