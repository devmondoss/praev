import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Metodología" };

export default function MethodologyPage() {
  return (
    <>
      <PageIntro
        title="Metodología"
        lead="Cómo se elige una pregunta, cómo se sella una tesis, cómo se resuelve con la fuente pactada y qué límites tiene."
        status="La versión completa se publica en el Sprint 3."
      />
      <section id="fuentes" aria-labelledby="fuentes-titulo" className="flex flex-col gap-2">
        <h2 id="fuentes-titulo" className="text-base font-semibold">
          Fuentes
        </h2>
        <p className="max-w-3xl text-[15px] leading-6 text-muted">
          Cada pregunta declara su fuente oficial antes de abrirse. En el MVP: tipo de cambio de bancos centrales
          y lluvia de estaciones meteorológicas oficiales. Sin fuente verificable no hay pregunta.
        </p>
      </section>
    </>
  );
}
