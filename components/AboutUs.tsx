"use client";

import Image from "next/image";
import Link from "next/link";
import { ChatsCircle, Hammer, Target } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";

const STATS = [
  { v: "10k+", l: "learners" },
  { v: "4.9", l: "avg rating" },
  { v: "95%", l: "completion rate" },
  { v: "8", l: "teachers" },
];

const VALUES = [
  {
    Icon: Hammer,
    title: "Understanding over certificates",
    body: "No disconnected clips. Structured lessons that build understanding week by week.",
  },
  {
    Icon: ChatsCircle,
    title: "Qualified teachers",
    body: "Learn from instructors who guide discussions, answer questions, and review your work.",
  },
  {
    Icon: Target,
    title: "Study and reflection",
    body: "We measure steady understanding — lessons, readings, and reflection — not hours watched.",
  },
];

export function AboutUs() {
  return (
    <section
      id="about"
      className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <div className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
            About us
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tighter text-zinc-950 md:text-4xl dark:text-zinc-50">
            A learning platform built for serious students of Islam.
          </h2>
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Created to make authentic Islamic knowledge structured,
            accessible, and easier to study consistently. Our courses combine
            traditional Islamic subjects with clear modern teaching methods.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {/* Story card */}
          <Reveal className="lg:col-span-2">
            <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
              <div className="relative aspect-[16/8]">
                <Image
                  src="/img/placeholder.jpg"
                  alt="Students attending an online Islamic class in a study circle"
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">
                  Our story
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                  Started to make systematic study easier.
                </h3>
                <p className="mt-2.5 max-w-[62ch] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Seerah began when a small group of teachers saw learners
                  trying to piece together Islam from disconnected short-form
                  content. We capped cohorts at twenty-four, organized core
                  subjects into clear weekly lessons, and made every week end
                  with reading, reflection, and guided exercises.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                  <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    Founded 2026 · Online Islamic education
                  </p>
                  <Link
                    href="/faculty"
                    className="text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
                  >
                    Meet the faculty →
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-5">
            {STATS.map((s, i) => (
              <Reveal key={s.l} delay={i * 0.05}>
                <div className="flex h-full flex-col justify-center rounded-[20px] border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="font-mono text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                    {s.v}
                  </p>
                  <p className="mt-1 text-[13px] text-zinc-500 dark:text-zinc-400">
                    {s.l}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <article className="h-full rounded-[20px] border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                <span className="grid size-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                  <v.Icon size={22} aria-hidden />
                </span>
                <h3 className="mt-4 text-[17px] font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {v.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {v.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
