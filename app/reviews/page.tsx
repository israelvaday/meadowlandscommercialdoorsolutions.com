import type { Metadata } from "next";
import { CustomerExperience } from "@/components/sections/CustomerExperience";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LongFormFaq } from "@/components/site/LongFormFaq";
import { BIZ } from "@/lib/business";

export const metadata: Metadata = {
  title: "Customer Experience",
  description: `Review the service commitments ${BIZ.name} uses to guide door projects across Brooklyn, Manhattan & Queens.`,
  alternates: { canonical: `${BIZ.url}/reviews` },
};

export default function CustomerExperiencePage() {
  return (
    <>
      <section className="relative bg-aurora py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Customer experience</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            The service experience we aim to deliver.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-ink-200">
            We are not publishing customer testimonials or a verified rating here. Instead, this page lists the
            commitments that shape our door supply, installation, and repair process.
          </p>
        </div>
      </section>
      <CustomerExperience />
      <LongFormFaq subject="NYC Door Services" kind="service" />
      <FinalCTA />
    </>
  );
}
