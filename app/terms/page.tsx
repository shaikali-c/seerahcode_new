import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/SiteHeader";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Seerah",
  description: "The terms that govern your use of Seerah courses and cohorts.",
};

export default function TermsPage() {
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
            Terms
          </span>
        </nav>

        <h1 className="mt-6 text-3xl font-semibold tracking-tighter md:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">
          Last updated September 2026
        </p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          <section>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              1. The service
            </h2>
            <p className="mt-2">
              Seerah provides online courses and cohort programs in Qur&apos;anic
              studies. Lessons are delivered on our platform; live sessions run
              at scheduled times announced before each cohort.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              2. Accounts
            </h2>
            <p className="mt-2">
              You are responsible for the accuracy of the information you
              provide and for keeping your login credentials secure. One
              account is for one learner unless we agree otherwise in writing.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              3. Payments and refunds
            </h2>
            <p className="mt-2">
              Prices are shown in INR and include GST. You can request a full
              refund within 14 days of purchase if you have not completed a
              substantial portion of the course. Payment is processed securely;
              we never store full card numbers.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              4. Course access
            </h2>
            <p className="mt-2">
              Purchased courses include lifetime access to the lessons you
              completed, plus updates we ship to that course. Cohort programs
              include library access for the period stated at checkout.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              5. Acceptable use
            </h2>
            <p className="mt-2">
              Do not share, resell, or record course materials for
              redistribution. Live sessions may not be recorded by learners
              without the teacher&apos;s consent.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              6. Contact
            </h2>
            <p className="mt-2">
              Questions about these terms:{" "}
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
