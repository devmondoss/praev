# BCRP · Tipo de cambio interbancario venta (muestra real)

Muestra oficial descargada en el spike HU-45. Son datos reales, no DEMO; sirven para probar el adaptador (HU-44) contra la forma exacta de la fuente. No es evidencia de ninguna resolución.

| Campo | Valor |
|---|---|
| Archivo | `PD04638PD-2026-11-12_2026-11-28.json` (bytes exactos de la respuesta) |
| URL | `https://estadisticas.bcrp.gob.pe/estadisticas/series/api/PD04638PD/json/2026-11-12/2026-11-28` |
| Descargado | 2026-11-28T13:47:11Z |
| SHA-256 | `1e35bf3a392fdd9a4d0b0125d780f6a914be2f1eb2f351d86bd1ddec523a9b1f` |
| Serie | `PD04638PD` · Tipo de cambio - TC Interbancario (S/ por US$) - Venta |
| Condiciones de uso | API pública sin registro; el texto de las «Condiciones de Uso» de BCRPData no se localizó. Se cita fuente y fecha de descarga |

Contenido: 11 días hábiles del 12 al 26 nov con valor y `27.Nov.26` = `n.d.` (descargado el sábado 28 por la mañana). Valores con hasta 14 decimales (`3.49157142857143`) aunque `config.series[0].dec` = `"3"`; el 23 nov trae `3.452`. Fechas `dd.Mmm.yy` con meses en español (`Dic` en diciembre, comprobado con dic 2025). Un feriado aparece como `n.d.`: 8 dic 2025, y también el 9 dic 2025.
