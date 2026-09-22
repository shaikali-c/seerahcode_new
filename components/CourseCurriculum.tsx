"use client";

import { useState } from "react";
import { BookOpen, CaretDown, PlayCircle } from "@phosphor-icons/react";
import type { CurriculumModule } from "../data/courses";

export function CourseCurriculum({
  modules,
  totalLessons,
  totalHours,
}: {
  modules: CurriculumModule[];
  totalLessons: number;
  totalHours: number;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
        {modules.length} modules · {totalLessons} lessons · {totalHours}h total
        {" — "}tap a module to see every lesson
      </p>
      <ol className="mt-4 divide-y divide-zinc-200 rounded-[20px] border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
        {modules.map((m, i) => {
          const isOpen = open === i;
          return (
            <li key={m.title}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
              >
                <span className="flex min-w-0 items-center gap-3.5">
                  <span className="font-mono text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {m.title}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    {m.lessons} lessons
                  </span>
                  <CaretDown
                    size={15}
                    aria-hidden
                    className={`text-zinc-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  {m.items && (
                    <ul className="mx-5 ml-[3.25rem] space-y-1.5 border-l border-zinc-200 pl-4 dark:border-zinc-800">
                      {m.items.map((item, j) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                        >
                          <PlayCircle
                            size={14}
                            aria-hidden
                            className="mt-1 shrink-0 text-emerald-600/70 dark:text-emerald-400/70"
                          />
                          <span>
                            <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                              {String(j + 1).padStart(2, "0")}
                            </span>{" "}
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
        <BookOpen size={13} aria-hidden />
        Every lesson includes a reading, worked examples, and a short
        exercise.
      </p>
    </>
  );
}
