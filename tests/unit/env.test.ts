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

  it("validates operator addresses as StrKey accounts", () => {
    const resolver = "GAN5CFF43LTYGVV46YBFD3ICYVWWCXDS2GLI3J3AHF3FQC3ZCR52257G";
    expect(parseServerEnv({ PRAEV_RESOLVER_ADDRESS: resolver }).PRAEV_RESOLVER_ADDRESS).toBe(resolver);
    expect(() => parseServerEnv({ PRAEV_RESOLVER_ADDRESS: "GAN5CFF43" })).toThrow(/inválida/);
    expect(() => parseServerEnv({ PRAEV_AGENT_ADDRESS: "SBADSECRET" })).toThrow();
  });
});
