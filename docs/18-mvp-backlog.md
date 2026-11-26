# 18 · MVP y backlog de la buildathon

Fecha: 26 nov 2026. Entrega: 4 dic 2026, 23:59 (Lima). Desarrollo a cargo de una sola persona.

Este documento concreta qué se construye en los 9 días que quedan. Cuando algo choque con los documentos 04, 06, 07 o 09, manda este, y las diferencias se explican al final.

## 1. Qué construimos

Un único flujo vertical, real en Stellar Testnet, que demuestra la tesis de PRAEV de punta a punta:

1. Un curador publica una pregunta con reglas, fuente y relevancia (el hash de las reglas queda on-chain).
2. Un humano (wallet Freighter) y un agente de IA (LLM real con su propia wallet) **sellan** sus pronósticos con commit.
3. Cerrada la ventana, ambos **revelan** y el contrato verifica que el hash coincide.
4. El resolvedor publica el resultado con el hash de la evidencia.
5. El backend calcula Brier, score y consenso; el snapshot del cálculo se **ancla** on-chain.
6. Un comprador paga un informe en **USDC de testnet** de forma atómica y sin custodia, y recibe un recibo y acceso.
7. Cualquiera puede verificar hashes, transacciones y recálculo desde la vista "Verificar".

Fuera de P0: relevance automática, disputas, roles separados por persona, calibración por bins, SDK publicado, on-ramp fiat, passkeys, credenciales W3C.

## 2. Base en Soroban

Se despliegan dos contratos. No usamos OpenZeppelin porque sus crates exigen `soroban-sdk ^28` y solo necesitamos un rol de administrador, que son unas pocas líneas.

### 2.1 `praev_registry`

| Función | Quién firma | Reglas |
|---|---|---|
| `__constructor(admin)` | despliegue | Se ejecuta una sola vez, así que no hay `init` que se pueda repetir. En P0 el admin actúa como curador, resolvedor y publicador de score (resolución centralizada declarada). |
| `register_profile(owner, kind, metadata_hash)` | owner | `kind = Human \| Agent`. Si se vuelve a registrar, sube `version` (nueva cohorte para un agente). |
| `create_question(rules_hash, domain, commit_deadline, reveal_deadline, resolve_after) -> u64` | admin | `now < commit_deadline < reveal_deadline <= resolve_after`. ID secuencial. |
| `commit(forecaster, question_id, commitment)` | forecaster | Perfil registrado, `now < commit_deadline` y un solo commit por pregunta. |
| `reveal(forecaster, question_id, p_bps, reasoning_hash, salt)` | forecaster | `commit_deadline <= now < reveal_deadline`, `p_bps <= 10000`; el hash recalculado debe coincidir. |
| `resolve(question_id, outcome, evidence_hash)` | admin | `now >= resolve_after`. `outcome = No \| Yes \| Cancelled`. Final y única. |
| `anchor_snapshot(domain, cutoff, method_version, dataset_hash) -> u64` | admin | Inmutable. `cutoff <= now`. |
| `get_question`, `get_forecast`, `get_profile`, `get_snapshot` | lectura | — |

**Commitment.** Es el `sha256` del XDR de este `#[contracttype]`:

```rust
pub struct ForecastPayload {
    pub domain: String,          // "praev.forecast.v1"
    pub contract: Address,       // este contrato
    pub question_id: u64,
    pub forecaster: Address,     // impide copiar el commit de otro
    pub p_bps: u32,              // 0..=10000
    pub reasoning_hash: BytesN<32>,
    pub salt: BytesN<32>,        // 32 bytes aleatorios
}
```

En TypeScript se obtiene lo mismo con `nativeToScVal(payload, { type: {...} }).toXDR()` y luego `sha256`. Hay que dar tipos explícitos a cada campo; v17 devuelve `Uint8Array`. Un **vector de prueba compartido** (`fixtures/commitment-v1.json`) se ejecuta en los tests de Rust y de TS desde el día 1. Si no coinciden, se cambia a bytes concatenados de longitud fija.

**Almacenamiento.**
- `instance`: guarda `admin`, `next_question_id` y `next_snapshot_id`.
- `persistent`: guarda `Profile(Address)`, `Question(u64)`, `Forecast(u64, Address)` y `Snapshot(u64)`.
- En cada escritura se llama a `extend_ttl(threshold ≈ 7 días, extend_to ≈ 30 días)`. En testnet, una entrada persistente se archiva a los ~7 días sin extensión.
- No hay listas ni iteraciones on-chain. La lista de pronósticos sale de los eventos.

