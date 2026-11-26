#![no_std]
//! praev registry: questions, forecasts and resolutions on Stellar.
//! Sprint 0 only fixes the toolchain and the constructor; the full
//! interface lands with HU-13 to HU-16 (see docs/06-stellar/02-contract-interface.md).

use soroban_sdk::{contract, contractimpl, contracttype, Address, Env};

#[contracttype]
#[derive(Clone)]
enum DataKey {
    Curator,
}

#[contract]
pub struct PraevRegistry;

#[contractimpl]
impl PraevRegistry {
    pub fn __constructor(env: Env, curator: Address) {
        env.storage().instance().set(&DataKey::Curator, &curator);
    }

    pub fn curator(env: Env) -> Address {
        env.storage().instance().get(&DataKey::Curator).unwrap()
    }
}

#[cfg(test)]
mod test;
