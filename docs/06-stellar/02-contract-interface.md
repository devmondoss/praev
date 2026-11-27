# Interfaz contractual PraevRegistry

**Estado:** P0 especificación Rust, no contrato compilado · **Versión:** 1.1 · **Fecha:** 2026-11-26

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
```
Constructor fija curator; crear pregunta exige curator.require_auth() y resolver distinto. IDs y hashes de 32 bytes; rechazar hash todo cero. El contrato almacena tiempos estructurados además del hash: el verificador compara campos contra spec. `create` exige ahora < close, tiempos ordenados y mode válido. `submit` require_auth(forecaster); excluir curator y resolver; t<close; seq esperado; compromiso distinto de cero; terminal active. El contrato **no ve la probabilidad** (tesis sellada, ADR-026): el rango se valida en `prepare` y al revelar, off-chain. `resolve` require_auth(resolver); t en [resolveAfter,resolveBy]; outcome solo 0/1; terminal active. `invalidate` resolver y t≥resolveAfter; `cancel` curator y t<close. Terminal no mutable. No calcular Brier ni iterar direcciones on-chain en P0; reputación recalculable off-chain desde pruebas.

Errores propuestos `NotFound=1, Exists=2, InvalidTime=3, Closed=4, Terminal=5, InvalidProbability=6 (reservado, sin uso desde ADR-026), InvalidSequence=7, InvalidOutcome=8, InvalidMode=9, InvalidHash=10, RoleConflict=11`. Auth falla mediante host. No confiar en address enviado sin auth. Criterio: test de constructor, roles, timestamps límite, duplicate y replay, get methods, eventos y rollback.
