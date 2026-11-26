# Evaluación de forecasting y leakage

**Estado:** P0 pruebas; benchmark futuro · **Versión:** 1.0 · **Fecha:** 2026-11-26

Distinguir pruebas de integración (fixture) de skill real. El fixture sintético comprueba cálculo/registro; un replay histórico puede comprobar parsers, nunca medir habilidad de LLM si conoció datos futuros. LIVE exige cutoff antes de resolución y evidencia con fecha verificable. No incluir outcome en prompt, logs visibles por runner ni metadata accidental. Evitar selecciones retrospectivas de preguntas que acertó.

Baseline control de 50% en demo; una baseline informada requiere información de la misma ventana, por ejemplo climatología de estación. Comparar solo preguntas comunes y horizontes comparables. Medir Brier, cobertura/abstenciones, sample size, versión. P1 preregistrar conjunto de preguntas, split temporal, calibración y error correlacionado; no extrapolar resultados de concursos ajenos al agente praev.

Pruebas: fixture sin evidence produce abstain o output validado con limitaciones; evidencia posterior rechazada antes de llamar IA; IDs desconocidos no llegan a firma; versión registrada. Un agente que devuelve 60% no es “correcto” porque se resolvió YES; su Brier .16 es una observación. No declarar superioridad, causalidad ni certificación.
