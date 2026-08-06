// Single source of truth for NAP, hours, insurance wording, and links.
export const BIZ = {
  name: "Hillman Door Supply and Door Repair",
  legalName: "Hillman Door Supply and Door Repair",
  tagline: "Premium Door Supply, Installation & Structural Repair — Brooklyn & NYC",
  phone: "(718) 638-4271",
  phoneE164: "+17186384271",
  phoneHref: "tel:+17186384271",
  smsHref: "sms:+17186384271",
  email: "info@hillmandoorsupplyanddoorrepair.com",
  emailHref: "mailto:info@hillmandoorsupplyanddoorrepair.com",
  /** Routed via Cloudflare Email Routing → your personal inbox (see Cloudflare dashboard). */
  quotesEmail: "quotes@hillmandoorsupplyanddoorrepair.com",
  /** Quote form notifications (Railway + Resend). Override with QUOTE_TO_EMAIL env (comma-separated). */
  quoteNotifyEmails: ["israelvaday97@gmail.com", "oren.siyonov@gmail.com"],
  /** Compatibility field for existing trust components; no license is asserted. */
  licenseId: "Insured",
  /** Legacy compatibility field used by existing templates. */
  bsis: "Insured",
  url: "https://hillmandoorsupplyanddoorrepair.com",
  address: {
    street: "281 Flatbush Ave",
    locality: "Brooklyn",
    region: "NY",
    postalCode: "11217",
    country: "US",
    full: "281 Flatbush Ave, Brooklyn, NY 11217",
  },
  geo: { lat: 40.6804, lng: -73.9748 },
  /** Brooklyn / Manhattan / Queens — geolocation + map bounds */
  metroBounds: {
    minLat: 40.55,
    maxLat: 40.88,
    minLng: -74.05,
    maxLng: -73.75,
  },
  /** Default embed map center (NYC tri-borough view from HQ) */
  metroMap: { lat: 40.72, lng: -73.95, zoom: 11 },
  hours247: false,
  hours: [
    { day: 0, open: "00:00", close: "00:00", label: "Sunday", closed: true },
    { day: 1, open: "07:00", close: "18:00", label: "Monday" },
    { day: 2, open: "07:00", close: "18:00", label: "Tuesday" },
    { day: 3, open: "07:00", close: "18:00", label: "Wednesday" },
    { day: 4, open: "07:00", close: "18:00", label: "Thursday" },
    { day: 5, open: "07:00", close: "18:00", label: "Friday" },
    { day: 6, open: "08:00", close: "14:00", label: "Saturday" },
  ] as const,
  social: {
    google: "",
    yelp: "",
    facebook: "",
    instagram: "",
    tiktok: "",
  },
};
