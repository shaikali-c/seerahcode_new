"use client";

import { useEffect } from "react";
import { track } from "../lib/analytics";

export function CourseAboutView({ courseId }: { courseId: string }) {
  useEffect(() => {
    track("course_about_view", { courseId });
  }, [courseId]);
  return null;
}
