# Casos iniciales del MVP

**Estado:** P0 · **Versión:** 1.2 · **Fecha:** 2026-11-26

ADR-028 reemplaza el foco único "Perú, clima y abastecimiento" por dos macrocategorías. Son casos de prueba de la tubería, no el límite de praev ([12-categories](../04-domain/12-categories.md)).

## Caso A · Tipo de cambio diario (`economy_finance / fx_daily`)

Preguntas recurrentes de resolución rápida: "¿El tipo de cambio interbancario venta del BCRP para el {día hábil D} será mayor que {umbral}?", y equivalentes para BR, CO y AR cuando su spike dé GO (HU-45). Cierre al inicio del día D (PET), observación `[D 00:00, D+1 00:00)` en la zona de la fuente, `resolveAfter` cuando la fuente publica el dato (≈1 día hábil después en el BCRP) y `resolveBy` con margen de 3 días hábiles. Umbral cerca del último valor publicado, para que haya incertidumbre real. Decisión de referencia: un importador que debe pagar en dólares el día D decide si compra hoy; el taker declara la razón C/L como `referenceThresholdBps`. Objetivo: varias preguntas por día hábil desde el 30 nov, para acumular al menos 20 resoluciones LIVE antes del 4 dic. Un feriado sin dato invalida la pregunta (`missingPolicy:'invalidate'`), por eso solo se usan días hábiles conocidos.

## Caso B · Lluvia en Chulucanas (`climate_environment / precipitation`)

Caso candidato: lluvia acumulada en Chulucanas, Piura. Razón: dato externo numérico, impactos en movilidad/cosecha y abastecimiento, decisión de contingencia fácilmente simulable. El informe final identifica estación SENAMHI/WIS2 `0-604-1-08602104`; esto no prueba que la variable exacta se publique con latencia útil. No abrir hasta comprobar datos y reglas de calidad.

Pregunta LIVE candidata: “¿La precipitación acumulada en la estación CHULUCANAS superará 25 mm entre 2026-12-01 00:00 y 2026-12-04 00:00, hora Perú?” Cierre antes de inicio de ventana. Umbral de demo investigativo, no umbral de peligro validado. Resolución `>` estricto, no `>=`. Confirmar si las mediciones representan intervalos y evitar doble conteo. Fecha de publicación y tolerancia de ausencia deben confirmarse.

**Fuente validada (ADR-023).** Ventana en UTC: `[2026-12-01T05:00Z, 2026-12-04T05:00Z)`, 72 intervalos horarios. Regla: suma de `total_precipitation_or_total_water_equivalent` > 25,0 mm (YES); faltantes según `partial_yes_else_invalidate`. Cierre de pronósticos antes de `2026-12-01T05:00Z`, así que la pregunta se publica a más tardar el 30 nov. Con latencia < 1 h, la resolución es posible la mañana del 4 dic (PET), antes de la entrega en APEX. En la última semana, las sumas de 3 días variaron entre 5 y 56 mm: el umbral tiene incertidumbre real.

Plan de contingencia: si estación/variable no accesible, seleccionar serie oficial MIDAGRI de precio mayorista con unidad/producto/mercado y fuente documental verificadas, o una estación con datos completos. Si ninguna fuente es utilizable, mostrar candidato como borrador y usar únicamente DEMO sintético, declarando limitación. No sustituir fuente de pregunta ya publicada.

Decisión ejemplo: una empresa alimentaria revisa plan alternativo de abastecimiento; comunidad consulta contexto y comunicados. No recomendar evacuación/cosecha con forecast no validado.
