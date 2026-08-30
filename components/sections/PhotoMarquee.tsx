import Image from "next/image";
import { SERVICES } from "@/content/services";
import { BIZ } from "@/lib/business";

export function PhotoMarquee() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const photos = SERVICES.map((service) => ({
    id: service.slug,
    src: `${base}/photos/service-hero-${service.slug}.webp`,
    alt: `${service.name} project inspiration`,
  }));
  const doubled = [...photos, ...photos];
  return (
    <section className="relative overflow-hidden border-y border-ink-800 bg-ink-950 py-12">
      <div className="mx-auto mb-6 flex max-w-7xl flex-col items-center px-4 text-center md:px-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brass-400">Project inspiration</p>
        <h2 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">
          The kind of commercial door work we perform in Jersey City.
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-400">
          Inspiration imagery is illustrative and is not presented as completed customer projects.
        </p>
      </div>
      <div className="relative">
        <div className="marquee-track flex gap-4 w-max">
          {doubled.map((p, i) => (
            <div
              key={`${p.id}-${i}`}
              className="relative h-44 w-64 shrink-0 overflow-hidden rounded-2xl border border-ink-800 md:h-56 md:w-80"
            >
              <Image
                src={p.src}
                alt={`${p.alt} from ${BIZ.name}`}
                width={1600}
                height={900}
                sizes="(max-width: 768px) 256px, 320px"
                draggable={false}
                className="pointer-events-none h-full w-full select-none object-cover"
              />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ink-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink-950 to-transparent" />
      </div>
    </section>
  );
}
