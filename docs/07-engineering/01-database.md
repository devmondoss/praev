# Esquema SQL inicial

**Estado:** P0; `001_initial.sql` aplicada en Neon (HU-18) · **Versión:** 1.2 · **Fecha:** 2026-11-28

La base es una proyección de la red y almacén de contenido, no autoridad de forecasts. Un deployment separa resets. Propuesta original (v1.1); la versión aplicada es [`db/migrations/001_initial.sql`](../../db/migrations/001_initial.sql), con los cambios de la sección final:
```sql
CREATE TABLE deployments (
 id uuid PRIMARY KEY, network text NOT NULL CHECK(network='testnet'),
 contract_id text NOT NULL, wasm_hash text NOT NULL CHECK(wasm_hash ~ '^[0-9a-f]{64}$'),
 created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(network,contract_id)
);
CREATE TABLE questions (
 id uuid PRIMARY KEY, deployment_id uuid NOT NULL REFERENCES deployments(id),
 chain_id text NOT NULL CHECK(chain_id ~ '^[0-9a-f]{64}$'),
 mode text NOT NULL CHECK(mode IN ('LIVE','DEMO')),
 category text NOT NULL, subcategory text NOT NULL,
 country text NOT NULL CHECK(country ~ '^[A-Z]{2}$'),
 requester text, reference_threshold_bps integer CHECK(reference_threshold_bps BETWEEN 0 AND 10000),
 spec jsonb NOT NULL, spec_bytes bytea NOT NULL,
 spec_hash text NOT NULL CHECK(spec_hash ~ '^[0-9a-f]{64}$'),
 curator text NOT NULL, resolver text NOT NULL CHECK(resolver<>curator),
 closes_at bigint NOT NULL, observation_start bigint NOT NULL,
 observation_end bigint NOT NULL, resolve_after bigint NOT NULL, resolve_by bigint NOT NULL,
 status text NOT NULL CHECK(status IN ('DRAFT','REVIEW','OPEN','RESOLVED','INVALID','CANCELLED')),
 relevance text NOT NULL CHECK(relevance IN ('high','standard')),
 relevance_reason text NOT NULL, created_tx text, cancel_reason_hash text,
 UNIQUE(deployment_id,chain_id),
 CHECK(closes_at<=observation_start AND observation_start<observation_end
 AND observation_end<=resolve_after AND resolve_after<resolve_by)
);
CREATE TABLE evidence (
 id uuid PRIMARY KEY, question_id uuid NOT NULL REFERENCES questions(id),
 purpose text NOT NULL CHECK(purpose IN ('forecast','resolution')),
 source_url text NOT NULL, source_label text NOT NULL, published_at bigint,
 retrieved_at bigint NOT NULL, mime text NOT NULL,
 content_hash text NOT NULL CHECK(content_hash ~ '^[0-9a-f]{64}$'),
 content_bytes bytea, metadata jsonb NOT NULL DEFAULT '{}',
 CHECK(content_bytes IS NULL OR octet_length(content_bytes)<=2097152)
);
CREATE TABLE actors (
 address text PRIMARY KEY, kind text NOT NULL CHECK(kind IN ('human','agent')),
 alias text, metadata jsonb NOT NULL DEFAULT '{}'
);
CREATE TABLE thesis_payloads (  -- contenido sellado; no se expone antes de closes_at (ADR-026)
 question_id uuid NOT NULL REFERENCES questions(id), address text NOT NULL,
 seq integer NOT NULL CHECK(seq>0),
 commitment text NOT NULL CHECK(commitment ~ '^[0-9a-f]{64}$'),
 probability_bps integer NOT NULL CHECK(probability_bps BETWEEN 0 AND 10000),  -- extraído del payload validado
 payload_bytes bytea NOT NULL, source text NOT NULL CHECK(source IN ('prepare','receipt','agent')),
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(question_id,address,seq,commitment)
);
CREATE TABLE forecasts (  -- proyección de la cadena: solo el compromiso
 question_id uuid NOT NULL REFERENCES questions(id), address text NOT NULL,
 seq integer NOT NULL CHECK(seq>0),
 commitment text NOT NULL CHECK(commitment ~ '^[0-9a-f]{64}$'),
 ledger_time bigint NOT NULL, tx_hash text NOT NULL, ledger bigint NOT NULL,
 PRIMARY KEY(question_id,address,seq)
);
CREATE TABLE baselines (  -- ancla histórica, fijada antes del cierre
 question_id uuid PRIMARY KEY REFERENCES questions(id), probability_bps integer NOT NULL CHECK(probability_bps BETWEEN 0 AND 10000),
 method text NOT NULL, sample_size integer NOT NULL CHECK(sample_size>=0),
 fixed_at bigint NOT NULL, evidence_id uuid REFERENCES evidence(id)
);
CREATE TABLE question_proposals (  -- lado taker (ADR-030); sin montos ni PII
 id uuid PRIMARY KEY, requester text NOT NULL,
 proposal jsonb NOT NULL, proposal_bytes bytea NOT NULL,
 proposal_hash text NOT NULL CHECK(proposal_hash ~ '^[0-9a-f]{64}$'),
 signature text NOT NULL,
 status text NOT NULL CHECK(status IN ('submitted','accepted','rejected')),
 review_note text, question_id uuid REFERENCES questions(id),
 created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(proposal_hash)
);
CREATE TABLE resolution_payloads (
 question_id uuid NOT NULL REFERENCES questions(id), evidence_hash text NOT NULL CHECK(evidence_hash ~ '^[0-9a-f]{64}$'),
 manifest_bytes bytea NOT NULL, PRIMARY KEY(question_id,evidence_hash)
);
CREATE TABLE resolutions (
 question_id uuid PRIMARY KEY REFERENCES questions(id), outcome smallint NOT NULL CHECK(outcome IN (0,1,2)),
 evidence_hash text NOT NULL CHECK(evidence_hash ~ '^[0-9a-f]{64}$'),
 ledger_time bigint NOT NULL, tx_hash text NOT NULL, ledger bigint NOT NULL
);
CREATE TABLE tx_intents (
 id uuid PRIMARY KEY, deployment_id uuid NOT NULL REFERENCES deployments(id),
 action text NOT NULL CHECK(action IN ('create','forecast','resolve','invalidate','cancel')),
 request_hash text NOT NULL, expected jsonb NOT NULL, tx_hash text,
 state text NOT NULL CHECK(state IN ('prepared','submitted','confirmed','failed','unknown')),
 expires_at timestamptz NOT NULL, created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(deployment_id,tx_hash)
);
CREATE TABLE chain_events (
 deployment_id uuid NOT NULL REFERENCES deployments(id), event_id text NOT NULL,
 tx_hash text NOT NULL, ledger bigint NOT NULL, payload jsonb NOT NULL, raw_xdr text NOT NULL,
 PRIMARY KEY(deployment_id,event_id)
);
CREATE TABLE sync_state (
 deployment_id uuid PRIMARY KEY REFERENCES deployments(id), cursor text,
 last_ledger bigint, updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE ai_runs (
 id uuid PRIMARY KEY, question_id uuid NOT NULL REFERENCES questions(id),
 kind text NOT NULL CHECK(kind IN ('brief','forecast')),
 model text NOT NULL, provider text, prompt_version text NOT NULL, adapter_version text NOT NULL,
 cutoff bigint NOT NULL, input_tokens integer, output_tokens integer,
 status text NOT NULL CHECK(status IN ('brief','forecast','abstain','error')),
 published boolean NOT NULL DEFAULT false,
 output jsonb, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX questions_open_idx ON questions(deployment_id,mode,status,closes_at);
CREATE INDEX forecasts_question_idx ON forecasts(question_id,address,seq DESC);
CREATE INDEX evidence_question_idx ON evidence(question_id,purpose);
```

