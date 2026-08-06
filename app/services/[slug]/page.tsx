import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ShieldCheck, Clock, MapPin } from "lucide-react";
import { BIZ } from "@/lib/business";
import { SERVICES } from "@/content/services";
import { ContactCTA } from "@/components/site/ContactCTA";
import { LogoMark } from "@/components/site/Logo";
import { ServiceMap } from "@/components/site/ServiceMap";
import { AvailabilityChecker } from "@/components/site/HomeDispatchTracker";
import { LongFormFaq } from "@/components/site/LongFormFaq";
import { Reveal, RevealItem, RevealStagger } from "@/components/site/Reveal";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.name,
    description: s.description.slice(0, 160),
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return notFound();
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const heroSrc = `${base}/photos/service-hero-${s.slug}.png`;
  const Icon = s.icon;

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-800 bg-ink-950">
        <Image
          src={heroSrc}
          alt={`${s.name} project inspiration`}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover opacity-60"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-ink-950/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-brass-500/40 bg-ink-950/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brass-300 backdrop-blur">
              <LogoMark className="h-4 w-4" />
              {BIZ.name} · NYC door services
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur">
              <Clock className="h-3.5 w-3.5" /> Mon–Sat service
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-950/60 px-3 py-1.5 text-xs font-semibold text-ink-200 backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-brass-400" /> Brooklyn, Manhattan &amp; Queens
            </span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <Icon className="h-7 w-7 text-brass-400" />
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brass-400">
              {s.shortName}
            </p>
          </div>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            {s.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-200">{s.tagline}</p>
          <div className="mt-7">
            <ContactCTA size="lg" />
          </div>
        </div>
      </section>

      <section className="border-b border-ink-800 bg-ink-950 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <Reveal variant="zoom">
            <AvailabilityChecker
              service={{
                slug: s.slug,
                name: s.name,
                shortName: s.shortName,
                tagline: s.tagline,
                bullets: s.bullets,
              }}
            />
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-3 md:px-6">
          <Reveal className="md:col-span-2">
            <h2 className="font-display text-2xl font-bold md:text-3xl">What&apos;s included</h2>
            <p className="mt-4 text-ink-200">{s.description}</p>
            <RevealStagger className="mt-6 grid gap-3 sm:grid-cols-2" stagger={0.06}>
              {s.bullets.map((b) => (
                <RevealItem key={b}>
                  <div className="flex h-full items-start gap-3 rounded-2xl border border-ink-800 bg-ink-900/50 p-4 transition hover:-translate-y-0.5 hover:border-brass-500/40">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brass-500/15 text-brass-400">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-ink-100">{b}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </Reveal>
          <Reveal delay={0.1} variant="tilt" className="space-y-4">
            <div className="rounded-3xl border border-brass-500/30 bg-brass-500/5 p-5">
              <div className="flex items-center gap-2 text-brass-300">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Scope &amp; code compliance</span>
              </div>
              <p className="mt-2 text-sm text-ink-200">
                We discuss door type, hardware, framing adjustments, fire ratings, access, and cleanup before work
                begins. Insurance information is available on request.
              </p>
            </div>
            <div className="rounded-3xl border border-ink-800 bg-ink-900/50 p-5">
              <h3 className="font-display text-lg font-bold">Request this service</h3>
              <p className="mt-1 text-sm text-ink-300">Share your property, opening, and preferred timing.</p>
              <div className="mt-4">
                <ContactCTA size="md" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink-800 py-12">
        <div className="mx-auto max-w-3xl px-4 text-center text-sm text-ink-400 md:px-6">
          Service imagery is project inspiration and represents the kind of work we perform. It is not presented as a
          completed customer project.
        </div>
      </section>

      <section className="border-t border-ink-800 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Reveal>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Service area</p>
                <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                  {s.shortName} service across NYC
                </h2>
                <p className="mt-2 max-w-2xl text-ink-300">
                  Door service across Brooklyn, Manhattan &amp; Queens during posted business hours.
                </p>
              </div>
              <Link href="/service-areas" className="hidden text-sm font-semibold text-brass-400 hover:text-brass-300 md:inline-flex">
                All service areas →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1} variant="zoom">
            <ServiceMap
              lat={BIZ.geo.lat}
              lng={BIZ.geo.lng}
              zoom={BIZ.metroMap.zoom}
              title={`${s.shortName} — Brooklyn, Manhattan & Queens, NY`}
              height={420}
            />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink-800 py-16">
        <div className="mx-auto max-w-3xl space-y-5 px-4 text-sm text-ink-200 md:px-6 md:text-base">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            More about {s.shortName.toLowerCase()} in NYC
          </h2>
          <p>
            {s.description} For each {s.shortName.toLowerCase()} request, {BIZ.name} considers the opening condition,
            building type, hardware requirements, code compliance, access, and cleanup before finalizing scope.
          </p>
          <p>
            We serve Brooklyn, Manhattan &amp; Queens for {s.shortName.toLowerCase()} — Park Slope, Williamsburg, DUMBO,
            Midtown, Long Island City, Astoria, and every neighborhood in our{" "}
            <a href="/service-areas" className="text-brass-300 underline-offset-2 hover:underline">coverage map</a>.
            Project dates are discussed after we understand the scope and current schedule.
          </p>
          <p>
            Pricing for {s.shortName.toLowerCase()} depends on door type, hardware, framing adjustments, access,
            and timing. The estimate should identify assumptions and exclusions; proposed scope changes should be
            discussed and documented before added work proceeds.
          </p>
          <p>
            We document the agreed door specifications, hardware, framing work, and closeout expectations so everyone
            is working from the same plan.
          </p>
        </div>
      </section>

      <LongFormFaq subject={s.shortName} kind="service" />

      <section className="border-t border-ink-800 bg-aurora py-16 text-center">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">
              Planning a {s.shortName.toLowerCase()} project?
            </h2>
            <p className="mt-3 text-ink-200">Tell {BIZ.name} about the opening and door type you have in mind.</p>
            <div className="mt-6 flex justify-center">
              <ContactCTA size="lg" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
