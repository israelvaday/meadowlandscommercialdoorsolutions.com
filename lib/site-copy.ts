import raw from "@/content/site-copy.json";

export type GlossaryItem = { term: string; definition: string };
export type BuyerItem = { title: string; body: string };

export type SiteCopy = {
  heroEyebrow: string;
  heroTitleLead: string;
  heroTitleAccent: string;
  heroBody: string;
  heroChips: string[];
  aboutLead: string;
  contactLead: string;
  glossaryTitle: string;
  glossaryIntro: string;
  glossary: GlossaryItem[];
  buyersTitle: string;
  buyersIntro: string;
  buyers: BuyerItem[];
};

type RawCopy = Partial<SiteCopy> & {
  heroTitleHtml?: string;
};

const source = raw as RawCopy;

function stripClaims(text: string) {
  return text
    .replace(/\b24\s*\/\s*7\b/gi, "priority")
    .replace(/\bawards?\b/gi, "experience")
    .trim();
}

function parseTitleHtml(html?: string) {
  if (!html) return null;
  const match = html.match(/^(.*?)<span[^>]*>(.*?)<\/span>(.*)$/i);
  if (!match) return { lead: html.replace(/<[^>]+>/g, "").trim(), accent: "" };
  const before = match[1].replace(/<[^>]+>/g, "").trim();
  const accent = match[2].replace(/<[^>]+>/g, "").trim();
  return { lead: before || "Commercial door systems", accent };
}

const parsed = parseTitleHtml(source.heroTitleHtml);

export const SITE_COPY: SiteCopy = {
  heroEyebrow: source.heroEyebrow || "Commercial door systems · Jersey City HQ",
  heroTitleLead: source.heroTitleLead || parsed?.lead || "Commercial door systems",
  heroTitleAccent: (source.heroTitleAccent || parsed?.accent || "built for Jersey City & the Meadowlands").replace(/[.\s]+$/, ""),
  heroBody: stripClaims(
    source.heroBody ||
      "Overhead doors, rolling steel, loading docks, high-speed doors, fire-rated assemblies, and storefronts from 333 Washington St, Jersey City."
  ),
  heroChips: (source.heroChips || []).filter((chip) => !/24\s*\/\s*7/i.test(chip)).slice(0, 6),
  aboutLead: stripClaims(source.aboutLead || ""),
  contactLead: stripClaims(source.contactLead || ""),
  glossaryTitle: source.glossaryTitle || "Commercial door terms, explained",
  glossaryIntro: source.glossaryIntro || "",
  glossary: source.glossary || [],
  buyersTitle: source.buyersTitle || "How to compare commercial door estimates",
  buyersIntro: source.buyersIntro || "",
  buyers: source.buyers || [],
};
