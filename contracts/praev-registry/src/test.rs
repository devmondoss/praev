//! Tests T01–T08 (docs/08-quality/03-tests.md). Cada llamada firma solo con la
//! cuenta que debe autorizarla (`mock_auths` explícito), nunca con
//! `mock_all_auths`, para que una `require_auth` faltante haga fallar el test.

extern crate std;

use super::*;
use soroban_sdk::{
    testutils::{
        storage::{Instance as _, Persistent as _},
        Address as _, Events as _, Ledger as _, MockAuth, MockAuthInvoke,
    },
    Address, BytesN, Env, Event, IntoVal, Val, Vec,
};

const NOW: u64 = 1_764_547_200; // 1 dic 2026 00:00 UTC
const CLOSES_AT: u64 = NOW + 3_600;
const OBS_START: u64 = CLOSES_AT;
const OBS_END: u64 = OBS_START + 86_400;
const RESOLVE_AFTER: u64 = OBS_END;
const RESOLVE_BY: u64 = RESOLVE_AFTER + 7 * 86_400;

struct Setup {
    env: Env,
    contract: Address,
    client: PraevRegistryClient<'static>,
    curator: Address,
    resolver: Address,
    maker: Address,
    id: BytesN<32>,
    spec_hash: BytesN<32>,
}

#[derive(Clone, Copy)]
struct Times {
    closes_at: u64,
    observation_start: u64,
    observation_end: u64,
    resolve_after: u64,
    resolve_by: u64,
}

const TIMES: Times = Times {
    closes_at: CLOSES_AT,
    observation_start: OBS_START,
    observation_end: OBS_END,
    resolve_after: RESOLVE_AFTER,
    resolve_by: RESOLVE_BY,
};

fn hash(env: &Env, byte: u8) -> BytesN<32> {
    BytesN::from_array(env, &[byte; 32])
}

impl Setup {
    fn new() -> Self {
        let env = Env::default();
        env.ledger().set_timestamp(NOW);
        let curator = Address::generate(&env);
        let contract = env.register(PraevRegistry, (curator.clone(),));
        let client = PraevRegistryClient::new(&env, &contract);
        Setup {
            resolver: Address::generate(&env),
            maker: Address::generate(&env),
            id: hash(&env, 0x11),
            spec_hash: hash(&env, 0x22),
            env,
            contract,
            client,
            curator,
        }
    }

