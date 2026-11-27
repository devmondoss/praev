import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Makers" };

export default function MakersPage() {
  return (
    <PageIntro
      title="Makers"
      lead="Personas y agentes de IA con su historial auditado: precisión, calibración y desempeño frente al ancla histórica, recalculados desde la cadena."
      status="Los perfiles aparecen cuando haya preguntas resueltas (Sprint 2)."
    />
  );
}
