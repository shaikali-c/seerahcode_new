"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";

const LINKS = [
  { label: "Program", href: "/#program" },
  { label: "Courses", href: "/courses" },
  { label: "How it works", href: "/#how" },
  { label: "Faculty", href: "/faculty" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600";

const navLinkClass = (active: boolean) =>
  `rounded-md text-sm transition-colors ${focusRing} ${
    active
      ? "font-medium text-emerald-700 dark:text-emerald-400"
      : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
  }`;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    window.addEventListener("popstate", onChange);
    return () => {
      window.removeEventListener("hashchange", onChange);
      window.removeEventListener("popstate", onChange);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === pathname || (href.startsWith("/#") && href === `/${hash}`);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-8 px-4 sm:px-6 md:h-16">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className={`flex shrink-0 items-center gap-2 ${focusRing} rounded-md`}
        >
          <span
            aria-hidden
            className="grid size-7 place-items-center rounded-md bg-emerald-600 text-[13px] font-bold text-white dark:bg-emerald-500 dark:text-zinc-950"
          >
            S
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Seerah
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden min-w-0 items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={navLinkClass(isActive(l.href))}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-3">
          <Link
            href="/login"
            className={`hidden rounded-md px-2 py-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-950 sm:block ${focusRing} dark:text-zinc-400 dark:hover:text-zinc-50 ${
              isActive("/login") ? "font-medium text-emerald-700 dark:text-emerald-400" : ""
            }`}
          >
            Sign in
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={`grid size-9 place-items-center rounded-md text-zinc-700 transition-colors hover:text-zinc-950 active:translate-y-[1px] lg:hidden ${focusRing} dark:text-zinc-300 dark:hover:text-zinc-50`}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-zinc-100 bg-white px-4 pb-5 pt-3 lg:hidden dark:border-zinc-900 dark:bg-zinc-950">
          <nav aria-label="Mobile" className="mx-auto max-w-6xl">
            <ul className="space-y-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={`block rounded-lg px-3 py-2.5 text-[15px] transition-colors ${focusRing} ${
                      isActive(l.href)
                        ? "bg-zinc-50 font-medium text-emerald-700 dark:bg-zinc-900 dark:text-emerald-400"
                        : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex justify-end border-t border-zinc-100 px-3 pt-4 dark:border-zinc-900">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className={`rounded-md px-1 py-1 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950 ${focusRing} dark:text-zinc-300 dark:hover:text-zinc-50`}
              >
                Sign in
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
