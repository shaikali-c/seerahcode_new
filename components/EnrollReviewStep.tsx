"use client";

import {
  BookOpen,
  Certificate,
  CheckCircle,
  ChatsCircle,
  Clock,
  Infinity as InfinityIcon,
  Play,
  ShieldCheck,
  Star,
} from "@phosphor-icons/react";
import { type Course } from "../data/courses";
import { COHORTS, PROGRAM } from "../data/program";
import { CourseCover } from "./CourseCover";

interface Props {
  course: Course | null;
  cohortId: string;
  onCohortChange: (id: string) => void;
  track: string;
  onTrackChange: (track: string) => void;
  trackError?: string;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
      {children}
    </h3>
  );
}

export function EnrollReviewStep({
  course,
  cohortId,
  onCohortChange,
  track,
  onTrackChange,
  trackError,
}: Props) {
  const outcomes = course ? course.outcomes : PROGRAM.outcomes;
  const curriculum = course ? course.curriculum : PROGRAM.curriculum;
  const included = course
    ? [
        `${course.lessons} lessons · ${course.hours}h of video lessons`,
        "Weekly teacher Q&A",
        "Self-paced, a few hours a week",
        "Certificate of completion",
        "Lifetime access + updates",
        "GST invoice included",
      ]
    : PROGRAM.included;

  return (
    <div className="space-y-6">
      {/* Course header */}
      <section className="overflow-hidden rounded-[20px] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="grid gap-5 p-4 min-[400px]:p-6 sm:grid-cols-[180px_1fr] sm:items-start md:p-7">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-zinc-200 sm:aspect-[4/3] dark:border-zinc-800">
            <CourseCover
              category={course ? course.category : "Flagship"}
              className="absolute inset-0"
            />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                {course ? course.category : "Flagship program"}
              </span>
              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                {course ? course.level : `${PROGRAM.weeks} weeks · part-time`}
              </span>
            </div>
            <h2 className="mt-2.5 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              {course ? course.title : PROGRAM.title}
            </h2>
            <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">
              {course
                ? `${course.instructor} · ${course.role}`
                : `Taught by ${PROGRAM.instructor} · cohorts of ${PROGRAM.cohortSize}`}
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {course ? course.blurb : PROGRAM.tagline}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-zinc-500 dark:text-zinc-400">
              {course && (
                <span className="inline-flex items-center gap-1 font-semibold text-zinc-800 dark:text-zinc-200">
                  <Star size={14} weight="fill" className="text-amber-500" />
                  {course.rating.toFixed(1)} (
                  {course.reviews.toLocaleString("en-IN")})
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Play size={13} aria-hidden />
                {course ? course.lessons : PROGRAM.lessons} lessons
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} aria-hidden />
                {course ? course.hours : PROGRAM.hours}h
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Certificate size={14} aria-hidden />
                Certificate
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Cohort + track (program only) */}
      {!course && (
        <section className="rounded-[20px] border border-zinc-200 bg-white p-4 min-[400px]:p-6 md:p-7 dark:border-zinc-800 dark:bg-zinc-950">
          <SectionTitle>Choose your cohort</SectionTitle>
          <div
            role="radiogroup"
            aria-label="Cohort"
            className="mt-4 grid gap-3 sm:grid-cols-2"
          >
            {COHORTS.map((c) => {
              const selected = cohortId === c.id;
              return (
                <label key={c.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="cohort"
                    value={c.id}
                    checked={selected}
                    onChange={() => onCohortChange(c.id)}
                    className="peer sr-only"
                  />
                  <span
                    className={`block rounded-xl border p-4 transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-600/40 ${
                      selected
                        ? "border-emerald-600 bg-emerald-50/60 dark:border-emerald-400 dark:bg-emerald-400/10"
                        : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="min-w-0 truncate text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                        {c.label}
                      </span>
                      <span
                        className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold ${
                          c.hot
                            ? "bg-zinc-950 text-white dark:bg-emerald-500 dark:text-zinc-950"
                            : "bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
                        }`}
                      >
                        {c.seats}
                      </span>
                    </span>
                    <span className="mt-1 block text-[13px] text-zinc-500 dark:text-zinc-400">
                      {c.date}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>

          <div className="mt-4">
            <label
              htmlFor="enroll-track"
              className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
            >
              Track
            </label>
            <select
              id="enroll-track"
              value={track}
              onChange={(e) => onTrackChange(e.target.value)}
              aria-invalid={Boolean(trackError)}
              aria-describedby={trackError ? "enroll-track-error" : undefined}
              className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:ring-2 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 ${
                trackError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-zinc-300 focus:border-emerald-600 focus:ring-emerald-600/20 dark:border-zinc-700 dark:focus:border-emerald-400"
              }`}
            >
              <option value="">Select your track…</option>
              {PROGRAM.tracks.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {trackError && (
              <p
                id="enroll-track-error"
                className="mt-1.5 text-[13px] text-red-600 dark:text-red-400"
              >
                {trackError}
              </p>
            )}
          </div>
        </section>
      )}

      {/* What you'll learn */}
      <section className="rounded-[20px] border border-zinc-200 bg-white p-4 min-[400px]:p-6 md:p-7 dark:border-zinc-800 dark:bg-zinc-950">
        <SectionTitle>What you&apos;ll learn</SectionTitle>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {outcomes.map((o) => (
            <li
              key={o}
              className="flex items-start gap-2.5 rounded-xl bg-zinc-50 px-3.5 py-3 text-sm leading-relaxed text-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300"
            >
              <CheckCircle
                size={17}
                weight="fill"
                className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                aria-hidden
              />
              {o}
            </li>
          ))}
        </ul>
      </section>

      {/* Curriculum */}
      <section className="rounded-[20px] border border-zinc-200 bg-white p-4 min-[400px]:p-6 md:p-7 dark:border-zinc-800 dark:bg-zinc-950">
        <SectionTitle>Course content</SectionTitle>
        <p className="mt-1 text-[13px] text-zinc-500 dark:text-zinc-400">
          {curriculum.length} modules ·{" "}
          {course ? course.lessons : PROGRAM.lessons} lessons ·{" "}
          {course ? course.hours : PROGRAM.hours}h total
        </p>
        <ol className="mt-4 divide-y divide-zinc-100 rounded-xl border border-zinc-100 dark:divide-zinc-800 dark:border-zinc-800">
          {curriculum.map((m, i) => (
            <li
              key={m.title}
              className="flex items-center justify-between gap-4 px-4 py-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {m.title}
                </span>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                <BookOpen size={13} aria-hidden />
                {m.lessons}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* What's included + trust */}
      <section className="rounded-[20px] border border-zinc-200 bg-white p-4 min-[400px]:p-6 md:p-7 dark:border-zinc-800 dark:bg-zinc-950">
        <SectionTitle>What&apos;s included</SectionTitle>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {included.map((text) => (
            <li
              key={text}
              className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300"
            >
              <CheckCircle
                size={17}
                weight="fill"
                className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                aria-hidden
              />
              {text}
            </li>
          ))}
        </ul>
        <div className="mt-5 space-y-2.5 border-t border-zinc-100 pt-5 text-[13px] leading-relaxed text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          <p className="flex items-start gap-2">
            <ShieldCheck
              size={16}
              className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
              aria-hidden
            />
            14-day full refund, no questions asked. GST invoice included.
          </p>
          <p className="flex items-start gap-2">
            <ChatsCircle
              size={16}
              className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
              aria-hidden
            />
            Questions first? Write to{" "}
            <a
              href="mailto:hello@seerah.school"
              className="font-semibold text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
            >
              hello@seerah.school
            </a>{" "}
            before you pay.
          </p>
          <p className="flex items-start gap-2">
            <InfinityIcon
              size={16}
              className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
              aria-hidden
            />
            {course
              ? `Self-paced — start anytime, keep lifetime access after you complete it.`
              : `Cohort starts ${COHORTS.find((c) => c.id === cohortId)?.date.replace("Starts ", "").split(" ·")[0] ?? "Oct 12"} · 8 weeks, part-time.`}
          </p>
        </div>
      </section>
    </div>
  );
}
