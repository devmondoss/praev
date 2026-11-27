import { PageIntro } from "@/components/ui/page-intro";

export default function RadarPage() {
  return (
    <>
      <PageIntro
        title="Radar"
        lead="Preguntas con fecha, fuente oficial y una decisión detrás. Antes del cierre verás cuántas tesis selladas tiene cada una; el consenso se revela al cierre."
      />
      <section aria-labelledby="radar-vacio" className="rounded-xl border border-border bg-surface p-6">
        <h2 id="radar-vacio" className="text-base font-semibold">
          No hay preguntas publicadas todavía
        </h2>
        <p className="mt-2 max-w-2xl text-[15px] leading-6 text-muted">
          Las primeras preguntas LIVE de tipo de cambio y lluvia se publican el 29 nov 2026.
        </p>
      </section>
    </>
  );
}
