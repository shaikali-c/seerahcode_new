"use client";

import { Star } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";

const STATS: { value: string; label: string; star?: boolean }[] = [
  { value: "10k+", label: "learners" },
  { value: "4.9", label: "avg rating", star: true },
  { value: "95%", label: "completion" },
];

export function TrustBar() {
  return (
    <section
      aria-label="Learner results"
      className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <dl className="grid grid-cols-3 divide-x divide-zinc-200 dark:divide-zinc-800">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.07}
              className="flex flex-col items-center justify-center px-2 py-5 text-center sm:px-4 md:py-6"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="flex items-baseline gap-1.5 font-mono text-2xl font-semibold tracking-tight text-zinc-950 sm:text-[1.75rem] dark:text-zinc-50">
                <span className="tabular-nums">{s.value}</span>
                {s.star ? (
                  <Star
                    size={15}
                    weight="fill"
                    className="translate-y-px text-amber-500"
                  />
                ) : null}
              </dd>
              <dd className="mt-1.5 text-xs text-zinc-500 sm:text-[13px] dark:text-zinc-400">
                {s.label}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
