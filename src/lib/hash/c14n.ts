/**
 * Perfil de canonicalización `praev-c14n-v1` (docs/06-stellar/04-hashes.md).
 *
 * - Objetos: claves ASCII imprimibles, ordenadas por código; sin espacios.
 * - Arrays: conservan el orden.
 * - Strings: bien formadas (sin surrogates sueltos) y normalizadas a NFC.
 * - Números: solo enteros seguros; se rechazan -0, NaN, ±Infinity y decimales.
 * - Se rechazan undefined, bigint, funciones, símbolos, objetos no planos,
 *   arrays con huecos y ciclos.
 *
 * No pretende cumplir RFC 8785 completo. Solo usa APIs estándar, así que el
 * mismo código corre en Node y en el navegador.
 */

export const C14N_PROFILE = "praev-c14n-v1";

export class CanonicalizationError extends Error {
  readonly path: string;

  constructor(path: string, reason: string) {
    super(`${C14N_PROFILE}: ${reason} en ${path}`);
    this.name = "CanonicalizationError";
    this.path = path;
  }
}

const ASCII_KEY = /^[\x20-\x7e]+$/;

export function canonicalString(value: unknown): string {
  return write(value, "$", new Set());
}

export function canonicalBytes(value: unknown): Uint8Array<ArrayBuffer> {
  return new TextEncoder().encode(canonicalString(value));
}

/** true si `bytes` es exactamente la forma canónica UTF-8 de un JSON válido. */
export function isCanonicalJson(bytes: Uint8Array): boolean {
  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return false;
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return false;
  }
  try {
    return canonicalString(parsed) === text;
  } catch {
    return false;
  }
}

function write(value: unknown, path: string, ancestors: Set<object>): string {
  if (value === null) return "null";

  switch (typeof value) {
    case "boolean":
      return value ? "true" : "false";
    case "number":
      if (!Number.isSafeInteger(value)) {
        throw new CanonicalizationError(path, "solo se admiten enteros seguros");
      }
      if (Object.is(value, -0)) {
        throw new CanonicalizationError(path, "-0 no está permitido");
      }
      return String(value);
    case "string":
      if (!isWellFormed(value)) {
        throw new CanonicalizationError(path, "string con surrogates sueltos");
      }
      return JSON.stringify(value.normalize("NFC"));
    case "object":
      return writeObject(value, path, ancestors);
    default:
      throw new CanonicalizationError(path, `tipo ${typeof value} no admitido`);
  }
}

function writeObject(value: object, path: string, ancestors: Set<object>): string {
  if (ancestors.has(value)) {
    throw new CanonicalizationError(path, "referencia circular");
  }
  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      const parts: string[] = [];
      for (let i = 0; i < value.length; i++) {
        if (!(i in value)) {
          throw new CanonicalizationError(`${path}[${i}]`, "array con huecos");
        }
        parts.push(write(value[i], `${path}[${i}]`, ancestors));
      }
      return `[${parts.join(",")}]`;
    }

    const proto = Object.getPrototypeOf(value);
    if (proto !== Object.prototype && proto !== null) {
      throw new CanonicalizationError(path, "solo se admiten objetos planos");
    }
    if (Object.getOwnPropertySymbols(value).length > 0) {
      throw new CanonicalizationError(path, "claves símbolo no admitidas");
    }

    const record = value as Record<string, unknown>;
    const keys = Object.keys(record).sort();
    const parts: string[] = [];
    for (const key of keys) {
      if (!ASCII_KEY.test(key)) {
        throw new CanonicalizationError(path, `clave no ASCII o vacía: ${JSON.stringify(key)}`);
      }
      const child = `${path}.${key}`;
      if (record[key] === undefined) {
        throw new CanonicalizationError(child, "undefined no está permitido");
      }
      parts.push(`${JSON.stringify(key)}:${write(record[key], child, ancestors)}`);
    }
    return `{${parts.join(",")}}`;
  } finally {
    ancestors.delete(value);
  }
}

function isWellFormed(s: string): boolean {
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c >= 0xd800 && c <= 0xdbff) {
      const next = s.charCodeAt(i + 1);
      if (!(next >= 0xdc00 && next <= 0xdfff)) return false;
      i++;
    } else if (c >= 0xdc00 && c <= 0xdfff) {
      return false;
    }
  }
  return true;
}
