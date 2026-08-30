import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { MAIN_AREAS, AREAS } from "@/lib/areas";

export function AreaTeaser() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brass-400">Service Areas</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Serving Jersey City, Hudson County &amp; the Meadowlands.
          </h2>
          <p className="mt-3 max-w-2xl text-ink-300">
            Commercial door systems across {AREAS.length} locations near 333 Washington St.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {MAIN_AREAS.map((a) => (
            <Link
              key={a.slug}
              href={`/service-areas/${a.slug}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-ink-800 bg-ink-900/50 p-4 transition-all hover:-translate-y-0.5 hover:border-brass-500/50"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-brass-500/10 text-brass-400">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="font-semibold">{a.name}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-ink-500 transition-all group-hover:translate-x-1 group-hover:text-brass-400" />
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-2 rounded-full border border-brass-500/40 bg-brass-500/10 px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-brass-300 transition-all hover:bg-brass-500/20"
          >
            Explore all {AREAS.length} service areas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
