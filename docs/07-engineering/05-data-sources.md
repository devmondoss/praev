# Inventario de fuentes y prueba de viabilidad

**Estado:** P0 gate; URLs de portales no son endpoints validados · **Versión:** 1.3 · **Fecha:** 2026-11-26

Según informe final, candidatos: SENAMHI/WIS2 CHULUCANAS estación `0-604-1-08602104`; MIDAGRI/SISAP precios mayoristas. Desde ADR-028, P0 admite varias fuentes LIVE detrás de un único resolvedor genérico de series (adaptador por fuente, regla común `sum`/`single`); cada fuente necesita su propio spike GO. El proveedor de IA no se considera fuente de resolución. Usar fuente oficial para ground truth, evidencia predictiva adicional solo si publicada antes de cutoff.

Portales de partida: [SENAMHI](https://www.senamhi.gob.pe/), [WMO WIS2](https://community.wmo.int/en/activity-areas/wis/wis2), [MIDAGRI](https://www.gob.pe/midagri). Son enlaces generales; no se probó un endpoint específico en esta consolidación. El informe original conserva sus referencias; el PDF `research/03-mvp-research.pdf` incluye las URLs completas. Pista para B02: colección de estaciones SENAMHI en `https://wis.senamhi.gob.pe/oapi/collections/stations/items?f=html` (no probada). No inventar ruta REST, disponibilidad de datos, formato ni horarios.

Spike obligatorio: localizar catálogo oficial y licencia; descargar muestra 3 días consecutivos; verificar variable, unidad, intervalo, timezone, datos faltantes, revisión, latencia, estación/serie; calcular cobertura y regla manualmente con segunda persona; guardar URL exacta, timestamp, bytes y SHA-256 permitidos; probar parser con missing/duplicado/revisión; registrar `GO/NO-GO` en ADR. No publicar LIVE hasta GO. Si no funciona, elegir otra serie verificable antes de congelar; si ninguna, conservar DEMO y reportar limitación.

**Resultado del spike (26 nov 2026): GO** (ADR-023). OGC API de SENAMHI WIS2 (`https://wis.senamhi.gob.pe/oapi`), colección `urn:wmo:md:pe-senamhi:synop-hourly`, estación CHULUCANAS `0-604-1-08602104` (estado `operational`). Variable `total_precipitation_or_total_water_equivalent`, unidad `kg m-2` (= mm), precisión 0,1 con ruido de coma flotante en el JSON. Intervalos horarios `[h-1,h)` en UTC (`phenomenonTime`), `reportTime` = fin del intervalo, sin duplicados. Latencia < 1 h. Cobertura de la muestra 20–26 nov: 161/164 horas; las horas faltantes no se completaron después. Política de datos WMO `core`. Consulta: `items?f=json&wigos_station_identifier=0-604-1-08602104&name=total_precipitation_or_total_water_equivalent&datetime=<inicio>/<fin>&limit=1000` (`sortby` devuelve error 500: ordenar en cliente). Muestra con URL, fecha y SHA-256 en `fixtures/sources/senamhi/`. Revisiones de datos publicados: no observadas en la muestra; se mantiene `first_eligible_publication`.

**Tipo de cambio diario (`fx_daily`), sondeo del 26 nov 2026.** Respuesta JSON real obtenida el 26 nov; falta el spike formal (HU-45: latencia exacta, feriados, revisiones, licencia) antes de publicar preguntas con cada una.

| País | Fuente y serie | Consulta probada | Observado el 26 nov | Estado |
|---|---|---|---|---|
| PE | BCRP, `PD04638PD` TC interbancario venta (S/ por US$), 3 decimales | `https://estadisticas.bcrp.gob.pe/estadisticas/series/api/PD04638PD/json/<desde>/<hasta>` | 25 nov = 3,49157; el día en curso aparece `n.d.` (≈1 día hábil de retraso); fechas `dd.Mmm.yy` | Respondió; candidato principal |
| BR | BCB SGS serie 1, dólar venta (R$ por US$) | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados/ultimos/3?formato=json` | 26 nov = 5,7446 ya publicado; fechas `dd/mm/aaaa` | Respondió |
| CO | TRM, datos.gov.co `32sa-8pi3` (COP por US$) | `https://www.datos.gov.co/resource/32sa-8pi3.json` | Vigencia 26 nov = 3630,89; se publica con vigencia por adelantado | Respondió |
| AR | BCRA API v4.0, variable 4 (ARS por US$, minorista) | `https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/4` | 26 nov = 1628,75 | Respondió |
| PE | BCRP `PN01271PM` IPC Lima, var. % mensual | misma API, serie mensual | oct 2026 = 0,57 % | Respondió; publicación mensual |
| CL / MX | BCCh, Banxico | — | Exigen registro o token | Fuera del MVP |

Reglas para `fx_daily`: el valor observado es el que la fuente publica **para la fecha** de la pregunta (no el del día de consulta); `n.d.` o ausencia es faltante (no cero) y, con `missingPolicy:'invalidate'`, invalida tras `resolveBy`; los decimales se normalizan a la escala declarada en la spec antes de comparar. La TRM de Colombia tiene vigencia anticipada: su spec debe definir la fecha por `vigenciadesde`.

Adapter interface:
```ts
interface ObservationAdapter {
 fetch(spec: QuestionSpec): Promise<{raw: Uint8Array; mime: string; retrievedAt: number}>;
 parse(raw: Uint8Array, spec: QuestionSpec): { observations: Array<{start:number;end:number;valueScaled:number}>; coverageComplete:boolean; warnings:string[] };
}
```
No parsear dato faltante como cero. Duplicados conflictivos invalidan cobertura. Convertir unidades solo con factor declarado; timestamps ambiguos rechazar. Para sum, intervalos sin huecos/solapes. Un fixture adapter y un adapter documental/manual son suficientes para ciclo; automatizar fetch solo cuando verificado.
