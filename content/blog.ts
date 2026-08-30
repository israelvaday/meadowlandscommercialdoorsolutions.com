import generated from "./blog.json";
import { BIZ } from "@/lib/business";

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle?: string;
  excerpt: string;
  category: "Residential" | "Commercial" | "Hardware" | "Repair" | "Planning";
  readMinutes: number;
  date: string;
  heroImage: string;
  heroAlt: string;
  secondaryImage: string;
  secondaryAlt: string;
  body: string;
};

const FALLBACK: BlogPost[] = [
  {
    slug: "commercial-overhead-doors-jersey-city-warehouses",
    title: "Commercial Overhead Doors for Jersey City Warehouses",
    metaTitle: "Jersey City Commercial Overhead Door Guide",
    excerpt:
      "Insulation, wind load, and operator choice decide whether a Jersey City warehouse door lasts through Hudson River weather and daily dock traffic.",
    category: "Commercial",
    readMinutes: 7,
    date: "2026-02-03",
    heroImage: "/blog/commercial-overhead-doors-jersey-city-warehouses-hero.webp",
    heroAlt: "Insulated commercial overhead doors on a Jersey City warehouse",
    secondaryImage: "/blog/commercial-overhead-doors-jersey-city-warehouses-secondary.webp",
    secondaryAlt: "Technician inspecting overhead door tracks in a warehouse bay",
    body: `
Jersey City warehouses, last-mile buildings, and shop bays take a beating from salt air, wind off the Hudson, and constant truck cycles. A commercial overhead sectional door is not a residential garage door with a bigger spring — the track, insulation, and operator have to match the opening.

## Start with the opening and the traffic

Measure width, height, headroom, and sideroom before you pick a panel. High-cycle docks near Newport or Port Newark need heavier tracks and springs than a once-a-day shop door in Greenville.

## Insulation and weather seals matter here

Hudson County winters and summer heat make R-value and perimeter seals part of the energy bill. A door that looks fine but leaks at the jamb costs more in HVAC than it saved on the bid.

## Specify the operator with the door

Jackshaft or trolley, photo eyes, and a sensing edge belong in the same scope. An undersized motor on an insulated door is a service call waiting to happen.

## Plan downtime by bay

Occupied facilities should keep one opening live. We phase commercial overhead installs from ${BIZ.address.full} so product keeps moving.

${BIZ.name} writes commercial overhead door scopes for Jersey City, Hudson County, and the Meadowlands. Request a quote with opening sizes and photos.
`,
  },
  {
    slug: "rolling-steel-vs-sectional-meadowlands",
    title: "Rolling Steel vs. Sectional Doors in the Meadowlands",
    metaTitle: "Rolling Steel or Sectional Door Meadowlands",
    excerpt:
      "Choose rolling steel for security and tight headroom, or sectional overhead doors for insulation and serviceability, on Meadowlands industrial openings.",
    category: "Planning",
    readMinutes: 7,
    date: "2026-02-18",
    heroImage: "/blog/rolling-steel-vs-sectional-meadowlands-hero.webp",
    heroAlt: "Rolling steel and sectional doors in a Meadowlands warehouse",
    secondaryImage: "/blog/rolling-steel-vs-sectional-meadowlands-secondary.webp",
    secondaryAlt: "Detail of rolling steel slats and a sectional door panel",
    body: `
Carlstadt, Moonachie, Teterboro, and East Rutherford buildings mix both door types on the same truck court. The right choice depends on headroom, security, insulation, and how often the opening cycles.

## When rolling steel wins

Low headroom, exterior security, and abuse-prone service doors favor a steel curtain. Rolling doors take hits that would dent a sectional panel and still close.

## When sectional overhead doors win

Insulated docks, auto shops, and conditioned warehouses usually want sectional doors. They seal better, service in panels, and pair cleanly with modern operators.

## Do not mix the hardware

A rolling-door barrel and a sectional torsion system are not interchangeable. The written scope should name curtain or panel, guides or tracks, and the motor type.

## Meadowlands wind and salt

Industrial parks west of the Turnpike see wind and grit. Guides, bottom bars, and weather seals should be specified for that exposure, not a generic catalog page.

${BIZ.name} compares rolling steel and sectional options for Meadowlands and Hudson County facilities from ${BIZ.address.full}.
`,
  },
  {
    slug: "fire-rated-doors-hudson-county",
    title: "Fire-Rated Commercial Doors in Hudson County Buildings",
    metaTitle: "Hudson County Fire-Rated Door Assemblies",
    excerpt:
      "Labeled doors, frames, and closers have to travel together. Here is how Jersey City and Hudson County commercial buildings should replace fire doors.",
    category: "Commercial",
    readMinutes: 8,
    date: "2026-03-02",
    heroImage: "/blog/fire-rated-doors-hudson-county-hero.webp",
    heroAlt: "Fire-rated corridor doors in a Hudson County commercial building",
    secondaryImage: "/blog/fire-rated-doors-hudson-county-secondary.webp",
    secondaryAlt: "Fire door closer and labeled frame assembly",
    body: `
Mixed-use towers in downtown Jersey City, Hoboken offices, and Newark warehouses all use labeled fire-door assemblies. Swapping a slab without the matching frame and hardware is how inspections fail.

## The label is the product

A UL or WH label states the rating and the assembly it belongs to. Paint over it, grind it, or hang a rated door in an unlabeled frame and the opening is no longer a listed assembly.

## Closers and latches are not optional

Fire doors must self-close and latch. Hold-opens, if used, must release on alarm. A wedge under a stair door is a life-safety failure, not a convenience.

## Document the closeout

Property managers should keep label photos, hardware lists, and invoices. Hudson County inspectors ask for that package more often than owners expect.

${BIZ.name} supplies and installs fire-rated commercial door assemblies from ${BIZ.address.full}. Request a labeled-assembly scope, not a generic door swap.
`,
  },
  {
    slug: "high-speed-doors-logistics",
    title: "High-Speed Doors for Meadowlands Logistics",
    metaTitle: "High-Speed Industrial Doors Meadowlands NJ",
    excerpt:
      "Fast-cycle doors protect temperature, dust, and traffic in Meadowlands logistics, food, and parking facilities when sensors and controls are specified correctly.",
    category: "Commercial",
    readMinutes: 6,
    date: "2026-03-16",
    heroImage: "/blog/high-speed-doors-logistics-hero.webp",
    heroAlt: "High-speed door in a Meadowlands logistics facility",
    secondaryImage: "/blog/high-speed-doors-logistics-secondary.webp",
    secondaryAlt: "Safety sensors beside a high-performance industrial door",
    body: `
High-speed fabric and rubber doors earn their keep when forklifts, pickers, and trucks hit the same opening all day. A slow sectional door in that location becomes a bottleneck and an energy leak.

## Match cycle rating to the aisle

Interior process doors cycle far more than exterior docks. Specify a curtain and motor that can take that count, plus a soft-reset design if a forklift clips the panel.

## Sensors before speed

Loops, photo eyes, and pull cords keep people and product safe. Speed without a tested safety package is the wrong upgrade.

## Cold storage and parking

Meadowlands food facilities and Jersey City parking structures are the two most common high-speed applications we see. Each needs a different curtain, control, and weather package.

${BIZ.name} specifies high-speed doors for logistics and parking openings across ${BIZ.region}.
`,
  },
  {
    slug: "storefront-repair-downtown-jersey-city",
    title: "Storefront Door Repair in Downtown Jersey City",
    metaTitle: "Jersey City Storefront Door Repair",
    excerpt:
      "Floor closers, pivots, and panic hardware fail first on Grove Street and Exchange Place storefronts. Here is how to repair them without shutting the shop.",
    category: "Repair",
    readMinutes: 6,
    date: "2026-03-28",
    heroImage: "/blog/storefront-repair-downtown-jersey-city-hero.webp",
    heroAlt: "Aluminum glass storefront in downtown Jersey City",
    secondaryImage: "/blog/storefront-repair-downtown-jersey-city-secondary.webp",
    secondaryAlt: "Technician adjusting a commercial floor closer",
    body: `
Downtown Jersey City storefronts on Washington, Grove, and the waterfront run thousands of cycles a week. When the door drags or will not latch, the glass is rarely the first failure — the closer, pivot, or panic device is.

## Floor closers wear out in salt air

Hudson River weather and sidewalk grit chew through closer oil and spindles. Adjustment buys time; replacement restores a consistent swing.

## Keep egress hardware honest

Never zip-tie a panic bar to “fix” a latch. Repair the rod, strike, or device so the door locks from the street and opens under pressure from inside.

## After-hours work for retail

Most entrance replacements and closer swaps can be scheduled after close so the store stays open.

${BIZ.name} repairs aluminum and glass entrances from ${BIZ.address.full}, a few blocks from Grove Street PATH.
`,
  },
  {
    slug: "commercial-door-operator-maintenance",
    title: "Commercial Door Operator Maintenance That Prevents Downtime",
    metaTitle: "Commercial Door Operator Maintenance NJ",
    excerpt:
      "A warehouse door is only as reliable as its operator. Preventive service on motors, limits, and safety devices keeps Jersey City and Meadowlands openings online.",
    category: "Hardware",
    readMinutes: 6,
    date: "2026-04-09",
    heroImage: "/blog/commercial-door-operator-maintenance-hero.webp",
    heroAlt: "Commercial door operator on a warehouse rolling door",
    secondaryImage: "/blog/commercial-door-operator-maintenance-secondary.webp",
    secondaryAlt: "Maintenance tools beside an industrial door operator",
    body: `
Most “door emergencies” we see in Hudson County start as ignored operator noise: a chain skip, a limit that drifted, a photo eye coated in dust. A short maintenance visit is cheaper than a bay that will not open for the morning trucks.

## Limits and safety devices first

If the door does not reverse on an obstruction, stop using it and call for service. Photo eyes and edges are not optional accessories.

## Springs and cables are part of the operator story

An operator fighting a broken spring will burn out. Inspect the balance of the door before blaming the motor.

## Build a route for multi-door sites

Meadowlands warehouses with a dozen docks should be on a written route — not a panic call for each opening.

${BIZ.name} services commercial operators from ${BIZ.address.full}. Send the door count and photos for a maintenance plan.
`,
  },
];

const generatedPosts = (generated as BlogPost[]).filter((post) => post?.slug && post?.body);

export const BLOG_POSTS: BlogPost[] = generatedPosts.length >= 6 ? generatedPosts : FALLBACK;

export const BLOG_BY_SLUG: Record<string, BlogPost> = Object.fromEntries(
  BLOG_POSTS.map((post) => [post.slug, post])
);

export function findPost(slug: string): BlogPost | undefined {
  return BLOG_BY_SLUG[slug];
}
