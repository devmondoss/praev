# Inventario de fuentes y prueba de viabilidad

**Estado:** P0 gate; SENAMHI GO (26 nov), tipo de cambio PE/BR/AR GO y CO NO-GO (28 nov) · **Versión:** 1.4 · **Fecha:** 2026-11-28

Según informe final, candidatos: SENAMHI/WIS2 CHULUCANAS estación `0-604-1-08602104`; MIDAGRI/SISAP precios mayoristas. Desde ADR-028, P0 admite varias fuentes LIVE detrás de un único resolvedor genérico de series (adaptador por fuente, regla común `sum`/`single`); cada fuente necesita su propio spike GO. El proveedor de IA no se considera fuente de resolución. Usar fuente oficial para ground truth, evidencia predictiva adicional solo si publicada antes de cutoff.

Portales de partida: [SENAMHI](https://www.senamhi.gob.pe/), [WMO WIS2](https://community.wmo.int/en/activity-areas/wis/wis2), [MIDAGRI](https://www.gob.pe/midagri). Son enlaces generales; no se probó un endpoint específico en esta consolidación. El informe original conserva sus referencias; el PDF `research/03-mvp-research.pdf` incluye las URLs completas. Pista para B02: colección de estaciones SENAMHI en `https://wis.senamhi.gob.pe/oapi/collections/stations/items?f=html` (no probada). No inventar ruta REST, disponibilidad de datos, formato ni horarios.

Spike obligatorio: localizar catálogo oficial y licencia; descargar muestra 3 días consecutivos; verificar variable, unidad, intervalo, timezone, datos faltantes, revisión, latencia, estación/serie; calcular cobertura y regla manualmente con segunda persona; guardar URL exacta, timestamp, bytes y SHA-256 permitidos; probar parser con missing/duplicado/revisión; registrar `GO/NO-GO` en ADR. No publicar LIVE hasta GO. Si no funciona, elegir otra serie verificable antes de congelar; si ninguna, conservar DEMO y reportar limitación.

**Resultado del spike (26 nov 2026): GO** (ADR-023). OGC API de SENAMHI WIS2 (`https://wis.senamhi.gob.pe/oapi`), colección `urn:wmo:md:pe-senamhi:synop-hourly`, estación CHULUCANAS `0-604-1-08602104` (estado `operational`). Variable `total_precipitation_or_total_water_equivalent`, unidad `kg m-2` (= mm), precisión 0,1 con ruido de coma flotante en el JSON. Intervalos horarios `[h-1,h)` en UTC (`phenomenonTime`), `reportTime` = fin del intervalo, sin duplicados. Latencia < 1 h. Cobertura de la muestra 20–26 nov: 161/164 horas; las horas faltantes no se completaron después. Política de datos WMO `core`. Consulta: `items?f=json&wigos_station_identifier=0-604-1-08602104&name=total_precipitation_or_total_water_equivalent&datetime=<inicio>/<fin>&limit=1000` (`sortby` devuelve error 500: ordenar en cliente). Muestra con URL, fecha y SHA-256 en `fixtures/sources/senamhi/`. Revisiones de datos publicados: no observadas en la muestra; se mantiene `first_eligible_publication`.

**Tipo de cambio diario (`fx_daily`), sondeo del 26 nov 2026.** Respuesta JSON real obtenida el 26 nov. El spike formal (HU-45) está más abajo.

| País | Fuente y serie | Consulta probada | Observado el 26 nov | Estado |
|---|---|---|---|---|
| PE | BCRP, `PD04638PD` TC interbancario venta (S/ por US$), 3 decimales | `https://estadisticas.bcrp.gob.pe/estadisticas/series/api/PD04638PD/json/<desde>/<hasta>` | 25 nov = 3,49157; el día en curso aparece `n.d.` (≈1 día hábil de retraso); fechas `dd.Mmm.yy` | Respondió; candidato principal |
| BR | BCB SGS serie 1, dólar venta (R$ por US$) | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados/ultimos/3?formato=json` | 26 nov = 5,7446 ya publicado; fechas `dd/mm/aaaa` | Respondió |
| CO | TRM, datos.gov.co `32sa-8pi3` (COP por US$) | `https://www.datos.gov.co/resource/32sa-8pi3.json` | Vigencia 26 nov = 3630,89; se publica con vigencia por adelantado | Respondió |
| AR | BCRA API v4.0, variable 4 (ARS por US$, minorista) | `https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/4` | 26 nov = 1628,75 | Respondió |
| PE | BCRP `PN01271PM` IPC Lima, var. % mensual | misma API, serie mensual | oct 2026 = 0,57 % | Respondió; publicación mensual |
| CL / MX | BCCh, Banxico | — | Exigen registro o token | Fuera del MVP |

Reglas para `fx_daily`: el valor observado es el que la fuente publica **para la fecha** de la pregunta (no el del día de consulta); `n.d.` o ausencia es faltante (no cero) y, con `missingPolicy:'invalidate'`, invalida tras `resolveBy`; los decimales se normalizan a la escala declarada en la spec antes de comparar. La TRM de Colombia tiene vigencia anticipada: su spec debe definir la fecha por `vigenciadesde`.

**Spike `fx_daily` (HU-45, 28 nov 2026).** Una muestra real de 10–11 días hábiles por fuente (12–28 nov), con URL, fecha y SHA-256 en `fixtures/sources/{bcrp,bcb,trm,bcra}/`. Los valores del 25 y 26 nov coinciden con los del sondeo del 26 nov: no hubo revisiones en esos dos días; una ventana tan corta no prueba que la fuente nunca revise, así que se mantiene `first_eligible_publication`.

| País | Fuente | Decimales publicados | Día sin dato | Publicación observada | Licencia | Decisión |
|---|---|---|---|---|---|---|
| PE | BCRP `PD04638PD` | Hasta 14 (promedio), `dec:"3"` solo para mostrar | `n.d.` en feriados y días no laborables (8 y 9 dic 2025) | El día D aparece en D+1 o después (27 nov seguía `n.d.` el 28 a las 08:47 PET) | API pública sin registro; texto de condiciones no localizado | **GO** (obligatoria) |
| BR | BCB SGS 1 (PTAX venta) | 4 | Ausente (20 nov, feriado) | D publicado el mismo D (27 nov visible el 28; 26 nov visible el 26) | ODbL | **GO** |
| CO | TRM `32sa-8pi3` | Hasta 2 | Cubierto por un rango de vigencia | **Antes** de su vigencia: la de 28–30 nov ya estaba el 28 por la mañana | CC BY-SA 4.0 | **NO-GO** en P0 |
| AR | BCRA v4.0 variable 4 | 2 (número JSON) | Ausente (23 nov, feriado) | D publicado el mismo D (26 nov visible el 26) | API pública sin autenticación; aviso legal no leído | **GO** |

Motivos y reglas que salen del spike:

- **Escala exacta, sin redondeo.** `scale` = 10^(decimales máximos publicados): BCRP 10^14, BCB 10^4, BCRA 10^2. Así cada valor publicado es un entero exacto y `gt` no necesita una regla de redondeo (que la spec no tiene). El adaptador (HU-44) lee el número como texto desde los bytes crudos, nunca como float; un valor con más decimales que la escala es un error de parseo, no se redondea.
- **Faltante.** `n.d.` (BCRP) y la ausencia de fecha (BCB, BCRA) son faltantes, nunca cero; con `missingPolicy: 'invalidate'`, la pregunta se invalida. El curador revisa feriados y días no laborables antes de publicar: el 9 dic 2025 no era feriado nacional y el BCRP no publicó.
- **Fechas.** BCRP `dd.Mmm.yy` con meses en español (`Ene`…`Dic`); BCB `dd/mm/aaaa`; BCRA ISO y en orden descendente.
- **CO, NO-GO.** La TRM vigente para D se fija y publica el día hábil anterior, así que una pregunta que cierra a las 18:00 de D-1 cerraría con el resultado ya publicado. Cerrar antes exige el calendario de feriados de Colombia (para un lunes o un día tras feriado la publicación cae días antes), que P0 no modela. Queda documentada y fuera; volver a evaluarla con un cierre ligado a la fecha de publicación.
- **Condiciones de uso.** BCRP y BCRA no exhiben licencia en la API; se usan como datos públicos del banco central, citando fuente y fecha de descarga en el manifiesto de resolución. Si el texto de sus condiciones lo prohibiera, se retira la fuente.

Fuentes: [API BCRPData](https://estadisticas.bcrp.gob.pe/estadisticas/series/ayuda/api), [BCB SGS 1 en datos abiertos](https://dadosabertos.bcb.gov.br/dataset/1-taxa-de-cambio---livre---dolar-americano-venda---diario), [BCRA Variables Monetarias v4.0](https://www.bcra.gob.ar/archivos/Catalogo/Content/files/pdf/principales-variables-v4.pdf), metadatos de [datos.gov.co `32sa-8pi3`](https://www.datos.gov.co/api/views/32sa-8pi3.json).

Adapter interface:
```ts
interface ObservationAdapter {
 fetch(spec: QuestionSpec): Promise<{raw: Uint8Array; mime: string; retrievedAt: number}>;
 parse(raw: Uint8Array, spec: QuestionSpec): { observations: Array<{start:number;end:number;valueScaled:number}>; coverageComplete:boolean; warnings:string[] };
}
```
No parsear dato faltante como cero. Duplicados conflictivos invalidan cobertura. Convertir unidades solo con factor declarado; timestamps ambiguos rechazar. Para sum, intervalos sin huecos/solapes. Un fixture adapter y un adapter documental/manual son suficientes para ciclo; automatizar fetch solo cuando verificado.
