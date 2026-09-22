import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Browse the catalog",
    body: "Filter by subject and level, then open a course that fits your goals.",
  },
  {
    n: "02",
    title: "Review the course",
    body: "See the curriculum, what you will learn, and who teaches it — before you pay.",
  },
  {
    n: "03",
    title: "Pay securely",
    body: "Enter your details and pay by card or UPI. A GST invoice is included.",
  },
  {
    n: "04",
    title: "Start learning",
    body: "Get access, join the first teacher Q&A, and study a few hours a week.",
  },
];

export function Outcomes() {
  return (
    <section
      id="how"
      className="scroll-mt-20 border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tighter text-zinc-950 md:text-4xl dark:text-zinc-50">
                How enrollment works.
              </h2>
              <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Four clear steps from first browse to first lesson. You
                always see the full course details before payment.
              </p>
              <a
                href="#courses"
                className="mt-6 inline-block rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:translate-y-[1px] dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
              >
                Browse courses
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
