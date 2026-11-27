# Exposición y contexto comercial

**Estado:** P0 simulado; real futuro · **Versión:** 1.1 · **Fecha:** 2026-11-26

El fenómeno externo es común; la exposición es específica. P0 no pide datos privados ni integra ERP. La tarjeta de decisión captura inputs ficticios en navegador: `avoidableLossCents`, `mitigationCostCents`, `currency:USD`, descripción de decisión, plazo local y snapshot de probabilidad. Valores monetarios enteros en centavos, límite razonable (≤1e12 centavos), no negativos. Usar BigInt para productos cruzados, evitar floats.

Supuesto: actuar cuesta C siempre, evita completamente L si ocurre el evento y no tiene otros efectos. Umbral p*=C/L si L>0. Comparar `probabilityBps * L > C * 10000` exactamente. Si igual: indiferencia; L=0: umbral N/D y no se muestra recomendación. Si C>L: umbral >100%, no actuar por este modelo. Si p nula: sin cálculo. Pérdida esperada pL se redondea para display; no es ahorro probado.

**Umbral de referencia público (ADR-030):** cuando un taker propone una pregunta, declara solo la razón `C/L` como `referenceThresholdBps` (p. ej. 5500), nunca los montos. Ese umbral queda en la spec y alimenta el P&L de decisión del perfil ([10-reputation](10-reputation.md)). El cálculo local con montos sigue siendo privado del navegador.

Ejemplo C=11000, L=20000, threshold 55%; p=65% → 13000 USD de pérdida esperada sin actuar. Mostrar “Revisar alternativa”, no instrucción automática. Modelo ignora riesgo residual, efectos indirectos y aversión al riesgo. No emplear para salud/evacuación, finanzas ni operación real en MVP.
