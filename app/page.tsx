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
import { PaintingGlossary } from "@/components/site/PaintingGlossary";

export const metadata: Metadata = {
  title: "Door Supply, Installation & Repair — Brooklyn & NYC",
  description:
    `${BIZ.name} provides residential and commercial door supply, installation, structural repair, fire-rated doors, hardware, and emergency service across Brooklyn, Manhattan & Queens. Request a free estimate.`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="border-y border-ink-800 bg-ink-950/60 py-12 md:py-16">
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
              <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Coverage</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
                Brooklyn, Manhattan &amp; Queens — service coverage map.
              </h2>
            </div>
          </Reveal>
          <LazyParallax strength={-40}>
            <Reveal variant="zoom" delay={0.05}>
              <ServiceMap
                lat={BIZ.metroMap.lat}
                lng={BIZ.metroMap.lng}
                zoom={BIZ.metroMap.zoom}
                title="Brooklyn, Manhattan & Queens, NY"
                height={420}
              />
            </Reveal>
          </LazyParallax>
        </div>
      </section>
      <Reveal variant="bounce">
        <CustomerExperience />
      </Reveal>
      <LongFormFaq subject="NYC Door Services" kind="service" />
      <BuyersGuide />
      <PaintingGlossary />
      <Reveal variant="zoom">
        <FinalCTA />
      </Reveal>
    </>
  );
}
