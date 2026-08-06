import Image from "next/image";
import { cn } from "@/lib/cn";
import { BIZ } from "@/lib/business";

/**
 * Hillman Door Supply brand mark.
 */
export function LogoMark({
  className,
  title = BIZ.name,
  priority = false,
}: { className?: string; title?: string; priority?: boolean }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <span
      className={cn(
        "relative block h-10 w-10 shrink-0 select-none overflow-hidden rounded-xl border border-brass-400/60 bg-ink-900 shadow-lg shadow-brass-500/20",
        className
      )}
    >
      <Image
        src={`${base}/icon.png`}
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
  const wordmark = "Hillman Door Supply";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={dim} />
      {showWordmark && (
        <span className={cn("font-display font-extrabold tracking-tight leading-none flex flex-col", text)}>
          <span>{wordmark}</span>
          <span className="mt-1 text-[9px] font-semibold tracking-[0.25em] text-brass-400/80 uppercase">
            Brooklyn · NYC
          </span>
        </span>
      )}
    </span>
  );
}
