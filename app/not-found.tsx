import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";
import { Footer } from "../components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-white font-sans text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <SiteHeader />

      <main
        id="main-content"
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6"
      >
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tighter md:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          The page may have moved, or the link is wrong. Try the catalog —
          every course, curriculum, and price is listed there.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/courses"
            className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:translate-y-[1px] dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
          >
            Browse courses
          </Link>
          <Link
            href="/"
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-50 active:translate-y-[1px] dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            Go home
          </Link>
          <Link
            href="/faculty"
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-50 active:translate-y-[1px] dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            Meet the faculty
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
