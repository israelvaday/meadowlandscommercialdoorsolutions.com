/**
 * Generate Meadowlands Commercial Door Solutions copy, area insights, and photos.
 *
 * Usage:
 *   node scripts/openrouter-generate-site.mjs --copy [--force]
 *   node scripts/openrouter-generate-site.mjs --areas [--force]
 *   node scripts/openrouter-generate-site.mjs --images-blog [--force]
 *   node scripts/openrouter-generate-site.mjs --images-gallery [--force]
 *   node scripts/openrouter-generate-site.mjs --images-brand [--force]
 *   node scripts/openrouter-generate-site.mjs --images-quote [--force]
 *   node scripts/openrouter-generate-site.mjs --test [--force]
 *   node scripts/openrouter-generate-site.mjs --all [--force]
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, extname } from "node:path";
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
const BUSINESS_NAME = "Meadowlands Commercial Door Solutions";
const HQ = "333 Washington St, Jersey City, NJ 07302";
const REGION = "Jersey City, Hudson County, the Meadowlands, and the NYC waterfront";
const PHOTO_STYLE =
  "Photorealistic commercial-industrial photography, Jersey City and North Jersey warehouse or storefront setting, authentic steel, concrete, and aluminum, cool daylight, no people faces in sharp close-up, editorial composition";
const NO_TEXT =
  "No visible words, letters, labels, signs, logos, watermarks, captions, UI, or artificial CGI styling";

const SERVICE_HEROES = [
  {
    slug: "commercial-overhead-doors",
    prompt:
      "Commercial insulated sectional overhead door installed in a modern Jersey City warehouse bay, clean tracks and operator, daylight through high windows",
  },
  {
    slug: "rolling-steel-doors",
    prompt:
      "Heavy-duty rolling steel door partially open on a North Jersey industrial loading opening, galvanized slats and steel guides",
  },
  {
    slug: "loading-dock-equipment",
    prompt:
      "Commercial loading dock with dock door, trailer seal, and concrete well at a Meadowlands warehouse, professional industrial lighting",
  },
  {
    slug: "high-speed-doors",
    prompt:
      "High-speed fabric door installed in a logistics corridor, motion-blur suggestion of fast cycle, clean industrial interior",
  },
  {
    slug: "fire-rated-doors",
    prompt:
      "Labeled fire-rated hollow metal corridor doors with closers in a Jersey City mixed-use commercial building hallway",
  },
  {
    slug: "hollow-metal-doors",
    prompt:
      "Commercial hollow metal door and painted steel frame in a modern office-industrial corridor, vision lite and closer",
  },
  {
    slug: "automatic-operators",
    prompt:
      "Close professional detail of a commercial jackshaft door operator mounted above a warehouse overhead door",
  },
  {
    slug: "storefront-entrances",
    prompt:
      "Aluminum and glass commercial storefront entrance on a downtown Jersey City street, polished hardware and floor closer",
  },
  {
    slug: "security-grilles",
    prompt:
      "Open rolling security grille on a commercial retail opening, steel lattice and side guides, urban storefront interior",
  },
  {
    slug: "emergency-commercial-repair",
    prompt:
      "Commercial door technician tools beside a damaged warehouse overhead door off its track, organized emergency repair scene",
  },
];

const BLOG_IMAGES = [
  {
    slug: "commercial-overhead-doors-jersey-city-warehouses",
    hero: "Wide view of insulated commercial overhead doors on a Jersey City warehouse facade at golden hour",
    secondary: "Technician inspecting overhead door tracks and torsion springs in a warehouse bay",
  },
  {
    slug: "rolling-steel-vs-sectional-meadowlands",
    hero: "Side-by-side industrial scene of a rolling steel door and a sectional overhead door in a Meadowlands warehouse",
    secondary: "Close detail of rolling steel slats and a sectional door panel joint",
  },
  {
    slug: "fire-rated-doors-hudson-county",
    hero: "Fire-rated corridor doors with closers in a Hudson County mixed-use commercial building",
    secondary: "Close view of a fire door closer and labeled frame assembly",
  },
  {
    slug: "high-speed-doors-logistics",
    hero: "High-speed interior door in a Meadowlands logistics facility with pallet racking beyond",
    secondary: "Safety sensors and control box beside a high-performance industrial door",
  },
  {
    slug: "storefront-repair-downtown-jersey-city",
    hero: "Aluminum glass storefront entrance on a downtown Jersey City sidewalk",
    secondary: "Technician adjusting a commercial floor closer on a glass entrance door",
  },
  {
    slug: "commercial-door-operator-maintenance",
    hero: "Commercial door operator motor and chain on a warehouse rolling door",
    secondary: "Preventive maintenance tools arranged beside an industrial door operator",
  },
];

const GALLERY_IMAGES = [
  { file: "door-gallery--overhead-warehouse.webp", prompt: "Insulated commercial overhead sectional doors across a Jersey City warehouse dock face" },
  { file: "door-gallery--rolling-steel.webp", prompt: "Rolling steel door fully installed on a North Jersey industrial opening" },
  { file: "door-gallery--loading-dock.webp", prompt: "Loading dock door with trailer seal and bumper at a Meadowlands warehouse" },
  { file: "door-gallery--high-speed.webp", prompt: "High-speed fabric door in a clean logistics corridor" },
  { file: "door-gallery--fire-rated.webp", prompt: "Fire-rated commercial corridor doors in a Jersey City office building" },
  { file: "door-gallery--hollow-metal.webp", prompt: "Hollow metal door with vision lite in a commercial plant corridor" },
  { file: "door-gallery--operator.webp", prompt: "Commercial jackshaft operator mounted above an overhead warehouse door" },
  { file: "door-gallery--storefront-jc.webp", prompt: "Aluminum storefront glass entrance on a downtown Jersey City retail space" },
  { file: "door-gallery--security-grille.webp", prompt: "Rolling security grille protecting a commercial storefront opening" },
  { file: "door-gallery--emergency.webp", prompt: "Emergency commercial door repair on a damaged warehouse overhead door" },
  { file: "door-gallery--port-warehouse.webp", prompt: "Row of dock doors at a Port Newark-area warehouse at dusk" },
  { file: "door-gallery--meadowlands-logistics.webp", prompt: "Meadowlands logistics warehouse with commercial overhead doors and truck court" },
  { file: "door-gallery--jc-lobby.webp", prompt: "Modern Jersey City commercial lobby with aluminum entrance doors" },
  { file: "door-gallery--dock-interior.webp", prompt: "Interior view of a commercial dock door from inside a warehouse" },
];

const QUOTE_IMAGES = [
  ...SERVICE_HEROES.map(({ slug, prompt }) => ({
    file: `${slug}.webp`,
    prompt: `Square website selection image, ${prompt}`,
  })),
  { file: "property-warehouse.webp", prompt: "Square view of a North Jersey warehouse with commercial overhead dock doors" },
  { file: "property-retail.webp", prompt: "Square view of a Jersey City retail storefront aluminum entrance" },
  { file: "property-office.webp", prompt: "Square view of a commercial office corridor with hollow metal doors" },
  { file: "property-other.webp", prompt: "Square view of an industrial plant door and rolling steel opening" },
];

const BRAND_IMAGES = [
  {
    path: "public/logo.png",
    logo: true,
    aspectRatio: "1:1",
    keepPng: true,
    prompt:
      "Professional vector logo mark for Meadowlands Commercial Door Solutions, geometric rolling door and steel frame monogram MCDS, electric cyan #22D3EE on deep void black #030508, premium industrial-tech emblem, no extra words, no watermark, square",
  },
  {
    path: "public/photos/branding-generated--hero-meadowlands.webp",
    aspectRatio: "16:9",
    prompt:
      "Wide cinematic website hero of a commercial overhead door installation at a modern Jersey City warehouse, organized job site, open composition for typography overlay",
  },
  {
    path: "public/photos/branding-generated--service-map.webp",
    aspectRatio: "16:9",
    prompt:
      "Photorealistic tabletop map of Jersey City, Hudson County, and the Meadowlands with unlabeled cyan location markers and commercial door hardware samples nearby",
  },
  {
    path: "public/about/about-hero.webp",
    aspectRatio: "16:9",
    prompt:
      "Wide editorial photo of a commercial door crew working at a Jersey City warehouse dock, tools and door sections visible, no readable logos",
  },
  {
    path: "public/about/about-workshop.webp",
    aspectRatio: "16:9",
    prompt:
      "Industrial commercial door shop with rolling steel slats, operators, and hardware racks in a clean North Jersey warehouse",
  },
];

function absolutePath(relativePath) {
  return join(ROOT, ...relativePath.split("/"));
}

function writeBuffer(outPath, buffer) {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, buffer);
  console.log("Wrote", outPath.replace(ROOT, "").replaceAll("\\", "/"));
}

function doorPrompt(prompt) {
  return `${prompt}. Brand context: ${BUSINESS_NAME}, headquartered at ${HQ}, serving ${REGION}. ${PHOTO_STYLE}. ${NO_TEXT}.`;
}

async function toWebp(inputPath, outputPath) {
  const { default: sharp } = await import("sharp");
  await sharp(inputPath)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(outputPath);
}

async function generateAsset(key, imageModel, job, force) {
  const outPath = absolutePath(job.path);
  if (existsSync(outPath) && !force) {
    console.log("Skip existing", job.path);
    return false;
  }

  const prompt = job.logo ? job.prompt : doorPrompt(job.prompt);
  const wantsWebp = extname(job.path).toLowerCase() === ".webp";
  const buffer = await generateImage(key, prompt, {
    model: imageModel,
    aspect_ratio: job.aspectRatio ?? "16:9",
    resolution: job.resolution ?? "1K",
    quality: job.quality ?? "high",
    output_format: job.keepPng || !wantsWebp ? "png" : "png",
  });

  if (job.keepPng || !wantsWebp) {
    writeBuffer(outPath, buffer);
    return true;
  }

  const tmpPng = `${outPath}.tmp.png`;
  writeBuffer(tmpPng, buffer);
  try {
    await toWebp(tmpPng, outPath);
    const { rmSync } = await import("node:fs");
    rmSync(tmpPng, { force: true });
    console.log("Converted", job.path);
  } catch (error) {
    const { renameSync } = await import("node:fs");
    renameSync(tmpPng, outPath.replace(/\.webp$/i, ".png"));
    console.warn("WebP convert failed, kept PNG:", error instanceof Error ? error.message : error);
  }
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
    { path: `public/blog/${slug}-hero.webp`, prompt: hero, aspectRatio: "16:9" },
    { path: `public/blog/${slug}-secondary.webp`, prompt: secondary, aspectRatio: "16:9" },
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
  let sharp;
  try {
    ({ default: sharp } = await import("sharp"));
  } catch {
    console.warn("Image resizer unavailable; logo copies skipped");
    return;
  }
  for (const size of [256, 512]) {
    const file = `logo-${size}.png`;
    const outPath = absolutePath(`public/${file}`);
    if (existsSync(outPath) && !force) continue;
    await sharp(logoPath).resize(size, size, { fit: "contain" }).png().toFile(outPath);
    console.log("Wrote", outPath.replace(ROOT, "").replaceAll("\\", "/"));
  }
}

async function generateBrandImages(key, imageModel, force) {
  await runAssetJobs(key, imageModel, BRAND_IMAGES, force);
  await refreshLogoCopies(force);
  const serviceJobs = SERVICE_HEROES.map(({ slug, prompt }) => ({
    path: `public/photos/service-hero-${slug}.webp`,
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
        path: "public/photos/openrouter-test.webp",
        prompt: "Close professional detail of a commercial overhead door operator and torsion spring",
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
    neighborhoodNotes = `${exactName} commercial door work is scoped around opening size, cycle count, and security. ${neighborhoodNotes}`.trim();
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

  const system = `Write original local SEO data for ${BUSINESS_NAME}, a commercial door contractor headquartered at ${HQ} serving ${REGION}. The trade is commercial: overhead sectional doors, rolling steel, loading docks, high-speed doors, fire-rated assemblies, hollow metal, operators, storefronts, security grilles, and emergency commercial repair. Do not write residential brownstone or interior closet-door copy. Return only a JSON object keyed by the supplied slug. Each value must contain: tagline (14 words maximum), landmarks (exactly the supplied landmarks in the same order; only generate three accurate landmarks when none are supplied), common_calls (three concise commercial door service requests), neighborhood_notes (two or three useful sentences about local building types, docks, wind, security, or code), and keywords (six or seven lowercase local commercial door search phrases). Keep every supplied place name exact. Do not claim ratings, awards, licensing, or 24/7 service.`;
  const batchSize = 8;

  for (let index = 0; index < areas.length; index += batchSize) {
    const batch = areas.slice(index, index + batchSize);
    const pending = batch.filter((area) => force || !output[area.slug]?.neighborhood_notes);
    if (!pending.length) {
      console.log(`Area batch ${Math.floor(index / batchSize) + 1} already complete`);
      continue;
    }

    const request = pending.map((area) => ({
      slug: area.slug,
      name: area.name,
      city: area.city,
      kind: area.kind,
      parent: area.parent,
      landmarks: stringList(previous[area.slug]?.landmarks),
    }));

    try {
      console.log(`Area batch ${Math.floor(index / batchSize) + 1}`);
      const generated = await chatJson(
        key,
        chatModel,
        system,
        `Create unique commercial door service insights for this exact JSON input:\n${JSON.stringify(request, null, 2)}`,
        0.7
      );

      for (const area of pending) {
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

async function generateSiteCopy(key, chatModel, force) {
  const servicesPath = absolutePath("content/services-copy.json");
  const blogPath = absolutePath("content/blog.json");
  const faqPath = absolutePath("content/faq.json");
  const siteCopyPath = absolutePath("content/site-copy.json");

  if (!force && existsSync(blogPath) && readJson(blogPath, []).length >= 6) {
    console.log("Copy already present; pass --force to regenerate");
    return;
  }

  const services = [
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

  console.log("Generating service copy");
  const serviceCopy = await chatJson(
    key,
    chatModel,
    `You write original commercial-door SEO copy for ${BUSINESS_NAME} at ${HQ}. Trade focus: commercial overhead, rolling steel, docks, high-speed, fire-rated, hollow metal, operators, storefronts, security grilles, emergency repair. Serving ${REGION}. Return JSON object keyed by slug. Each value: name, shortName, tagline (max 22 words), description (90-130 words, unique, keyword-rich, no claims of awards or 24/7), bullets (5 short strings), keywords (5 lowercase phrases). Mention Jersey City or Meadowlands or Hudson County naturally. No brownstone residential copy.`,
    `Slugs: ${JSON.stringify(services)}`,
    0.75
  );
  writeFileSync(servicesPath, `${JSON.stringify(serviceCopy, null, 2)}\n`);
  console.log("Wrote services-copy.json");

  console.log("Generating blog posts");
  const blog = await chatJson(
    key,
    chatModel,
    `Write original commercial door articles for ${BUSINESS_NAME} at ${HQ}. Return JSON { "posts": [ ... ] } with exactly 6 posts. Each post: slug (use these exact slugs), title, metaTitle, excerpt, category (one of Commercial, Hardware, Repair, Planning), readMinutes (number 6-9), date (2026-02-01 through 2026-03-12), heroImage, heroAlt, secondaryImage, secondaryAlt, body (markdown with 4-6 ## headings, 600-900 words, keyword-rich, unique, no awards, no 24/7 claims, mention ${HQ} once at the end with a quote CTA). Image paths must be /blog/{slug}-hero.webp and /blog/{slug}-secondary.webp.`,
    `Slugs and topics:\n${BLOG_IMAGES.map((b) => b.slug).join("\n")}`,
    0.8
  );
  const posts = Array.isArray(blog.posts) ? blog.posts : Array.isArray(blog) ? blog : [];
  writeFileSync(blogPath, `${JSON.stringify(posts, null, 2)}\n`);
  console.log(`Wrote blog.json (${posts.length} posts)`);

  console.log("Generating FAQ");
  const faq = await chatJson(
    key,
    chatModel,
    `Write commercial door FAQs for ${BUSINESS_NAME} at ${HQ} serving ${REGION}. Return JSON { "heroAlt": string, "sections": [ { "id", "title", "emoji", "description", "items": [ { "q", "a" } ] } ] } with 4 sections (pricing, process, commercial, service-area) and 4 items each. Unique, keyword-rich, no awards, no 24/7. heroAlt describes a Jersey City warehouse overhead door photo.`,
    "Create the FAQ object now.",
    0.7
  );
  writeFileSync(faqPath, `${JSON.stringify(faq, null, 2)}\n`);
  console.log("Wrote faq.json");

  console.log("Generating site copy");
  const siteCopy = await chatJson(
    key,
    chatModel,
    `Write homepage/about/contact/glossary/buyers-guide copy for ${BUSINESS_NAME} at ${HQ}. Return JSON with keys: heroEyebrow, heroTitleHtml (may include a <span class="text-brass-gradient"> phrase), heroBody, heroChips (6 short service chips), aboutLead, contactLead, glossaryTitle, glossaryIntro, glossary (array of {term, definition} length 8, commercial door terms), buyersTitle, buyersIntro, buyers (array of 6 {title, body}). Unique, keyword-rich, commercial-only, no awards.`,
    "Create the site-copy object now.",
    0.7
  );
  writeFileSync(siteCopyPath, `${JSON.stringify(siteCopy, null, 2)}\n`);
  console.log("Wrote site-copy.json");
}

function printUsage() {
  console.log(
    "Pass --copy, --areas, --test, --images-blog, --images-gallery, --images-brand, --images-quote, or --all. Add --force to replace existing output."
  );
}

async function main() {
  const args = process.argv.slice(2);
  const validFlags = new Set([
    "--test",
    "--copy",
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
    process.env.OPENROUTER_IMAGE_MODEL || "google/gemini-3-pro-image-preview";
  let productionImagesChanged = false;

  if (all || args.includes("--copy")) {
    await generateSiteCopy(key, chatModel, force);
  }
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
    console.log("Rebuilding commercial door photo catalog");
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
