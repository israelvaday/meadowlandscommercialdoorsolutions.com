import {
  DoorOpen,
  Warehouse,
  Building2,
  Wrench,
  Shield,
  Lock,
  Truck,
  Gauge,
  Settings,
  AlertTriangle,
} from "lucide-react";
import overlay from "./services-copy.json";

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

type ServiceCopy = Partial<Pick<Service, "tagline" | "description" | "bullets" | "keywords" | "name" | "shortName">>;

const COPY = overlay as Record<string, ServiceCopy>;

function applyCopy<T extends { slug: string } & ServiceCopy>(base: T): T {
  const extra = COPY[base.slug];
  if (!extra || typeof extra !== "object") return base;
  return {
    ...base,
    ...Object.fromEntries(
      Object.entries(extra).filter(([, value]) => value !== undefined && value !== null && value !== "")
    ),
  };
}

const BASE_SERVICES: Service[] = [
  {
    slug: "commercial-overhead-doors",
    name: "Commercial Overhead Doors",
    shortName: "Overhead",
    icon: Warehouse,
    tagline: "Sectional and insulated overhead doors for warehouses, shops, and logistics buildings.",
    description:
      "Meadowlands Commercial Door Solutions supplies and installs commercial overhead sectional doors for warehouses, distribution centers, auto shops, and mixed-use buildings across Jersey City, Hudson County, and the Meadowlands. We size the opening, specify insulation and wind-load hardware, and commission operators so docks and bays stay sealed, secure, and productive.",
    bullets: [
      "Insulated and non-insulated sectional doors",
      "High-cycle springs and commercial tracks",
      "Operator, photo-eye, and safety-edge setup",
      "Weather seals for Hudson River wind and salt air",
      "Phased installs for occupied facilities",
    ],
    intent: "service",
    keywords: [
      "commercial overhead door jersey city",
      "warehouse garage door installation nj",
      "sectional door contractor meadowlands",
      "commercial garage door hudson county",
      "overhead door repair jersey city nj",
    ],
  },
  {
    slug: "rolling-steel-doors",
    name: "Rolling Steel Doors",
    shortName: "Rolling Steel",
    icon: Building2,
    tagline: "Heavy-duty roll-up steel doors for industrial, retail, and back-of-house openings.",
    description:
      "Rolling steel and sheet doors take daily truck traffic, wind, and security abuse that lighter products cannot. We furnish and install slat curtains, guides, hoods, and motors for Port Newark-adjacent warehouses, Jersey City storefronts, and Meadowlands industrial parks — with spring replacement and curtain realignment when an existing door fails.",
    bullets: [
      "Insulated and non-insulated rolling steel",
      "Service-door and truck-door configurations",
      "Spring, barrel, and curtain repairs",
      "Manual chain hoist or motorized lift",
      "Security locking and interlock options",
    ],
    intent: "service",
    keywords: [
      "rolling steel door jersey city",
      "roll up commercial door nj",
      "industrial rolling door meadowlands",
      "steel curtain door repair hudson county",
      "commercial roll up door newark nj",
    ],
  },
  {
    slug: "loading-dock-equipment",
    name: "Loading Dock Doors & Equipment",
    shortName: "Dock",
    icon: Truck,
    tagline: "Dock doors, seals, shelters, and leveler coordination for high-throughput facilities.",
    description:
      "A dock only works when the door, seal, and leveler move as one system. From Secaucus and Carlstadt warehouses to Jersey City last-mile buildings, we install dock doors, replace worn seals and shelters, and coordinate leveler and restraint work so trailers stay tight, weather stays out, and crews stay productive.",
    bullets: [
      "Dock door supply and replacement",
      "Dock seals, shelters, and bumpers",
      "Leveler and restraint coordination",
      "Trailer-gap weatherization",
      "Facility-manager written scopes",
    ],
    intent: "service",
    keywords: [
      "loading dock door jersey city",
      "dock seal installation meadowlands",
      "warehouse dock door contractor nj",
      "loading dock repair hudson county",
      "commercial dock equipment newark",
    ],
  },
  {
    slug: "high-speed-doors",
    name: "High-Speed & High-Performance Doors",
    shortName: "High-Speed",
    icon: Gauge,
    tagline: "Fast-cycle doors for cold storage, parking, and high-traffic industrial openings.",
    description:
      "High-speed fabric and rubber doors keep temperature, dust, and traffic under control in Meadowlands logistics, food facilities, and Jersey City parking structures. We specify cycle ratings, safety sensors, and control packages so openings cycle quickly without sacrificing pedestrian or forklift protection.",
    bullets: [
      "Interior and exterior high-speed doors",
      "Cold-storage and clean-process openings",
      "Parking and high-traffic vehicle doors",
      "Sensor, loop, and pull-cord controls",
      "Soft-reset and breakaway curtains",
    ],
    intent: "service",
    keywords: [
      "high speed door jersey city",
      "high performance door meadowlands",
      "cold storage door contractor nj",
      "parking garage high speed door hudson county",
      "industrial high speed door newark",
    ],
  },
  {
    slug: "fire-rated-doors",
    name: "Fire-Rated Commercial Doors",
    shortName: "Fire-Rated",
    icon: Shield,
    tagline: "Labeled fire door assemblies for corridors, stairwells, and industrial separations.",
    description:
      "Hudson County mixed-use towers, Newark warehouses, and Jersey City multifamily buildings need labeled fire-door assemblies — not generic slabs. We supply and install UL-listed doors, frames, closers, and smoke seals, then document labels so property managers and expeditors can show inspectors a complete assembly.",
    bullets: [
      "UL-listed door and frame assemblies",
      "Self-closing and sequential hardware",
      "Smoke seals and intumescent kits",
      "Stair, corridor, and occupancy separations",
      "Label photos and closeout notes",
    ],
    intent: "trust",
    keywords: [
      "fire rated door jersey city",
      "commercial fire door installation nj",
      "ul listed fire door hudson county",
      "warehouse fire door meadowlands",
      "fire door replacement newark nj",
    ],
  },
  {
    slug: "hollow-metal-doors",
    name: "Hollow Metal Doors & Frames",
    shortName: "Hollow Metal",
    icon: Settings,
    tagline: "Commercial hollow metal doors and knockdown or welded frames for offices and plants.",
    description:
      "Hollow metal remains the workhorse of Jersey City offices, schools, hospitals, and industrial plants. We furnish HM doors and frames, prep for cylindrical or mortise hardware, and hang openings plumb so latches, closers, and access control actually work after the painters leave.",
    bullets: [
      "Flush, vision, and louvered HM doors",
      "Knockdown and welded frames",
      "Hardware and electric-strike prep",
      "Corridor, stair, and plant openings",
      "Field measuring for existing masonry",
    ],
    intent: "service",
    keywords: [
      "hollow metal door jersey city",
      "commercial steel door frame nj",
      "hm door installer hudson county",
      "office hollow metal door meadowlands",
      "steel door replacement newark nj",
    ],
  },
  {
    slug: "automatic-operators",
    name: "Automatic Door Operators",
    shortName: "Operators",
    icon: Wrench,
    tagline: "Commercial operators, sensors, and controls for overhead, rolling, and swing doors.",
    description:
      "A door is only as reliable as its operator. We install and service jackshaft, trolley, and rolling-door motors plus swing operators for ADA entries across Jersey City, Hoboken, and Meadowlands facilities. Photo eyes, sensing edges, and interlocks are commissioned so the opening meets safety expectations before we leave.",
    bullets: [
      "Jackshaft, trolley, and rolling operators",
      "ADA swing and low-energy operators",
      "Photo eyes, edges, and reversing",
      "Access-control and interlock wiring prep",
      "Preventive maintenance programs",
    ],
    intent: "service",
    keywords: [
      "commercial door operator jersey city",
      "garage door opener warehouse nj",
      "automatic door operator meadowlands",
      "rolling door motor repair hudson county",
      "ada automatic door jersey city nj",
    ],
  },
  {
    slug: "storefront-entrances",
    name: "Storefront & Aluminum Entrances",
    shortName: "Storefront",
    icon: DoorOpen,
    tagline: "Aluminum and glass entrance systems for Jersey City retail, offices, and lobbies.",
    description:
      "Downtown Jersey City, Hoboken, and Newark storefronts take constant traffic, wind, and salt. We install and repair aluminum entrance pairs, pivots, floor closers, panic hardware, and weather seals so customers keep moving and the opening stays locked after hours.",
    bullets: [
      "Aluminum storefront doors and frames",
      "Glass entrance pairs and sidelites",
      "Floor closer and pivot service",
      "Panic hardware and ADA closers",
      "After-hours commercial repairs",
    ],
    intent: "service",
    keywords: [
      "storefront door repair jersey city",
      "aluminum entrance door hoboken",
      "commercial glass door nj",
      "retail storefront door meadowlands",
      "lobby entrance door hudson county",
    ],
  },
  {
    slug: "security-grilles",
    name: "Security Grilles & Access Doors",
    shortName: "Security",
    icon: Lock,
    tagline: "Rolling grilles, security doors, and access-control-ready commercial openings.",
    description:
      "Retail, parking, and back-of-house openings along the Hudson waterfront need more than a latch. We install rolling grilles, reinforced entries, and access-control-ready doors so Jersey City and Meadowlands properties can secure inventory without blocking daytime traffic.",
    bullets: [
      "Rolling and side-folding grilles",
      "Reinforced commercial entry doors",
      "Access-control and intercom prep",
      "Parking and after-hours closures",
      "Heavy-duty locking hardware",
    ],
    intent: "trust",
    keywords: [
      "security grille jersey city",
      "rolling security gate nj",
      "commercial security door meadowlands",
      "access control door hudson county",
      "storefront security grille newark",
    ],
  },
  {
    slug: "emergency-commercial-repair",
    name: "Emergency Commercial Door Repair",
    shortName: "Emergency",
    icon: AlertTriangle,
    tagline: "Priority response when a commercial door fails, binds, or will not secure.",
    description:
      "A failed overhead door, rolling steel curtain, or storefront pair stops a facility. Meadowlands Commercial Door Solutions provides priority commercial door repair from 333 Washington St for broken springs, off-track curtains, failed operators, and forced-entry damage across Hudson County, the Meadowlands, and nearby NYC waterfront buildings.",
    bullets: [
      "Broken spring and cable repair",
      "Off-track rolling and sectional doors",
      "Operator and control failures",
      "Storefront and grille emergencies",
      "Temporary secure-and-return scopes",
    ],
    intent: "emergency",
    keywords: [
      "emergency commercial door repair jersey city",
      "broken warehouse door nj",
      "24 hour overhead door repair meadowlands",
      "rolling door emergency hudson county",
      "storefront door emergency jersey city",
    ],
  },
];

export const SERVICES: Service[] = BASE_SERVICES.map((service) => applyCopy(service));

export const SERVICES_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((service) => [service.slug, service])
);
