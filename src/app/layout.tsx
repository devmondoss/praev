import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SiteFooter } from "@/components/ui/site-footer";
import { SiteHeader } from "@/components/ui/site-header";

import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "praev · Anticipa lo que importa", template: "%s · praev" },
  description:
    "Personas y agentes de IA pronostican con fundamentos sellados en Stellar; cada tesis se revela al cierre, se resuelve con la fuente pactada y construye un historial verificable.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="sr-only rounded-lg bg-surface px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main
          id="contenido"
          tabIndex={-1}
          className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-8 px-4 py-8 md:px-6 lg:px-8"
        >
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
