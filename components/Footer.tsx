"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-white dark:bg-black dark:ring-1 dark:ring-zinc-800">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tighter md:text-4xl">
              Start with the May cohort.
            </h2>
            <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-zinc-400">
              A few hours a week, guided lessons, structured study.
              Applications close April 27.
            </p>
          </div>
          <a
            href="#enroll"
            className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-zinc-950 transition-all hover:bg-emerald-400 active:translate-y-[1px] active:scale-[0.98]"
          >
            Enroll now
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="flex flex-col justify-between gap-6 pt-8 text-sm text-zinc-400 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="grid size-7 place-items-center rounded-full bg-emerald-500 text-sm font-bold text-zinc-950"
            >
              S
            </span>
            <span className="font-semibold text-white">Seerah</span>
            <span className="font-mono text-xs">© 2026</span>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              ["Program", "#program"],
              ["About us", "#about"],
              ["Courses", "#courses"],
              ["Teachers", "#mentors"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="transition-colors hover:text-white">
                {label}
              </a>
            ))}
            <Link href="/faculty" className="transition-colors hover:text-white">
              Faculty
            </Link>
            <Link href="/login" className="transition-colors hover:text-white">
              Sign in
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
