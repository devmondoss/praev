# 04 · Producto y alcance del MVP

## Usuarios y trabajos a resolver

| Rol | Job to be done | Acciones |
|---|---|---|
| Decisor | Reducir incertidumbre antes de actuar | Explorar, consultar consenso, solicitar pregunta, comprar análisis |
| Forecaster humano | Demostrar capacidad y cobrar por conocimiento | Conectar wallet, registrar probabilidades, abrir compromiso, publicar análisis |
| Agente IA | Construir historial comparable | Registrar versión, firmar predicción vía integración, consultar score |
| Curador/resolvedor | Mantener preguntas útiles y auditables | Validar reglas, publicar resolución y evidencia |

## Módulos y prioridad

| Módulo | P0: demo obligatoria | P1: después de P0 | P2: posterior |
|---|---|---|---|
| Relevance | Curación manual, rúbrica y evidencia | Sugerencias asistidas | Personalización por organización |
| ID | Perfil wallet, humano/agente y versión | Export de credencial | Emisores independientes |
| Verify | Compromiso, apertura, resultado y enlaces de cadena | Disputas avanzadas | Fuentes independientes múltiples |
| Score | Brier, muestra, baseline y dominio | Calibración por bins | Robustez y métricas avanzadas |
| Consensus | Media regularizada ponderada | Historial de cortes | Correlación y modelos calibrados |
| Pay | Compra fija en activo de prueba Stellar | Recarga guiada y fees reales de red | Proveedor fiat evaluado |
| Protocol | Contratos Soroban desplegados en testnet | Modularización | Gobernanza multiemisor |
| SDK | CLI o cliente mínimo reproducible | SDK publicado | Integraciones externas |

## Flujo vertical prioritario

1. Entrar sin wallet y ver una pregunta, por qué importa y su fuente.
2. Conectar una wallet Stellar para registrar identidad o realizar una acción firmada.
3. Registrar pronósticos de al menos un humano y un agente, con probabilidad y razonamiento opcional. Guardar el secreto de apertura de forma recuperable por su titular.
4. Comprobar el compromiso en testnet; mostrar estado pendiente/confirmado.
5. Abrir compromisos después del cierre de envío y antes de comenzar la ventana observable. Mostrar qué entradas fueron válidas y cuáles faltan.
6. Mostrar consenso y score derivado de historial anterior; cuando no hay historial, usar baseline explícito y estado provisional.
7. Comprar un informe de demostración con un activo de prueba, precio fijo, firma propia y recibo verificable.
8. Resolver con evidencia identificada, actualizar score y publicar snapshot verificable.

## Requisitos funcionales

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| F01 | Explorar preguntas | Tarjeta incluye beneficiario, decisión, plazo y resolución |
| F02 | Publicar pregunta | Revisor autorizado, reglas versionadas y hash visible |
| F03 | Identidad | Dirección Stellar firmada, tipo declarado y versión de agente |
| F04 | Comprometer | Rechaza duplicado y fuera de plazo; evidencia en explorador |
| F05 | Abrir | Recalcula hash exacto, valida firma y ventana |
| F06 | Resolver | Solo rol autorizado, resultado y evidencia; una resolución final |
| F07 | Medir | Brier reproducible a partir de registros válidos; muestra y versión |
| F08 | Agregar | Pesos definidos antes del evento; no usa su resultado |
| F09 | Pagar | Transferencia autorizada por comprador, precio visible, sin saldo interno |
| F10 | Desbloquear | Valida recibo final, destinatario, monto y producto; idempotente |
| F11 | Auditar | Un tercero puede verificar hashes, estados y transacciones |
| F12 | Agente | Ejemplo ejecutable con wallet separada y versión identificada |

## No objetivos de P0

Exchange, apuestas, tokens especulativos, posiciones negociables, integración cross-chain, fiat real, KYC propio, entrenamiento de modelos de frontera, app nativa, gobernanza DAO, registro universal de identidades, automatización de oráculos, promesas de rendimiento. No requerir suscripción para consultar preguntas públicas.

## Definición de listo

Aplicación utilizable, código reproducible, contratos testnet con IDs y transacciones, prueba de cierre/apertura/resolución, score recalculable, pago de prueba con autorización real en testnet, estados de error, documentación y demo de tres minutos. Si falta algo, marcarlo como pendiente, no sustituirlo con una animación que simule éxito.
