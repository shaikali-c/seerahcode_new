import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Choose your course",
    body: "Explore courses based on your level and area of interest.",
  },
  {
    n: "02",
    title: "Start learning",
    body: "Follow structured lessons taught by qualified instructors.",
  },
  {
    n: "03",
    title: "Study and reflect",
    body: "Complete readings, exercises, discussions, and reflections.",
  },
  {
    n: "04",
    title: "Build lasting knowledge",
    body: "Complete the course with a stronger foundation and a clear path for continued study.",
  },
];

export function Outcomes() {
  return (
    <section className="bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tighter text-zinc-950 md:text-4xl dark:text-zinc-50">
                How enrollment works.
              </h2>
              <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                A clear path from choosing a course to building lasting
                knowledge. Most learners study a few hours a week.
              </p>
              <a
                href="#enroll"
                className="mt-6 inline-block rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:translate-y-[1px] dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
              >
                Enroll now
              </a>
            </Reveal>
          </div>
          <ol className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <li className="grid grid-cols-[56px_1fr] gap-4 py-6">
                  <span className="font-mono text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                      {s.title}
                    </h3>
                    <p className="mt-1 max-w-[58ch] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {s.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
