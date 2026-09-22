"use client";

import Link from "next/link";
import { CheckCircle, ShieldCheck } from "@phosphor-icons/react";
import { inr } from "../data/courses";
import { COHORTS, PROGRAM } from "../data/program";
import { Reveal } from "./Reveal";

export function Enroll() {
  const discount = Math.round(
    (1 - PROGRAM.price / PROGRAM.oldPrice) * 100
  );
  const cohort = COHORTS[0];
  return (
    <section id="enroll" className="bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tighter text-zinc-950 md:text-4xl dark:text-zinc-50">
              One program. A complete learning library.
            </h2>
            <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Join the flagship program and receive access to the complete
              course library. You will review everything on the first
              enrollment screen — nothing is charged until the final step.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <ShieldCheck size={18} className="text-emerald-600 dark:text-emerald-400" />
              14-day full refund, no questions
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[20px] border border-zinc-200 bg-white p-7 shadow-[0_24px_60px_-28px_rgba(9,9,11,0.35)] md:p-8 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
                  {cohort.label}
                </p>
                <p className="rounded-full bg-emerald-50 px-3 py-1 font-mono text-xs font-semibold text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">
                  {cohort.seats}
                </p>
              </div>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {inr(PROGRAM.price)}
                </span>
                <span className="font-mono text-lg text-zinc-400 line-through">
                  {inr(PROGRAM.oldPrice)}
                </span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">
                  {discount}% off
                </span>
              </p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {cohort.date.replace("Starts ", "starts ")} · incl. GST
              </p>
              <ul className="mt-6 space-y-3">
                {PROGRAM.included.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle
                      size={18}
                      weight="fill"
                      className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/enroll"
                className="mt-7 block rounded-full bg-emerald-600 px-6 py-3.5 text-center text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:translate-y-[1px] active:scale-[0.99] dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
              >
                Enroll now
              </Link>
              <p className="mt-3 text-center text-xs text-zinc-500 dark:text-zinc-400">
                Step 1 reviews the program · payment is the last step
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
