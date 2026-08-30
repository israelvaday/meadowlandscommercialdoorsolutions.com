"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brass-400 text-ink-950 hover:bg-brass-300 shadow-signal",
  secondary:
    "bg-ink-800 text-ink-50 hover:bg-ink-700 border border-ink-700",
  ghost:
    "bg-transparent text-ink-50 hover:bg-ink-800/60 border border-ink-700",
  danger:
    "bg-danger text-white hover:bg-red-600",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: false;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-tight",
        "transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size }) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-tight",
        "transition-all duration-200 active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
