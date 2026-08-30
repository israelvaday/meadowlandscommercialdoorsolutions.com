import { BIZ } from "@/lib/business";
import generated from "./faq.json";

export type FAQ = { q: string; a: string };

export type FAQSection = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  items: FAQ[];
};

type FaqFile = {
  heroAlt?: string;
  sections?: FAQSection[];
};

const GEN = generated as FaqFile;

export const FAQ_HERO_IMAGE = BIZ.heroPhoto;
export const FAQ_HERO_ALT =
  GEN.heroAlt ||
  "Commercial overhead door installation at a Jersey City warehouse — Meadowlands Commercial Door Solutions";

const FALLBACK: FAQSection[] = [
  {
    id: "pricing",
    title: "Pricing & estimates",
    emoji: "💰",
    description: "How commercial door scopes and written estimates are prepared.",
    items: [
      {
        q: "How much does a commercial door project cost in Jersey City?",
        a: "Price depends on door type (sectional, rolling steel, high-speed, hollow metal, or storefront), opening size, operator, safety devices, and whether dock seals or frame work are included. We write an estimate after measuring the opening.",
      },
      {
        q: "Do you provide free commercial door estimates?",
        a: `Yes. ${BIZ.name} provides free estimates for commercial door work across ${BIZ.region}. Photos help for a first look; most docks and storefronts need an on-site measurement.`,
      },
      {
        q: "Are the door, operator, and hardware itemized?",
        a: "The proposal lists the door, operator, safety package, and extras such as seals, grilles, or fire labels so you can compare bids on the same components.",
      },
      {
        q: "How are change orders handled?",
        a: "Added openings, operator upgrades, or unexpected frame damage are priced and scheduled before we proceed. We do not hide extras at closeout.",
      },
    ],
  },
  {
    id: "process",
    title: "Installation process",
    emoji: "🚪",
    description: "From measurement through commissioning.",
    items: [
      {
        q: "What does a commercial install include?",
        a: "Measurement, product selection, removal when needed, hanging or curtain set, operator and safety commissioning, weather seals, cleanup, and an operation check against the written scope.",
      },
      {
        q: "How long will the opening be down?",
        a: "A single storefront closer can be hours. A warehouse overhead door or rolling steel replacement is usually a planned window. Multi-bay sites are phased so one dock stays live.",
      },
      {
        q: "Can you work in an occupied warehouse or store?",
        a: "Yes. We sequence bays, after-hours storefronts, and back-of-house openings so customers and trucks keep moving.",
      },
      {
        q: "Who performs the work?",
        a: `${BIZ.name} dispatches insured commercial door technicians from ${BIZ.address.full}.`,
      },
    ],
  },
  {
    id: "commercial",
    title: "Commercial door systems",
    emoji: "🏭",
    description: "Overhead, rolling steel, docks, and entrances.",
    items: [
      {
        q: "What commercial doors do you install?",
        a: "Commercial overhead sectional doors, rolling steel, loading dock doors and seals, high-speed doors, fire-rated assemblies, hollow metal, automatic operators, aluminum storefronts, and security grilles.",
      },
      {
        q: "Do you service door operators?",
        a: "Yes. Jackshaft, trolley, rolling-door motors, and ADA swing operators, including photo eyes and sensing edges.",
      },
      {
        q: "Do you install fire-rated commercial doors?",
        a: "Yes. Labeled door and frame assemblies with self-closing hardware and closeout photos for property managers and inspectors.",
      },
      {
        q: "Do you handle emergency commercial door repair?",
        a: `Yes, during posted hours we prioritize failed springs, off-track curtains, dead operators, and storefronts that will not secure across ${BIZ.region}.`,
      },
    ],
  },
  {
    id: "service-area",
    title: "Coverage & buildings",
    emoji: "📍",
    description: "Where we work from 333 Washington St.",
    items: [
      {
        q: "Where are you based?",
        a: `${BIZ.name} is headquartered at ${BIZ.address.full}.`,
      },
      {
        q: "What areas do you serve?",
        a: `We cover 100 locations around Jersey City — Hudson County, the Meadowlands, Newark and Port Elizabeth, plus NYC waterfront neighborhoods. See the service areas map.`,
      },
      {
        q: "Do you work in warehouses and ports?",
        a: "Yes. Meadowlands logistics, Port Newark / Port Elizabeth docks, and Jersey City last-mile buildings are core commercial work.",
      },
      {
        q: "Do you work across the Hudson in Manhattan?",
        a: "Yes, for commercial openings in waterfront neighborhoods such as Tribeca, Chelsea, Hudson Yards, and nearby Brooklyn docks when the scope is commercial.",
      },
    ],
  },
];

export const FAQ_SECTIONS: FAQSection[] =
  Array.isArray(GEN.sections) && GEN.sections.length >= 4 ? GEN.sections : FALLBACK;
