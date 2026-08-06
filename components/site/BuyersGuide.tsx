import { BIZ } from "@/lib/business";

export function BuyersGuide() {
  return (
    <section className="border-t border-ink-800 py-16">
      <div className="mx-auto max-w-3xl space-y-5 px-4 text-sm text-ink-200 md:px-6 md:text-base">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wider text-brass-400">Buyer&apos;s guide</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
            How to compare door estimates in NYC
          </h2>
          <p className="mt-3 text-ink-300">
            A useful door estimate identifies the slab, frame, hardware, code requirements, and exclusions. Use this
            checklist before approving a scope.
          </p>
        </header>

        <p>
          <strong className="text-white">1. Compare the same components.</strong> Confirm which door slab, frame, hardware,
          weatherstripping, and trim are included and which are excluded.
        </p>
        <p>
          <strong className="text-white">2. Define framing and prep work.</strong> Jamb adjustments, header work, threshold
          replacement, and masonry or drywall repairs should be described instead of grouped into a vague &ldquo;prep&rdquo; line.
        </p>
        <p>
          <strong className="text-white">3. Record door and hardware specs.</strong> Note the manufacturer, fire rating,
          core type, finish, and hardware grade. Product selection affects security, code compliance, and longevity.
        </p>
        <p>
          <strong className="text-white">4. Clarify code and ADA requirements.</strong> Ask whether the quote addresses
          fire labels, self-closing hardware, clearances, and any DOB or FDNY documentation needed.
        </p>
        <p>
          <strong className="text-white">5. Plan hardware approval.</strong> Confirm who selects locksets, closers, and
          access-control prep, and when hardware must be locked to protect the schedule.
        </p>
        <p>
          <strong className="text-white">6. Review access, timing, and cleanup.</strong> Occupied buildings need phased
          scheduling. Confirm debris removal, protection of common areas, and the final walkthrough.
        </p>
        <p>
          {BIZ.name} serves Brooklyn, Manhattan, and Queens and answers project questions at {BIZ.phone}. Compare
          estimates only after the door type, hardware, framing, and closeout expectations are aligned.
        </p>
      </div>
    </section>
  );
}
