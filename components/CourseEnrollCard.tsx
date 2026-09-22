"use client";

import Link from "next/link";
import {
  ArrowRight,
  Certificate,
  ChatsCircle,
  Clock,
  Infinity as InfinityIcon,
  Play,
  Receipt,
  ShieldCheck,
} from "@phosphor-icons/react";
import { type Course } from "../data/courses";
import { track } from "../lib/analytics";

export function CourseEnrollCard({ course }: { course: Course }) {
  const includes = [
    { Icon: Play, text: `${course.lessons} lessons · ${course.hours}h of lessons` },
    { Icon: ChatsCircle, text: "Weekly teacher Q&A" },
    { Icon: Clock, text: "Self-paced, a few hrs a week" },
    { Icon: Certificate, text: "Certificate of completion" },
    { Icon: InfinityIcon, text: "Lifetime access + updates" },
    { Icon: Receipt, text: "GST invoice included" },
  ];

  return (
    <div className="rounded-[20px] border border-zinc-200 bg-white p-6 shadow-[0_24px_60px_-28px_rgba(9,9,11,0.35)] md:p-7 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
        About this course
      </p>
      <p className="mt-2 text-base font-semibold leading-snug text-zinc-950 dark:text-zinc-50">
        {course.title}
      </p>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        {course.level} · {course.lessons} lessons · {course.hours}h ·{" "}
        {course.instructor}
      </p>
      <ul className="mt-6 space-y-3 border-t border-zinc-100 pt-6 dark:border-zinc-800">
        {includes.map(({ Icon, text }) => (
          <li
            key={text}
            className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300"
          >
            <Icon
              size={18}
              className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
              aria-hidden
            />
            {text}
          </li>
        ))}
      </ul>
      <Link
        href={`/enroll?course=${course.id}`}
        onClick={() => track("continue_to_payment", { courseId: course.id, source: "sidebar" })}
        className="group mt-6 flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:translate-y-[1px] active:scale-[0.99] dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
      >
        Continue to payment
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>
      <p className="mt-2.5 text-center text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
        Next: your details, then payment options. Price is shown on the
        payment step.
      </p>
      <p className="mt-5 flex items-start gap-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
        <ShieldCheck
          size={15}
          className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
        />
        14-day full refund, no questions.
      </p>
    </div>
  );
}
