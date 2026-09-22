import type { Metadata } from "next";
import Link from "next/link";
import { Catalog } from "../../components/Catalog";
import { SiteHeader } from "../../components/SiteHeader";
import { Footer } from "../../components/Footer";
import { COURSES } from "../../data/courses";

export const metadata: Metadata = {
  title: "Courses — Seerah",
  description: `Browse ${COURSES.length} structured Qur'anic courses in recitation, tajwid, memorization, tafsir, Arabic, and themes — with full curriculum and pricing before you pay.`,
};

export default function CoursesPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-white font-sans text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <SiteHeader />

      <main id="main-content" className="flex-1">
        <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-xs text-zinc-500 dark:text-zinc-400"
          >
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Home
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span aria-current="page" className="text-zinc-800 dark:text-zinc-200">
              Courses
            </span>
          </nav>
        </div>

        <Catalog />
      </main>

      <Footer />
    </div>
  );
}