**Eventos** (`#[contractevent]`): `profile_registered`, `question_created`, `forecast_committed`, `forecast_revealed`, `question_resolved`, `snapshot_anchored`.

### 2.2 `praev_payments`

| Función | Quién firma | Reglas |
|---|---|---|
| `__constructor(admin, token, fee_recipient, max_fee_bps)` | despliegue | `token` = SAC del USDC de testnet. Un solo activo permitido. |
| `create_offer(seller, content_hash, price, fee_bps, expires_at) -> u64` | seller | `price > 0`, `fee_bps <= max_fee_bps`. |
| `purchase(buyer, offer_id, expected_price, expected_content_hash) -> u64` | buyer | Oferta vigente, términos idénticos, `buyer != seller`, un recibo por (oferta, comprador). Hace dos `transfer` del comprador al vendedor y a la comisión dentro de la misma invocación: si una falla, se revierte todo. |
| `get_offer`, `get_receipt`, `has_access(offer_id, buyer)` | lectura | — |

Reglas de cobro: `fee = price * fee_bps / 10000` (división entera) y `seller = price - fee`. El router nunca guarda saldo. Evento: `offer_created`, `purchase_completed`.

**Activo.** Usamos el USDC de Circle en testnet:
- Emisor: `GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5`.
- SAC: `CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA`. Lo calculamos con `Asset.contractId`; Circle no lo publica, así que hay que confirmarlo al desplegar.

Para usarlo:
- Comprador y vendedor necesitan una trustline de USDC.
- El faucet da 20 USDC cada 2 h.
- Si eso nos bloquea, emitimos nuestro propio activo `TESTUSD` y lo desplegamos con `stellar contract asset deploy`, etiquetado como de prueba.

## 3. Off-chain

| Pieza | Decisión |
|---|---|
| `packages/core` (TS) | Commitment, Brier, score regularizado (k=20, b0=0.25), consenso ponderado, dataset canónico y su hash. Tests con los valores de [16](16-pruebas-demo.md). |
| `apps/web` | Next.js en Vercel. La API vive en route handlers (`/api/v1/...`); no hay un `apps/api` aparte, para ahorrar tiempo. Wallet: Stellar Wallets Kit (Freighter). |
| Indexador | Postgres (Neon). Guarda un cursor durable de `getEvents`, que solo retiene ~7 días. La sincronización corre al leer y con `pnpm sync`. Es idempotente por `(tx_hash, event_index)`. |
| Secreto del commit | Se guarda en el navegador del usuario y se puede exportar como JSON. Nunca llega al backend antes del reveal. |
| `examples/agent` | CLI en Node. Lee la pregunta, pide al LLM una probabilidad y un razonamiento, firma con su propia clave y guarda el payload sellado. `reveal` se hace después. El modelo y la versión quedan en `metadata_hash` del perfil. |
| Informes | Archivo markdown privado por oferta. Se entrega solo si `has_access` devuelve true y el comprador firma un challenge. |

## 4. Stack fijado

| Herramienta | Versión |
|---|---|
| Rust | ≥ 1.91 (local 1.98), target `wasm32v1-none` |
| stellar-cli | 30.0.1 |
| soroban-sdk | `=30.0.0`. Si falla el spike del día 1, `=28.0.0` |
| Node | ≥ 22.12 (local 24) con pnpm |
| @stellar/stellar-sdk | 17.4.0 (bindings con `npx @stellar/stellar-sdk generate`) |
| @creit.tech/stellar-wallets-kit | 2.8.0 |
| Red | Testnet, protocolo 30. Ledger ≈ 5 s. No hay reset programado en 2026. |

## 5. Backlog

Estimaciones en horas de una persona. La columna "Día" es el plan de la sección 6.

