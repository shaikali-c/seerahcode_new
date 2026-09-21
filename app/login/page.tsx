import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AuthForm } from "../../components/AuthForm";
import { HomeLink, StarsRow } from "../../components/LoginBits";

export const metadata: Metadata = {
  title: "Sign in — Seerah",
  description:
    "Sign in to Seerah or create a free account to track your Islamic courses and join a cohort.",
};

const AVATARS = [
  "seerah-face-1",
  "seerah-face-2",
  "seerah-face-3",
  "seerah-face-4",
];

function AvatarStack({ ring = "border-white" }: { ring?: string }) {
  return (
    <div className="flex -space-x-2.5">
      {AVATARS.map((seed) => (
        <span
          key={seed}
          className={`relative size-8 overflow-hidden rounded-full border-2 ${ring} bg-zinc-200 dark:bg-zinc-800`}
        >
          <Image
            src="/img/placeholder.jpg"
            alt=""
            fill
            sizes="32px"
            loading="lazy"
            className="object-cover"
          />
        </span>
      ))}
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative min-h-[100dvh] bg-zinc-50 font-sans text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Ambient decor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/4 size-[520px] rounded-full bg-emerald-400/20 blur-[130px] dark:bg-emerald-500/10" />
        <div className="absolute -bottom-40 right-1/4 size-[420px] rounded-full bg-emerald-300/25 blur-[130px] dark:bg-emerald-400/[0.07]" />
      </div>

      <div className="relative grid min-h-[100dvh] lg:grid-cols-[1.05fr_1fr]">
        {/* Form panel */}
        <div className="flex flex-col px-4 py-6 sm:px-8">
          <div className="mx-auto flex w-full max-w-md items-center justify-between">
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
            <HomeLink />
          </div>

          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8 sm:py-10">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              Welcome to Seerah
            </p>
            <h1 className="mt-2.5 text-[26px] font-semibold leading-tight tracking-tighter sm:text-3xl md:text-4xl">
              Learn in good company.
            </h1>
            <p className="mt-2.5 max-w-[48ch] text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              One account for cohorts, short courses, and teacher guidance.
            </p>

            {/* Mobile proof strip */}
            <div className="mt-5 flex items-center gap-3 lg:hidden">
              <AvatarStack />
              <div>
                <StarsRow />
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Loved by{" "}
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    10,000+ learners
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[20px] border border-zinc-200 bg-white p-4 shadow-[0_24px_60px_-32px_rgba(9,9,11,0.35)] min-[400px]:p-6 sm:mt-7 sm:p-7 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.8)]">
              <AuthForm />
            </div>

            <p className="mt-5 text-center font-mono text-xs text-zinc-400 dark:text-zinc-500">
              Demo only — nothing leaves your browser
            </p>
          </div>

          <p className="mx-auto w-full max-w-md pb-2 font-mono text-xs text-zinc-400 dark:text-zinc-500">
            © 2026 Seerah · Made for learners
          </p>
        </div>

        {/* Visual panel */}
        <aside className="relative hidden overflow-hidden lg:block">
          <Image
            src="/img/placeholder.jpg"
            alt="Students studying the Qur'an and Islamic books together"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-zinc-950/15 to-zinc-950/25" />

          {/* Cohort badge */}
          <div className="absolute left-8 top-8 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-zinc-950/60 px-4 py-2.5 text-[13px] font-medium text-white backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Spring cohort · 6 seats left
          </div>

          {/* Rating card */}
          <div className="absolute right-8 top-24 rounded-[20px] border border-white/20 bg-zinc-950/60 p-5 text-white backdrop-blur-md">
            <p className="font-mono text-3xl font-semibold tracking-tight">
              4.9
            </p>
            <div className="mt-1.5">
              <StarsRow />
            </div>
            <p className="mt-1.5 text-xs text-zinc-300">
              2,300+ verified reviews
            </p>
          </div>

          {/* Learners + quote */}
          <div className="absolute inset-x-8 bottom-8">
            <div className="mb-4 flex items-center gap-3">
              <AvatarStack ring="border-zinc-950/40" />
              <p className="text-[13px] text-zinc-200">
                Joined by{" "}
                <span className="font-semibold text-white">
                  10,000+ learners
                </span>{" "}
                this year
              </p>
            </div>
            <figure className="rounded-[20px] border border-white/20 bg-white/95 p-6 shadow-[0_16px_40px_-16px_rgba(9,9,11,0.5)] backdrop-blur dark:border-zinc-700 dark:bg-zinc-950/95">
              <StarsRow />
              <blockquote className="mt-3 text-lg font-medium leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
                “The structured lessons made Arabic much easier to approach.”
              </blockquote>
              <figcaption className="mt-3 text-[13px] text-zinc-500 dark:text-zinc-400">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  Priya S.
                </span>{" "}
                · Arabic course learner
              </figcaption>
            </figure>
          </div>
        </aside>
      </div>
    </div>
  );
}
