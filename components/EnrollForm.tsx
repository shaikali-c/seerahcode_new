"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  CheckFat,
  CreditCard,
  LockKey,
  QrCode,
  ShieldCheck,
} from "@phosphor-icons/react";
import { COURSES, inr } from "../data/courses";
import { COHORTS, PROGRAM } from "../data/program";
import { track as trackEvent } from "../lib/analytics";
import { EnrollReviewStep } from "./EnrollReviewStep";

type Step = 1 | 2 | 3;
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

const STEPS: { n: Step; label: string }[] = [
  { n: 1, label: "Review course" },
  { n: 2, label: "Your details" },
  { n: 3, label: "Payment" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function storageKey(courseId: string | null) {
  return `seerah-enroll:${courseId ?? "flagship"}`;
}

interface Progress {
  step: Step;
  cohortId: string;
  track: string;
  name: string;
  email: string;
  method: "card" | "upi";
}

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

function Stepper({
  step,
  onJump,
  firstLabel,
}: {
  step: Step;
  onJump: (s: Step) => void;
  firstLabel?: string;
}) {
  return (
    <nav aria-label="Enrollment progress" className="-mx-1 overflow-x-auto px-1 pb-1">
      <ol className="flex w-max items-center gap-x-2 gap-y-2 sm:w-auto sm:flex-wrap sm:gap-x-3">
        {STEPS.map((s, i) => {
          const state =
            s.n < step ? "done" : s.n === step ? "current" : "todo";
          const canJump = s.n < step;
          const label = i === 0 && firstLabel ? firstLabel : s.label;
          return (
            <li key={s.n} className="flex items-center gap-2 sm:gap-3">
              {i > 0 && (
                <span
                  aria-hidden
                  className={`hidden h-px w-6 sm:block sm:w-10 ${
                    s.n <= step ? "bg-emerald-600" : "bg-zinc-300 dark:bg-zinc-700"
                  }`}
                />
              )}
              <button
                type="button"
                onClick={() => canJump && onJump(s.n)}
                disabled={!canJump}
                aria-current={state === "current" ? "step" : undefined}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-all ${
                  state === "current"
                    ? "border-emerald-600 bg-emerald-50 text-emerald-800 dark:border-emerald-400 dark:bg-emerald-400/10 dark:text-emerald-300"
                    : state === "done"
                      ? "border-zinc-200 bg-white text-zinc-800 enabled:hover:border-zinc-300 disabled:cursor-default dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
                      : "border-zinc-200 bg-white text-zinc-400 disabled:cursor-default dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-600"
                }`}
              >
                <span
                  className={`grid size-5 place-items-center rounded-full font-mono text-[11px] ${
                    state === "current"
                      ? "bg-emerald-600 text-white dark:bg-emerald-400 dark:text-zinc-950"
                      : state === "done"
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                        : "bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400"
                  }`}
                >
                  {state === "done" ? <CheckFat size={12} weight="fill" /> : s.n}
                </span>
                <span className="hidden min-[420px]:inline">{label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function EnrollForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const course =
    COURSES.find((c) => c.id === searchParams.get("course")) ?? null;
  const courseId = course?.id ?? null;

  // Course flow: the about-course page was already read — start at details.
  // Program flow still starts at the review step.
  const [step, setStep] = useState<Step>(course ? 2 : 1);
  const [cohortId, setCohortId] = useState(COHORTS[0].id);
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
  const restored = useRef(false);
  // Mirror latest searchParams without putting the object itself in effect deps —
  // router.replace below would otherwise retrigger the effect forever.
  const searchParamsRef = useRef(searchParams);
  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  // Restore progress from sessionStorage + ?step= on mount (one-time hydration).
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- one-time restore of external storage after mount */
    if (restored.current) return;
    restored.current = true;

    let progress: Progress | null = null;
    try {
      const raw = window.sessionStorage.getItem(storageKey(courseId));
      if (raw) progress = JSON.parse(raw) as Progress;
    } catch {
      progress = null;
    }

    const urlStep = Number(searchParams.get("step"));
    let nextStep: Step = 1;

    if (progress) {
      setCohortId(progress.cohortId ?? COHORTS[0].id);
      setTrack(progress.track ?? "");
      setName(progress.name ?? "");
      setEmail(progress.email ?? "");
      setMethod(progress.method ?? "card");
      if (Number.isInteger(progress.step) && progress.step >= 1 && progress.step <= 3) {
        nextStep = progress.step;
      }
    }

    if (Number.isInteger(urlStep) && urlStep >= 1 && urlStep <= 3) {
      nextStep = urlStep as Step;
    }

    // Clamp: step 3 requires details; step 2 requires review choices for program
    if (nextStep >= 3) {
      const okName = progress?.name && progress.name.trim().length >= 2;
      const okEmail = progress?.email && EMAIL_RE.test(progress.email.trim());
      if (!okName || !okEmail) nextStep = 2;
    }
    if (nextStep >= 2) {
      if (!course && !(progress?.track || "").trim()) nextStep = 1;
    }
    // Course flow skips review — the course page is the about stage.
    if (course && nextStep < 2) nextStep = 2;

    setStep(nextStep);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [courseId, course, searchParams]);

  // Funnel: log every step view (mount + transitions, incl. program flow).
  useEffect(() => {
    if (!restored.current) return;
    trackEvent("enroll_step_view", { courseId: courseId ?? "flagship", step });
  }, [step, courseId]);

  // Persist progress + mirror step to URL
  useEffect(() => {
    if (!restored.current || status === "success") return;

    const progress: Progress = {
      step,
      cohortId,
      track,
      name,
      email,
      method,
    };
    try {
      window.sessionStorage.setItem(
        storageKey(courseId),
        JSON.stringify(progress)
      );
    } catch {
      /* ignore quota errors */
    }

    const params = new URLSearchParams(searchParamsRef.current.toString());
    if (step === 1) params.delete("step");
    else params.set("step", String(step));
    const qs = params.toString();
    const nextUrl = qs ? `${pathname}?${qs}` : pathname;
    const currentQs = searchParamsRef.current.toString();
    const currentUrl = currentQs ? `${pathname}?${currentQs}` : pathname;
    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [
    step,
    cohortId,
    track,
    name,
    email,
    method,
    courseId,
    status,
    pathname,
    router,
  ]);

  // Clear progress after success
  useEffect(() => {
    if (status !== "success") return;
    try {
      window.sessionStorage.removeItem(storageKey(courseId));
    } catch {
      /* ignore */
    }
    const params = new URLSearchParams(searchParamsRef.current.toString());
    params.delete("step");
    const qs = params.toString();
    const nextUrl = qs ? `${pathname}?${qs}` : pathname;
    const currentQs = searchParamsRef.current.toString();
    const currentUrl = currentQs ? `${pathname}?${currentQs}` : pathname;
    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [status, courseId, pathname, router]);

  const unitPrice = course?.price ?? PROGRAM.price;
  const unitOld = course?.oldPrice ?? PROGRAM.oldPrice;
  const cohortLabel = course
    ? "Self-paced"
    : (COHORTS.find((c) => c.id === cohortId)?.label ?? COHORTS[0].label);

  function clear(key: keyof Errors) {
    setErrors((p) => (p[key] ? { ...p, [key]: undefined } : p));
  }

  function validateStep(target: Step): Errors {
    const next: Errors = {};
    if (target === 1 && !course && !track) {
      next.track = "Choose a track to continue.";
    }
    if (target === 2) {
      if (name.trim().length < 2) next.name = "Enter your full name.";
      if (!EMAIL_RE.test(email.trim()))
        next.email = "Enter a valid email address.";
    }
    if (target === 3) {
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
    }
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    const next = validateStep(step);
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    if (step < 3) {
      setStep((step + 1) as Step);
      if (typeof window !== "undefined") window.scrollTo({ top: 0 });
      return;
    }
    setStatus("loading");
    trackEvent("payment_submitted", { courseId: courseId ?? "flagship", method });
    window.setTimeout(() => {
      const ref = `SRH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      setReference(ref);
      setStatus("success");
      trackEvent("enroll_success", { courseId: courseId ?? "flagship", reference: ref });
    }, 1200);
  }

  function goBack() {
    setErrors({});
    // Course flow: "back" from details returns to the about-course page.
    if (course && step === 2) {
      router.push(`/courses/${course.id}`);
      return;
    }
    if (step > 1) {
      setStep((step - 1) as Step);
      if (typeof window !== "undefined") window.scrollTo({ top: 0 });
    }
  }

  function handleJump(s: Step) {
    // Course flow: step 1 in the stepper is the about-course page, not a form step.
    if (course && s === 1) {
      router.push(`/courses/${course.id}`);
      return;
    }
    setErrors({});
    setStep(s);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
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
          {course ? course.title : `${cohortLabel} · ${track}`}. A
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
                "Join the study circle channel — cohort intro lands the week before kickoff.",
              ]
          ).map((s, i) => (
            <li key={s} className="flex gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-mono text-[13px] font-semibold text-emerald-700 dark:text-emerald-400">
                0{i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/courses"
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

  const submitLabel =
    step === 1
      ? "Continue to details"
      : step === 2
        ? "Continue to payment"
        : status === "loading"
          ? "Processing…"
          : `Pay ${inr(unitPrice)}`;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start xl:grid-cols-[minmax(0,1fr)_360px]"
      >
        {/* Left: steps */}
        <div className="min-w-0 space-y-6">
          <Stepper
            step={step}
            onJump={handleJump}
            firstLabel={course ? "About course" : undefined}
          />

          {step === 1 && (
            <EnrollReviewStep
              course={course}
              cohortId={cohortId}
              onCohortChange={setCohortId}
              track={track}
              onTrackChange={(t) => {
                setTrack(t);
                clear("track");
              }}
              trackError={errors.track}
            />
          )}

        {step === 2 && (
          <section className="rounded-[20px] border border-zinc-200 bg-white p-4 min-[400px]:p-6 md:p-7 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="flex items-baseline gap-3 text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              <span className="font-mono text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                02
              </span>
              Your details
            </h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              We send your receipt and course access here. No payment yet.
            </p>
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
        )}

        {step === 3 && (
          <section className="rounded-[20px] border border-zinc-200 bg-white p-4 min-[400px]:p-6 md:p-7 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="flex items-baseline gap-3 text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              <span className="font-mono text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                03
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
        )}
        </div>

        {/* Right: summary (desktop) */}
        <aside className="hidden lg:sticky lg:top-24 lg:block">
          <div className="rounded-[20px] border border-zinc-200 bg-white p-6 shadow-[0_24px_60px_-28px_rgba(9,9,11,0.35)] md:p-7 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              {step === 1 ? "You're enrolling in" : "Order summary"}
            </h2>
            <p className="mt-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
              {course ? course.title : PROGRAM.title}
            </p>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
              {course
                ? `${course.instructor} · ${course.level}`
                : `${cohortLabel} · ${track || "Choose a track"}`}
            </p>

            {step === 1 ? (
              <div className="mt-5 space-y-3 border-t border-zinc-100 pt-5 text-[13px] leading-relaxed text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                <p>
                  Review outcomes, curriculum, and what&apos;s included first.
                  Pricing is shown on the payment step — nothing is charged
                  yet.
                </p>
                <p className="flex items-start gap-1.5">
                  <ShieldCheck
                    size={15}
                    className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                  />
                  14-day full refund once you enroll.
                </p>
              </div>
            ) : (
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
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-5 w-full rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:translate-y-[1px] active:scale-[0.99] disabled:cursor-wait disabled:opacity-70 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
            >
              {submitLabel}
            </button>
            {step > 1 && (
              <button
                type="button"
                onClick={goBack}
                className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-full px-6 py-2.5 text-sm font-semibold text-zinc-600 transition-colors hover:text-zinc-950 active:translate-y-[1px] dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                <ArrowLeft size={15} aria-hidden />
                Back
              </button>
            )}
            <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              <ShieldCheck size={15} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              {step < 3
                ? "You will not be charged until the final payment step."
                : "14-day full refund, incl. GST invoice."}
            </p>
            {step === 3 && !course && (
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Or pay in 3 installments — we will arrange it with you after
                checkout.
              </p>
            )}
          </div>
        </aside>

        {/* Mobile: compact summary card (no price on step 1) */}
        <aside className="order-first lg:hidden">
          <div className="rounded-[20px] border border-zinc-200 bg-white p-4 shadow-sm sm:p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              {step === 1 ? "You're enrolling in" : "Order summary"}
            </p>
            <p className="mt-1.5 text-base font-semibold leading-snug text-zinc-950 dark:text-zinc-50">
              {course ? course.title : PROGRAM.title}
            </p>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
              {course
                ? `${course.instructor} · ${course.level}`
                : `${cohortLabel} · ${track || "Choose a track"}`}
            </p>
            {step === 1 ? (
              <p className="mt-3 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                Read through the course first — pricing appears on the payment
                step.
              </p>
            ) : (
              <div className="mt-3 flex items-baseline justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  Total due
                </span>
                <span className="font-mono text-base font-semibold text-zinc-950 dark:text-zinc-50">
                  {inr(unitPrice)}
                </span>
              </div>
            )}
          </div>
        </aside>

        {/* Mobile sticky action bar (inside form so type=submit works) */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_40px_-20px_rgba(9,9,11,0.25)] backdrop-blur lg:hidden dark:border-zinc-800 dark:bg-zinc-950/95">
          <div className="mx-auto flex max-w-xl items-center gap-2.5">
            {step > 1 && (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 transition-colors active:translate-y-[1px] dark:border-zinc-700 dark:text-zinc-300"
              >
                <ArrowLeft size={15} aria-hidden />
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="min-w-0 flex-1 truncate rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:translate-y-[1px] active:scale-[0.99] disabled:cursor-wait disabled:opacity-70 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
            >
              {submitLabel}
            </button>
          </div>
          {step === 1 && (
            <p className="mt-1.5 text-center text-[11px] text-zinc-500 dark:text-zinc-400">
              Price shown after you review the course
            </p>
          )}
        </div>
      </form>
    </>
  );
}
