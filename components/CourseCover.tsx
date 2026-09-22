import type { CourseCategory } from "../data/courses";

const COVERS: Record<
  CourseCategory | "Flagship",
  { gradient: string; glyph: string; label: string }
> = {
  Foundations: {
    gradient: "from-emerald-600 via-teal-500 to-cyan-400",
    glyph: "ف",
    label: "Foundations",
  },
  Recitation: {
    gradient: "from-sky-600 via-blue-500 to-indigo-400",
    glyph: "ق",
    label: "Recitation",
  },
  Tajwid: {
    gradient: "from-violet-600 via-purple-500 to-fuchsia-400",
    glyph: "ت",
    label: "Tajwid",
  },
  Memorization: {
    gradient: "from-amber-500 via-orange-500 to-rose-400",
    glyph: "ح",
    label: "Memorization",
  },
  Tafsir: {
    gradient: "from-rose-600 via-pink-500 to-red-400",
    glyph: "ت", // tafsir marker
    label: "Tafsir",
  },
  Arabic: {
    gradient: "from-teal-600 via-emerald-500 to-lime-400",
    glyph: "ع",
    label: "Arabic",
  },
  Themes: {
    gradient: "from-indigo-600 via-sky-500 to-blue-400",
    glyph: "و",
    label: "Themes",
  },
  Flagship: {
    gradient: "from-zinc-800 via-zinc-700 to-emerald-600",
    glyph: "س",
    label: "Flagship",
  },
};

export function CourseCover({
  category,
  className = "",
  showLabel = false,
}: {
  category: CourseCategory | "Flagship";
  className?: string;
  showLabel?: boolean;
}) {
  const cover = COVERS[category] ?? COVERS.Foundations;

  return (
    <div
      aria-hidden
      className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${cover.gradient} ${className}`}
    >
      {/* subtle geometric pattern */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.14]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`pat-${category}`}
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.2" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#pat-${category})`} />
      </svg>

      {/* large glyph watermark */}
      <span className="pointer-events-none absolute -right-4 -bottom-6 select-none text-[140px] font-bold leading-none text-white/20 sm:text-[170px]">
        {cover.glyph}
      </span>

      {/* label chip */}
      {showLabel && (
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-zinc-800 backdrop-blur">
          {cover.label}
        </span>
      )}
    </div>
  );
}
