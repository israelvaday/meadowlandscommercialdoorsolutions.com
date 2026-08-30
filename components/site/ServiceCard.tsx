import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type ServiceCardProps = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  photoSrc: string;
  photoAlt: string;
  photoW: number;
  photoH: number;
  city?: string;
  priority?: boolean;
};

export function ServiceCard({
  slug, name, shortName, tagline, Icon, photoSrc, photoAlt, photoW, photoH, city, priority,
}: ServiceCardProps) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group block overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/60 transition-all hover:-translate-y-1 hover:border-brass-500/50 hover:shadow-signal"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={photoSrc}
          alt={photoAlt}
          width={photoW}
          height={photoH}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={priority}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
        {city && (
          <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-brass-500/30 bg-ink-950/80 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-brass-200 backdrop-blur">
            <MapPin className="h-3 w-3" />
            {city}
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-brass-300">
          <Icon className={cn("h-4 w-4")} />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]">{shortName}</span>
        </div>
        <h3 className="mt-2 font-display text-xl font-extrabold leading-tight text-white">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-300">{tagline}</p>
        <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider text-brass-300">
          Open spec <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
