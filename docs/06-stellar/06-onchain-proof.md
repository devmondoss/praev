# Prueba on-chain: garantías y límites

**Estado:** P0 · **Versión:** 1.2 · **Fecha:** 2026-11-26

La prueba vincula pregunta congelada, compromiso de tesis autenticado antes de cutoff, tesis revelada que coincide con ese compromiso, outcome autorizado y evidencia. Brier puede recalcularse desde esos datos. Un tercero puede cotejar tx/ledger y bytes. La identidad es técnica, no certificación de humanidad; la evidencia puede ser falsa si resolver miente; el testnet no es garantía de permanencia. No afirmar que blockchain conoce clima.

**Sellado (ADR-026, reemplaza a ADR-006).** En P0 la cadena guarda solo el compromiso de cada versión; praev guarda la tesis y la revela al cierre. Es una sola firma por versión, sin segunda transacción de revelado. Garantías: nadie puede cambiar una tesis después de sellarla ni fecharla hacia atrás; antes del cierre la cadena no revela la probabilidad. Límites: praev ve las tesis antes del cierre y podría filtrarlas o perder alguna. Mitigaciones: el número de compromisos es público, así que una tesis no revelada se nota (`unrevealed`); el maker conserva su recibo de sellado y puede revelarla él mismo; los logs nunca contienen payloads. No llamar “inmutable” a decisiones localStorage. No afirmar credencial on-chain si solo se calcula score en UI.

Futuro: revelado on-chain o cifrado con time-lock para no depender de praev antes del cierre, preguntas privadas, salt criptográfico 32 bytes, ventanas distintas antes de observación, recuperación y consecuencias de no revelar; atestaciones firmadas/portables, resolver múltiple, modelo de disputas. No implementar ni simularlos como funcionalidades P0. Criterio: verificador explica exactamente qué coincide y qué no pudo verificar.
