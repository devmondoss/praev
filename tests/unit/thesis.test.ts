import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  ThesisValidationError,
  generateSalt,
  openCommitment,
  parseThesis,
  sealThesis,
  type ThesisPayload,
} from "@/domain/forecasts/thesis";
import { canonicalString } from "@/lib/hash";

const vector = JSON.parse(
  readFileSync(path.resolve(__dirname, "../../fixtures/expected/thesis-commitment.json"), "utf8"),
) as { thesis: ThesisPayload; canonical: string; commitment: string };

const human = (): ThesisPayload => structuredClone(vector.thesis);
const utf8 = (s: string) => new TextEncoder().encode(s);

describe("compromiso de la tesis (T29)", () => {
  it("reproduce el vector fijo, comprobado con node:crypto", async () => {
    const { bytes, commitment } = await sealThesis(human());
    expect(new TextDecoder().decode(bytes)).toBe(vector.canonical);
    expect(commitment).toBe(createHash("sha256").update(vector.canonical).digest("hex"));
    expect(commitment).toBe(vector.commitment);
  });

  it("no depende del orden de las claves de entrada", async () => {
    const reordered = Object.fromEntries(Object.entries(human()).reverse());
    expect((await sealThesis(reordered)).commitment).toBe(vector.commitment);
  });

  it("la misma tesis con otra sal da otro compromiso", async () => {
    const a = await sealThesis({ ...human(), salt: generateSalt() });
    const b = await sealThesis({ ...human(), salt: generateSalt() });
    expect(a.commitment).not.toBe(b.commitment);
    expect(a.commitment).not.toBe(vector.commitment);
  });

  it("cambiar la probabilidad o el orden de los factores cambia el compromiso", async () => {
    const p = await sealThesis({ ...human(), probabilityBps: 6001 });
    expect(p.commitment).not.toBe(vector.commitment);

    const swapped = human();
    swapped.factors.reverse();
    expect((await sealThesis(swapped)).commitment).not.toBe(vector.commitment);
  });

  it("rechaza sales inválidas", () => {
    const s = human().salt;
    for (const salt of [s.slice(1), s.toUpperCase(), `${s.slice(0, 63)}g`, "", `${s}00`]) {
      expect(() => parseThesis({ ...human(), salt })).toThrow(ThesisValidationError);
    }
  });

  it("generateSalt da 32 bytes distintos en hex", () => {
    const salts = new Set(Array.from({ length: 50 }, generateSalt));
    expect(salts.size).toBe(50);
    for (const salt of salts) expect(salt).toMatch(/^[0-9a-f]{64}$/);
  });

  it("sella el texto en NFC, tal como lo verá quien verifique", async () => {
    const decomposed = { ...human(), note: "Pie\u0301rez" };
    const composed = { ...human(), note: "Pi\u00e9rez" };
    expect(decomposed.note).not.toBe(composed.note);
    expect((await sealThesis(decomposed)).commitment).toBe((await sealThesis(composed)).commitment);
    expect(parseThesis(decomposed).note).toBe("Pi\u00e9rez");
  });
});

