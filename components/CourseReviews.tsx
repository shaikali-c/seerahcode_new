"use client";

import { Star } from "@phosphor-icons/react";
import type { CourseReview } from "../data/courses";

export function CourseReviews({ reviews }: { reviews: CourseReview[] }) {
  if (reviews.length === 0) return null;
  return (
    <section aria-label="Learner reviews" className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight">
        What learners say
      </h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {reviews.map((r) => (
          <li
            key={r.name}
            className="flex flex-col justify-between rounded-[20px] border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/60"
          >
            <div>
              <div className="flex items-center gap-0.5" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} weight="fill" className="text-amber-500" />
                ))}
              </div>
              <blockquote className="mt-3 text-[15px] font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
            </div>
            <figcaption className="mt-4 text-[13px] text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {r.name}
              </span>{" "}
              · {r.meta}
            </figcaption>
          </li>
        ))}
      </ul>
    </section>
  );
}
