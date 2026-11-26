import { afterEach, describe, expect, it, vi } from "vitest";
import { TESTNET_PASSPHRASE } from "@/lib/env";
import { checkRpc } from "@/server/stellar/rpc";

function mockRpc(results: Record<string, unknown>) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url: string, init: RequestInit) => {
      const { method } = JSON.parse(String(init.body)) as { method: string };
      return new Response(JSON.stringify({ jsonrpc: "2.0", id: 1, result: results[method] }));
    }),
  );
}

afterEach(() => vi.unstubAllGlobals());

describe("checkRpc", () => {
  it("is ok for a healthy testnet RPC", async () => {
    mockRpc({
      getHealth: { status: "healthy", latestLedger: 100, ledgerRetentionWindow: 120960 },
      getNetwork: { passphrase: TESTNET_PASSPHRASE },
    });
    await expect(checkRpc("https://rpc.example")).resolves.toEqual({
      status: "ok",
      latestLedger: 100,
      ledgerRetentionWindow: 120960,
    });
  });

  it("fails closed when the RPC serves another network", async () => {
    mockRpc({
      getHealth: { status: "healthy", latestLedger: 100, ledgerRetentionWindow: 120960 },
      getNetwork: { passphrase: "Public Global Stellar Network ; September 2015" },
    });
    await expect(checkRpc("https://rpc.example")).resolves.toEqual({ status: "error" });
  });

  it("reports error when the RPC is unreachable", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("offline"); }));
    await expect(checkRpc("https://rpc.example")).resolves.toEqual({ status: "error" });
  });
});
