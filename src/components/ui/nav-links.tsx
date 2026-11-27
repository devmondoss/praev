"use client";

import { usePathname } from "next/navigation";

import { activeNavHref } from "./nav-items";
import { NavList } from "./nav-list";

/** Marca el ítem activo con `aria-current`, no solo con color. */
export function NavLinks() {
  return <NavList active={activeNavHref(usePathname())} />;
}
