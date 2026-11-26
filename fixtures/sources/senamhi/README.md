# SENAMHI · Chulucanas (muestra real)

Muestra oficial descargada durante el spike HU-05 (ADR-023). Son datos reales, no DEMO; sirven para probar el parser contra la forma exacta de la fuente. No es evidencia de ninguna resolución.

| Campo | Valor |
|---|---|
| Archivo | `chulucanas-precip-2026-11-20_2026-11-27.json` (bytes exactos de la respuesta) |
| URL | `https://wis.senamhi.gob.pe/oapi/collections/urn:wmo:md:pe-senamhi:synop-hourly/items?f=json&wigos_station_identifier=0-604-1-08602104&name=total_precipitation_or_total_water_equivalent&datetime=2026-11-20T00:00:00Z/2026-11-27T00:00:00Z&limit=1000` |
| Descargado | 2026-11-26T19:43:36Z |
| SHA-256 | `5d7a2763061352a7bd120f3e62285b171302e68196597dbb0c0ff411e8e91511` |
| Estación | CHULUCANAS, WIGOS `0-604-1-08602104` (Piura) |
| Política de datos | WMO `core` (WMO Unified Data Policy) |

Contenido: 161 intervalos horarios `[h-1, h)` en UTC, unidad `kg m-2` (= mm), sin duplicados. Faltan 3 horas: 2026-11-21 00:00Z, 2026-11-26 00:00Z y 01:00Z.
