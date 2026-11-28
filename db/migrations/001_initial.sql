-- praev · esquema inicial (docs/07-engineering/01-database.md v1.2, HU-18).
-- La base es una proyección de la red y almacén de contenido, no autoridad.
-- Los CHECK de hash recalculan SHA-256 sobre los bytes guardados: Postgres
-- rechaza cualquier fila cuyos bytes no correspondan a su hash.

CREATE TABLE deployments (
  id uuid PRIMARY KEY,
  network text NOT NULL CHECK (network = 'testnet'),
  contract_id text NOT NULL CHECK (contract_id ~ '^C[A-Z2-7]{55}$'),
  wasm_hash text NOT NULL CHECK (wasm_hash ~ '^[0-9a-f]{64}$'),
  deploy_tx text NOT NULL CHECK (deploy_tx ~ '^[0-9a-f]{64}$'),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (network, contract_id)
);

CREATE TABLE questions (
  id uuid PRIMARY KEY,
  deployment_id uuid NOT NULL REFERENCES deployments(id),
  chain_id text NOT NULL CHECK (chain_id ~ '^[0-9a-f]{64}$'),
  mode text NOT NULL CHECK (mode IN ('LIVE', 'DEMO')),
  category text NOT NULL,
  subcategory text NOT NULL,
  country text NOT NULL CHECK (country ~ '^[A-Z]{2}$'),
  requester text,
  reference_threshold_bps integer CHECK (reference_threshold_bps BETWEEN 0 AND 10000),
  spec jsonb NOT NULL,
  spec_bytes bytea NOT NULL,
  spec_hash text NOT NULL CHECK (spec_hash ~ '^[0-9a-f]{64}$'),
  curator text NOT NULL,
  resolver text NOT NULL CHECK (resolver <> curator),
  closes_at bigint NOT NULL,
  observation_start bigint NOT NULL,
  observation_end bigint NOT NULL,
  resolve_after bigint NOT NULL,
  resolve_by bigint NOT NULL,
  status text NOT NULL CHECK (status IN ('DRAFT', 'REVIEW', 'OPEN', 'RESOLVED', 'INVALID', 'CANCELLED')),
  relevance text NOT NULL CHECK (relevance IN ('high', 'standard')),
  relevance_reason text NOT NULL CHECK (btrim(relevance_reason) <> ''),
  created_tx text CHECK (created_tx ~ '^[0-9a-f]{64}$'),
  cancel_reason_hash text CHECK (cancel_reason_hash ~ '^[0-9a-f]{64}$'),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (deployment_id, chain_id),
  -- chainId = SHA256(UTF8(uuid en minúsculas)), el BytesN<32> del contrato.
  CHECK (chain_id = encode(sha256(convert_to(id::text, 'UTF8')), 'hex')),
  CHECK (spec_hash = encode(sha256(spec_bytes), 'hex')),
  CHECK (closes_at <= observation_start AND observation_start < observation_end
    AND observation_end <= resolve_after AND resolve_after < resolve_by)
);

CREATE TABLE evidence (
  id uuid PRIMARY KEY,
  question_id uuid NOT NULL REFERENCES questions(id),
  purpose text NOT NULL CHECK (purpose IN ('forecast', 'resolution')),
  source_url text NOT NULL,
  source_label text NOT NULL,
  published_at bigint,
  retrieved_at bigint NOT NULL,
  mime text NOT NULL,
  content_hash text NOT NULL CHECK (content_hash ~ '^[0-9a-f]{64}$'),
  content_bytes bytea,
  metadata jsonb NOT NULL DEFAULT '{}',
  CHECK (content_bytes IS NULL OR octet_length(content_bytes) <= 2097152),
  CHECK (content_bytes IS NULL OR content_hash = encode(sha256(content_bytes), 'hex'))
);

CREATE TABLE actors (
  address text PRIMARY KEY CHECK (address ~ '^G[A-Z2-7]{55}$'),
  kind text NOT NULL CHECK (kind IN ('human', 'agent')),
  alias text,
  metadata jsonb NOT NULL DEFAULT '{}'
);

-- Contenido sellado: ninguna lectura pública antes de closes_at (ADR-026).
-- La única consulta que lo lee vive en src/server/db/theses.ts.
CREATE TABLE thesis_payloads (
  question_id uuid NOT NULL REFERENCES questions(id),
  address text NOT NULL CHECK (address ~ '^G[A-Z2-7]{55}$'),
  seq integer NOT NULL CHECK (seq > 0),
  commitment text NOT NULL CHECK (commitment ~ '^[0-9a-f]{64}$'),
  probability_bps integer NOT NULL CHECK (probability_bps BETWEEN 0 AND 10000),
  payload_bytes bytea NOT NULL,
  source text NOT NULL CHECK (source IN ('prepare', 'receipt', 'agent')),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (question_id, address, seq, commitment),
  CHECK (commitment = encode(sha256(payload_bytes), 'hex'))
);

