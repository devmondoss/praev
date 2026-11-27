import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Proponer una pregunta" };

export default function ProposePage() {
  return (
    <PageIntro
      title="Proponer una pregunta"
      lead="Si tienes que decidir antes de que algo ocurra, propón la pregunta con su fuente y el umbral a partir del cual actuarías. La firmas con tu wallet; no se piden montos."
      status="El formulario se habilita en el Sprint 2."
    />
  );
}
