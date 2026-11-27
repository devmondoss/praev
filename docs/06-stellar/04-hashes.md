# Canonicalización, hashes y verificador

**Estado:** P0 normativo · **Versión:** 1.2 · **Fecha:** 2026-11-27

Algoritmo SHA-256, salida lowercase 64 hex en API/DB; chain BytesN<32>. `questionIdChain=SHA256(UTF8(uuid lowercase))`. Para documentos JSON: usar perfil `praev-c14n-v1`, objetos keys ASCII ordenadas lexicográficamente, arrays mantienen orden, sin whitespace, UTF-8, strings NFC, números enteros seguros (no -0, NaN, float, bigint directo), boolean/null; rechazar keys no ASCII o valores inválidos, normalizar strings antes de serializar con `JSON.stringify` y validar entradas. No confiar en orden de JSONB. Guardar bytes canónicos exactos como bytea, no reserializar para verificar. No afirmar compatibilidad RFC 8785 completa. `specHash=SHA256(canonicalBytes(spec))`; `commitment = SHA256(canonicalBytes(ThesisPayload))` con el payload `praev.thesis.v1` de [04-forecast](../04-domain/04-forecast.md), que incluye una sal de 32 bytes en hex generada con CSPRNG; los arrays (`factors`, `evidence`) conservan el orden del maker; `evidenceHash` del manifest de resolución con hashes de archivos. Raw bytes se hashean directamente. Dominios separados mediante campo schema constante.

Verificador: descargar payload, recalcular hash, comparar con chain; verificar id derivado, contractId/red, tx o estado y campos relevantes. El contrato no recalcula JSON: operador/cliente debe comprobar que campos de spec (fechas, roles, mode) coinciden con argumentos chain; mismatch no verifica. Una tx exitosa para otro contrato no es prueba. Mostrar tres resultados: `match`, `mismatch`, `unavailable`. El hash prueba integridad, no autoría de la fuente ni verdad.

El navegador recalcula el compromiso con el mismo canonicalizador **antes de firmar** y lo compara con el que devolvió `prepare`; si difieren, no se firma. Tras el cierre, el verificador recalcula el compromiso de cada tesis revelada y lo compara con `get_forecast`.

Vectores mínimos: SHA256 ASCII `abc` = `ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad`. `{"b":2,"a":1}` y `{"a":1,"b":2}` canonicalizan a `{"a":1,"b":2}`. Cambiar un byte, un campo o el orden de array cambia hash. Probar NFC y rechazo de floats. Dos tesis idénticas con sal distinta dan compromisos distintos; una sal que no sea 64 hex se rechaza. JS browser usa Web Crypto, Node crypto; mismo canonicalizer compartido.

## Implementación (HU-08)

| Pieza | Módulo |
|---|---|
| Canonicalizador `praev-c14n-v1` e `isCanonicalJson` | `src/lib/hash/c14n.ts` |
| SHA-256 con Web Crypto, hex, `chainIdFromUuid`, `hashCanonical` | `src/lib/hash/sha256.ts`, `src/lib/hash/index.ts` |
| StrKey de cuentas `G…` (base32 + CRC16-XModem), sin dependencias | `src/lib/schemas/stellar.ts` |
| `ThesisPayload` con Zod, `generateSalt`, `sealThesis`, `openCommitment` | `src/domain/forecasts/thesis.ts` |

Los cuatro módulos usan solo APIs estándar (`crypto.subtle`, `crypto.getRandomValues`, `TextEncoder`); un test impide que importen `node:*` o `server-only`, para que el navegador use el mismo código. Los textos de la tesis se normalizan a NFC al validarlos, así que lo que el maker ve es lo que se hashea. `openCommitment` hashea los bytes revelados tal cual y solo después exige forma canónica y esquema: el resultado es `match`, `mismatch` o `invalid`. Comprobar `questionId`, `forecaster` y `seq` contra la cadena y el corte temporal queda en el revelado (HU-47).

Vector fijo DEMO en `fixtures/expected/thesis-commitment.json`: tesis, bytes canónicos y `commitment = fa353408355e139d7b591bf08c45fcdd0932c982ecc344762b6c6c51fb9c70d6`, comprobado contra `node:crypto`. Cualquier otra implementación del verificador debe reproducirlo.
