"use client";

import Link from "next/link";
import {
  Certificate,
  ChatsCircle,
  Clock,
  Infinity as InfinityIcon,
  Play,
  Receipt,
  ShieldCheck,
} from "@phosphor-icons/react";
import { inr, type Course } from "../data/courses";

export function CourseEnrollCard({ course }: { course: Course }) {
  const discount = course.oldPrice
    ? Math.round((1 - course.price / course.oldPrice) * 100)
    : 0;
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
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {inr(course.price)}
        </span>
        {course.oldPrice && (
          <span className="font-mono text-base text-zinc-400 line-through">
            {inr(course.oldPrice)}
          </span>
        )}
        {discount > 0 && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">
            {discount}% off
          </span>
        )}
      </p>
      <p className="mt-1.5 text-[13px] text-zinc-500 dark:text-zinc-400">
        Incl. GST
      </p>
      <Link
        href={`/enroll?course=${course.id}`}
        className="mt-5 block rounded-full bg-emerald-600 px-6 py-3.5 text-center text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:translate-y-[1px] active:scale-[0.99] dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
      >
        Enroll now
      </Link>
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
