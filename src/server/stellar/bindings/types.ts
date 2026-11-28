// Generado por @stellar/stellar-sdk 17.4.0 (`npm run contract:bindings`) desde el contrato desplegado.
// No editar a mano: regenerar tras cada despliegue.
import {Address} from '@stellar/stellar-sdk';

    /**
 * Error Enum: Error
 */
export const Error = {
  1 : { message: "NotFound" },
  2 : { message: "Exists" },
  3 : { message: "InvalidTime" },
  4 : { message: "Closed" },
  5 : { message: "Terminal" },
  /**
   * Reservado: sin uso desde ADR-026, el contrato no ve la probabilidad.
   */
  6 : { message: "InvalidProbability" },
  7 : { message: "InvalidSequence" },
  8 : { message: "InvalidOutcome" },
  9 : { message: "InvalidMode" },
  10 : { message: "InvalidHash" },
  11 : { message: "RoleConflict" }
}

/**
 * Struct: Forecast
 */
export interface Forecast {
  /**
   * SHA256(c14n(ThesisPayload)) con sal de 32 bytes (ADR-026).
   */
  commitment: Uint8Array;
  seq: number;
  submitted_at: bigint;
}

/**
 * Struct: Question
 */
export interface Question {
  closes_at: bigint;
  curator: string;
  /**
   * 0 LIVE, 1 DEMO.
   */
  mode: number;
  observation_end: bigint;
  observation_start: bigint;
  resolve_after: bigint;
  resolve_by: bigint;
  resolver: string;
  spec_hash: Uint8Array;
  /**
   * 0 activa, 1 resuelta, 2 inválida, 3 cancelada.
   */
  terminal: number;
}

/**
 * Struct: Resolution
 */
export interface Resolution {
  /**
   * SHA-256 del manifiesto de evidencia de la resolución.
   */
  evidence_hash: Uint8Array;
  /**
   * 0 NO, 1 YES, 2 INVALID.
   */
  outcome: number;
  resolved_at: bigint;
}

/**
 * Struct: Cancellation
 */
export interface Cancellation {
  cancelled_at: bigint;
  /**
   * SHA-256 del motivo publicado off-chain.
   */
  reason_hash: Uint8Array;
}

/**
 * Pregunta creada. El verificador compara estos campos con la spec.
 */
export interface QuestionCreatedEvent {
  name: "QuestionCreated";
  data: {
    id: Uint8Array;
    spec_hash?: Uint8Array;
    curator?: string;
    resolver?: string;
    mode?: number;
    closes_at?: bigint;
    observation_start?: bigint;
    observation_end?: bigint;
    resolve_after?: bigint;
    resolve_by?: bigint;
  };
}

/**
 * Pregunta resuelta con YES o NO por su resolvedor.
 */
export interface QuestionResolvedEvent {
  name: "QuestionResolved";
  data: {
    id: Uint8Array;
    outcome?: number;
    evidence_hash?: Uint8Array;
    resolved_at?: bigint;
  };
}

/**
 * Tesis sellada: solo el compromiso, nunca la probabilidad.
 */
export interface ForecastSubmittedEvent {
  name: "ForecastSubmitted";
  data: {
    id: Uint8Array;
    forecaster: string;
    seq?: number;
    commitment?: Uint8Array;
    submitted_at?: bigint;
  };
}

/**
 * Pregunta cancelada por el curador antes del cierre.
 */
export interface QuestionCancelledEvent {
  name: "QuestionCancelled";
  data: {
    id: Uint8Array;
    reason_hash?: Uint8Array;
    cancelled_at?: bigint;
  };
}

/**
 * Pregunta invalidada: mismo payload que `resolved`, con outcome 2.
 */
export interface QuestionInvalidatedEvent {
  name: "QuestionInvalidated";
  data: {
    id: Uint8Array;
    outcome?: number;
    evidence_hash?: Uint8Array;
    resolved_at?: bigint;
  };
}
    export type ContractEvent = QuestionCreatedEvent | QuestionResolvedEvent | ForecastSubmittedEvent | QuestionCancelledEvent | QuestionInvalidatedEvent;
    
