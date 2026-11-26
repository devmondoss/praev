# Oracle Engine: resolución auditable

**Estado:** P0 operador autorizado · **Versión:** 1.0 · **Fecha:** 2026-11-26

Diferencias: curador decide qué se pregunta; fuente predictiva informa p; data adapter obtiene observación; resolver aplica regla; reputación evalúa. Soroban no hace peticiones HTTP. Resolver lee fuente congelada y evidencia, normaliza, calcula y firma outcome. En P0 confianza explícita en wallet resolver y revisión humana; no red descentralizada.

Flujo: comprobar ledger t≥resolveAfter; recuperar spec y hash; fetch allowlisted o cargar archivo autorizado; verificar dataset, timestamps, unidades y cobertura; calcular entero; construir manifest; mostrar preview al operador (sum, threshold, outcome, source, hash); confirmar; simular tx; firmar; esperar SUCCESS; reconciliar; calcular score. Si datos ausentes o ambiguos, esperar hasta resolveBy o invalidar según regla. No sustituir con una fuente improvisada. Si source revisa dato después, conservar primera publicación elegible según policy. No editar terminal; registrar corrección explicativa fuera de cadena y no usar ese caso en análisis futuros sin política explícita.

El operador no puede resolver por haber pronosticado; se usan identidades separadas, y el contrato excluye resolver como forecaster. Un operador comprometido puede mentir: prueba de firma no prueba verdad. P1 comité, disputas, auditoría externa. Aceptación: evidencia reproducible, resultado coincide regla, tx autenticada, error de datos no se vuelve NO.
