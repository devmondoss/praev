# Mapa de navegación y rutas

**Estado:** P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

| Ruta | Contenido | Permiso |
|---|---|---|
| `/` | Radar, filtros, estados | Público |
| `/q/[id]` | Pregunta, forecasts, impacto, evidencia, decisión demo | Público, firma para forecast |
| `/forecasters` | Brier y muestra por dominio, separación demo/live | Público |
| `/verify/[id]` | Prueba, especificación, resolución, hashes, tx | Público |
| `/methodology` | Cómo se selecciona, pronostica y resuelve; límites | Público |

Cabecera con wordmark `praev.`, Radar, Forecasters, Metodología, indicador Testnet y conectar wallet. Decisión y resolución no requieren rutas nuevas: secciones del detalle. Admin por CLI en P0; no sidebar enterprise ni wallet balance. Footer enlaces al repo, metodología, fuentes y disclaimer. En móvil, navegación simple y botones de firma con tamaño accesible. Deep links conservan ID exacto y muestran 404 honesto cuando no existe.
