import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { BIZ } from "@/lib/business";
import { ContactCTA } from "@/components/site/ContactCTA";

export const metadata: Metadata = {
  title: "Business Hours",
  description: `${BIZ.name} hours: Monday–Friday 7:00 AM–6:00 PM, Saturday 8:00 AM–2:00 PM, and Sunday closed.`,
  alternates: { canonical: "/hours" },
};

function displayTime(value: string) {
  const [hourText, minute] = value.split(":");
  const hour = Number(hourText);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute} ${period}`;
}

export default function HoursPage() {
  return (
    <section className="relative overflow-hidden bg-aurora py-24">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-5xl px-4 text-center md:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-brass-500/40 bg-brass-500/10 px-4 py-2 text-sm font-semibold text-brass-300">
          <Clock className="h-4 w-4" /> Posted business hours
        </div>
        <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight md:text-7xl">
          Commercial door <span className="text-brass-gradient">hours</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-200">
          Contact {BIZ.name} during the schedule below. Quote requests received outside these hours can be reviewed
          during business hours.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {BIZ.hours.map((entry) => {
            const isClosed = "closed" in entry && entry.closed;
            return (
              <div
                key={entry.day}
                className={`rounded-2xl border px-3 py-4 text-center ${
                  isClosed
                    ? "border-ink-700 bg-ink-900/60"
                    : "border-emerald-500/30 bg-emerald-500/5"
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-wider ${isClosed ? "text-ink-400" : "text-emerald-300"}`}>
                  {entry.label}
                </p>
                <p className="mt-2 font-mono text-sm font-bold text-ink-50">
                  {isClosed ? "Closed" : `${displayTime(entry.open)}–${displayTime(entry.close)}`}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <ContactCTA size="lg" />
        </div>
      </div>
    </section>
  );
}
