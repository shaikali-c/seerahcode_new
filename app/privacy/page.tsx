import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/SiteHeader";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Seerah",
  description: "How Seerah collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-white font-sans text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <SiteHeader />

      <main
        id="main-content"
        className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 md:py-14"
      >
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
            Privacy
          </span>
        </nav>

        <h1 className="mt-6 text-3xl font-semibold tracking-tighter md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">
          Last updated September 2026
        </p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          <section>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              1. What we collect
            </h2>
            <p className="mt-2">
              Account details (name, email, phone), enrollment and payment
              metadata, and basic usage data needed to run courses. Payment
              card numbers are handled by our payment processor — we do not
              store them.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              2. How we use it
            </h2>
            <p className="mt-2">
              To create your account, deliver courses, send receipts and
              cohort updates, answer support requests, and improve the
              platform. We do not sell your personal data.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              3. Who can see it
            </h2>
            <p className="mt-2">
              Your teacher sees your name and your submitted work within the
              cohort. Payment details are visible only to our payment
              processor. We share data with service providers strictly to
              operate the service.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              4. Retention and your choices
            </h2>
            <p className="mt-2">
              We keep account data while your account is active and as
              required for receipts and legal obligations. You can request
              export or deletion of your account data at any time.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              5. Contact
            </h2>
            <p className="mt-2">
              Privacy questions:{" "}
              <a
                href="mailto:hello@seerah.school"
                className="font-semibold text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
              >
                hello@seerah.school
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
