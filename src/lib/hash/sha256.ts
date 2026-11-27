/**
 * SHA-256 con Web Crypto (`globalThis.crypto.subtle`), disponible en Node ≥ 22
 * y en navegadores en contexto seguro. No usar `node:crypto` aquí: este módulo
 * lo comparten el servidor, los scripts y el navegador.
 */

const HEX_BYTES = /^(?:[0-9a-f]{2})*$/;

export async function sha256(bytes: Uint8Array): Promise<Uint8Array<ArrayBuffer>> {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) {
    throw new Error("Web Crypto no está disponible en este entorno");
  }
  // Copia a un ArrayBuffer propio: `digest` no acepta vistas sobre SharedArrayBuffer.
  const digest = await subtle.digest("SHA-256", new Uint8Array(bytes));
  return new Uint8Array(digest);
}

export async function sha256Hex(bytes: Uint8Array): Promise<string> {
  return bytesToHex(await sha256(bytes));
}

export function bytesToHex(bytes: Uint8Array): string {
  let out = "";
  for (const b of bytes) out += b.toString(16).padStart(2, "0");
  return out;
}

/** Solo hex en minúsculas y longitud par: así hay una sola representación. */
export function hexToBytes(hex: string): Uint8Array<ArrayBuffer> {
  if (!HEX_BYTES.test(hex)) {
    throw new Error("hex inválido: se esperan pares de dígitos 0-9a-f en minúsculas");
  }
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

export function isHash32Hex(value: string): boolean {
  return /^[0-9a-f]{64}$/.test(value);
}

/** Comparación sin cortocircuito por posición, para hashes en hex. */
export function hashEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
