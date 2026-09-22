"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Compass,
  GraduationCap,
} from "@phosphor-icons/react";
import Image from "next/image";
import { AREAS, FACULTY, coursesByInstructor } from "../data/faculty";
import { Reveal } from "./Reveal";

export function FacultyGrid() {
  const [area, setArea] = useState<(typeof AREAS)[number]>("All");

  const members = useMemo(
    () => FACULTY.filter((f) => area === "All" || f.area === area),
    [area]
  );

  return (
    <div>
      {/* Filter */}
      <div
        role="tablist"
        aria-label="Filter faculty by area"
        className="no-scrollbar flex gap-2 overflow-x-auto pb-1"
      >
        {AREAS.map((a) => {
          const active = area === a;
          return (
            <button
              key={a}
              role="tab"
              aria-selected={active}
              onClick={() => setArea(a)}
              className={
                active
                  ? "shrink-0 rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-all active:translate-y-[1px] dark:bg-emerald-500 dark:text-zinc-950"
                  : "shrink-0 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:border-zinc-400 hover:bg-zinc-50 active:translate-y-[1px] dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
              }
            >
              {a}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">
        {members.length} of {FACULTY.length} faculty
      </p>

      {/* Profiles */}
      <ul className="mt-6 grid gap-5 lg:grid-cols-2">
        {members.map((f, i) => {
          const courses = coursesByInstructor(f.name);
          return (
            <Reveal key={f.id} delay={Math.min(i, 3) * 0.05}>
              <li className="grid h-full overflow-hidden rounded-[20px] border border-zinc-200 bg-white sm:grid-cols-[190px_1fr] dark:border-zinc-800 dark:bg-zinc-950">
                <div className="relative aspect-[16/10] sm:aspect-auto sm:min-h-full">
                  <Image
                    src={f.photo}
                    alt={`Portrait of ${f.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 260px"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                      {f.name}
                    </h2>
                    <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                      {f.area}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[13px] font-medium text-emerald-700 dark:text-emerald-400">
                    {f.role}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {f.bio}
                  </p>

                  <dl className="mt-4 space-y-2 border-t border-zinc-100 pt-4 text-sm dark:border-zinc-800">
                    <div className="flex items-center gap-2.5">
                      <Briefcase size={16} className="shrink-0 text-zinc-400" aria-hidden />
                      <dt className="sr-only">Experience</dt>
                      <dd className="text-zinc-700 dark:text-zinc-300">{f.experience}</dd>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Compass size={16} className="shrink-0 text-zinc-400" aria-hidden />
                      <dt className="sr-only">Specialty</dt>
                      <dd className="text-zinc-700 dark:text-zinc-300">{f.specialty}</dd>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <GraduationCap size={16} className="shrink-0 text-zinc-400" aria-hidden />
                      <dt className="sr-only">Degree</dt>
                      <dd className="text-zinc-700 dark:text-zinc-300">{f.degree}</dd>
                    </div>
                  </dl>

                  {courses.length > 0 && (
                    <div className="mt-4">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                        Teaches
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {courses.map((c) => (
                          <Link
                            key={c.id}
                            href={`/courses/${c.id}`}
                            className="rounded-full border border-zinc-200 px-3 py-1.5 text-[13px] font-medium text-zinc-700 transition-all hover:border-emerald-600 hover:text-emerald-700 active:translate-y-[1px] dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
                          >
                            {c.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </li>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}
