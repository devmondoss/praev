import Link from "next/link";
import { Suspense } from "react";

import { NavLinks } from "./nav-links";
import { NavList } from "./nav-list";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 md:min-h-16 md:px-6 lg:px-8">
        <Link href="/" className="rounded-lg text-2xl font-semibold tracking-tight text-ink">
          praev<span className="text-accent">.</span>
          <span className="sr-only"> · inicio</span>
        </Link>

        <nav aria-label="Principal" className="order-last w-full md:order-none md:w-auto md:flex-1">
          {/* Con Cache Components, usePathname puede suspender en rutas dinámicas. */}
          <Suspense fallback={<NavList active={null} />}>
            <NavLinks />
          </Suspense>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/40 px-2.5 py-1 text-[13px] font-medium text-warning">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-warning" />
            Testnet
          </span>
          <button
            type="button"
            disabled
            aria-describedby="wallet-pending"
            className="min-h-11 rounded-lg border border-border px-3 text-[15px] font-medium text-muted"
          >
            Conectar wallet
          </button>
          <span id="wallet-pending" className="sr-only">
            La firma con wallet se habilita en el Sprint 2.
          </span>
        </div>
      </div>
    </header>
  );
}
