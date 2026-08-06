import type { Metadata } from "next";
import { BIZ } from "@/lib/business";
import { QuoteWizard } from "@/components/site/QuoteWizard";
import { ContactCTA } from "@/components/site/ContactCTA";
import { LongFormFaq } from "@/components/site/LongFormFaq";

export const metadata: Metadata = {
  title: `Free Quote`,
  description: `Request a door quote from ${BIZ.name}. Choose a service and property type, describe the project, and optionally upload photos or documents.`,
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
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">How the quote works</h2>
            <p className="mt-3">
              The picture-driven wizard collects the basic information needed to understand a NYC door request. There is
              no account to create and no obligation to proceed.
            </p>
            <p className="mt-3">
              You can attach wide photos and close-ups of the door, frame, hardware, damage, or plans. Photos can
              clarify condition and scope, though some projects still need an on-site review.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">What we quote</h2>
            <p className="mt-3">
              Choose residential installation, commercial installation, custom fabrication, hardware supply, structural
              repair, fire-rated doors, storefront systems, emergency repair, frame and jamb repair, or security doors.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">Pricing & expectations</h2>
            <p className="mt-3">
              A useful estimate identifies door type, hardware, framing adjustments, code requirements, exclusions, and
              timing. If scope changes, confirm the added work and price in writing. You can also text project photos
              to {BIZ.phone}.
            </p>
          </div>
        </div>
      </section>
      <LongFormFaq subject="NYC Door Services" kind="service" />
    </>
  );
}
