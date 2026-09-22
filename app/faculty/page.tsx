import type { Metadata } from "next";
import Link from "next/link";
import { FacultyGrid } from "../../components/FacultyGrid";
import { SiteHeader } from "../../components/SiteHeader";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "Faculty — Seerah",
  description:
    "Meet the Seerah teachers: qualified instructors in recitation, tajwid, memorization, tafsir, and Arabic who guide your study every week.",
};

export default function FacultyPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-white font-sans text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <SiteHeader />

      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 md:py-14"
      >
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tighter md:text-4xl">
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
              Work with them this autumn.
            </h2>
            <p className="mt-1.5 max-w-[52ch] text-sm leading-relaxed text-zinc-400">
              Join the October 12 cohort and get matched with a teacher in
              your track for eight weeks.
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

      <Footer />
    </div>
  );
}
