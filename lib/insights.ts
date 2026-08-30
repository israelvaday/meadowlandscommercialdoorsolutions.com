import insightsJson from "@/content/area-insights.json";
import type { Area } from "./areas";
import { areaPlace } from "./areas";

export type AreaInsight = {
  tagline: string;
  landmarks: string[];
  common_calls: string[];
  neighborhood_notes: string;
  keywords: string[];
};

const INSIGHTS = insightsJson as Record<string, AreaInsight>;

export function insightFor(area: Area): AreaInsight {
  const found = INSIGHTS[area.slug];
  if (found?.neighborhood_notes) return found;
  return {
    tagline: `Commercial door service for ${areaPlace(area)} facilities and storefronts.`,
    landmarks: [],
    common_calls: [
      "Repair a commercial overhead door",
      "Replace a rolling steel curtain",
      "Service a storefront entrance",
    ],
    neighborhood_notes: `${areaPlace(area)} commercial buildings need door systems matched to wind, traffic, and security. Meadowlands Commercial Door Solutions measures the opening, specifies the door type, and writes a clear scope before work begins.`,
    keywords: [
      `${area.name.toLowerCase()} commercial door repair`,
      `overhead door ${area.name.toLowerCase()}`,
      `rolling steel door ${area.city.toLowerCase()}`,
    ],
  };
}
