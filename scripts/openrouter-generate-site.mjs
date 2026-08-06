/**
 * Generate Hillman Door Supply image assets and local door-service insights.
 *
 * Usage:
 *   node scripts/openrouter-generate-site.mjs --test [--force]
 *   node scripts/openrouter-generate-site.mjs --images-blog [--force]
 *   node scripts/openrouter-generate-site.mjs --images-gallery [--force]
 *   node scripts/openrouter-generate-site.mjs --images-brand [--force]
 *   node scripts/openrouter-generate-site.mjs --images-quote [--force]
 *   node scripts/openrouter-generate-site.mjs --areas [--force]
 *   node scripts/openrouter-generate-site.mjs --all [--force]
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  chatJson,
  generateImage,
  getOpenRouterKey,
  loadEnvLocal,
  sleep,
} from "./openrouter-lib.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BUSINESS_NAME = "Hillman Door Supply and Door Repair";
const PHONE = "(718) 638-4271";
const PHOTO_STYLE =
  "Photorealistic professional door installation photographed on a full-frame camera, authentic NYC Brooklyn property, realistic materials and hardware, natural New York light, balanced editorial composition";
const NO_TEXT =
  "No visible words, letters, labels, signs, logos, watermarks, captions, UI, or artificial CGI styling";

const SERVICE_HEROES = [
  {
    slug: "residential-door-installation",
    prompt:
      "Professional door installer fitting a premium solid wood entry door in a Brooklyn brownstone, precise hinge alignment and clean job site",
  },
  {
    slug: "commercial-door-installation",
    prompt:
      "Professional crew installing a commercial hollow metal door in a modern NYC office corridor, organized tools and level frame",
  },
  {
    slug: "custom-door-fabrication",
    prompt:
      "Craftsman finishing a custom panel entry door in a workshop, rich wood grain and precision mortise hardware prep",
  },
  {
    slug: "door-hardware-supply",
    prompt:
      "Close professional detail of commercial-grade lockset, hinges, and door closer arranged beside an installed NYC office door",
  },
  {
    slug: "structural-door-repair",
    prompt:
      "Professional technician rebuilding a damaged door jamb in a pre-war NYC apartment, shims and level visible",
  },
  {
    slug: "fire-rated-doors",
    prompt:
      "UL-labeled fire-rated corridor door installed in a NYC apartment building hallway with self-closing hardware",
  },
  {
    slug: "storefront-glass-doors",
    prompt:
      "Aluminum and glass storefront entrance door on a NYC retail shop, clean floor closer and polished hardware",
  },
  {
    slug: "emergency-door-repair",
    prompt:
      "Emergency door technician securing a damaged entry door after break-in on a Brooklyn building, professional tools",
  },
  {
    slug: "door-frame-jamb-repair",
    prompt:
      "Professional carpenter replacing a rotted door jamb in a NYC masonry opening, new casing and square frame",
  },
  {
    slug: "security-access-doors",
    prompt:
      "Reinforced security entry door with multi-point lock installed on a NYC multifamily lobby entrance",
  },
];

const BLOG_IMAGES = [
  {
    slug: "choosing-entry-door-brooklyn-brownstone",
    hero: "Premium solid wood entry door on a classic Brooklyn brownstone facade, warm natural light",
    secondary: "Door technician measuring a historic Brooklyn entry opening with professional tools",
  },
  {
    slug: "fire-rated-doors-nyc-multifamily",
    hero: "Fire-rated corridor door with visible UL label in a NYC apartment building hallway",
    secondary: "Self-closing door closer hardware on a fire-rated door assembly",
  },
  {
    slug: "storefront-door-repair-nyc-retail",
    hero: "Aluminum and glass storefront entrance door on a NYC retail shop at street level",
    secondary: "Technician adjusting floor closer on a commercial glass entrance door",
  },
  {
    slug: "interior-door-replacement-nyc-apartment",
    hero: "New solid-core interior door installed in a renovated NYC apartment with clean white trim",
    secondary: "Stack of pre-hung interior doors ready for apartment installation in Brooklyn",
  },
  {
    slug: "door-hardware-guide-nyc-buildings",
    hero: "Commercial-grade lockset and door closer installed on a modern NYC office door",
    secondary: "Assortment of heavy-duty hinges and locksets for door hardware upgrade",
  },
  {
    slug: "structural-door-repair-vs-replacement",
    hero: "Technician repairing a damaged door jamb and strike plate in a NYC building",
    secondary: "Realigned door frame with fresh hardware and smooth door swing",
  },
];

const GALLERY_IMAGES = [
  {
    file: "door-gallery--brooklyn-entry.png",
    prompt: "Premium entry door installation on a Brooklyn townhouse with brass hardware and clean casing",
  },
  {
    file: "door-gallery--commercial-corridor.png",
    prompt: "Commercial hollow metal doors installed in a bright NYC office corridor",
  },
  {
    file: "door-gallery--custom-wood-door.png",
    prompt: "Custom solid wood panel door with rich stain finish in a NYC residential entry",
  },
  {
    file: "door-gallery--storefront-glass.png",
    prompt: "Aluminum storefront glass entrance doors on a NYC ground-floor retail space",
  },
  {
    file: "door-gallery--fire-rated-hallway.png",
    prompt: "Fire-rated apartment corridor doors with closers in a NYC multifamily building",
  },
  {
    file: "door-gallery--interior-slabs.png",
    prompt: "Professional installation of white solid-core interior doors in a renovated NYC apartment",
  },
  {
    file: "door-gallery--hardware-detail.png",
    prompt: "Close detail of premium door hardware including lockset, hinges, and closer on installed door",
  },
  {
    file: "door-gallery--jamb-repair.png",
    prompt: "Door frame jamb repair in progress on a pre-war NYC masonry opening",
  },
  {
    file: "door-gallery--security-entry.png",
    prompt: "Reinforced security entry door with multi-point lock on a NYC building lobby",
  },
  {
    file: "door-gallery--warehouse-supply.png",
    prompt: "Organized door supply warehouse with stacked door slabs and hardware racks, professional lighting",
  },
  {
    file: "door-gallery--double-entry.png",
    prompt: "Double entry door installation on a Brooklyn commercial building with ADA hardware",
  },
  {
    file: "door-gallery--apartment-interior.png",
    prompt: "Interior door replacement in a NYC apartment hallway with multiple new pre-hung doors",
  },
  {
    file: "door-gallery--emergency-repair.png",
    prompt: "Emergency door repair technician securing a damaged storefront door in NYC after hours",
  },
  {
    file: "door-gallery--historic-restoration.png",
    prompt: "Historic door profile restoration on a Brooklyn brownstone with matching original casing",
  },
];

const QUOTE_IMAGES = [
  ...SERVICE_HEROES.map(({ slug, prompt }) => ({
    file: `${slug}.png`,
    prompt: `Square website selection image, ${prompt}`,
  })),
  {
    file: "property-home.png",
    prompt: "Square view of a premium residential entry door installation on a Brooklyn home",
  },
  {
    file: "property-business.png",
    prompt: "Square view of commercial door installation in a NYC office or retail space",
  },
  {
    file: "property-multifamily.png",
    prompt: "Square view of fire-rated corridor door replacement in a NYC apartment building",
  },
  {
    file: "property-other.png",
    prompt: "Square view of custom door fabrication and installation in a unique NYC opening",
  },
];

const BRAND_IMAGES = [
  {
    path: "public/logo.png",
    logo: true,
    aspectRatio: "1:1",
    prompt:
      "Professional navy and warm gold vector logo for Hillman Door Supply, centered stylized door panel with subtle HD monogram, premium geometric mark for NYC door company, strong contrast, plain background, no extra words, no watermark",
  },
  {
    path: "public/photos/branding-generated--hero-hillman-door-nyc.png",
    aspectRatio: "16:9",
    prompt:
      "Wide cinematic website hero of a professional door installer fitting a premium entry door in a Brooklyn brownstone, organized job site, open composition for page overlay",
  },
  {
    path: "public/photos/branding-generated--nyc-service-map.png",
    aspectRatio: "16:9",
    prompt:
      "Photorealistic tabletop service-area map visual showing Brooklyn Manhattan and Queens through unlabeled navy and gold location markers, door hardware samples nearby",
  },
  {
    path: "public/about/about-hero.png",
    aspectRatio: "16:9",
    prompt:
      "Wide editorial portrait of professional door installation team at work inside a bright Brooklyn property with door slabs and tools",
  },
  {
    path: "public/about/about-workshop.png",
    aspectRatio: "16:9",
    prompt:
      "Professional door supply workshop with organized door slabs, hardware racks, and installation tools in a clean Brooklyn warehouse",
  },
];

function absolutePath(relativePath) {
  return join(ROOT, ...relativePath.split("/"));
}

function writeBuffer(outPath, buffer) {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, buffer);
  console.log("Wrote", outPath.replace(ROOT, ""));
}

function doorPrompt(prompt) {
  return `${prompt}. Brand context: ${BUSINESS_NAME}, headquartered at 281 Flatbush Ave Brooklyn NY, serving NYC. ${PHOTO_STYLE}. ${NO_TEXT}.`;
}

async function generateAsset(key, imageModel, job, force) {
  const outPath = absolutePath(job.path);
  if (existsSync(outPath) && !force) {
    console.log("Skip existing", job.path);
    return false;
  }

  const prompt = job.logo ? job.prompt : doorPrompt(job.prompt);
  const buffer = await generateImage(key, prompt, {
    model: imageModel,
    aspect_ratio: job.aspectRatio ?? "16:9",
    resolution: job.resolution ?? "1K",
    quality: job.quality ?? "high",
  });
  writeBuffer(outPath, buffer);
  return true;
}

async function runAssetJobs(key, imageModel, jobs, force) {
  for (const job of jobs) {
    try {
      const generated = await generateAsset(key, imageModel, job, force);
      if (generated) await sleep(1400);
    } catch (error) {
      console.error(`Failed ${job.path}:`, error instanceof Error ? error.message : error);
    }
  }
}

async function generateBlogImages(key, imageModel, force) {
  const jobs = BLOG_IMAGES.flatMap(({ slug, hero, secondary }) => [
    { path: `public/blog/${slug}-hero.png`, prompt: hero, aspectRatio: "16:9" },
    { path: `public/blog/${slug}-secondary.png`, prompt: secondary, aspectRatio: "16:9" },
  ]);
  await runAssetJobs(key, imageModel, jobs, force);
}

async function generateGalleryImages(key, imageModel, force) {
  const jobs = GALLERY_IMAGES.map(({ file, prompt }) => ({
    path: `public/photos/${file}`,
    prompt,
    aspectRatio: "16:9",
  }));
  await runAssetJobs(key, imageModel, jobs, force);
}

async function generateQuoteImages(key, imageModel, force) {
  const jobs = QUOTE_IMAGES.map(({ file, prompt }) => ({
    path: `public/photos/quote/${file}`,
    prompt,
    aspectRatio: "1:1",
  }));
  await runAssetJobs(key, imageModel, jobs, force);
}

async function refreshLogoCopies(force) {
  const logoPath = absolutePath("public/logo.png");
  if (!existsSync(logoPath)) return;

  const logo = readFileSync(logoPath);
  let sharp;
  try {
    ({ default: sharp } = await import("sharp"));
  } catch {
    console.warn("Image resizer unavailable; logo copies will retain source dimensions");
  }

  for (const size of [256, 512]) {
    const file = `logo-${size}.png`;
    const outPath = absolutePath(`public/${file}`);
    if (existsSync(outPath) && !force) continue;
    if (sharp) {
      await sharp(logoPath).resize(size, size, { fit: "contain" }).png().toFile(outPath);
      console.log("Wrote", outPath.replace(ROOT, ""));
    } else {
      writeBuffer(outPath, logo);
    }
  }
}

async function generateBrandImages(key, imageModel, force) {
  await runAssetJobs(key, imageModel, BRAND_IMAGES, force);
  await refreshLogoCopies(force);

  const serviceJobs = SERVICE_HEROES.map(({ slug, prompt }) => ({
    path: `public/photos/service-hero-${slug}.png`,
    prompt: `Wide service-page hero, ${prompt}`,
    aspectRatio: "16:9",
  }));
  await runAssetJobs(key, imageModel, serviceJobs, force);
}

async function generateTestImage(key, imageModel, force) {
  await runAssetJobs(
    key,
    imageModel,
    [
      {
        path: "public/photos/openrouter-test.png",
        prompt: "Close professional detail of premium door hardware being installed on a solid wood door",
        aspectRatio: "1:1",
      },
    ],
    force
  );
}

function readJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, "utf8"));
}

function stringList(value, maxItems = Number.MAX_SAFE_INTEGER) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => typeof item === "string" && item.trim())
    .map((item) => item.trim())
    .slice(0, maxItems);
}

function normalizeAreaInsight(area, candidate, previous) {
  const priorLandmarks = stringList(previous?.landmarks);
  const generatedLandmarks = stringList(candidate?.landmarks, 3);
  const tagline = typeof candidate?.tagline === "string" ? candidate.tagline.trim() : "";
  let neighborhoodNotes =
    typeof candidate?.neighborhood_notes === "string" ? candidate.neighborhood_notes.trim() : "";

  const exactName = area.name;
  const combined = `${tagline} ${neighborhoodNotes}`.toLocaleLowerCase();
  if (exactName && !combined.includes(exactName.toLocaleLowerCase())) {
    neighborhoodNotes = `${exactName} door projects benefit from measurement suited to the property's age, frame condition, and code requirements. ${neighborhoodNotes}`.trim();
  }

  return {
    tagline,
    landmarks: priorLandmarks.length ? priorLandmarks : generatedLandmarks,
    common_calls: stringList(candidate?.common_calls, 3),
    neighborhood_notes: neighborhoodNotes,
    keywords: stringList(candidate?.keywords, 7).map((keyword) => keyword.toLocaleLowerCase()),
  };
}

async function refreshAreaInsights(key, chatModel, force) {
  const areasPath = absolutePath("content/service-areas.json");
  const outputPath = absolutePath("content/area-insights.json");
  const areas = readJson(areasPath, []);
  const previous = readJson(outputPath, {});
  const output = force ? {} : { ...previous };

  if (!Array.isArray(areas) || !areas.length) {
    throw new Error("No service areas found");
  }

  if (force) {
    writeFileSync(outputPath, "{}\n");
    console.log("Started area insights from a clean output");
  }

  const system = `Write original local SEO data for ${BUSINESS_NAME}, a door supply, installation, and repair business headquartered at 281 Flatbush Ave Brooklyn NY serving Brooklyn, Manhattan, and Queens. Return only a JSON object keyed by the supplied slug. Each value must contain: tagline (14 words maximum), landmarks (exactly the supplied landmarks in the same order; only generate three accurate landmarks when none are supplied), common_calls (three concise door service requests), neighborhood_notes (two or three useful sentences about local building types, door conditions, hardware, or code requirements), and keywords (six or seven lowercase local door search phrases). Keep every supplied place name exact. Do not claim ratings, awards, or licensing. Discuss doors only.`;
  const batchSize = 8;

  for (let index = 0; index < areas.length; index += batchSize) {
    const batch = areas.slice(index, index + batchSize);
    const request = batch.map((area) => ({
      slug: area.slug,
      name: area.name,
      city: area.city,
      kind: area.kind,
      landmarks: stringList(previous[area.slug]?.landmarks),
    }));

    try {
      console.log(`Area batch ${Math.floor(index / batchSize) + 1}`);
      const generated = await chatJson(
        key,
        chatModel,
        system,
        `Create door service insights for this exact JSON input:\n${JSON.stringify(request, null, 2)}`,
        0.55
      );

      for (const area of batch) {
        const candidate = generated?.[area.slug];
        if (!candidate || typeof candidate !== "object") {
          console.error(`Missing generated insight for ${area.slug}`);
          continue;
        }
        output[area.slug] = normalizeAreaInsight(area, candidate, previous[area.slug]);
      }

      writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
      await sleep(800);
    } catch (error) {
      console.error(
        `Failed area batch ${Math.floor(index / batchSize) + 1}:`,
        error instanceof Error ? error.message : error
      );
    }
  }

  console.log(`Area insights: ${Object.keys(output).length}/${areas.length}`);
}

function printUsage() {
  console.log(
    "Pass --test, --images-blog, --images-gallery, --images-brand, --images-quote, --areas, or --all. Add --force to replace existing output."
  );
}

async function main() {
  const args = process.argv.slice(2);
  const validFlags = new Set([
    "--test",
    "--images-blog",
    "--images-gallery",
    "--images-brand",
    "--images-quote",
    "--areas",
    "--all",
    "--force",
  ]);
  const unknownFlags = args.filter((arg) => !validFlags.has(arg));
  if (unknownFlags.length) {
    throw new Error(`Unknown flag${unknownFlags.length > 1 ? "s" : ""}: ${unknownFlags.join(", ")}`);
  }

  const hasMode = args.some((arg) => arg !== "--force");
  if (!hasMode) {
    printUsage();
    return;
  }

  loadEnvLocal();
  const key = getOpenRouterKey();
  if (!key) {
    throw new Error("Set OPENROUTER_API_KEY in .env.local");
  }

  const force = args.includes("--force");
  const all = args.includes("--all");
  const chatModel = process.env.OPENROUTER_CHAT_MODEL || "google/gemini-2.5-flash";
  const imageModel =
    process.env.OPENROUTER_IMAGE_MODEL || "google/gemini-2.5-flash-image-preview";
  let productionImagesChanged = false;

  if (args.includes("--test")) {
    await generateTestImage(key, imageModel, force);
  }
  if (all || args.includes("--images-blog")) {
    await generateBlogImages(key, imageModel, force);
    productionImagesChanged = true;
  }
  if (all || args.includes("--images-gallery")) {
    await generateGalleryImages(key, imageModel, force);
    productionImagesChanged = true;
  }
  if (all || args.includes("--images-brand")) {
    await generateBrandImages(key, imageModel, force);
    productionImagesChanged = true;
  }
  if (all || args.includes("--images-quote")) {
    await generateQuoteImages(key, imageModel, force);
    productionImagesChanged = true;
  }
  if (all || args.includes("--areas")) {
    await refreshAreaInsights(key, chatModel, force);
  }

  if (productionImagesChanged) {
    console.log("Rebuilding door photo catalog");
    execFileSync(process.execPath, [absolutePath("scripts/rebuild-photos-gallery.mjs")], {
      cwd: ROOT,
      stdio: "inherit",
    });
    execFileSync(process.execPath, [absolutePath("scripts/finalize-door-assets.mjs")], {
      cwd: ROOT,
      stdio: "inherit",
    });
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
