"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  CreditCard,
  LockKey,
  QrCode,
  ShieldCheck,
} from "@phosphor-icons/react";
import { COURSES, inr } from "../data/courses";

type Status = "idle" | "loading" | "success";

interface Errors {
  track?: string;
  name?: string;
  email?: string;
  cardName?: string;
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
  upi?: string;
}

const COHORTS = [
  {
    id: "may",
    label: "Spring cohort",
    date: "Starts May 4 · 8 weeks, part-time",
    seats: "6 seats left",
    hot: true,
  },
  {
    id: "july",
    label: "Summer cohort",
    date: "Starts July 6 · 8 weeks, part-time",
    seats: "Open enrollment",
    hot: false,
  },
];

const TRACKS = [
  "Foundations",
  "Recitation",
  "Tajwid",
  "Memorization",
  "Tafsir",
  "Arabic",
  "Themes",
];

const PRICE = 41999;
const OLD_PRICE = 54999;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass = (invalid: boolean) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:ring-2 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 ${
    invalid
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : "border-zinc-300 focus:border-emerald-600 focus:ring-emerald-600/20 dark:border-zinc-700 dark:focus:border-emerald-400"
  }`;

function formatCard(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function EnrollForm() {
  const [cohortId, setCohortId] = useState("may");
  const [track, setTrack] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<"card" | "upi">("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [upi, setUpi] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");

  const cohort = COHORTS.find((c) => c.id === cohortId) ?? COHORTS[0];

  const searchParams = useSearchParams();
  const course =
    COURSES.find((c) => c.id === searchParams.get("course")) ?? null;
  const unitPrice = course?.price ?? PRICE;
  const unitOld = course?.oldPrice ?? OLD_PRICE;

  function clear(key: keyof Errors) {
    setErrors((p) => (p[key] ? { ...p, [key]: undefined } : p));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    const next: Errors = {};
    if (!course && !track) next.track = "Choose a track.";
    if (name.trim().length < 2) next.name = "Enter your full name.";
    if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address.";
    if (method === "card") {
      if (cardName.trim().length < 2)
        next.cardName = "Enter the name on the card.";
      if (cardNumber.replace(/\s/g, "").length !== 16)
        next.cardNumber = "Enter the 16-digit card number.";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry))
        next.expiry = "Use MM/YY.";
      if (!/^\d{3,4}$/.test(cvc)) next.cvc = "3–4 digits.";
    } else if (!/^[\w.\-]{2,256}@[a-zA-Z]{2,64}$/.test(upi.trim())) {
      next.upi = "Enter a valid UPI ID, e.g. name@okhdfc.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStatus("loading");
    window.setTimeout(() => {
      setReference(
        `SRH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
      );
      setStatus("success");
    }, 1200);
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-2xl rounded-[20px] border border-zinc-200 bg-white p-8 text-center md:p-10 dark:border-zinc-800 dark:bg-zinc-950">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-50 dark:bg-emerald-400/10">
          <CheckCircle
            size={30}
            weight="fill"
            className="text-emerald-600 dark:text-emerald-400"
          />
        </span>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          You are enrolled.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {course ? course.title : `${cohort.label} · ${track}`}. A
          confirmation and prep pack are on the way to{" "}
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {email.trim()}
          </span>
          .
        </p>
        <p className="mx-auto mt-4 inline-block rounded-full bg-zinc-100 px-4 py-2 font-mono text-sm font-semibold text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
          Ref {reference}
        </p>
        <ol className="mx-auto mt-6 max-w-md space-y-3 text-left">
          {(course
            ? [
                "Confirm your email to unlock the course materials.",
                "Join your first teacher Q&A this week.",
                "Begin lesson 1 — study a little each day.",
              ]
            : [
                "Confirm your email to unlock the prep materials.",
                "Book your 15-minute onboarding call with your teacher.",
                "Join the study circle channel — cohort intro lands May 1.",
              ]
          ).map((step, i) => (
            <li key={step} className="flex gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-mono text-[13px] font-semibold text-emerald-700 dark:text-emerald-400">
                0{i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/#courses"
            className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:translate-y-[1px] dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
          >
            Browse courses
          </Link>
          <Link
            href="/"
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-50 active:translate-y-[1px] dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid items-start gap-6 lg:grid-cols-[1fr_360px]"
    >
      {/* Left: steps */}
      <div className="space-y-6">
        {/* Step 1 */}
        {!course && (
        <section className="rounded-[20px] border border-zinc-200 bg-white p-4 min-[400px]:p-6 md:p-7 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="flex items-baseline gap-3 text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            <span className="font-mono text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              01
            </span>
            Choose your cohort
          </h2>
          <div role="radiogroup" aria-label="Cohort" className="mt-4 grid gap-3 sm:grid-cols-2">
            {COHORTS.map((c) => {
              const selected = cohortId === c.id;
              return (
                <label key={c.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="cohort"
                    value={c.id}
                    checked={selected}
                    onChange={() => setCohortId(c.id)}
                    className="peer sr-only"
                  />
                  <span
                    className={`block rounded-xl border p-4 transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-600/40 ${
                      selected
                        ? "border-emerald-600 bg-emerald-50/60 dark:border-emerald-400 dark:bg-emerald-400/10"
                        : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="min-w-0 truncate text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                        {c.label}
                      </span>
                      <span
                        className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold ${
                          c.hot
                            ? "bg-zinc-950 text-white dark:bg-emerald-500 dark:text-zinc-950"
                            : "bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
                        }`}
                      >
                        {c.seats}
                      </span>
                    </span>
                    <span className="mt-1 block text-[13px] text-zinc-500 dark:text-zinc-400">
                      {c.date}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>

          <div className="mt-4">
            <label
              htmlFor="enroll-track"
              className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
            >
              Track
            </label>
            <select
              id="enroll-track"
              value={track}
              onChange={(e) => {
                setTrack(e.target.value);
                clear("track");
              }}
              aria-invalid={Boolean(errors.track)}
              aria-describedby={errors.track ? "enroll-track-error" : undefined}
              className={`mt-1.5 ${inputClass(Boolean(errors.track))}`}
            >
              <option value="">Select your track…</option>
              {TRACKS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.track && (
              <p id="enroll-track-error" className="mt-1.5 text-[13px] text-red-600 dark:text-red-400">
                {errors.track}
              </p>
            )}
          </div>
        </section>
        )}

        {/* Step 2 */}
        <section className="rounded-[20px] border border-zinc-200 bg-white p-4 min-[400px]:p-6 md:p-7 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="flex items-baseline gap-3 text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            <span className="font-mono text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              {course ? "01" : "02"}
            </span>
            Your details
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label
                htmlFor="enroll-name"
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
              >
                Full name
              </label>
              <input
                id="enroll-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clear("name");
                }}
                placeholder="Ada Lovelace"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "enroll-name-error" : undefined}
                className={`mt-1.5 ${inputClass(Boolean(errors.name))}`}
              />
              {errors.name && (
                <p id="enroll-name-error" className="mt-1.5 text-[13px] text-red-600 dark:text-red-400">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="enroll-email"
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
              >
                Email
              </label>
              <input
                id="enroll-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clear("email");
                }}
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "enroll-email-error" : undefined}
                className={`mt-1.5 ${inputClass(Boolean(errors.email))}`}
              />
              {errors.email && (
                <p id="enroll-email-error" className="mt-1.5 text-[13px] text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Step 3 */}
        <section className="rounded-[20px] border border-zinc-200 bg-white p-4 min-[400px]:p-6 md:p-7 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="flex items-baseline gap-3 text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            <span className="font-mono text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              {course ? "02" : "03"}
            </span>
            Payment
          </h2>
          <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-zinc-500 dark:text-zinc-400">
            <LockKey size={14} aria-hidden />
            Demo checkout — no real charge is made.
          </p>
          <div
            role="radiogroup"
            aria-label="Payment method"
            className="mt-4 grid grid-cols-2 gap-2"
          >
            {(
              [
                { id: "card", label: "Card", Icon: CreditCard },
                { id: "upi", label: "UPI", Icon: QrCode },
              ] as const
            ).map((m) => {
              const selected = method === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setMethod(m.id)}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all active:translate-y-[1px] ${
                    selected
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800 dark:border-emerald-400 dark:bg-emerald-400/10 dark:text-emerald-300"
                      : "border-zinc-300 text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  <m.Icon size={18} aria-hidden />
                  {m.label}
                </button>
              );
            })}
          </div>
          {method === "card" && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="enroll-card-name"
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
              >
                Name on card
              </label>
              <input
                id="enroll-card-name"
                type="text"
                autoComplete="cc-name"
                value={cardName}
                onChange={(e) => {
                  setCardName(e.target.value);
                  clear("cardName");
                }}
                placeholder="Ada Lovelace"
                aria-invalid={Boolean(errors.cardName)}
                aria-describedby={errors.cardName ? "enroll-card-name-error" : undefined}
                className={`mt-1.5 ${inputClass(Boolean(errors.cardName))}`}
              />
              {errors.cardName && (
                <p id="enroll-card-name-error" className="mt-1.5 text-[13px] text-red-600 dark:text-red-400">
                  {errors.cardName}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="enroll-card-number"
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
              >
                Card number
              </label>
              <input
                id="enroll-card-number"
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                value={cardNumber}
                onChange={(e) => {
                  setCardNumber(formatCard(e.target.value));
                  clear("cardNumber");
                }}
                placeholder="4242 4242 4242 4242"
                aria-invalid={Boolean(errors.cardNumber)}
                aria-describedby={errors.cardNumber ? "enroll-card-number-error" : undefined}
                className={`mt-1.5 font-mono ${inputClass(Boolean(errors.cardNumber))}`}
              />
              {errors.cardNumber && (
                <p id="enroll-card-number-error" className="mt-1.5 text-[13px] text-red-600 dark:text-red-400">
                  {errors.cardNumber}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="enroll-expiry"
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
              >
                Expiry
              </label>
              <input
                id="enroll-expiry"
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                value={expiry}
                onChange={(e) => {
                  setExpiry(formatExpiry(e.target.value));
                  clear("expiry");
                }}
                placeholder="MM/YY"
                aria-invalid={Boolean(errors.expiry)}
                aria-describedby={errors.expiry ? "enroll-expiry-error" : undefined}
                className={`mt-1.5 font-mono ${inputClass(Boolean(errors.expiry))}`}
              />
              {errors.expiry && (
                <p id="enroll-expiry-error" className="mt-1.5 text-[13px] text-red-600 dark:text-red-400">
                  {errors.expiry}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="enroll-cvc"
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
              >
                CVC
              </label>
              <input
                id="enroll-cvc"
                type="text"
                inputMode="numeric"
                autoComplete="cc-csc"
                value={cvc}
                onChange={(e) => {
                  setCvc(e.target.value.replace(/\D/g, "").slice(0, 4));
                  clear("cvc");
                }}
                placeholder="123"
                aria-invalid={Boolean(errors.cvc)}
                aria-describedby={errors.cvc ? "enroll-cvc-error" : undefined}
                className={`mt-1.5 font-mono ${inputClass(Boolean(errors.cvc))}`}
              />
              {errors.cvc && (
                <p id="enroll-cvc-error" className="mt-1.5 text-[13px] text-red-600 dark:text-red-400">
                  {errors.cvc}
                </p>
              )}
            </div>
          </div>
          )}
          {method === "upi" && (
            <div className="mt-4">
              <label
                htmlFor="enroll-upi"
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
              >
                UPI ID
              </label>
              <input
                id="enroll-upi"
                type="text"
                inputMode="email"
                autoComplete="off"
                value={upi}
                onChange={(e) => {
                  setUpi(e.target.value.trimStart());
                  clear("upi");
                }}
                placeholder="name@okhdfc"
                aria-invalid={Boolean(errors.upi)}
                aria-describedby={errors.upi ? "enroll-upi-error" : undefined}
                className={`mt-1.5 font-mono ${inputClass(Boolean(errors.upi))}`}
              />
              {errors.upi && (
                <p id="enroll-upi-error" className="mt-1.5 text-[13px] text-red-600 dark:text-red-400">
                  {errors.upi}
                </p>
              )}
              <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                You will get a collect request for {inr(unitPrice)} on your
                UPI app — GPay, PhonePe, or Paytm.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Right: summary */}
      <aside className="order-first lg:order-none lg:sticky lg:top-24">
        <div className="rounded-[20px] border border-zinc-200 bg-white p-6 shadow-[0_24px_60px_-28px_rgba(9,9,11,0.35)] md:p-7 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            Order summary
          </h2>
          <p className="mt-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
            {course ? course.title : "Foundations of Qur'anic Studies"}
          </p>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            {course
              ? `${course.instructor} · ${course.level}`
              : `${cohort.label} · ${track || "Choose a track"}`}
          </p>
          <dl className="mt-5 space-y-2.5 border-t border-zinc-100 pt-5 text-sm dark:border-zinc-800">
            <div className="flex justify-between">
              <dt className="text-zinc-500 dark:text-zinc-400">
                {course ? "Course" : "Program"}
              </dt>
              <dd className="font-mono text-zinc-800 dark:text-zinc-200">
                {inr(unitOld)}
              </dd>
            </div>
            {unitOld > unitPrice && (
              <div className="flex justify-between">
                <dt className="text-zinc-500 dark:text-zinc-400">
                  {course ? "Discount" : "Launch discount"}
                </dt>
                <dd className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                  −{inr(unitOld - unitPrice)}
                </dd>
              </div>
            )}
            <div className="flex justify-between border-t border-zinc-100 pt-3 text-base font-semibold dark:border-zinc-800">
              <dt className="text-zinc-950 dark:text-zinc-50">Total due</dt>
              <dd className="font-mono text-zinc-950 dark:text-zinc-50">
                {inr(unitPrice)}
              </dd>
            </div>
          </dl>
          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-5 w-full rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:translate-y-[1px] active:scale-[0.99] disabled:cursor-wait disabled:opacity-70 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
          >
            {status === "loading" ? "Processing…" : `Enroll now · ${inr(unitPrice)}`}
          </button>
          <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            <ShieldCheck size={15} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            14-day full refund, incl. GST invoice.{" "}
            {!course && "Or pay in 3 × ₹14,000 — we will arrange it after checkout."}
          </p>
        </div>
      </aside>
    </form>
  );
}
