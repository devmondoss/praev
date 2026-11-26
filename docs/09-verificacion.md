# 09 · Pravef Verify — integridad y resolución

## Ciclo de evidencia

`rules hash -> commit -> reveal -> observation -> resolution -> score snapshot`.

El compromiso demuestra que el autor registró un valor antes de un plazo, no que la predicción sea verdadera, independiente o basada en información pública. Una resolución depende de una fuente externa; documentar esa dependencia en la interfaz.

## Commit / reveal P0

- Fijar `network_id`, `contract_id`, `question_id`, `rules_hash`, `forecaster_address`, `p_bps` entero, `reasoning_hash` y `salt` aleatorio criptográficamente (32 bytes). Usar separador de dominio `pravef.forecast.v1`.
- Serializar todos los campos en un formato canónico inequívoco, compartido entre cliente y contrato; propuesta: estructura tipada con serialización XDR verificada en ambos lados. No concatenar strings sin longitudes ni depender de orden JSON arbitrario. Fijar test vectors antes de implementar.
- `commitment = SHA256(canonical_payload)`; enviar solo commitment y referencias en fase commit. El usuario firma y conserva salt + payload localmente con export seguro; no enviarlo a logs ni publicar antes del reveal.
- Después de `commit_deadline` y antes de `reveal_deadline`, enviar p_bps, reasoning_hash y salt; el contrato reconstruye y compara hash. Verificar autorización y tiempo de ledger. El evento se considera válido solo tras confirmación.
- Para el MVP la observación comienza después de revelar. Si falta reveal, queda como no revelado y no puntúa; mostrar tasa de no apertura para limitar cherry-picking. Para eventos continuos o resolubles antes de reveal, diseñar reglas adicionales o excluirlos de P0.

El razonamiento se puede publicar o vender por separado; el hash no lo revela si se protege contra enumeración mediante nonce para contenido sensible. El consenso público se publica tras reveal para evitar copia durante la ventana. Si se desea consenso vivo, diseñar un modo explícito de publicación abierta con otros controles de copia; no prometer ambas propiedades simultáneamente.

## Reglas de resolución

Antes de abrir: fuente primaria, identificador de serie/documento, zona, unidad, ventana UTC, umbral, redondeo, tratamiento de revisiones y datos faltantes, plazos, responsable y apelaciones. Priorizar fuentes observables y accesibles; archivar la versión consultada, fecha de publicación y hash. Si no hay evidencia suficiente, cancelar, no inventar resultado.

P0: resolvedor identificado propone resultado y evidencia; finaliza según ventana definida. Puede ser el mismo rol autorizado durante demo, etiquetado como resolución de confianza centralizada. P1: separación de funciones, ventana de objeción y validadores independientes. No prometer oráculo descentralizado si no existe. Una corrección post-finalización crea atestación enlazada y nueva versión de métricas, no mutación silenciosa.

## Vista de verificación

Mostrar: pregunta/version, autor, red, IDs de contrato, hashes, timestamps/ledger, estado, explorador, fuente, resultado, versión de método y recibo si aplica. Botón copiar identificadores. Proporcionar una herramienta CLI para recalcular payload y hash y verificar estado RPC; exportar manifiesto JSON sin datos privados.

## Aceptación

Commit válido registrado en testnet, intento duplicado rechazado, reveal correcto aceptado, salt/probabilidad alterados rechazados, operación fuera de ventana rechazada, fuente documentada, resolución por autorizado y snapshot recalculable. Demostrar una prueba positiva y otra negativa. Datos demo señalizados; no simular transacciones exitosas en UI.
