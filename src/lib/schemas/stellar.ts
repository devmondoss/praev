/**
 * Validación de StrKey de cuentas Stellar (`G…`) sin dependencias, para usarla
 * igual en el navegador y en el servidor: base32 → versión 6<<3, 32 bytes de
 * clave pública y CRC16-XModem en little-endian.
 */

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const ACCOUNT_VERSION = 6 << 3;
const ACCOUNT_SHAPE = /^G[A-Z2-7]{55}$/;

export function isStellarAccountId(value: string): boolean {
  if (!ACCOUNT_SHAPE.test(value)) return false;
  const data = base32Decode(value);
  if (data.length !== 35 || data[0] !== ACCOUNT_VERSION) return false;
  const expected = crc16xmodem(data.subarray(0, 33));
  return data[33] === (expected & 0xff) && data[34] === expected >> 8;
}

function base32Decode(input: string): Uint8Array {
  const out = new Uint8Array(Math.floor((input.length * 5) / 8));
  let buffer = 0;
  let bits = 0;
  let index = 0;
  for (const char of input) {
    buffer = (buffer << 5) | ALPHABET.indexOf(char);
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      out[index++] = (buffer >> bits) & 0xff;
    }
  }
  return out;
}

function crc16xmodem(bytes: Uint8Array): number {
  let crc = 0;
  for (const byte of bytes) {
    crc ^= byte << 8;
    for (let i = 0; i < 8; i++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc;
}
