"use client";

import { CheckCircle2, Clock, DoorOpen, MapPin } from "lucide-react";
import { BIZ } from "@/lib/business";
import { SITE_COPY } from "@/lib/site-copy";
import { ContactCTA } from "@/components/site/ContactCTA";

export function Hero() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const poster = `${base}${BIZ.heroPhoto}`;

  return (
    <section className="relative isolate overflow-hidden bg-aurora hud-frame">
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" />
      <div className="scanlines absolute inset-0 -z-10 opacity-30" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-brass-300">
            {SITE_COPY.heroEyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
            {SITE_COPY.heroTitleLead}{" "}
            <span className="text-brass-gradient">{SITE_COPY.heroTitleAccent}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-200 sm:text-lg">
            {SITE_COPY.heroBody}
          </p>
          <div className="mt-8">
            <ContactCTA size="lg" />
          </div>
          <ul className="mt-8 grid gap-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-300 sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brass-400" /> Written scopes
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brass-400" /> {BIZ.hoursLabel}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brass-400" /> {BIZ.address.locality}, NJ
            </li>
            <li className="flex items-center gap-2">
              <DoorOpen className="h-4 w-4 text-brass-400" /> Overhead · dock · storefront
            </li>
          </ul>
        </div>

        <div className="relative hud-frame">
          <div className="overflow-hidden rounded-2xl border border-brass-500/30 bg-ink-900 shadow-signal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={poster}
              alt={`${BIZ.name} commercial overhead door work in Jersey City`}
              className="aspect-[4/3] w-full object-cover object-[center_35%]"
              fetchPriority="high"
            />
          </div>
          <div className="absolute -bottom-4 left-4 rounded-xl border border-brass-500/40 bg-ink-950/90 px-4 py-3 font-mono backdrop-blur md:left-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brass-300">HQ node</p>
            <p className="mt-0.5 text-sm font-semibold text-white">{BIZ.address.street}, {BIZ.address.locality}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
