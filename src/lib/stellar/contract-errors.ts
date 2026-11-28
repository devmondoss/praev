/**
 * Códigos de `#[contracterror] Error` del contrato (06-stellar/02).
 *
 * El SDK 17.4 arma `Err.message` con el comentario doc de cada variante, no
 * con su nombre, así que llega vacío para casi todos. Por eso el código se
 * lee del texto de la simulación (`Error(Contract, #N)`) y se traduce aquí.
 */
export const CONTRACT_ERRORS = {
  1: "NotFound",
  2: "Exists",
  3: "InvalidTime",
  4: "Closed",
  5: "Terminal",
  6: "InvalidProbability",
  7: "InvalidSequence",
  8: "InvalidOutcome",
  9: "InvalidMode",
  10: "InvalidHash",
  11: "RoleConflict",
} as const;

export type ContractErrorName = (typeof CONTRACT_ERRORS)[keyof typeof CONTRACT_ERRORS];

const CONTRACT_ERROR = /Error\(Contract, #(\d+)\)/;

/** Nombre del error del contrato en un mensaje del host, o `null` si no lo es. */
export function contractErrorFromMessage(message: string): ContractErrorName | null {
  const match = CONTRACT_ERROR.exec(message);
  if (!match) return null;
  const code = Number(match[1]);
  return Object.hasOwn(CONTRACT_ERRORS, code)
    ? CONTRACT_ERRORS[code as keyof typeof CONTRACT_ERRORS]
    : null;
}
