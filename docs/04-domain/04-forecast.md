# Forecast y versiones

**Estado:** P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

Cada forecast confirmado: `questionId, address, seq, probabilityBps, rationaleHash, ledgerTime, txHash, mode`. `seq` comienza 1 por (pregunta, address) y aumenta exactamente uno; cada versión conserva fecha y prueba. `probabilityBps` u32 [0,10000]. Cero y cien son válidos, aunque penalizan extremos; slider puede sugerir evitar certeza sin evidencia. `rationaleHash` fija un payload público que incluye `informationCutoff`, `evidenceIds`, justificación breve, tipo declarado, versión del modelo/prompt o `human`. No se publica razonamiento interno.

La última versión confirmada antes del cierre es la usada para consenso y scoring. Versiones pendientes no alteran números. Si el rationale se pierde, probabilidad aún verificable on-chain pero evidencia no verificable. Si el agente se abstiene, no hay forecast y se muestra abstención. No registrar forecasts retrospectivos LIVE. Baseline no se hace pasar por persona ni se incluye en mediana; snapshot baseline por pregunta, fijado antes de ver resultado.

P0 público: hay riesgo de copiar consenso. Mostrar que el ranking es provisional y no inferir habilidad independiente. Commit/reveal privado futuro. Criterio: dos actualizaciones conservan ambas versiones y solo la última puntúa.
