"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { HoursBadge } from "./HoursBadge";
import { ContactCTA } from "./ContactCTA";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/service-areas", label: "Areas" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="border-b border-brass-500/20 bg-ink-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brass-300/80 md:px-6">
          <span>333 Washington St · Jersey City</span>
          <span className="hidden sm:inline">Mon–Fri 0700–1800 · Sat 0800–1400</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="shrink-0">
          <Logo size="md" />
        </Link>
        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink-200 transition-colors hover:bg-brass-500/10 hover:text-brass-200"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <HoursBadge />
          <ContactCTA size="sm" showLabels className="gap-2" />
        </div>
        <button
          aria-label="Open menu"
          onClick={() => setOpen((o) => !o)}
          className="grid h-11 w-11 place-items-center rounded-md border border-brass-500/30 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <div
        className={cn(
          "overflow-hidden border-t border-ink-800 transition-all duration-300 lg:hidden",
          open ? "max-h-[32rem]" : "max-h-0"
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-ink-200 hover:bg-brass-500/10 hover:text-brass-200"
            >
              {n.label}
            </Link>
          ))}
          <div className="mt-3">
            <HoursBadge />
          </div>
          <div className="mt-3">
            <ContactCTA size="md" />
          </div>
        </div>
      </div>
    </header>
  );
}
