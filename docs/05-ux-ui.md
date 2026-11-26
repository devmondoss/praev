# 05 · UX/UI — experiencia de decisión

## Dirección visual propuesta

Marca textual `pravef.`; tagline Proof of Foresight. Interfaz editorial, sobria, de inteligencia de riesgo, no de trading. Fondo claro, contraste alto, gris neutro, acento verde petróleo para acciones primarias y azul para enlaces verificables. Rojo/ámbar solo para error o riesgo, no para convertir probabilidad en señal de compra. Los colores son decisiones iniciales revisables.

| Token | Valor propuesto |
|---|---|
| Background | #F8FAFA |
| Surface | #FFFFFF |
| Text | #172526 |
| Muted | #526568 |
| Primary | #12665A |
| Border | #DCE5E4 |
| Focus | #205CC0 |
| Typography | Inter o system sans; cifras tabulares |
| Spacing | 4, 8, 12, 16, 24, 32, 48 px |
| Radius | 8 px controles; 12 px cards |

Layout desktop: max 1280 px, padding 32 px, grid 12 columnas, gap 24 px; navegación lateral 216 px opcional. Tablet: 8 columnas, margen 24 px. Mobile: 4 columnas, margen 16 px, gap 12 px; una columna de contenido. Títulos H1 32/40 desktop y 26/34 mobile, H2 22/30, body 16/24, metadata 13/18. Controles de al menos 44×44 px, foco visible y soporte teclado. No depender del color para expresar estados; revisar contraste WCAG AA en implementación.

## Navegación

`Explore` · `Ask` · `My forecasts` · `Passport` · `Activity`. CTA wallet discreta. Lectura pública sin login; solicitar firma únicamente para registrar, comprar o modificar estado. En móvil, navegación inferior para Explore, Ask, Passport y Activity; My forecasts dentro de Passport. Mostrar Stellar Testnet persistentemente durante la demo.

## Pantallas

| Vista | Distribución | Contenido / acciones |
|---|---|---|
| Explore `/` | H1, búsqueda y filtros; tarjetas 2 columnas desktop | Preguntas ordenadas por relevancia contextual; decisión, plazo, probabilidad, muestra, fuente |
| Question `/questions/:id` | 8 columnas contenido + 4 sidebar; móvil apilado | Pregunta, para quién importa, horizonte, consenso, evidencia, pronosticadores, CTA predict o comprar análisis |
| Ask `/questions/new` | Formulario max 720 px, revisión lateral | Beneficiario, decisión, reglas, fuente, fechas, dominio, evidencia; guardar borrador |
| Predict `/questions/:id/predict` | Formulario corto, preview y confirmación | Probabilidad 0–100%, razonamiento, aviso de secreto y fecha; firmar compromiso |
| Passport `/profiles/:id` | Header + métricas + historial | Tipo declarado, versión del agente, score por dominio, muestra, Brier, calibración, pruebas |
| Verify `/proofs/:id` | Timeline y detalles desplegables | Sello, apertura, resolución, credencial, hash y explorador; copiar IDs |
| Pay `/checkout/:offerId` | Resumen y bloque de firma | Informe, precio, activo, destinatarios, fee/red, wallet, confirmar y recibo |
| Activity `/activity` | Tabla y cards mobile | Estado, fecha, tipo, referencias, reintentar recuperación |
| Curator `/admin/questions` | Tabla con estados y formulario | Admisión, publicación, resolución, evidencia y cambios auditados |

## Wireframe de pregunta (datos ficticios)

```text
pravef.                              Explore   Passport   Connect
DECISION INTELLIGENCE / CLIMATE RISK                         Testnet
¿Se superará el umbral de precipitación definido en la zona X?
Decision: adjust planting schedule before [date]

Estimated probability          Relevance             Forecasters
72% (illustrative)              88/100                3 (illustrative)
[probability timeline]          [Why it matters]
As of [UTC] · sample size · provisional if applicable

Who is affected?                Resolution rules
Agriculture · Logistics         Source, observation window, deadline

Verified contributors           Proofs on Stellar
Human analyst — sample n        Commit / reveal / resolution links
AI agent — model version

[Submit forecast]               [Unlock report · 3 test units]
```

La probabilidad aparece con fecha, número de pronósticos, tamaño de muestra histórica o aviso de ausencia de historial. El gráfico usa únicamente snapshots reales cuando se implemente; vacío si no existen. Relevance no lleva signo %. Score siempre acompañado de dominio y muestra. Ejemplos sintéticos llevan etiqueta visible `Demo data`.

## Microcopy y estados

- Conexión: “Conecta tu wallet para firmar. Nunca solicitamos tu frase de recuperación.”
- Commit: “Tu pronóstico quedará sellado. Guarda tu secreto para poder abrirlo.”
- No historial: “Historial insuficiente: esta estimación es provisional.”
- Pago: “Pagas por el acceso al informe, no por el resultado del evento.”
- Pendiente: “Transacción enviada. Esperando confirmación.”
- Error: distinguir rechazo de firma, red incorrecta, plazo vencido, saldo insuficiente y fallo de indexación. No ofrecer pagar otra vez mientras un pago previo sea incierto.
- Resolución: “Resultado según [fuente]. Ver evidencia.”

## Validación UX

Objetivos de prueba, no resultados: 4 de 5 usuarios identifican probabilidad, confiabilidad y decisión; primera pregunta comprendida en <60 s; compra de prueba en <=3 acciones de aplicación tras conectar wallet; navegación con teclado completa. Medir errores, abandono y tiempo real. Priorizar textos y estados antes de motion decorativo.
