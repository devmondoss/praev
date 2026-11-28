import { z } from "zod";

import { isStellarAccountId } from "@/lib/schemas/stellar";

export const TESTNET_PASSPHRASE = "Test SDF Network ; September 2015";
export const DEFAULT_TESTNET_RPC_URL = "https://soroban-testnet.stellar.org";

const account = z.string().refine(isStellarAccountId, { message: "dirección Stellar (G…) inválida" });

/**
 * Server configuration. praev only runs on Stellar testnet: any other
 * network value fails closed instead of silently falling back.
 */
export const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1).optional(),
  DATABASE_URL_UNPOOLED: z.string().min(1).optional(),
  STELLAR_RPC_URL: z.url().default(DEFAULT_TESTNET_RPC_URL),
  NEXT_PUBLIC_STELLAR_NETWORK: z
    .literal("testnet", { error: "praev solo opera en Stellar testnet" })
    .default("testnet"),
  NEXT_PUBLIC_PRAEV_CONTRACT_ID: z.string().optional(),
  // Direcciones públicas de las cuentas operativas; las claves viven solo en el keystore.
  PRAEV_CURATOR_ADDRESS: account.optional(),
  PRAEV_RESOLVER_ADDRESS: account.optional(),
  PRAEV_AGENT_ADDRESS: account.optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

/** Empty strings (e.g. copied from .env.example) count as unset. */
export function parseServerEnv(source: Record<string, string | undefined>): ServerEnv {
  const cleaned = Object.fromEntries(
    Object.entries(source).filter(([, value]) => value !== undefined && value !== ""),
  );
  return serverEnvSchema.parse(cleaned);
}
