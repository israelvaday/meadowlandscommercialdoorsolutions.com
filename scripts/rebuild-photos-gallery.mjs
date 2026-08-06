/**
 * Rebuild content/photos.json from the current door asset set only.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = join(ROOT, "content/photos.json");
const BUSINESS_NAME = "Hillman Door Supply and Door Repair";
const REGION = "Brooklyn, Manhattan & Queens, NY";

const SERVICES = [
  { slug: "residential-door-installation", label: "Residential door installation" },
  { slug: "commercial-door-installation", label: "Commercial door installation" },
  { slug: "custom-door-fabrication", label: "Custom door fabrication" },
  { slug: "door-hardware-supply", label: "Door hardware supply" },
  { slug: "structural-door-repair", label: "Structural door repair" },
  { slug: "fire-rated-doors", label: "Fire-rated doors" },
  { slug: "storefront-glass-doors", label: "Storefront and glass doors" },
  { slug: "emergency-door-repair", label: "Emergency door repair" },
  { slug: "door-frame-jamb-repair", label: "Door frame and jamb repair" },
  { slug: "security-access-doors", label: "Security and access doors" },
];

const GALLERY = [
  {
    file: "door-gallery--brooklyn-entry.png",
    category: "residential",
    services: ["residential-door-installation", "custom-door-fabrication"],
    alt: "Premium entry door installation on a Brooklyn townhouse",
  },
  {
    file: "door-gallery--commercial-corridor.png",
    category: "commercial",
    services: ["commercial-door-installation"],
    alt: "Commercial hollow metal doors in a NYC office corridor",
  },
  {
    file: "door-gallery--custom-wood-door.png",
    category: "custom",
    services: ["custom-door-fabrication"],
    alt: "Custom solid wood panel door in a NYC residential entry",
  },
  {
    file: "door-gallery--storefront-glass.png",
    category: "storefront",
    services: ["storefront-glass-doors"],
    alt: "Aluminum storefront glass entrance doors on NYC retail",
  },
  {
    file: "door-gallery--fire-rated-hallway.png",
    category: "fire-rated",
    services: ["fire-rated-doors"],
    alt: "Fire-rated corridor doors in a NYC multifamily building",
  },
  {
    file: "door-gallery--interior-slabs.png",
    category: "residential",
    services: ["residential-door-installation"],
    alt: "Solid-core interior door installation in a NYC apartment",
  },
  {
    file: "door-gallery--hardware-detail.png",
    category: "hardware",
    services: ["door-hardware-supply"],
    alt: "Premium door hardware including lockset and closer",
  },
  {
    file: "door-gallery--jamb-repair.png",
    category: "repair",
    services: ["door-frame-jamb-repair", "structural-door-repair"],
    alt: "Door frame jamb repair on a pre-war NYC opening",
  },
  {
    file: "door-gallery--security-entry.png",
    category: "security",
    services: ["security-access-doors"],
    alt: "Reinforced security entry door on a NYC building lobby",
  },
  {
    file: "door-gallery--warehouse-supply.png",
    category: "supply",
    services: ["door-hardware-supply"],
    alt: "Organized door supply warehouse with slabs and hardware",
  },
  {
    file: "door-gallery--double-entry.png",
    category: "commercial",
    services: ["commercial-door-installation"],
    alt: "Double entry door installation on a Brooklyn commercial building",
  },
  {
    file: "door-gallery--apartment-interior.png",
    category: "residential",
    services: ["residential-door-installation"],
    alt: "Interior door replacement in a NYC apartment hallway",
  },
  {
    file: "door-gallery--emergency-repair.png",
    category: "emergency",
    services: ["emergency-door-repair"],
    alt: "Emergency door repair on a damaged NYC storefront",
  },
  {
    file: "door-gallery--historic-restoration.png",
    category: "custom",
    services: ["custom-door-fabrication", "structural-door-repair"],
    alt: "Historic door profile restoration on a Brooklyn brownstone",
  },
];

function diskPath(src) {
  return join(ROOT, "public", ...src.replace(/^\/+/, "").split("/"));
}

function imageMeta(src) {
  const path = diskPath(src);
  const buffer = readFileSync(path);
  let width = 1600;
  let height = 900;

  if (
    buffer.length >= 24 &&
    buffer[0] === 0x89 &&
    buffer.toString("ascii", 1, 4) === "PNG"
  ) {
    width = buffer.readUInt32BE(16);
    height = buffer.readUInt32BE(20);
  }

  return {
    width,
    height,
    ratio: Number((width / height).toFixed(3)),
    orientation: width === height ? "square" : width > height ? "landscape" : "portrait",
    bytes: buffer.length,
    source: "openrouter-generated",
  };
}

function catalogAsset(asset) {
  const path = diskPath(asset.src);
  if (!existsSync(path)) {
    console.warn("Missing asset, not catalogued:", asset.src);
    return null;
  }
  return { ...asset, ...imageMeta(asset.src) };
}

const expectedAssets = [
  {
    id: "logo-master-on-navy",
    src: "/logo.png",
    alt: `${BUSINESS_NAME} navy and gold HD door logo`,
    category: "brand",
    kind: "brand",
    services: ["brand"],
  },
  {
    id: "logo-icon-square",
    src: "/logo-256.png",
    alt: `${BUSINESS_NAME} HD logo icon`,
    category: "brand",
    kind: "brand",
    services: ["brand"],
  },
  {
    id: "logo-large-square",
    src: "/logo-512.png",
    alt: `${BUSINESS_NAME} large HD logo`,
    category: "brand",
    kind: "brand",
    services: ["brand"],
  },
  {
    id: "branding-hero-nyc",
    src: "/photos/branding-generated--hero-hillman-door-nyc.png",
    alt: `${BUSINESS_NAME} professional door installation in Brooklyn`,
    category: "branding-generated",
    kind: "hero",
    services: SERVICES.map(({ slug }) => slug),
  },
  {
    id: "branding-map-nyc",
    src: "/photos/branding-generated--nyc-service-map.png",
    alt: `${BUSINESS_NAME} service area across ${REGION}`,
    category: "branding-generated",
    kind: "brand",
    services: ["brand"],
  },
  ...SERVICES.map(({ slug, label }) => ({
    id: `service-hero-${slug}`,
    src: `/photos/service-hero-${slug}.png`,
    alt: `${label} by ${BUSINESS_NAME} in ${REGION}`,
    category: "service-hero",
    kind: "hero",
    services: [slug],
  })),
  ...GALLERY.map(({ file, category, services, alt }) => ({
    id: file.replace(/\.png$/i, ""),
    src: `/photos/${file}`,
    alt: `${alt} — ${BUSINESS_NAME}, ${REGION}`,
    category,
    kind: "work",
    services,
  })),
];

const photos = expectedAssets.map(catalogAsset).filter(Boolean);
writeFileSync(OUTPUT, `${JSON.stringify(photos, null, 2)}\n`);
console.log(`Wrote ${photos.length}/${expectedAssets.length} door assets to content/photos.json`);