### E0 · Base del proyecto
| ID | Historia | Prio | h | Día | Aceptación |
|---|---|---|---:|---|---|
| E0-1 | Instalar stellar-cli 30.0.1 y target `wasm32v1-none`, y compilar un contrato hola mundo | P0 | 1 | 26 | `stellar contract build` genera el `.wasm` |
| E0-2 | Monorepo pnpm: `contracts/`, `packages/core`, `apps/web`, `examples/agent`, `fixtures/` | P0 | 1 | 26 | `pnpm install` y `cargo test` corren desde la raíz |
| E0-3 | Cuentas testnet `admin`, `human`, `agent`, `buyer`, con fondos y trustline USDC | P0 | 1 | 27 | Saldos visibles en Stellar Expert |
| E0-4 | CI en GitHub Actions: `cargo test` y `pnpm test` | P0 | 1 | 3 | Check verde en `main` |

### E1 · Contrato registry
| ID | Historia | Prio | h | Día | Aceptación |
|---|---|---|---:|---|---|
| E1-1 | Tipos, storage, constructor y `register_profile` | P0 | 2 | 26 | Test: owner firma; un tercero no puede |
| E1-2 | Vector de commitment compartido Rust ↔ TS | P0 | 2 | 26 | El mismo hash en `cargo test` y `vitest` |
| E1-3 | `create_question` con validación de plazos | P0 | 1 | 27 | T01, plazos inválidos rechazados |
| E1-4 | `commit` y `reveal` con ventanas | P0 | 3 | 27 | T03–T07 en unit tests |
| E1-5 | `resolve` único y `anchor_snapshot` | P0 | 2 | 27 | T08, segunda resolución rechazada |
| E1-6 | Eventos y `extend_ttl` en cada escritura | P0 | 1 | 27 | Eventos visibles en el test snapshot |
| E1-7 | Despliegue a testnet más un ciclo commit/reveal por CLI | P0 | 2 | 27 | IDs y tx en README → **hito Hub "Stellar testnet"** |

### E2 · Contrato payments
| ID | Historia | Prio | h | Día | Aceptación |
|---|---|---|---:|---|---|
| E2-1 | Constructor, `create_offer` y validaciones | P0 | 2 | 28 | Precio ≤ 0 y fee excesiva rechazados |
| E2-2 | `purchase` atómico con split y recibo único | P0 | 3 | 28 | T14–T16 con token mock en tests |
| E2-3 | Despliegue con el SAC de USDC y una compra real | P0 | 2 | 28 | Tx de compra, balances antes y después, router con saldo 0 |

### E3 · Núcleo de cálculo (`packages/core`)
| ID | Historia | Prio | h | Día | Aceptación |
|---|---|---|---:|---|---|
| E3-1 | Brier, score regularizado y estado provisional | P0 | 2 | 28 | T10, T11 con los valores del doc 16 |
| E3-2 | Consenso con corte temporal | P0 | 1 | 28 | T12; fixture ≈ 0.701050 |
| E3-3 | Dataset canónico y hash del snapshot | P0 | 1 | 29 | T13: alterar un registro cambia el hash |

### E4 · Indexador y API
| ID | Historia | Prio | h | Día | Aceptación |
|---|---|---|---:|---|---|
| E4-1 | Esquema Postgres (Neon) y migraciones | P0 | 1 | 29 | Tablas `events`, `questions`, `forecasts`, `profiles`, `offers`, `receipts`, `cursor` |
| E4-2 | Sincronización de eventos con cursor, idempotente | P0 | 3 | 29 | Repetir la sincronización no duplica (T17), y muestra lag y "as of" |
| E4-3 | Rutas `GET /api/v1/questions`, `/questions/:id`, `/profiles/:addr` | P0 | 2 | 29 | JSON según [11](11-api-sdk.md) |
| E4-4 | Script `seed-demo`: pregunta con ventanas de minutos | P0 | 1 | 29 | Una pregunta lista para la demo en < 1 min |

### E5 · Web
| ID | Historia | Prio | h | Día | Aceptación |
|---|---|---|---:|---|---|
| E5-1 | Layout, marca `praev.` y lista de preguntas (lectura sin wallet) | P0 | 2 | 30 | Tarjeta con decisión, plazo y fuente (F01) |
| E5-2 | Conectar wallet y registrar perfil | P0 | 2 | 30 | Firma con Freighter y estado confirmado (F03) |
| E5-3 | Pronosticar: commit, guardar el secreto, revelar | P0 | 4 | 30 | Commit y reveal confirmados, con enlace al explorador (F04, F05) |
| E5-4 | Detalle de la pregunta: estado, consenso y resultado | P0 | 2 | 1 | Muestra n, corte y versión de método (F08) |
| E5-5 | Passport: Brier, score, provisional, humano/agente | P0 | 2 | 1 | F07 |
| E5-6 | Vista Verificar: hashes, contratos, tx, recálculo | P0 | 2 | 1 | F11 |
| E5-7 | Comprar informe: oferta, firma, recibo, acceso | P0 | 3 | 1 | F09, F10, T21 |
| E5-8 | Estados de error, mobile y teclado | P0 | 2 | 3 | T19, T20, T22 |

