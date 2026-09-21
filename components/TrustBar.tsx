const PARTNERS = [
  { mark: "C", name: "Cairo" },
  { mark: "I", name: "Istanbul" },
  { mark: "J", name: "Jakarta" },
  { mark: "K", name: "Kuala Lumpur" },
  { mark: "L", name: "London" },
  { mark: "T", name: "Toronto" },
];

export function TrustBar() {
  return (
    <section
      aria-label="Learner locations"
      className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-8 sm:px-6 md:flex-row md:justify-between">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Learners studying from cities like
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {PARTNERS.map((p) => (
            <li key={p.name} className="flex items-center gap-2">
              <span
                aria-hidden
                className="grid size-6 place-items-center rounded-full border border-zinc-300 text-[11px] font-bold text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
              >
                {p.mark}
              </span>
              <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                {p.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
