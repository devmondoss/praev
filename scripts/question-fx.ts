/**
 * Genera la spec de una pregunta fx_daily desde la plantilla (HU-22):
 *   npm run question:fx -- --date 2026-12-01 --threshold 3.480 [--country PE] [--mode LIVE|DEMO]
 * Escribe questions/<modo>/<fecha>-fx-<país>.json; no la publica (eso es question:create).
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";

import { loadEnvConfig } from "@next/env";

import { fxDailySpec } from "@/domain/questions/templates/fx-daily";
import { canonicalString } from "@/lib/hash";
import { parseServerEnv } from "@/lib/env";
import { DEPLOYMENT } from "@/lib/stellar/deployment";

function main() {
  loadEnvConfig(process.cwd());
  const { values } = parseArgs({
    options: {
      date: { type: "string" },
      threshold: { type: "string" },
      country: { type: "string", default: "PE" },
      mode: { type: "string", default: "LIVE" },
      out: { type: "string" },
    },
    strict: true,
  });
  if (!values.date || !values.threshold) throw new Error("faltan --date YYYY-MM-DD y --threshold N.NNN");
  if (values.mode !== "LIVE" && values.mode !== "DEMO") throw new Error("--mode debe ser LIVE o DEMO");

  const env = parseServerEnv(process.env);
  if (!env.PRAEV_RESOLVER_ADDRESS) throw new Error("falta PRAEV_RESOLVER_ADDRESS en el entorno");

  const spec = fxDailySpec({
    id: crypto.randomUUID(),
    date: values.date,
    threshold: values.threshold,
    country: values.country.toUpperCase(),
    mode: values.mode,
    curator: DEPLOYMENT.curator,
    resolver: env.PRAEV_RESOLVER_ADDRESS,
  });

  const out =
    values.out ??
    path.join("questions", values.mode.toLowerCase(), `${values.date}-fx-${spec.country.toLowerCase()}.json`);
  if (existsSync(out)) throw new Error(`${out} ya existe: no se sobrescribe una spec`);
  mkdirSync(path.dirname(out), { recursive: true });
  // Bytes canónicos + salto de línea final: question:create recalcula los mismos bytes.
  writeFileSync(out, `${canonicalString(spec)}\n`);
  console.log(`${out}\n${spec.title}\nid ${spec.id} · cierra ${new Date(spec.closesAt * 1000).toISOString()}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
