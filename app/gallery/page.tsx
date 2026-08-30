import type { Metadata } from "next";
import { BIZ } from "@/lib/business";
import { SERVICES } from "@/content/services";
import { ContactCTA } from "@/components/site/ContactCTA";
import { LongFormFaq } from "@/components/site/LongFormFaq";
import { BuyersGuide } from "@/components/site/BuyersGuide";
import { DoorGlossary } from "@/components/site/DoorGlossary";
import { GalleryClient } from "./gallery-client";

export const metadata: Metadata = {
  title: "Door Project Inspiration",
  description: `Explore commercial door project inspiration from ${BIZ.name} for overhead, rolling steel, dock, fire-rated, storefront, and emergency repair work.`,
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const servicePhotos = SERVICES.map((service) => ({
    id: service.slug,
    src: `${base}/photos/service-hero-${service.slug}.webp`,
    alt: `${service.name} project inspiration from ${BIZ.name}`,
    width: 1600,
    height: 900,
  }));
  const inGroup = (slugs: string[]) => servicePhotos.filter((photo) => slugs.includes(photo.id));

  const groups = [
    { key: "all", label: "All inspiration", photos: servicePhotos },
    {
      key: "warehouse",
      label: "Warehouse & dock",
      photos: inGroup(["commercial-overhead-doors", "rolling-steel-doors", "loading-dock-equipment", "high-speed-doors"]),
    },
    {
      key: "building",
      label: "Building & storefront",
      photos: inGroup(["fire-rated-doors", "hollow-metal-doors", "storefront-entrances", "security-grilles"]),
    },
    {
      key: "service",
      label: "Operators & emergency",
      photos: inGroup(["automatic-operators", "emergency-commercial-repair"]),
    },
  ].filter((group) => group.photos.length > 0);

  return (
    <>
      <section className="border-b border-ink-800 bg-aurora py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Gallery</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            Jersey City <span className="text-brass-gradient">commercial door inspiration</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-ink-200">
            Visual references for overhead doors, rolling steel, docks, high-speed doors, fire-rated assemblies, and
            storefronts.
          </p>
          <p className="mt-2 max-w-2xl text-sm text-ink-400">
            Images are illustrative project inspiration and are not presented as completed customer projects.
          </p>
          <div className="mt-6">
            <ContactCTA size="md" />
          </div>
        </div>
      </section>

      <GalleryClient groups={groups} />

      <section className="border-t border-ink-800 py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-sm text-ink-200 md:px-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-50 md:text-3xl">Using inspiration well</h2>
            <p className="mt-3">
              Save examples of door styles, hardware finishes, fire-rated assemblies, or storefront configurations you
              like. We can use them as a starting point, then account for your actual opening and building code.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-50 md:text-3xl">Before ordering</h2>
            <p className="mt-3">
              Confirm rough opening dimensions, swing direction, fire rating, and hardware requirements on-site before
              materials are ordered. Pre-war and masonry buildings often need field verification.
            </p>
          </div>
        </div>
      </section>

      <LongFormFaq subject="Door Project Inspiration" kind="service" />
      <BuyersGuide />
      <DoorGlossary />
    </>
  );
}
