/**
 * Rebuild content/photos.json from the Meadowlands commercial door asset set.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = join(ROOT, "content/photos.json");
const BUSINESS_NAME = "Meadowlands Commercial Door Solutions";
const REGION = "Jersey City, Hudson County & the Meadowlands, NJ";

const SERVICES = [
  { slug: "commercial-overhead-doors", label: "Commercial overhead doors" },
  { slug: "rolling-steel-doors", label: "Rolling steel doors" },
  { slug: "loading-dock-equipment", label: "Loading dock doors and equipment" },
  { slug: "high-speed-doors", label: "High-speed doors" },
  { slug: "fire-rated-doors", label: "Fire-rated commercial doors" },
  { slug: "hollow-metal-doors", label: "Hollow metal doors and frames" },
  { slug: "automatic-operators", label: "Automatic door operators" },
  { slug: "storefront-entrances", label: "Storefront and aluminum entrances" },
  { slug: "security-grilles", label: "Security grilles and access doors" },
  { slug: "emergency-commercial-repair", label: "Emergency commercial door repair" },
];

const GALLERY = [
  { file: "door-gallery--overhead-warehouse.webp", category: "overhead", services: ["commercial-overhead-doors"], alt: "Commercial overhead doors on a Jersey City warehouse" },
  { file: "door-gallery--rolling-steel.webp", category: "rolling", services: ["rolling-steel-doors"], alt: "Rolling steel door on a North Jersey industrial opening" },
  { file: "door-gallery--loading-dock.webp", category: "dock", services: ["loading-dock-equipment"], alt: "Loading dock door and trailer seal at a Meadowlands warehouse" },
  { file: "door-gallery--high-speed.webp", category: "high-speed", services: ["high-speed-doors"], alt: "High-speed industrial door in a logistics corridor" },
  { file: "door-gallery--fire-rated.webp", category: "fire-rated", services: ["fire-rated-doors"], alt: "Fire-rated corridor doors in a Jersey City commercial building" },
  { file: "door-gallery--hollow-metal.webp", category: "hollow-metal", services: ["hollow-metal-doors"], alt: "Hollow metal door with vision lite in a commercial corridor" },
  { file: "door-gallery--operator.webp", category: "operator", services: ["automatic-operators"], alt: "Commercial jackshaft operator on a warehouse overhead door" },
  { file: "door-gallery--storefront-jc.webp", category: "storefront", services: ["storefront-entrances"], alt: "Aluminum storefront entrance in downtown Jersey City" },
  { file: "door-gallery--security-grille.webp", category: "security", services: ["security-grilles"], alt: "Rolling security grille on a commercial storefront" },
  { file: "door-gallery--emergency.webp", category: "emergency", services: ["emergency-commercial-repair"], alt: "Emergency commercial door repair on a warehouse overhead door" },
  { file: "door-gallery--port-warehouse.webp", category: "dock", services: ["loading-dock-equipment", "commercial-overhead-doors"], alt: "Dock doors at a Port Newark-area warehouse" },
  { file: "door-gallery--meadowlands-logistics.webp", category: "overhead", services: ["commercial-overhead-doors"], alt: "Meadowlands logistics warehouse overhead doors" },
  { file: "door-gallery--jc-lobby.webp", category: "storefront", services: ["storefront-entrances"], alt: "Jersey City commercial lobby aluminum entrance doors" },
  { file: "door-gallery--dock-interior.webp", category: "dock", services: ["loading-dock-equipment"], alt: "Interior view of a commercial dock door" },
];

function diskPath(src) {
  return join(ROOT, "public", ...src.replace(/^\/+/, "").split("/"));
}

function imageMeta(src) {
  const path = diskPath(src);
  const buffer = readFileSync(path);
  let width = 1600;
  let height = 900;

  if (buffer.length >= 24 && buffer[0] === 0x89 && buffer.toString("ascii", 1, 4) === "PNG") {
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
    alt: `${BUSINESS_NAME} cyan industrial door logo`,
    category: "brand",
    kind: "brand",
    services: ["brand"],
  },
  {
    id: "logo-icon-square",
    src: "/logo-256.png",
    alt: `${BUSINESS_NAME} logo icon`,
    category: "brand",
    kind: "brand",
    services: ["brand"],
  },
  {
    id: "logo-large-square",
    src: "/logo-512.png",
    alt: `${BUSINESS_NAME} large logo`,
    category: "brand",
    kind: "brand",
    services: ["brand"],
  },
  {
    id: "branding-hero-meadowlands",
    src: "/photos/branding-generated--hero-meadowlands.webp",
    alt: `${BUSINESS_NAME} commercial overhead door installation in Jersey City`,
    category: "branding-generated",
    kind: "hero",
    services: SERVICES.map(({ slug }) => slug),
  },
  {
    id: "branding-map",
    src: "/photos/branding-generated--service-map.webp",
    alt: `${BUSINESS_NAME} service area across ${REGION}`,
    category: "branding-generated",
    kind: "brand",
    services: ["brand"],
  },
  ...SERVICES.map(({ slug, label }) => ({
    id: `service-hero-${slug}`,
    src: `/photos/service-hero-${slug}.webp`,
    alt: `${label} by ${BUSINESS_NAME} in ${REGION}`,
    category: "service-hero",
    kind: "hero",
    services: [slug],
  })),
  ...GALLERY.map(({ file, category, services, alt }) => ({
    id: file.replace(/\.(webp|png)$/i, ""),
    src: `/photos/${file}`,
    alt: `${alt} — ${BUSINESS_NAME}, ${REGION}`,
    category,
    kind: "work",
    services,
  })),
];

const photos = expectedAssets.map(catalogAsset).filter(Boolean);
writeFileSync(OUTPUT, `${JSON.stringify(photos, null, 2)}\n`);
console.log(`Wrote ${photos.length}/${expectedAssets.length} commercial door assets to content/photos.json`);
