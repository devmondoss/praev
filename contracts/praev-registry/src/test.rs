use super::{PraevRegistry, PraevRegistryClient};
use soroban_sdk::{testutils::Address as _, Address, Env};

#[test]
fn constructor_sets_curator() {
    let env = Env::default();
    let curator = Address::generate(&env);
    let id = env.register(PraevRegistry, (curator.clone(),));
    let client = PraevRegistryClient::new(&env, &id);
    assert_eq!(client.curator(), curator);
}
