# Despliegue testnet y aplicación

**Estado:** P0; contrato desplegado en testnet (HU-17) · **Versión:** 1.2 · **Fecha:** 2026-11-28

1. Crear cuentas testnet (`stellar keys generate curator --network testnet --fund`, repetir `resolver`, `agent`), verificar addresses, no exportar seeds.
2. En workspace de contrato implementado: `stellar contract build`; confirmar nombre y ruta Wasm real `contracts/target/wasm32v1-none/release/praev_registry.wasm` según artefacto. Ejecutar tests Rust.
3. Deploy con constructor curator, comprobar flags y args con `stellar contract deploy --help` de versión instalada. Patrón oficial:
```bash
stellar contract deploy --wasm contracts/target/wasm32v1-none/release/praev_registry.wasm   --source-account curator --network testnet --alias praev_registry   -- --curator "$(stellar keys address curator)"
```
La parte tras `--` depende de interfaz constructor implementada; probar CLI real, no dar por ejecutada. Guardar contract ID devuelto, Wasm SHA256 y tx. Generar bindings con `npx @stellar/stellar-sdk generate --network testnet --contract-id <C…> --output-dir src/server/stellar/bindings`. Consultar getter con CLI y probar create/forecast/resolve; registrar receipts. Nunca reemplazar ID real por placeholder en entrega.
4. Crear DB PostgreSQL remota con TLS, aplicar migraciones y seed metadata. Deploy en Vercel con Neon Postgres (ADR-019): URL *pooled*, comprobar prepared statements con Postgres.js y smoke test de handlers. Configurar server env y red pública, sin llaves operativas en hosting.
5. Reconcile y smoke test desde navegador limpio. Verificar enlaces en explorador testnet elegido, contrato y tx, lectura pública. Confirmar demo antes de freeze. Antes de entregar (4 dic), renovar TTL de instancia y Wasm (ADR-020). Si testnet reset, desplegar nuevo ID y preservar export anterior claramente marcado; no mezclar rows.

Fuente: [Deploy to Testnet](https://developers.stellar.org/docs/build/smart-contracts/getting-started/deploy-to-testnet), [Next deploy](https://nextjs.org/docs/app/getting-started/deploying). Evidencia exigida: `deployment.json` futuro con contractId, network, wasmHash, deployTx, commit, appUrl, checkedAt; ningún dato inventado en este paquete.

## Despliegue oficial (28 nov, HU-17)

Ejecutado con stellar-cli 30.0.1 desde el commit `9f4b382`, en dos pasos para registrar ambas transacciones:

```bash
npm run contract:build
stellar contract upload --wasm contracts/target/wasm32v1-none/release/praev_registry.wasm \
  --source-account curator --network testnet
stellar contract deploy --wasm-hash <wasmHash> --source-account curator --network testnet \
  --alias praev_registry -- --curator "$(stellar keys address curator)"
npm run contract:bindings   # regenera src/server/stellar/bindings desde el contrato
npm run contract:info       # curator y schema_version leídos vía bindings
```

| Dato | Valor |
|---|---|
| Contract ID | [`CD6NNKKSKPTJ33OV7Y2D6YW2BCK3GEFFSDZ6B5KQDS7EL6LGOAGIKY5X`](https://stellar.expert/explorer/testnet/contract/CD6NNKKSKPTJ33OV7Y2D6YW2BCK3GEFFSDZ6B5KQDS7EL6LGOAGIKY5X) |
| Wasm SHA-256 | `6d63f17913cdba2677cc2fc508b5563a2f32f96296ab111f80e713fd6020bab0` (12 974 bytes) |
| Subida del Wasm | [`b9e71322…f322dd`](https://stellar.expert/explorer/testnet/tx/b9e71322984323ac894fd31d5289f176a63913cb2bc8c66b955e2afdf8f322dd), ledger 5 969 470, `SUCCESS` |
| Despliegue y constructor | [`46f0bfde…a1f35ef9`](https://stellar.expert/explorer/testnet/tx/46f0bfdedd7cbfcb822c9df78b1d1b1f71d1a4355090180cf955f60aa1f35ef9), ledger 5 969 473, `SUCCESS` |
| Curador | `GBM6H4HBGNXGNKM4BX32CC3TCH6ALKDTAFRTNMBNSHB34ZSQL4QGBUPU` |

**Verificación.** `getTransaction` devolvió `SUCCESS` para las dos transacciones; `stellar contract fetch` del contrato desplegado da el mismo SHA-256 que el Wasm local; `curator` devuelve la cuenta del curador y `schema_version` devuelve 1; `get_question` sobre un id inexistente devuelve `Error(Contract, #1)` (`NotFound`). Regenerar los bindings no produce diferencias. El contrato de prueba `CDXPDYB3…WO3F` del Sprint 0 no es el oficial y no se usa.

**Fuente única del ID.** `deployment.json` (validado con Zod en `src/lib/stellar/deployment.ts`) es la única fuente del contract ID. Si `NEXT_PUBLIC_PRAEV_CONTRACT_ID` está definido y no coincide, la app falla cerrada. `readRegistryInfo` además exige que el `curator` y el `schema_version` leídos on-chain coincidan con el archivo.

**Errores del contrato en TS.** El SDK 17.4 arma `Err.message` con el comentario doc de cada variante del enum, no con su nombre, así que llega vacío. `src/lib/stellar/contract-errors.ts` lee el código de `Error(Contract, #N)` en la simulación y lo traduce; un test comprueba que la tabla coincide con los bindings.

**Pendiente:** renovar el TTL de la instancia y del Wasm el 4 dic (ADR-020); si testnet se reinicia, nuevo despliegue con nuevo `deployment.json`.

