import { MapPin, Radio } from "lucide-react";

export function ServiceMap({
  query,
  lat,
  lng,
  zoom = 13,
  title,
  height = 360,
  className,
}: {
  query?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  title?: string;
  height?: number;
  className?: string;
}) {
  const src =
    typeof lat === "number" && typeof lng === "number"
      ? `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&t=m&ie=UTF8&iwloc=&output=embed`
      : `https://www.google.com/maps?q=${encodeURIComponent(query ?? "")}&output=embed`;
  return (
    <div className={`hud-frame overflow-hidden rounded-2xl border border-brass-500/25 bg-ink-900/70 ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-2 border-b border-ink-800 px-4 py-2.5">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink-100">
          <MapPin className="h-4 w-4 text-brass-400" />
          {title ?? "Service area map"}
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300">
          <Radio className="h-3 w-3 animate-pulse" /> Live coverage
        </span>
      </div>
      <iframe
        src={src}
        title={title ?? "Service area map"}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ width: "100%", height, border: 0 }}
        allowFullScreen
      />
    </div>
  );
}
