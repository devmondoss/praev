# 14 · Roadmap y ejecución

Fecha base: miércoles 25 de noviembre de 2026 (Lima, UTC-5). Entrega final: viernes 4 de diciembre 23:59. El plan asigna bloques propuestos, no refleja avances confirmados. P0 debe ser reproducible aun si no hay integraciones externas.

## Hitos de la buildathon

| Fecha | Hito | Resultado verificable / salida |
|---|---|---|
| 25 nov | M0 — checkpoint | Repo público creado y registrado en Hub antes de 23:59; README y equipo |
| 26 nov | M1 — especificación congelada | Pregunta demo, reglas, estados, fixture y toolchain; entrevistas iniciadas si posible |
| 27–28 nov | M2 — contratos | Registry desplegado, commit/reveal y resolución testeados; IDs y tx |
| 29 nov | M3 — reputación | Indexer mínimo, Brier, consenso, snapshots y passport reproducibles |
| 30 nov | M4 — producto | Explore, Question, Predict, Passport, Verify; conexión y firma funcionales |
| 1 dic | M5 — pagos | Offer, compra, recibo y acceso con activo de prueba; sin saldo interno |
| 2 dic | M6 — integración | Agente CLI, flujo completo, pruebas negativas y evidencia de impacto/UX |
| 3 dic | M7 — hardening | Bug bash, accesibilidad, seguridad, documentación, grabación de demo |
| 4 dic | M8 — entrega | Reproducibilidad desde clone, enlaces públicos, APEX antes de 23:59 |
| 5 dic | Demo Day | Pitch 3 min y video de respaldo |

El calendario deja el checkpoint como acción inmediata. Si ya no se puede registrar, consultar organización: las bases no garantizan excepción.

## Reparto funcional adaptable a 1–4 integrantes

| Workstream | Responsable por asignar | Dependencia |
|---|---|---|
| Producto/UX/impacto | A | Define preguntas y flujo antes del front |
| Stellar/Soroban | B | Contratos y testnet antes de integración |
| Backend/datos/IA | C | Índices, métricas, agente y acceso |
| Frontend/QA/entrega | D | UI, pruebas E2E y grabación |

Si el equipo tiene menos integrantes, combinar funciones; no asumir nombres ni disponibilidad. Un integrador valida interfaces cada día, no esperar al último. Mantener un tablero `todo / doing / review / done`, PR pequeños y evidencia por hito.

## Recortes por riesgo

Si hay problemas de tiempo: posponer on-ramp fiat, automatización de curación, disputas descentralizadas, SDK completo, gráficos avanzados, credenciales estandarizadas, personalización y entrenamiento de IA. No recortar pruebas on-chain, verificación de firmas, cálculo reproducible, pago autorizado, claridad UX, ni señalización de datos demo. Si USDC testnet no está disponible, usar activo de prueba etiquetado. Si fuente real no se resuelve a tiempo, fixture sintética con transacciones reales de testnet. Si no hay entrevistas, declarar hipótesis y método pendiente.

## Después de la competencia

- Fase 1: validar un segmento, preguntas reales y utilidad; evaluar resolución independiente, cobertura, calibración y seguridad.
- Fase 2: credenciales portables, SDK estable, integraciones externas y producto B2B; estudiar regulación y proveedores de funding.
- Fase 3: posible mainnet después de auditoría, pruebas, revisión legal, validación de demanda y operación; mantener Stellar como núcleo.

Criterios de salida: funcionalidad demostrada, no solo fechas; responsables y evidencia completados en README/PR. No interpretar la fecha como garantía de avance.
