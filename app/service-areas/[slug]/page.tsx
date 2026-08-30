import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, DoorOpen, MapPin, Sparkles } from "lucide-react";
import { AREAS, AREAS_BY_SLUG, nearbyAreas, areaPlace, areaState } from "@/lib/areas";
import { insightFor } from "@/lib/insights";
import { SERVICES } from "@/content/services";
import { BIZ } from "@/lib/business";
import { ContactCTA } from "@/components/site/ContactCTA";
import { ServiceMap } from "@/components/site/ServiceMap";
import { AreaAvailabilityChecker } from "@/components/site/DispatchTracker";
import { LongFormFaq } from "@/components/site/LongFormFaq";

export function generateStaticParams() {
  return AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = AREAS_BY_SLUG[slug];
  if (!area) return {};
  const insight = insightFor(area);
  const place = areaPlace(area);
  return {
    title: `Commercial Door Services in ${place}`,
    description:
      insight.tagline ||
      `${BIZ.name} provides commercial overhead, rolling steel, dock, and storefront door service in ${place}.`,
    keywords: insight.keywords,
    alternates: { canonical: `/service-areas/${area.slug}` },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = AREAS_BY_SLUG[slug];
  if (!area) return notFound();

  const nearby = nearbyAreas(area, 6);
  const insight = insightFor(area);
  const place = areaPlace(area);
  const state = areaState(area);
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const heroSrc = `${base}/photos/service-hero-commercial-overhead-doors.webp`;

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-800 bg-aurora">
        <Image
          src={heroSrc}
          alt={`Commercial door project inspiration for ${place}`}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover opacity-40"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink-950 via-ink-950/88 to-ink-950/55" />
        <div className="absolute inset-0 z-0 bg-grid opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_minmax(360px,440px)]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-md border border-brass-500/40 bg-ink-950/70 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-brass-300 backdrop-blur">
                  <DoorOpen className="h-3.5 w-3.5" /> Commercial door services
                </span>
                <span className="inline-flex items-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur">
                  <Clock className="h-3.5 w-3.5" /> {BIZ.hoursLabel}
                </span>
                <span className="inline-flex items-center gap-2 rounded-md border border-ink-700 bg-ink-950/60 px-3 py-1.5 text-xs font-semibold text-ink-200 backdrop-blur">
                  <MapPin className="h-3.5 w-3.5 text-brass-400" /> {place}
                </span>
              </div>
              <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
                Commercial doors in <span className="text-brass-gradient">{area.name}</span>, {state}
              </h1>
              <p className="mt-4 max-w-2xl text-base text-ink-200 md:text-lg">
                {insight.tagline || `${BIZ.name} serves ${place} with commercial overhead, rolling steel, dock, and storefront systems.`}
              </p>
              <div className="mt-7">
                <ContactCTA size="lg" />
              </div>
            </div>
            <AreaAvailabilityChecker areaName={area.name} areaSlug={area.slug} />
          </div>
        </div>
      </section>

      <section className="border-b border-ink-800 py-16">
        <div className="mx-auto max-w-3xl space-y-5 px-4 text-sm text-ink-200 md:px-6 md:text-base">
          <p className="font-mono text-sm font-semibold uppercase tracking-wider text-brass-400">{area.name} notes</p>
          <h2 className="font-display text-3xl font-bold text-ink-50 md:text-4xl">
            Unique commercial door conditions in {area.name}
          </h2>
          <p>{insight.neighborhood_notes}</p>
          {insight.landmarks.length > 0 && (
            <p>
              <strong className="text-ink-50">Local landmarks we use for dispatch context:</strong>{" "}
              {insight.landmarks.join(", ")}.
            </p>
          )}
          {insight.common_calls.length > 0 && (
            <div>
              <p className="font-semibold text-ink-50">Common commercial calls in {area.name}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {insight.common_calls.map((call) => (
                  <li key={call}>{call}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="border-b border-ink-800 bg-ink-950 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brass-400">
              Coverage node · {area.name}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Commercial door dispatch across {area.name}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-300">
              We cover {place} from {BIZ.address.street}. Use the map to confirm the neighborhood, then send the
              facility address with your quote.
            </p>
          </div>
          <ServiceMap
            lat={area.lat}
            lng={area.lng}
            zoom={area.kind === "city" ? 13 : 14}
            title={place}
            height={460}
          />
        </div>
      </section>

      <section className="border-t border-ink-800 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Door services</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Commercial options in {area.name}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex items-start gap-3 rounded-2xl border border-ink-800 bg-ink-900/50 p-4 transition-all hover:-translate-y-0.5 hover:border-brass-500/50"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brass-500/10 text-brass-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-ink-100">
                      {service.shortName} in {area.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-ink-300">{service.tagline}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-ink-500 transition-all group-hover:translate-x-1 group-hover:text-brass-400" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {nearby.length > 0 && (
        <section className="border-t border-ink-800 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="font-display text-2xl font-bold md:text-3xl">Nearby service areas</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {nearby.map((neighbor) => (
                <Link
                  key={neighbor.slug}
                  href={`/service-areas/${neighbor.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-ink-800 bg-ink-900/50 p-4 hover:border-brass-500/40"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-brass-400" />
                    <span className="font-semibold">{neighbor.name}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-ink-500 group-hover:text-brass-400" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-ink-800 py-16">
        <div className="mx-auto max-w-3xl space-y-5 px-4 text-sm text-ink-200 md:px-6 md:text-base">
          <h2 className="font-display text-2xl font-bold text-ink-50 md:text-3xl">
            Planning commercial door work in {area.name}
          </h2>
          <p>
            A useful estimate starts with the opening and its cycle count. Tell us whether the project involves
            a warehouse overhead door, rolling steel curtain, dock seal, high-speed interior door, fire-rated
            assembly, hollow metal corridor, or storefront pair.
          </p>
          <p>
            Framing and operator prep may include track alignment, spring replacement, photo-eye setup, and weather
            seals. Those steps belong in the written scope rather than a vague “install” line.
          </p>
          <p className="flex items-start gap-2">
            <Sparkles className="mt-1 h-4 w-4 shrink-0 text-brass-400" />
            Share the facility address and preferred timing through the quote form so we can confirm coverage in
            {` ${area.name}`} from {BIZ.address.street}.
          </p>
        </div>
      </section>

      <LongFormFaq subject={area.name} kind="area" />

      <section className="border-t border-ink-800 bg-aurora py-16 text-center">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">
            Have a commercial door project in {area.name}?
          </h2>
          <p className="mt-3 text-ink-200">Tell {BIZ.name} about the opening and door type.</p>
          <div className="mt-6 flex justify-center">
            <ContactCTA size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
