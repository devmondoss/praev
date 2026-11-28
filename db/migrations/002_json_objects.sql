-- Las columnas jsonb que proyectan un documento deben ser objetos JSON.
-- Motivo: postgres.js serializa con JSON.stringify los parámetros jsonb; pasar
-- un texto JSON lo guardaba como string JSON (28 nov, ver 01-database v1.2).
ALTER TABLE questions ADD CONSTRAINT questions_spec_is_object CHECK (jsonb_typeof(spec) = 'object');
ALTER TABLE question_proposals ADD CONSTRAINT question_proposals_proposal_is_object CHECK (jsonb_typeof(proposal) = 'object');
ALTER TABLE chain_events ADD CONSTRAINT chain_events_payload_is_object CHECK (jsonb_typeof(payload) = 'object');
ALTER TABLE evidence ADD CONSTRAINT evidence_metadata_is_object CHECK (jsonb_typeof(metadata) = 'object');
