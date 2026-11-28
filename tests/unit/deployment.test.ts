import { describe, expect, it } from "vitest";

import { TESTNET_PASSPHRASE } from "@/lib/env";
import { isStellarAccountId, isStellarContractId } from "@/lib/schemas/stellar";
import { CONTRACT_ERRORS, contractErrorFromMessage } from "@/lib/stellar/contract-errors";
import { DEPLOYMENT, deploymentSchema, explorerTxUrl, resolveContractId } from "@/lib/stellar/deployment";
import { Client, Error as BindingErrors } from "@/server/stellar/bindings";

describe("deployment.json (HU-17)", () => {
  it("es válido y apunta a testnet", () => {
    expect(DEPLOYMENT.network).toBe("testnet");
    expect(DEPLOYMENT.networkPassphrase).toBe(TESTNET_PASSPHRASE);
    expect(isStellarContractId(DEPLOYMENT.contractId)).toBe(true);
    expect(explorerTxUrl(DEPLOYMENT.deployTx)).toBe(
      `https://stellar.expert/explorer/testnet/tx/${DEPLOYMENT.deployTx}`,
    );
  });

  it("rechaza otra red, hashes en mayúsculas y campos extra", () => {
    expect(deploymentSchema.safeParse({ ...DEPLOYMENT, network: "mainnet" }).success).toBe(false);
    expect(
      deploymentSchema.safeParse({ ...DEPLOYMENT, wasmHash: DEPLOYMENT.wasmHash.toUpperCase() }).success,
    ).toBe(false);
    expect(deploymentSchema.safeParse({ ...DEPLOYMENT, secret: "S..." }).success).toBe(false);
    expect(deploymentSchema.safeParse({ ...DEPLOYMENT, commit: "9f4b382" }).success).toBe(false);
  });

  it("falla cerrado si el entorno configura otro contrato", () => {
    expect(resolveContractId(undefined)).toBe(DEPLOYMENT.contractId);
    expect(resolveContractId("")).toBe(DEPLOYMENT.contractId);
    expect(resolveContractId(DEPLOYMENT.contractId)).toBe(DEPLOYMENT.contractId);
    expect(() => resolveContractId("CDXPDYB3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWO3F")).toThrow(
      /no coincide/,
    );
  });
});

describe("StrKey de contratos", () => {
  it("acepta C… válidos y rechaza cuentas, checksums y versiones ajenas", () => {
    expect(isStellarContractId("CD6NNKKSKPTJ33OV7Y2D6YW2BCK3GEFFSDZ6B5KQDS7EL6LGOAGIKY5X")).toBe(true);
    // Un carácter cambiado rompe el CRC.
    expect(isStellarContractId("CD6NNKKSKPTJ33OV7Y2D6YW2BCK3GEFFSDZ6B5KQDS7EL6LGOAGIKY5Y")).toBe(false);
    // Una cuenta no es un contrato, ni al revés.
    expect(isStellarContractId("GBM6H4HBGNXGNKM4BX32CC3TCH6ALKDTAFRTNMBNSHB34ZSQL4QGBUPU")).toBe(false);
    expect(isStellarAccountId("CD6NNKKSKPTJ33OV7Y2D6YW2BCK3GEFFSDZ6B5KQDS7EL6LGOAGIKY5X")).toBe(false);
    expect(isStellarContractId("cd6nnkkskptj33ov7y2d6yw2bck3geffsdz6b5kqds7el6lgoagiky5x")).toBe(false);
  });
});

describe("bindings y errores del contrato", () => {
  const client = new Client({
    contractId: DEPLOYMENT.contractId,
    networkPassphrase: DEPLOYMENT.networkPassphrase,
    rpcUrl: "https://soroban-testnet.stellar.org",
  });

  it("exponen exactamente la interfaz de 06-stellar/02", () => {
    const names = client.spec
      .funcs()
      .map((f) => f.name.toString())
      .sort();
    expect(names).toEqual(
      [
        "__constructor",
        "cancel",
        "create_question",
        "curator",
        "get_cancellation",
        "get_forecast",
        "get_latest_seq",
        "get_question",
        "get_resolution",
        "invalidate",
        "resolve",
        "schema_version",
        "submit_forecast",
      ].sort(),
    );
  });

  it("la tabla de errores coincide con los bindings generados", () => {
    const fromBindings = Object.fromEntries(
      Object.entries(BindingErrors).map(([code, { message }]) => [code, message]),
    );
    expect(fromBindings).toEqual(Object.fromEntries(Object.entries(CONTRACT_ERRORS)));
  });

  it("lee el código del mensaje del host", () => {
    expect(contractErrorFromMessage("HostError: Error(Contract, #1)\n\nEvent log...")).toBe("NotFound");
    expect(contractErrorFromMessage("HostError: Error(Contract, #11)")).toBe("RoleConflict");
    expect(contractErrorFromMessage("HostError: Error(Contract, #99)")).toBeNull();
    expect(contractErrorFromMessage("HostError: Error(Auth, InvalidAction)")).toBeNull();
  });
});
