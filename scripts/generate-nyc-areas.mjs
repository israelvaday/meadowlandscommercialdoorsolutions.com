/**
 * Generate 100 NYC service areas radiating from Hillman HQ (11217).
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const AREAS = [
  // Brooklyn — 45 neighborhoods
  { slug: "boerum-hill", name: "Boerum Hill", city: "Brooklyn", kind: "neighborhood", lat: 40.6869, lng: -73.9847, parent: "brooklyn", main: true },
  { slug: "fort-greene", name: "Fort Greene", city: "Brooklyn", kind: "neighborhood", lat: 40.6892, lng: -73.9748, parent: "brooklyn", main: true },
  { slug: "downtown-brooklyn", name: "Downtown Brooklyn", city: "Brooklyn", kind: "neighborhood", lat: 40.6933, lng: -73.9857, parent: "brooklyn", main: true },
  { slug: "brooklyn-heights", name: "Brooklyn Heights", city: "Brooklyn", kind: "neighborhood", lat: 40.696, lng: -73.9939, parent: "brooklyn", main: false },
  { slug: "dumbo", name: "DUMBO", city: "Brooklyn", kind: "neighborhood", lat: 40.7033, lng: -73.9896, parent: "brooklyn", main: false },
  { slug: "cobble-hill", name: "Cobble Hill", city: "Brooklyn", kind: "neighborhood", lat: 40.6865, lng: -73.9962, parent: "brooklyn", main: false },
  { slug: "carroll-gardens", name: "Carroll Gardens", city: "Brooklyn", kind: "neighborhood", lat: 40.6785, lng: -73.9982, parent: "brooklyn", main: false },
  { slug: "gowanus", name: "Gowanus", city: "Brooklyn", kind: "neighborhood", lat: 40.6733, lng: -73.9903, parent: "brooklyn", main: false },
  { slug: "park-slope", name: "Park Slope", city: "Brooklyn", kind: "neighborhood", lat: 40.671, lng: -73.9814, parent: "brooklyn", main: true },
  { slug: "prospect-heights", name: "Prospect Heights", city: "Brooklyn", kind: "neighborhood", lat: 40.6779, lng: -73.9687, parent: "brooklyn", main: false },
  { slug: "clinton-hill", name: "Clinton Hill", city: "Brooklyn", kind: "neighborhood", lat: 40.6896, lng: -73.9661, parent: "brooklyn", main: false },
  { slug: "williamsburg", name: "Williamsburg", city: "Brooklyn", kind: "neighborhood", lat: 40.7081, lng: -73.9571, parent: "brooklyn", main: true },
  { slug: "greenpoint", name: "Greenpoint", city: "Brooklyn", kind: "neighborhood", lat: 40.7282, lng: -73.9442, parent: "brooklyn", main: false },
  { slug: "bushwick", name: "Bushwick", city: "Brooklyn", kind: "neighborhood", lat: 40.6944, lng: -73.9213, parent: "brooklyn", main: false },
  { slug: "bedford-stuyvesant", name: "Bedford-Stuyvesant", city: "Brooklyn", kind: "neighborhood", lat: 40.6872, lng: -73.9418, parent: "brooklyn", main: false },
  { slug: "crown-heights", name: "Crown Heights", city: "Brooklyn", kind: "neighborhood", lat: 40.6694, lng: -73.9422, parent: "brooklyn", main: false },
  { slug: "flatbush", name: "Flatbush", city: "Brooklyn", kind: "neighborhood", lat: 40.6526, lng: -73.9597, parent: "brooklyn", main: false },
  { slug: "prospect-lefferts-gardens", name: "Prospect Lefferts Gardens", city: "Brooklyn", kind: "neighborhood", lat: 40.66, lng: -73.9502, parent: "brooklyn", main: false },
  { slug: "ditmas-park", name: "Ditmas Park", city: "Brooklyn", kind: "neighborhood", lat: 40.636, lng: -73.962, parent: "brooklyn", main: false },
  { slug: "kensington", name: "Kensington", city: "Brooklyn", kind: "neighborhood", lat: 40.6375, lng: -73.9768, parent: "brooklyn", main: false },
  { slug: "windsor-terrace", name: "Windsor Terrace", city: "Brooklyn", kind: "neighborhood", lat: 40.655, lng: -73.9758, parent: "brooklyn", main: false },
  { slug: "sunset-park", name: "Sunset Park", city: "Brooklyn", kind: "neighborhood", lat: 40.6455, lng: -73.9943, parent: "brooklyn", main: false },
  { slug: "bay-ridge", name: "Bay Ridge", city: "Brooklyn", kind: "neighborhood", lat: 40.6344, lng: -74.0236, parent: "brooklyn", main: false },
  { slug: "bensonhurst", name: "Bensonhurst", city: "Brooklyn", kind: "neighborhood", lat: 40.6019, lng: -73.9947, parent: "brooklyn", main: false },
  { slug: "borough-park", name: "Borough Park", city: "Brooklyn", kind: "neighborhood", lat: 40.6335, lng: -73.9969, parent: "brooklyn", main: false },
  { slug: "midwood", name: "Midwood", city: "Brooklyn", kind: "neighborhood", lat: 40.6201, lng: -73.9597, parent: "brooklyn", main: false },
  { slug: "sheepshead-bay", name: "Sheepshead Bay", city: "Brooklyn", kind: "neighborhood", lat: 40.5869, lng: -73.9545, parent: "brooklyn", main: false },
  { slug: "brighton-beach", name: "Brighton Beach", city: "Brooklyn", kind: "neighborhood", lat: 40.5779, lng: -73.9597, parent: "brooklyn", main: false },
  { slug: "coney-island", name: "Coney Island", city: "Brooklyn", kind: "neighborhood", lat: 40.5755, lng: -73.9707, parent: "brooklyn", main: false },
  { slug: "gravesend", name: "Gravesend", city: "Brooklyn", kind: "neighborhood", lat: 40.5915, lng: -73.9741, parent: "brooklyn", main: false },
  { slug: "marine-park", name: "Marine Park", city: "Brooklyn", kind: "neighborhood", lat: 40.6115, lng: -73.9336, parent: "brooklyn", main: false },
  { slug: "canarsie", name: "Canarsie", city: "Brooklyn", kind: "neighborhood", lat: 40.6407, lng: -73.9016, parent: "brooklyn", main: false },
  { slug: "east-flatbush", name: "East Flatbush", city: "Brooklyn", kind: "neighborhood", lat: 40.6536, lng: -73.9294, parent: "brooklyn", main: false },
  { slug: "brownsville", name: "Brownsville", city: "Brooklyn", kind: "neighborhood", lat: 40.6657, lng: -73.9127, parent: "brooklyn", main: false },
  { slug: "east-new-york", name: "East New York", city: "Brooklyn", kind: "neighborhood", lat: 40.6664, lng: -73.8824, parent: "brooklyn", main: false },
  { slug: "cypress-hills", name: "Cypress Hills", city: "Brooklyn", kind: "neighborhood", lat: 40.683, lng: -73.872, parent: "brooklyn", main: false },
  { slug: "red-hook", name: "Red Hook", city: "Brooklyn", kind: "neighborhood", lat: 40.6754, lng: -74.0097, parent: "brooklyn", main: false },
  { slug: "vinegar-hill", name: "Vinegar Hill", city: "Brooklyn", kind: "neighborhood", lat: 40.7036, lng: -73.982, parent: "brooklyn", main: false },
  { slug: "navy-yard", name: "Navy Yard", city: "Brooklyn", kind: "neighborhood", lat: 40.6995, lng: -73.9725, parent: "brooklyn", main: false },
  { slug: "south-slope", name: "South Slope", city: "Brooklyn", kind: "neighborhood", lat: 40.662, lng: -73.9865, parent: "brooklyn", main: false },
  { slug: "greenwood-heights", name: "Greenwood Heights", city: "Brooklyn", kind: "neighborhood", lat: 40.6565, lng: -73.994, parent: "brooklyn", main: false },
  { slug: "dyker-heights", name: "Dyker Heights", city: "Brooklyn", kind: "neighborhood", lat: 40.6186, lng: -74.0176, parent: "brooklyn", main: false },
  { slug: "flatlands", name: "Flatlands", city: "Brooklyn", kind: "neighborhood", lat: 40.621, lng: -73.935, parent: "brooklyn", main: false },
  { slug: "mill-basin", name: "Mill Basin", city: "Brooklyn", kind: "neighborhood", lat: 40.6135, lng: -73.911, parent: "brooklyn", main: false },
  { slug: "bergen-beach", name: "Bergen Beach", city: "Brooklyn", kind: "neighborhood", lat: 40.6205, lng: -73.9065, parent: "brooklyn", main: false },
  // Manhattan — 35 neighborhoods
  { slug: "financial-district", name: "Financial District", city: "Manhattan", kind: "neighborhood", lat: 40.7075, lng: -74.0113, parent: "manhattan", main: false },
  { slug: "tribeca", name: "Tribeca", city: "Manhattan", kind: "neighborhood", lat: 40.7163, lng: -74.0086, parent: "manhattan", main: false },
  { slug: "soho", name: "SoHo", city: "Manhattan", kind: "neighborhood", lat: 40.7233, lng: -74.003, parent: "manhattan", main: false },
  { slug: "greenwich-village", name: "Greenwich Village", city: "Manhattan", kind: "neighborhood", lat: 40.7336, lng: -74.0027, parent: "manhattan", main: false },
  { slug: "chelsea", name: "Chelsea", city: "Manhattan", kind: "neighborhood", lat: 40.7465, lng: -74.0014, parent: "manhattan", main: true },
  { slug: "flatiron", name: "Flatiron", city: "Manhattan", kind: "neighborhood", lat: 40.7411, lng: -73.9897, parent: "manhattan", main: false },
  { slug: "murray-hill", name: "Murray Hill", city: "Manhattan", kind: "neighborhood", lat: 40.7479, lng: -73.9757, parent: "manhattan", main: false },
  { slug: "gramercy", name: "Gramercy", city: "Manhattan", kind: "neighborhood", lat: 40.7375, lng: -73.9858, parent: "manhattan", main: false },
  { slug: "east-village", name: "East Village", city: "Manhattan", kind: "neighborhood", lat: 40.7265, lng: -73.9815, parent: "manhattan", main: false },
  { slug: "west-village", name: "West Village", city: "Manhattan", kind: "neighborhood", lat: 40.7358, lng: -74.0033, parent: "manhattan", main: false },
  { slug: "midtown", name: "Midtown", city: "Manhattan", kind: "neighborhood", lat: 40.7549, lng: -73.984, parent: "manhattan", main: false },
  { slug: "midtown-east", name: "Midtown East", city: "Manhattan", kind: "neighborhood", lat: 40.758, lng: -73.971, parent: "manhattan", main: false },
  { slug: "midtown-west", name: "Midtown West", city: "Manhattan", kind: "neighborhood", lat: 40.763, lng: -73.991, parent: "manhattan", main: false },
  { slug: "hells-kitchen", name: "Hell's Kitchen", city: "Manhattan", kind: "neighborhood", lat: 40.7638, lng: -73.9918, parent: "manhattan", main: false },
  { slug: "upper-east-side", name: "Upper East Side", city: "Manhattan", kind: "neighborhood", lat: 40.7736, lng: -73.9566, parent: "manhattan", main: true },
  { slug: "upper-west-side", name: "Upper West Side", city: "Manhattan", kind: "neighborhood", lat: 40.787, lng: -73.9754, parent: "manhattan", main: false },
  { slug: "harlem", name: "Harlem", city: "Manhattan", kind: "neighborhood", lat: 40.8116, lng: -73.9465, parent: "manhattan", main: false },
  { slug: "east-harlem", name: "East Harlem", city: "Manhattan", kind: "neighborhood", lat: 40.7947, lng: -73.9425, parent: "manhattan", main: false },
  { slug: "washington-heights", name: "Washington Heights", city: "Manhattan", kind: "neighborhood", lat: 40.8417, lng: -73.9396, parent: "manhattan", main: false },
  { slug: "inwood", name: "Inwood", city: "Manhattan", kind: "neighborhood", lat: 40.8677, lng: -73.9212, parent: "manhattan", main: false },
  { slug: "morningside-heights", name: "Morningside Heights", city: "Manhattan", kind: "neighborhood", lat: 40.8075, lng: -73.9625, parent: "manhattan", main: false },
  { slug: "battery-park-city", name: "Battery Park City", city: "Manhattan", kind: "neighborhood", lat: 40.7115, lng: -74.0155, parent: "manhattan", main: false },
  { slug: "chinatown", name: "Chinatown", city: "Manhattan", kind: "neighborhood", lat: 40.7158, lng: -73.997, parent: "manhattan", main: false },
  { slug: "little-italy", name: "Little Italy", city: "Manhattan", kind: "neighborhood", lat: 40.7191, lng: -73.9973, parent: "manhattan", main: false },
  { slug: "nolita", name: "NoLita", city: "Manhattan", kind: "neighborhood", lat: 40.723, lng: -73.9955, parent: "manhattan", main: false },
  { slug: "noho", name: "NoHo", city: "Manhattan", kind: "neighborhood", lat: 40.7267, lng: -73.9925, parent: "manhattan", main: false },
  { slug: "kips-bay", name: "Kips Bay", city: "Manhattan", kind: "neighborhood", lat: 40.744, lng: -73.978, parent: "manhattan", main: false },
  { slug: "turtle-bay", name: "Turtle Bay", city: "Manhattan", kind: "neighborhood", lat: 40.752, lng: -73.969, parent: "manhattan", main: false },
  { slug: "yorkville", name: "Yorkville", city: "Manhattan", kind: "neighborhood", lat: 40.776, lng: -73.954, parent: "manhattan", main: false },
  { slug: "lincoln-square", name: "Lincoln Square", city: "Manhattan", kind: "neighborhood", lat: 40.775, lng: -73.982, parent: "manhattan", main: false },
  { slug: "theater-district", name: "Theater District", city: "Manhattan", kind: "neighborhood", lat: 40.759, lng: -73.9845, parent: "manhattan", main: false },
  { slug: "garment-district", name: "Garment District", city: "Manhattan", kind: "neighborhood", lat: 40.754, lng: -73.9895, parent: "manhattan", main: false },
  { slug: "lower-east-side", name: "Lower East Side", city: "Manhattan", kind: "neighborhood", lat: 40.715, lng: -73.9843, parent: "manhattan", main: false },
  { slug: "two-bridges", name: "Two Bridges", city: "Manhattan", kind: "neighborhood", lat: 40.711, lng: -73.993, parent: "manhattan", main: false },
  { slug: "stuyvesant-town", name: "Stuyvesant Town", city: "Manhattan", kind: "neighborhood", lat: 40.731, lng: -73.974, parent: "manhattan", main: false },
  // Queens — 20 neighborhoods
  { slug: "long-island-city", name: "Long Island City", city: "Queens", kind: "neighborhood", lat: 40.7447, lng: -73.9485, parent: "queens", main: true },
  { slug: "astoria", name: "Astoria", city: "Queens", kind: "neighborhood", lat: 40.7644, lng: -73.9235, parent: "queens", main: true },
  { slug: "sunnyside", name: "Sunnyside", city: "Queens", kind: "neighborhood", lat: 40.7433, lng: -73.9196, parent: "queens", main: false },
  { slug: "woodside", name: "Woodside", city: "Queens", kind: "neighborhood", lat: 40.7456, lng: -73.9028, parent: "queens", main: false },
  { slug: "jackson-heights", name: "Jackson Heights", city: "Queens", kind: "neighborhood", lat: 40.7557, lng: -73.8831, parent: "queens", main: false },
  { slug: "elmhurst", name: "Elmhurst", city: "Queens", kind: "neighborhood", lat: 40.7361, lng: -73.8779, parent: "queens", main: false },
  { slug: "corona", name: "Corona", city: "Queens", kind: "neighborhood", lat: 40.747, lng: -73.861, parent: "queens", main: false },
  { slug: "flushing", name: "Flushing", city: "Queens", kind: "neighborhood", lat: 40.7654, lng: -73.8311, parent: "queens", main: true },
  { slug: "forest-hills", name: "Forest Hills", city: "Queens", kind: "neighborhood", lat: 40.7196, lng: -73.8448, parent: "queens", main: false },
  { slug: "rego-park", name: "Rego Park", city: "Queens", kind: "neighborhood", lat: 40.7265, lng: -73.8525, parent: "queens", main: false },
  { slug: "kew-gardens", name: "Kew Gardens", city: "Queens", kind: "neighborhood", lat: 40.7087, lng: -73.8308, parent: "queens", main: false },
  { slug: "jamaica", name: "Jamaica", city: "Queens", kind: "neighborhood", lat: 40.7026, lng: -73.7889, parent: "queens", main: false },
  { slug: "richmond-hill", name: "Richmond Hill", city: "Queens", kind: "neighborhood", lat: 40.699, lng: -73.831, parent: "queens", main: false },
  { slug: "ozone-park", name: "Ozone Park", city: "Queens", kind: "neighborhood", lat: 40.679, lng: -73.843, parent: "queens", main: false },
  { slug: "howard-beach", name: "Howard Beach", city: "Queens", kind: "neighborhood", lat: 40.658, lng: -73.844, parent: "queens", main: false },
  { slug: "ridgewood", name: "Ridgewood", city: "Queens", kind: "neighborhood", lat: 40.7, lng: -73.896, parent: "queens", main: false },
  { slug: "maspeth", name: "Maspeth", city: "Queens", kind: "neighborhood", lat: 40.726, lng: -73.896, parent: "queens", main: false },
  { slug: "middle-village", name: "Middle Village", city: "Queens", kind: "neighborhood", lat: 40.716, lng: -73.882, parent: "queens", main: false },
  { slug: "bayside", name: "Bayside", city: "Queens", kind: "neighborhood", lat: 40.768, lng: -73.77, parent: "queens", main: false },
  { slug: "whitestone", name: "Whitestone", city: "Queens", kind: "neighborhood", lat: 40.787, lng: -73.81, parent: "queens", main: false },
];

// Add 3 borough entries at the start (total becomes 103 — trim to 100 by removing 3 less critical)
// User asked for 100 — we have exactly 100 above (45+35+20=100)

if (AREAS.length !== 100) {
  throw new Error(`Expected 100 areas, got ${AREAS.length}`);
}

const MAIN = AREAS.filter((a) => a.main);

writeFileSync(join(ROOT, "content/service-areas.json"), `${JSON.stringify(AREAS, null, 2)}\n`);
writeFileSync(join(ROOT, "content/service-areas-main.json"), `${JSON.stringify(MAIN, null, 2)}\n`);
console.log(`Wrote ${AREAS.length} service areas (${MAIN.length} featured)`);
