"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChalkboardTeacher,
  CheckCircle,
  Eye,
  EyeSlash,
  FileArrowUp,
  FileText,
  Student,
  X,
} from "@phosphor-icons/react";

type Mode = "signin" | "signup";
type AccountType = "student" | "instructor";
type Status = "idle" | "loading" | "success";

interface Errors {
  username?: string;
  email?: string;
  phone?: string;
  degree?: string;
  area?: string;
  experience?: string;
  resume?: string;
  password?: string;
  confirm?: string;
  terms?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_RE = /^[a-zA-Z0-9_.]{3,20}$/;
const MAX_RESUME_BYTES = 5 * 1024 * 1024;

const AREAS = [
  "Foundations",
  "Recitation",
  "Tajwid",
  "Memorization",
  "Tafsir",
  "Arabic",
  "Themes",
];

const EXPERIENCE = ["0–2 years", "3–5 years", "6–10 years", "10+ years"];

const labelClass =
  "block text-[13px] font-medium text-zinc-700 dark:text-zinc-300";

const inputClass = (invalid: boolean) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-base text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:ring-2 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 ${
    invalid
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : "border-zinc-300 focus:border-emerald-600 focus:ring-emerald-600/20 dark:border-zinc-700 dark:focus:border-emerald-400"
  }`;

const errorClass =
  "mt-1.5 text-[13px] leading-snug text-red-600 dark:text-red-400";

function strength(password: string): { score: number; label: string } {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  const labels = ["Too weak", "Weak", "Okay", "Strong", "Very strong"];
  return { score, label: labels[score] };
}

function formatBytes(n: number): string {
  return n >= 1024 * 1024
    ? `${(n / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.round(n / 1024)} KB`;
}

export function AuthForm() {
  const [mode, setMode] = useState<Mode>("signin");
  const [accountType, setAccountType] = useState<AccountType>("student");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [degree, setDegree] = useState("");
  const [area, setArea] = useState("");
  const [experience, setExperience] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function clear(key: keyof Errors) {
    setErrors((p) => (p[key] ? { ...p, [key]: undefined } : p));
  }

  function switchMode(next: Mode) {
    setMode(next);
    setErrors({});
    setStatus("idle");
  }

  function switchType(next: AccountType) {
    setAccountType(next);
    setErrors({});
  }

  function onResume(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (!f) {
      setResume(null);
      return;
    }
    if (!/\.(pdf|doc|docx)$/i.test(f.name)) {
      setResume(null);
      e.target.value = "";
      setErrors((p) => ({ ...p, resume: "PDF or Word document only." }));
      return;
    }
    if (f.size > MAX_RESUME_BYTES) {
      setResume(null);
      e.target.value = "";
      setErrors((p) => ({ ...p, resume: "Keep it under 5 MB." }));
      return;
    }
    clear("resume");
    setResume(f);
  }

  function removeResume() {
    setResume(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function validate(): Errors {
    const next: Errors = {};
    if (mode === "signin") {
      if (!EMAIL_RE.test(email.trim())) {
        next.email = "Enter a valid email address.";
      }
      if (password.length < 8) {
        next.password = "Use at least 8 characters.";
      }
      return next;
    }
    if (!USERNAME_RE.test(username.trim())) {
      next.username = "3–20 characters: letters, numbers, _ or .";
    }
    if (!EMAIL_RE.test(email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (accountType === "student") {
      if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""))) {
        next.phone = "Enter a valid 10-digit mobile number.";
      }
    } else {
      if (degree.trim().length < 2) {
        next.degree = "Enter your highest degree.";
      }
      if (!area) next.area = "Choose your area of expertise.";
      if (!experience) next.experience = "Choose your experience.";
      if (!resume) next.resume = "Upload your resume.";
    }
    if (password.length < 8) {
      next.password = "Use at least 8 characters.";
    }
    if (confirm !== password || confirm.length === 0) {
      next.confirm = "Passwords do not match.";
    }
    if (!terms) {
      next.terms = "Please accept the terms to continue.";
    }
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStatus("loading");
    timer.current = setTimeout(() => setStatus("success"), 1100);
  }

  if (status === "success") {
    const instructor = mode === "signup" && accountType === "instructor";
    return (
      <div className="py-2 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-50 dark:bg-emerald-400/10">
          <CheckCircle
            size={26}
            weight="fill"
            className="text-emerald-600 dark:text-emerald-400"
          />
        </span>
        <h2 className="mt-4 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {mode === "signin"
            ? "Welcome back."
            : instructor
              ? "Application received."
              : "Account created."}
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {mode === "signin" ? (
            <>
              You are signed in as{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {email.trim()}
              </span>
              . Pick up where you left off.
            </>
          ) : instructor ? (
            <>
              Thanks,{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {username.trim()}
              </span>
              . We review instructor applications within 3 days and will write
              to{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {email.trim()}
              </span>
              .
            </>
          ) : (
            <>
              We sent a confirmation link to{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {email.trim()}
              </span>
              . Confirm it to unlock your courses.
            </>
          )}
        </p>
        <Link
          href="/courses"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:translate-y-[1px] dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
        >
          Browse courses
        </Link>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setPassword("");
            setConfirm("");
            setErrors({});
          }}
          className="mt-3 w-full rounded-full px-6 py-2.5 text-sm font-semibold text-zinc-600 transition-colors hover:text-zinc-950 active:translate-y-[1px] dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          {mode === "signin"
            ? "Sign in with another email"
            : instructor
              ? "Submit another application"
              : "Use another email"}
        </button>
      </div>
    );
  }

  const pw = strength(password);
  const isInstructor = mode === "signup" && accountType === "instructor";

  return (
    <div>
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Choose sign in or create account"
        className="flex gap-1 rounded-full border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-950"
      >
        {(["signin", "signup"] as Mode[]).map((m) => {
          const active = mode === m;
          return (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => switchMode(m)}
              className={`flex-1 whitespace-nowrap rounded-full px-3 py-2 text-[13px] transition-all sm:text-sm ${
                active
                  ? "bg-white font-semibold text-zinc-950 shadow-sm dark:bg-zinc-900 dark:text-zinc-50"
                  : "font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              {m === "signin" ? "Sign in" : "Create account"}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        {/* Account type */}
        {mode === "signup" && (
          <div>
            <span id="auth-type-label" className={labelClass}>
              I am joining as
            </span>
            <div
              role="radiogroup"
              aria-labelledby="auth-type-label"
              className="mt-2 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2"
            >
              {(
                [
                  {
                    id: "student",
                    label: "Student",
                    desc: "Join cohorts & courses",
                    Icon: Student,
                  },
                  {
                    id: "instructor",
                    label: "Instructor",
                    desc: "Teach & earn",
                    Icon: ChalkboardTeacher,
                  },
                ] as const
              ).map((t) => {
                const selected = accountType === t.id;
                return (
                  <label key={t.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="account-type"
                      value={t.id}
                      checked={selected}
                      onChange={() => switchType(t.id)}
                      className="peer sr-only"
                    />
                    <span
                      className={`flex min-w-0 items-center gap-3 rounded-xl border p-3 transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-600/40 ${
                        selected
                          ? "border-emerald-600 bg-emerald-50/60 dark:border-emerald-400 dark:bg-emerald-400/10"
                          : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600"
                      }`}
                    >
                      <t.Icon
                        size={20}
                        aria-hidden
                        className={
                          selected
                            ? "shrink-0 text-emerald-700 dark:text-emerald-300"
                            : "shrink-0 text-zinc-400"
                        }
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                          {t.label}
                        </span>
                        <span className="block truncate text-xs text-zinc-500 dark:text-zinc-400">
                          {t.desc}
                        </span>
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Username (signup) */}
        {mode === "signup" && (
          <div>
            <label htmlFor="auth-username" className={labelClass}>
              Username
            </label>
            <input
              id="auth-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                clear("username");
              }}
              placeholder="ada_lovelace"
              aria-invalid={Boolean(errors.username)}
              aria-describedby={errors.username ? "auth-username-error" : undefined}
              className={`mt-1.5 ${inputClass(Boolean(errors.username))}`}
            />
            {errors.username && (
              <p id="auth-username-error" className={errorClass}>
                {errors.username}
              </p>
            )}
          </div>
        )}

        {/* Email */}
        <div>
          <label htmlFor="auth-email" className={labelClass}>
            Email
          </label>
          <input
            id="auth-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clear("email");
            }}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "auth-email-error" : undefined}
            className={`mt-1.5 ${inputClass(Boolean(errors.email))}`}
          />
          {errors.email && (
            <p id="auth-email-error" className={errorClass}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Student: phone */}
        {mode === "signup" && !isInstructor && (
          <div>
            <label htmlFor="auth-phone" className={labelClass}>
              Phone number
            </label>
            <div className="relative mt-1.5">
              <span
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-base text-zinc-400"
              >
                +91
              </span>
              <input
                id="auth-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/[^\d\s]/g, "").slice(0, 12));
                  clear("phone");
                }}
                placeholder="98765 43210"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "auth-phone-error" : undefined}
                className={`pl-14 font-mono ${inputClass(Boolean(errors.phone))}`}
              />
            </div>
            {errors.phone && (
              <p id="auth-phone-error" className={errorClass}>
                {errors.phone}
              </p>
            )}
          </div>
        )}

        {/* Instructor fields */}
        {isInstructor && (
          <>
            <div>
              <label htmlFor="auth-degree" className={labelClass}>
                Highest degree
              </label>
              <input
                id="auth-degree"
                type="text"
                autoComplete="off"
                value={degree}
                onChange={(e) => {
                  setDegree(e.target.value);
                  clear("degree");
                }}
                placeholder="e.g. Qur'anic studies, Arabic"
                aria-invalid={Boolean(errors.degree)}
                aria-describedby={errors.degree ? "auth-degree-error" : undefined}
                className={`mt-1.5 ${inputClass(Boolean(errors.degree))}`}
              />
              {errors.degree && (
                <p id="auth-degree-error" className={errorClass}>
                  {errors.degree}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="auth-area" className={labelClass}>
                  Area of expertise
                </label>
                <select
                  id="auth-area"
                  value={area}
                  onChange={(e) => {
                    setArea(e.target.value);
                    clear("area");
                  }}
                  aria-invalid={Boolean(errors.area)}
                  aria-describedby={errors.area ? "auth-area-error" : undefined}
                  className={`mt-1.5 ${inputClass(Boolean(errors.area))}`}
                >
                  <option value="">Select…</option>
                  {AREAS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                {errors.area && (
                  <p id="auth-area-error" className={errorClass}>
                    {errors.area}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="auth-experience" className={labelClass}>
                  Experience
                </label>
                <select
                  id="auth-experience"
                  value={experience}
                  onChange={(e) => {
                    setExperience(e.target.value);
                    clear("experience");
                  }}
                  aria-invalid={Boolean(errors.experience)}
                  aria-describedby={
                    errors.experience ? "auth-experience-error" : undefined
                  }
                  className={`mt-1.5 ${inputClass(Boolean(errors.experience))}`}
                >
                  <option value="">Select…</option>
                  {EXPERIENCE.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
                {errors.experience && (
                  <p id="auth-experience-error" className={errorClass}>
                    {errors.experience}
                  </p>
                )}
              </div>
            </div>

            <div>
              <span id="auth-resume-label" className={labelClass}>
                Resume
              </span>
              <input
                ref={fileRef}
                id="auth-resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={onResume}
                aria-labelledby="auth-resume-label"
                aria-invalid={Boolean(errors.resume)}
                aria-describedby={errors.resume ? "auth-resume-error" : undefined}
                className="sr-only"
              />
              {resume ? (
                <div className="mt-1.5 flex items-center gap-3 rounded-xl border border-emerald-600/40 bg-emerald-50/60 px-4 py-3 dark:border-emerald-400/40 dark:bg-emerald-400/10">
                  <FileText
                    size={20}
                    aria-hidden
                    className="shrink-0 text-emerald-700 dark:text-emerald-300"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                      {resume.name}
                    </span>
                    <span className="block font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {formatBytes(resume.size)}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={removeResume}
                    aria-label="Remove resume"
                    className="grid size-8 shrink-0 place-items-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900 active:translate-y-[1px] dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="auth-resume"
                  className={`mt-1.5 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-4 py-4 transition-colors ${
                    errors.resume
                      ? "border-red-500 bg-red-50/40 dark:bg-red-500/5"
                      : "border-zinc-300 hover:border-emerald-600 hover:bg-emerald-50/40 dark:border-zinc-700 dark:hover:border-emerald-400 dark:hover:bg-emerald-400/5"
                  }`}
                >
                  <FileArrowUp
                    size={20}
                    aria-hidden
                    className="shrink-0 text-zinc-400"
                  />
                  <span className="min-w-0 text-sm leading-snug text-zinc-600 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      Upload your resume
                    </span>{" "}
                    · PDF or Word, max 5 MB
                  </span>
                </label>
              )}
              {errors.resume && (
                <p id="auth-resume-error" className={errorClass}>
                  {errors.resume}
                </p>
              )}
            </div>
          </>
        )}

        {/* Password */}
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="auth-password" className={labelClass}>
              Password
            </label>
            {mode === "signin" && (
              <a
                href="mailto:hello@seerah.school?subject=Password%20reset"
                className="shrink-0 text-[13px] font-medium text-emerald-700 hover:underline dark:text-emerald-400"
              >
                Forgot password?
              </a>
            )}
          </div>
          <div className="relative mt-1.5">
            <input
              id="auth-password"
              type={showPassword ? "text" : "password"}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clear("password");
              }}
              placeholder={mode === "signin" ? "Your password" : "8+ characters"}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "auth-password-error" : undefined}
              className={`pr-12 ${inputClass(Boolean(errors.password))}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-pressed={showPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            >
              {showPassword ? <EyeSlash size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {errors.password && (
            <p id="auth-password-error" className={errorClass}>
              {errors.password}
            </p>
          )}
          {mode === "signup" && password.length > 0 && !errors.password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex flex-1 gap-1" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${
                      i < pw.score
                        ? "bg-emerald-600 dark:bg-emerald-400"
                        : "bg-zinc-200 dark:bg-zinc-800"
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                {pw.label}
              </span>
            </div>
          )}
        </div>

        {/* Confirm password (signup) */}
        {mode === "signup" && (
          <div>
            <label htmlFor="auth-confirm" className={labelClass}>
              Confirm password
            </label>
            <input
              id="auth-confirm"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                clear("confirm");
              }}
              placeholder="Repeat your password"
              aria-invalid={Boolean(errors.confirm)}
              aria-describedby={errors.confirm ? "auth-confirm-error" : undefined}
              className={`mt-1.5 ${inputClass(Boolean(errors.confirm))}`}
            />
            {errors.confirm && (
              <p id="auth-confirm-error" className={errorClass}>
                {errors.confirm}
              </p>
            )}
          </div>
        )}

        {/* Consent — single text flow inside a span (fixes mobile word-split) */}
        {mode === "signin" ? (
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 rounded accent-emerald-600"
            />
            <span className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              Keep me signed in on this device
            </span>
          </label>
        ) : (
          <div>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => {
                  setTerms(e.target.checked);
                  clear("terms");
                }}
                aria-invalid={Boolean(errors.terms)}
                aria-describedby={errors.terms ? "auth-terms-error" : undefined}
                className="mt-0.5 size-4 shrink-0 rounded accent-emerald-600"
              />
              <span className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-400"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-400"
                >
                  Privacy Policy
                </Link>
                , and I am over 16.
              </span>
            </label>
            {errors.terms && (
              <p id="auth-terms-error" className={errorClass}>
                {errors.terms}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:translate-y-[1px] active:scale-[0.99] disabled:cursor-wait disabled:opacity-70 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
        >
          {status === "loading"
            ? mode === "signin"
              ? "Signing in…"
              : isInstructor
                ? "Submitting…"
                : "Creating account…"
            : mode === "signin"
              ? "Sign in"
              : isInstructor
                ? "Apply as instructor"
                : "Create account"}
        </button>

        <p className="text-center text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          {mode === "signin"
            ? "Demo only — no credentials leave your browser."
            : isInstructor
              ? "Applications are reviewed within 3 days."
              : "Free to join. Pay only when you enroll in a program."}
        </p>
      </form>
    </div>
  );
}
