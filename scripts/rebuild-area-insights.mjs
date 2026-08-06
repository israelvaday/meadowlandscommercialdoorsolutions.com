/**
 * Rebuild local door-service copy for NYC service areas.
 * Offline fallback when OpenRouter copy refresh is unavailable.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const areas = JSON.parse(
  readFileSync(join(ROOT, "content/service-areas.json"), "utf8")
);

const taglines = [
  "Commercial and residential door supply, installation, and structural repair.",
  "Custom door fitting, hardware supply, and frame repair for NYC properties.",
  "Premium door installation with code-aware hardware and clean finishes.",
  "Door supply, emergency repair, and jamb restoration across Brooklyn and NYC.",
];

const callSets = [
  ["entry door replacement", "commercial storefront repair", "fire-rated door upgrade"],
  ["interior door installation", "door hardware upgrade", "sagging door structural repair"],
  ["custom door fabrication", "jamb and frame rebuild", "emergency lock repair"],
  ["multifamily corridor doors", "security entry upgrade", "storefront glass door service"],
];

const propertyNotes = [
  "Properties here range from pre-war masonry buildings to new glass storefronts, so door work must account for settled frames, irregular openings, and NYC code requirements. Hardware weight, fire labels, and ADA clearances are evaluated before installation.",
  "Local door projects often involve aging jambs, misaligned strikes, and hardware that has outlasted its cycle. A site measurement and structural assessment prevent repeat binding after a new slab is hung.",
  "Buildings in this area commonly mix residential units, ground-floor retail, and office suites — each with different door ratings, closers, and security needs. We specify assemblies matched to the opening, not one-size-fits-all slabs.",
  "NYC door work here frequently includes fire-rated corridor replacements, storefront entrance repairs, and custom-fit interior doors for renovated layouts. Frame condition and wall substrate determine whether repair or replacement is the durable path.",
];

function hash(value) {
  return Array.from(value).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function lowerPlace(value) {
  return value.toLocaleLowerCase("en-US");
}

const output = Object.fromEntries(
  areas.map((area) => {
    const index = hash(area.slug) % taglines.length;
    const place = area.name;
    const city =
      area.kind === "city" || !area.city || area.city === place
        ? place
        : `${place} in ${area.city}`;

    return [
      area.slug,
      {
        tagline: `${place}: ${taglines[index]}`,
        landmarks: [],
        common_calls: callSets[index],
        neighborhood_notes: `${city} is within Hillman Door Supply and Door Repair's regular NYC service area from our Brooklyn headquarters at 281 Flatbush Ave. ${propertyNotes[index]}`,
        keywords: [
          `${lowerPlace(place)} door repair`,
          `door installation ${lowerPlace(place)}`,
          `door supply ${lowerPlace(place)} ny`,
          `commercial doors ${lowerPlace(place)}`,
          `door contractor ${lowerPlace(place)} brooklyn`,
          `emergency door repair ${lowerPlace(place)}`,
        ],
      },
    ];
  })
);

writeFileSync(
  join(ROOT, "content/area-insights.json"),
  `${JSON.stringify(output, null, 2)}\n`
);
console.log(`Rebuilt ${Object.keys(output).length} area insights`);
