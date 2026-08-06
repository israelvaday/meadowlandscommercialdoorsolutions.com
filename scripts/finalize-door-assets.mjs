/**
 * Finalize Hillman door brand assets from OpenRouter-generated logo master.
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

const logoPath = at("public/logo.png");
if (!existsSync(logoPath)) {
  throw new Error("Missing public/logo.png — run openrouter-generate-site.mjs --images-brand first");
}

mkdirSync(at("assets"), { recursive: true });
copyFileSync(logoPath, at("assets/logo-master.png"));

for (const size of [1024, 512, 256]) {
  const name = size === 1024 ? "logo.png" : `logo-${size}.png`;
  await sharp(logoPath)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(at(`public/${name}.new`));
}

for (const size of [1024, 512, 256]) {
  const name = size === 1024 ? "logo.png" : `logo-${size}.png`;
  rmSync(at(`public/${name}`), { force: true });
  renameSync(at(`public/${name}.new`), at(`public/${name}`));
}

await sharp(logoPath)
  .resize(256, 256, { fit: "contain", background: { r: 11, g: 31, b: 58, alpha: 1 } })
  .png({ compressionLevel: 9 })
  .toFile(at("app/icon.png"));

await sharp(logoPath)
  .resize(180, 180, { fit: "contain", background: { r: 11, g: 31, b: 58, alpha: 1 } })
  .png({ compressionLevel: 9 })
  .toFile(at("app/apple-icon.png"));

await sharp(logoPath)
  .resize(32, 32, { fit: "contain", background: { r: 11, g: 31, b: 58, alpha: 1 } })
  .png({ compressionLevel: 9 })
  .toFile(at("public/favicon-32.png"));

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

copy("public/photos/quote/residential-door-installation.png", "public/photos/quote/property-home.png");
copy("public/photos/quote/commercial-door-installation.png", "public/photos/quote/property-business.png");
copy("public/photos/quote/fire-rated-doors.png", "public/photos/quote/property-multifamily.png");
copy("public/photos/quote/custom-door-fabrication.png", "public/photos/quote/property-other.png");

execFileSync(process.execPath, [at("scripts/rebuild-photos-gallery.mjs")], {
  cwd: ROOT,
  stdio: "inherit",
});

console.log("Hillman door asset finalization complete");
