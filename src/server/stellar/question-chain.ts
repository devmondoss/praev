import "server-only";

import { rpc } from "@stellar/stellar-sdk";

import { bytesToHex, hexToBytes } from "@/lib/hash";
import { DEPLOYMENT } from "@/lib/stellar/deployment";
import type { CreateQuestionArgs, OnChainQuestion, QuestionChain } from "@/server/questions/create";

import { Client } from "./bindings";
import { readQuestion, simulationContractError } from "./registry";
import { signWithKeystore, submitAndConfirm } from "./submit";

/**
 * `QuestionChain` real: lee con simulación y escribe firmando con la identidad
 * `keyName` del keystore de stellar-cli (el curador).
 */
export function keystoreQuestionChain(opts: { rpcUrl: string; keyName: string; curator: string }): QuestionChain {
  const reader = new Client({
    contractId: DEPLOYMENT.contractId,
    networkPassphrase: DEPLOYMENT.networkPassphrase,
    rpcUrl: opts.rpcUrl,
  });
  const writer = new Client({
    contractId: DEPLOYMENT.contractId,
    networkPassphrase: DEPLOYMENT.networkPassphrase,
    rpcUrl: opts.rpcUrl,
    publicKey: opts.curator,
  });
  const server = new rpc.Server(opts.rpcUrl);

  return {
    async readQuestion(chainId: string): Promise<OnChainQuestion | null> {
      const q = await readQuestion(reader, chainId);
      if (!q) return null;
      return {
        specHash: bytesToHex(q.spec_hash),
        curator: q.curator,
        resolver: q.resolver,
        mode: q.mode,
        closesAt: Number(q.closes_at),
        observationStart: Number(q.observation_start),
        observationEnd: Number(q.observation_end),
        resolveAfter: Number(q.resolve_after),
        resolveBy: Number(q.resolve_by),
      };
    },

    async createQuestion(args: CreateQuestionArgs) {
      const tx = await writer.create_question({
        id: hexToBytes(args.chainId),
        spec_hash: hexToBytes(args.specHash),
        resolver: args.resolver,
        mode: args.mode,
        closes_at: BigInt(args.closesAt),
        observation_start: BigInt(args.observationStart),
        observation_end: BigInt(args.observationEnd),
        resolve_after: BigInt(args.resolveAfter),
        resolve_by: BigInt(args.resolveBy),
      });
      const simError = simulationContractError(tx);
      if (simError) throw new Error(`create_question rechazada en simulación: ${simError}`);
      if (!tx.built) throw new Error("create_question no produjo una transacción");

      const expectedHash = Buffer.from(tx.built.hash()).toString("hex");
      const signed = await signWithKeystore(tx.built.toXDR(), opts.keyName);
      const confirmed = await submitAndConfirm(server, signed, {
        networkPassphrase: DEPLOYMENT.networkPassphrase,
        expectedHash,
        contractId: DEPLOYMENT.contractId,
      });

      const created = confirmed.events
        .map((event) => reader.parseEvent(event.body.v0.topics, event.body.v0.data))
        .find((event) => event?.name === "QuestionCreated");
      if (
        !created ||
        created.name !== "QuestionCreated" ||
        bytesToHex(created.data.id) !== args.chainId ||
        !created.data.spec_hash ||
        bytesToHex(created.data.spec_hash) !== args.specHash
      ) {
        throw new Error(`la tx ${confirmed.hash} dio SUCCESS pero sin el evento q_created esperado`);
      }
      return { txHash: confirmed.hash, ledger: confirmed.ledger };
    },
  };
}
