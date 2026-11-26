# Threat model y controles

**Estado:** P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

| Amenaza | Control | Límite residual |
|---|---|---|
| Forecaster suplanta identidad | require_auth y source account, intent validado | wallet comprometida |
| Admin reescribe score | chain append-only + recomputar Brier | puede ocultar proyección |
| Resolver miente | evidencia y hash, rol explícito, revisión | operador centralizado |
| Fuente cambia/revisa | spec congelada y raw bytes | fuente original falsa |
| Copying/Sybil | disclosure, muestra provisional, modo separado | no resuelto P0 |
| Prompt injection | evidencia como datos, sin tools firma, Zod | modelo puede fallar |
| SSRF | allowlist host exacto HTTPS, validar redirects/IP, timeout, cap | proveedor comprometido |
| XSS | render texto plano, MIME safe, CSP, escape | revisar dependencias |
| SQL injection | consultas parametrizadas, no interpolar filtros | bug de autorización |
| Replay/duplicate | contrato seq y auth host, tx intent idempotente | RPC desconocido temporal |
| Secret leak | server-only, keystore, gitignore, CI scan | exposición del operador |
| DoS | max payload, rate limits, timeout, paginación | sin garantía enterprise |

No pedir seeds ni custodiar dinero. No desplegar mainnet. No ejecutar URLs del LLM. Rate limit inicial por IP/address para prepare/submit, p.ej. 10/min propuesto; implementar capa hosting o DB, no asumir memoria serverless compartida. No construir auth empresarial; scripts operativos locales con confirmación. Mantener threat model revisado tras implementación. No afirmar auditoría externa.
