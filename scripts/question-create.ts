/**
 * Publica una pregunta (HU-22):  npm run question:create -- <spec.json>
 * Valida la spec, guarda sus bytes exactos, la crea on-chain firmando con la
 * identidad `curator` del keystore de stellar-cli, espera SUCCESS y reconcilia.
 * Sale con código ≠ 0 ante cualquier falta o discrepancia.
 */
import { readFileSync } from "node:fs";

import { loadEnvConfig } from "@next/env";
import postgres from "postgres";

import { parseServerEnv } from "@/lib/env";
import { DEPLOYMENT, explorerTxUrl } from "@/lib/stellar/deployment";
import { ensureDeployment } from "@/server/db/deployments";
import { postgresDb } from "@/server/db/sql";
import { createQuestion } from "@/server/questions/create";
import { keystoreQuestionChain } from "@/server/stellar/question-chain";

async function main() {
  loadEnvConfig(process.cwd());
  const file = process.argv[2];
  if (!file) throw new Error("uso: npm run question:create -- <spec.json>");

  const env = parseServerEnv(process.env);
  const url = env.DATABASE_URL_UNPOOLED ?? env.DATABASE_URL;
  if (!url) throw new Error("falta DATABASE_URL");
  if (!env.PRAEV_RESOLVER_ADDRESS) throw new Error("falta PRAEV_RESOLVER_ADDRESS");
  if (env.PRAEV_CURATOR_ADDRESS && env.PRAEV_CURATOR_ADDRESS !== DEPLOYMENT.curator) {
    throw new Error("PRAEV_CURATOR_ADDRESS no coincide con el curador de deployment.json");
  }

  const spec: unknown = JSON.parse(readFileSync(file, "utf8"));
  const local = ["localhost", "127.0.0.1"].includes(new URL(url).hostname);
  const sql = postgres(url, { max: 1, ssl: local ? false : "require", onnotice: () => {} });
  try {
    const db = postgresDb(sql);
    const deploymentId = await ensureDeployment(db, DEPLOYMENT);
    const result = await createQuestion(
      {
        db,
        deploymentId,
        chain: keystoreQuestionChain({
          rpcUrl: env.STELLAR_RPC_URL,
          keyName: process.env.PRAEV_CURATOR_KEY ?? "curator",
          curator: DEPLOYMENT.curator,
        }),
        curator: DEPLOYMENT.curator,
        resolver: env.PRAEV_RESOLVER_ADDRESS,
        now: () => Math.floor(Date.now() / 1000),
      },
      spec,
    );
    console.log(
      JSON.stringify(
        {
          outcome: result.outcome,
          id: result.question.id,
          chainId: result.chainId,
          specHash: result.question.specHash,
          status: result.question.status,
          tx: result.txHash,
          explorer: result.txHash ? explorerTxUrl(result.txHash) : null,
        },
        null,
        2,
      ),
    );
  } finally {
    await sql.end();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
