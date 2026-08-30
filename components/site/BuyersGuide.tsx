import { SITE_COPY } from "@/lib/site-copy";

export function BuyersGuide() {
  return (
    <section className="border-t border-ink-800 py-16">
      <div className="mx-auto max-w-3xl space-y-5 px-4 text-sm text-ink-200 md:px-6 md:text-base">
        <header>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-brass-400">Buyer&apos;s guide</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink-50 md:text-3xl">
            {SITE_COPY.buyersTitle}
          </h2>
          <p className="mt-3 text-ink-300">{SITE_COPY.buyersIntro}</p>
        </header>
        {SITE_COPY.buyers.map((item) => (
          <p key={item.title}>
            <strong className="text-ink-50">{item.title}</strong> {item.body}
          </p>
        ))}
      </div>
    </section>
  );
}
