# Tesis sellada y versiones

**Estado:** P0 · **Versión:** 2.0 · **Fecha:** 2026-11-26

Un maker no publica solo un número: publica una **tesis** (ADR-025) y la **sella** hasta el cierre (ADR-026). En la cadena queda el compromiso; el contenido se revela al cerrar la pregunta.

## Tesis

```ts
type ThesisPayload = {
 schema: 'praev.thesis.v1';
 questionId: string; forecaster: string; seq: number;   // seq = la versión que se va a sellar
 kind: 'human' | 'agent';
 probabilityBps: number;                                 // entero 0..10000
 anchorBps: number | null;                               // la frecuencia histórica que el maker toma como punto de partida
 factors: Array<{ label: string; direction: 'up' | 'down' }>;  // 0..3; label ≤ 120
 evidence: Array<{ kind: 'praev' | 'url'; ref: string }>;     // 0..8; 'praev' = ID de Evidence, 'url' = HTTPS
 changeMyMind: string;                                   // ≤ 240; señal concreta que haría cambiar la probabilidad
 note: string;                                           // ≤ 500; opcional, puede ser ''
 informationCutoff: number;                              // Unix s; nada posterior puede citarse
 agent: { model: string; provider: string; promptVersion: string } | null;  // obligatorio si kind = 'agent'
 salt: string;                                           // 64 hex = 32 bytes de un CSPRNG
};
```

- **Probabilidad** es lo único obligatorio además de `salt` y metadatos; los demás campos pueden ir vacíos, pero la UI los pide y el perfil muestra cuántas tesis están completas.
- **Ancla:** praev sugiere la frecuencia histórica calculada con la misma fuente oficial (ver [06-consensus](06-consensus.md)); el maker puede aceptarla, cambiarla o dejarla vacía. Pensar desde el ancla es la técnica básica de un buen pronosticador.
- **Factores:** qué empuja la probabilidad hacia arriba o hacia abajo desde el ancla. Lista sugerida por subcategoría más texto libre.
- **Evidencia:** IDs de evidencia admitida por praev o URLs HTTPS. Se renderizan como texto, nunca se ejecutan.
- **Sal:** sin ella, alguien podría probar los 10.001 valores posibles contra el compromiso y descubrir la probabilidad. La genera el navegador con Web Crypto (humano) o el runner con `crypto.randomBytes` (agente). Nunca se reutiliza.

## Compromiso y versiones

`commitment = SHA256(c14n(ThesisPayload))` con el perfil `praev-c14n-v1` (ver [06-stellar/04](../06-stellar/04-hashes.md)). Cada versión confirmada guarda `questionId, address, seq, commitment, ledgerTime, txHash, mode`. `seq` empieza en 1 por (pregunta, address) y sube exactamente uno. El maker puede actualizar su tesis hasta el cierre; cada versión conserva su propia prueba.

**Recibo de sellado:** al firmar, el navegador guarda el `ThesisPayload` completo en localStorage (`praev.sealed.v1`) y ofrece descargarlo. Con el recibo, el maker puede revelar su tesis aunque praev perdiera la copia.

## Revelado y validez

- **Antes del cierre** (tiempo del ledger `< closesAt`), la API solo muestra dirección, `seq`, compromiso, hora y tx. Nunca la probabilidad ni los fundamentos, tampoco al propio servidor en logs.
- **Desde el cierre**, la API publica cada payload. Cualquiera recalcula el hash y lo compara con el compromiso on-chain.
- Cuenta para consenso y score **solo la última versión confirmada antes del cierre**, y solo si está **revelada y válida**: hash coincide, `questionId`/`forecaster`/`seq` coinciden con la cadena, `probabilityBps` en rango y `informationCutoff ≤ ledgerTime` de su tx. Si la última versión no está revelada, el maker queda fuera de esa pregunta; no se usa una versión anterior (evita guardar versiones de reserva).
- Estados por versión: `sealed` (antes del cierre), `revealed`, `unrevealed` (cerrada y sin payload), `invalid` (payload no coincide o fuera de rango).

El contrato ya no valida la probabilidad porque no la ve: la validación ocurre en `prepare` y al revelar. No registrar tesis retrospectivas LIVE. Si el agente se abstiene, no hay tesis y se muestra la abstención. No se publica razonamiento interno del modelo, solo la tesis.

Criterio: dos actualizaciones conservan ambas versiones y solo la última puntúa; antes del cierre ningún endpoint ni página devuelve el contenido; alterar un byte del payload revelado da `invalid`; con el recibo se puede revelar una tesis que falta.
