import { Suspense } from "react";

import { RadarCard } from "@/components/radar/radar-card";
import { RadarFilters } from "@/components/radar/radar-filters";
import { PageIntro } from "@/components/ui/page-intro";
import { parseRadarFilters, phaseOf, type RadarQuestion, selectRadar } from "@/lib/radar";
import { DatabaseNotConfiguredError, getDb } from "@/server/db/client";
import { postgresDb } from "@/server/db/sql";
import { requestNow } from "@/server/clock";
import { loadRadar } from "@/server/radar";

export default function RadarPage({ searchParams }: PageProps<"/">) {
  return (
    <>
      <PageIntro
        title="Radar"
        lead="Preguntas con fecha, fuente oficial y una decisión detrás. Antes del cierre verás cuántas tesis selladas tiene cada una; el consenso se revela al cierre."
      />
      <Suspense fallback={<Notice title="Cargando preguntas…" />}>
        <RadarResults searchParams={searchParams} />
      </Suspense>
    </>
  );
}

type LoadResult = { ok: true; questions: RadarQuestion[] } | { ok: false; message: string };

async function load(): Promise<LoadResult> {
  try {
    return { ok: true, questions: await loadRadar(postgresDb(getDb())) };
  } catch (error) {
    if (error instanceof DatabaseNotConfiguredError) {
      return { ok: false, message: "El Radar no tiene base de datos configurada en este entorno." };
    }
    console.error("radar: no se pudo leer la base", error instanceof Error ? error.message : error);
    return { ok: false, message: "No se pudo leer el Radar en este momento. Vuelve a intentarlo en un minuto." };
  }
}

async function RadarResults({ searchParams }: { searchParams: PageProps<"/">["searchParams"] }) {
  // Hora y datos por petición: el estado abierta/cerrada depende del momento.
  const now = await requestNow();
  const filters = parseRadarFilters(await searchParams);
  const result = await load();

  if (!result.ok) {
    return (
      <>
        <RadarFilters filters={filters} />
        <Notice title="Radar no disponible" body={result.message} />
      </>
    );
  }

  const selected = selectRadar(result.questions, filters, now);
  const live = selected.filter((q) => q.spec.mode === "LIVE");
  const demo = selected.filter((q) => q.spec.mode === "DEMO");

  return (
    <>
      <RadarFilters filters={filters} />
      {selected.length === 0 ? (
        <Notice
          title={result.questions.length === 0 ? "No hay preguntas publicadas todavía" : "Ninguna pregunta coincide con estos filtros"}
          body={
            result.questions.length === 0
              ? "Las primeras preguntas LIVE de tipo de cambio y lluvia se publican el 29 nov 2026."
              : "Prueba con otro estado o modo."
          }
        />
      ) : null}
      {live.length > 0 ? <Section id="radar-live" title="Preguntas LIVE" questions={live} now={now} /> : null}
      {demo.length > 0 ? (
        <Section
          id="radar-demo"
          title="DEMO · datos de prueba"
          note="Se resuelven con fixtures etiquetados y no cuentan en el perfil ni en rankings reales."
          questions={demo}
          now={now}
        />
      ) : null}
    </>
  );
}

function Section({
  id,
  title,
  note,
  questions,
  now,
}: {
  id: string;
  title: string;
  note?: string;
  questions: RadarQuestion[];
  now: number;
}) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <div>
        <h2 id={id} className="text-lg font-semibold">
          {title} <span className="font-normal text-muted">({questions.length})</span>
        </h2>
        {note ? <p className="mt-1 text-[15px] text-muted">{note}</p> : null}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {questions.map((q) => (
          <RadarCard key={q.id} question={q} phase={phaseOf(q, now)} />
        ))}
      </div>
    </section>
  );
}

function Notice({ title, body }: { title: string; body?: string }) {
  return (
    <section aria-live="polite" className="rounded-xl border border-border bg-surface p-6">
      <h2 className="text-base font-semibold">{title}</h2>
      {body ? <p className="mt-2 max-w-2xl text-[15px] leading-6 text-muted">{body}</p> : null}
    </section>
  );
}
