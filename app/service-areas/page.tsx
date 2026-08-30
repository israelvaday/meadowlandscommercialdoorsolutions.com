import type { Metadata } from "next";
import { AREAS, CITIES } from "@/lib/areas";
import { AreaSearch } from "@/components/site/AreaSearch";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { BIZ } from "@/lib/business";
import { LongFormFaq } from "@/components/site/LongFormFaq";
import { BuyersGuide } from "@/components/site/BuyersGuide";

export const metadata: Metadata = {
  title: "Service Areas — Jersey City, Hudson County & the Meadowlands",
  description: `${BIZ.name} serves ${AREAS.length} locations near 333 Washington St, Jersey City. Search your area and request a commercial door quote.`,
  alternates: { canonical: `${BIZ.url}/service-areas` },
};

export default function AreasPage() {
  return (
    <>
      <section className="relative bg-aurora py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-5xl px-4 text-center md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Service Areas</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            {AREAS.length} locations around <span className="text-brass-gradient">333 Washington St</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-ink-200">
            Hudson County, the Meadowlands, Newark ports, and NYC waterfront — from {CITIES[0]?.name} to {CITIES[CITIES.length - 1]?.name}.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <AreaSearch areas={AREAS} />
        </div>
      </section>
      <LongFormFaq subject="Commercial Door Coverage" kind="service" />
      <BuyersGuide />
      <FinalCTA />
    </>
  );
}
