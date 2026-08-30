import type { Metadata } from "next";
import { MapPin, Clock, DoorOpen } from "lucide-react";
import { BIZ } from "@/lib/business";
import { LongFormFaq } from "@/components/site/LongFormFaq";
import { ContactCTA } from "@/components/site/ContactCTA";
import { ServiceMap } from "@/components/site/ServiceMap";

export const metadata: Metadata = {
  title: "Contact — Jersey City Commercial Door Services",
  description:
    `Contact ${BIZ.name} to discuss a commercial door project or request a free quote across ${BIZ.region}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-800 bg-aurora py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
            <Clock className="h-3.5 w-3.5" /> Mon–Fri 7–6 · Sat 8–2
          </div>
          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            Plan your <span className="text-brass-gradient">door project</span>.
          </h1>
          <p className="mt-4 text-ink-200">
            Email project photos or send a quote request for a Jersey City, Hudson County, or Meadowlands facility.
          </p>
          <div className="mt-7 flex justify-center">
            <ContactCTA size="lg" showEmail />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3 md:px-6">
          <div className="rounded-3xl border border-brass-500/30 bg-brass-500/5 p-6">
            <div className="flex items-center gap-2 text-brass-300">
              <DoorOpen className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Written scope</span>
            </div>
            <p className="mt-3 text-sm text-ink-200">
              Door type, hardware, framing adjustments, code requirements, and exclusions are discussed before work.
            </p>
          </div>
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6">
            <div className="flex items-center gap-2 text-emerald-300">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Hours</span>
            </div>
            <p className="mt-3 text-sm text-ink-200">
              <strong className="text-ink-50">Mon–Fri 7:00 AM–6:00 PM; Sat 8:00 AM–2:00 PM; Sun closed.</strong> See our{" "}
              <a href="/hours" className="text-brass-300 underline-offset-2 hover:underline">hours page</a>{" "}
              for the complete schedule.
            </p>
          </div>
          <div className="rounded-3xl border border-ink-800 bg-ink-900/50 p-6">
            <div className="flex items-center gap-2 text-ink-100">
              <MapPin className="h-5 w-5 text-brass-400" />
              <span className="text-sm font-semibold uppercase tracking-wider">Service area</span>
            </div>
            <p className="mt-3 text-sm text-ink-200">
              {BIZ.region} — including 100 locations around {BIZ.address.street}.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Shop location</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
              {BIZ.address.full}
            </h2>
          </div>
          <ServiceMap
            lat={BIZ.geo.lat}
            lng={BIZ.geo.lng}
            zoom={BIZ.metroMap.zoom}
            title={BIZ.name}
            height={460}
          />
        </div>
      </section>

      <section className="border-t border-ink-800 py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">How to reach us</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Ways to discuss a commercial door project.
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-ink-800 bg-ink-900/50 p-6">
              <h3 className="font-display text-xl font-bold text-ink-50">Email</h3>
              <p className="mt-2 text-sm text-ink-200">
                Email {BIZ.name} at {BIZ.email}. Share the project address, door type, opening condition, hardware needs,
                and timing so we can discuss the next appropriate step.
              </p>
              <a href={BIZ.emailHref} className="mt-4 inline-block font-mono text-brass-300 underline-offset-4 hover:underline">
                {BIZ.email}
              </a>
            </div>
            <div className="rounded-2xl border border-ink-800 bg-ink-900/50 p-6">
              <h3 className="font-display text-xl font-bold text-ink-50">Send photos</h3>
              <p className="mt-2 text-sm text-ink-200">
                Email wide shots and close-ups of the door, frame, hardware, or damage to {BIZ.email}. Photos can help
                clarify condition, access, and scope before a site visit.
              </p>
              <a href={BIZ.emailHref} className="mt-4 inline-block text-sm font-semibold text-brass-300 underline-offset-4 hover:underline">
                Email photos →
              </a>
            </div>
            <div className="rounded-2xl border border-ink-800 bg-ink-900/50 p-6">
              <h3 className="font-display text-xl font-bold text-ink-50">Free written quote</h3>
              <p className="mt-2 text-sm text-ink-200">
                Use the picture-driven quote tool to identify the door service, property type, timing, and project
                details. You can upload photos or plans to support a project-specific follow-up.
              </p>
              <a href="/quote" className="mt-4 inline-block text-sm font-semibold text-brass-300 underline-offset-4 hover:underline">
                Start the quote →
              </a>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-ink-800 bg-ink-900/40 p-6 text-sm text-ink-200">
            <p>
              <strong className="text-ink-50">What we cover.</strong> {BIZ.name} provides commercial overhead doors,
              rolling steel, loading docks, high-speed doors, fire-rated assemblies, hollow metal, operators,
              storefronts, security grilles, and emergency commercial repair.
            </p>
            <p className="mt-3">
              <strong className="text-ink-50">Where we go.</strong> {BIZ.region} — see our{" "}
              <a href="/service-areas" className="text-brass-300 underline-offset-2 hover:underline">service area map</a>.
            </p>
          </div>
        </div>
      </section>

      <LongFormFaq subject="Commercial Door Services" kind="service" />

      <section className="border-t border-ink-800 bg-aurora py-16 text-center">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">
            Ready when you are.
          </h2>
          <p className="mt-3 text-ink-200">Tell us about your door project.</p>
          <div className="mt-6 flex justify-center">
            <ContactCTA size="lg" showEmail />
          </div>
        </div>
      </section>
    </>
  );
}
