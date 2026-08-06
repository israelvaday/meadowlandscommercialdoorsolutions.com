import {
  DoorOpen,
  Home,
  Building2,
  Wrench,
  Shield,
  Lock,
  Hammer,
  Package,
  Settings,
  AlertTriangle,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  icon: typeof DoorOpen;
  tagline: string;
  description: string;
  bullets: string[];
  intent: "emergency" | "service" | "trust";
  keywords: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "residential-door-installation",
    name: "Residential Door Installation",
    shortName: "Residential",
    icon: Home,
    tagline: "Precision-fit entry, interior, and specialty doors for Brooklyn and NYC homes.",
    description:
      "From pre-war brownstones to modern condos, Hillman Door Supply installs solid-core, hollow-core, fire-rated, and custom residential doors with accurate framing, hardware alignment, and weather sealing. We measure on-site, source premium door slabs and frames, and complete every installation with level swings, clean reveals, and durable hardware mounting.",
    bullets: [
      "Entry, interior, closet, and French door installation",
      "Pre-war and new-construction framing adjustments",
      "Weatherstripping and threshold alignment",
      "Hinge, latch, and strike-plate tuning",
      "Old door removal and debris haul-away",
    ],
    intent: "service",
    keywords: [
      "residential door installation brooklyn",
      "door installer nyc",
      "interior door replacement brooklyn ny",
      "entry door installation queens",
      "home door contractor manhattan",
    ],
  },
  {
    slug: "commercial-door-installation",
    name: "Commercial Door Installation",
    shortName: "Commercial",
    icon: Building2,
    tagline: "Code-compliant commercial doors for offices, retail, and mixed-use buildings.",
    description:
      "Property managers and business owners across Brooklyn, Manhattan, and Queens rely on Hillman for commercial door supply and installation. We handle hollow metal, aluminum storefront, office suite, and corridor doors with ADA hardware coordination, fire-label requirements, and phased scheduling that keeps tenants and customers moving.",
    bullets: [
      "Office suite, corridor, and back-of-house doors",
      "Retail and restaurant entrance systems",
      "ADA-compliant hardware and clearances",
      "Phased installation for occupied buildings",
      "Written scopes for property managers",
    ],
    intent: "service",
    keywords: [
      "commercial door installation nyc",
      "office door contractor brooklyn",
      "retail door installer queens",
      "commercial door supply manhattan",
      "property manager door service nyc",
    ],
  },
  {
    slug: "custom-door-fabrication",
    name: "Custom Door Fabrication",
    shortName: "Custom",
    icon: Settings,
    tagline: "Built-to-spec doors for unique openings, historic details, and architect-led projects.",
    description:
      "Non-standard openings, historic profiles, and design-driven projects need more than off-the-shelf slabs. Hillman fabricates and installs custom wood, metal-clad, and specialty doors sized to your jamb, with matching casings, transoms, and hardware prep for Brooklyn townhouses, loft conversions, and high-end renovations across NYC.",
    bullets: [
      "Custom sizing for irregular openings",
      "Historic profile and casing replication",
      "Wood, metal-clad, and hybrid constructions",
      "Transom and sidelite coordination",
      "Architect and designer collaboration",
    ],
    intent: "service",
    keywords: [
      "custom door fabrication nyc",
      "custom entry door brooklyn",
      "historic door replacement manhattan",
      "bespoke interior doors queens",
      "architectural door shop brooklyn",
    ],
  },
  {
    slug: "door-hardware-supply",
    name: "Door Hardware Supply",
    shortName: "Hardware",
    icon: Package,
    tagline: "Premium locks, closers, hinges, and access hardware — supplied and installed.",
    description:
      "Hillman Door Supply stocks and installs commercial-grade and residential door hardware including locksets, deadbolts, panic hardware, door closers, hinges, pivots, and electric strikes. We match hardware to door weight, fire rating, ADA requirements, and security goals for single-family homes, multifamily buildings, and commercial suites throughout NYC.",
    bullets: [
      "Locksets, deadbolts, and multi-point systems",
      "Door closers, pivots, and continuous hinges",
      "Panic bars and fire-exit hardware",
      "Electric strikes and access-control prep",
      "Hardware upgrades for aging doors",
    ],
    intent: "service",
    keywords: [
      "door hardware supply brooklyn",
      "commercial door hardware nyc",
      "lockset installation queens",
      "door closer installer manhattan",
      "panic hardware supply brooklyn ny",
    ],
  },
  {
    slug: "structural-door-repair",
    name: "Structural Door Repair",
    shortName: "Structural",
    icon: Hammer,
    tagline: "Restore sagging, binding, and damaged doors without unnecessary replacement.",
    description:
      "Doors that drag, won't latch, or show frame movement often need structural correction — not just a new slab. Hillman repairs twisted jambs, settled headers, split stiles, damaged hinges, and misaligned strikes across NYC's aging housing stock, restoring smooth operation and secure closure while preserving original materials when possible.",
    bullets: [
      "Jamb and header straightening",
      "Hinge reinforcement and re-mortising",
      "Strike alignment and latch tuning",
      "Split stile and panel repairs",
      "Settlement-related binding correction",
    ],
    intent: "service",
    keywords: [
      "structural door repair brooklyn",
      "door frame repair nyc",
      "sagging door fix queens",
      "door won't close repair manhattan",
      "jamb repair contractor brooklyn ny",
    ],
  },
  {
    slug: "fire-rated-doors",
    name: "Fire-Rated Doors",
    shortName: "Fire-Rated",
    icon: Shield,
    tagline: "UL-listed fire doors and frames for code compliance and life safety.",
    description:
      "Multifamily, commercial, and mixed-use buildings across NYC require properly labeled fire-rated door assemblies. Hillman supplies and installs fire-rated doors and frames with correct labels, self-closing hardware, and smoke-seal components — coordinated with your superintendent, architect, or expeditor for DOB and FDNY compliance.",
    bullets: [
      "UL-listed fire door and frame assemblies",
      "Self-closing and auto-closer hardware",
      "Smoke-seal and intumescent components",
      "Corridor and stairwell door replacement",
      "Label verification and documentation",
    ],
    intent: "service",
    keywords: [
      "fire rated door installation nyc",
      "fire door replacement brooklyn",
      "ul listed fire doors queens",
      "building fire door contractor manhattan",
      "fdny compliant door installation nyc",
    ],
  },
  {
    slug: "storefront-glass-doors",
    name: "Storefront & Glass Doors",
    shortName: "Storefront",
    icon: DoorOpen,
    tagline: "Aluminum storefront, entrance, and glass door systems for NYC retail and offices.",
    description:
      "Retail storefronts, restaurant entrances, and ground-floor commercial spaces need durable aluminum and glass door systems that handle daily traffic and NYC weather. Hillman installs and repairs storefront doors, entrance pairs, panic hardware, floor closers, and weather seals for businesses across Brooklyn, Manhattan, and Queens.",
    bullets: [
      "Aluminum storefront entrance doors",
      "Glass entrance pairs and sidelites",
      "Floor closer and pivot adjustments",
      "Weather seal and sweep replacement",
      "After-hours and emergency repairs",
    ],
    intent: "service",
    keywords: [
      "storefront door repair nyc",
      "glass entrance door installation brooklyn",
      "aluminum storefront doors queens",
      "commercial glass door repair manhattan",
      "retail entrance door contractor nyc",
    ],
  },
  {
    slug: "emergency-door-repair",
    name: "Emergency Door Repair",
    shortName: "Emergency",
    icon: AlertTriangle,
    tagline: "Same-day response for broken locks, forced entries, and security failures.",
    description:
      "A door that won't secure puts your property at immediate risk. Hillman provides emergency door repair across Brooklyn, Manhattan, and Queens for break-in damage, failed locks, bent frames, and storefront failures. We stabilize the opening, restore security hardware, and schedule permanent repairs when temporary measures are needed first.",
    bullets: [
      "Break-in and forced-entry damage repair",
      "Lock failure and security hardware replacement",
      "Temporary board-up and secure closure",
      "Storefront and entry door emergencies",
      "Same-day service across NYC boroughs",
    ],
    intent: "emergency",
    keywords: [
      "emergency door repair brooklyn",
      "24 hour door repair nyc",
      "broken door repair queens",
      "break in door repair manhattan",
      "urgent door service brooklyn ny",
    ],
  },
  {
    slug: "door-frame-jamb-repair",
    name: "Door Frame & Jamb Repair",
    shortName: "Frames",
    icon: Wrench,
    tagline: "Rebuild damaged jambs, headers, and casings for lasting door performance.",
    description:
      "Rot, impact damage, termite trails, and repeated settling take a toll on door frames in NYC buildings. Hillman repairs and replaces door jambs, headers, casings, and subsills using materials matched to your wall construction — brick, plaster, drywall, or metal stud — so new or existing doors hang square and latch reliably.",
    bullets: [
      "Jamb and casing replacement",
      "Rot and moisture damage remediation",
      "Brick and masonry opening adjustments",
      "Metal stud and drywall frame builds",
      "Threshold and subsill repair",
    ],
    intent: "service",
    keywords: [
      "door jamb repair brooklyn",
      "door frame replacement nyc",
      "rotten door frame repair queens",
      "door casing repair manhattan",
      "jamb rebuild contractor brooklyn ny",
    ],
  },
  {
    slug: "security-access-doors",
    name: "Security & Access Doors",
    shortName: "Security",
    icon: Lock,
    tagline: "High-security doors, reinforced frames, and access-control-ready hardware.",
    description:
      "From reinforced entry systems to access-control-ready doors for commercial suites and multifamily lobbies, Hillman installs security-focused door assemblies with heavy-duty hardware, reinforced strikes, multi-point locks, and prep for intercoms, keypads, and electric release systems throughout NYC.",
    bullets: [
      "Reinforced entry door assemblies",
      "Multi-point lock systems",
      "Access-control and intercom prep",
      "Reinforced strikes and hinge screws",
      "Lobby and suite security upgrades",
    ],
    intent: "trust",
    keywords: [
      "security door installation nyc",
      "reinforced entry door brooklyn",
      "access control door prep queens",
      "high security door contractor manhattan",
      "multifamily lobby door upgrade nyc",
    ],
  },
];

export const SERVICES_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((service) => [service.slug, service])
);
