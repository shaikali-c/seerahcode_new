import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

const MENTORS = [
  {
    name: "Bilal Ahmed",
    role: "Qur'an · Course instructor",
    alt: "Portrait of teacher Bilal Ahmed",
  },
  {
    name: "Fatima Noor",
    role: "Themes · Course instructor",
    alt: "Portrait of teacher Fatima Noor",
  },
  {
    name: "Hassan Ali",
    role: "Arabic · Course instructor",
    alt: "Portrait of teacher Hassan Ali",
  },
  {
    name: "Zainab Malik",
    role: "Tajwid · Course instructor",
    alt: "Portrait of teacher Zainab Malik",
  },
];

export function Mentors() {
  return (
    <section
      id="mentors"
      className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tighter text-zinc-950 md:text-4xl dark:text-zinc-50">
            Learn from qualified teachers.
          </h2>
          <p className="mx-auto mt-3 max-w-[56ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Every teacher supports learners weekly with lessons, Q&A, and
            guided feedback.
          </p>
        </Reveal>

        {/* Horizontal scroll-snap strip — different family from grids above */}
        <Reveal delay={0.08}>
          <ul className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0">
            {MENTORS.map((m) => (
              <li
                key={m.name}
                className="w-56 shrink-0 snap-start overflow-hidden rounded-[20px] border border-zinc-200 bg-white sm:w-auto dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <div className="relative aspect-square">
                  <Image
                    src="/img/placeholder.jpg"
                    alt={m.alt}
                    fill
                    sizes="(max-width: 640px) 224px, 300px"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                    {m.name}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    {m.role}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center sm:text-left">
            <Link
              href="/faculty"
              className="text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
            >
              Meet the full faculty →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
