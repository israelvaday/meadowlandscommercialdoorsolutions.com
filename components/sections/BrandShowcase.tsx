import Image from "next/image";
import { AlertTriangle, Building2, DoorOpen, Home, Package } from "lucide-react";
import { BIZ } from "@/lib/business";
import { Reveal } from "@/components/site/Reveal";

const FRAME_DETAILS = [
  { slug: "residential-door-installation", Icon: Home, label: "Residential door inspiration" },
  { slug: "commercial-door-installation", Icon: Building2, label: "Commercial entrance systems" },
  { slug: "custom-door-fabrication", Icon: DoorOpen, label: "Custom fabrication" },
  { slug: "door-hardware-supply", Icon: Package, label: "Hardware & security" },
  { slug: "emergency-door-repair", Icon: AlertTriangle, label: "Serving Brooklyn & NYC" },
] as const;

export function BrandShowcase() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const frames = FRAME_DETAILS.map((frame) => ({
    ...frame,
    src: `${base}/photos/service-hero-${frame.slug}.png`,
  }));

  return (
    <section className="relative border-t border-ink-800 bg-ink-950 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">The {BIZ.name} approach</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Precision measurement. Lasting performance.
          </h2>
          <p className="mt-3 max-w-2xl text-ink-300">
            The imagery shown is project inspiration and represents the kind of door work we perform. It is not
            presented as a gallery of completed customer projects.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-6">
          <Reveal
            y={16}
            variant="fade"
            className="relative overflow-hidden rounded-3xl border border-ink-800 md:col-span-4 md:row-span-2"
          >
            <Image
              src={frames[0].src}
              alt={frames[0].label}
              width={1600}
              height={900}
              sizes="(max-width: 768px) 100vw, 66vw"
              className="h-full max-h-[34rem] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-brass-500/40 bg-ink-950/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brass-300 backdrop-blur">
                <DoorOpen className="h-3.5 w-3.5" />
                {frames[0].label}
              </div>
              <h3 className="mt-3 font-display text-2xl font-extrabold text-white md:text-3xl">
                A door plan shaped around your opening, use, and building code.
              </h3>
            </div>
          </Reveal>

          {frames.slice(1).map(({ slug, src, Icon, label }, index) => (
            <Reveal
              key={slug}
              y={16}
              variant="fade"
              delay={index * 0.05}
              className="relative overflow-hidden rounded-3xl border border-ink-800 md:col-span-2"
            >
              <Image
                src={src}
                alt={label}
                width={1600}
                height={900}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="h-56 w-full object-cover md:h-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-brass-500/40 bg-ink-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brass-300 backdrop-blur">
                  <Icon className="h-3 w-3" />
                  {label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
