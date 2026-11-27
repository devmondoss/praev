# Recorridos del producto

**Estado:** P0 · **Versión:** 1.1 · **Fecha:** 2026-11-26

**Visitante:** abre `/`, filtra LIVE/DEMO, lee pregunta y por qué importa, inspecciona fuentes, compara forecasts y baseline, visita verificador. No modal de registro.

**Maker:** detalle → lee la regla, el gráfico de la serie oficial, el ancla y el brief de evidencia → arma su tesis (probabilidad, ancla, hasta 3 factores, evidencia, qué le haría cambiar de opinión, nota) → revisión: "Tu tesis quedará sellada hasta el cierre y luego será pública junto a tu dirección" → firma → pending → success con tx y descarga del recibo de sellado. Si cancela, conservar borrador; si falla, no contar la tesis. Puede sellar una nueva versión hasta el cierre. Tras la resolución ve su perfil actualizado.

**Agente:** el operador genera el brief con el bundle permitido → lo revisa y publica → después ejecuta el rival con el mismo bundle → JSON validado → confirmación → firma con la cuenta del agente → indexación. El agente no recibe la llave como herramienta.

**Taker:** conecta wallet → "Proponer pregunta": qué quiere saber, para qué decisión, fecha límite para decidir, fuente sugerida y razón C/L (sin montos) → firma el mensaje → ve el estado de su propuesta → cuando el curador la publica, la sigue y al cierre recibe el consenso revelado. El cálculo con montos reales lo hace en el Decision Register local.

**Decisor demo:** en detalle introduce coste y pérdida evitable ficticios → compara umbral → registra acción/espera/revisión y rationale privado en sesión local → exporta snapshot JSON opcional. No firma ni usa datos de una empresa real.

**Resolver:** consulta evidencia tras cierre/ventana → verifica regla → simula resolución → firma → confirma → recalcula score → prueba desde `/verify`. Fixture sintético separado de live.

Aceptación: probar recorridos en escritorio y móvil (lectura y decisión), escritorio con wallet para firma. No ocultar fallos de red.
