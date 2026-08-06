"use client";

import { CheckCircle2, Clock, DoorOpen, MapPin, Sparkles } from "lucide-react";
import { BIZ } from "@/lib/business";
import { ContactCTA } from "@/components/site/ContactCTA";
import { LogoMark } from "@/components/site/Logo";

export function Hero() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const poster = `${base}/photos/branding-generated--hero-hillman-door-nyc.png`;

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-ink-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          className="h-full w-full object-cover object-[center_35%] opacity-[0.42] mix-blend-luminosity"
          fetchPriority="high"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-[center_35%] opacity-30"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(7,8,12,0.85), rgba(7,8,12,0.55) 45%, rgba(7,8,12,0.95)), linear-gradient(to right, rgba(7,8,12,0.7), rgba(7,8,12,0.25) 40%, rgba(7,8,12,0.55))",
          }}
        />
        <div className="absolute inset-0 hidden bg-grid opacity-20 mix-blend-overlay md:block" />
        <div className="pointer-events-none absolute -left-32 top-1/3 hidden h-[60vh] w-[60vh] rounded-full bg-brass-500/15 blur-3xl md:block" />
        <div className="pointer-events-none absolute -right-24 -top-24 hidden h-[40vh] w-[40vh] rounded-full bg-brass-500/10 blur-3xl md:block" />
      </div>

      <div
        className="absolute left-4 top-4 z-10 hidden items-center gap-2 rounded-2xl border border-brass-500/40 bg-ink-950/70 px-3 py-2 backdrop-blur md:inline-flex"
      >
        <LogoMark className="h-7 w-7" />
        <div className="flex flex-col leading-tight">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brass-300">{BIZ.name}</span>
          <span className="font-mono text-[10px] text-ink-300">Supply · Install · Repair</span>
        </div>
      </div>

      <div
        className="absolute bottom-6 right-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-200 backdrop-blur md:right-6"
      >
        <DoorOpen className="h-3.5 w-3.5" />
        Door quotes · Brooklyn &amp; NYC
      </div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-5xl flex-col items-center justify-center px-4 pb-20 pt-24 text-center md:min-h-[88vh] md:px-6 md:pt-32">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brass-500/40 bg-brass-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-brass-300 backdrop-blur">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Written project scopes
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur">
            <Clock className="h-3.5 w-3.5" />
            Mon–Sat service
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-700/80 bg-ink-900/60 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-200 backdrop-blur">
            <MapPin className="h-3.5 w-3.5 text-brass-400" />
            Brooklyn, Manhattan &amp; Queens
          </span>
        </div>

        <div className="mt-8 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.4em] text-brass-300/90">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-brass-500/60" />
          {BIZ.name}
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-brass-500/60" />
        </div>

        <h1 className="mt-4 max-w-4xl font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight [text-shadow:0_4px_28px_rgba(0,0,0,0.7)] sm:text-5xl md:mt-5 md:text-6xl lg:text-7xl">
          NYC{" "}
          <span className="text-brass-gradient">door supply, installation &amp; repair</span>.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base text-ink-200 sm:text-lg md:mt-6 md:text-xl">
          Premium door supply, residential and commercial installation, structural repair, fire-rated doors,
          hardware, and emergency service across Brooklyn, Manhattan &amp; Queens.
        </p>

        <ul className="mt-7 flex flex-wrap justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-300 md:mt-8 md:text-xs">
          {["Residential", "Commercial", "Custom", "Hardware", "Fire-rated", "Emergency"].map((s) => (
            <li
              key={s}
              className="rounded-md border border-ink-700/70 bg-ink-900/50 px-2.5 py-1 backdrop-blur"
            >
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center md:mt-10">
          <ContactCTA size="lg" />
        </div>

        <ul className="mt-9 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-ink-200 md:mt-12">
          <li className="flex items-center gap-1.5">
            <DoorOpen className="h-4 w-4 text-brass-400" />
            On-site measuring
          </li>
          <li className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-brass-400" />
            Written estimates
          </li>
          <li className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-brass-400" />
            Code-compliant installs
          </li>
          <li className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-brass-400" />
            Hardware &amp; security options
          </li>
        </ul>

        <div className="mt-12 hidden md:flex md:flex-col md:items-center md:gap-2" aria-hidden>
          <div className="h-9 w-[1px] bg-gradient-to-b from-brass-500/0 via-brass-400/70 to-brass-500/0 animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-ink-400">
            Scroll
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink-950" />
    </section>
  );
}
