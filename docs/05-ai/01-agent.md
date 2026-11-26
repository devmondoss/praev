# Agente de forecasting único

**Estado:** P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

Implementar un solo runner TS server-side. Input: QuestionSpec congelada, evidence bundle allowlisted con publicación anterior al cutoff, baseline, `runAt`, promptVersion. El runner no navega libremente, no conoce outcome ni fuentes de resolución posteriores. Si no hay información útil, abstenerse. El operador revisa el output antes de firmar con cuenta agente testnet. No dar acceso a herramientas de firma al LLM.

Flujo: cargar spec → verificar OPEN y cutoff → normalizar evidence → llamada OpenAI Responses con esquema estructurado → Zod parse y cross-check → guardar output y metadata → revisión operador → simular/firma/envío → reconciliar. Timeout por llamada 45s propuesto, máximo 1 retry transitorio, cap de input 12k tokens propuesto; no repetir ante refusal. Model configurable via `OPENAI_MODEL`; seleccionar uno disponible, no inventar ID. No almacenar prompts con secretos ni cadena de pensamiento; sí rationale conciso. Si API falla, marcar abstención/error; modo fixture explícito no satisface agente vivo.

P1 separar Scout/Curator/Critic/Monitor, RAG, statistical forecasts, ensembles independientes. No framework multiagente hoy. Fuente: [OpenAI structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs).
