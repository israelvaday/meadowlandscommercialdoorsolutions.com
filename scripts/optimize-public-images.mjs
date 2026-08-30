#!/usr/bin/env node
/**
 * Convert heavy public PNG/JPEG photos to WebP (or recompress PNG logos) without
 * regenerating images. Updates content paths that reference converted files.
 */
import {
  existsSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");

const FORMAT = (process.env.IMAGE_FORMAT ?? "webp").toLowerCase();
const WEBP_QUALITY = Number(process.env.WEBP_QUALITY ?? "82");
const MAX_WIDTH = Number(process.env.IMAGE_MAX_WIDTH ?? "1600");

/** Keep PNG for logos / schema / favicon-related assets. */
const KEEP_PNG = new Set([
  "logo.png",
  "logo-256.png",
  "logo-512.png",
]);

const SOURCE_FILES = [
  "content/photos.json",
  "content/blog.ts",
  "content/faq.ts",
  "app/gallery/page.tsx",
  "app/services/page.tsx",
  "app/services/[slug]/page.tsx",
  "app/service-areas/[slug]/page.tsx",
  "app/about/page.tsx",
  "app/faq/page.tsx",
  "components/sections/Hero.tsx",
  "components/sections/PhotoMarquee.tsx",
  "components/sections/BrandShowcase.tsx",
  "components/sections/ServiceGrid.tsx",
  "components/site/QuoteWizard.tsx",
  "scripts/prune-stale-public-assets.mjs",
  "scripts/rebuild-photos-gallery.mjs",
];

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function isPhotoAsset(rel) {
  if (KEEP_PNG.has(rel.replaceAll("\\", "/").split("/").pop() ?? "")) return false;
  return /\.(png|jpe?g)$/i.test(rel);
}

function targetPath(srcPath) {
  return srcPath.replace(/\.(png|jpe?g)$/i, `.${FORMAT}`);
}

function publicRel(absPath) {
  return relative(PUBLIC, absPath).replaceAll("\\", "/");
}

function webPath(rel) {
  return `/${rel}`;
}

async function convertPhoto(absPath) {
  const rel = publicRel(absPath);
  const outPath = targetPath(absPath);
  if (!existsSync(absPath)) {
    if (existsSync(outPath)) return null;
    throw new Error(`Missing source image: ${rel}`);
  }
  if (existsSync(outPath)) {
    const before = statSync(absPath).size;
    rmSync(absPath, { force: true });
    console.log(`[optimize-images] skip ${rel} (${FORMAT} already exists)`);
    return {
      rel,
      outRel: publicRel(outPath),
      before,
      after: statSync(outPath).size,
      webFrom: webPath(rel),
      webTo: webPath(publicRel(outPath)),
    };
  }

  const before = statSync(absPath).size;

  let pipeline = sharp(absPath).rotate();
  const meta = await pipeline.metadata();
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  if (FORMAT === "webp") {
    await pipeline.webp({ quality: WEBP_QUALITY, effort: 4 }).toFile(outPath);
  } else if (FORMAT === "avif") {
    await pipeline.avif({ quality: Math.max(45, WEBP_QUALITY - 20), effort: 4 }).toFile(outPath);
  } else {
    throw new Error(`Unsupported IMAGE_FORMAT: ${FORMAT}`);
  }

  const after = statSync(outPath).size;
  rmSync(absPath, { force: true });
  return { rel, outRel: publicRel(outPath), before, after, webFrom: webPath(rel), webTo: webPath(publicRel(outPath)) };
}

async function optimizeLogo(absPath) {
  const before = statSync(absPath).size;
  const tmp = `${absPath}.opt.tmp`;
  await sharp(absPath)
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false })
    .toFile(tmp);
  const after = statSync(tmp).size;
  if (after < before) {
    writeFileSync(absPath, readFileSync(tmp));
  }
  rmSync(tmp, { force: true });
  return { rel: publicRel(absPath), before, after: Math.min(before, after) };
}

function patchSources(replacements) {
  if (!replacements.length) return;
  const fromTo = replacements.sort((a, b) => b.webFrom.length - a.webFrom.length);
  for (const file of SOURCE_FILES) {
    const path = join(ROOT, file);
    if (!existsSync(path)) continue;
    let text = readFileSync(path, "utf8");
    let changed = false;
    for (const { webFrom, webTo } of fromTo) {
      if (text.includes(webFrom)) {
        text = text.split(webFrom).join(webTo);
        changed = true;
      }
    }
    if (text.includes("/photos/") && text.includes('.png`')) {
      text = text.replace(/(\/photos\/[^`"\n]+)\.png`/g, `$1.${FORMAT}\``);
      changed = true;
    }
    if (text.includes("/blog/") && text.includes('.png`')) {
      text = text.replace(/(\/blog\/[^`"\n]+)\.png`/g, `$1.${FORMAT}\``);
      changed = true;
    }
    if (changed) writeFileSync(path, text);
  }
}

function patchPhotosJson(replacements) {
  const path = join(ROOT, "content/photos.json");
  if (!existsSync(path)) return;
  const photos = JSON.parse(readFileSync(path, "utf8"));
  const bySrc = Object.fromEntries(replacements.map((r) => [r.webFrom, r]));
  for (const photo of photos) {
    const hit = bySrc[photo.src];
    if (!hit) continue;
    photo.src = hit.webTo;
    photo.bytes = hit.after;
  }
  writeFileSync(path, `${JSON.stringify(photos, null, 2)}\n`);
}

const photos = walk(PUBLIC).filter((p) => {
  const rel = publicRel(p);
  return rel.startsWith("photos/") || rel.startsWith("blog/");
}).filter((p) => isPhotoAsset(publicRel(p)));

const logos = walk(PUBLIC).filter((p) => KEEP_PNG.has(publicRel(p)));

let saved = 0;
const converted = [];

for (const file of photos) {
  const result = await convertPhoto(file);
  if (!result) continue;
  if (existsSync(file)) saved += result.before - result.after;
  converted.push(result);
  if (existsSync(file)) {
    console.log(
      `[optimize-images] ${result.rel} -> ${result.outRel} (${Math.round(result.before / 1024)}KB -> ${Math.round(result.after / 1024)}KB)`
    );
  }
}

for (const file of logos) {
  const result = await optimizeLogo(file);
  saved += result.before - result.after;
  console.log(
    `[optimize-images] logo ${result.rel} (${Math.round(result.before / 1024)}KB -> ${Math.round(result.after / 1024)}KB)`
  );
}

patchSources(converted);
patchPhotosJson(converted);

const totalAfter = walk(PUBLIC)
  .filter((p) => /\.(png|jpe?g|webp|avif)$/i.test(p))
  .reduce((sum, p) => sum + statSync(p).size, 0);

console.log(
  `[optimize-images] converted ${converted.length} photos to ${FORMAT}, saved ${Math.round(saved / 1024 / 1024)} MB, public images now ${Math.round(totalAfter / 1024 / 1024)} MB`
);
