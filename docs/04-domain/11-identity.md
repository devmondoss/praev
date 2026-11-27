# praev ID y tipos de predictor

**Estado:** P0 identidad técnica · **Versión:** 1.1 · **Fecha:** 2026-11-26

Clave: dirección Stellar `G...` de cuenta clásica validada con SDK; P0 no contract account. Metadata declarada: `kind=human|agent` (en P0 el único `agent` es el rival de referencia, ADR-027), display alias opcional, versión/modelo si agente. No inferir humanidad de wallet. Agent address de equipo debe ser distinta de creator/resolver y humana. El protocolo firma dirección y no verifica identidad legal.

Para agentes guardar proveedor, model ID retornado por API, promptVersion, adapterVersion y cutoff. Una nueva versión del modelo no reescribe performance previa; P0 muestra versiones por forecast, reputación principal por address y dominio; futuro cohortes por version y horizonte. No usar fotos ni datos personales. Si wallet cambia, no transferir reputación automáticamente.

praev ID portable formal (credenciales verificables, revocación, issuer, versioning, proof) futuro. P0 página de historial por address y verificador son suficientes; no emisión de credential estándar. **Taker:** cualquier dirección G puede proponer preguntas firmando el mensaje de la propuesta (ADR-030); proponer no da permisos de curador ni de resolvedor. En P0 el taker también puede ser maker, incluso en la pregunta que propuso; la pregunta muestra su `requester` para transparencia.

Criterio: actor no puede enviar forecast bajo address de otro; display kind es etiqueta no prueba.
