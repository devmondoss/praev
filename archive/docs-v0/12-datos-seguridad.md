# 12 · Datos, seguridad y operación

## Modelo lógico

| Entidad | Claves y campos críticos |
|---|---|
| profiles | id, stellar_address único, kind, metadata_hash, active_version |
| agent_versions | profile_id, version, model/config_hash, declared_at |
| questions | id/version, rules_hash, status, deadlines, domain, decision_context |
| relevance_reviews | question_id, rubric_version, componentes, evidence, reviewer |
| forecasts | question_id + profile/version únicos P0, commit_hash, p_bps nullable, commit/reveal tx, status |
| resolutions | question_id/version, outcome, evidence_hash, source, final tx |
| score_snapshots | profile/domain/cutoff/method_version, n, Brier, score, dataset_hash, anchor tx |
| consensus_snapshots | question_id/cutoff/method_version, probability, n, weights manifest |
| offers | id, seller, report_hash, asset, amount, fee, expiry, terms_hash |
| purchases | purchase_id único, buyer, offer, status, confirmed tx |
| entitlements | purchase_id único, buyer, report_id, access status |
| chain_events | contract + tx/event index únicos, ledger, cursor, raw event |

Restricciones de rango, foreign keys, índices por dominio/estado/cutoff. No almacenar salts previos al reveal en tablas públicas. No usar floats para dinero ni identificadores de activos ambiguos. Datos de prueba separados de producción. El DB no autoriza transacciones de usuarios.

## Amenazas y mitigaciones

| Riesgo | Mitigación P0 / pendiente |
|---|---|
| Editar predicción | Commit inmutable, reglas hash, ventanas |
| Copiar consenso | Commit/reveal y consenso posterior al cierre |
| Ocultar errores | Registro de commits no abiertos, cobertura y exclusiones |
| Sybil y colusión | Etiqueta identidad declarada, revisión, límites; unicidad humana no resuelta |
| Información futura | Cutoffs explícitos, datasets y benchmark fuera de muestra |
| Oráculo incorrecto | Fuente predefinida, evidencia, cancelación/corrección versionada |
| Robo de claves | Wallet externa, nunca pedir seed, CSP, revisión de dependencias |
| Replay y compra doble | Domain separation, nonce, purchase ID, idempotencia |
| Manipulación de score | Dataset hash, algoritmo reproducible, revisión de completitud |
| Exposición de informes | Acceso por prueba de control, ACL, evitar URLs públicas permanentes |
| Indexación desactualizada | Cursor durable, reconciliación y etiqueta de actualización |
| Abuso de roles | Autorización mínima, separación de funciones y política visible |

## Privacidad

No almacenar en ledger nombres civiles, teléfonos, email, documentos, secretos ni datos sensibles. Una dirección pública puede ser asociable a una persona: explicar permanencia y trazabilidad antes de firma. Un hash no anonimiza por sí solo. Retención y supresión off-chain; no prometer borrar un ledger inmutable. Consentimiento para publicar razonamiento, licencia de acceso a informes, política de uso de datos de agentes y fuentes. Nunca publicar archivos privados de investigación en repositorio público.

## Operación

Secretos de infraestructura en variables de entorno, `.env.example` sin valores reales. Separar testnet/mainnet por configuración y bloquear mainnet en P0. CI lint/typecheck/unit/integration/contract tests. Logs estructurados sin secrets, alerts sobre lag, error de transacción, acceso pendiente, score fallido. Backups de DB y evidencia; restauración de índices desde ledger. Registro de cambios de metodología y decisiones de seguridad. No prometer SLA ni auditoría hasta realizarla.
