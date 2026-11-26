# Fixture y demostración end-to-end

**Estado:** P0, sintético · **Versión:** 1.0 · **Fecha:** 2026-11-26

El escenario `DEMO` usa un dato sintético de lluvia generado por script después del cierre de la ventana corta. Se indica “Simulación técnica, no observación oficial” en todos los registros. La pregunta se publica realmente en testnet con inicio de ventana futuro y regla `sum_mm > 25`. Ejemplo: abrir ahora, cerrar +120 s, observar durante 120 s, resolver después. La hora se deriva del ledger y no se retrofecha. Para grabar, preparar una instancia anterior ya resuelta y otra abierta; ambas etiquetadas. No usa reloj manipulado en testnet.

Forecast A humano 7000 bps; agente B 6000 bps si output válido (o ejemplo 6000 ficticio explícito); baseline 5000 bps, no incluir en mediana. Mediana A/B 6500. Evidencia fixture `observations=[12,16] mm` en dos intervalos completos: suma 28; outcome YES. Brier A .09, B .16, baseline .25; solo si se usaron esos valores exactos. Escenario decisión: pérdida evitable 20,000 USD, coste 11,000 USD, threshold 55%, pérdida esperada a 65% 13,000 USD. Estos no son datos reales ni estimación de skill.

Separar `mode=DEMO` en contrato, DB, filtros y export. El resultado fixture no prueba verdad externa. Una prueba LIVE adicional verifica que la fuente real se puede leer y especificar; no simular resultado aún desconocido. Repetir fixture con outcome NO, igualdad umbral y dato faltante (invalidación conforme a regla).
