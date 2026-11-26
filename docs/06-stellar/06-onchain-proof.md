# Prueba on-chain: garantías y límites

**Estado:** P0 · **Versión:** 1.1 · **Fecha:** 2026-11-26

La prueba vincula pregunta congelada, pronóstico público autenticado antes de cutoff, outcome autorizado y evidencia. Brier puede recalcularse desde esos datos. Un tercero puede cotejar tx/ledger y bytes. La identidad es técnica, no certificación de humanidad; la evidencia puede ser falsa si resolver miente; el testnet no es garantía de permanencia. No afirmar que blockchain conoce clima.

En P0 el forecast es público y versionado, no commit/reveal. Esto reduce transacciones y pérdida de salts. Un operador no puede alterar fecha/valor de una versión ya registrada por contrato, pero puede ocultar contenido off-chain o despliegue nuevo; export y contrato ID fijado ayudan a detectar. No llamar “inmutable” a decisiones localStorage. No afirmar credencial on-chain si solo se calcula score en UI.

Futuro: commit/reveal por preguntas privadas, salt criptográfico 32 bytes, ventanas distintas antes de observación, recuperación y consecuencias de no revelar; atestaciones firmadas/portables, resolver múltiple, modelo de disputas. No implementar ni simularlos como funcionalidades P0. Criterio: verificador explica exactamente qué coincide y qué no pudo verificar.
