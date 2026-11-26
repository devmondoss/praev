# 16 · Plan de pruebas, datos sintéticos y demo

## Fixture reproducible (no son datos de pronosticadores reales)

Pregunta demo: ¿el indicador simulado `rain_mm` de `zone-demo` superará 100 mm durante la ventana definida? Fuente `fixture://demo-weather-v1`, resultado 1 si valor >100, 0 si <=100, cancelada si no hay dato. Acción hipotética: ajustar calendario de siembra antes de la observación. Elegir ventanas relativas a la ejecución en testnet, publicarlas antes del commit y permitir suficiente tiempo real para confirmaciones. No cambiar reloj de cadena ni falsificar timestamps. Esta pregunta no es un pronóstico meteorológico actual.

Historial sintético para cálculo local, mismo dominio:

| Pregunta | y | Humano A p | Agente B p | Humano C p |
|---|---:|---:|---:|---:|
| H1 | 1 | .8 | .6 | .9 |
| H2 | 0 | .3 | .4 | .7 |
| H3 | 1 | .6 | .7 | .5 |
| H4 | 0 | .2 | .3 | .4 |

Brier esperado: A=.0825; B=.125; C=.2275. Con prior .25 y k=20, pesos regularizados: A≈.777917; B≈.770833; C≈.75375. Para pregunta nueva p=[.8,.7,.6], consenso esperado ≈0.701050 (70.10% redondeado a 2 decimales). Verificar cifras con unit tests. Los datos históricos no son credenciales reales; si se anclan como test fixtures, etiquetarlos explícitamente. La reputación real comienza desde evidencia registrada y válida. No introducir resultados sintéticos en ranking real.

## Matriz de pruebas

| ID | Caso | Resultado esperado |
|---|---|---|
| T01 | Crear pregunta completa y otra sin fuente | Primera aceptada, segunda rechazada |
| T02 | Cambio de reglas tras commit | Rechazo |
| T03 | Firma de identidad/commit por otro owner | Rechazo |
| T04 | Commit duplicado o vencido | Rechazo |
| T05 | Reveal correcto | Match de hash, estado confirmado |
| T06 | Reveal alterado, temprano o tardío | Rechazo |
| T07 | Compromiso sin reveal | No puntuado; visible como expirado |
| T08 | Resolución no autorizada o duplicada | Rechazo |
| T09 | Fuente ausente | Cancelación, no score |
| T10 | Cálculo Brier fixture | Valores esperados y n correctos |
| T11 | No historial | Provisional/sin historial; peso neutral |
| T12 | Consenso usa corte anterior | No fuga de resultados futuros |
| T13 | Dataset/manifest modificado | Hash no coincide |
| T14 | Compra válida | Recibo, transferencias, acceso, router sin fondos |
| T15 | Pago insuficiente / términos alterados | Aborto atómico |
| T16 | Purchase ID repetido | Sin segundo cobro por ese ID |
| T17 | Evento de pago repetido | Un entitlement |
| T18 | Pago confirmado, entrega falla | Recuperación sin segundo pago |
| T19 | Wallet red incorrecta / rechaza firma | Sin falsa confirmación; mensaje útil |
| T20 | RPC desconectado o índice atrasado | Estado pendiente/as-of; reconciliación |
| T21 | Acceso ajeno a informe | Denegado |
| T22 | UI mobile y teclado | Flujo comprensible, foco visible |
| T23 | Agente y humano con mismas reglas | Aceptación, tipo/versión visibles |
| T24 | Clone limpio | Instrucciones reproducibles y pruebas pasan |

No marcar pruebas como aprobadas hasta ejecutarlas. Separar unit tests de contrato, integración en testnet y E2E. Adjuntar logs sin secretos, capturas y enlaces por test. Probar límites de recursos y TTL según implementación.

## Secuencia de demo

Preparar dos wallets con fondos de prueba, contrato IDs, pregunta corta y fixture histórica etiquetada. Mostrar en una vista: decisión, criterios de resolución, pronóstico firmado, enlace al explorador, historial y actualización. Para un flujo con plazos, usar compromisos registrados de antemano y mostrar sus tiempos; no pretender que todo ocurrió durante los tres minutos. Mostrar resultado de una prueba de manipulación rechazada. Comprar informe con wallet distinta al vendedor, abrir recibo y comprobar balances. Concluir con qué es on-chain y qué depende de fuente/backend.

## Registro de evidencias (completar)

| Artefacto | Referencia | Estado |
|---|---|---|
| Registry ID / explorer | Pendiente | No desplegado |
| Router ID / explorer | Pendiente | No desplegado |
| Activo de prueba y emisor | Pendiente | Por verificar |
| Commit/reveal tx | Pendiente | No ejecutado |
| Resolution tx | Pendiente | No ejecutado |
| Score anchor tx | Pendiente | No ejecutado |
| Purchase tx | Pendiente | No ejecutado |
| Reporte tests / CI | Pendiente | No ejecutado |
| Entrevistas y UX | Pendiente | No ejecutado |
| App y video | Pendiente | No publicados |
