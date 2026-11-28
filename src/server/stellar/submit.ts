import "server-only";

import { spawn } from "node:child_process";

import { rpc, StrKey, TransactionBuilder, type xdr } from "@stellar/stellar-sdk";

/**
 * Firma con una identidad del keystore de stellar-cli (`stellar tx sign
 * --sign-with-key <nombre>`). La clave nunca pasa por este proceso: solo entra
 * el XDR sin firmar y sale el XDR firmado. Uso exclusivo de los scripts del
 * operador (curador, resolvedor, agente), nunca desde la app web.
 */
export async function signWithKeystore(unsignedXdr: string, keyName: string, network = "testnet"): Promise<string> {
  if (!/^[a-z][a-z0-9_-]{0,31}$/.test(keyName)) throw new Error(`nombre de identidad inválido: ${keyName}`);
  return new Promise((resolve, reject) => {
    const child = spawn("stellar", ["tx", "sign", "--sign-with-key", keyName, "--network", network, "--quiet"], {
      stdio: ["pipe", "pipe", "pipe"],
    });
    let out = "";
    let err = "";
    child.stdout.on("data", (chunk: Buffer) => (out += chunk.toString("utf8")));
    child.stderr.on("data", (chunk: Buffer) => (err += chunk.toString("utf8")));
    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) return reject(new Error(`stellar tx sign terminó con ${code}: ${err.trim()}`));
      resolve(out.trim());
    });
    child.stdin.end(unsignedXdr);
  });
}

export type ConfirmedTransaction = {
  hash: string;
  ledger: number;
  createdAt: number;
  /** Eventos de contrato emitidos por `contractId` en esta transacción. */
  events: xdr.ContractEvent[];
};

export class TransactionNotConfirmedError extends Error {
  constructor(
    readonly hash: string,
    readonly state: "failed" | "unknown",
    message: string,
  ) {
    super(message);
    this.name = "TransactionNotConfirmedError";
  }
}

/**
 * Envía el XDR firmado y espera el resultado. Solo devuelve si la red
 * respondió `SUCCESS`; un timeout queda como `unknown`, nunca como confirmado.
 * Antes de enviar comprueba que la firma no cambió la transacción.
 */
export async function submitAndConfirm(
  server: rpc.Server,
  signedXdr: string,
  opts: { networkPassphrase: string; expectedHash: string; contractId: string; attempts?: number },
): Promise<ConfirmedTransaction> {
  const tx = TransactionBuilder.fromXDR(signedXdr, opts.networkPassphrase);
  const hash = Buffer.from(tx.hash()).toString("hex");
  if (hash !== opts.expectedHash) {
    throw new Error(`la transacción firmada (${hash}) no es la preparada (${opts.expectedHash})`);
  }
  const sent = await server.sendTransaction(tx);
  if (sent.status === "ERROR" || sent.status === "TRY_AGAIN_LATER") {
    throw new TransactionNotConfirmedError(hash, "failed", `sendTransaction respondió ${sent.status}`);
  }
  const result = await server.pollTransaction(hash, { attempts: opts.attempts ?? 30 });
  if (result.status === rpc.Api.GetTransactionStatus.SUCCESS) {
    const events = result.events.contractEventsXdr
      .flat()
      .filter((event) => {
        const id = event.contractId;
        return id !== null && StrKey.encodeContract(Buffer.from(id.toBytes())) === opts.contractId;
      });
    return { hash, ledger: result.ledger, createdAt: result.createdAt, events };
  }
  if (result.status === rpc.Api.GetTransactionStatus.FAILED) {
    throw new TransactionNotConfirmedError(hash, "failed", `la transacción ${hash} falló en el ledger ${result.ledger}`);
  }
  throw new TransactionNotConfirmedError(hash, "unknown", `sin confirmación de ${hash}: estado desconocido, reconciliar`);
}
