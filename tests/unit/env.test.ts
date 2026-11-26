import { describe, expect, it } from "vitest";
import { DEFAULT_TESTNET_RPC_URL, parseServerEnv } from "@/lib/env";

describe("parseServerEnv", () => {
  it("defaults to testnet and the public testnet RPC", () => {
    const env = parseServerEnv({});
    expect(env.NEXT_PUBLIC_STELLAR_NETWORK).toBe("testnet");
    expect(env.STELLAR_RPC_URL).toBe(DEFAULT_TESTNET_RPC_URL);
    expect(env.DATABASE_URL).toBeUndefined();
  });

  it("treats empty strings as unset", () => {
    expect(parseServerEnv({ DATABASE_URL: "", STELLAR_RPC_URL: "" }).DATABASE_URL).toBeUndefined();
  });

  it("fails closed on any network other than testnet", () => {
    expect(() => parseServerEnv({ NEXT_PUBLIC_STELLAR_NETWORK: "mainnet" })).toThrow(/testnet/);
    expect(() => parseServerEnv({ NEXT_PUBLIC_STELLAR_NETWORK: "public" })).toThrow();
  });

  it("rejects a malformed RPC URL", () => {
    expect(() => parseServerEnv({ STELLAR_RPC_URL: "not a url" })).toThrow();
  });
});
