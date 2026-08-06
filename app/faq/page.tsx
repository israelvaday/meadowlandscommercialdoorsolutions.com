import type { Metadata } from "next";
import Image from "next/image";
import { BIZ } from "@/lib/business";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LongFormFaq } from "@/components/site/LongFormFaq";

const FAQ_SECTIONS = [
  {
    id: "scope",
    emoji: "📋",
    title: "Estimates & scope",
    description: "How door projects are defined before work begins.",
    items: [
      {
        q: "What information helps you prepare an estimate?",
        a: "The property address, door type, opening dimensions, current condition, hardware needs, building access, occupancy, and preferred timing are useful. Photos can help clarify the request, but some projects still require an on-site review.",
      },
      {
        q: "What should a door scope include?",
        a: "It should identify the slab, frame, hardware, weatherstripping, fire rating, framing adjustments, protection, access, cleanup, and change-order handling.",
      },
      {
        q: "Do you work on homes, businesses, and rentals?",
        a: "Yes. The service menu includes residential and commercial installation, custom fabrication, hardware supply, structural repair, fire-rated doors, storefront systems, emergency repair, and security upgrades.",
      },
    ],
  },
  {
    id: "hardware",
    emoji: "🔐",
    title: "Doors & hardware",
    description: "Fire ratings, hardware, sizing, and code compliance.",
    items: [
      {
        q: "When is a fire-rated door required?",
        a: "Multifamily, commercial, and mixed-use buildings in NYC often require UL-listed fire door assemblies in corridors, stairwells, and certain tenant separations. The scope should identify the required label and self-closing hardware.",
      },
      {
        q: "Can a door be repaired instead of replaced?",
        a: "Many binding, sagging, or latch problems stem from jamb settlement, hinge wear, or strike misalignment. Structural repair can restore operation while preserving original materials when possible.",
      },
      {
        q: "How do I choose hardware?",
        a: "Consider door weight, traffic, security goals, and ADA requirements. Locksets, closers, hinges, and panic hardware should be matched to the door and building use.",
      },
      {
        q: "How should I measure for a new door?",
        a: "Accurate on-site measurement accounts for jamb width, header height, floor clearance, swing direction, and existing casing. Pre-war and masonry buildings often need field verification before ordering.",
      },
    ],
  },
  {
    id: "process",
    emoji: "🚪",
    title: "Installation & process",
    description: "What happens before and during door work.",
    items: [
      {
        q: "What framing prep may be needed?",
        a: "Depending on condition, prep may include jamb straightening, header adjustments, threshold replacement, masonry or drywall repairs, and hinge reinforcement. Structural work outside the door scope should be identified separately.",
      },
      {
        q: "How are floors and common areas protected?",
        a: "The protection plan depends on the project. It may include covering flooring, planning for occupied hallways, and coordinating access in multifamily and commercial buildings.",
      },
      {
        q: "Can install dates change because of hardware lead times?",
        a: "Yes. Custom slabs, fire-rated assemblies, and specialty hardware may require ordering lead time. Emergency repairs may use temporary measures while permanent parts are sourced.",
      },
    ],
  },
  {
    id: "closeout",
    emoji: "✨",
    title: "Testing & closeout",
    description: "How the completed scope is reviewed.",
    items: [
      {
        q: "What happens during the final walkthrough?",
        a: "The completed work is reviewed against the agreed scope. Latch alignment, closer operation, and hardware function are tested. Any agreed adjustments should be documented before closeout.",
      },
      {
        q: "Do you haul away old doors?",
        a: "Old door removal and debris haul-away can be included in the written scope when requested. Confirm disposal expectations before work begins.",
      },
      {
        q: "What are your business hours?",
        a: "Sunday is closed. Monday through Friday hours are 7:00 AM to 6:00 PM, and Saturday hours are 8:00 AM to 2:00 PM.",
      },
    ],
  },
];

const ALL_FAQ_ITEMS = FAQ_SECTIONS.flatMap((section) => section.items);

export const metadata: Metadata = {
  title: "Door FAQ — Brooklyn & NYC",
  description: `Answers from ${BIZ.name} about door estimates, hardware, fire ratings, installation, structural repair, and closeout.`,
  alternates: { canonical: `${BIZ.url}/faq` },
};

export default function FAQPage() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative bg-aurora py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">FAQ</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
              Practical answers about <span className="text-brass-gradient">doors</span>.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-ink-200 md:mx-0">
              Scope, hardware, fire ratings, installation, structural repair, access, and closeout.
            </p>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-brass-500/30">
            <Image
              src={`${base}/photos/branding-generated--hero-hillman-door-nyc.png`}
              alt="NYC door supply and installation project inspiration"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-y border-ink-800 bg-ink-950 py-6">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <ul className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider md:text-sm">
            {FAQ_SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-900/70 px-3 py-1.5 text-ink-200 transition hover:border-brass-500/60 hover:text-brass-300"
                >
                  <span>{section.emoji}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-12 px-4 md:px-6">
          {FAQ_SECTIONS.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-28">
              <div className="mb-5 text-center">
                <div className="text-3xl">{section.emoji}</div>
                <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-1 text-sm text-ink-400">{section.description}</p>
              </div>
              <FAQAccordion items={[...section.items]} sectionId={section.id} />
            </div>
          ))}
        </div>
      </section>

      <LongFormFaq subject="NYC Door Services" kind="service" />
      <FinalCTA />
    </>
  );
}
