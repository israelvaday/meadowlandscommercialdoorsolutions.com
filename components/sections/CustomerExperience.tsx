import { ClipboardCheck, MessageSquareText, ShieldCheck, Sparkles } from "lucide-react";
import { BIZ } from "@/lib/business";

const COMMITMENTS = [
  {
    Icon: ClipboardCheck,
    title: "A written scope",
    body: "We define the door type, hardware, framing adjustments, code requirements, and exclusions before work begins.",
  },
  {
    Icon: MessageSquareText,
    title: "Clear communication",
    body: "You receive practical scheduling updates and a direct way to ask questions about your project.",
  },
  {
    Icon: ShieldCheck,
    title: "Respect for the property",
    body: "We plan protection for floors, furnishings, occupied areas, and common spaces before installation or repair.",
  },
  {
    Icon: Sparkles,
    title: "Orderly closeout",
    body: "We remove project debris, review the completed scope with you, and address agreed punch-list items.",
  },
] as const;

export function CustomerExperience() {
  return (
    <section className="relative border-t border-ink-800 bg-ink-950 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brass-400">Customer experience</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
            What you can expect from {BIZ.name}.
          </h2>
          <p className="mt-4 text-ink-300">
            These are our service commitments, not customer testimonials or a published rating.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COMMITMENTS.map(({ Icon, title, body }) => (
            <article key={title} className="rounded-2xl border border-ink-800 bg-ink-900/60 p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brass-500/10 text-brass-400">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-extrabold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
