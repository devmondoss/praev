#![no_std]
//! praev registry: preguntas, tesis selladas y resoluciones en Stellar.
//!
//! El contrato guarda hashes y tiempos, nunca la probabilidad ni los
//! fundamentos: cada tesis entra como `commitment = SHA256(c14n(ThesisPayload))`
//! (ADR-026). Interfaz: docs/06-stellar/02-contract-interface.md.
//! `resolve`, `invalidate` y `cancel` llegan con HU-15.

use soroban_sdk::{
    contract, contracterror, contractevent, contractimpl, contracttype, Address, BytesN, Env,
};

/// Versión del esquema de almacenamiento.
pub const SCHEMA_VERSION: u32 = 1;

/// TTL (ADR-020): cada escritura lleva la entrada y la instancia a ≥ 518 400
/// ledgers (≈ 30 días) si les quedan menos de 259 200 (≈ 15 días).
pub const TTL_THRESHOLD: u32 = 259_200;
pub const TTL_EXTEND_TO: u32 = 518_400;

pub const MODE_LIVE: u32 = 0;
pub const MODE_DEMO: u32 = 1;

pub const TERMINAL_ACTIVE: u32 = 0;
pub const TERMINAL_RESOLVED: u32 = 1;
pub const TERMINAL_INVALID: u32 = 2;
pub const TERMINAL_CANCELLED: u32 = 3;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    NotFound = 1,
    Exists = 2,
    InvalidTime = 3,
    Closed = 4,
    Terminal = 5,
    /// Reservado: sin uso desde ADR-026, el contrato no ve la probabilidad.
    InvalidProbability = 6,
    InvalidSequence = 7,
    InvalidOutcome = 8,
    InvalidMode = 9,
    InvalidHash = 10,
    RoleConflict = 11,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Question {
    pub spec_hash: BytesN<32>,
    pub curator: Address,
    pub resolver: Address,
    /// 0 LIVE, 1 DEMO.
    pub mode: u32,
    pub closes_at: u64,
    pub observation_start: u64,
    pub observation_end: u64,
    pub resolve_after: u64,
    pub resolve_by: u64,
    /// 0 activa, 1 resuelta, 2 inválida, 3 cancelada.
    pub terminal: u32,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Forecast {
    /// SHA256(c14n(ThesisPayload)) con sal de 32 bytes (ADR-026).
    pub commitment: BytesN<32>,
    pub submitted_at: u64,
    pub seq: u32,
}

#[contracttype]
#[derive(Clone)]
enum DataKey {
    Curator,
    SchemaVersion,
    Question(BytesN<32>),
    Forecast(BytesN<32>, Address, u32),
    LatestSeq(BytesN<32>, Address),
}

/// Pregunta creada. El verificador compara estos campos con la spec.
#[contractevent(topics = ["q_created"])]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct QuestionCreated {
    #[topic]
    pub id: BytesN<32>,
    pub spec_hash: BytesN<32>,
    pub curator: Address,
    pub resolver: Address,
    pub mode: u32,
    pub closes_at: u64,
    pub observation_start: u64,
    pub observation_end: u64,
    pub resolve_after: u64,
    pub resolve_by: u64,
}

/// Tesis sellada: solo el compromiso, nunca la probabilidad.
#[contractevent(topics = ["forecast"])]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ForecastSubmitted {
    #[topic]
    pub id: BytesN<32>,
    #[topic]
    pub forecaster: Address,
    pub seq: u32,
    pub commitment: BytesN<32>,
    pub submitted_at: u64,
}

#[contract]
pub struct PraevRegistry;

#[contractimpl]
impl PraevRegistry {
    pub fn __constructor(env: Env, curator: Address) {
        let instance = env.storage().instance();
        instance.set(&DataKey::Curator, &curator);
        instance.set(&DataKey::SchemaVersion, &SCHEMA_VERSION);
        instance.extend_ttl(TTL_THRESHOLD, TTL_EXTEND_TO);
    }

