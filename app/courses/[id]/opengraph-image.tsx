import { ImageResponse } from "next/og";
import { COURSES, inr } from "../../../data/courses";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "Seerah course preview";

const CATEGORY_TINT: Record<string, string> = {
  Foundations: "#059669",
  Recitation: "#0d9488",
  Tajwid: "#0f766e",
  Memorization: "#047857",
  Tafsir: "#065f46",
  Arabic: "#10b981",
  Themes: "#14b8a6",
};

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = COURSES.find((c) => c.id === id);

  if (!course) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#09090b",
            color: "#fafafa",
            fontSize: 48,
            fontWeight: 600,
          }}
        >
          Seerah
        </div>
      ),
      size
    );
  }

  const tint = CATEGORY_TINT[course.category] ?? "#059669";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#09090b",
          color: "#fafafa",
          padding: 64,
          position: "relative",
        }}
      >
        {/* accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 14,
            background: tint,
            display: "flex",
          }}
        />
        {/* watermark glyph */}
        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: -40,
            fontSize: 320,
            fontWeight: 700,
            color: "rgba(255,255,255,0.06)",
            display: "flex",
          }}
        >
          {course.category === "Memorization"
            ? "ح"
            : course.category === "Arabic"
              ? "ع"
              : course.category === "Tajwid"
                ? "ت"
                : course.category === "Recitation"
                  ? "ق"
                  : "س"}
        </div>

        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#059669",
              color: "#09090b",
              fontSize: 30,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            S
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, display: "flex" }}>
            Seerah
          </div>
          <div
            style={{
              marginLeft: 16,
              fontSize: 22,
              color: "#a1a1aa",
              textTransform: "uppercase",
              letterSpacing: 3,
              display: "flex",
            }}
          >
            {course.category} · {course.level}
          </div>
        </div>

        {/* title */}
        <div
          style={{
            marginTop: 72,
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 980,
            display: "flex",
          }}
        >
          {course.title}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: "#d4d4d8",
            maxWidth: 900,
            display: "flex",
            lineHeight: 1.35,
          }}
        >
          {course.blurb}
        </div>

        {/* footer row */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <div style={{ fontSize: 44, fontWeight: 700, display: "flex" }}>
              {inr(course.price)}
            </div>
            <div style={{ fontSize: 24, color: "#a1a1aa", display: "flex" }}>
              {course.lessons} lessons · {course.hours}h · {course.rating.toFixed(1)} ★
            </div>
          </div>
          <div style={{ fontSize: 26, color: "#34d399", display: "flex" }}>
            seerah.school
          </div>
        </div>
      </div>
    ),
    size
  );
}
