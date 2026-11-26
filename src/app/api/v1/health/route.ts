import { connection } from "next/server";
import { getDb } from "@/server/db/client";
import { getServerEnv } from "@/server/env";
import { checkRpc } from "@/server/stellar/rpc";

async function checkDb(): Promise<"ok" | "error"> {
  try {
    await getDb()`select 1`;
    return "ok";
  } catch {
    return "error";
  }
}

export async function GET() {
  await connection();
  const env = getServerEnv();
  const [db, rpc] = await Promise.all([checkDb(), checkRpc(env.STELLAR_RPC_URL)]);
  return Response.json(
    { app: "ok", network: env.NEXT_PUBLIC_STELLAR_NETWORK, db, rpc: rpc.status, latestLedger: rpc.latestLedger ?? null },
    { headers: { "cache-control": "no-store" } },
  );
}
