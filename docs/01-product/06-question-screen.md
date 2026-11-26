# Pantalla Decision Forecast

**Estado:** P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

Detalle de arriba a abajo: título y estado, probabilidad + n + timestamp, por qué importa (humano/económico), decisión potencial, regla de resolución expandible, forecasts con autor/versión/hora/evidencia, baseline, formulario, simulador de decisión, resultado y pruebas. Mostrar fuente de resolución exacta e independiente de fuentes predictivas.

Columna derecha: tarjeta sticky en escritorio con forecast y plazo; debajo umbral de decisión. En móvil todo secuencial. El control de probabilidad acepta número y slider sincronizados; convertir a bps por validación, no por parse ambiguo. Texto de consentimiento “Tu probabilidad y dirección serán públicas en Stellar”. Confirmación muestra contrato y red. Para P0 no gráficos de evolución si hay un solo punto; con varias versiones usar datos reales.

Estados: `OPEN` botón activo; `CLOSED` solo lectura; `RESOLVED` muestra outcome/Brier; `INVALID` explica motivo y no puntúa; pendiente RPC no declara éxito. Evidencia no disponible se indica. El simulador conserva el snapshot observado aunque cambie consenso. Aceptación: no hay botón de compra ni apuesta; los enlaces a pruebas son navegables.
