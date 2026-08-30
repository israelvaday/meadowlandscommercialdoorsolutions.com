import Link from "next/link";
import { SERVICES } from "@/content/services";
import { ServiceCard } from "@/components/site/ServiceCard";
import { Reveal } from "@/components/site/Reveal";

export function ServiceGrid({ city }: { city?: string }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brass-400">What we do</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Doors built around the opening.
          </h2>
          <p className="mt-3 max-w-2xl text-ink-300">
            Ten commercial door systems across {city ?? "Jersey City & North Jersey"}. Overhead, rolling steel,
            docks, high-speed, fire-rated, storefronts, and emergency repair.
          </p>
          <Link href="/services" className="mt-4 text-sm font-semibold text-brass-400 hover:text-brass-300">
            View all services →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06} y={14} variant="fade">
                <ServiceCard
                  slug={s.slug}
                  name={s.name}
                  shortName={s.shortName}
                  tagline={s.tagline}
                  Icon={s.icon}
                  photoSrc={`${base}/photos/service-hero-${s.slug}.webp`}
                  photoAlt={`${s.name} project inspiration`}
                  photoW={1600}
                  photoH={900}
                  city={city ?? "Jersey City, NJ"}
                  priority={false}
                />
              </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
