import areasJson from "@/content/service-areas.json";
import mainJson from "@/content/service-areas-main.json";

export type Area = {
  slug: string;
  name: string;
  city: string;
  kind: "city" | "neighborhood" | "community" | "zip-area";
  lat: number;
  lng: number;
  parent: string | null;
  main?: boolean;
  zip?: string[];
};

export const AREAS = areasJson as Area[];
export const MAIN_AREAS = mainJson as Area[];

export const AREAS_BY_SLUG: Record<string, Area> = Object.fromEntries(
  AREAS.map((a) => [a.slug, a])
);

export const CITIES = AREAS.filter((a) => a.kind === "city");

export function areaState(area: Area): "NJ" | "NY" {
  return area.parent === "nyc" ? "NY" : "NJ";
}

export function areaPlace(area: Area): string {
  return `${area.name}, ${areaState(area)}`;
}

function haversine(a: Area, b: Area): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function nearbyAreas(area: Area, count = 5): Area[] {
  return AREAS.filter((a) => a.slug !== area.slug)
    .map((a) => ({ a, d: haversine(area, a) }))
    .sort((x, y) => x.d - y.d)
    .slice(0, count)
    .map((x) => x.a);
}
