"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { BIZ } from "@/lib/business";

function CollapsibleQ({ q, children }: { q: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-ink-900/60 md:px-6"
      >
        <span className="font-display text-base font-bold text-white md:text-lg">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-brass-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 px-5 pb-5 text-ink-200 md:px-6 md:text-base">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function LongFormFaq({ subject, kind }: { subject: string; kind: "area" | "service" }) {
  const place = kind === "area" ? subject : "Brooklyn, Manhattan & Queens";
  const topic =
    kind === "area" ? `door work in ${subject}` : `${subject.toLowerCase()} across NYC`;

  return (
    <section className="border-t border-ink-800 py-16">
      <div className="mx-auto max-w-3xl space-y-4 px-4 md:px-6">
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass-400">In depth</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
            Questions about {topic}
          </h2>
          <p className="mt-3 text-sm text-ink-200 md:text-base">
            Practical answers from {BIZ.name} to help you compare door scopes in {place}. Tap a question to expand.
          </p>
        </header>

        <CollapsibleQ q="What should a door scope include?">
          <p>
            A clear scope identifies the door slab, frame, hardware, weatherstripping, fire rating, and any framing
            adjustments. Existing damage or structural repairs outside the door scope should be identified before work
            begins.
          </p>
        </CollapsibleQ>

        <CollapsibleQ q="When is a fire-rated door required?">
          <p>
            Multifamily, commercial, and mixed-use buildings in NYC often require UL-listed fire door assemblies in
            corridors, stairwells, and certain tenant separations. The written scope should identify the required label,
            self-closing hardware, and smoke-seal components.
          </p>
        </CollapsibleQ>

        <CollapsibleQ q="What hardware should I specify?">
          <p>
            Hardware selection depends on door weight, traffic, security goals, and ADA requirements. Locksets, closers,
            hinges, panic hardware, and access-control prep should be matched to the door and building use rather than
            treated as interchangeable.
          </p>
        </CollapsibleQ>

        <CollapsibleQ q="Can a door be repaired instead of replaced?">
          <p>
            Many binding, sagging, or latch problems stem from jamb settlement, hinge wear, or strike misalignment —
            not a failed slab. Structural repair can restore smooth operation and secure closure while preserving
            original materials when possible.
          </p>
        </CollapsibleQ>

        <CollapsibleQ q="How should I measure for a new door?">
          <p>
            Accurate on-site measurement accounts for jamb width, header height, floor clearance, swing direction, and
            existing casing. Pre-war and masonry buildings often need field verification before ordering a slab or
            custom fabrication.
          </p>
        </CollapsibleQ>

        <CollapsibleQ q="How do NYC building conditions affect door work?">
          <p>
            Settlement, humidity swings, masonry movement, and high-traffic use can affect how doors hang and latch.
            A responsible scope accounts for the building type — brownstone, loft, multifamily, or storefront — instead
            of assuming a standard rough opening.
          </p>
        </CollapsibleQ>

        <CollapsibleQ q="What should cleanup and the final walkthrough include?">
          <p>
            The closeout plan should cover removal of old doors and debris, hardware testing, latch alignment, and a
            walkthrough against the written scope. Any agreed adjustments should be documented before the project is
            considered complete. Call {BIZ.phone} to discuss your project in {place}.
          </p>
        </CollapsibleQ>
      </div>
    </section>
  );
}