-- Proyección de la cadena: solo el compromiso.
CREATE TABLE forecasts (
  question_id uuid NOT NULL REFERENCES questions(id),
  address text NOT NULL CHECK (address ~ '^[GC][A-Z2-7]{55}$'),
  seq integer NOT NULL CHECK (seq > 0),
  commitment text NOT NULL CHECK (commitment ~ '^[0-9a-f]{64}$'),
  ledger_time bigint NOT NULL,
  tx_hash text NOT NULL CHECK (tx_hash ~ '^[0-9a-f]{64}$'),
  ledger bigint NOT NULL,
  PRIMARY KEY (question_id, address, seq)
);

-- Ancla histórica, fijada antes del cierre.
CREATE TABLE baselines (
  question_id uuid PRIMARY KEY REFERENCES questions(id),
  probability_bps integer NOT NULL CHECK (probability_bps BETWEEN 0 AND 10000),
  method text NOT NULL,
  sample_size integer NOT NULL CHECK (sample_size >= 0),
  fixed_at bigint NOT NULL,
  evidence_id uuid REFERENCES evidence(id)
);

-- Lado taker (ADR-030); sin montos ni PII.
CREATE TABLE question_proposals (
  id uuid PRIMARY KEY,
  requester text NOT NULL CHECK (requester ~ '^G[A-Z2-7]{55}$'),
  proposal jsonb NOT NULL,
  proposal_bytes bytea NOT NULL,
  proposal_hash text NOT NULL CHECK (proposal_hash ~ '^[0-9a-f]{64}$'),
  signature text NOT NULL,
  status text NOT NULL CHECK (status IN ('submitted', 'accepted', 'rejected')),
  review_note text,
  question_id uuid REFERENCES questions(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (proposal_hash),
  CHECK (proposal_hash = encode(sha256(proposal_bytes), 'hex'))
);

CREATE TABLE resolution_payloads (
  question_id uuid NOT NULL REFERENCES questions(id),
  evidence_hash text NOT NULL CHECK (evidence_hash ~ '^[0-9a-f]{64}$'),
  manifest_bytes bytea NOT NULL,
  PRIMARY KEY (question_id, evidence_hash),
  CHECK (evidence_hash = encode(sha256(manifest_bytes), 'hex'))
);

CREATE TABLE resolutions (
  question_id uuid PRIMARY KEY REFERENCES questions(id),
  outcome smallint NOT NULL CHECK (outcome IN (0, 1, 2)),
  evidence_hash text NOT NULL CHECK (evidence_hash ~ '^[0-9a-f]{64}$'),
  ledger_time bigint NOT NULL,
  tx_hash text NOT NULL CHECK (tx_hash ~ '^[0-9a-f]{64}$'),
  ledger bigint NOT NULL
);

CREATE TABLE tx_intents (
  id uuid PRIMARY KEY,
  deployment_id uuid NOT NULL REFERENCES deployments(id),
  action text NOT NULL CHECK (action IN ('create', 'forecast', 'resolve', 'invalidate', 'cancel')),
  request_hash text NOT NULL CHECK (request_hash ~ '^[0-9a-f]{64}$'),
  expected jsonb NOT NULL,
  tx_hash text CHECK (tx_hash ~ '^[0-9a-f]{64}$'),
  state text NOT NULL CHECK (state IN ('prepared', 'submitted', 'confirmed', 'failed', 'unknown')),
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (deployment_id, tx_hash)
);

CREATE TABLE chain_events (
  deployment_id uuid NOT NULL REFERENCES deployments(id),
  event_id text NOT NULL,
  tx_hash text NOT NULL CHECK (tx_hash ~ '^[0-9a-f]{64}$'),
  ledger bigint NOT NULL,
  payload jsonb NOT NULL,
  raw_xdr text NOT NULL,
  PRIMARY KEY (deployment_id, event_id)
);

CREATE TABLE sync_state (
  deployment_id uuid PRIMARY KEY REFERENCES deployments(id),
  cursor text,
  last_ledger bigint,
  -- Tiempo de cierre del último ledger procesado: reloj de la regla de revelado.
  last_ledger_time bigint,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE ai_runs (
  id uuid PRIMARY KEY,
  question_id uuid NOT NULL REFERENCES questions(id),
  kind text NOT NULL CHECK (kind IN ('brief', 'forecast')),
  model text NOT NULL,
  provider text,
  prompt_version text NOT NULL,
  adapter_version text NOT NULL,
  cutoff bigint NOT NULL,
  input_tokens integer CHECK (input_tokens >= 0),
  output_tokens integer CHECK (output_tokens >= 0),
  status text NOT NULL CHECK (status IN ('brief', 'forecast', 'abstain', 'error')),
  published boolean NOT NULL DEFAULT false,
  output jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX questions_open_idx ON questions (deployment_id, mode, status, closes_at);
CREATE INDEX forecasts_question_idx ON forecasts (question_id, address, seq DESC);
CREATE INDEX evidence_question_idx ON evidence (question_id, purpose);
