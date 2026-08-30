import type { Metadata } from "next";
import { SERVICES } from "@/content/services";
import { BIZ } from "@/lib/business";
import { ServiceCard } from "@/components/site/ServiceCard";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LongFormFaq } from "@/components/site/LongFormFaq";

export const metadata: Metadata = {
  title: "Commercial Door Services in Jersey City & North Jersey",
  description:
    `${BIZ.name} installs and repairs commercial overhead doors, rolling steel, docks, high-speed doors, fire-rated assemblies, hollow metal, operators, and storefronts.`,
  alternates: { canonical: `${BIZ.url}/services` },
};

export default function ServicesPage() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <>
      <section className="relative bg-aurora py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-5xl px-4 text-center md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Services</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            Commercial door systems across <span className="text-brass-gradient">Jersey City &amp; the Meadowlands</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-ink-200">
            Ten commercial service lines — overhead, rolling steel, docks, high-speed, fire-rated, hollow metal,
            operators, storefronts, security grilles, and emergency repair.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 md:px-6 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
              <ServiceCard
                key={s.slug}
                slug={s.slug}
                name={s.name}
                shortName={s.shortName}
                tagline={s.tagline}
                Icon={s.icon}
                photoSrc={`${base}/photos/service-hero-${s.slug}.webp`}
                photoAlt={`${s.name} project inspiration`}
                photoW={1600}
                photoH={900}
                city="Jersey City, NJ"
                priority={i < 3}
              />
          ))}
        </div>
      </section>
      <LongFormFaq subject="Commercial Door Services" kind="service" />
      <FinalCTA />
    </>
  );
}