describe("validación del ThesisPayload", () => {
  const rejects = (patch: Record<string, unknown>) =>
    expect(() => parseThesis({ ...human(), ...patch })).toThrow(ThesisValidationError);

  it("acepta la tesis de ejemplo y una tesis mínima", () => {
    expect(parseThesis(human()).probabilityBps).toBe(6000);
    expect(() =>
      parseThesis({ ...human(), anchorBps: null, factors: [], evidence: [], changeMyMind: "", note: "" }),
    ).not.toThrow();
  });

  it("exige probabilidad y ancla enteras en 0..10000", () => {
    rejects({ probabilityBps: 10_001 });
    rejects({ probabilityBps: -1 });
    rejects({ probabilityBps: 60.5 });
    rejects({ anchorBps: 10_001 });
    expect(parseThesis({ ...human(), probabilityBps: 0 }).probabilityBps).toBe(0);
    expect(parseThesis({ ...human(), probabilityBps: 10_000 }).probabilityBps).toBe(10_000);
  });

  it("rechaza esquema, IDs, dirección y seq inválidos", () => {
    rejects({ schema: "praev.thesis.v2" });
    rejects({ questionId: "6F1D3C2A-8B4E-4C7A-9E21-3B5D7F9A1C04" });
    rejects({ forecaster: "GBM6H4HBGNXGNKM4BX32CC3TCH6ALKDTAFRTNMBNSHB34ZSQL4QGBUPV" });
    rejects({ seq: 0 });
    rejects({ seq: 2 ** 32 });
    rejects({ informationCutoff: -1 });
  });

  it("aplica los límites de factores, evidencia y textos", () => {
    const factor = { label: "x", direction: "up" };
    rejects({ factors: [factor, factor, factor, factor] });
    rejects({ factors: [{ label: "", direction: "up" }] });
    rejects({ factors: [{ label: "a".repeat(121), direction: "up" }] });
    rejects({ factors: [{ label: "a\nb", direction: "up" }] });
    rejects({ factors: [{ label: "x", direction: "sideways" }] });
    rejects({ changeMyMind: "a".repeat(241) });
    rejects({ note: "a".repeat(501) });
    rejects({ note: "a\u0000b" });
    expect(parseThesis({ ...human(), note: "línea 1\nlínea 2" }).note).toContain("\n");
    // Los límites cuentan puntos de código, no unidades UTF-16.
    expect(() => parseThesis({ ...human(), note: "\u{1F327}".repeat(500) })).not.toThrow();
  });

  it("solo admite evidencia de praev o HTTPS, sin repetir", () => {
    const ref = { kind: "praev", ref: "0b6a1f3e-2c4d-4e5f-8a9b-1c2d3e4f5a6b" };
    rejects({ evidence: Array.from({ length: 9 }, (_, i) => ({ kind: "url", ref: `https://e.org/${i}` })) });
    rejects({ evidence: [{ kind: "url", ref: "http://example.org" }] });
    rejects({ evidence: [{ kind: "url", ref: "javascript:alert(1)" }] });
    rejects({ evidence: [{ kind: "url", ref: "https://user:pw@example.org" }] });
    rejects({ evidence: [{ kind: "praev", ref: "no-es-uuid" }] });
    rejects({ evidence: [ref, ref] });
  });

  it("exige agent solo si kind = 'agent'", () => {
    const agent = { model: "modelo-x", provider: "openrouter", promptVersion: "thesis.v1" };
    rejects({ agent });
    rejects({ kind: "agent", agent: null });
    rejects({ kind: "agent", agent: { ...agent, model: "" } });
    expect(parseThesis({ ...human(), kind: "agent", agent }).agent).toEqual(agent);
  });

  it("rechaza campos desconocidos", () => {
    rejects({ reasoning: "cadena de pensamiento" });
  });
});

describe("apertura del compromiso tras el cierre", () => {
  it("coincide con los bytes exactos", async () => {
    const opened = await openCommitment(utf8(vector.canonical), vector.commitment);
    expect(opened).toEqual({ status: "match", thesis: parseThesis(human()) });
  });

  it("alterar un byte da mismatch", async () => {
    const bytes = utf8(vector.canonical);
    bytes[bytes.indexOf(0x36)] = 0x37; // el primer "6" pasa a "7"
    expect((await openCommitment(bytes, vector.commitment)).status).toBe("mismatch");
  });

  it("bytes no canónicos son inválidos aunque el hash coincida", async () => {
    const pretty = utf8(JSON.stringify(JSON.parse(vector.canonical), null, 2));
    const hash = createHash("sha256").update(pretty).digest("hex");
    expect(await openCommitment(pretty, hash)).toEqual({ status: "invalid", reason: "not_canonical" });
  });

  it("un payload canónico fuera de esquema es inválido", async () => {
    const bytes = utf8(canonicalString({ ...human(), probabilityBps: 20_000 }));
    const hash = createHash("sha256").update(bytes).digest("hex");
    expect((await openCommitment(bytes, hash)).status).toBe("invalid");
  });
});
