import { ClipboardList, Mail, Phone } from "lucide-react";
import { BIZ, hasPhone } from "@/lib/business";

export function MobileDock() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brass-500/20 bg-ink-950/95 backdrop-blur md:hidden">
      <div className={`mx-auto grid max-w-md ${hasPhone ? "grid-cols-3" : "grid-cols-2"}`}>
        {hasPhone && (
          <a
            href={BIZ.phoneHref}
            aria-label={`Call ${BIZ.name}`}
            className="flex flex-col items-center gap-1 py-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-brass-300"
          >
            <Phone className="h-5 w-5" />
            Call
          </a>
        )}
        <a
          href={BIZ.emailHref}
          aria-label="Email us"
          className="flex flex-col items-center gap-1 py-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-200"
        >
          <Mail className="h-5 w-5" />
          Email
        </a>
        <a
          href="/quote"
          aria-label="Get a free quote"
          className="flex flex-col items-center gap-1 py-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-brass-300"
        >
          <ClipboardList className="h-5 w-5" />
          Quote
        </a>
      </div>
    </div>
  );
}
