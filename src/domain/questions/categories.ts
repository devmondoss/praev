/**
 * Catálogo de categorías (docs/04-domain/12-categories.md, ADR-028).
 *
 * Es un dato, no un esquema: habilitar una subcategoría no exige migrar la
 * base, solo una fuente de resolución con spike GO. Una macro está habilitada
 * si al menos una de sus subcategorías lo está.
 */

export type Aggregation = "sum" | "single";

type Subcategory = {
  /** null = mapa de crecimiento, sin fuente con GO todavía. */
  aggregation: Aggregation | null;
};

export const CATEGORIES = {
  economy_finance: {
    label: "Economía y finanzas",
    subcategories: {
      fx_daily: { aggregation: "single" },
      inflation_monthly: { aggregation: "single" },
      policy_rate: { aggregation: null },
      sovereign_spread: { aggregation: null },
    },
  },
  commodities_energy: {
    label: "Materias primas y energía",
    subcategories: { metals: { aggregation: null }, oil_gas: { aggregation: null }, power_demand: { aggregation: null } },
  },
  climate_environment: {
    label: "Clima y ambiente",
    subcategories: {
      precipitation: { aggregation: "sum" },
      temperature: { aggregation: null },
      hydrology: { aggregation: null },
      air_quality: { aggregation: null },
    },
  },
  agri_food: {
    label: "Agro y alimentos",
    subcategories: { wholesale_prices: { aggregation: null }, harvest: { aggregation: null }, supply: { aggregation: null } },
  },
  fisheries: {
    label: "Pesca",
    subcategories: { season: { aggregation: null }, landings: { aggregation: null } },
  },
  logistics_trade: {
    label: "Logística y comercio exterior",
    subcategories: { port_status: { aggregation: null }, exports: { aggregation: null }, freight: { aggregation: null } },
  },
  natural_hazards: {
    label: "Riesgos naturales",
    subcategories: { earthquakes: { aggregation: null }, enso: { aggregation: null }, volcanic: { aggregation: null } },
  },
  health: {
    label: "Salud",
    subcategories: { epidemiology: { aggregation: null }, alerts: { aggregation: null } },
  },
  regulation: {
    label: "Regulación",
    subcategories: { rules: { aggregation: null }, rates_fees: { aggregation: null } },
  },
  society: {
    label: "Sociedad y conflictividad",
    subcategories: { social_conflicts: { aggregation: null }, employment: { aggregation: null } },
  },
  tech_networks: {
    label: "Tecnología y redes",
    subcategories: { stellar_network: { aggregation: null }, connectivity: { aggregation: null } },
  },
} as const satisfies Record<string, { label: string; subcategories: Record<string, Subcategory> }>;

export type CategoryId = keyof typeof CATEGORIES;

export const CATEGORY_IDS = Object.keys(CATEGORIES) as CategoryId[];

function subcategoriesOf(category: string): Record<string, Subcategory> | undefined {
  return Object.hasOwn(CATEGORIES, category)
    ? (CATEGORIES[category as CategoryId].subcategories as Record<string, Subcategory>)
    : undefined;
}

/** Agregación permitida si la subcategoría está habilitada; si no, null. */
export function enabledAggregation(category: string, subcategory: string): Aggregation | null {
  const subs = subcategoriesOf(category);
  if (!subs || !Object.hasOwn(subs, subcategory)) return null;
  return subs[subcategory].aggregation;
}

export function isCategoryEnabled(category: string): boolean {
  const subs = subcategoriesOf(category);
  return !!subs && Object.values(subs).some((s) => s.aggregation !== null);
}

export function isKnownSubcategory(category: string, subcategory: string): boolean {
  const subs = subcategoriesOf(category);
  return !!subs && Object.hasOwn(subs, subcategory);
}
