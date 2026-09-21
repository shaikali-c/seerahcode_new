"use client";

import { useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";

const LINKS = [
  { label: "Program", href: "#program" },
  { label: "About us", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Teachers", href: "#mentors" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/85 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/85">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6"
      >
        <a href="#top" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-full bg-emerald-600 text-[15px] font-bold text-white"
          >
            S
          </span>
          <span className="text-[17px] font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Seerah
          </span>
          <span className="hidden rounded-full border border-zinc-200 px-2 py-0.5 font-mono text-[11px] text-zinc-500 sm:inline dark:border-zinc-800 dark:text-zinc-400">
            school
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 active:translate-y-[1px] dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/login"
            className="rounded-full px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 active:translate-y-[1px] dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Sign in
          </Link>
          <a
            href="#courses"
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 active:translate-y-[1px] dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            Browse courses
          </a>
          <a
            href="#enroll"
            className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:translate-y-[1px] active:scale-[0.98] dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
          >
            Enroll now
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-10 place-items-center rounded-full border border-zinc-200 text-zinc-800 active:translate-y-[1px] lg:hidden dark:border-zinc-800 dark:text-zinc-200"
        >
          {open ? <X size={20} /> : <List size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-zinc-200 bg-white px-4 pb-5 pt-2 lg:hidden dark:border-zinc-800 dark:bg-zinc-950">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-3 text-[15px] font-medium text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-3 text-[15px] font-medium text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Sign in
          </Link>
          <a
            href="#courses"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-3 text-[15px] font-medium text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Browse courses
          </a>
          <a
            href="#enroll"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-zinc-950 px-5 py-3 text-center text-sm font-semibold text-white dark:bg-emerald-500 dark:text-zinc-950"
          >
            Enroll now
          </a>
        </div>
      )}
    </header>
  );
}
