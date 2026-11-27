import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  CanonicalizationError,
  canonicalBytes,
  canonicalString,
  chainIdFromUuid,
  hashCanonical,
  hexToBytes,
  isCanonicalJson,
  sha256Hex,
} from "@/lib/hash";
import { isStellarAccountId } from "@/lib/schemas/stellar";

// Oráculo independiente: node:crypto, nunca el código bajo prueba.
const nodeSha = (bytes: Uint8Array | string) => createHash("sha256").update(bytes).digest("hex");
const utf8 = (s: string) => new TextEncoder().encode(s);

describe("sha256 con Web Crypto", () => {
  it("cumple los vectores conocidos", async () => {
    expect(await sha256Hex(utf8("abc"))).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    );
    expect(await sha256Hex(new Uint8Array())).toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    );
  });

  it("coincide con node:crypto", async () => {
    const bytes = utf8("praev · Anticipa lo que importa");
    expect(await sha256Hex(bytes)).toBe(nodeSha(bytes));
  });

  it("hexToBytes solo acepta hex en minúsculas y de longitud par", () => {
    expect([...hexToBytes("00ff10")]).toEqual([0, 255, 16]);
    expect(() => hexToBytes("ABCD")).toThrow();
    expect(() => hexToBytes("abc")).toThrow();
    expect(() => hexToBytes("zz")).toThrow();
  });
});

describe("praev-c14n-v1 (T12)", () => {
  it("ordena las claves y no deja espacios", () => {
    expect(canonicalString({ b: 2, a: 1 })).toBe('{"a":1,"b":2}');
    expect(canonicalString({ a: 1, b: 2 })).toBe('{"a":1,"b":2}');
    expect([...canonicalBytes({ b: 2, a: 1 })]).toEqual([...canonicalBytes({ a: 1, b: 2 })]);
    expect(canonicalString({ z: { y: [3, 1, 2], x: null }, A: true })).toBe(
      '{"A":true,"z":{"x":null,"y":[3,1,2]}}',
    );
  });

  it("conserva el orden de los arrays", () => {
    expect(canonicalString([2, 1])).not.toBe(canonicalString([1, 2]));
  });

  it("normaliza a NFC y emite UTF-8 sin escapar", () => {
    const decomposed = { s: "Pe\u0301rez" };
    const composed = { s: "P\u00e9rez" };
    expect(decomposed.s).not.toBe(composed.s);
    expect([...canonicalBytes(decomposed)]).toEqual([...canonicalBytes(composed)]);
    expect(canonicalString(decomposed)).toBe('{"s":"P\u00e9rez"}');
    expect(canonicalString({ s: 'a"b\\c\nd' })).toBe('{"s":"a\\"b\\\\c\\nd"}');
  });

  it("rechaza números que no son enteros seguros", () => {
    for (const bad of [1.5, -0, Number.NaN, Number.POSITIVE_INFINITY, 2 ** 53]) {
      expect(() => canonicalString({ n: bad })).toThrow(CanonicalizationError);
    }
    expect(canonicalString({ n: -5, m: Number.MAX_SAFE_INTEGER })).toBe(
      '{"m":9007199254740991,"n":-5}',
    );
  });

  it("rechaza tipos y estructuras ambiguas", () => {
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    const bad: unknown[] = [
      { a: undefined },
      { a: BigInt(1) },
      { a: () => 1 },
      { a: Symbol("x") },
      { a: new Date(0) },
      { a: new Map() },
      { "ñ": 1 },
      { "": 1 },
      { a: "\ud800" },
      [1, , 3],
      cyclic,
    ];
    for (const value of bad) {
      expect(() => canonicalString(value)).toThrow(CanonicalizationError);
    }
  });

  it("admite la misma subestructura repetida sin confundirla con un ciclo", () => {
    const shared = { k: 1 };
    expect(canonicalString({ a: shared, b: shared })).toBe('{"a":{"k":1},"b":{"k":1}}');
  });

  it("isCanonicalJson distingue la forma canónica", () => {
    expect(isCanonicalJson(utf8('{"a":1,"b":2}'))).toBe(true);
    expect(isCanonicalJson(utf8('{"b":2,"a":1}'))).toBe(false);
    expect(isCanonicalJson(utf8('{"a": 1}'))).toBe(false);
    expect(isCanonicalJson(new Uint8Array([0xff]))).toBe(false);
  });
});

describe("hashes de documentos (T13)", () => {
  it("alterar un campo o un byte cambia el hash", async () => {
    const base = await hashCanonical({ a: 1, b: [1, 2] });
    expect(base.hash).toBe(nodeSha(base.bytes));
    expect((await hashCanonical({ a: 2, b: [1, 2] })).hash).not.toBe(base.hash);
    expect((await hashCanonical({ a: 1, b: [2, 1] })).hash).not.toBe(base.hash);

    const flipped = new Uint8Array(base.bytes);
    flipped[flipped.length - 2] ^= 1;
    expect(await sha256Hex(flipped)).not.toBe(base.hash);
  });
});

describe("chainId", () => {
  const uuid = "6f1d3c2a-8b4e-4c7a-9e21-3b5d7f9a1c04";

  it("es SHA256 del UUID en minúsculas", async () => {
    expect(await chainIdFromUuid(uuid)).toBe(nodeSha(uuid));
    expect(await chainIdFromUuid(uuid.toUpperCase())).toBe(nodeSha(uuid));
  });

  it("rechaza lo que no es un UUID", async () => {
    await expect(chainIdFromUuid("q-123")).rejects.toThrow();
  });
});

describe("StrKey de cuentas Stellar", () => {
  it("acepta cuentas válidas", () => {
    expect(isStellarAccountId("GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF")).toBe(true);
    expect(isStellarAccountId("GBM6H4HBGNXGNKM4BX32CC3TCH6ALKDTAFRTNMBNSHB34ZSQL4QGBUPU")).toBe(true);
  });

  it("rechaza checksum, versión o forma incorrectos", () => {
    expect(isStellarAccountId("GBM6H4HBGNXGNKM4BX32CC3TCH6ALKDTAFRTNMBNSHB34ZSQL4QGBUPV")).toBe(false);
    expect(isStellarAccountId("CDXPDYB3GJ6QKW5WD42EGGALIWG44UGRRB7JA3J2WY4VA7D6PDYYWO3F")).toBe(false);
    expect(isStellarAccountId("gbm6h4hbgnxgnkm4bx32cc3tch6alkdtafrtnmbnshb34zsql4qgbupu")).toBe(false);
    expect(isStellarAccountId("GBM6H4")).toBe(false);
  });
});

describe("módulos compartidos con el navegador", () => {
  it("no importan APIs exclusivas de Node", () => {
    const files = [
      "src/lib/hash/c14n.ts",
      "src/lib/hash/sha256.ts",
      "src/lib/hash/index.ts",
      "src/lib/schemas/stellar.ts",
      "src/domain/forecasts/thesis.ts",
    ];
    for (const file of files) {
      const source = readFileSync(path.resolve(__dirname, "../..", file), "utf8");
      expect(source, file).not.toMatch(/from\s+["'](node:|crypto["']|server-only)/);
    }
  });
});
