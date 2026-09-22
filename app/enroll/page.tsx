import type { Metadata } from "next";
import { Suspense } from "react";
import { EnrollForm } from "../../components/EnrollForm";
import { SiteHeader } from "../../components/SiteHeader";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "Enroll — Seerah",
  description:
    "Add your details, then choose a payment option. Eight weeks, part-time, with teacher guidance and a 14-day refund.",
};

export default function EnrollPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-zinc-50 pb-20 font-sans text-zinc-950 lg:pb-0 dark:bg-zinc-900/40 dark:text-zinc-50">
      <SiteHeader />

      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 md:py-14"
      >
        <div className="max-w-2xl">
          <h1 className="text-2xl font-semibold tracking-tighter min-[400px]:text-3xl md:text-4xl">
            Details, then payment.
          </h1>
          <p className="mt-2.5 max-w-[58ch] text-sm leading-relaxed text-zinc-600 min-[400px]:text-[15px] dark:text-zinc-400">
            You have already read the course page. Add your details, then pick
            a payment option — Card or UPI. Pricing appears on the payment
            step, and nothing is charged until the last step. The flagship
            program still starts with a quick review.
          </p>
        </div>
        <div className="mt-6 min-[400px]:mt-8">
          <Suspense
            fallback={
              <div className="rounded-[20px] border border-zinc-200 bg-white p-6 text-sm text-zinc-500 min-[400px]:p-8 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                Loading enrollment…
              </div>
            }
          >
            <EnrollForm />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
