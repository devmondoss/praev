/**
 * Lee el contrato oficial con los bindings y comprueba que coincide con
 * deployment.json (HU-17):  npm run contract:info [-- <chainIdHex>]
 * Solo simula lecturas: no firma ni envía transacciones.
 */
import { loadEnvConfig } from "@next/env";

import { DEPLOYMENT, explorerContractUrl } from "@/lib/stellar/deployment";
import { getServerEnv } from "@/server/env";
import { readQuestion, readRegistryInfo, registryReader } from "@/server/stellar/registry";

loadEnvConfig(process.cwd());

async function main() {
  const env = getServerEnv();
  const client = registryReader(env.STELLAR_RPC_URL, process.env.NEXT_PUBLIC_PRAEV_CONTRACT_ID);
  const info = await readRegistryInfo(client);
  console.log(JSON.stringify({ ...info, wasmHash: DEPLOYMENT.wasmHash, explorer: explorerContractUrl() }, null, 2));

  const chainId = process.argv[2];
  if (chainId) {
    const question = await readQuestion(client, chainId);
    console.log(
      question === null
        ? `pregunta ${chainId}: no existe`
        : JSON.stringify(question, (_, v) => (typeof v === "bigint" ? v.toString() : v instanceof Uint8Array ? Buffer.from(v).toString("hex") : v), 2),
    );
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
