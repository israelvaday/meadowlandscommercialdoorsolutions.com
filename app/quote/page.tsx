import type { Metadata } from "next";
import { BIZ } from "@/lib/business";
import { QuoteWizard } from "@/components/site/QuoteWizard";
import { ContactCTA } from "@/components/site/ContactCTA";
import { LongFormFaq } from "@/components/site/LongFormFaq";

export const metadata: Metadata = {
  title: `Free Quote`,
  description: `Request a door quote from ${BIZ.name}. Choose a service and property type, describe the project, and submit your contact details.`,
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <section className="relative bg-aurora py-14 md:py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-3xl px-4 text-center md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Free Quote</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            One question at a <span className="text-brass-gradient">time</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-200">
            Choose the door service and property type, then share the opening, door type, hardware needs, and timing.
          </p>
          <div className="mt-6 flex justify-center">
            <ContactCTA size="md" />
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <QuoteWizard />
        </div>
      </section>

      <section className="border-t border-ink-800 py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-sm text-ink-200 md:px-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-50 md:text-3xl">How the quote works</h2>
            <p className="mt-3">
              The picture-driven wizard collects the basic information needed to understand a commercial door request. There is
              no account to create and no obligation to proceed.
            </p>
            <p className="mt-3">
              Describe the opening, door type, hardware, damage, and access notes in the details step. Some projects
              still need an on-site review before final pricing.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-ink-50 md:text-3xl">What we quote</h2>
            <p className="mt-3">
              Choose commercial overhead doors, rolling steel, loading-dock equipment, high-speed doors, fire-rated
              assemblies, hollow metal, automatic operators, storefront entrances, security grilles, or emergency
              commercial repair.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-ink-50 md:text-3xl">Pricing & expectations</h2>
            <p className="mt-3">
              A useful estimate identifies door type, hardware, framing adjustments, code requirements, exclusions, and
              timing. If scope changes, confirm the added work and price in writing. Email project photos to{" "}
              {BIZ.email} or attach them in the quote form.
            </p>
          </div>
        </div>
      </section>
      <LongFormFaq subject="Commercial Door Services" kind="service" />
    </>
  );
}
