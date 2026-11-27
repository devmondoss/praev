import Link from "next/link";

import { PageIntro } from "@/components/ui/page-intro";

export default function NotFound() {
  return (
    <>
      <PageIntro title="No encontramos esta página" lead="Puede que el enlace esté mal o que la pregunta no exista." />
      <p>
        <Link href="/" className="font-medium text-accent underline underline-offset-4">
          Volver al Radar
        </Link>
      </p>
    </>
  );
}
