"use client";

import { CheckCircle, Clock, Users, Infinity as InfinityIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { Reveal } from "./Reveal";

const POINTS = [
  {
    title: "Learn through study and reflection",
    body: "Each week builds understanding through lessons, reading, reflection, and guided exercises.",
  },
  {
    title: "Small cohorts, qualified teachers",
    body: "Max 24 seats. Guidance and feedback from qualified instructors every week.",
  },
  {
    title: "Understanding over certificates",
    body: "Leave with a stronger foundation in essential Qur'anic knowledge and a path to continue.",
  },
];

export function AboutCourse() {
  return (
    <section id="program" className="scroll-mt-20 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid items-start gap-10 md:grid-cols-[1.05fr_1fr] md:gap-14">
          <Reveal>
            <div className="overflow-hidden rounded-[20px] border border-zinc-200 dark:border-zinc-800">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/img/placeholder.jpg"
                  alt="Teacher conducting an Islamic studies lesson with students"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="grid grid-cols-3 divide-x divide-zinc-200 bg-zinc-50 dark:divide-zinc-800 dark:bg-zinc-900/60">
                {[
                  { icon: Clock, v: "8 weeks", l: "part-time" },
                  { icon: Users, v: "24 max", l: "per cohort" },
                  { icon: InfinityIcon, v: "Lifetime", l: "access" },
                ].map((s) => (
                  <div key={s.l} className="flex flex-col items-center gap-1 px-2 py-4 text-center">
                    <s.icon size={18} className="text-emerald-700 dark:text-emerald-400" />
                    <p className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {s.v}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tighter text-zinc-950 md:text-4xl dark:text-zinc-50">
                One flagship program. Built for structured study.
              </h2>
              <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                The Foundations of Qur’anic Studies program runs eight weeks,
                part-time. You pick a track — Foundations, Recitation,
                Tajwid, Memorization, Tafsir, Arabic, or Themes — and learn
                through guided lessons, discussions, assignments, and teacher
                feedback. Short courses in the catalog below go deeper on
                single subjects.
              </p>
            </Reveal>
            <ul className="mt-8 space-y-5">
              {POINTS.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.06}>
                  <li className="flex gap-3.5">
                    <CheckCircle
                      size={22}
                      weight="fill"
                      className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                    />
                    <div>
                      <h3 className="text-[15px] font-semibold text-zinc-950 dark:text-zinc-50">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {p.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#courses"
                  className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-50 active:translate-y-[1px] dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
                >
                  Browse courses
                </a>
                <a
                  href="#enroll"
                  className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:translate-y-[1px] dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
                >
                  Enroll now
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
