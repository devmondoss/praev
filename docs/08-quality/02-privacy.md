# Privacidad, gobernanza y ética

**Estado:** P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

Datos públicos: address técnica, p, fechas, pregunta, tipo declarado, evidencia permitida. Informar al usuario que on-chain no se puede prometer borrado; no poner nombres, emails, coordenadas privadas, datos de clientes ni secretos. Rationale opcional, evitar PII, validar tamaño. Si usuario incluye información personal, no prometer que hash la oculta ante ataques de diccionario. Moderar y no publicar contenido sensible.

Decision demo local, no analytics de inputs. Borrado local explícito. Datos reales de empresa fuera de P0; futuro RBAC, aislamiento tenant, retención, cifrado y consentimiento. Logs con requestId, tx hash y códigos, nunca raw secret ni prompt con datos sensibles. Limitar retención off-chain según necesidades; documentar términos/licencias de datasets.

Gobernanza: curador y resolver separados, patrocinio no P0, criterios de resolución congelados, conflictos de interés declarados, anulaciones visibles, no cambiar historial. No reemplazar alerta oficial ni decir a comunidad que tome acción peligrosa basada solo en probabilidad. No claims de daño evitado. Revisión legal y regulatoria antes de comercializar pagos/servicios, especialmente datos y no custodia.
