/**
 * Esquemas Zod compartidos por la spec de pregunta y la tesis. Puros: corren
 * igual en el navegador y en el servidor.
 */
import { z } from "zod";

import { UUID_LOWER } from "@/lib/hash";

import { isStellarAccountId } from "./stellar";

/** Longitud en puntos de código tras NFC, que es lo que se hashea. */
export const codePoints = (s: string) => [...s.normalize("NFC")].length;

/** Controles C0/DEL; `multiline` deja pasar `\n`. */
const hasControlChars = (s: string, multiline: boolean) =>
  multiline ? /[\u0000-\u0009\u000b-\u001f\u007f]/.test(s) : /[\u0000-\u001f\u007f]/.test(s);

/** Texto con límite en puntos de código, sin controles y normalizado a NFC. */
export const text = (max: number, { required = false, multiline = false } = {}) =>
  z
    .string()
    .refine((s) => codePoints(s) <= max, { message: `máximo ${max} caracteres` })
    .refine((s) => !hasControlChars(s, multiline), { message: "caracteres de control no permitidos" })
    .refine((s) => !required || s.trim().length > 0, { message: "no puede estar vacío" })
    // Lo que se muestra es exactamente lo que se hashea.
    .transform((s) => s.normalize("NFC"));

export const bps = z.int().min(0).max(10_000);

export const uuidLower = z.string().regex(UUID_LOWER, "debe ser un UUID en minúsculas");

export const stellarAccount = z
  .string()
  .refine(isStellarAccountId, { message: "dirección Stellar inválida" });

/** Unix segundos, entero no negativo. */
export const unixSeconds = z.int().min(0);

export const httpsUrl = (max = 2048) =>
  z
    .string()
    .max(max)
    .refine(
      (s) => {
        try {
          const url = new URL(s);
          return url.protocol === "https:" && url.username === "" && url.password === "";
        } catch {
          return false;
        }
      },
      { message: "debe ser una URL HTTPS sin credenciales" },
    );
