import type { CurriculumModule } from "./courses";

/**
 * The flagship cohort program sold on the home page and via /enroll
 * when no `?course=` param is present.
 */
export const PROGRAM = {
  id: "flagship",
  title: "Foundations of Qur'anic Studies",
  tagline: "Eight weeks, part-time, in a small cohort with a dedicated teacher.",
  level: "All levels" as const,
  instructor: "Seerah faculty",
  lessons: 30,
  hours: 8,
  weeks: 8,
  cohortSize: 24,
  price: 41999,
  oldPrice: 54999,
  image: "/img/placeholder.jpg",
  blurb:
    "Pick a track — Foundations, Recitation, Tajwid, Memorization, Tafsir, Arabic, or Themes — and study through guided lessons, readings, weekly teacher Q&A, and reflection exercises. Short courses in the catalog go deeper on single subjects.",
  outcomes: [
    "Follow a structured weekly plan instead of scattered clips",
    "Study with a qualified teacher in a cohort of 24 or fewer",
    "Complete readings, exercises, and reflections each week",
    "Leave with a clear path for continued study",
  ],
  curriculum: [
    { title: "Week 1 · Orientation and study habits", lessons: 4 },
    { title: "Weeks 2–3 · Core concepts in your track", lessons: 8 },
    { title: "Weeks 4–5 · Guided readings", lessons: 8 },
    { title: "Week 6 · Discussion and feedback", lessons: 4 },
    { title: "Weeks 7–8 · Synthesis and reflection", lessons: 6 },
  ] satisfies CurriculumModule[],
  included: [
    "Flagship program in one track, 8 weeks part-time",
    "Weekly live lessons and teacher Q&A",
    "Full course library access for a year",
    "Study resources, recordings, and reading lists",
    "Lifetime access to courses you complete",
  ],
  tracks: [
    "Foundations",
    "Recitation",
    "Tajwid",
    "Memorization",
    "Tafsir",
    "Arabic",
    "Themes",
  ],
};

export const COHORTS = [
  {
    id: "oct",
    label: "Autumn cohort",
    date: "Starts Oct 12 · 8 weeks, part-time",
    seats: "6 seats left",
    hot: true,
  },
  {
    id: "nov",
    label: "Winter cohort",
    date: "Starts Nov 16 · 8 weeks, part-time",
    seats: "Open enrollment",
    hot: false,
  },
];
