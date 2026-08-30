import { SITE_COPY } from "@/lib/site-copy";
import { BIZ } from "@/lib/business";

export function DoorGlossary() {
  return (
    <section className="border-t border-ink-800 py-16">
      <div className="mx-auto max-w-3xl space-y-5 px-4 text-sm text-ink-200 md:px-6 md:text-base">
        <header>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-brass-400">Glossary</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink-50 md:text-3xl">
            {SITE_COPY.glossaryTitle}
          </h2>
          <p className="mt-3 text-ink-300">{SITE_COPY.glossaryIntro}</p>
        </header>
        {SITE_COPY.glossary.map((item) => (
          <p key={item.term}>
            <strong className="text-ink-50">{item.term}</strong> &mdash; {item.definition}
          </p>
        ))}
        <p className="text-ink-400">
          {BIZ.name} uses these terms in written scopes from {BIZ.address.full}.
        </p>
      </div>
    </section>
  );
}
