"use client";

import { useState } from "react";
import { ArrowRight, CaretDown, Lightbulb, PlayCircle } from "@phosphor-icons/react";
import Link from "next/link";
import type { CourseSample } from "../data/courses";
import { track } from "../lib/analytics";

export function CourseSamplePanel({
  sample,
  courseId,
}: {
  sample: CourseSample;
  courseId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="sample"
      className="mt-10 overflow-hidden rounded-[20px] border border-emerald-700/25 bg-emerald-50/50 scroll-mt-24 dark:border-emerald-400/20 dark:bg-emerald-400/[0.06]"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
      >
        <span className="flex min-w-0 items-start gap-3.5">
          <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-emerald-600 text-white dark:bg-emerald-500 dark:text-zinc-950">
            <PlayCircle size={18} aria-hidden weight="fill" />
          </span>
          <span className="min-w-0">
            <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
              Free sample lesson
            </span>
            <span className="mt-1 block text-[15px] font-semibold text-zinc-950 dark:text-zinc-50">
              {sample.lesson}
            </span>
            <span className="mt-0.5 block text-[13px] text-zinc-600 dark:text-zinc-400">
              {open ? "Close the sample" : "Read lesson 1 — no payment needed"}
            </span>
          </span>
        </span>
        <CaretDown
          size={18}
          aria-hidden
          className={`shrink-0 text-emerald-700 transition-transform duration-300 dark:text-emerald-400 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-emerald-700/15 px-5 pb-6 pt-5 sm:px-6 dark:border-emerald-400/15">
            <p className="max-w-[62ch] text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              {sample.excerpt}
            </p>
            <ul className="mt-4 space-y-2.5">
              {sample.points.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-emerald-600 text-[11px] font-bold text-white dark:bg-emerald-400 dark:text-zinc-950"
                  >
                    ✓
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                <Lightbulb size={14} aria-hidden className="text-emerald-600 dark:text-emerald-400" />
                Reflect
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {sample.question}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href={`/enroll?course=${courseId}`}
                onClick={() => track("continue_to_payment", { courseId, source: "sample" })}
                className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:translate-y-[1px] dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
              >
                Continue to payment
                <ArrowRight
                  size={15}
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-2.5 text-sm font-semibold text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Close sample
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
