"use client";

import Link from "next/link";
import { track } from "../lib/analytics";

export function PaymentCtaButton({
  courseId,
  source,
  className,
  label = "Continue to payment",
}: {
  courseId: string;
  source: string;
  className?: string;
  label?: string;
}) {
  return (
    <Link
      href={`/enroll?course=${courseId}`}
      onClick={() => track("continue_to_payment", { courseId, source })}
      className={
        className ??
        "group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:translate-y-[1px] active:scale-[0.99] dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
      }
    >
      {label}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}
