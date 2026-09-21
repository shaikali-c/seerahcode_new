import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, inr } from "../../../data/courses";
import { FACULTY } from "../../../data/faculty";
import { CourseEnrollCard } from "../../../components/CourseEnrollCard";
import { HomeLink } from "../../../components/LoginBits";

export function generateStaticParams() {
  return COURSES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = COURSES.find((c) => c.id === id);
  if (!course) return { title: "Course not found — Seerah" };
  return {
    title: `${course.title} — Seerah`,
    description: `${course.blurb} Rated ${course.rating.toFixed(1)} by ${course.reviews.toLocaleString("en-IN")} learners. ${inr(course.price)}, incl. GST.`,
  };
}

const HOW_IT_WORKS = [
  {
    n: "01",
    title: "Learn at your pace",
    text: "Short lessons with readings and exercises you can finish in an evening.",
  },
  {
    n: "02",
    title: "Get guidance weekly",
    text: "Bring your questions to teacher Q&A and leave with clearer understanding.",
  },
  {
    n: "03",
    title: "Build lasting knowledge",
    text: "Every course ends with reflection exercises and a clear path for continued study.",
  },
];

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = COURSES.find((c) => c.id === id);
  if (!course) notFound();

  const faculty = FACULTY.find((f) => f.name === course.instructor);
  const moreFromInstructor = COURSES.filter(
    (c) => c.instructor === course.instructor && c.id !== course.id
  );
  const related = [
    ...COURSES.filter(
      (c) => c.category === course.category && c.id !== course.id
    ),
    ...COURSES.filter(
      (c) => c.category !== course.category && c.id !== course.id
    ),
  ].slice(0, 3);

  return (
    <div className="min-h-[100dvh] bg-white font-sans text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="border-b border-zinc-200/80 bg-white/85 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/85">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="grid size-8 place-items-center rounded-full bg-emerald-600 text-[15px] font-bold text-white"
            >
              S
            </span>
            <span className="text-[17px] font-semibold tracking-tight">
              Seerah
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <HomeLink />
            <Link
              href="/login"
              className="rounded-full px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 active:translate-y-[1px] dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100">
            Home
          </Link>
          <span aria-hidden className="mx-2">/</span>
          <Link href="/#courses" className="hover:text-zinc-900 dark:hover:text-zinc-100">
            Courses
          </Link>
          <span aria-hidden className="mx-2">/</span>
          <span aria-current="page" className="text-zinc-800 dark:text-zinc-200">
            {course.category}
          </span>
        </nav>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main column */}
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] border border-zinc-200 dark:border-zinc-800">
              <Image
                src={course.image}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover"
              />
              <div className="absolute left-4 top-4 flex gap-2">
                {course.tag && (
                  <span className="rounded-full bg-zinc-950/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {course.tag}
                  </span>
                )}
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-800 backdrop-blur">
                  {course.level}
                </span>
              </div>
            </div>

            <p className="mt-6 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              {course.category} · {course.lessons} lessons · {course.hours}h
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tighter md:text-4xl">
              {course.title}
            </h1>
            <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {course.blurb}
            </p>

            <dl className="mt-6 grid grid-cols-3 gap-3 sm:max-w-md">
              {[
                {
                  dt: "Rating",
                  dd: `${course.rating.toFixed(1)} · ${course.reviews.toLocaleString("en-IN")} reviews`,
                },
                {
                  dt: "Learners",
                  dd: `${(course.students / 1000).toFixed(1)}k enrolled`,
                },
                { dt: "Level", dd: course.level },
              ].map((s) => (
                <div
                  key={s.dt}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-3 sm:px-4 dark:border-zinc-800 dark:bg-zinc-900/60"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
                    {s.dt}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {s.dd}
                  </dd>
                </div>
              ))}
            </dl>

            {/* How it works */}
            <h2 className="mt-10 text-xl font-semibold tracking-tight">
              How this course works
            </h2>
            <ol className="mt-4 grid gap-3 sm:grid-cols-3">
              {HOW_IT_WORKS.map((s) => (
                <li
                  key={s.n}
                  className="rounded-[20px] border border-zinc-200 p-5 dark:border-zinc-800"
                >
                  <p className="font-mono text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    {s.n}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                    {s.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {s.text}
                  </p>
                </li>
              ))}
            </ol>

            {/* Instructor */}
            <h2 className="mt-10 text-xl font-semibold tracking-tight">
              Your instructor
            </h2>
            <div className="mt-4 flex flex-col gap-5 rounded-[20px] border border-zinc-200 p-6 sm:flex-row sm:items-start dark:border-zinc-800">
              {faculty && (
                <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl">
                  <Image
                    src={faculty.photo}
                    alt={`Portrait of ${faculty.name}`}
                    fill
                    sizes="80px"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                  {course.instructor}
                </p>
                <p className="text-sm text-emerald-700 dark:text-emerald-400">
                  {course.role}
                </p>
                {faculty && (
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {faculty.experience} · {faculty.specialty} · {faculty.degree}
                  </p>
                )}
                <Link
                  href="/faculty"
                  className="mt-2 inline-block text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
                >
                  Meet the full faculty →
                </Link>
              </div>
            </div>

            {/* More from instructor */}
            {moreFromInstructor.length > 0 && (
              <>
                <h2 className="mt-10 text-xl font-semibold tracking-tight">
                  More from {course.instructor.split(" ")[0]}
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {moreFromInstructor.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/courses/${c.id}`}
                        className="flex h-full items-center justify-between gap-3 rounded-2xl border border-zinc-200 p-4 transition-all hover:border-emerald-600 active:translate-y-[1px] dark:border-zinc-800 dark:hover:border-emerald-400"
                      >
                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {c.title}
                        </span>
                        <span className="shrink-0 font-mono text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                          {inr(c.price)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Related */}
            <h2 className="mt-10 text-xl font-semibold tracking-tight">
              Keep exploring
            </h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-3">
              {related.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/courses/${c.id}`}
                    className="group block overflow-hidden rounded-[20px] border border-zinc-200 transition-all hover:-translate-y-1 dark:border-zinc-800"
                  >
                    <span className="relative block aspect-[16/10] overflow-hidden">
                      <Image
                        src={c.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, 220px"
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </span>
                    <span className="block p-4">
                      <span className="block truncate text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                        {c.title}
                      </span>
                      <span className="mt-1 block font-mono text-[13px] text-zinc-600 dark:text-zinc-400">
                        {inr(c.price)} · {c.rating.toFixed(1)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-6">
            <CourseEnrollCard course={course} />
          </aside>
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
          © 2026 Seerah · Made for learners
        </p>
      </footer>
    </div>
  );
}
