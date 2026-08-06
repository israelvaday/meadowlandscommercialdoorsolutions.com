import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { BIZ } from "@/lib/business";
import { LinkButton } from "@/components/ui/Button";
import { ContactCTA } from "@/components/site/ContactCTA";

export const metadata: Metadata = {
  title: "Thanks — we got your request",
  robots: { index: false, follow: true },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <section className="relative bg-aurora py-24">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-2xl px-4 text-center md:px-6">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-400" />
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          Got it — we&apos;ll be in touch.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-200">
          We received your door quote request. {BIZ.name} will review the project details and follow up using the
          contact information you provided.
        </p>
        <div className="mt-7 flex flex-col items-center gap-4">
          <ContactCTA size="lg" />
          <LinkButton href="/" variant="ghost" size="md">← Back home</LinkButton>
        </div>
      </div>
    </section>
  );
}
