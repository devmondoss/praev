# Perfil del maker: Brier, calibración y métricas de historial

**Estado:** P0 determinista · **Versión:** 2.0 · **Fecha:** 2026-11-26

El perfil de un maker es su historial auditado, como el de un trader (ADR-029). Todas las métricas se **recalculan** desde la cadena y los payloads revelados; no existe tabla de reputación editable.

**Base de cálculo.** Por cada pregunta binaria resuelta (outcome 0/1), la última versión revelada y válida antes del cierre (ver [04-forecast](04-forecast.md)). INVALID, CANCELLED, pendientes, `unrevealed` e `invalid` no puntúan. Nunca mezclar DEMO con LIVE. n cuenta preguntas únicas, no revisiones. Todo se filtra por categoría, subcategoría y horizonte (`closesAt − ledgerTime` de la versión puntuada: `≤1 d`, `1–7 d`, `>7 d`).

| Métrica | Equivalente de trader | Definición exacta |
|---|---|---|
| **Brier** | P&L | `lossUnits=(probabilityBps−10000·y)²` (0..1e8); `BS = Σ lossUnits / (n·1e8)`. Menor es mejor |
| **Skill frente al ancla** | rendimiento frente al índice | `BSS = 1 − BS/BS_ancla` sobre el mismo subconjunto; N/D si `BS_ancla = 0` o no hay ancla |
| **Tasa de acierto** | win rate | `p > 5000 ∧ y=1` o `p < 5000 ∧ y=0` cuenta como acierto; `p = 5000` se excluye del denominador y se muestra aparte. No sustituye a la calibración |
| **Calibración** | consistencia | 5 tramos de 20 pp: probabilidad media declarada frente a frecuencia observada. Solo se muestra con n ≥ 20 |
| **Frente al consenso** | alfa | `ΔBS = BS_maker − BS_consenso_sin_el_maker` (mediana *leave-one-out*) en preguntas donde existe; negativo = mejor que la mayoría |
| **Frente a la IA** | frente a un benchmark | `ΔBS` frente al agente rival en preguntas comunes |
| **P&L de decisión** | rentabilidad | Solo en preguntas con `referenceThresholdBps = t`. Con pérdida evitable L = 10000 unidades: actuar si `p > t` cuesta `t`; no actuar cuesta `10000·y`. `valor = coste_ancla − coste_maker`, sumado y mostrado como % de L por pregunta. **Hipotético**: no es un ahorro medido |
| Completitud | — | % de tesis con ancla, al menos un factor, evidencia y `changeMyMind` |

**Suficiencia.** n siempre visible. n < 20 → "Provisional" (umbral de interfaz, no garantía estadística): se muestran las cifras pero no hay ranking ordenado ni calibración. Con n ≥ 20 en una cohorte comparable (mismo modo, categoría y horizonte) se puede ordenar por Brier. No hay score universal 0–100, rachas ni rendimiento financiero real.

**Ejemplos.** DEMO y=1: A=.7 → .09; B=.6 → .16; ancla control .5 → .25. y=0, p=.7 → .49. p=1, y=1 → 0; p=1, y=0 → 1. P&L de decisión con t=5500, y=1: maker p=7000 actúa → coste 5500; ancla 5000 no actúa → coste 10000; valor +4500 (45 % de L). Con y=0 el mismo maker pierde 5500 frente al ancla.

P1: intervalos de incertidumbre, log score, detección de Sybil y copia, cohortes por versión de modelo. Una sola muestra no demuestra skill.
