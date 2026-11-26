# Stellar, Soroban y red

**Estado:** P0 testnet · **Versión:** 1.1 · **Fecha:** 2026-11-26

Usar exclusivamente Stellar testnet para prueba. Rust/Soroban compila a Wasm; Solidity no es el stack de contratos nativo elegido. Configurar `Networks.TESTNET` desde SDK, RPC URL explícita y verificar red del wallet. No habilitar mainnet, bridges ni fondos reales. XLM testnet se usa para fees y no representa valor. Generar cuentas separadas: deployer/curator, resolver, agent y wallet humana; nunca reusar secretos reales.

Una sola instancia `PraevRegistry` contiene pregunta, forecast y resolución. No administrar saldos. Guardar `contract_id C...`, network passphrase, Wasm hash y deployment tx en archivo público al implementar; no poner ejemplos ficticios como reales. No hay reset de testnet programado en 2026 (se anuncian con ≥2 semanas); aun así, dataset local y prueba reproducible como contingencia, sin prometer persistencia permanente. Registrar identificador de deployment en DB, aislar ejecuciones.

Fuentes: [Setup Rust](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup), [Deploy](https://developers.stellar.org/docs/build/smart-contracts/getting-started/deploy-to-testnet), [Autorización](https://developers.stellar.org/docs/learn/fundamentals/contract-development/authorization). Criterio: `getTransaction` real y estado de contrato leído en testnet; nada de blockchain mock como demostración final.
