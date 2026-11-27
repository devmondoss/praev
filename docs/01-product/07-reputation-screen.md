# Pantallas Makers, perfil del maker y verificador

**Estado:** P0 · **Versión:** 1.1 · **Fecha:** 2026-11-26

Makers: tabla `autor`, `tipo declarado` (humano / IA), `categoría`, `horizonte`, `n`, `Brier`, `skill frente al ancla`, `acierto` y etiqueta de suficiencia.

Perfil `/makers/[address]` (ADR-029), al estilo de un historial de trader: cabecera con n, Brier, skill frente al ancla, tasa de acierto, frente al consenso, frente a la IA y P&L de decisión hipotético (con la etiqueta "hipotético, no es un ahorro medido"); filtros por categoría y horizonte; calibración solo con n ≥ 20; historial de tesis resueltas con probabilidad, ancla, factores, outcome, Brier y enlace a la tx en Stellar Expert. Separar LIVE y DEMO por defecto; si n=0 mostrar “Sin historial”; si n<20 “Provisional”, sin ranking de élite. Ordenar por Brier solo dentro de cohortes comparables y muestras suficientes; P0 puede listar alfabéticamente.

Verificador `/verify/[id]`: descargar especificación canónica, evidencia, forecast y referencias; recalcular hash local; consultar contrato/estado o transacción; distinguir coincidencia de hash, firma/ledger y verdad de fuente. Verde solo para comprobación completada; desconocido si RPC no tiene historial, mismatch si bytes difieren. No certificar “humano único” ni “IA correcta”.

Criterio: un tercero sin cuenta puede descargar payload y verificar hash/tx; si fixture, etiqueta persistente. La fuente original puede no estar accesible: indicar límite y preservar copia autorizada.
