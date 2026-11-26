# Decision Register

**Estado:** P0 local y demostrativo · **Versión:** 1.0 · **Fecha:** 2026-11-26

`DecisionSnapshot` contiene `schemaVersion, id, questionId, mode:'DEMO', capturedAtClient, consensusBps, confirmedForecastRefs[], thresholdInputs, action:'review'|'act'|'wait', rationale, deadline, disclaimer`. Guardar snapshot inmutable en localStorage namespace `praev.demo.decisions.v1` con lista y límite 50; no guardar secretos ni nombres/PII. Export JSON descargable; borrar historial local explícitamente. Capturar hora cliente y no presentarla como timestamp verificable. Mantener snapshot aunque consenso posterior cambie.

Este registro demuestra vínculo forecast→decisión, no efecto causal. Outcome review al resolverse muestra `forecast probability at decision`, `chosen action`, `event outcome`, `Brier` y “resultado operativo no medido”. No decir que se ahorraron 2000 USD. Una decisión puede ser razonable y tener resultado adverso.

P1: servidor con workspace autenticado, ownership, auditoría y privacidad; opcional hash on-chain solo con consentimiento y análisis de fuga. P0 no incluye tabla decisiones ni endpoints para datos internos. Criterio: recarga conserva snapshot, cambiar p no reescribe decisión, export válido, borrado funciona, sin wallet requerida.
