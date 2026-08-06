"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Crosshair, Loader2, AlertTriangle, CheckCircle2, Phone } from "lucide-react";
import type { Area } from "@/lib/areas";
import { BIZ } from "@/lib/business";

const METRO_BOUNDS = BIZ.metroBounds;

type LocState =
  | { phase: "idle" }
  | { phase: "locating" }
  | { phase: "denied" }
  | { phase: "out_of_area" }
  | { phase: "matched" };

export function AreaSearch({ areas }: { areas: Area[] }) {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState<LocState>({ phase: "idle" });

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return areas;
    return areas.filter(
      (a) =>
        a.name.toLowerCase().includes(s) ||
        a.city.toLowerCase().includes(s) ||
        (a.zip && a.zip.some((z) => z.includes(s)))
    );
  }, [q, areas]);

  function detect() {
    if (loc.phase === "locating") return;
    setLoc({ phase: "locating" });
    if (!("geolocation" in navigator)) {
      setLoc({ phase: "denied" });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const inMetro =
          lat >= METRO_BOUNDS.minLat &&
          lat <= METRO_BOUNDS.maxLat &&
          lng >= METRO_BOUNDS.minLng &&
          lng <= METRO_BOUNDS.maxLng;
        setLoc({ phase: inMetro ? "matched" : "out_of_area" });
      },
      () => setLoc({ phase: "denied" }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  return (
    <div>
      <div className="mx-auto max-w-2xl">
        <button
          type="button"
          onClick={detect}
          disabled={loc.phase === "locating"}
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-brass-500/60 bg-gradient-to-b from-brass-500 to-brass-600 px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-ink-950 shadow-lg shadow-brass-500/20 transition hover:from-brass-400 hover:to-brass-500 disabled:opacity-60 md:hidden"
        >
          {loc.phase === "locating" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Locating you…
            </>
          ) : (
            <>
              <Crosshair className="h-4 w-4" /> Use my location
            </>
          )}
        </button>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search neighborhood or ZIP…"
            className="h-14 w-full rounded-2xl border border-ink-800 bg-ink-900/70 pl-12 pr-4 text-base outline-none transition-colors focus:border-brass-500 md:pr-44"
          />
          <button
            type="button"
            onClick={detect}
            disabled={loc.phase === "locating"}
            className="absolute right-2 top-1/2 hidden h-10 -translate-y-1/2 items-center gap-2 rounded-xl bg-brass-500 px-4 text-xs font-bold uppercase tracking-wider text-ink-950 transition hover:bg-brass-400 disabled:opacity-60 md:inline-flex"
          >
            {loc.phase === "locating" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Locating…
              </>
            ) : (
              <>
                <Crosshair className="h-4 w-4" /> Use my location
              </>
            )}
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] uppercase tracking-wider text-ink-500">
          Optional location check · confirms whether you appear inside our NYC service area
        </p>
      </div>

      {loc.phase === "denied" && (
        <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm">
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <AlertTriangle className="h-4 w-4" /> Location blocked
          </div>
          <p className="mt-1 text-xs text-ink-300">
            Type your neighborhood or ZIP above and we&rsquo;ll find your service area instantly.
          </p>
        </div>
      )}

      {loc.phase === "out_of_area" && (
        <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm">
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <AlertTriangle className="h-4 w-4" /> Outside our NYC service zone
          </div>
          <p className="mt-1 text-xs text-ink-300">
            Your position appears outside our standard bounds. The check is approximate; call with the project address
            if you would like us to confirm coverage.
          </p>
          <a href={BIZ.phoneHref} className="mt-3 inline-flex items-center gap-2 font-semibold text-brass-300">
            <Phone className="h-4 w-4" /> Call {BIZ.phone}
          </a>
        </div>
      )}

      {loc.phase === "matched" && (
        <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            You appear to be inside our Brooklyn, Manhattan &amp; Queens service area
          </div>
          <p className="mt-2 text-sm text-ink-300">
            Request a quote with your project address so we can confirm coverage and discuss scheduling.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/quote" className="rounded-full bg-brass-500 px-4 py-2 text-sm font-bold text-ink-950">
              Request a quote
            </Link>
            <a href={BIZ.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-brass-500/50 px-4 py-2 text-sm font-bold text-brass-300">
              <Phone className="h-4 w-4" /> Call {BIZ.phone}
            </a>
          </div>
        </div>
      )}

      <p className="mt-8 text-center text-sm text-ink-400">
        Showing {filtered.length} of {areas.length} areas
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((a) => (
          <Link
            key={a.slug}
            href={`/service-areas/${a.slug}`}
            className="group flex items-center justify-between gap-3 rounded-xl border border-ink-800 bg-ink-900/40 p-3 transition-all hover:-translate-y-0.5 hover:border-brass-500/40"
          >
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-brass-400" />
              <div>
                <div className="text-sm font-semibold">{a.name}</div>
                <div className="text-xs capitalize text-ink-400">
                  {a.kind === "city"
                    ? "City"
                    : a.kind === "neighborhood"
                    ? `${a.city} neighborhood`
                    : a.kind === "community"
                    ? "Community"
                    : `ZIP ${a.zip?.[0] ?? ""}`}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
