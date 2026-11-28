// Generado por @stellar/stellar-sdk 17.4.0 (`npm run contract:bindings`) desde el contrato desplegado.
// No editar a mano: regenerar tras cada despliegue.
import {Error, Forecast, Question, Resolution, Cancellation, ContractEvent} from './types.js';
import {Result, Spec, AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions, MethodOptions, ExternalExecutableRef} from '@stellar/stellar-sdk/contract';
import {Address, xdr} from '@stellar/stellar-sdk';

export interface Client {
  /**
   * Cancela antes del cierre y guarda el hash del motivo. Solo el curador.
   */
  cancel(args: { id: Uint8Array; reason_hash: Uint8Array }, options?: MethodOptions): Promise<AssembledTransaction<Result<null, Error>>>;
  curator(options?: MethodOptions): Promise<AssembledTransaction<string>>;
  /**
   * Resuelve YES (1) o NO (0) dentro de `[resolve_after, resolve_by]`.
   * Solo el resolvedor de la pregunta; el estado terminal no se puede cambiar.
   */
  resolve(args: { id: Uint8Array; outcome: number; evidence_hash: Uint8Array }, options?: MethodOptions): Promise<AssembledTransaction<Result<null, Error>>>;
  /**
   * Invalida la pregunta desde `resolve_after` (también después de
   * `resolve_by`, cuando la fuente no publicó a tiempo). Solo el resolvedor.
   */
  invalidate(args: { id: Uint8Array; evidence_hash: Uint8Array }, options?: MethodOptions): Promise<AssembledTransaction<Result<null, Error>>>;
  get_forecast(args: { id: Uint8Array; forecaster: string | Address; seq: number }, options?: MethodOptions): Promise<AssembledTransaction<Result<Forecast, Error>>>;
  get_question(args: { id: Uint8Array }, options?: MethodOptions): Promise<AssembledTransaction<Result<Question, Error>>>;
  /**
   * 0 si el maker todavía no selló ninguna versión.
   */
  get_latest_seq(args: { id: Uint8Array; forecaster: string | Address }, options?: MethodOptions): Promise<AssembledTransaction<number>>;
  get_resolution(args: { id: Uint8Array }, options?: MethodOptions): Promise<AssembledTransaction<Result<Resolution, Error>>>;
  schema_version(options?: MethodOptions): Promise<AssembledTransaction<number>>;
  /**
   * Ancla una pregunta con su `spec_hash` y sus tiempos. Solo el curador.
   */
  create_question(args: { id: Uint8Array; spec_hash: Uint8Array; resolver: string | Address; mode: number; closes_at: bigint; observation_start: bigint; observation_end: bigint; resolve_after: bigint; resolve_by: bigint }, options?: MethodOptions): Promise<AssembledTransaction<Result<null, Error>>>;
  /**
   * Sella la versión `seq` de la tesis de `forecaster`. Append-only: cada
   * versión conserva su propia prueba; `seq` debe ser la siguiente exacta.
   */
  submit_forecast(args: { id: Uint8Array; forecaster: string | Address; seq: number; commitment: Uint8Array }, options?: MethodOptions): Promise<AssembledTransaction<Result<null, Error>>>;
  get_cancellation(args: { id: Uint8Array }, options?: MethodOptions): Promise<AssembledTransaction<Result<Cancellation, Error>>>;
}

