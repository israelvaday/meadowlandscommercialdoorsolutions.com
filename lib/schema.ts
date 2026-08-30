import { BIZ } from "./business";
import { AREAS } from "./areas";
import { SERVICES } from "@/content/services";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${BIZ.url}/#business`,
    name: BIZ.name,
    image: `${BIZ.url}/opengraph-image.png`,
    logo: `${BIZ.url}/logo.png`,
    telephone: BIZ.phoneE164 || undefined,
    email: BIZ.email,
    url: BIZ.url,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: BIZ.address.street,
      addressLocality: BIZ.address.locality,
      addressRegion: BIZ.address.region,
      postalCode: BIZ.address.postalCode,
      addressCountry: BIZ.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BIZ.geo.lat,
      longitude: BIZ.geo.lng,
    },
    areaServed: AREAS.map((a) => ({
      "@type": "City",
      name: a.name,
      ...(a.zip ? { postalCode: a.zip[0] } : {}),
    })),
    openingHoursSpecification: BIZ.hours
      .filter((h) => !("closed" in h && h.closed))
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.label,
        opens: h.open,
        closes: h.close,
      })),
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Insurance documentation",
      name: "Insured commercial door contractor",
    },
    sameAs: Object.values(BIZ.social).filter(Boolean),
  };
}

export function serviceJsonLd(slug: string) {
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: s.name,
    description: s.description,
    provider: { "@id": `${BIZ.url}/#business` },
    areaServed: { "@type": "AdministrativeArea", name: BIZ.region },
    url: `${BIZ.url}/services/${s.slug}`,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
