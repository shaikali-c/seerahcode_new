import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { EnrollForm } from "../../components/EnrollForm";
import { HomeLink } from "../../components/LoginBits";

export const metadata: Metadata = {
  title: "Enroll — Seerah",
  description:
    "Secure your seat in the next Seerah cohort. Eight weeks, part-time, with teacher guidance and a 14-day refund.",
};

export default function EnrollPage() {
  return (
    <div className="min-h-[100dvh] bg-zinc-50 font-sans text-zinc-950 dark:bg-zinc-900/40 dark:text-zinc-50">
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
            Enrollment · 2026 cohorts
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tighter md:text-4xl">
            Secure your seat.
          </h1>
          <p className="mt-2.5 max-w-[56ch] text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            Eight weeks, part-time, a few hours a week. Join 24 learners with
            a dedicated teacher — refundable for 14 days.
          </p>
        </div>
        <div className="mt-8">
          <Suspense
            fallback={
              <div className="rounded-[20px] border border-zinc-200 bg-white p-8 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                Loading checkout…
              </div>
            }
          >
            <EnrollForm />
          </Suspense>
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
          © 2026 Seerah · Questions? Write to hello@seerah.school
        </p>
      </footer>
    </div>
  );
}
