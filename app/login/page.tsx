import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AuthForm } from "../../components/AuthForm";
import { HomeLink, StarsRow } from "../../components/LoginBits";
import { Reveal } from "../../components/Reveal";

export const metadata: Metadata = {
  title: "Sign in — Seerah",
  description:
    "Sign in to Seerah or create a free account to track your Islamic courses and join a cohort.",
};

export default function LoginPage() {
  return (
    <div className="min-h-[100dvh] bg-zinc-50 font-sans text-zinc-950 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] dark:bg-zinc-950 dark:text-zinc-50">
      {/* Form column */}
      <div className="flex min-h-[100dvh] flex-col">
        <header className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <span
              aria-hidden
              className="grid size-8 place-items-center rounded-md bg-emerald-600 text-[15px] font-bold text-white dark:bg-emerald-500 dark:text-zinc-950"
            >
              S
            </span>
            <span className="text-[17px] font-semibold tracking-tight">
              Seerah
            </span>
          </Link>
          <HomeLink />
        </header>

        <main className="flex flex-1 items-center justify-center px-5 pb-12 sm:px-8 lg:px-12">
          <div className="w-full max-w-[440px]">
            <Reveal>
              <div className="rounded-[20px] border border-zinc-200 bg-white p-6 shadow-[0_24px_60px_-32px_rgba(9,9,11,0.25)] sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.7)]">
                <h1 className="text-2xl font-semibold leading-tight tracking-tighter sm:text-[28px]">
                  Continue your studies.
                </h1>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Sign in, or create a free account to track courses and join a
                  cohort.
                </p>

                <div className="mt-7">
                  <AuthForm />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-center font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                Demo only — nothing leaves your browser
              </p>
            </Reveal>
          </div>
        </main>

        <p className="px-5 pb-5 text-center font-mono text-[11px] text-zinc-400 sm:px-8 lg:px-12 lg:text-left dark:text-zinc-500">
          © 2026 Seerah · Made for learners
        </p>
      </div>

      {/* Visual column */}
      <aside className="relative hidden self-start overflow-hidden bg-zinc-900 lg:block lg:sticky lg:top-0 lg:h-[100dvh]">
        <Image
          src="/img/placeholder.jpg"
          alt="Students studying the Qur'an and Islamic books together"
          fill
          priority
          sizes="55vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/25"
        />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-8 xl:p-10">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
            Autumn cohort · applications open
          </p>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-zinc-950/50 px-3 py-1.5 font-mono text-[11px] text-white/80 backdrop-blur-sm">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            6 seats left
          </span>
        </div>

        <Reveal delay={0.12} className="absolute inset-x-0 bottom-0 p-8 xl:p-10">
          <div className="flex items-center gap-3">
            <StarsRow />
            <p className="font-mono text-xs text-white/70">
              4.9 · 2,300+ verified reviews
            </p>
          </div>

          <figure className="mt-5 max-w-md">
            <blockquote className="text-2xl font-medium leading-snug tracking-tight text-white xl:text-[26px]">
              “The structured lessons made Arabic much easier to approach.”
            </blockquote>
            <figcaption className="mt-4 text-sm text-white/70">
              <span className="font-semibold text-white">Priya S.</span>
              {" · "}Arabic course learner
            </figcaption>
          </figure>

          <dl className="mt-8 grid max-w-md grid-cols-3 divide-x divide-white/15 border-t border-white/15 pt-5">
            {[
              ["10k+", "learners"],
              ["12", "courses"],
              ["95%", "completion"],
            ].map(([v, l]) => (
              <div key={l} className="px-3 first:pl-0 last:pr-0">
                <dd className="font-mono text-lg font-semibold tabular-nums text-white">
                  {v}
                </dd>
                <dd className="mt-0.5 text-xs text-white/60">{l}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </aside>
    </div>
  );
}
