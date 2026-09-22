"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { FAQS } from "../data/faq";
import { Reveal } from "./Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      id="faq"
      className="border-y border-zinc-200 bg-zinc-50 scroll-mt-20 dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
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
