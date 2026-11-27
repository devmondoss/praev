import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { activeNavHref } from "@/components/ui/nav-items";

// Lee los tokens reales de globals.css para que el test no se desincronice.
const css = readFileSync(path.resolve(__dirname, "../../src/app/globals.css"), "utf8");
const root = css.slice(css.indexOf(":root"), css.indexOf("}", css.indexOf(":root")));
const token = (name: string) => {
  const match = root.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) throw new Error(`token --${name} no encontrado`);
  return match[1];
};

/** Contraste WCAG 2.x entre dos colores hex. */
function contrast(a: string, b: string): number {
  const luminance = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => {
      const c = Number.parseInt(hex.slice(i, i + 2), 16) / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe("contraste WCAG AA de los tokens", () => {
  const grounds = ["bg", "surface"] as const;

  it("texto normal ≥ 4.5:1 sobre bg y surface", () => {
    for (const fg of ["ink", "muted", "accent", "warning", "focus"]) {
      for (const ground of grounds) {
        expect(contrast(token(fg), token(ground)), `${fg} sobre ${ground}`).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it("texto blanco sobre accent ≥ 4.5:1 (botones primarios)", () => {
    expect(contrast("#ffffff", token("accent"))).toBeGreaterThanOrEqual(4.5);
  });

  it("anillo de foco ≥ 3:1 frente al fondo (componente no textual)", () => {
    for (const ground of grounds) {
      expect(contrast(token("focus"), token(ground))).toBeGreaterThanOrEqual(3);
    }
  });

  it("la fórmula da los valores de referencia", () => {
    expect(contrast("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(contrast("#777777", "#ffffff")).toBeCloseTo(4.48, 2);
  });
});

describe("navegación activa", () => {
  it("marca Radar en / y en el detalle de una pregunta", () => {
    expect(activeNavHref("/")).toBe("/");
    expect(activeNavHref("/q/3a1f6c2e-7b4d-4e8a-9c10-2d3e4f5a6b7c")).toBe("/");
  });

  it("marca por prefijo de segmento, sin confundir rutas parecidas", () => {
    expect(activeNavHref("/makers")).toBe("/makers");
    expect(activeNavHref("/makers/GBM6H4")).toBe("/makers");
    expect(activeNavHref("/makersx")).toBeNull();
    expect(activeNavHref("/methodology")).toBe("/methodology");
    expect(activeNavHref("/verify/abc")).toBeNull();
    expect(activeNavHref(null)).toBeNull();
  });
});
