"use client";

import Link from "next/link";
import { ArrowRight, ArrowUp } from "@phosphor-icons/react";

const EXPLORE: [string, string][] = [
  ["Program", "/#program"],
  ["How it works", "/#how"],
  ["Courses", "/courses"],
  ["Faculty", "/faculty"],
  ["Blog", "/blog"],
  ["About", "/#about"],
  ["FAQ", "/#faq"],
];

const ACCOUNT: [string, string][] = [
  ["Enroll", "/enroll"],
  ["Sign in", "/login"],
  ["Terms", "/terms"],
  ["Privacy", "/privacy"],
];

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-white dark:bg-black dark:ring-1 dark:ring-zinc-800">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tighter md:text-4xl">
              Not sure where to start?
            </h2>
            <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-zinc-300 dark:text-zinc-400">
              Browse the catalog, open a course, and review the full
              curriculum before you pay a thing.
            </p>
          </div>
          <Link
            href="/courses"
            className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-zinc-950 transition-all hover:bg-emerald-400 active:translate-y-[1px] active:scale-[0.98]"
          >
            Browse courses
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="grid gap-8 border-b border-white/10 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="grid size-7 place-items-center rounded-full bg-emerald-500 text-sm font-bold text-zinc-950"
              >
                S
              </span>
              <span className="font-semibold text-white">Seerah</span>
            </div>
            <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-zinc-300 dark:text-zinc-400">
              Structured Qur&apos;anic education with qualified teachers —
              small cohorts, clear weekly plans.
            </p>
          </div>

          <nav aria-label="Explore">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Explore
            </p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300 dark:text-zinc-400">
              {EXPLORE.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Account">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Account
            </p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300 dark:text-zinc-400">
              {ACCOUNT.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Contact
            </p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300 dark:text-zinc-400">
              <li>
                <a
                  href="mailto:hello@seerah.school"
                  className="transition-colors hover:text-white"
                >
                  hello@seerah.school
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <ArrowUp size={14} aria-hidden />
                  Back to top
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 pt-6 text-sm text-zinc-400 md:flex-row md:items-center dark:text-zinc-500">
          <p className="font-mono text-xs">© 2026 Seerah · All rights reserved</p>
          <p className="font-mono text-xs">
            Prices in INR, inclusive of GST · 14-day refund
          </p>
        </div>
      </div>
    </footer>
  );
}
