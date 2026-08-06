import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { BIZ } from "@/lib/business";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LogoMark } from "@/components/site/Logo";

export const metadata: Metadata = {
  title: "Business & Insurance Information",
  description: `Request current business and insurance information for ${BIZ.name} door work in Brooklyn & NYC.`,
  alternates: { canonical: `${BIZ.url}/license` },
};

export default function CredentialsPage() {
  return (
    <>
      <section className="relative bg-aurora py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-3xl px-4 text-center md:px-6">
          <ShieldCheck className="mx-auto h-10 w-10 text-brass-400" />
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            Business &amp; insurance information
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-200">
            This page does not claim or publish a specific contractor license. Door and building requirements can vary
            by work type and jurisdiction. Ask {BIZ.name} for current business and insurance information relevant to your
            project before approval.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <div className="overflow-hidden rounded-2xl border border-brass-500/30 bg-ink-900/50 p-6 text-center">
            <LogoMark className="mx-auto h-24 w-24 text-2xl" />
            <p className="mt-4 text-sm text-ink-300">
              Need documentation for a property or commercial project? Call {BIZ.phone} or email {BIZ.email}.
            </p>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
