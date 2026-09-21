"use client";

import Link from "next/link";
import { ArrowLeft, Star } from "@phosphor-icons/react";

export function HomeLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 active:translate-y-[1px] dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
    >
      <ArrowLeft size={15} />
      Home
    </Link>
  );
}

export function StarsRow() {
  return (
    <div className="flex items-center gap-1" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} weight="fill" className="text-amber-500" />
      ))}
    </div>
  );
}
