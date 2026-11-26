# Inventario de fuentes y prueba de viabilidad

**Estado:** P0 gate; URLs de portales no son endpoints validados · **Versión:** 1.2 · **Fecha:** 2026-11-26

Según informe final, candidatos: SENAMHI/WIS2 CHULUCANAS estación `0-604-1-08602104`; MIDAGRI/SISAP precios mayoristas. Máximo una fuente LIVE para P0, segunda solo P1. El proveedor de IA no se considera fuente de resolución. Usar fuente oficial para ground truth, evidencia predictiva adicional solo si publicada antes de cutoff.

Portales de partida: [SENAMHI](https://www.senamhi.gob.pe/), [WMO WIS2](https://community.wmo.int/en/activity-areas/wis/wis2), [MIDAGRI](https://www.gob.pe/midagri). Son enlaces generales; no se probó un endpoint específico en esta consolidación. El informe original conserva sus referencias; el PDF `research/03-mvp-research.pdf` incluye las URLs completas. Pista para B02: colección de estaciones SENAMHI en `https://wis.senamhi.gob.pe/oapi/collections/stations/items?f=html` (no probada). No inventar ruta REST, disponibilidad de datos, formato ni horarios.

Spike obligatorio: localizar catálogo oficial y licencia; descargar muestra 3 días consecutivos; verificar variable, unidad, intervalo, timezone, datos faltantes, revisión, latencia, estación/serie; calcular cobertura y regla manualmente con segunda persona; guardar URL exacta, timestamp, bytes y SHA-256 permitidos; probar parser con missing/duplicado/revisión; registrar `GO/NO-GO` en ADR. No publicar LIVE hasta GO. Si no funciona, elegir otra serie verificable antes de congelar; si ninguna, conservar DEMO y reportar limitación.

**Resultado del spike (26 nov 2026): GO** (ADR-023). OGC API de SENAMHI WIS2 (`https://wis.senamhi.gob.pe/oapi`), colección `urn:wmo:md:pe-senamhi:synop-hourly`, estación CHULUCANAS `0-604-1-08602104` (estado `operational`). Variable `total_precipitation_or_total_water_equivalent`, unidad `kg m-2` (= mm), precisión 0,1 con ruido de coma flotante en el JSON. Intervalos horarios `[h-1,h)` en UTC (`phenomenonTime`), `reportTime` = fin del intervalo, sin duplicados. Latencia < 1 h. Cobertura de la muestra 20–26 nov: 161/164 horas; las horas faltantes no se completaron después. Política de datos WMO `core`. Consulta: `items?f=json&wigos_station_identifier=0-604-1-08602104&name=total_precipitation_or_total_water_equivalent&datetime=<inicio>/<fin>&limit=1000` (`sortby` devuelve error 500: ordenar en cliente). Muestra con URL, fecha y SHA-256 en `fixtures/sources/senamhi/`. Revisiones de datos publicados: no observadas en la muestra; se mantiene `first_eligible_publication`.

Adapter interface:
```ts
interface ObservationAdapter {
 fetch(spec: QuestionSpec): Promise<{raw: Uint8Array; mime: string; retrievedAt: number}>;
 parse(raw: Uint8Array, spec: QuestionSpec): { observations: Array<{start:number;end:number;valueScaled:number}>; coverageComplete:boolean; warnings:string[] };
}
```
No parsear dato faltante como cero. Duplicados conflictivos invalidan cobertura. Convertir unidades solo con factor declarado; timestamps ambiguos rechazar. Para sum, intervalos sin huecos/solapes. Un fixture adapter y un adapter documental/manual son suficientes para ciclo; automatizar fetch solo cuando verificado.
