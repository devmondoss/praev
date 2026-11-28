# Interfaz contractual PraevRegistry

**Estado:** P0; implementado completo (HU-13 a HU-16) · **Versión:** 1.3 · **Fecha:** 2026-11-28

Un contrato sin upgrade público, inicialización por constructor atómico. Tipos conceptuales Soroban SDK (adaptar macros exactas a SDK instalado y testear; no pegar como implementación completa):
```rust
#[contracttype]
pub struct Question {
 pub spec_hash: BytesN<32>, pub curator: Address, pub resolver: Address,
 pub mode: u32, // 0 LIVE, 1 DEMO
 pub closes_at: u64, pub observation_start: u64, pub observation_end: u64,
 pub resolve_after: u64, pub resolve_by: u64,
 pub terminal: u32, // 0 active, 1 resolved, 2 invalid, 3 cancelled
}
#[contracttype]
pub struct Forecast {
 pub commitment: BytesN<32>, // SHA256(c14n(ThesisPayload)), ADR-026
 pub submitted_at: u64, pub seq: u32,
}
#[contracttype]
pub struct Resolution {
 pub outcome: u32, // 0 NO, 1 YES, 2 INVALID
 pub evidence_hash: BytesN<32>, pub resolved_at: u64,
}
```
```rust
// firmas propuestas; e: Env en cada método
__constructor(curator: Address)
create_question(id: BytesN<32>, spec_hash: BytesN<32>, resolver: Address,
 mode: u32, closes_at: u64, observation_start: u64, observation_end: u64,
 resolve_after: u64, resolve_by: u64)
submit_forecast(id: BytesN<32>, forecaster: Address, seq: u32,
 commitment: BytesN<32>)
resolve(id: BytesN<32>, outcome: u32, evidence_hash: BytesN<32>)
invalidate(id: BytesN<32>, evidence_hash: BytesN<32>)
cancel(id: BytesN<32>, reason_hash: BytesN<32>)
get_question(id: BytesN<32>) -> Question
get_forecast(id: BytesN<32>, forecaster: Address, seq: u32) -> Forecast
get_latest_seq(id: BytesN<32>, forecaster: Address) -> u32
get_resolution(id: BytesN<32>) -> Resolution
get_cancellation(id: BytesN<32>) -> Cancellation // { reason_hash, cancelled_at }
```
Constructor fija curator; crear pregunta exige curator.require_auth() y resolver distinto. IDs y hashes de 32 bytes; rechazar hash todo cero. El contrato almacena tiempos estructurados además del hash: el verificador compara campos contra spec. `create` exige ahora < close, tiempos ordenados y mode válido. `submit` require_auth(forecaster); excluir curator y resolver; t<close; seq esperado; compromiso distinto de cero; terminal active. El contrato **no ve la probabilidad** (tesis sellada, ADR-026): el rango se valida en `prepare` y al revelar, off-chain. `resolve` require_auth(resolver); t en [resolveAfter,resolveBy]; outcome solo 0/1; terminal active. `invalidate` resolver y t≥resolveAfter; `cancel` curator y t<close. Terminal no mutable. No calcular Brier ni iterar direcciones on-chain en P0; reputación recalculable off-chain desde pruebas.

Errores propuestos `NotFound=1, Exists=2, InvalidTime=3, Closed=4, Terminal=5, InvalidProbability=6 (reservado, sin uso desde ADR-026), InvalidSequence=7, InvalidOutcome=8, InvalidMode=9, InvalidHash=10, RoleConflict=11`. Auth falla mediante host. No confiar en address enviado sin auth. Criterio: test de constructor, roles, timestamps límite, duplicate y replay, get methods, eventos y rollback.

**Implementación (HU-13, HU-14; 27 nov).** `contracts/praev-registry/src/lib.rs` con soroban-sdk 30.0.0. Los métodos que pueden fallar devuelven `Result<_, Error>` con el `#[contracterror]` de arriba, así los bindings TS reciben el código tipado; los fallos de firma los rechaza el host (no son un `Error` del contrato). Orden de validación en `create_question`: auth del curador, `RoleConflict`, `InvalidHash` (id o spec_hash en cero), `InvalidMode`, `InvalidTime` (`now < closes_at ≤ observation_start < observation_end ≤ resolve_after < resolve_by`) y `Exists`. En `submit_forecast`: auth del maker, `NotFound`, `RoleConflict`, `Terminal`, `Closed` (`now ≥ closes_at`), `InvalidHash` y `InvalidSequence` (`seq = latest + 1`). Getters: `curator`, `schema_version`, `get_question`, `get_forecast` (`NotFound` si falta) y `get_latest_seq` (0 sin tesis). Tests T01–T08 en `src/test.rs`, cada llamada firmada solo por la cuenta que corresponde, sin `mock_all_auths`.

**Implementación (HU-15; 28 nov).** Las tres transiciones leen la pregunta primero (`NotFound`) y piden la firma de la cuenta guardada en ella, no de una dirección recibida. `resolve`: auth del resolvedor, `Terminal`, `InvalidOutcome` (solo 0/1), `InvalidTime` (fuera de `[resolve_after, resolve_by]`, ambos extremos incluidos) e `InvalidHash`. `invalidate`: auth del resolvedor, `Terminal`, `InvalidTime` (`now < resolve_after`; sin límite superior, para invalidar cuando la fuente no publicó a tiempo) e `InvalidHash`; guarda `Resolution{outcome: 2}`. `cancel`: auth del curador, `Terminal`, `Closed` (`now ≥ closes_at`) e `InvalidHash`; guarda `Cancellation{reason_hash, cancelled_at}` en `CancelReason(id)` y no crea `Resolution`. Un segundo intento terminal devuelve `Terminal` y no cambia nada. `get_cancellation` se añade a los getters para que el verificador lea el motivo sin depender del índice de eventos. Tests T09–T11 en `src/test.rs`.
