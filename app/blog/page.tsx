import type { Metadata } from "next";
import Link from "next/link";
import { POSTS, formatDate } from "../../data/blog";
import { SiteHeader } from "../../components/SiteHeader";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "Blog — Seerah",
  description:
    "Practical notes on Qur'anic study, memorization, tajwid, and Arabic — from the Seerah faculty.",
};

export default function BlogPage() {
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

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
              Blog
            </span>
          </nav>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold tracking-tighter md:text-4xl">
              Notes from the faculty.
            </h1>
            <p className="mt-2.5 max-w-[58ch] text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              Short, practical writing on how to study the Qur&apos;an,
              sustain memorization, and read Arabic with understanding.
            </p>
          </div>

          <ul className="mt-10 space-y-4">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group grid gap-3 rounded-[20px] border border-zinc-200 p-6 transition-all hover:-translate-y-0.5 hover:border-emerald-600 sm:grid-cols-[1fr_auto] sm:items-center dark:border-zinc-800 dark:hover:border-emerald-400"
                >
                  <span className="min-w-0">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                      {p.topic} · {formatDate(p.date)} · {p.readMins} min read
                    </span>
                    <span className="mt-1.5 block text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                      {p.title}
                    </span>
                    <span className="mt-1 block max-w-[70ch] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {p.description}
                    </span>
                  </span>
                  <span className="shrink-0 justify-self-start rounded-full border border-zinc-300 px-4 py-2 text-[13px] font-semibold text-zinc-900 transition-all group-hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white sm:justify-self-end dark:border-zinc-700 dark:text-zinc-100 dark:group-hover:border-emerald-400 dark:group-hover:bg-emerald-500 dark:group-hover:text-zinc-950">
                    Read
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
            Want the structured version of these notes?{" "}
            <Link
              href="/courses"
              className="font-semibold text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
            >
              Browse courses →
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
