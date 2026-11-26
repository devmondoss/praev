# Bloqueadores, preguntas abiertas y experimentos

**Estado:** Pendiente · **Versión:** 1.1 · **Fecha:** 2026-11-26

**Antes de programar resolver LIVE:** serie exacta, precipitación granular, licencia, cobertura, frecuencia y latencia; no abrir pregunta sin GO. **Antes de firmar:** versión SDK/CLI/wallet compatible, testnet RPC, cuenta financiada, constructor y roles. **Antes de deployment:** hosting/DB, variables, contract ID real, TTL y smoke. **Antes de AI run:** API key y modelo disponible, coste/timeout, evidencia con cutoff. **Antes de concurso:** checkpoint, elegibilidad, reglas y link entrega.

**Por decidir:** proveedor del LLM. El blueprint fija OpenAI (Responses + `OPENAI_API_KEY`); el equipo mencionó Claude como ejemplo. Decidir antes de B11 y, si cambia, crear ADR y actualizar `05-ai/*` y `06-env.md`.

**Inconsistencias a resolver en implementación:** `QuestionSpec.creator` frente a `curator` en contrato y SQL; `invalidate` debe escribir `Resolution{outcome:2}`; `cancel(reason_hash)` no tiene columna en SQL; `schemaVersion` no lo recibe el constructor; `get_latest_seq` sin forecasts debe devolver 0; `ai_runs` necesita `provider`, `adapter_version` y uso de tokens.

**Riesgos técnicos:** soroban-sdk 30 publicado el 24 nov (alternativa `=28.0.0`); `getEvents` retiene solo ≈7 días; TTL mínimo de testnet ≈7 días (ADR-020).

No bloquean P0: pricing, TAM, sponsor, país siguiente, estándar VC, ponderación reputacional, pagos, oracle descentralizado. “TIS” no definido: no convertirlo en requisito.

Experimentos futuros: entrevistas con 15–20 responsables, comparativo alerta vs forecast+threshold, registro de acciones revisadas, benchmark preregistrado de preguntas vivas, pilotos con precio explícito. Si nadie actúa sobre forecasts o no hay valor adicional frente a baseline/alerta, reconsiderar producto. No prometer que tres informes prueban PMF. Si el equipo no puede conseguir fuente real, documentar que se ha demostrado protocolo con datos sintéticos, no oracle oficial funcional.
