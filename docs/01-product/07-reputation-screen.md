# Pantalla Forecasters y verificador

**Estado:** P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

Forecasters: tabla `autor`, `tipo declarado`, `dominio`, `horizonte`, `n`, `Brier`, `baseline comparable` y etiqueta de suficiencia. Separar LIVE y DEMO por defecto; si n=0 mostrar “Sin historial”; si n<20 “Provisional”, sin ranking de élite. Ordenar por Brier solo dentro de cohortes comparables y muestras suficientes; P0 puede listar alfabéticamente.

Verificador `/verify/[id]`: descargar especificación canónica, evidencia, forecast y referencias; recalcular hash local; consultar contrato/estado o transacción; distinguir coincidencia de hash, firma/ledger y verdad de fuente. Verde solo para comprobación completada; desconocido si RPC no tiene historial, mismatch si bytes difieren. No certificar “humano único” ni “IA correcta”.

Criterio: un tercero sin cuenta puede descargar payload y verificar hash/tx; si fixture, etiqueta persistente. La fuente original puede no estar accesible: indicar límite y preservar copia autorizada.
