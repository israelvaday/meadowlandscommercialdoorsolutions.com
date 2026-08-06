import { BIZ } from "@/lib/business";

export function PaintingGlossary() {
  return (
    <section className="border-t border-ink-800 py-16">
      <div className="mx-auto max-w-3xl space-y-5 px-4 text-sm text-ink-200 md:px-6 md:text-base">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wider text-brass-400">Glossary</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
            Door terms, explained in plain language
          </h2>
          <p className="mt-3 text-ink-300">
            These are the terms {BIZ.name} uses when discussing scope, hardware, and installation expectations.
          </p>
        </header>

        <p>
          <strong className="text-white">Door slab</strong> &mdash; the door panel itself, separate from the frame,
          hardware, and casing.
        </p>
        <p>
          <strong className="text-white">Jamb</strong> &mdash; the vertical frame members the door hangs on; includes
          the hinge side and strike side.
        </p>
        <p>
          <strong className="text-white">Rough opening</strong> &mdash; the framed gap in the wall before the door
          assembly is installed.
        </p>
        <p>
          <strong className="text-white">Fire-rated assembly</strong> &mdash; a UL-listed door, frame, and hardware
          combination rated for a specific fire duration (e.g. 90 minutes).
        </p>
        <p>
          <strong className="text-white">Strike plate</strong> &mdash; the metal plate on the jamb that receives the
          latch or deadbolt; alignment affects whether the door closes securely.
        </p>
        <p>
          <strong className="text-white">Door closer</strong> &mdash; a mechanical device that controls swing speed
          and ensures self-closing for code compliance.
        </p>
        <p>
          <strong className="text-white">Weatherstripping</strong> &mdash; seals around the door perimeter to reduce
          drafts, noise, and moisture infiltration.
        </p>
        <p>
          <strong className="text-white">Punch list</strong> &mdash; the final walkthrough items addressed before
          cleanup and project closeout.
        </p>
      </div>
    </section>
  );
}
