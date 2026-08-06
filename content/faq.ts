export type FAQ = { q: string; a: string };

export type FAQSection = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  items: FAQ[];
};

export const FAQ_HERO_IMAGE = "/photos/branding-generated--hero-hillman-door-nyc.png";
export const FAQ_HERO_ALT =
  "Hillman Door Supply technician installing a premium entry door in a Brooklyn townhouse";

export const FAQ_SECTIONS: FAQSection[] = [
  {
    id: "pricing",
    title: "Pricing & estimates",
    emoji: "💰",
    description: "How door scopes, materials, and written estimates are prepared.",
    items: [
      {
        q: "How much does professional door installation cost in NYC?",
        a: "Pricing depends on door type, frame condition, hardware, fire-rating requirements, access, and whether structural frame work is needed. We provide a written estimate after measuring the opening so the scope reflects the actual job — not a generic per-door rate.",
      },
      {
        q: "Do you provide free door estimates?",
        a: "Yes. Hillman Door Supply and Door Repair provides free estimates for residential and commercial door work across Brooklyn, Manhattan, and Queens. Photos help for initial review; most projects require an on-site measurement before final pricing.",
      },
      {
        q: "Are doors and hardware included in the estimate?",
        a: "The proposal identifies whether the door slab, frame, hardware, and standard installation are included, along with fire labels, closers, and any structural repairs. Upgrades and added openings are listed clearly so comparisons between bids are meaningful.",
      },
      {
        q: "How are changes handled after work begins?",
        a: "If you add another door, upgrade hardware, or need frame repair outside the original scope, we document the price and schedule impact before proceeding. We do not rely on surprise extras at the end of a project.",
      },
    ],
  },
  {
    id: "process",
    title: "Installation process",
    emoji: "🚪",
    description: "What happens from the first site visit through final inspection.",
    items: [
      {
        q: "What does your door installation process include?",
        a: "A typical project includes site measurement, product selection, old door removal when applicable, frame assessment, installation, hardware mounting, alignment tuning, weather sealing, cleanup, and a final operation check. The exact sequence is written into the proposal.",
      },
      {
        q: "How long will my door project take?",
        a: "A single interior door may be completed in hours, while multiple commercial openings, fire-rated assemblies, or custom fabrication require more time. We provide an estimated start window and duration after seeing the scope.",
      },
      {
        q: "Can you work while tenants or customers are on-site?",
        a: "Yes. We phase many occupied building projects by floor, suite, or zone. We discuss access, noise, security, and daily cleanup before scheduling so the plan fits normal operations.",
      },
      {
        q: "Who will perform the work?",
        a: "Hillman Door Supply and Door Repair provides insured professional door technicians and direct project communication from our Brooklyn headquarters at 281 Flatbush Ave.",
      },
    ],
  },
  {
    id: "products",
    title: "Doors & hardware",
    emoji: "🔧",
    description: "How door types, ratings, and hardware are selected.",
    items: [
      {
        q: "What types of doors do you supply and install?",
        a: "We supply and install residential entry and interior doors, commercial hollow metal and aluminum storefront doors, fire-rated assemblies, custom wood doors, and security-reinforced entry systems matched to your opening and code requirements.",
      },
      {
        q: "How do I choose the right door hardware?",
        a: "Hardware selection depends on door weight, fire rating, traffic level, ADA requirements, and security goals. We recommend locksets, closers, hinges, and panic hardware suited to the specific opening rather than one generic package.",
      },
      {
        q: "Do you install fire-rated doors?",
        a: "Yes. We supply and install UL-listed fire-rated door and frame assemblies with correct labels, self-closing hardware, and smoke-seal components for multifamily, commercial, and mixed-use buildings across NYC.",
      },
      {
        q: "When is frame repair necessary instead of door replacement?",
        a: "Frame repair or replacement may be needed when jambs are rotted, settled, or impact-damaged, when strikes no longer align, or when the opening has shifted. We assess structural condition before recommending a new slab alone.",
      },
    ],
  },
  {
    id: "preparation",
    title: "Site preparation",
    emoji: "🧰",
    description: "How openings and work areas are readied for installation.",
    items: [
      {
        q: "What should I do before the installers arrive?",
        a: "Clear the path to the door, remove wall decorations near the opening, and ensure access to both sides of the door when possible. We confirm whether furniture, rugs, or fixtures need to be moved before the start date.",
      },
      {
        q: "How do you protect floors and adjacent finishes?",
        a: "We use drop cloths, floor coverings, and controlled work zones based on the opening location. Dust from cutting or mortising is contained, and work areas are cleaned at agreed milestones.",
      },
      {
        q: "What frame preparation is included?",
        a: "Preparation may include shimming, jamb plumb and square checks, strike alignment, threshold leveling, rot remediation, and masonry or drywall adjustments. The estimate states the preparation level because door performance depends on frame condition.",
      },
      {
        q: "How are custom doors measured?",
        a: "Custom doors require precise field measurements of width, height, jamb depth, swing, hardware locations, and wall substrate. We verify rough opening dimensions and note irregularities before fabrication begins.",
      },
    ],
  },
  {
    id: "nyc-buildings",
    title: "NYC buildings & codes",
    emoji: "🏙️",
    description: "How NYC building types and code requirements affect door work.",
    items: [
      {
        q: "Do you work in pre-war Brooklyn brownstones?",
        a: "Yes. Pre-war buildings often have settled frames, non-standard openings, and historic profiles. We measure carefully, fabricate custom doors when needed, and preserve original casings when repair is the durable path.",
      },
      {
        q: "Can you coordinate with building supers and property managers?",
        a: "Yes. We provide written scopes, fire-label documentation, and schedule coordination for multifamily and commercial properties. After-hours and phased installation is available when arranged.",
      },
      {
        q: "Do you offer emergency door repair?",
        a: "Yes. We respond to break-in damage, failed locks, bent frames, and storefront failures across Brooklyn, Manhattan, and Queens. We stabilize the opening and restore security hardware, with permanent repairs scheduled when needed.",
      },
      {
        q: "What areas do you serve from your Brooklyn location?",
        a: "Hillman Door Supply and Door Repair serves 100 neighborhoods across Brooklyn, Manhattan, and Queens from our headquarters at 281 Flatbush Ave, Brooklyn, NY 11217. See our service areas page for the full coverage map.",
      },
    ],
  },
];
