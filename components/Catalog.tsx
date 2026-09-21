"use client";

import { useMemo, useState } from "react";
import {
  Clock,
  MagnifyingGlass,
  Play,
  SlidersHorizontal,
  Star,
  X,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, COURSES, LEVELS, inr } from "../data/courses";
import { Reveal } from "./Reveal";

type Sort = "popular" | "rating" | "price-low" | "price-high";

const SORT_LABELS: Record<Sort, string> = {
  popular: "Most popular",
  rating: "Highest rated",
  "price-low": "Price: low to high",
  "price-high": "Price: high to low",
};

export function Catalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");
  const [sort, setSort] = useState<Sort>("popular");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = COURSES.filter((c) => {
      const matchQ =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.blurb.toLowerCase().includes(q);
      const matchC = category === "All" || c.category === category;
      const matchL =
        level === "All" || c.level === level || c.level === "All levels";
      return matchQ && matchC && matchL;
    });
    const sorted = [...filtered];
    switch (sort) {
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        sorted.sort((a, b) => b.students - a.students);
    }
    return sorted;
  }, [query, category, level, sort]);

  const hasFilters =
    query.trim() !== "" || category !== "All" || level !== "All";

  return (
    <section
      id="courses"
      className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <div className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
            Course catalog
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tighter text-zinc-950 md:text-4xl dark:text-zinc-50">
            Qur’anic courses for focused study.
          </h2>
          <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Self-paced with teacher Q&A. Search by subject, instructor, or
            topic. All prices in INR, inclusive of GST.
          </p>
        </Reveal>

        {/* Search panel */}
        <Reveal delay={0.06}>
          <div className="mt-8 rounded-[20px] border border-zinc-200 bg-white p-4 sm:p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <label
              htmlFor="course-search"
              className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
            >
              Search courses
            </label>
            <div className="relative mt-2">
              <MagnifyingGlass
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                id="course-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “Tajwid”, “Memorization”, or “Tafsir”…"
                autoComplete="off"
                className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-11 pr-11 text-[15px] text-zinc-950 placeholder:text-zinc-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/25 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-emerald-400"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 active:translate-y-[calc(-50%+1px)] dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* category pills */}
            <div
              role="tablist"
              aria-label="Filter by category"
              className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1"
            >
              {CATEGORIES.map((c) => {
                const active = category === c;
                return (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCategory(c)}
                    className={
                      active
                        ? "shrink-0 rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-all active:translate-y-[1px] dark:bg-emerald-500 dark:text-zinc-950"
                        : "shrink-0 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:border-zinc-400 hover:bg-zinc-50 active:translate-y-[1px] dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                    }
                  >
                    {c}
                  </button>
                );
              })}
            </div>

            {/* level + sort */}
            <div className="mt-4 flex flex-col gap-3 border-t border-zinc-100 pt-4 sm:flex-row sm:items-center dark:border-zinc-800">
              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <SlidersHorizontal size={16} aria-hidden />
                <span id="filters-label">Refine</span>
              </div>
              <div
                aria-labelledby="filters-label"
                className="flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <label className="flex items-center gap-2 text-sm">
                  <span className="sr-only">Level</span>
                  <select
                    value={level}
                    onChange={(e) =>
                      setLevel(e.target.value as typeof level)
                    }
                    className="rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 focus:border-emerald-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                  >
                    {LEVELS.map((l) => (
                      <option key={l} value={l}>
                        {l === "All" ? "All levels" : l}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <span className="sr-only">Sort by</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as Sort)}
                    className="rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 focus:border-emerald-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                  >
                    {(Object.keys(SORT_LABELS) as Sort[]).map((s) => (
                      <option key={s} value={s}>
                        {SORT_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </label>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setCategory("All");
                      setLevel("All");
                    }}
                    className="text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <p
                aria-live="polite"
                className="font-mono text-xs text-zinc-500 sm:ml-auto dark:text-zinc-400"
              >
                {results.length} of {COURSES.length} courses
              </p>
            </div>
          </div>
        </Reveal>

        {/* Results */}
        {results.length > 0 ? (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((c, i) => (
              <Reveal key={c.id} delay={Math.min(i, 5) * 0.04}>
                <li className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-zinc-200 bg-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_44px_-20px_rgba(9,9,11,0.3)] dark:border-zinc-800 dark:bg-zinc-950 dark:hover:shadow-[0_20px_44px_-20px_rgba(0,0,0,0.8)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute left-3 top-3 flex gap-2">
                      {c.tag && (
                        <span className="rounded-full bg-zinc-950/90 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                          {c.tag}
                        </span>
                      )}
                      <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-zinc-800 backdrop-blur">
                        {c.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
                      {c.level} · {c.lessons} lessons
                    </p>
                    <h3 className="mt-1.5 text-[17px] font-semibold leading-snug tracking-tight text-zinc-950 dark:text-zinc-50">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {c.blurb}
                    </p>
                    <p className="mt-3 text-[13px] text-zinc-500 dark:text-zinc-400">
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                        {c.instructor}
                      </span>{" "}
                      · {c.role}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-[13px] text-zinc-500 dark:text-zinc-400">
                      <span className="inline-flex items-center gap-1 font-semibold text-zinc-800 dark:text-zinc-200">
                        <Star size={14} weight="fill" className="text-amber-500" />
                        {c.rating.toFixed(1)}
                      </span>
                      <span>({c.reviews.toLocaleString("en-IN")})</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={14} />
                        {c.hours}h
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Play size={13} />
                        {(c.students / 1000).toFixed(1)}k
                      </span>
                    </div>
                    <div className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                      <div className="flex items-center justify-between gap-3">
                        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          <span className="font-mono text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                            {inr(c.price)}
                          </span>
                          {c.oldPrice && (
                            <span className="font-mono text-sm text-zinc-400 line-through">
                              {inr(c.oldPrice)}
                            </span>
                          )}
                          {c.oldPrice && (
                            <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">
                              {Math.round((1 - c.price / c.oldPrice) * 100)}%
                              off
                            </span>
                          )}
                        </p>
                        <Link
                          href={`/courses/${c.id}`}
                          aria-label={`View ${c.title}`}
                          className="shrink-0 rounded-full border border-zinc-300 px-4 py-2 text-[13px] font-semibold text-zinc-900 transition-all hover:border-emerald-600 hover:bg-emerald-600 hover:text-white active:translate-y-[1px] dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-zinc-950"
                        >
                          View course
                        </Link>
                      </div>
                      <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                        Incl. GST
                      </p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-[20px] border border-dashed border-zinc-300 bg-white px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-950">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-zinc-100 dark:bg-zinc-900">
              <MagnifyingGlass size={24} className="text-zinc-500" />
            </div>
            <h3 className="mx-auto mt-5 max-w-sm text-lg font-semibold text-zinc-950 dark:text-zinc-50">
              No courses match “{query.trim()}”
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Try a broader term like “Qur’an” or “Arabic”, or clear the
              filters to browse the full catalog.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setLevel("All");
              }}
              className="mt-6 rounded-full bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:translate-y-[1px] dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
