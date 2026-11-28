import { categoryLabel, countryName, formatPet, PHASE_LABEL, type Phase, type RadarQuestion, signalLabel } from "@/lib/radar";
import { explorerTxUrl } from "@/lib/stellar/deployment";

/** Tarjeta del Radar. La etiqueta DEMO va siempre visible y antes del título. */
export function RadarCard({ question, phase }: { question: RadarQuestion; phase: Phase }) {
  const { spec } = question;
  const demo = spec.mode === "DEMO";
  const titleId = `q-${question.id}`;
  const impact = spec.economicImpact || spec.humanImpact;
  const closesIso = new Date(spec.closesAt * 1000).toISOString();

  return (
    <article aria-labelledby={titleId} className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5">
      <div className="flex flex-wrap items-center gap-2 text-[13px] font-medium">
        {demo ? (
          <span className="rounded-full border border-warning/40 px-2.5 py-0.5 text-warning">
            DEMO · datos de prueba, no cuenta en rankings
          </span>
        ) : (
          <span className="rounded-full border border-accent/40 px-2.5 py-0.5 text-accent">LIVE</span>
        )}
        <span className="rounded-full border border-border px-2.5 py-0.5 text-muted">{PHASE_LABEL[phase]}</span>
        <span className="text-muted">
          {categoryLabel(spec.category)} · {countryName(spec.country)}
          {spec.region ? ` · ${spec.region}` : ""}
        </span>
      </div>

      <h3 id={titleId} className="text-[17px] font-semibold leading-6">
        {spec.title}
      </h3>

      <dl className="grid gap-x-6 gap-y-3 text-[15px] leading-6 sm:grid-cols-2">
        <div>
          <dt className="text-[13px] text-muted">{phase === "open" ? "Cierra" : "Cerró"}</dt>
          <dd>
            <time dateTime={closesIso}>{formatPet(spec.closesAt)}</time>
          </dd>
        </div>
        <div>
          <dt className="text-[13px] text-muted">Tesis</dt>
          <dd>{signalLabel(question, phase)}</dd>
        </div>
        <div>
          <dt className="text-[13px] text-muted">Relevancia</dt>
          <dd>
            {spec.relevance === "high" ? "Alta" : "Estándar"}
            <span className="text-muted"> · {spec.relevanceReason}</span>
          </dd>
        </div>
        <div>
          <dt className="text-[13px] text-muted">Se resuelve con</dt>
          <dd>
            {spec.source.name} · {spec.source.dataset}
          </dd>
        </div>
      </dl>

      {impact ? <p className="text-[15px] leading-6 text-muted">{impact}</p> : null}

      {question.createdTx ? (
        <a
          href={explorerTxUrl(question.createdTx)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 w-fit items-center rounded-lg border border-border px-3 text-[15px] font-medium text-accent underline-offset-4 hover:underline"
        >
          Ver prueba on-chain
          <span className="sr-only"> de esta pregunta (se abre en el explorador de Stellar testnet)</span>
        </a>
      ) : null}
    </article>
  );
}
