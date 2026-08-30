import Image from "next/image";
import { cn } from "@/lib/cn";
import { BIZ } from "@/lib/business";

export function LogoMark({
  className,
  title = BIZ.name,
  priority = false,
}: { className?: string; title?: string; priority?: boolean }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <span
      className={cn(
        "relative block h-10 w-10 shrink-0 select-none overflow-hidden rounded-md border border-brass-400/60 bg-ink-900 shadow-signal",
        className
      )}
    >
      <Image
        src={`${base}/logo-256.png`}
        alt={title}
        fill
        priority={priority}
        sizes="96px"
        className="object-cover"
      />
    </span>
  );
}

export function Logo({
  className,
  showWordmark = true,
  size = "md",
}: { className?: string; showWordmark?: boolean; size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const text = size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={dim} />
      {showWordmark && (
        <span className={cn("flex flex-col font-display font-extrabold leading-none tracking-tight", text)}>
          <span>Meadowlands</span>
          <span className="mt-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-brass-400/80">
            Commercial Door Solutions
          </span>
        </span>
      )}
    </span>
  );
}
