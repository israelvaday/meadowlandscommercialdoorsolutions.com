import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BIZ } from "@/lib/business";
import { BLOG_POSTS } from "@/content/blog";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LongFormFaq } from "@/components/site/LongFormFaq";

export const metadata: Metadata = {
  title: { absolute: `Door Guides — ${BIZ.name}` },
  description:
    `Commercial door guides from ${BIZ.name} covering overhead doors, rolling steel, docks, fire ratings, and operators in Jersey City and the Meadowlands.`,
  alternates: { canonical: `${BIZ.url}/blog` },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogIndex() {
  const sorted = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  const featured = sorted[0];
  const rest = sorted.slice(1);
  return (
    <>
      <section className="relative bg-aurora py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">{BIZ.name} guides</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            <span className="text-brass-gradient">Commercial door</span> guides for Jersey City.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-ink-200">
            Installation, hardware, fire ratings, structural repair, code compliance, and project planning.
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-ink-400">
            Article imagery is project inspiration, not a gallery of completed customer work.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-ink-800 bg-ink-900/40 transition hover:-translate-y-0.5 hover:border-brass-500/40 md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] md:aspect-auto">
              <Image
                src={featured.heroImage}
                alt={featured.heroAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center gap-3 p-6 md:p-10">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-brass-500/40 bg-brass-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brass-300">
                Featured · {featured.category}
              </span>
              <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-4xl">
                {featured.title}
              </h2>
              <p className="text-ink-300 md:text-lg">{featured.excerpt}</p>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-ink-400">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> {formatDate(featured.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {featured.readMinutes} min read
                </span>
              </div>
              <span className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brass-400 group-hover:text-brass-300">
                Read the guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/40 transition hover:-translate-y-0.5 hover:border-brass-500/40"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={p.heroImage}
                    alt={p.heroAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-ink-700 bg-ink-900/70 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brass-300">
                    {p.category}
                  </span>
                  <h3 className="font-display text-lg font-extrabold leading-tight tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-ink-300">{p.excerpt}</p>
                  <div className="mt-auto flex items-center gap-3 pt-3 text-xs text-ink-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> {formatDate(p.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {p.readMinutes} min
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LongFormFaq subject="Commercial Door Services" kind="service" />

      <FinalCTA />
    </>
  );
}
