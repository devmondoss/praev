# Usuarios, permisos y beneficiarios

**Estado:** P0 · **Versión:** 1.1 · **Fecha:** 2026-11-26

| Rol | Puede hacer | No puede hacer |
|---|---|---|
| Visitante | Leer radar, evento, forecast, evidencia y verificador; simular decisión local | Escribir en ledger sin firma |
| Maker humano | Conectar wallet, armar y sellar su tesis, actualizarla hasta el cierre, descargar su recibo, ver su perfil | Alterar tesis ajena, ver tesis ajenas antes del cierre o editar un registro antiguo |
| Taker | Proponer una pregunta firmada con su contexto de decisión y umbral de referencia; usar el Decision Register | Publicar la pregunta sin curador, influir en su resolución o ver tesis antes del cierre |
| Agente de IA (rival y brief) | Generar el brief de evidencia y sellar su tesis como rival con su cuenta | Sugerir probabilidades a humanos, resolver o actuar como humano verificado |
| Curador | Crear borrador, revisar y publicar pregunta | Modificar especificación abierta |
| Resolver | Registrar evidencia y resultado de pregunta asignada | Pronosticar con esa misma identidad, editar score |
| Operador | Desplegar, reconciliar y monitorizar | Cambiar forecast/resolución a través de DB |

Un humano puede controlar varias wallets; no se afirma identidad única. Una empresa real no participa en el MVP: modo decisión es demostración sin datos sensibles. Admin usa acciones CLI locales o script autenticado por cuenta operativa; no construir panel multiusuario ni passwords. Lecturas públicas devuelven solo datos permitidos.