    /// Ejecuta `call` autorizando exactamente `fn_name(args)` firmado por `signer`.
    fn signed<R>(
        &self,
        signer: &Address,
        fn_name: &str,
        args: Vec<Val>,
        call: impl FnOnce(&PraevRegistryClient<'_>) -> R,
    ) -> R {
        let invoke = MockAuthInvoke {
            contract: &self.contract,
            fn_name,
            args,
            sub_invokes: &[],
        };
        let auths = [MockAuth {
            address: signer,
            invoke: &invoke,
        }];
        call(&self.client.mock_auths(&auths))
    }

    fn try_create(
        &self,
        signer: &Address,
        id: &BytesN<32>,
        spec_hash: &BytesN<32>,
        resolver: &Address,
        mode: u32,
        t: Times,
    ) -> Result<(), Result<Error, soroban_sdk::InvokeError>> {
        let args: Vec<Val> = (
            id.clone(),
            spec_hash.clone(),
            resolver.clone(),
            mode,
            t.closes_at,
            t.observation_start,
            t.observation_end,
            t.resolve_after,
            t.resolve_by,
        )
            .into_val(&self.env);
        self.signed(signer, "create_question", args, |client| {
            client
                .try_create_question(
                    id,
                    spec_hash,
                    resolver,
                    &mode,
                    &t.closes_at,
                    &t.observation_start,
                    &t.observation_end,
                    &t.resolve_after,
                    &t.resolve_by,
                )
                .map(|ok| ok.unwrap())
        })
    }

    fn create(&self) {
        self.try_create(
            &self.curator,
            &self.id,
            &self.spec_hash,
            &self.resolver,
            MODE_LIVE,
            TIMES,
        )
        .expect("create_question válido");
    }

    fn try_submit(
        &self,
        signer: &Address,
        forecaster: &Address,
        seq: u32,
        commitment: &BytesN<32>,
    ) -> Result<(), Result<Error, soroban_sdk::InvokeError>> {
        let args: Vec<Val> =
            (self.id.clone(), forecaster.clone(), seq, commitment.clone()).into_val(&self.env);
        self.signed(signer, "submit_forecast", args, |client| {
            client
                .try_submit_forecast(&self.id, forecaster, &seq, commitment)
                .map(|ok| ok.unwrap())
        })
    }

    fn submit(&self, forecaster: &Address, seq: u32, commitment: &BytesN<32>) {
        self.try_submit(forecaster, forecaster, seq, commitment)
            .expect("submit_forecast válido");
    }

    fn persistent_ttl(&self, key: &DataKey) -> u32 {
        self.env.as_contract(&self.contract, || {
            self.env.storage().persistent().get_ttl(key)
        })
    }
}

fn contract_error<T>(result: Result<T, Result<Error, soroban_sdk::InvokeError>>) -> Error {
    match result {
        Err(Ok(error)) => error,
        Err(Err(other)) => panic!("se esperaba un error del contrato, llegó {other:?}"),
        Ok(_) => panic!("se esperaba un error del contrato"),
    }
}

/// Falla en el host (auth), no con un error del contrato.
fn host_rejected(result: Result<(), Result<Error, soroban_sdk::InvokeError>>) -> bool {
    matches!(result, Err(Err(_)))
}

#[test]
fn constructor_sets_curator_schema_and_instance_ttl() {
    let s = Setup::new();
    assert_eq!(s.client.curator(), s.curator);
    assert_eq!(s.client.schema_version(), SCHEMA_VERSION);
    let ttl = s
        .env
        .as_contract(&s.contract, || s.env.storage().instance().get_ttl());
    assert!(ttl >= TTL_EXTEND_TO);
}

// T01
#[test]
fn create_question_stores_state_emits_event_and_extends_ttl() {
    let s = Setup::new();
    s.create();
    // `events().all()` solo ve la última invocación: leer antes de llamar getters.
    let events = s.env.events().all();

    let q = s.client.get_question(&s.id);
    assert_eq!(
        q,
        Question {
            spec_hash: s.spec_hash.clone(),
            curator: s.curator.clone(),
            resolver: s.resolver.clone(),
            mode: MODE_LIVE,
            closes_at: CLOSES_AT,
            observation_start: OBS_START,
            observation_end: OBS_END,
            resolve_after: RESOLVE_AFTER,
            resolve_by: RESOLVE_BY,
            terminal: TERMINAL_ACTIVE,
        }
    );

    let expected = QuestionCreated {
        id: s.id.clone(),
        spec_hash: s.spec_hash.clone(),
        curator: s.curator.clone(),
        resolver: s.resolver.clone(),
        mode: MODE_LIVE,
        closes_at: CLOSES_AT,
        observation_start: OBS_START,
        observation_end: OBS_END,
        resolve_after: RESOLVE_AFTER,
        resolve_by: RESOLVE_BY,
    };
    assert_eq!(events, [expected.to_xdr(&s.env, &s.contract)]);
    assert!(s.persistent_ttl(&DataKey::Question(s.id.clone())) >= TTL_EXTEND_TO);
}

#[test]
fn create_question_accepts_demo_and_time_boundaries() {
    let s = Setup::new();
    // closes_at = observation_start y observation_end = resolve_after están permitidos.
    s.try_create(
        &s.curator,
        &s.id,
        &s.spec_hash,
        &s.resolver,
        MODE_DEMO,
        TIMES,
    )
    .unwrap();
    assert_eq!(s.client.get_question(&s.id).mode, MODE_DEMO);
}

// T02
#[test]
fn create_question_requires_the_curator() {
    let s = Setup::new();
    let intruder = Address::generate(&s.env);
    let result = s.try_create(
        &intruder,
        &s.id,
        &s.spec_hash,
        &s.resolver,
        MODE_LIVE,
        TIMES,
    );
    assert!(host_rejected(result));
    assert_eq!(
        contract_error(s.client.try_get_question(&s.id).map(|ok| ok.unwrap())),
        Error::NotFound
    );
}

// T03
#[test]
fn create_question_rejects_duplicate_id() {
    let s = Setup::new();
    s.create();
    let other_spec = hash(&s.env, 0x33);
    let result = s.try_create(
        &s.curator,
        &s.id,
        &other_spec,
        &s.resolver,
        MODE_LIVE,
        TIMES,
    );
    assert_eq!(contract_error(result), Error::Exists);
    assert_eq!(s.client.get_question(&s.id).spec_hash, s.spec_hash);
}

// T04
#[test]
fn create_question_rejects_role_conflict() {
    let s = Setup::new();
    let result = s.try_create(
        &s.curator,
        &s.id,
        &s.spec_hash,
        &s.curator,
        MODE_LIVE,
        TIMES,
    );
    assert_eq!(contract_error(result), Error::RoleConflict);
}

#[test]
fn create_question_rejects_invalid_times() {
    let s = Setup::new();
    let cases = [
        Times {
            closes_at: NOW,
            ..TIMES
        }, // now = cierre
        Times {
            closes_at: NOW - 1,
            ..TIMES
        }, // cierre pasado
        Times {
            observation_start: CLOSES_AT - 1,
            ..TIMES
        }, // observa antes del cierre
        Times {
            observation_end: OBS_START,
            ..TIMES
        }, // ventana vacía
        Times {
            resolve_after: OBS_END - 1,
            ..TIMES
        }, // resuelve antes del fin
        Times {
            resolve_by: RESOLVE_AFTER,
            ..TIMES
        }, // ventana de resolución vacía
    ];
    for t in cases {
        let result = s.try_create(&s.curator, &s.id, &s.spec_hash, &s.resolver, MODE_LIVE, t);
        assert_eq!(contract_error(result), Error::InvalidTime);
    }
}

#[test]
fn create_question_rejects_invalid_mode_and_zero_hashes() {
    let s = Setup::new();
    let zero = hash(&s.env, 0);
    assert_eq!(
        contract_error(s.try_create(&s.curator, &s.id, &s.spec_hash, &s.resolver, 2, TIMES)),
        Error::InvalidMode
    );
    assert_eq!(
        contract_error(s.try_create(&s.curator, &s.id, &zero, &s.resolver, MODE_LIVE, TIMES)),
        Error::InvalidHash
    );
    assert_eq!(
        contract_error(s.try_create(
            &s.curator,
            &zero,
            &s.spec_hash,
            &s.resolver,
            MODE_LIVE,
            TIMES
        )),
        Error::InvalidHash
    );
}

#[test]
fn getters_report_not_found_and_zero_seq() {
    let s = Setup::new();
    assert_eq!(
        contract_error(s.client.try_get_question(&s.id).map(|ok| ok.unwrap())),
        Error::NotFound
    );
    assert_eq!(s.client.get_latest_seq(&s.id, &s.maker), 0);
    assert_eq!(
        contract_error(
            s.client
                .try_get_forecast(&s.id, &s.maker, &1)
                .map(|ok| ok.unwrap())
        ),
        Error::NotFound
    );
}

#[test]
fn submit_forecast_appends_versions_and_emits_commitment_only() {
    let s = Setup::new();
    s.create();
    let first = hash(&s.env, 0xa1);
    let second = hash(&s.env, 0xa2);

    s.submit(&s.maker, 1, &first);
    s.env.ledger().set_timestamp(NOW + 60);
    s.submit(&s.maker, 2, &second);
    let events = s.env.events().all();

    assert_eq!(s.client.get_latest_seq(&s.id, &s.maker), 2);
    assert_eq!(
        s.client.get_forecast(&s.id, &s.maker, &1),
        Forecast {
            commitment: first,
            submitted_at: NOW,
            seq: 1
        }
    );
    assert_eq!(
        s.client.get_forecast(&s.id, &s.maker, &2),
        Forecast {
            commitment: second.clone(),
            submitted_at: NOW + 60,
            seq: 2
        }
    );

    let expected = ForecastSubmitted {
        id: s.id.clone(),
        forecaster: s.maker.clone(),
        seq: 2,
        commitment: second,
        submitted_at: NOW + 60,
    };
    assert_eq!(events, [expected.to_xdr(&s.env, &s.contract)]);

    for key in [
        DataKey::Forecast(s.id.clone(), s.maker.clone(), 2),
        DataKey::LatestSeq(s.id.clone(), s.maker.clone()),
        DataKey::Question(s.id.clone()),
    ] {
        assert!(s.persistent_ttl(&key) >= TTL_EXTEND_TO);
    }
}

#[test]
fn submit_forecast_keeps_makers_independent() {
    let s = Setup::new();
    s.create();
    let other = Address::generate(&s.env);
    s.submit(&s.maker, 1, &hash(&s.env, 0xa1));
    s.submit(&other, 1, &hash(&s.env, 0xb1));
    assert_eq!(s.client.get_latest_seq(&s.id, &s.maker), 1);
    assert_eq!(s.client.get_latest_seq(&s.id, &other), 1);
}

// T05
#[test]
fn submit_forecast_rejects_zero_commitment() {
    let s = Setup::new();
    s.create();
    let result = s.try_submit(&s.maker, &s.maker, 1, &hash(&s.env, 0));
    assert_eq!(contract_error(result), Error::InvalidHash);
}

// T06
#[test]
fn submit_forecast_closes_exactly_at_closes_at() {
    let s = Setup::new();
    s.create();
    s.env.ledger().set_timestamp(CLOSES_AT - 1);
    s.submit(&s.maker, 1, &hash(&s.env, 0xa1));
    s.env.ledger().set_timestamp(CLOSES_AT);
    let result = s.try_submit(&s.maker, &s.maker, 2, &hash(&s.env, 0xa2));
    assert_eq!(contract_error(result), Error::Closed);
    assert_eq!(s.client.get_latest_seq(&s.id, &s.maker), 1);
}

// T07
#[test]
fn submit_forecast_rejects_bad_sequence() {
    let s = Setup::new();
    s.create();
    let c = hash(&s.env, 0xa1);
    assert_eq!(
        contract_error(s.try_submit(&s.maker, &s.maker, 0, &c)),
        Error::InvalidSequence
    );
    assert_eq!(
        contract_error(s.try_submit(&s.maker, &s.maker, 2, &c)),
        Error::InvalidSequence
    );
    s.submit(&s.maker, 1, &c);
    // Replay de la misma versión y salto de versión.
    assert_eq!(
        contract_error(s.try_submit(&s.maker, &s.maker, 1, &c)),
        Error::InvalidSequence
    );
    assert_eq!(
        contract_error(s.try_submit(&s.maker, &s.maker, 3, &c)),
        Error::InvalidSequence
    );
}

#[test]
fn submit_forecast_cannot_be_signed_for_someone_else() {
    let s = Setup::new();
    s.create();
    let intruder = Address::generate(&s.env);
    let result = s.try_submit(&intruder, &s.maker, 1, &hash(&s.env, 0xa1));
    assert!(host_rejected(result));
    assert_eq!(s.client.get_latest_seq(&s.id, &s.maker), 0);
}

// T08
#[test]
fn submit_forecast_excludes_curator_and_resolver() {
    let s = Setup::new();
    s.create();
    let c = hash(&s.env, 0xa1);
    assert_eq!(
        contract_error(s.try_submit(&s.curator, &s.curator, 1, &c)),
        Error::RoleConflict
    );
    assert_eq!(
        contract_error(s.try_submit(&s.resolver, &s.resolver, 1, &c)),
        Error::RoleConflict
    );
}

#[test]
fn submit_forecast_requires_an_existing_question() {
    let s = Setup::new();
    let result = s.try_submit(&s.maker, &s.maker, 1, &hash(&s.env, 0xa1));
    assert_eq!(contract_error(result), Error::NotFound);
}
