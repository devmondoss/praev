# Bloqueadores, preguntas abiertas y experimentos

**Estado:** Pendiente · **Versión:** 1.2 · **Fecha:** 2026-11-26

**Antes de programar resolver LIVE:** serie exacta, precipitación granular, licencia, cobertura, frecuencia y latencia; no abrir pregunta sin GO. **Antes de firmar:** versión SDK/CLI/wallet compatible, testnet RPC, cuenta financiada, constructor y roles. **Antes de deployment:** hosting/DB, variables, contract ID real, TTL y smoke. **Antes de AI run:** API key y modelo disponible, coste/timeout, evidencia con cutoff. **Antes de concurso:** checkpoint, elegibilidad, reglas y link entrega.

**Decidido (ADR-021):** el LLM se consume vía OpenRouter. Antes de B11 falta elegir el modelo concreto (debe soportar `structured_outputs`) y fijar el presupuesto de tokens.

**Inconsistencias a resolver en implementación:** `invalidate` debe escribir `Resolution{outcome:2}`; `schemaVersion` no lo recibe el constructor; `get_latest_seq` sin forecasts debe devolver 0. Resueltas en docs el 26 nov: `creator` → `curator` (01-question v1.2), columna `cancel_reason_hash` y `ai_runs` con `provider`, `adapter_version` y tokens (01-database v1.1).

**Abiertas por ADR-024 a 030:** qué umbral de tipo de cambio usar cada día (regla propuesta: último valor publicado redondeado a la escala de la serie); cómo se muestra la cuenta regresiva al revelado cuando el reloj local difiere del ledger; si el taker que propone puede pronosticar su propia pregunta (P0: sí, con `requester` visible); cuántos makers reales se consiguen antes del 4 dic (HU-51). **Riesgo de producto:** si casi no hay makers humanos, el perfil se llenará sobre todo con el equipo y el rival de IA; se declara así, sin inflar cifras.

**Riesgos técnicos:** soroban-sdk 30 publicado el 24 nov (alternativa `=28.0.0`); `getEvents` retiene solo ≈7 días; TTL mínimo de testnet ≈7 días (ADR-020).

No bloquean P0: pricing, TAM, sponsor, país siguiente, estándar VC, ponderación reputacional, pagos, oracle descentralizado. “TIS” no definido: no convertirlo en requisito.

Experimentos futuros: entrevistas con 15–20 responsables, comparativo alerta vs forecast+threshold, registro de acciones revisadas, benchmark preregistrado de preguntas vivas, pilotos con precio explícito. Si nadie actúa sobre forecasts o no hay valor adicional frente a baseline/alerta, reconsiderar producto. No prometer que tres informes prueban PMF. Si el equipo no puede conseguir fuente real, documentar que se ha demostrado protocolo con datos sintéticos, no oracle oficial funcional.
