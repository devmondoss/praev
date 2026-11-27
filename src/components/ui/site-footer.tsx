import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-4 py-8 text-[13px] text-muted md:px-6 lg:px-8">
        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/methodology" className="underline underline-offset-4 hover:text-ink">
                Metodología
              </Link>
            </li>
            <li>
              <Link href="/methodology#fuentes" className="underline underline-offset-4 hover:text-ink">
                Fuentes
              </Link>
            </li>
            <li>
              <a href="https://github.com/devmondoss/praev" className="underline underline-offset-4 hover:text-ink">
                Repositorio
              </a>
            </li>
          </ul>
        </nav>
        <p className="max-w-3xl leading-6">
          praev no es una plataforma de apuestas ni sustituye comunicados oficiales. Las preguntas marcadas{" "}
          <strong className="font-semibold text-ink">DEMO</strong> son datos de demostración, no una alerta real.
          Funciona en Stellar Testnet.
        </p>
      </div>
    </footer>
  );
}
