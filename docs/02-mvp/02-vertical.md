# Caso vertical: clima y abastecimiento

**Estado:** Decisión propuesta P0; fuente por validar · **Versión:** 1.0 · **Fecha:** 2026-11-26

Caso candidato: lluvia acumulada en Chulucanas, Piura. Razón: dato externo numérico, impactos en movilidad/cosecha y abastecimiento, decisión de contingencia fácilmente simulable. El informe final identifica estación SENAMHI/WIS2 `0-604-1-08602104`; esto no prueba que la variable exacta se publique con latencia útil. No abrir hasta comprobar datos y reglas de calidad.

Pregunta LIVE candidata: “¿La precipitación acumulada en la estación CHULUCANAS superará 25 mm entre 2026-12-01 00:00 y 2026-12-04 00:00, hora Perú?” Cierre antes de inicio de ventana. Umbral de demo investigativo, no umbral de peligro validado. Resolución `>` estricto, no `>=`. Confirmar si las mediciones representan intervalos y evitar doble conteo. Fecha de publicación y tolerancia de ausencia deben confirmarse.

Plan de contingencia: si estación/variable no accesible, seleccionar serie oficial MIDAGRI de precio mayorista con unidad/producto/mercado y fuente documental verificadas, o una estación con datos completos. Si ninguna fuente es utilizable, mostrar candidato como borrador y usar únicamente DEMO sintético, declarando limitación. No sustituir fuente de pregunta ya publicada.

Decisión ejemplo: una empresa alimentaria revisa plan alternativo de abastecimiento; comunidad consulta contexto y comunicados. No recomendar evacuación/cosecha con forecast no validado.
