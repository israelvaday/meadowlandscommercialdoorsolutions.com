import { DoorOpen } from "lucide-react";
import { BIZ } from "@/lib/business";
import { ContactCTA } from "@/components/site/ContactCTA";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-ink-800 bg-aurora py-20">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-brass-500/30 bg-brass-500/10 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-brass-300">
          <DoorOpen className="h-3.5 w-3.5" />           Commercial · Dock · Storefront · Free Quotes
        </div>
        <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight md:text-5xl">
          Ready to scope a commercial door opening?
        </h2>
        <p className="mt-4 text-ink-200">
          Tell {BIZ.name} about the facility, door type, operator, and timing from {BIZ.address.street}.
        </p>
        <div className="mt-7 flex justify-center">
          <ContactCTA size="lg" />
        </div>
      </div>
    </section>
  );
}
