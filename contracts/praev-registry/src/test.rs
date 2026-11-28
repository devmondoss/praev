//! Tests T01–T11 (docs/08-quality/03-tests.md). Cada llamada firma solo con la
//! cuenta que debe autorizarla (`mock_auths` explícito), nunca con
//! `mock_all_auths`, para que una `require_auth` faltante haga fallar el test.

extern crate std;

use super::*;
use soroban_sdk::{
    testutils::{
        storage::{Instance as _, Persistent as _},
        Address as _, Events as _, Ledger as _, MockAuth, MockAuthInvoke,
    },
    Address, BytesN, Env, Event, FromVal, IntoVal, Symbol, TryFromVal, Val, Vec,
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

    fn try_resolve(
        &self,
        signer: &Address,
        outcome: u32,
        evidence: &BytesN<32>,
    ) -> Result<(), Result<Error, soroban_sdk::InvokeError>> {
        let args: Vec<Val> = (self.id.clone(), outcome, evidence.clone()).into_val(&self.env);
        self.signed(signer, "resolve", args, |client| {
            client
                .try_resolve(&self.id, &outcome, evidence)
                .map(|ok| ok.unwrap())
        })
    }

    fn try_invalidate(
        &self,
        signer: &Address,
        evidence: &BytesN<32>,
    ) -> Result<(), Result<Error, soroban_sdk::InvokeError>> {
        let args: Vec<Val> = (self.id.clone(), evidence.clone()).into_val(&self.env);
        self.signed(signer, "invalidate", args, |client| {
            client
                .try_invalidate(&self.id, evidence)
                .map(|ok| ok.unwrap())
        })
    }

    fn try_cancel(
        &self,
        signer: &Address,
        reason: &BytesN<32>,
    ) -> Result<(), Result<Error, soroban_sdk::InvokeError>> {
        let args: Vec<Val> = (self.id.clone(), reason.clone()).into_val(&self.env);
        self.signed(signer, "cancel", args, |client| {
            client.try_cancel(&self.id, reason).map(|ok| ok.unwrap())
        })
    }

    fn terminal(&self) -> u32 {
        self.client.get_question(&self.id).terminal
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

// T09
#[test]
fn resolve_only_inside_the_window_and_by_the_resolver() {
    let s = Setup::new();
    s.create();
    let evidence = hash(&s.env, 0xe1);

    s.env.ledger().set_timestamp(RESOLVE_AFTER - 1);
    assert_eq!(
        contract_error(s.try_resolve(&s.resolver, OUTCOME_YES, &evidence)),
        Error::InvalidTime
    );
    s.env.ledger().set_timestamp(RESOLVE_BY + 1);
    assert_eq!(
        contract_error(s.try_resolve(&s.resolver, OUTCOME_YES, &evidence)),
        Error::InvalidTime
    );

    s.env.ledger().set_timestamp(RESOLVE_AFTER);
    assert!(host_rejected(s.try_resolve(
        &s.curator,
        OUTCOME_YES,
        &evidence
    )));
    let intruder = Address::generate(&s.env);
    assert!(host_rejected(s.try_resolve(
        &intruder,
        OUTCOME_YES,
        &evidence
    )));
    assert_eq!(s.terminal(), TERMINAL_ACTIVE);
}

#[test]
fn resolve_rejects_bad_outcome_and_zero_evidence() {
    let s = Setup::new();
    s.create();
    s.env.ledger().set_timestamp(RESOLVE_AFTER);
    assert_eq!(
        contract_error(s.try_resolve(&s.resolver, OUTCOME_INVALID, &hash(&s.env, 0xe1))),
        Error::InvalidOutcome
    );
    assert_eq!(
        contract_error(s.try_resolve(&s.resolver, OUTCOME_YES, &hash(&s.env, 0))),
        Error::InvalidHash
    );
}

// T10
#[test]
fn resolve_yes_and_no_are_terminal() {
    for (outcome, at) in [(OUTCOME_YES, RESOLVE_AFTER), (OUTCOME_NO, RESOLVE_BY)] {
        let s = Setup::new();
        s.create();
        let evidence = hash(&s.env, 0xe1);
        s.env.ledger().set_timestamp(at);
        s.try_resolve(&s.resolver, outcome, &evidence).unwrap();
        let events = s.env.events().all();

        assert_eq!(s.terminal(), TERMINAL_RESOLVED);
        assert_eq!(
            s.client.get_resolution(&s.id),
            Resolution {
                outcome,
                evidence_hash: evidence.clone(),
                resolved_at: at
            }
        );
        let expected = QuestionResolved {
            id: s.id.clone(),
            outcome,
            evidence_hash: evidence.clone(),
            resolved_at: at,
        };
        assert_eq!(events, [expected.to_xdr(&s.env, &s.contract)]);
        for key in [
            DataKey::Question(s.id.clone()),
            DataKey::Resolution(s.id.clone()),
        ] {
            assert!(s.persistent_ttl(&key) >= TTL_EXTEND_TO);
        }

        // Un segundo intento terminal falla y no cambia nada.
        let other = hash(&s.env, 0xe2);
        assert_eq!(
            contract_error(s.try_resolve(&s.resolver, 1 - outcome, &other)),
            Error::Terminal
        );
        assert_eq!(
            contract_error(s.try_invalidate(&s.resolver, &other)),
            Error::Terminal
        );
        assert_eq!(s.client.get_resolution(&s.id).outcome, outcome);
    }
}

#[test]
fn forecasts_are_rejected_once_resolved() {
    let s = Setup::new();
    s.create();
    s.env.ledger().set_timestamp(RESOLVE_AFTER);
    s.try_resolve(&s.resolver, OUTCOME_YES, &hash(&s.env, 0xe1))
        .unwrap();
    // El cierre ya pasó; aun así el estado terminal se comprueba antes.
    assert_eq!(
        contract_error(s.try_submit(&s.maker, &s.maker, 1, &hash(&s.env, 0xa1))),
        Error::Terminal
    );
}

// T11
#[test]
fn invalidate_writes_outcome_two_from_resolve_after_even_late() {
    let s = Setup::new();
    s.create();
    let evidence = hash(&s.env, 0xe3);

    s.env.ledger().set_timestamp(RESOLVE_AFTER - 1);
    assert_eq!(
        contract_error(s.try_invalidate(&s.resolver, &evidence)),
        Error::InvalidTime
    );
    s.env.ledger().set_timestamp(RESOLVE_BY + 86_400);
    assert!(host_rejected(s.try_invalidate(&s.curator, &evidence)));
    assert_eq!(
        contract_error(s.try_invalidate(&s.resolver, &hash(&s.env, 0))),
        Error::InvalidHash
    );
    s.try_invalidate(&s.resolver, &evidence).unwrap();
    let events = s.env.events().all();

    assert_eq!(s.terminal(), TERMINAL_INVALID);
    assert_eq!(
        s.client.get_resolution(&s.id),
        Resolution {
            outcome: OUTCOME_INVALID,
            evidence_hash: evidence.clone(),
            resolved_at: RESOLVE_BY + 86_400
        }
    );
    let expected = QuestionInvalidated {
        id: s.id.clone(),
        outcome: OUTCOME_INVALID,
        evidence_hash: evidence,
        resolved_at: RESOLVE_BY + 86_400,
    };
    assert_eq!(events, [expected.to_xdr(&s.env, &s.contract)]);
    assert_eq!(
        contract_error(s.try_resolve(&s.resolver, OUTCOME_YES, &hash(&s.env, 0xe1))),
        Error::Terminal
    );
}

// T11
#[test]
fn cancel_only_by_the_curator_before_close() {
    let s = Setup::new();
    s.create();
    let reason = hash(&s.env, 0xc1);

    assert!(host_rejected(s.try_cancel(&s.resolver, &reason)));
    assert_eq!(
        contract_error(s.try_cancel(&s.curator, &hash(&s.env, 0))),
        Error::InvalidHash
    );
    s.env.ledger().set_timestamp(CLOSES_AT - 1);
    s.try_cancel(&s.curator, &reason).unwrap();
    let events = s.env.events().all();

    assert_eq!(s.terminal(), TERMINAL_CANCELLED);
    assert_eq!(
        s.client.get_cancellation(&s.id),
        Cancellation {
            reason_hash: reason.clone(),
            cancelled_at: CLOSES_AT - 1
        }
    );
    let expected = QuestionCancelled {
        id: s.id.clone(),
        reason_hash: reason.clone(),
        cancelled_at: CLOSES_AT - 1,
    };
    assert_eq!(events, [expected.to_xdr(&s.env, &s.contract)]);
    for key in [
        DataKey::Question(s.id.clone()),
        DataKey::CancelReason(s.id.clone()),
    ] {
        assert!(s.persistent_ttl(&key) >= TTL_EXTEND_TO);
    }
    // Una pregunta cancelada no tiene resolución ni admite otra transición.
    assert_eq!(
        contract_error(s.client.try_get_resolution(&s.id).map(|ok| ok.unwrap())),
        Error::NotFound
    );
    assert_eq!(
        contract_error(s.try_cancel(&s.curator, &reason)),
        Error::Terminal
    );
    assert_eq!(
        contract_error(s.try_submit(&s.maker, &s.maker, 1, &hash(&s.env, 0xa1))),
        Error::Terminal
    );
}

#[test]
fn cancel_fails_at_close() {
    let s = Setup::new();
    s.create();
    s.env.ledger().set_timestamp(CLOSES_AT);
    assert_eq!(
        contract_error(s.try_cancel(&s.curator, &hash(&s.env, 0xc1))),
        Error::Closed
    );
    assert_eq!(s.terminal(), TERMINAL_ACTIVE);
}

#[test]
fn transitions_require_an_existing_question() {
    let s = Setup::new();
    let h = hash(&s.env, 0xe1);
    assert_eq!(
        contract_error(s.try_resolve(&s.resolver, OUTCOME_YES, &h)),
        Error::NotFound
    );
    assert_eq!(
        contract_error(s.try_invalidate(&s.resolver, &h)),
        Error::NotFound
    );
    assert_eq!(
        contract_error(s.try_cancel(&s.curator, &h)),
        Error::NotFound
    );
}

/// Decodifica el XDR de un evento como lo hará el indexador:
/// topics = [símbolo, id, ...] y datos = mapa de campos con nombre.
struct Decoded {
    name: Symbol,
    id: BytesN<32>,
    topics: std::vec::Vec<Val>,
    data: soroban_sdk::Map<Symbol, Val>,
}

fn decode_last(env: &Env) -> Decoded {
    use soroban_sdk::xdr::{ContractEventBody, ScVal};
    let all = env.events().all();
    let [event] = all.events() else {
        panic!("se esperaba exactamente un evento");
    };
    let ContractEventBody::V0(body) = &event.body;
    let to_val = |v: &ScVal| Val::try_from_val(env, v).unwrap();
    let topics: std::vec::Vec<Val> = body.topics.iter().map(to_val).collect();
    Decoded {
        name: Symbol::from_val(env, &topics[0]),
        id: BytesN::<32>::from_val(env, &topics[1]),
        data: soroban_sdk::Map::<Symbol, Val>::from_val(env, &to_val(&body.data)),
        topics,
    }
}

impl Decoded {
    fn field<T: FromVal<Env, Val>>(&self, env: &Env, key: &str) -> T {
        let raw = self
            .data
            .get(Symbol::new(env, key))
            .unwrap_or_else(|| panic!("falta el campo {key}"));
        T::from_val(env, &raw)
    }
}

#[test]
fn every_event_decodes_with_its_name_id_and_fields() {
    let s = Setup::new();
    let name = |n: &str| Symbol::new(&s.env, n);

    s.create();
    let e = decode_last(&s.env);
    assert_eq!(
        (e.name.clone(), e.id.clone()),
        (name("q_created"), s.id.clone())
    );
    assert_eq!(e.field::<BytesN<32>>(&s.env, "spec_hash"), s.spec_hash);
    assert_eq!(e.field::<Address>(&s.env, "resolver"), s.resolver);
    assert_eq!(e.field::<u64>(&s.env, "closes_at"), CLOSES_AT);
    assert_eq!(e.data.len(), 9);

    s.submit(&s.maker, 1, &hash(&s.env, 0xa1));
    let e = decode_last(&s.env);
    assert_eq!(e.name, name("forecast"));
    assert_eq!(Address::from_val(&s.env, &e.topics[2]), s.maker);
    assert_eq!(e.field::<u32>(&s.env, "seq"), 1);
    assert_eq!(
        e.field::<BytesN<32>>(&s.env, "commitment"),
        hash(&s.env, 0xa1)
    );
    // Solo seq, commitment y submitted_at: la probabilidad no viaja.
    assert_eq!(e.data.len(), 3);

    s.env.ledger().set_timestamp(RESOLVE_AFTER);
    s.try_resolve(&s.resolver, OUTCOME_NO, &hash(&s.env, 0xe1))
        .unwrap();
    let e = decode_last(&s.env);
    assert_eq!(
        (e.name.clone(), e.id.clone()),
        (name("resolved"), s.id.clone())
    );
    assert_eq!(e.field::<u32>(&s.env, "outcome"), OUTCOME_NO);
    assert_eq!(
        e.field::<BytesN<32>>(&s.env, "evidence_hash"),
        hash(&s.env, 0xe1)
    );
    assert_eq!(e.field::<u64>(&s.env, "resolved_at"), RESOLVE_AFTER);

    let s2 = Setup::new();
    s2.create();
    s2.env.ledger().set_timestamp(RESOLVE_AFTER);
    s2.try_invalidate(&s2.resolver, &hash(&s2.env, 0xe3))
        .unwrap();
    let e = decode_last(&s2.env);
    assert_eq!(e.name, Symbol::new(&s2.env, "invalid"));
    assert_eq!(e.field::<u32>(&s2.env, "outcome"), OUTCOME_INVALID);

    let s3 = Setup::new();
    s3.create();
    s3.try_cancel(&s3.curator, &hash(&s3.env, 0xc1)).unwrap();
    let e = decode_last(&s3.env);
    assert_eq!(e.name, Symbol::new(&s3.env, "cancelled"));
    assert_eq!(
        e.field::<BytesN<32>>(&s3.env, "reason_hash"),
        hash(&s3.env, 0xc1)
    );
    assert_eq!(e.field::<u64>(&s3.env, "cancelled_at"), NOW);
}
