import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "open" | "closed" | "brass";
}) {
  const tones = {
    default: "bg-ink-800 text-ink-100 border-ink-700",
    open:    "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    closed:  "bg-red-500/10 text-red-300 border-red-500/30",
    brass:   "bg-brass-500/10 text-brass-300 border-brass-500/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