    /// Ancla una pregunta con su `spec_hash` y sus tiempos. Solo el curador.
    #[allow(clippy::too_many_arguments)]
    pub fn create_question(
        env: Env,
        id: BytesN<32>,
        spec_hash: BytesN<32>,
        resolver: Address,
        mode: u32,
        closes_at: u64,
        observation_start: u64,
        observation_end: u64,
        resolve_after: u64,
        resolve_by: u64,
    ) -> Result<(), Error> {
        let curator = Self::curator(env.clone());
        curator.require_auth();

        if resolver == curator {
            return Err(Error::RoleConflict);
        }
        if is_zero(&id) || is_zero(&spec_hash) {
            return Err(Error::InvalidHash);
        }
        if mode != MODE_LIVE && mode != MODE_DEMO {
            return Err(Error::InvalidMode);
        }
        let now = env.ledger().timestamp();
        let ordered = now < closes_at
            && closes_at <= observation_start
            && observation_start < observation_end
            && observation_end <= resolve_after
            && resolve_after < resolve_by;
        if !ordered {
            return Err(Error::InvalidTime);
        }

        let key = DataKey::Question(id.clone());
        let storage = env.storage().persistent();
        if storage.has(&key) {
            return Err(Error::Exists);
        }

        let question = Question {
            spec_hash: spec_hash.clone(),
            curator: curator.clone(),
            resolver: resolver.clone(),
            mode,
            closes_at,
            observation_start,
            observation_end,
            resolve_after,
            resolve_by,
            terminal: TERMINAL_ACTIVE,
        };
        storage.set(&key, &question);
        storage.extend_ttl(&key, TTL_THRESHOLD, TTL_EXTEND_TO);
        env.storage()
            .instance()
            .extend_ttl(TTL_THRESHOLD, TTL_EXTEND_TO);

        QuestionCreated {
            id,
            spec_hash,
            curator,
            resolver,
            mode,
            closes_at,
            observation_start,
            observation_end,
            resolve_after,
            resolve_by,
        }
        .publish(&env);
        Ok(())
    }

    /// Sella la versión `seq` de la tesis de `forecaster`. Append-only: cada
    /// versión conserva su propia prueba; `seq` debe ser la siguiente exacta.
    pub fn submit_forecast(
        env: Env,
        id: BytesN<32>,
        forecaster: Address,
        seq: u32,
        commitment: BytesN<32>,
    ) -> Result<(), Error> {
        forecaster.require_auth();

        let question = Self::get_question(env.clone(), id.clone())?;
        if forecaster == question.curator || forecaster == question.resolver {
            return Err(Error::RoleConflict);
        }
        if question.terminal != TERMINAL_ACTIVE {
            return Err(Error::Terminal);
        }
        let now = env.ledger().timestamp();
        if now >= question.closes_at {
            return Err(Error::Closed);
        }
        if is_zero(&commitment) {
            return Err(Error::InvalidHash);
        }
        let latest = Self::get_latest_seq(env.clone(), id.clone(), forecaster.clone());
        if latest.checked_add(1) != Some(seq) {
            return Err(Error::InvalidSequence);
        }

        let storage = env.storage().persistent();
        let forecast_key = DataKey::Forecast(id.clone(), forecaster.clone(), seq);
        let latest_key = DataKey::LatestSeq(id.clone(), forecaster.clone());
        let question_key = DataKey::Question(id.clone());
        storage.set(
            &forecast_key,
            &Forecast {
                commitment: commitment.clone(),
                submitted_at: now,
                seq,
            },
        );
        storage.set(&latest_key, &seq);
        for key in [&forecast_key, &latest_key, &question_key] {
            storage.extend_ttl(key, TTL_THRESHOLD, TTL_EXTEND_TO);
        }
        env.storage()
            .instance()
            .extend_ttl(TTL_THRESHOLD, TTL_EXTEND_TO);

        ForecastSubmitted {
            id,
            forecaster,
            seq,
            commitment,
            submitted_at: now,
        }
        .publish(&env);
        Ok(())
    }

    pub fn curator(env: Env) -> Address {
        env.storage().instance().get(&DataKey::Curator).unwrap()
    }

    pub fn schema_version(env: Env) -> u32 {
        env.storage()
            .instance()
            .get(&DataKey::SchemaVersion)
            .unwrap_or(0)
    }

    pub fn get_question(env: Env, id: BytesN<32>) -> Result<Question, Error> {
        env.storage()
            .persistent()
            .get(&DataKey::Question(id))
            .ok_or(Error::NotFound)
    }

    pub fn get_forecast(
        env: Env,
        id: BytesN<32>,
        forecaster: Address,
        seq: u32,
    ) -> Result<Forecast, Error> {
        env.storage()
            .persistent()
            .get(&DataKey::Forecast(id, forecaster, seq))
            .ok_or(Error::NotFound)
    }

    /// 0 si el maker todavía no selló ninguna versión.
    pub fn get_latest_seq(env: Env, id: BytesN<32>, forecaster: Address) -> u32 {
        env.storage()
            .persistent()
            .get(&DataKey::LatestSeq(id, forecaster))
            .unwrap_or(0)
    }
}

fn is_zero(hash: &BytesN<32>) -> bool {
    hash.to_array() == [0u8; 32]
}

#[cfg(test)]
mod test;
