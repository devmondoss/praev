import "server-only";

import { rpc } from "@stellar/stellar-sdk";
import type { AssembledTransaction } from "@stellar/stellar-sdk/contract";

import { hexToBytes } from "@/lib/hash";
import { contractErrorFromMessage, type ContractErrorName } from "@/lib/stellar/contract-errors";
import { DEPLOYMENT, resolveContractId } from "@/lib/stellar/deployment";

import { Client, type Question } from "./bindings";

/**
 * Cliente de solo lectura del contrato oficial. Sin `publicKey` ni firmante:
 * los getters se resuelven por simulación y nunca se envía una transacción.
 */
export function registryReader(rpcUrl: string, configuredContractId?: string): Client {
  return new Client({
    contractId: resolveContractId(configuredContractId),
    networkPassphrase: DEPLOYMENT.networkPassphrase,
    rpcUrl,
  });
}

export type RegistryInfo = {
  contractId: string;
  curator: string;
  schemaVersion: number;
};

/** Lee `curator` y `schema_version` y exige que coincidan con el despliegue. */
export async function readRegistryInfo(client: Client): Promise<RegistryInfo> {
  const [curator, schemaVersion] = await Promise.all([
    client.curator().then((tx) => tx.result),
    client.schema_version().then((tx) => tx.result),
  ]);
  if (curator !== DEPLOYMENT.curator || schemaVersion !== DEPLOYMENT.schemaVersion) {
    throw new Error(
      `el contrato ${client.options.contractId} no coincide con deployment.json (curator ${curator}, schema ${schemaVersion})`,
    );
  }
  return { contractId: client.options.contractId, curator, schemaVersion };
}

/** Error del contrato con el que falló la simulación, o `null`. */
export function simulationContractError(tx: AssembledTransaction<unknown>): ContractErrorName | null {
  const sim = tx.simulation;
  if (!sim || !rpc.Api.isSimulationError(sim)) return null;
  return contractErrorFromMessage(sim.error);
}

/** `null` si la pregunta no existe (Error::NotFound); otros errores se propagan. */
export async function readQuestion(client: Client, chainIdHex: string): Promise<Question | null> {
  const tx = await client.get_question({ id: hexToBytes(chainIdHex) });
  const result = tx.result;
  if (result.isOk()) return result.unwrap();
  const error = simulationContractError(tx);
  if (error === "NotFound") return null;
  throw new Error(`get_question falló: ${error ?? "error desconocido"}`);
}
