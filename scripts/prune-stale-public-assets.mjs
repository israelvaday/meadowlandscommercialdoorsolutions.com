/**
 * Keep only Meadowlands commercial door assets in public/ before export.
 */
import { existsSync, readdirSync, rmSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const SERVICE_SLUGS = [
  "commercial-overhead-doors",
  "rolling-steel-doors",
  "loading-dock-equipment",
  "high-speed-doors",
  "fire-rated-doors",
  "hollow-metal-doors",
  "automatic-operators",
  "storefront-entrances",
  "security-grilles",
  "emergency-commercial-repair",
];

const BLOG_SLUGS = [
  "commercial-overhead-doors-jersey-city-warehouses",
  "rolling-steel-vs-sectional-meadowlands",
  "fire-rated-doors-hudson-county",
  "high-speed-doors-logistics",
  "storefront-repair-downtown-jersey-city",
  "commercial-door-operator-maintenance",
];

const GALLERY_FILES = [
  "door-gallery--overhead-warehouse.webp",
  "door-gallery--rolling-steel.webp",
  "door-gallery--loading-dock.webp",
  "door-gallery--high-speed.webp",
  "door-gallery--fire-rated.webp",
  "door-gallery--hollow-metal.webp",
  "door-gallery--operator.webp",
  "door-gallery--storefront-jc.webp",
  "door-gallery--security-grille.webp",
  "door-gallery--emergency.webp",
  "door-gallery--port-warehouse.webp",
  "door-gallery--meadowlands-logistics.webp",
  "door-gallery--jc-lobby.webp",
  "door-gallery--dock-interior.webp",
];

const keep = new Set([
  "public/logo.png",
  "public/logo-256.png",
  "public/logo-512.png",
  "public/favicon-32.png",
  "public/CNAME",
  "public/photos/branding-generated--hero-meadowlands.webp",
  "public/photos/branding-generated--service-map.webp",
  "public/about/about-hero.webp",
  "public/about/about-workshop.webp",
  ...SERVICE_SLUGS.map((slug) => `public/photos/service-hero-${slug}.webp`),
  ...GALLERY_FILES.map((file) => `public/photos/${file}`),
  ...SERVICE_SLUGS.map((slug) => `public/photos/quote/${slug}.webp`),
  "public/photos/quote/property-warehouse.webp",
  "public/photos/quote/property-retail.webp",
  "public/photos/quote/property-office.webp",
  "public/photos/quote/property-other.webp",
  ...BLOG_SLUGS.flatMap((slug) => [
    `public/blog/${slug}-hero.webp`,
    `public/blog/${slug}-secondary.webp`,
  ]),
]);

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

let removed = 0;
let keptBytes = 0;
let removedBytes = 0;

for (const file of walk(join(ROOT, "public"))) {
  const key = relative(ROOT, file).replaceAll("\\", "/");
  if (keep.has(key)) {
    keptBytes += statSync(file).size;
    continue;
  }
  const size = statSync(file).size;
  rmSync(file, { force: true });
  removed += 1;
  removedBytes += size;
}

console.log(
  `[prune-stale-public-assets] removed ${removed} files (${Math.round(removedBytes / 1024 / 1024)} MB), kept ${Math.round(keptBytes / 1024 / 1024)} MB`
);
