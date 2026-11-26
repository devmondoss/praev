# Recorridos del producto

**Estado:** P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

**Visitante:** abre `/`, filtra LIVE/DEMO, lee pregunta y por qué importa, inspecciona fuentes, compara forecasts y baseline, visita verificador. No modal de registro.

**Humano:** detalle → slider/input 0–100 → rationale breve opcional → revisión de contenido público y red → firma → pending → success con tx. Si cancela, conservar borrador y permitir retry; si falla, no actualizar consenso. Puede añadir versión hasta cutoff; mostrar anterior.

**Agente:** operador ejecuta script con bundle de fuentes permitido → JSON validado → confirmación del operador → firma de cuenta testnet del agente → indexación. El agente no recibe la llave como herramienta.

**Decisor demo:** en detalle introduce coste y pérdida evitable ficticios → compara umbral → registra acción/espera/revisión y rationale privado en sesión local → exporta snapshot JSON opcional. No firma ni usa datos de una empresa real.

**Resolver:** consulta evidencia tras cierre/ventana → verifica regla → simula resolución → firma → confirma → recalcula score → prueba desde `/verify`. Fixture sintético separado de live.

Aceptación: probar recorridos en escritorio y móvil (lectura y decisión), escritorio con wallet para firma. No ocultar fallos de red.
