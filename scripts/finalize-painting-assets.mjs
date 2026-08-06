/**
 * Finalize the door asset set without additional API calls:
 * - build logo derivatives from the approved master (with vector fallback)
 * - replace legacy property cards with current door imagery
 * - rebuild the photo catalog
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  renameSync,
  rmSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const at = (path) => join(ROOT, ...path.split("/"));

const logoSvg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <rect x="54" y="54" width="916" height="916" rx="220" fill="#0B1F3A"/>
  <rect x="72" y="72" width="880" height="880" rx="202" fill="none" stroke="#D4A24C" stroke-width="28"/>
  <rect x="280" y="180" width="464" height="664" rx="24" fill="none" stroke="#D4A24C" stroke-width="36"/>
  <circle cx="620" cy="512" r="36" fill="#FFF6DF"/>
  <rect x="340" y="220" width="120" height="24" rx="12" fill="#D4A24C" opacity="0.5"/>
  <text x="200" y="920" fill="#FFF6DF" font-family="Arial, Helvetica, sans-serif" font-size="200" font-weight="900" letter-spacing="-16">HD</text>
</svg>
`);
const approvedLogo = at("assets/logo-master.png");
const logoInput = existsSync(approvedLogo) ? approvedLogo : logoSvg;

for (const size of [1024, 512, 256]) {
  const name = size === 1024 ? "logo.png" : `logo-${size}.png`;
  await sharp(logoInput).resize(size, size).png({ compressionLevel: 9 }).toFile(at(`public/${name}.new`));
}

for (const size of [1024, 512, 256]) {
  const name = size === 1024 ? "logo.png" : `logo-${size}.png`;
  const target = at(`public/${name}`);
  const source = at(`public/${name}.new`);
  rmSync(target, { force: true });
  renameSync(source, target);
}

await sharp(logoInput)
  .resize(256, 256)
  .png({ compressionLevel: 9 })
  .toFile(at("app/icon.png"));
await sharp(logoInput)
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toFile(at("app/apple-icon.png"));

function copy(source, target) {
  const from = at(source);
  const to = at(target);
  if (!existsSync(from)) {
    console.warn(`Skip missing source: ${source}`);
    return;
  }
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(from, to);
  console.log(`Wrote ${target} from ${source}`);
}

copy(
  "public/photos/quote/residential-door-installation.png",
  "public/photos/quote/property-home.png"
);
copy(
  "public/photos/quote/commercial-door-installation.png",
  "public/photos/quote/property-business.png"
);
copy(
  "public/photos/quote/fire-rated-doors.png",
  "public/photos/quote/property-multifamily.png"
);
copy(
  "public/photos/quote/custom-door-fabrication.png",
  "public/photos/quote/property-other.png"
);

execFileSync(process.execPath, [at("scripts/rebuild-photos-gallery.mjs")], {
  cwd: ROOT,
  stdio: "inherit",
});

console.log("Door asset finalization complete");
