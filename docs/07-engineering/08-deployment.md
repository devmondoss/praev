# Despliegue testnet y aplicación

**Estado:** Runbook propuesto; no desplegado · **Versión:** 1.0 · **Fecha:** 2026-11-26

1. Crear cuentas testnet (`stellar keys generate curator --network testnet --fund`, repetir `resolver`, `agent`), verificar addresses, no exportar seeds.
2. En workspace de contrato implementado: `stellar contract build`; confirmar nombre y ruta Wasm real `target/wasm32v1-none/release/praev_registry.wasm` según artefacto. Ejecutar tests Rust.
3. Deploy con constructor curator, comprobar flags y args con `stellar contract deploy --help` de versión instalada. Patrón oficial:
```bash
stellar contract deploy --wasm target/wasm32v1-none/release/praev_registry.wasm   --source-account curator --network testnet --alias praev_registry   -- --curator "$(stellar keys address curator)"
```
La parte tras `--` depende de interfaz constructor implementada; probar CLI real, no dar por ejecutada. Guardar contract ID devuelto, Wasm SHA256 y tx. Consultar getter con CLI y probar create/forecast/resolve; registrar receipts. Nunca reemplazar ID real por placeholder en entrega.
4. Crear DB PostgreSQL remota con TLS, aplicar migraciones y seed metadata. Deploy Next Node (`npm ci && npm run build`, `npm run start`) en hosting compatible; Vercel opcional si conexión Postgres y handlers smoke-tested. Configurar server env y red pública, sin llaves operativas en hosting.
5. Reconcile y smoke test desde navegador limpio. Verificar enlaces en explorador testnet elegido, contrato y tx, lectura pública. Confirmar demo antes de freeze. Si testnet reset, desplegar nuevo ID y preservar export anterior claramente marcado; no mezclar rows.

Fuente: [Deploy to Testnet](https://developers.stellar.org/docs/build/smart-contracts/getting-started/deploy-to-testnet), [Next deploy](https://nextjs.org/docs/app/getting-started/deploying). Evidencia exigida: `deployment.json` futuro con contractId, network, wasmHash, deployTx, commit, appUrl, checkedAt; ningún dato inventado en este paquete.
