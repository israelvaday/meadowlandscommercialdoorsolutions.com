import type { Metadata } from "next";
import Image from "next/image";
import { ClipboardCheck, Clock, DoorOpen, Mail, MapPin, Package, Phone, Sparkles } from "lucide-react";
import { BIZ } from "@/lib/business";
import { ContactCTA } from "@/components/site/ContactCTA";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LongFormFaq } from "@/components/site/LongFormFaq";

export const metadata: Metadata = {
  title: `About ${BIZ.name}`,
  description: `Learn how ${BIZ.name} approaches commercial overhead, rolling steel, dock, and storefront door work from ${BIZ.address.full}.`,
  alternates: { canonical: `${BIZ.url}/about` },
};

const APPROACH = [
  {
    Icon: ClipboardCheck,
    label: "Scope",
    value: "Written details",
    body: "Door type, hardware, framing adjustments, code requirements, and exclusions are discussed before work begins.",
  },
  {
    Icon: DoorOpen,
    label: "Measurement",
    value: "On-site accuracy",
    body: "We measure openings, verify swing, check jamb condition, and confirm hardware compatibility before ordering.",
  },
  {
    Icon: Package,
    label: "Supply",
    value: "Premium materials",
    body: "We source door slabs, frames, fire-rated assemblies, and commercial-grade hardware matched to your building.",
  },
  {
    Icon: Sparkles,
    label: "Closeout",
    value: "Testing & review",
    body: "The project concludes with latch alignment, hardware testing, cleanup, and a walkthrough against the scope.",
  },
] as const;

export default function AboutPage() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const inspiration = [
    { slug: "commercial-overhead-doors", label: "Commercial overhead door inspiration" },
    { slug: "loading-dock-equipment", label: "Loading dock door inspiration" },
    { slug: "storefront-entrances", label: "Storefront entrance inspiration" },
  ].map((item) => ({
    ...item,
    src: `${base}/photos/service-hero-${item.slug}.webp`,
  }));

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`${base}${BIZ.heroPhoto}`}
            alt="Commercial overhead door project inspiration in Jersey City"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/55 to-ink-950" />
        </div>
        <div className="relative mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 py-20 text-center md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">About {BIZ.name}</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] md:text-6xl">
            Doors planned around <span className="text-brass-gradient">your opening</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-ink-200">
            We serve {BIZ.region} with commercial overhead doors, rolling steel, loading docks, high-speed doors,
            fire-rated assemblies, hollow metal, operators, storefronts, and emergency commercial repair.
          </p>
          <div className="mt-7">
            <ContactCTA size="lg" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Our approach</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Measurement and code compliance come first.
            </h2>
            <p className="mt-4 text-ink-300">
              Door performance begins with accurate sizing and the right hardware. We organize the scope around opening
              condition, building type, security goals, access, and cleanup.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map(({ Icon, label, value, body }) => (
              <article key={label} className="rounded-2xl border border-ink-800 bg-ink-900/50 p-5">
                <Icon className="h-5 w-5 text-brass-400" />
                <div className="mt-3 text-sm text-ink-400">{label}</div>
                <h3 className="font-display font-bold text-ink-50">{value}</h3>
                <p className="mt-2 text-sm text-ink-300">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink-800 bg-ink-950 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-8 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Project inspiration</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
                Visualizing the kind of work we perform.
              </h2>
              <p className="mt-3 text-ink-300">
                These images are illustrative inspiration. They are not presented as photographs of completed customer
                projects.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {inspiration.map((photo) => (
                <div key={photo.slug} className="overflow-hidden rounded-2xl border border-ink-800">
                  <Image
                    src={photo.src}
                    alt={photo.label}
                    width={1600}
                    height={900}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="rounded-3xl border border-brass-500/30 bg-gradient-to-br from-brass-500/10 to-ink-900/40 p-8 text-center">
            <h2 className="font-display text-2xl font-bold md:text-3xl">Discuss your project.</h2>
            <p className="mt-2 text-ink-300">
              Reach us during posted business hours or send a quote request whenever it is convenient.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
              {BIZ.phone ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-900/70 px-3 py-1.5">
                  <Phone className="h-4 w-4 text-brass-400" /> {BIZ.phone}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-900/70 px-3 py-1.5">
                  <Mail className="h-4 w-4 text-brass-400" /> {BIZ.email}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-900/70 px-3 py-1.5">
                <MapPin className="h-4 w-4 text-brass-400" /> {BIZ.address.full}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-900/70 px-3 py-1.5">
                <Clock className="h-4 w-4 text-brass-400" /> Mon–Fri 7–6 · Sat 8–2
              </span>
            </div>
            <div className="mt-6 flex justify-center">
              <ContactCTA size="lg" />
            </div>
          </div>
        </div>
      </section>

      <LongFormFaq subject="Commercial Door Services" kind="service" />
      <FinalCTA />
    </>
  );
}
