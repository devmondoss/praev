# Wallet, firma y confirmación

**Estado:** P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

Stellar Wallets Kit v2 con adapter desktop y Varial (antes Freighter). Leer su guía vigente; no mezclar API v1 con v2. Conexión obtiene dirección y red; no significa autenticación servidor. UI muestra testnet, cuenta, acción y probabilidad. La cuenta humana es source account y forecaster; así se evita firma adicional de auth entry en camino simple. Preparar tx con SDK a partir de account sequence real, contract invocation y network passphrase; simular/assemble con RPC; revisar auth, fees, timebounds, contrato y args; wallet firma XDR; enviar signed XDR; confirmar mediante getTransaction + verificar payload esperado. Si SDK cambia, usar bindings generados y su flujo documentado. No confiar en tx enviada por cliente sin revisar.

Estados UX: idle → connecting → draft → prepared → signing → submitted → confirming → confirmed/failed/unknown. NOT_FOUND durante polling no implica fallo. Poll con backoff 1,2,4,5s hasta 45s propuestos; persistir tx hash y reintentar consulta sin reenviar un forecast nuevo. Si rechazo de wallet, conservar draft. Si `bad_seq` o expirada, releer cuenta y re-preparar; no cambiar p silenciosamente. Rechazar mainnet en UI, API y scripts. Nunca almacenar seed del usuario. Criterio: conexión, rechazo, firma testnet, éxito real, retry y lectura pública sin wallet.

Fuentes: [Wallet Kit v2](https://github.com/stellar/ecosystem-resources/blob/main/wallet-integration/stellar-wallets-kit.md), [Varial](https://stellar.org/blog/foundation-news/freighter-is-now-varial), [RPC getTransaction](https://developers.stellar.org/docs/data/apis/rpc/api-reference/methods/getTransaction).
