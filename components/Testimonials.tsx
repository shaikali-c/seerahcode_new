"use client";

import { Star } from "@phosphor-icons/react";
import Image from "next/image";
import { Reveal } from "./Reveal";

function Stars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} weight="fill" className="text-amber-500" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tighter text-zinc-950 md:text-4xl dark:text-zinc-50">
            Learners, in their own words.
          </h2>
        </Reveal>

        {/* Asymmetric: 1 featured + 2 stacked (not 3 equal cards) */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Reveal>
            <figure className="flex h-full flex-col justify-between overflow-hidden rounded-[20px] bg-zinc-950 p-7 text-white md:p-9 dark:bg-zinc-900 dark:ring-1 dark:ring-zinc-800">
              <div>
                <Stars />
                <blockquote className="mt-4 text-xl font-medium leading-snug tracking-tight md:text-2xl">
                  “I finally understood the context behind the verses I had
                  been reciting for years.”
                </blockquote>
              </div>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="relative size-11 overflow-hidden rounded-full">
                  <Image
                    src="/img/placeholder.jpg"
                    alt="Portrait of Lena, Qur'an course learner"
                    fill
                    sizes="44px"
                    loading="lazy"
                    className="object-cover"
                  />
                </span>
                <span>
                  <span className="block text-sm font-semibold">Lena K.</span>
                  <span className="block text-[13px] text-zinc-500 dark:text-zinc-400">
                    Qur’an course learner
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid gap-5">
            <Reveal delay={0.06}>
              <figure className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-6 md:p-7 dark:border-zinc-800 dark:bg-zinc-900/50">
                <Stars />
                <blockquote className="mt-3 text-[15px] font-medium leading-relaxed text-zinc-900 dark:text-zinc-100">
                  “The revision routine finally helped my memorization
                  stick.”
                </blockquote>
                <figcaption className="mt-4 text-[13px] text-zinc-500 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    Tomas R.
                  </span>{" "}
                  · Memorization course learner
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.12}>
              <figure className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-6 md:p-7 dark:border-zinc-800 dark:bg-zinc-900/50">
                <Stars />
                <blockquote className="mt-3 text-[15px] font-medium leading-relaxed text-zinc-900 dark:text-zinc-100">
                  “The structured lessons made Arabic much easier to
                  approach.”
                </blockquote>
                <figcaption className="mt-4 text-[13px] text-zinc-500 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    Priya S.
                  </span>{" "}
                  · Arabic course learner
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
