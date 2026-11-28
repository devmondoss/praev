# Taxonomía de categorías

**Estado:** P0 para las dos macros habilitadas; el resto es mapa de crecimiento · **Versión:** 1.0 · **Fecha:** 2026-11-26

praev no está atado a un país ni a un dominio (ADR-028). Cada pregunta lleva `category` (macro), `subcategory` y `country` (ISO 3166-1 alfa-2, o `XX` si es global). La taxonomía es un catálogo de datos en `src/domain`: habilitar una macro nueva no exige migrar el esquema, solo una fuente de resolución con GO.

**Regla de admisión de una categoría:** una macro solo se habilita cuando al menos una de sus subcategorías tiene una fuente oficial con spike GO (variable, unidad, frecuencia, latencia, faltantes y licencia comprobados; ver [05-data-sources](../07-engineering/05-data-sources.md)). Sin fuente verificable no hay pregunta (AGENTS.md).

## Macrocategorías y subcategorías

| # | Macro (`category`) | Subcategorías (`subcategory`) | Fuentes candidatas | Estado |
|---|---|---|---|---|
| 1 | **Economía y finanzas** (`economy_finance`) | `fx_daily` tipo de cambio diario · `inflation_monthly` inflación mensual · `policy_rate` tasa de referencia · `sovereign_spread` riesgo país | BCRP (PE), BCB SGS (BR), TRM datos.gov.co (CO), BCRA (AR), BCE EXR (EUR) | **Habilitada en el MVP** |
| 2 | Materias primas y energía (`commodities_energy`) | `metals` cobre, oro · `oil_gas` · `power_demand` demanda eléctrica | BCRP cotizaciones (falta confirmar el código de cobre), COES (PE, no documentado) | Mapa |
| 3 | **Clima y ambiente** (`climate_environment`) | `precipitation` lluvia acumulada · `temperature` · `hydrology` caudales y embalses · `air_quality` | SENAMHI WIS2 (PE), redes WIS2 de la región | **Habilitada en el MVP** |
| 4 | Agro y alimentos (`agri_food`) | `wholesale_prices` precios mayoristas · `harvest` cosecha · `supply` abastecimiento | MIDAGRI SISAP (no respondió el 26 nov) | Mapa |
| 5 | Pesca (`fisheries`) | `season` apertura o veda de temporada · `landings` desembarques | PRODUCE, IMARPE | Mapa |
| 6 | Logística y comercio exterior (`logistics_trade`) | `port_status` cierre de puertos · `exports` exportaciones · `freight` fletes | DICAPI/APN, SUNAT | Mapa |
| 7 | Riesgos naturales (`natural_hazards`) | `earthquakes` sismos sobre una magnitud · `enso` El Niño/La Niña · `volcanic` | USGS GeoJSON (respondió), ENFEN/NOAA | Mapa |
| 8 | Salud (`health`) | `epidemiology` casos notificados · `alerts` alertas sanitarias | Ministerios de salud, OPS | Mapa |
| 9 | Regulación (`regulation`) | `rules` publicación de normas · `rates_fees` tarifas reguladas | Diarios oficiales, reguladores sectoriales | Mapa |
| 10 | Sociedad y conflictividad (`society`) | `social_conflicts` conflictos registrados · `employment` empleo | Defensoría del Pueblo, institutos de estadística | Mapa |
| 11 | Tecnología y redes (`tech_networks`) | `stellar_network` métricas de la red Stellar · `connectivity` | Horizon y RPC de Stellar (verificables por cualquiera) | Mapa |

Banco Mundial (solo series anuales) no sirve para preguntas de corto plazo. Banxico (MX) y BCCh (CL) exigen token o registro; se evalúan cuando haya cuentas.

## Por qué estas dos macros en el MVP

- **Economía y finanzas**: el tipo de cambio diario se publica cada día hábil por bancos centrales, con historial largo para calcular el ancla. Una pregunta a 1–3 días se resuelve rápido, así que para el 4 dic puede haber decenas de resoluciones reales y un perfil de maker con datos, no simulado.
- **Clima y ambiente**: la lluvia de Chulucanas ya tiene GO (ADR-023) y demuestra que la misma tubería sirve para un fenómeno físico con consecuencias humanas.

## Plantillas de pregunta del MVP

| Subcategoría | Plantilla | Agregación | Ejemplo |
|---|---|---|---|
| `fx_daily` | ¿El {serie} publicado por {fuente} para el {fecha} será mayor que {umbral}? | `single` | ¿El tipo de cambio interbancario venta (S/ por US$) del BCRP del 2 dic 2026 será mayor que 3,500? |
| `inflation_monthly` | ¿La variación mensual de {índice} de {mes} será mayor que {umbral} %? | `single` | Solo si el cierre cae antes de la publicación oficial |
| `precipitation` | ¿La lluvia acumulada en {estación} entre {inicio} y {fin} superará {umbral} mm? | `sum` | Pregunta LIVE de ADR-023 |

El umbral se fija cerca del valor actual para que la incertidumbre sea real, y el ancla histórica (ver [06-consensus](06-consensus.md)) se calcula antes del cierre. Un día sin publicación (feriado, fin de semana) invalida la pregunta `single` conforme a su `missingPolicy: 'invalidate'`; por eso las plantillas apuntan a días hábiles.

## Implementación de la plantilla `fx_daily` (28 nov, HU-22)

`src/domain/questions/templates/fx-daily.ts` genera y valida la spec a partir de fecha, umbral, país y modo. Cierre a las 18:00 locales del día anterior; observación del día completo; resolución desde el fin del día y hasta 7 días después. Rechaza sábados y domingos; los feriados los revisa el curador. Solo admite países cuya fuente tiene GO en [05-data-sources](../07-engineering/05-data-sources.md). Una pregunta DEMO usa una fuente `urn:praev:fixture:fx-<país>-<fecha>`, nunca la fuente real.

**Escala exacta.** La API del BCRP publica promedios con hasta 14 decimales (25 nov: `3.49157142857143`) aunque declara `"dec":"3"` para mostrarlos. Por eso la plantilla usa `scale = 10^14`: cada valor publicado es un entero exacto (seguro en JS) y `gt` se compara sin redondear y sin agregar un campo de redondeo a la spec. El umbral admite 3 decimales.