`category`/`subcategory` se validan contra el catálogo de [12-categories](../04-domain/12-categories.md) en el servicio, no con CHECK, para que habilitar una macro no exija migración. Ninguna consulta pública lee `thesis_payloads` de una pregunta cuyo `closes_at` sea mayor que el tiempo del último ledger conocido; esa regla vive en un único repositorio y tiene test. Validar StrKey, tx hash, UTF-8, tipos JSON y consistencia cross-table en servicio, además de constraints. El contrato es quien autoriza. No FK forecasts→actors: cualquier wallet legítima puede invocar directamente, incluso si no existe alias. Consultar mediante LEFT JOIN y mostrar tipo desconocido. No FK forecasts→thesis_payloads: una tesis puede faltar; se muestra `unrevealed`. Una tesis llegada por recibo (`source='receipt'`) se acepta solo si su hash coincide con el compromiso on-chain. La clave de payload incluye hash para permitir retries legítimos sin sustituir bytes. Verificar hash antes de insertar y al leer.

No tabla de score editable: consultar última versión por `(question_id,address)`, join con resolutions terminales 0/1, filtrar deployment y mode. Usar integer lossUnits, agregación SQL o TS pura. No guardar decision snapshots en DB P0. Las operaciones de proyección y cursor deben ocurrir en una transacción; ON CONFLICT no debe ocultar payload discrepante. Si evento de pregunta externa carece de spec, almacenar evento bruto y marcar huérfano; no inventar metadata.

