# Inventario de fuentes y prueba de viabilidad

**Estado:** P0 gate; URLs de portales no son endpoints validados · **Versión:** 1.0 · **Fecha:** 2026-11-26

Según informe final, candidatos: SENAMHI/WIS2 CHULUCANAS estación `0-604-1-08602104`; MIDAGRI/SISAP precios mayoristas. Máximo una fuente LIVE para P0, segunda solo P1. El proveedor de IA no se considera fuente de resolución. Usar fuente oficial para ground truth, evidencia predictiva adicional solo si publicada antes de cutoff.

Portales de partida: [SENAMHI](https://www.senamhi.gob.pe/), [WMO WIS2](https://community.wmo.int/en/activity-areas/wis/wis2), [MIDAGRI](https://www.gob.pe/midagri). Son enlaces generales; no se probó un endpoint específico en esta consolidación. El informe original conserva sus referencias. No inventar ruta REST, disponibilidad de datos, formato ni horarios.

Spike obligatorio: localizar catálogo oficial y licencia; descargar muestra 3 días consecutivos; verificar variable, unidad, intervalo, timezone, datos faltantes, revisión, latencia, estación/serie; calcular cobertura y regla manualmente con segunda persona; guardar URL exacta, timestamp, bytes y SHA-256 permitidos; probar parser con missing/duplicado/revisión; registrar `GO/NO-GO` en ADR. No publicar LIVE hasta GO. Si no funciona, elegir otra serie verificable antes de congelar; si ninguna, conservar DEMO y reportar limitación.

Adapter interface:
```ts
interface ObservationAdapter {
 fetch(spec: QuestionSpec): Promise<{raw: Uint8Array; mime: string; retrievedAt: number}>;
 parse(raw: Uint8Array, spec: QuestionSpec): { observations: Array<{start:number;end:number;valueScaled:number}>; coverageComplete:boolean; warnings:string[] };
}
```
No parsear dato faltante como cero. Duplicados conflictivos invalidan cobertura. Convertir unidades solo con factor declarado; timestamps ambiguos rechazar. Para sum, intervalos sin huecos/solapes. Un fixture adapter y un adapter documental/manual son suficientes para ciclo; automatizar fetch solo cuando verificado.