export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new Spec(["AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAACwAAAAAAAAAITm90Rm91bmQAAAABAAAAAAAAAAZFeGlzdHMAAAAAAAIAAAAAAAAAC0ludmFsaWRUaW1lAAAAAAMAAAAAAAAABkNsb3NlZAAAAAAABAAAAAAAAAAIVGVybWluYWwAAAAFAAAARFJlc2VydmFkbzogc2luIHVzbyBkZXNkZSBBRFItMDI2LCBlbCBjb250cmF0byBubyB2ZSBsYSBwcm9iYWJpbGlkYWQuAAAAEkludmFsaWRQcm9iYWJpbGl0eQAAAAAABgAAAAAAAAAPSW52YWxpZFNlcXVlbmNlAAAAAAcAAAAAAAAADkludmFsaWRPdXRjb21lAAAAAAAIAAAAAAAAAAtJbnZhbGlkTW9kZQAAAAAJAAAAAAAAAAtJbnZhbGlkSGFzaAAAAAAKAAAAAAAAAAxSb2xlQ29uZmxpY3QAAAAL", "AAAAAQAAAAAAAAAAAAAACEZvcmVjYXN0AAAAAwAAADpTSEEyNTYoYzE0bihUaGVzaXNQYXlsb2FkKSkgY29uIHNhbCBkZSAzMiBieXRlcyAoQURSLTAyNikuAAAAAAAKY29tbWl0bWVudAAAAAAD7gAAACAAAAAAAAAAA3NlcQAAAAAEAAAAAAAAAAxzdWJtaXR0ZWRfYXQAAAAG", "AAAAAQAAAAAAAAAAAAAACFF1ZXN0aW9uAAAACgAAAAAAAAAJY2xvc2VzX2F0AAAAAAAABgAAAAAAAAAHY3VyYXRvcgAAAAATAAAADzAgTElWRSwgMSBERU1PLgAAAAAEbW9kZQAAAAQAAAAAAAAAD29ic2VydmF0aW9uX2VuZAAAAAAGAAAAAAAAABFvYnNlcnZhdGlvbl9zdGFydAAAAAAAAAYAAAAAAAAADXJlc29sdmVfYWZ0ZXIAAAAAAAAGAAAAAAAAAApyZXNvbHZlX2J5AAAAAAAGAAAAAAAAAAhyZXNvbHZlcgAAABMAAAAAAAAACXNwZWNfaGFzaAAAAAAAA+4AAAAgAAAALzAgYWN0aXZhLCAxIHJlc3VlbHRhLCAyIGludsOhbGlkYSwgMyBjYW5jZWxhZGEuAAAAAAh0ZXJtaW5hbAAAAAQ=", "AAAAAQAAAAAAAAAAAAAAClJlc29sdXRpb24AAAAAAAMAAAA2U0hBLTI1NiBkZWwgbWFuaWZpZXN0byBkZSBldmlkZW5jaWEgZGUgbGEgcmVzb2x1Y2nDs24uAAAAAAANZXZpZGVuY2VfaGFzaAAAAAAAA+4AAAAgAAAAFzAgTk8sIDEgWUVTLCAyIElOVkFMSUQuAAAAAAdvdXRjb21lAAAAAAQAAAAAAAAAC3Jlc29sdmVkX2F0AAAAAAY=", "AAAAAQAAAAAAAAAAAAAADENhbmNlbGxhdGlvbgAAAAIAAAAAAAAADGNhbmNlbGxlZF9hdAAAAAYAAAAnU0hBLTI1NiBkZWwgbW90aXZvIHB1YmxpY2FkbyBvZmYtY2hhaW4uAAAAAAtyZWFzb25faGFzaAAAAAPuAAAAIA==", "AAAABQAAAEFQcmVndW50YSBjcmVhZGEuIEVsIHZlcmlmaWNhZG9yIGNvbXBhcmEgZXN0b3MgY2FtcG9zIGNvbiBsYSBzcGVjLgAAAAAAAAAAAAAPUXVlc3Rpb25DcmVhdGVkAAAAAAEAAAAJcV9jcmVhdGVkAAAAAAAACgAAAAAAAAACaWQAAAAAA+4AAAAgAAAAAQAAAAAAAAAJc3BlY19oYXNoAAAAAAAD7gAAACAAAAAAAAAAAAAAAAdjdXJhdG9yAAAAABMAAAAAAAAAAAAAAAhyZXNvbHZlcgAAABMAAAAAAAAAAAAAAARtb2RlAAAABAAAAAAAAAAAAAAACWNsb3Nlc19hdAAAAAAAAAYAAAAAAAAAAAAAABFvYnNlcnZhdGlvbl9zdGFydAAAAAAAAAYAAAAAAAAAAAAAAA9vYnNlcnZhdGlvbl9lbmQAAAAABgAAAAAAAAAAAAAADXJlc29sdmVfYWZ0ZXIAAAAAAAAGAAAAAAAAAAAAAAAKcmVzb2x2ZV9ieQAAAAAABgAAAAAAAAAC", "AAAABQAAADFQcmVndW50YSByZXN1ZWx0YSBjb24gWUVTIG8gTk8gcG9yIHN1IHJlc29sdmVkb3IuAAAAAAAAAAAAABBRdWVzdGlvblJlc29sdmVkAAAAAQAAAAhyZXNvbHZlZAAAAAQAAAAAAAAAAmlkAAAAAAPuAAAAIAAAAAEAAAAAAAAAB291dGNvbWUAAAAABAAAAAAAAAAAAAAADWV2aWRlbmNlX2hhc2gAAAAAAAPuAAAAIAAAAAAAAAAAAAAAC3Jlc29sdmVkX2F0AAAAAAYAAAAAAAAAAg==", "AAAABQAAADlUZXNpcyBzZWxsYWRhOiBzb2xvIGVsIGNvbXByb21pc28sIG51bmNhIGxhIHByb2JhYmlsaWRhZC4AAAAAAAAAAAAAEUZvcmVjYXN0U3VibWl0dGVkAAAAAAAAAQAAAAhmb3JlY2FzdAAAAAUAAAAAAAAAAmlkAAAAAAPuAAAAIAAAAAEAAAAAAAAACmZvcmVjYXN0ZXIAAAAAABMAAAABAAAAAAAAAANzZXEAAAAABAAAAAAAAAAAAAAACmNvbW1pdG1lbnQAAAAAA+4AAAAgAAAAAAAAAAAAAAAMc3VibWl0dGVkX2F0AAAABgAAAAAAAAAC", "AAAABQAAADNQcmVndW50YSBjYW5jZWxhZGEgcG9yIGVsIGN1cmFkb3IgYW50ZXMgZGVsIGNpZXJyZS4AAAAAAAAAABFRdWVzdGlvbkNhbmNlbGxlZAAAAAAAAAEAAAAJY2FuY2VsbGVkAAAAAAAAAwAAAAAAAAACaWQAAAAAA+4AAAAgAAAAAQAAAAAAAAALcmVhc29uX2hhc2gAAAAD7gAAACAAAAAAAAAAAAAAAAxjYW5jZWxsZWRfYXQAAAAGAAAAAAAAAAI=", "AAAABQAAAEFQcmVndW50YSBpbnZhbGlkYWRhOiBtaXNtbyBwYXlsb2FkIHF1ZSBgcmVzb2x2ZWRgLCBjb24gb3V0Y29tZSAyLgAAAAAAAAAAAAATUXVlc3Rpb25JbnZhbGlkYXRlZAAAAAABAAAAB2ludmFsaWQAAAAABAAAAAAAAAACaWQAAAAAA+4AAAAgAAAAAQAAAAAAAAAHb3V0Y29tZQAAAAAEAAAAAAAAAAAAAAANZXZpZGVuY2VfaGFzaAAAAAAAA+4AAAAgAAAAAAAAAAAAAAALcmVzb2x2ZWRfYXQAAAAABgAAAAAAAAAC", "AAAAAAAAAEZDYW5jZWxhIGFudGVzIGRlbCBjaWVycmUgeSBndWFyZGEgZWwgaGFzaCBkZWwgbW90aXZvLiBTb2xvIGVsIGN1cmFkb3IuAAAAAAAGY2FuY2VsAAAAAAACAAAAAAAAAAJpZAAAAAAD7gAAACAAAAAAAAAAC3JlYXNvbl9oYXNoAAAAA+4AAAAgAAAAAQAAA+kAAAACAAAH0AAAAAVFcnJvcgAAAA==", "AAAAAAAAAAAAAAAHY3VyYXRvcgAAAAAAAAAAAQAAABM=", "AAAAAAAAAI1SZXN1ZWx2ZSBZRVMgKDEpIG8gTk8gKDApIGRlbnRybyBkZSBgW3Jlc29sdmVfYWZ0ZXIsIHJlc29sdmVfYnldYC4KU29sbyBlbCByZXNvbHZlZG9yIGRlIGxhIHByZWd1bnRhOyBlbCBlc3RhZG8gdGVybWluYWwgbm8gc2UgcHVlZGUgY2FtYmlhci4AAAAAAAAHcmVzb2x2ZQAAAAADAAAAAAAAAAJpZAAAAAAD7gAAACAAAAAAAAAAB291dGNvbWUAAAAABAAAAAAAAAANZXZpZGVuY2VfaGFzaAAAAAAAA+4AAAAgAAAAAQAAA+kAAAACAAAH0AAAAAVFcnJvcgAAAA==", "AAAAAAAAAIpJbnZhbGlkYSBsYSBwcmVndW50YSBkZXNkZSBgcmVzb2x2ZV9hZnRlcmAgKHRhbWJpw6luIGRlc3B1w6lzIGRlCmByZXNvbHZlX2J5YCwgY3VhbmRvIGxhIGZ1ZW50ZSBubyBwdWJsaWPDsyBhIHRpZW1wbykuIFNvbG8gZWwgcmVzb2x2ZWRvci4AAAAAAAppbnZhbGlkYXRlAAAAAAACAAAAAAAAAAJpZAAAAAAD7gAAACAAAAAAAAAADWV2aWRlbmNlX2hhc2gAAAAAAAPuAAAAIAAAAAEAAAPpAAAAAgAAB9AAAAAFRXJyb3IAAAA=", "AAAAAAAAAAAAAAAMZ2V0X2ZvcmVjYXN0AAAAAwAAAAAAAAACaWQAAAAAA+4AAAAgAAAAAAAAAApmb3JlY2FzdGVyAAAAAAATAAAAAAAAAANzZXEAAAAABAAAAAEAAAPpAAAH0AAAAAhGb3JlY2FzdAAAB9AAAAAFRXJyb3IAAAA=", "AAAAAAAAAAAAAAAMZ2V0X3F1ZXN0aW9uAAAAAQAAAAAAAAACaWQAAAAAA+4AAAAgAAAAAQAAA+kAAAfQAAAACFF1ZXN0aW9uAAAH0AAAAAVFcnJvcgAAAA==", "AAAAAAAAAAAAAAANX19jb25zdHJ1Y3RvcgAAAAAAAAEAAAAAAAAAB2N1cmF0b3IAAAAAEwAAAAA=", "AAAAAAAAADIwIHNpIGVsIG1ha2VyIHRvZGF2w61hIG5vIHNlbGzDsyBuaW5ndW5hIHZlcnNpw7NuLgAAAAAADmdldF9sYXRlc3Rfc2VxAAAAAAACAAAAAAAAAAJpZAAAAAAD7gAAACAAAAAAAAAACmZvcmVjYXN0ZXIAAAAAABMAAAABAAAABA==", "AAAAAAAAAAAAAAAOZ2V0X3Jlc29sdXRpb24AAAAAAAEAAAAAAAAAAmlkAAAAAAPuAAAAIAAAAAEAAAPpAAAH0AAAAApSZXNvbHV0aW9uAAAAAAfQAAAABUVycm9yAAAA", "AAAAAAAAAAAAAAAOc2NoZW1hX3ZlcnNpb24AAAAAAAAAAAABAAAABA==", "AAAAAAAAAEVBbmNsYSB1bmEgcHJlZ3VudGEgY29uIHN1IGBzcGVjX2hhc2hgIHkgc3VzIHRpZW1wb3MuIFNvbG8gZWwgY3VyYWRvci4AAAAAAAAPY3JlYXRlX3F1ZXN0aW9uAAAAAAkAAAAAAAAAAmlkAAAAAAPuAAAAIAAAAAAAAAAJc3BlY19oYXNoAAAAAAAD7gAAACAAAAAAAAAACHJlc29sdmVyAAAAEwAAAAAAAAAEbW9kZQAAAAQAAAAAAAAACWNsb3Nlc19hdAAAAAAAAAYAAAAAAAAAEW9ic2VydmF0aW9uX3N0YXJ0AAAAAAAABgAAAAAAAAAPb2JzZXJ2YXRpb25fZW5kAAAAAAYAAAAAAAAADXJlc29sdmVfYWZ0ZXIAAAAAAAAGAAAAAAAAAApyZXNvbHZlX2J5AAAAAAAGAAAAAQAAA+kAAAACAAAH0AAAAAVFcnJvcgAAAA==", "AAAAAAAAAI5TZWxsYSBsYSB2ZXJzacOzbiBgc2VxYCBkZSBsYSB0ZXNpcyBkZSBgZm9yZWNhc3RlcmAuIEFwcGVuZC1vbmx5OiBjYWRhCnZlcnNpw7NuIGNvbnNlcnZhIHN1IHByb3BpYSBwcnVlYmE7IGBzZXFgIGRlYmUgc2VyIGxhIHNpZ3VpZW50ZSBleGFjdGEuAAAAAAAPc3VibWl0X2ZvcmVjYXN0AAAAAAQAAAAAAAAAAmlkAAAAAAPuAAAAIAAAAAAAAAAKZm9yZWNhc3RlcgAAAAAAEwAAAAAAAAADc2VxAAAAAAQAAAAAAAAACmNvbW1pdG1lbnQAAAAAA+4AAAAgAAAAAQAAA+kAAAACAAAH0AAAAAVFcnJvcgAAAA==", "AAAAAAAAAAAAAAAQZ2V0X2NhbmNlbGxhdGlvbgAAAAEAAAAAAAAAAmlkAAAAAAPuAAAAIAAAAAEAAAPpAAAH0AAAAAxDYW5jZWxsYXRpb24AAAfQAAAABUVycm9yAAAA"]),
      options
    );
  }

   static deploy<T = Client>(args: { curator: string | Address }, options: MethodOptions & Omit<ContractClientOptions, 'contractId'> & { salt?: Uint8Array; address?: string; } & ({ wasmHash: Uint8Array | string; format?: "hex" | "base64"; externalRef?: never; } | { externalRef: ExternalExecutableRef; wasmHash?: never; format?: never; })): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(args, options);
  }
  public readonly fromJson = {
    cancel : this.txFromJson<Result<null, Error>>,  curator : this.txFromJson<string>,  resolve : this.txFromJson<Result<null, Error>>,  invalidate : this.txFromJson<Result<null, Error>>,  get_forecast : this.txFromJson<Result<Forecast, Error>>,  get_question : this.txFromJson<Result<Question, Error>>,  get_latest_seq : this.txFromJson<number>,  get_resolution : this.txFromJson<Result<Resolution, Error>>,  schema_version : this.txFromJson<number>,  create_question : this.txFromJson<Result<null, Error>>,  submit_forecast : this.txFromJson<Result<null, Error>>,  get_cancellation : this.txFromJson<Result<Cancellation, Error>>
  };

  /** @deprecated Use fromJson instead. */
  public readonly fromJSON = this.fromJson;

  /**
   * Parse a raw contract event (topics + data) into a typed {@link ContractEvent}.
   */
  parseEvent(topics: xdr.ScVal[] | string[], data: xdr.ScVal | string): ContractEvent | undefined {
    return this.spec.parseEvent(topics, data) as ContractEvent | undefined;
  }
  /**
   * Build a topics filter row for the "QuestionCreated" event, for use in `Api.EventFilter.topics` when calling `server.getEvents`. Omitted fields match any value.
   */
  questionCreatedEventFilter(topicValues?: { id?: Uint8Array }): string[] {
    return this.spec.eventTopicFilter("QuestionCreated", topicValues);
  }
  /**
   * Build a topics filter row for the "QuestionResolved" event, for use in `Api.EventFilter.topics` when calling `server.getEvents`. Omitted fields match any value.
   */
  questionResolvedEventFilter(topicValues?: { id?: Uint8Array }): string[] {
    return this.spec.eventTopicFilter("QuestionResolved", topicValues);
  }
  /**
   * Build a topics filter row for the "ForecastSubmitted" event, for use in `Api.EventFilter.topics` when calling `server.getEvents`. Omitted fields match any value.
   */
  forecastSubmittedEventFilter(topicValues?: { id?: Uint8Array; forecaster?: string | Address }): string[] {
    return this.spec.eventTopicFilter("ForecastSubmitted", topicValues);
  }
  /**
   * Build a topics filter row for the "QuestionCancelled" event, for use in `Api.EventFilter.topics` when calling `server.getEvents`. Omitted fields match any value.
   */
  questionCancelledEventFilter(topicValues?: { id?: Uint8Array }): string[] {
    return this.spec.eventTopicFilter("QuestionCancelled", topicValues);
  }
  /**
   * Build a topics filter row for the "QuestionInvalidated" event, for use in `Api.EventFilter.topics` when calling `server.getEvents`. Omitted fields match any value.
   */
  questionInvalidatedEventFilter(topicValues?: { id?: Uint8Array }): string[] {
    return this.spec.eventTopicFilter("QuestionInvalidated", topicValues);
  }
}