Migraciones numeradas, transacción, backup antes de reset. Usar cuenta app sin DDL y migrator separado cuando despliegue lo permita. No conceder acceso público SQL. Fuente: [PostgreSQL transaction isolation](https://www.postgresql.org/docs/17/transaction-iso.html). 
## Implementación (28 nov, HU-18)

`001_initial.sql` se aplicó con `npm run db:migrate` en Neon (PostgreSQL 18.7); un segundo `db:migrate` responde «al día». Cambios respecto de la propuesta, todos más estrictos o necesarios para una regla ya escrita:

- **Hashes verificados por Postgres:** `CHECK (hash = encode(sha256(bytes), 'hex'))` en `questions.spec_hash`, `thesis_payloads.commitment`, `resolution_payloads.evidence_hash`, `question_proposals.proposal_hash` y `evidence.content_hash` (si hay bytes). Una fila con bytes alterados no entra aunque el servicio falle.
- **`questions.chain_id = SHA256(UTF8(id))`** como CHECK, y formato StrKey (`G…`/`C…`) en direcciones y 64 hex en tx hashes.
- **`deployments.deploy_tx`** para enlazar la fila con `deployment.json`; **`questions.created_at`**.
- **`sync_state.last_ledger_time`**: el tiempo del último ledger indexado, que es el reloj de la regla de revelado. Sin él la regla no se podía expresar en SQL.

Repositorios en `src/server/db/` con placeholders `$n` y valores aparte (nunca interpolación), detrás de una interfaz `Db` que implementan postgres.js y PGlite:

- `deployments.ts`: `ensureDeployment`, idempotente; falla si el mismo contrato ya existe con otro Wasm o tx.
- `questions.ts`: `verifySpecBytes` exige hash correcto, JSON canónico, spec válida y que la spec validada reproduzca los mismos bytes; `insertQuestion` es idempotente con la misma spec y falla con otra; `getSpecBytes` re-verifica el hash al leer.
- `theses.ts`: **la única puerta a `thesis_payloads`**. `insertThesisPayload` abre el compromiso (hash, canónico, esquema) y exige que la tesis sea de esa pregunta, maker y `seq`. `listRevealedTheses` filtra en el propio SQL con `q.closes_at <= sync_state.last_ledger_time`; sin ledger indexado no devuelve nada. Al leer vuelve a abrir cada compromiso.
- `sync.ts`: `advanceSyncState` nunca retrocede.

Tests en `tests/unit/db.test.ts` contra PGlite 0.5.16 (Postgres 18 en Wasm, sin red): esquema sin tabla de score, CHECK de hash y de `chain_id`, idempotencia, rechazo de bytes no canónicos o alterados, y la regla de revelado un segundo antes y en el cierre exacto. Quitando el filtro de `listRevealedTheses` el test falla (comprobado).

**Migración 002 (28 nov).** `002_json_objects.sql` añade `CHECK (jsonb_typeof(...) = 'object')` a `questions.spec`, `question_proposals.proposal`, `chain_events.payload` y `evidence.metadata`. Motivo: postgres.js serializa con `JSON.stringify` los parámetros `jsonb`, así que un texto JSON se guardaba como *string* JSON. PGlite no lo reproduce, por eso pasó los tests; apareció en la primera publicación real contra Neon. La fila afectada era una DRAFT sin tx y sin pregunta on-chain, y se borró. Desde entonces el repositorio pasa el objeto y la base rechaza cualquier otra cosa.
