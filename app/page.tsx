import type { Metadata } from "next";
import { BIZ } from "@/lib/business";
import { Hero } from "@/components/sections/Hero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { BrandShowcase } from "@/components/sections/BrandShowcase";
import { PhotoMarquee } from "@/components/sections/PhotoMarquee";
import { AreaTeaser } from "@/components/sections/AreaTeaser";
import { CustomerExperience } from "@/components/sections/CustomerExperience";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ServiceMap } from "@/components/site/ServiceMap";
import { AvailabilityChecker } from "@/components/site/HomeDispatchTracker";
import { Reveal } from "@/components/site/Reveal";
import { LazyParallax, LazyFloatOnScroll } from "@/components/site/LazyScrollFx";
import { LongFormFaq } from "@/components/site/LongFormFaq";
import { BuyersGuide } from "@/components/site/BuyersGuide";
import { DoorGlossary } from "@/components/site/DoorGlossary";

export const metadata: Metadata = {
  title: "Commercial Door Systems — Jersey City & the Meadowlands",
  description:
    `${BIZ.name} installs and repairs commercial overhead doors, rolling steel, loading docks, high-speed doors, fire-rated assemblies, and storefronts from ${BIZ.address.full}.`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="border-y border-ink-800 bg-ink-950 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Reveal variant="zoom">
            <LazyFloatOnScroll>
              <AvailabilityChecker />
            </LazyFloatOnScroll>
          </Reveal>
        </div>
      </section>
      <ServiceGrid />
      <BrandShowcase />
      <PhotoMarquee />
      <Reveal variant="bounce">
        <AreaTeaser />
      </Reveal>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Reveal variant="bounce">
            <div className="mb-6">
              <p className="font-mono text-sm font-semibold uppercase tracking-wider text-brass-400">Coverage</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
                {BIZ.region} — dispatch map.
              </h2>
            </div>
          </Reveal>
          <LazyParallax strength={-40}>
            <Reveal variant="zoom" delay={0.05}>
              <ServiceMap
                lat={BIZ.metroMap.lat}
                lng={BIZ.metroMap.lng}
                zoom={BIZ.metroMap.zoom}
                title={BIZ.region}
                height={420}
              />
            </Reveal>
          </LazyParallax>
        </div>
      </section>
      <Reveal variant="bounce">
        <CustomerExperience />
      </Reveal>
      <LongFormFaq subject="Commercial Door Systems" kind="service" />
      <BuyersGuide />
      <DoorGlossary />
      <Reveal variant="zoom">
        <FinalCTA />
      </Reveal>
    </>
  );
}
