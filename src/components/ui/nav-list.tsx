import Link from "next/link";

import { NAV_ITEMS, type NavHref } from "./nav-items";

export function NavList({ active }: { active: NavHref | null }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-1 gap-y-1">
      {NAV_ITEMS.map((item) => {
        const current = item.href === active;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-lg px-3 text-[15px] font-medium transition-colors hover:bg-bg hover:text-ink ${
                current ? "text-ink underline decoration-accent decoration-2 underline-offset-8" : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
