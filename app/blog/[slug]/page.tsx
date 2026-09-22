import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, formatDate, getPost } from "../../../data/blog";
import { SiteHeader } from "../../../components/SiteHeader";
import { Footer } from "../../../components/Footer";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found — Seerah" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://seerah.school/blog/${post.slug}`,
      siteName: "Seerah",
      type: "article",
      publishedTime: post.date,
    },
  };
}

function ArticleJsonLd({ post }: { post: NonNullable<ReturnType<typeof getPost>> }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Seerah faculty" },
    publisher: { "@type": "Organization", name: "Seerah" },
    url: `https://seerah.school/blog/${post.slug}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white font-sans text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <ArticleJsonLd post={post} />
      <SiteHeader />

      <main id="main-content" className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14">
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
            <Link href="/blog" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Blog
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span aria-current="page" className="text-zinc-800 dark:text-zinc-200">
              {post.topic}
            </span>
          </nav>

          <header className="mt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
              {post.topic} · {formatDate(post.date)} · {post.readMins} min read
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-tighter md:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {post.description}
            </p>
          </header>

          <div className="mt-8 space-y-7 border-t border-zinc-200 pt-8 dark:border-zinc-800">
            {post.sections.map((s, i) => (
              <section key={s.heading ?? i}>
                {s.heading && (
                  <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                    {s.heading}
                  </h2>
                )}
                {s.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 40)}
                    className={`text-[16px] leading-relaxed text-zinc-700 dark:text-zinc-300 ${
                      s.heading ? "mt-2.5" : ""
                    } [&+&]:mt-4`}
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-[20px] border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Study it with a teacher.
            </h2>
            <p className="mt-1.5 max-w-[56ch] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              These notes are the short version. The courses go deeper, with
              curriculum, exercises, and weekly Q&amp;A — review everything
              before you pay.
            </p>
            <Link
              href="/courses"
              className="mt-4 inline-block rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:translate-y-[1px] dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
            >
              Browse courses
            </Link>
          </div>

          {/* More reading */}
          <section aria-label="More from the blog" className="mt-10">
            <h2 className="text-base font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Keep reading
            </h2>
            <ul className="mt-3 space-y-2">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 px-4 py-3.5 transition-all hover:border-emerald-600 dark:border-zinc-800 dark:hover:border-emerald-400"
                  >
                    <span className="min-w-0 truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      {p.title}
                    </span>
                    <span className="shrink-0 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {p.readMins} min
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
