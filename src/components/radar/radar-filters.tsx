import Link from "next/link";

import { CATEGORIES, type CategoryId, isCategoryEnabled } from "@/domain/questions/categories";
import type { RadarFilters as Filters } from "@/lib/radar";

const MODE_OPTIONS = [
  ["all", "Todas"],
  ["LIVE", "LIVE"],
  ["DEMO", "DEMO"],
] as const;
const STATE_OPTIONS = [
  ["open", "Abiertas"],
  ["closed", "Por resolver"],
  ["resolved", "Terminadas"],
  ["all", "Todas"],
] as const;

export function radarHref(filters: Filters): string {
  const params = new URLSearchParams();
  if (filters.mode !== "all") params.set("modo", filters.mode);
  if (filters.state !== "open") params.set("estado", filters.state);
  if (filters.category !== "all") params.set("categoria", filters.category);
  const query = params.toString();
  return query ? `/?${query}` : "/";
}

function Group<V extends string>({
  label,
  options,
  current,
  href,
}: {
  label: string;
  options: readonly (readonly [V, string])[];
  current: V;
  href: (value: V) => string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span className="text-[13px] text-muted">{label}</span>
      {options.map(([value, text]) => (
        <Link
          key={value}
          href={href(value)}
          aria-current={value === current ? "true" : undefined}
          className="min-h-11 content-center rounded-lg border border-border px-3 text-[15px] aria-[current=true]:border-accent aria-[current=true]:bg-accent aria-[current=true]:text-white"
        >
          {text}
        </Link>
      ))}
    </div>
  );
}

/** Filtros como enlaces: funcionan sin JavaScript y se pueden compartir. */
export function RadarFilters({ filters }: { filters: Filters }) {
  const categories = [
    ["all", "Todas"] as const,
    ...(Object.keys(CATEGORIES) as CategoryId[])
      .filter(isCategoryEnabled)
      .map((id) => [id, CATEGORIES[id].label] as const),
  ];
  return (
    <div className="flex flex-col gap-3">
      <Group label="Modo" options={MODE_OPTIONS} current={filters.mode} href={(mode) => radarHref({ ...filters, mode })} />
      <Group label="Estado" options={STATE_OPTIONS} current={filters.state} href={(state) => radarHref({ ...filters, state })} />
      <Group
        label="Categoría"
        options={categories}
        current={filters.category}
        href={(category) => radarHref({ ...filters, category })}
      />
    </div>
  );
}
