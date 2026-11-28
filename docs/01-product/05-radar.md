# Pantalla Radar

**Estado:** P0; implementado sobre datos reales (HU-27) · **Versión:** 1.1 · **Fecha:** 2026-11-28

Objetivo: entender en menos de 20 segundos qué futuro merece atención. Encabezado: “Anticipa lo que importa” + subtítulo sobre consecuencias y pruebas; banner testnet. Filtros `LIVE / DEMO / todos`, estado (abierta/resuelta), dominio clima/abastecimiento. 1–3 tarjetas reales si están validadas, más fixture identificado; no rellenar catálogo con falsos datos.

Tarjeta: pregunta exacta, región, deadline PET, relevancia cualitativa, probabilidad agregada o “sin pronósticos”, número de participantes, estado de registro, resumen humano/económico, fuente de resolución y CTA “Explorar”. Baseline separado, no número de mercado. Si no hay forecasts, mostrar vacío y no 50% como consenso.

Orden: preguntas abiertas por fecha de cierre y relevancia editorial; demo separada y nunca primera si se confunde con live. Sin trending por volumen. Criterio: visitante accede al detalle sin conectar wallet; loading/error no borra etiqueta de demo; no muestra probabilidad inventada.

## Implementación (28 nov, HU-27)

`src/app/page.tsx` lee la proyección real de Postgres (`src/server/radar.ts`) dentro de `<Suspense>`, con la hora de la petición vía `connection()`. No hay datos de ejemplo: si no hay preguntas, lo dice. El modelo puro está en `src/lib/radar.ts`.

- **Filtros como enlaces** (`?modo=LIVE|DEMO`, `?estado=open|closed|resolved|all`, `?categoria=<macro habilitada>`): funcionan sin JavaScript y se comparten; un valor desconocido cae al defecto (todas, abiertas, todas). El dominio se filtra por las macros habilitadas, no por «clima/abastecimiento».
- **Orden:** LIVE antes que DEMO (en secciones separadas; la DEMO nunca encabeza), luego cierre más próximo, relevancia alta primero e id como desempate.
- **Tarjeta:** etiqueta LIVE o «DEMO · datos de prueba, no cuenta en rankings» antes del título, fase, categoría y país, pregunta exacta, cierre en PET, relevancia con su justificación, fuente de resolución, resumen de impacto y enlace a la tx de creación en el explorador.
- **Señal sin números inventados:** antes del cierre, «N tesis selladas · el consenso se revela al cierre»; después, «consenso pendiente de revelado». Si el indexador (HU-19) aún no corrió, «conteo pendiente del indexador» en vez de un 0 no verificado. Ninguna etiqueta lleva porcentaje; un test lo comprueba.
- **CTA:** «Ver prueba on-chain» mientras no exista el detalle `/q/[id]`; «Explorar» se añade con la pantalla de pregunta para no enlazar a un 404.
- **Error:** si la base no está configurada o falla, la página muestra el aviso y conserva los filtros; no rompe el shell.
