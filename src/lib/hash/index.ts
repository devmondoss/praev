import { canonicalBytes } from "./c14n";
import { sha256Hex } from "./sha256";

export {
  C14N_PROFILE,
  CanonicalizationError,
  canonicalBytes,
  canonicalString,
  isCanonicalJson,
} from "./c14n";
export { bytesToHex, hashEquals, hexToBytes, isHash32Hex, sha256, sha256Hex } from "./sha256";

/** UUID en minúsculas: la única forma admitida para IDs de praev. */
export const UUID_LOWER = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** Bytes canónicos y su SHA-256 (spec, tesis, manifest). */
export async function hashCanonical(
  value: unknown,
): Promise<{ bytes: Uint8Array<ArrayBuffer>; hash: string }> {
  const bytes = canonicalBytes(value);
  return { bytes, hash: await sha256Hex(bytes) };
}

/** `questionIdChain = SHA256(UTF8(uuid en minúsculas))`, el `BytesN<32>` del contrato. */
export async function chainIdFromUuid(uuid: string): Promise<string> {
  const lower = uuid.toLowerCase();
  if (!UUID_LOWER.test(lower)) {
    throw new Error(`UUID inválido: ${JSON.stringify(uuid)}`);
  }
  return sha256Hex(new TextEncoder().encode(lower));
}
