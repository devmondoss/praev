import { z } from "zod";

import deploymentJson from "../../../deployment.json";
import { TESTNET_PASSPHRASE } from "@/lib/env";
import { isHash32Hex } from "@/lib/hash";
import { isStellarAccountId, isStellarContractId } from "@/lib/schemas/stellar";

/**
 * Despliegue oficial del contrato (HU-17). `deployment.json` es la única
 * fuente del contract ID: está versionado y cualquiera puede comprobarlo en el
 * explorador. Compartido entre navegador y servidor.
 */
const hash32 = z.string().refine(isHash32Hex, "hash de 32 bytes en hex minúsculas");
const txHash = hash32;

export const deploymentSchema = z.strictObject({
  network: z.literal("testnet"),
  networkPassphrase: z.literal(TESTNET_PASSPHRASE),
  contractId: z.string().refine(isStellarContractId, "contract ID StrKey inválido"),
  alias: z.string().min(1),
  curator: z.string().refine(isStellarAccountId, "cuenta Stellar inválida"),
  schemaVersion: z.int().positive(),
  wasmHash: hash32,
  uploadTx: txHash,
  uploadLedger: z.int().positive(),
  deployTx: txHash,
  deployLedger: z.int().positive(),
  deployedAt: z.iso.datetime(),
  commit: z.string().regex(/^[0-9a-f]{40}$/, "commit git completo"),
  toolchain: z.record(z.string(), z.string()),
  appUrl: z.url({ protocol: /^https$/ }),
  checkedAt: z.iso.datetime(),
});

export type Deployment = z.infer<typeof deploymentSchema>;

export const DEPLOYMENT: Deployment = deploymentSchema.parse(deploymentJson);

export const EXPLORER_BASE = "https://stellar.expert/explorer/testnet";

export function explorerTxUrl(hash: string): string {
  return `${EXPLORER_BASE}/tx/${hash}`;
}

export function explorerContractUrl(contractId: string = DEPLOYMENT.contractId): string {
  return `${EXPLORER_BASE}/contract/${contractId}`;
}

/**
 * El contract ID configurado en el entorno, si existe, debe ser el del
 * despliegue oficial: si no coincide se falla cerrado en vez de leer otro
 * contrato (07-engineering/06-env).
 */
export function resolveContractId(configured: string | undefined): string {
  if (configured === undefined || configured === "") return DEPLOYMENT.contractId;
  if (configured !== DEPLOYMENT.contractId) {
    throw new Error(
      `NEXT_PUBLIC_PRAEV_CONTRACT_ID (${configured}) no coincide con deployment.json (${DEPLOYMENT.contractId})`,
    );
  }
  return configured;
}
