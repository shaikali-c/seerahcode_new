"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { type Course } from "../data/courses";
import { track } from "../lib/analytics";

export function MobileEnrollBar({ course }: { course: Course }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            {course.title}
          </p>
          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
            {course.lessons} lessons · {course.hours}h · price at payment step
          </p>
        </div>
        <Link
          href={`/enroll?course=${course.id}`}
          onClick={() => track("continue_to_payment", { courseId: course.id, source: "mobile" })}
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:translate-y-[1px] dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
        >
          Continue to payment
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
