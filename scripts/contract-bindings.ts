/**
 * Regenera los bindings TS desde el contrato de deployment.json (HU-17):
 *   npm run contract:bindings
 * Usa el generador de @stellar/stellar-sdk y copia solo src/*.ts con cabecera.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import deployment from "../deployment.json";

const target = path.resolve(import.meta.dirname, "../src/server/stellar/bindings");
const sdkVersion = JSON.parse(
  readFileSync(path.resolve(import.meta.dirname, "../node_modules/@stellar/stellar-sdk/package.json"), "utf8"),
).version as string;
const header = [
  `// Generado por @stellar/stellar-sdk ${sdkVersion} (\`npm run contract:bindings\`) desde el contrato desplegado.`,
  "// No editar a mano: regenerar tras cada despliegue.",
  "",
].join("\n");

const work = mkdtempSync(path.join(tmpdir(), "praev-bindings-"));
try {
  execFileSync(
    "npx",
    [
      "stellar-js",
      "generate",
      "--contract-id",
      deployment.contractId,
      "--network",
      deployment.network,
      "--contract-name",
      "praev-registry",
      "--output-dir",
      work,
      "--overwrite",
    ],
    { stdio: "inherit" },
  );
  for (const file of ["types.ts", "client.ts", "index.ts"]) {
    const source = readFileSync(path.join(work, "src", file), "utf8");
    writeFileSync(path.join(target, file), `${header}${source}\n`);
  }
  console.log(`bindings de ${deployment.contractId} escritos en ${path.relative(process.cwd(), target)}`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
