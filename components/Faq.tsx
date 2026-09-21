"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";

const FAQS = [
  {
    q: "Are these courses suitable for beginners?",
    a: "Yes. Many courses start from the foundations and are labeled by level, so you can pick the right entry point and build up step by step.",
  },
  {
    q: "Who teaches the courses?",
    a: "Courses are taught by qualified instructors who lead lessons, answer questions, and review your work each week.",
  },
  {
    q: "Are the lessons live or recorded?",
    a: "Both. Weekly live lessons are supported by recorded lessons and study resources, so you can review anything you miss.",
  },
  {
    q: "Do I need prior knowledge?",
    a: "No. Beginner courses assume no background. Intermediate courses note what to study first in their descriptions.",
  },
  {
    q: "Do I receive access after completing a course?",
    a: "Yes. You keep lifetime access to completed courses, including recordings and study resources.",
  },
  {
    q: "Is there a certificate?",
    a: "Yes. You receive a certificate of completion when you finish a course and its required exercises.",
  },
  {
    q: "How much time should I study each week?",
    a: "Most learners study a few hours a week: one live lesson plus readings and short exercises at their own pace.",
  },
  {
    q: "Can I study at my own pace?",
    a: "Yes. Lessons are self-paced with weekly teacher Q&A, so you can study on your schedule and still get guidance.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="text-center">
          <h2 className="text-3xl font-semibold tracking-tighter text-zinc-950 md:text-4xl dark:text-zinc-50">
            Questions, answered.
          </h2>
        </Reveal>
        <div className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.03}>
                <div>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-[15px] font-semibold text-zinc-950 dark:text-zinc-50">
                      {f.q}
                    </span>
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-full border border-zinc-200 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      } dark:border-zinc-800`}
                    >
                      <CaretDown size={15} className="text-zinc-600 dark:text-zinc-300" />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] pb-5 opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="overflow-hidden text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {f.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
