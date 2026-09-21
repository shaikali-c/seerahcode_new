import type { Metadata } from "next";
import Link from "next/link";
import { FacultyGrid } from "../../components/FacultyGrid";
import { HomeLink } from "../../components/LoginBits";

export const metadata: Metadata = {
  title: "Faculty — Seerah",
  description:
    "Meet the Seerah teachers: qualified instructors in recitation, tajwid, memorization, tafsir, and Arabic who guide your study every week.",
};

export default function FacultyPage() {
  return (
    <div className="min-h-[100dvh] bg-white font-sans text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="border-b border-zinc-200/80 bg-white/85 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/85">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="grid size-8 place-items-center rounded-full bg-emerald-600 text-[15px] font-bold text-white"
            >
              S
            </span>
            <span className="text-[17px] font-semibold tracking-tight">
              Seerah
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <HomeLink />
            <Link
              href="/login"
              className="rounded-full px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 active:translate-y-[1px] dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
            Faculty · 8 teachers
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tighter md:text-4xl">
            Learn from qualified teachers.
          </h1>
          <p className="mt-2.5 max-w-[58ch] text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            Every teacher supports learners weekly in small groups. No guest
            cameos, no pre-recorded feedback — the people below lead your
            lessons and join your discussions.
          </p>
        </div>

        <div className="mt-8">
          <FacultyGrid />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-[20px] bg-zinc-950 p-7 md:flex-row md:items-center md:p-9 dark:bg-zinc-900 dark:ring-1 dark:ring-zinc-800">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              Work with them this spring.
            </h2>
            <p className="mt-1.5 max-w-[52ch] text-sm leading-relaxed text-zinc-400">
              Join the May 4 cohort and get matched with a teacher in your
              track for eight weeks.
            </p>
          </div>
          <Link
            href="/enroll"
            className="shrink-0 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-all hover:bg-emerald-400 active:translate-y-[1px] active:scale-[0.98]"
          >
            Enroll now
          </Link>
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
          © 2026 Seerah · Made for learners
        </p>
      </footer>
    </div>
  );
}
