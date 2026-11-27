# Scope P0, P1 y exclusiones

**Estado:** Normativo P0 · **Versión:** 1.1 · **Fecha:** 2026-11-26

**Objetivo:** demostrar el mercado de anticipación de praev (ADR-024) con un ciclo completo y verificable: un taker propone una pregunta atada a una decisión; makers reales arman su tesis con las herramientas de praev y la sellan en Stellar; al cierre se revela el consenso; la fuente oficial resuelve; el perfil de cada maker se actualiza con métricas recalculables por cualquiera.

P0 obligatorio: un contrato con tesis selladas (ADR-026); preguntas LIVE en dos macros (ADR-028): tipo de cambio diario con resolución a 1–3 días y la lluvia de Chulucanas, cada una con fuente con GO; un escenario DEMO sintético resoluble en testnet; tesis estructurada humana (ADR-025) con recibo de sellado; agente de IA como brief de evidencia y rival de referencia (ADR-027; si el proveedor falla, un fixture etiquetado NO satisface la prueba de agente vivo); ancla histórica fijada antes del cierre; revelado y mediana al cierre; resolución firmada; perfil del maker con Brier, skill frente al ancla, acierto, frente al consenso, frente a la IA y P&L de decisión hipotético (ADR-029); propuesta de pregunta del taker firmada y Decision Register local (ADR-030); verificador público; deployment testnet y app; tests. Meta: al menos 20 preguntas LIVE resueltas antes del 4 dic y makers reales invitados; si no se alcanza, el perfil queda Provisional y se declara. El LLM solo emite pronóstico estructurado, no autónomo en producción. Una pregunta viva puede quedar abierta al cierre del concurso.

P1: pago fijo del taker repartido por reputación previa (USDC testnet, sin custodia), macrocategorías adicionales, varios agentes makers, revelado on-chain o con time-lock, automatización de curación, ponderación por historial, credencial portable, alertas, servidor de decisiones con auth. No construir si P0 incompleto.

No scope: compras de picks, custodia, token, derivados/apuestas, enterprise auth, multi-tenant, microservicios, drones, modelos climáticos, oráculo descentralizado, backtesting masivo, API comercial, precios reales de clientes, datos internos sensibles. No añadir 9 agentes. Las carpetas de visión no son tickets.

Criterio de salida: evidencia de transacciones reales y pruebas, no slides ni mockups. Si fuente LIVE falla, documentar bloqueo y mantener demo técnica honesta; no fingir integración real.
