"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, PlayCircle } from "@phosphor-icons/react";
import Image from "next/image";

export function Hero() {
  const reduce = useReducedMotion();
  const anim = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section id="top" className="bg-white dark:bg-zinc-950">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 md:grid-cols-2 md:gap-12 md:pb-20 md:pt-16">
        {/* Left: copy */}
        <div className="max-w-xl">
          <motion.p
            {...anim(0)}
            className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-emerald-700/20 bg-emerald-50 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-800 sm:gap-2 sm:px-3.5 sm:text-[11px] sm:tracking-[0.16em] dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            <span className="min-w-0 truncate">
              Autumn cohort · applications open
            </span>
          </motion.p>

          <h1
            aria-label="Learn Islam with clarity, depth, and purpose."
            className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tighter text-zinc-950 md:text-5xl lg:text-6xl dark:text-zinc-50"
          >
            {reduce ? (
              "Learn Islam with clarity, depth, and purpose."
            ) : (
              <span
                aria-hidden
                className="flex flex-wrap gap-x-[0.24em]"
              >
                {["Learn", "Islam", "with", "clarity,", "depth,", "and", "purpose."].map(
                  (w, i) => (
                    <span
                      key={w}
                      className="-mb-1 inline-block overflow-hidden pb-1 align-bottom"
                    >
                      <motion.span
                        className="inline-block will-change-transform"
                        initial={{ y: "112%" }}
                        animate={{ y: "0%" }}
                        transition={{
                          delay: 0.1 + i * 0.07,
                          duration: 0.7,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {w}
                      </motion.span>
                    </span>
                  )
                )}
              </span>
            )}
          </h1>

          <motion.p
            {...anim(0.16)}
            className="mt-4 max-w-[52ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
          >
            Structured Qur’anic learning with qualified teachers —
            recitation, tajwid, memorization, tafsir, and Arabic, taught
            from authentic sources with practical understanding.
          </motion.p>

          <motion.div {...anim(0.24)} className="mt-7 flex flex-wrap gap-3">
            <a
              href="#courses"
              className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:translate-y-[1px] active:scale-[0.98] dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
            >
              Browse courses
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition-all hover:border-zinc-400 hover:bg-zinc-50 active:translate-y-[1px] active:scale-[0.98] dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              <PlayCircle size={18} />
              How it works
            </a>
          </motion.div>
        </div>

        {/* Right: visual */}
        <motion.div
          {...anim(0.2)}
          className="relative overflow-hidden rounded-[20px] border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="relative aspect-[4/4.4] w-full sm:aspect-[4/3] md:aspect-[4/4.5]">
            <Image
              src="/img/placeholder.jpg"
              alt="Students studying the Qur'an together in a bright study circle"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/55 via-transparent to-transparent" />
          </div>

          {/* floating review card */}
          <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-[20px] border border-white/20 bg-white/95 p-3.5 shadow-[0_16px_40px_-16px_rgba(9,9,11,0.4)] backdrop-blur dark:border-zinc-700 dark:bg-zinc-950/95">
            <div className="relative size-11 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/img/placeholder.jpg"
                alt="Portrait of learner Amara"
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                “I finally understood the context behind the verses.”
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Amara · Qur’an course learner
              </p>
            </div>
          </div>

          {/* cohort badge */}
          <div className="absolute right-4 top-4 rounded-full bg-zinc-950/85 px-3.5 py-2 font-mono text-[11px] font-medium text-white backdrop-blur">
            Next cohort · Oct 12
          </div>
        </motion.div>
      </div>
    </section>
  );
}
