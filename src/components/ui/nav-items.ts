/** Navegación principal (docs/01-product/03-navigation.md). */
export const NAV_ITEMS = [
  { href: "/", label: "Radar" },
  { href: "/makers", label: "Makers" },
  { href: "/proponer", label: "Proponer" },
  { href: "/methodology", label: "Metodología" },
] as const;

export type NavHref = (typeof NAV_ITEMS)[number]["href"];

/** Ítem activo para una ruta: exacto en `/`, por prefijo en el resto. */
export function activeNavHref(pathname: string | null): NavHref | null {
  if (!pathname) return null;
  if (pathname === "/" || pathname.startsWith("/q/")) return "/";
  const match = NAV_ITEMS.find(
    (item) => item.href !== "/" && (pathname === item.href || pathname.startsWith(`${item.href}/`)),
  );
  return match?.href ?? null;
}