### E6 · Agente de IA
| ID | Historia | Prio | h | Día | Aceptación |
|---|---|---|---:|---|---|
| E6-1 | CLI `praev-agent forecast <id>`: LLM, commit firmado y payload local | P0 | 3 | 2 | Tx de commit del agente en testnet (F12) |
| E6-2 | `praev-agent reveal <id>` | P0 | 1 | 2 | Reveal confirmado |
| E6-3 | Registrar el modelo y su versión en el perfil del agente | P0 | 1 | 2 | Visible en el passport (T23) |

### E7 · Entrega
| ID | Historia | Prio | h | Día | Aceptación |
|---|---|---|---:|---|---|
| E7-1 | Corrida E2E real: pregunta, 2 pronósticos, resolución, snapshot, compra | P0 | 3 | 2 | Todas las tx en la tabla de evidencias del doc 16 |
| E7-2 | Despliegue en Vercel y variables de entorno | P0 | 1 | 3 | URL pública funcionando sin sesión |
| E7-3 | README: ejecutar en local, tests, IDs, limitaciones | P0 | 2 | 3 | Clone limpio reproducible (T24) |
| E7-4 | Video ≤ 3 min y entrega en APEX | P0 | 3 | 4 | Recepción confirmada antes de las 18:00 |

### P1, si sobra tiempo (en este orden)
Fee real de PRAEV en el split · Calibración por bins · Rubric de relevance visible y editable · Separar los roles curador y resolvedor · Pago del agente por informes (x402) · SDK publicado en npm.

## 6. Plan diario

Hay que commitear todos los días en `main`. La constancia del Hub da un máximo de 5 puntos por semana: la del 23 al 29 de nov y la del 30 de nov al 6 de dic.

| Día | Foco | Cierre del día |
|---|---|---|
| Jue 26 | E0-1, E0-2, E1-1, E1-2 | Monorepo, vector de hash Rust = TS |
| Vie 27 | E0-3, E1-3 → E1-7 | **Registry en testnet** con commit y reveal reales |
| Sáb 28 | E2, E3-1, E3-2 | Payments en testnet con una compra real en USDC |
| Dom 29 | E3-3, E4 | Indexador y API leyendo testnet |
| Lun 30 | E5-1 → E5-3 | Pronosticar desde la web |
| Mar 1 | E5-4 → E5-7 | Passport, verificación y compra en la web |
| Mié 2 | E6, E7-1 | Agente funcionando y E2E completo (arrancar la pregunta temprano) |
| Jue 3 | E0-4, E5-8, E7-2, E7-3 | Deploy, CI, README y borrador del video |
| Vie 4 | E7-4 y margen | Entrega en APEX a media tarde |

## 7. Riesgos

| Riesgo | Mitigación |
|---|---|
| El hash de Rust y el de TS no coinciden | Vector compartido el día 1, con bytes concatenados como plan B |
| SDK 30 recién publicado | Spike del día 1; si da problemas, bajar a 28.0.0 |
| Eventos con retención de ~7 días | Cursor en Postgres y sincronización frecuente; lo que se quiera conservar para la evaluación se guarda en la base de datos |
| Archivo de entradas persistentes | `extend_ttl` en cada escritura; renovar justo antes de la entrega |
| Trustlines y el límite del faucet de USDC | Fondear las cuentas el viernes; plan B: `TESTUSD` |
| Una sola persona | Recortar P1 sin dudar; no recortar pruebas on-chain ni la vista Verificar |

## 8. Diferencias con la especificación

- `create_question` asigna un ID secuencial en lugar de recibir uno del cliente.
- `propose_resolution` y `finalize_resolution` se unen en `resolve` (P0 centralizado, declarado).
- `purchase` evita los cobros dobles con un recibo por (oferta, comprador), en vez de un `purchase_id` del cliente.
- La API vive dentro de `apps/web`.
- `register_identity` pasa a llamarse `register_profile`.
