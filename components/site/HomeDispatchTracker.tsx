"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Crosshair, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { BIZ, hasPhone } from "@/lib/business";

type Phase = "idle" | "locating" | "inside" | "outside" | "denied";

export type AvailabilityService = {
  slug: string;
  name: string;
  shortName: string;
  tagline?: string;
  bullets?: string[];
};

function isInsideNycServiceArea(lat: number, lng: number) {
  const bounds = BIZ.metroBounds;
  return (
    lat >= bounds.minLat &&
    lat <= bounds.maxLat &&
    lng >= bounds.minLng &&
    lng <= bounds.maxLng
  );
}

export function AvailabilityChecker({ service }: { service?: AvailabilityService } = {}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const serviceLabel = service?.shortName ?? "door";

  function checkLocation() {
    if (phase === "locating") return;
    setPhase("locating");
    if (!("geolocation" in navigator)) {
      setPhase("denied");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPhase(isInsideNycServiceArea(coords.latitude, coords.longitude) ? "inside" : "outside");
      },
      () => setPhase("denied"),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brass-500/30 bg-gradient-to-br from-ink-900 via-ink-950 to-ink-900 p-5 shadow-2xl shadow-black/40 md:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brass-500/40 bg-brass-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brass-300">
          <MapPin className="h-3 w-3" />
          Service area check
        </span>
      </div>

      <h2 className="relative mt-4 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
        {service ? `Is this ${serviceLabel.toLowerCase()} work in our service area?` : "Is your project in our service area?"}
      </h2>
      <p className="relative mt-2 text-sm text-ink-300 md:text-base">
        Location access only checks whether you appear to be within our North Jersey and NYC waterfront coverage bounds.
        It does not promise project availability, a start date, or an arrival time.
      </p>

      {(phase === "idle" || phase === "denied") && (
        <div className="relative mt-5">
          {phase === "denied" && (
            <div className="mb-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                <AlertTriangle className="h-4 w-4" /> Location was unavailable
              </div>
              <p className="mt-1 text-xs text-ink-300">
                You can still request a quote with your neighborhood or ZIP, or email to confirm coverage.
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={checkLocation}
            className="inline-flex items-center gap-2 rounded-full bg-brass-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-ink-950 shadow-lg shadow-brass-500/30 transition hover:bg-brass-400 active:translate-y-px md:text-base"
          >
            <Crosshair className="h-5 w-5" /> Check my service area
          </button>
        </div>
      )}

      {phase === "locating" && (
        <div className="relative mt-5 flex items-center gap-2 text-sm font-semibold text-brass-300">
          <Loader2 className="h-4 w-4 animate-spin" /> Checking your position against North Jersey coverage…
        </div>
      )}

      {phase === "inside" && (
        <div className="relative mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5">
          <div className="flex items-center gap-2 font-bold text-emerald-300">
            <CheckCircle2 className="h-5 w-5" /> You appear to be inside our North Jersey service area
          </div>
          <p className="mt-2 text-sm text-ink-300">
            Send the project address and scope so {BIZ.name} can confirm coverage and discuss scheduling.
          </p>
          <AvailabilityLinks />
        </div>
      )}

      {phase === "outside" && (
        <div className="relative mt-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <AlertTriangle className="h-5 w-5" /> You appear to be outside our standard North Jersey bounds
          </div>
          <p className="mt-2 text-sm text-ink-300">
            The location check is approximate. Send the project address if you would like us to confirm coverage.
          </p>
          <AvailabilityLinks />
        </div>
      )}
    </div>
  );
}

function AvailabilityLinks() {
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <Link
        href="/quote"
        className="inline-flex items-center rounded-full bg-brass-500 px-5 py-2.5 text-sm font-bold text-ink-950 transition hover:bg-brass-400"
      >
        Request a project quote
      </Link>
      {hasPhone ? (
        <a
          href={BIZ.phoneHref}
          className="inline-flex items-center gap-2 rounded-full border border-brass-500/50 px-5 py-2.5 text-sm font-bold text-brass-300 transition hover:bg-brass-500/10"
        >
          <Phone className="h-4 w-4" /> Call {BIZ.phone}
        </a>
      ) : (
        <a
          href={BIZ.emailHref}
          className="inline-flex items-center gap-2 rounded-full border border-brass-500/50 px-5 py-2.5 text-sm font-bold text-brass-300 transition hover:bg-brass-500/10"
        >
          <Mail className="h-4 w-4" /> Email
        </a>
      )}
    </div>
  );
}
