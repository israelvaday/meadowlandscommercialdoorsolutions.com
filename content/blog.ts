// Original door guidance written for NYC property owners.
// Bodies use a small markdown-like format: headings, list items, and paragraphs.

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

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "choosing-entry-door-brooklyn-brownstone",
    title: "How to Choose an Entry Door for a Brooklyn Brownstone",
    metaTitle: "Entry Door Guide for Brooklyn Brownstones",
    excerpt:
      "Historic profiles, security needs, and NYC weather all influence the right entry door for a Brooklyn townhouse or brownstone.",
    category: "Residential",
    readMinutes: 6,
    date: "2026-01-16",
    heroImage: "/blog/choosing-entry-door-brooklyn-brownstone-hero.png",
    heroAlt: "Premium solid wood entry door installed on a Brooklyn brownstone",
    secondaryImage: "/blog/choosing-entry-door-brooklyn-brownstone-secondary.png",
    secondaryAlt: "Door technician measuring a historic Brooklyn entry opening",
    body: `
Brooklyn brownstones and townhouses present a unique combination of historic architecture, settled frames, and modern security expectations. The right entry door must fit an often-non-standard opening, complement original casings, and withstand NYC humidity, heat, and winter weather.

## Start with the opening, not the catalog photo

Pre-war buildings frequently have openings that differ from modern standard sizes. Measure jamb width, height, depth, swing, and the condition of the header and sill before selecting a slab. A door that fits a catalog dimension but not your frame will bind, leak, or fail to latch within a season.

Check whether the existing frame can be preserved. Rot, termite damage, or repeated settling may require jamb repair or replacement before a new slab is hung.

## Match the architectural profile

Historic Brooklyn entries often feature panel profiles, transoms, and sidelites that define the facade. When replacing a door, consider whether a standard slab will look out of place against original casings and stonework.

Custom fabrication or profile-matched doors cost more upfront but preserve curb appeal and property value — especially on blocks where architectural consistency matters.

## Prioritize security and hardware

NYC entry doors benefit from solid-core or metal-clad construction, quality deadbolts, reinforced strikes, and hinges with long screws into the framing. Multi-point lock systems add security without compromising the historic appearance when specified correctly.

Hardware weight affects hinge selection and closer requirements. Specify hinges and locksets matched to door weight and daily use.

## Plan for weather sealing

Brooklyn entries face driving rain, summer heat, and winter cold. Weatherstripping, thresholds, and proper sill pans prevent drafts and water intrusion. A beautiful door that does not seal will cost more in energy and damage over time.

Hillman Door Supply and Door Repair helps Brooklyn homeowners select, fabricate, and install entry doors with accurate measurement and structural assessment. Call or text (718) 638-4271 for a written estimate from our Flatbush Ave headquarters.
`,
  },
  {
    slug: "fire-rated-doors-nyc-multifamily",
    title: "Fire-Rated Doors in NYC Multifamily Buildings: What Owners Need to Know",
    metaTitle: "Fire-Rated Door Requirements NYC Multifamily",
    excerpt:
      "UL labels, self-closing hardware, and corridor assemblies — the essentials for compliant multifamily door replacement in NYC.",
    category: "Commercial",
    readMinutes: 7,
    date: "2026-02-12",
    heroImage: "/blog/fire-rated-doors-nyc-multifamily-hero.png",
    heroAlt: "Fire-rated corridor door with UL label installed in a NYC apartment building",
    secondaryImage: "/blog/fire-rated-doors-nyc-multifamily-secondary.png",
    secondaryAlt: "Self-closing hardware on a fire-rated door assembly",
    body: `
Multifamily and mixed-use buildings across Brooklyn, Manhattan, and Queens must maintain fire-rated door assemblies in corridors, stairwells, and other code-required locations. Replacing a fire door is not the same as swapping a residential interior slab — the assembly, label, and hardware must work together.

## Understand the label

Fire-rated doors carry UL or WH labels that specify the rating (e.g., 90-minute, 60-minute) and whether the door is for use in a frame of matching rating. Installing a labeled door in a non-rated frame — or removing the label during installation — can void compliance.

Always verify the existing rating before ordering a replacement. Your superintendent, architect, or expeditor can help confirm what the opening requires.

## Self-closing hardware is part of the assembly

Fire-rated doors must self-close and latch reliably. This means appropriate closers, spring hinges, or automatic operators depending on the opening type and ADA requirements. A fire door that stays propped open fails its purpose regardless of the slab quality.

## Smoke seals and gasketing

Many NYC corridor doors require smoke-seal components or intumescent gasketing. These materials are part of the listed assembly and should not be omitted or substituted without verification.

## Documentation matters

Property managers should retain invoices, label photos, and installation records. DOB and FDNY inspections may require proof that listed assemblies were installed correctly.

Hillman Door Supply and Door Repair supplies and installs fire-rated door assemblies across NYC with label verification and hardware coordination. Contact us at (718) 638-4271 for multifamily door scopes.
`,
  },
  {
    slug: "storefront-door-repair-nyc-retail",
    title: "Storefront Door Repair for NYC Retail: Common Failures and Fixes",
    metaTitle: "NYC Storefront Door Repair Guide",
    excerpt:
      "Floor closers, panic hardware, and weather seals — what causes NYC storefront doors to fail and how to fix them properly.",
    category: "Commercial",
    readMinutes: 6,
    date: "2026-03-05",
    heroImage: "/blog/storefront-door-repair-nyc-retail-hero.png",
    heroAlt: "Aluminum storefront entrance door on a NYC retail shop",
    secondaryImage: "/blog/storefront-door-repair-nyc-retail-secondary.png",
    secondaryAlt: "Technician adjusting floor closer on a commercial glass entrance door",
    body: `
Ground-floor retail and restaurant spaces across NYC depend on aluminum and glass storefront doors that handle thousands of cycles per month. When a storefront door drags, won't latch, or slams shut, the cause is usually hardware wear — not necessarily the glass or frame.

## Floor closers and pivot alignment

Many NYC storefront entrances use floor-mounted closers or bottom pivots. These components wear over time, especially on heavily trafficked doors. Misalignment causes dragging, uneven gaps, and latch failures.

Adjustment may restore operation temporarily, but worn closers and pivots often need replacement. After-hours service minimizes disruption to business hours.

## Panic hardware and exit devices

Doors equipped with panic bars must latch securely while releasing freely during egress. Worn latches, bent strikes, or misaligned rods cause both security and code concerns. Never disable exit hardware to solve a latching problem — repair or replace the component.

## Weather seals and sweeps

Worn bottom sweeps and perimeter gaskets allow water, drafts, and street noise into the space. Replacing seals is a cost-effective improvement that extends hardware life by reducing debris in tracks and closers.

## When replacement makes sense

If the frame is bent, the door is delaminating, or repeated repairs fail within months, a new entrance assembly may cost less over time than ongoing emergency fixes.

Hillman Door Supply and Door Repair provides storefront door repair and replacement across Brooklyn, Manhattan, and Queens. Call (718) 638-4271 for same-day emergency service when available.
`,
  },
  {
    slug: "interior-door-replacement-nyc-apartment",
    title: "Interior Door Replacement in NYC Apartments: Scope and Timing",
    metaTitle: "NYC Apartment Interior Door Replacement",
    excerpt:
      " Hollow-core upgrades, noise reduction, and building coordination for apartment interior door projects in NYC.",
    category: "Residential",
    readMinutes: 5,
    date: "2026-03-22",
    heroImage: "/blog/interior-door-replacement-nyc-apartment-hero.png",
    heroAlt: "New interior door installed in a renovated NYC apartment",
    secondaryImage: "/blog/interior-door-replacement-nyc-apartment-secondary.png",
    secondaryAlt: "Stack of pre-hung interior doors ready for apartment installation",
    body: `
Renovating an NYC apartment often includes replacing dated hollow-core doors with solid-core or fire-rated slabs. Whether you are updating one bedroom door or standardizing an entire unit, scope and timing depend on frame condition, building rules, and hardware compatibility.

## Assess the frame first

Apartment doors in pre-war and post-war buildings frequently have settled jambs, non-standard heights, or damaged strikes. Hanging a new slab on a compromised frame repeats the same binding and latching problems.

Include frame repair, shimming, and strike alignment in the scope when the opening needs it.

## Consider sound and fire requirements

Bedroom and corridor doors in some buildings require minimum fire ratings or sound ratings. Check building alteration agreements and co-op or condo rules before ordering materials.

Solid-core doors improve privacy and reduce noise transfer between rooms — a meaningful upgrade in open-layout renovations.

## Coordinate with building staff

Many NYC buildings require insurance certificates, work-hour restrictions, and elevator reservations. Plan the installation schedule with your super or management company to avoid delays.

## Batch replacements save time

If multiple doors in a unit need replacement, measuring and installing them in one visit reduces labor cost and disruption compared to one-off service calls.

Hillman Door Supply and Door Repair installs interior doors across Brooklyn, Manhattan, and Queens. Request a unit-wide measurement at (718) 638-4271.
`,
  },
  {
    slug: "door-hardware-guide-nyc-buildings",
    title: "Door Hardware Guide for NYC Buildings: Locks, Closers, and Hinges",
    metaTitle: "NYC Door Hardware Selection Guide",
    excerpt:
      "How to specify locksets, closers, hinges, and panic hardware for residential and commercial doors in NYC.",
    category: "Hardware",
    readMinutes: 7,
    date: "2026-04-10",
    heroImage: "/blog/door-hardware-guide-nyc-buildings-hero.png",
    heroAlt: "Commercial-grade door hardware including lockset and closer on a NYC office door",
    secondaryImage: "/blog/door-hardware-guide-nyc-buildings-secondary.png",
    secondaryAlt: "Assortment of hinges and locksets for door hardware upgrade",
    body: `
Door hardware determines how a door feels every day — and whether it meets code. NYC buildings mix residential locksets, commercial closers, panic hardware, and access-control components. Specifying the wrong hardware leads to premature failure, ADA issues, or security gaps.

## Match hardware to door weight and traffic

Heavy solid-core and fire-rated doors require hinges rated for the weight and frequency of use. Continuous hinges, heavy-duty ball bearings, or pivot systems may be necessary for high-traffic commercial openings.

Lightweight hardware on a heavy door causes sagging, misalignment, and repeated latch failures.

## Closers and ADA clearance

Door closers control closing speed and latch timing. ADA requirements specify maximum opening force and closing time for accessible routes. Closers must be adjusted correctly — an improperly adjusted closer is a common source of tenant complaints and inspection failures.

## Locksets and access control prep

Modern NYC lobbies and commercial suites often need electric strikes, mag locks, or prep for keypads and intercoms. Planning access-control prep during door installation avoids costly retrofitting later.

## Panic hardware for egress doors

Exit doors in commercial occupancies require listed panic hardware that releases under pressure while maintaining security from the outside. Never substitute residential locksets on required egress openings.

Hillman Door Supply and Door Repair supplies and installs commercial and residential door hardware across NYC. Call (718) 638-4271 for hardware upgrades matched to your openings.
`,
  },
  {
    slug: "structural-door-repair-vs-replacement",
    title: "Structural Door Repair vs. Replacement: When to Fix the Frame",
    metaTitle: "Door Frame Repair vs Replacement NYC",
    excerpt:
      "Sagging jambs, split stiles, and misaligned strikes — how to decide between structural repair and full door replacement.",
    category: "Repair",
    readMinutes: 6,
    date: "2026-04-28",
    heroImage: "/blog/structural-door-repair-vs-replacement-hero.png",
    heroAlt: "Technician repairing a damaged door jamb in a NYC building",
    secondaryImage: "/blog/structural-door-repair-vs-replacement-secondary.png",
    secondaryAlt: "Before and after of a realigned door frame and hardware",
    body: `
Not every sticking door needs a new slab. Many NYC buildings — especially pre-war masonry structures — develop frame movement, rot, and hardware wear that mimic door failure. Structural assessment before ordering a replacement saves money and preserves original materials when possible.

## Signs the frame is the problem

- The door binds at the top or bottom but the slab looks straight
- Visible gaps change seasonally as the building settles
- Hinge screws pull out or hinges sit proud of the jamb
- The strike no longer aligns despite hinge adjustment
- Rot, swelling, or impact damage is visible on the jamb

If multiple symptoms point to the frame, replacing the slab alone will not solve the problem.

## When repair is the durable path

Localized rot, split casings, and misaligned strikes can often be repaired with jamb splices, epoxy consolidation, reinforced hinges, and new strike plates. Historic profiles can be preserved when damage is caught early.

## When replacement is necessary

Severe header failure, widespread rot, or frames that are out of square beyond shimming tolerance usually require jamb replacement or a pre-hung assembly. Fire-rated openings must be replaced with listed assemblies — repairs must not compromise the label.

## Emergency stabilization first

Break-in damage and forced-entry failures need immediate security restoration. Temporary reinforcement and lock replacement protect the property while permanent frame repair is scheduled.

Hillman Door Supply and Door Repair provides structural door repair and frame rebuilds across Brooklyn, Manhattan, and Queens from 281 Flatbush Ave. Call (718) 638-4271 for assessment and a written scope.
`,
  },
];

export const BLOG_BY_SLUG: Record<string, BlogPost> = Object.fromEntries(
  BLOG_POSTS.map((post) => [post.slug, post])
);

export function findPost(slug: string): BlogPost | undefined {
  return BLOG_BY_SLUG[slug];
}
