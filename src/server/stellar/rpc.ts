import { TESTNET_PASSPHRASE } from "@/lib/env";

type JsonRpcResponse<T> = { result?: T; error?: { code: number; message: string } };

async function callRpc<T>(rpcUrl: string, method: string, timeoutMs: number): Promise<T> {
  const response = await fetch(rpcUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method }),
    signal: AbortSignal.timeout(timeoutMs),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`RPC ${method} respondió ${response.status}`);
  const body = (await response.json()) as JsonRpcResponse<T>;
  if (body.error || body.result === undefined) {
    throw new Error(`RPC ${method} falló: ${body.error?.message ?? "sin resultado"}`);
  }
  return body.result;
}

export type RpcStatus = {
  status: "ok" | "error";
  latestLedger?: number;
  ledgerRetentionWindow?: number;
};

/** Healthy only if the RPC is up AND it serves Stellar testnet. */
export async function checkRpc(rpcUrl: string, timeoutMs = 5000): Promise<RpcStatus> {
  try {
    const [health, network] = await Promise.all([
      callRpc<{ status: string; latestLedger: number; ledgerRetentionWindow: number }>(
        rpcUrl,
        "getHealth",
        timeoutMs,
      ),
      callRpc<{ passphrase: string }>(rpcUrl, "getNetwork", timeoutMs),
    ]);
    if (health.status !== "healthy" || network.passphrase !== TESTNET_PASSPHRASE) {
      return { status: "error" };
    }
    return {
      status: "ok",
      latestLedger: health.latestLedger,
      ledgerRetentionWindow: health.ledgerRetentionWindow,
    };
  } catch {
    return { status: "error" };
  }
}
