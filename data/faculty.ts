import { COURSES } from "./courses";

export type FacultyArea =
  | "Foundations"
  | "Recitation"
  | "Tajwid"
  | "Memorization"
  | "Tafsir"
  | "Arabic"
  | "Themes";

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  area: FacultyArea;
  experience: string;
  specialty: string;
  degree: string;
  bio: string;
  photo: string;
}

export const AREAS: ("All" | FacultyArea)[] = [
  "All",
  "Foundations",
  "Recitation",
  "Tajwid",
  "Memorization",
  "Tafsir",
  "Arabic",
  "Themes",
];

export const FACULTY: FacultyMember[] = [
  {
    id: "bilal-ahmed",
    name: "Bilal Ahmed",
    role: "Foundations · Course instructor",
    area: "Foundations",
    experience: "9 yrs teaching experience",
    specialty: "Qur'an foundations & study skills",
    degree: "Focus: Qur'anic studies",
    bio: "Teaches learners how to approach the Qur'an with attention to themes, context, and meaning.",
    photo: "/img/placeholder.jpg",
  },
  {
    id: "amina-yusuf",
    name: "Amina Yusuf",
    role: "Tafsir · Course instructor",
    area: "Tafsir",
    experience: "8 yrs teaching experience",
    specialty: "Tafsir methods & thematic study",
    degree: "Focus: Qur'anic interpretation",
    bio: "Guides learners through how scholars read, contextualize, and explain verses of the Qur'an.",
    photo: "/img/placeholder.jpg",
  },
  {
    id: "imran-siddiq",
    name: "Imran Siddiq",
    role: "Memorization · Course instructor",
    area: "Memorization",
    experience: "10 yrs teaching experience",
    specialty: "Memorization methods & revision routines",
    degree: "Focus: Qur'an memorization",
    bio: "Teaches a steady approach to memorization, with revision routines learners can keep up long-term.",
    photo: "/img/placeholder.jpg",
  },
  {
    id: "fatima-noor",
    name: "Fatima Noor",
    role: "Themes · Course instructor",
    area: "Themes",
    experience: "7 yrs teaching experience",
    specialty: "Qur'anic themes & reflection",
    degree: "Focus: Qur'anic themes",
    bio: "Teaches the themes and narratives of the Qur'an in a way that connects study to daily reflection.",
    photo: "/img/placeholder.jpg",
  },
  {
    id: "omar-farouk",
    name: "Omar Farouk",
    role: "Memorization · Course instructor",
    area: "Memorization",
    experience: "11 yrs teaching experience",
    specialty: "Revision & retention routines",
    degree: "Focus: Qur'an retention",
    bio: "Helps memorizers build sustainable revision habits so what they learn stays with them.",
    photo: "/img/placeholder.jpg",
  },
  {
    id: "zainab-malik",
    name: "Zainab Malik",
    role: "Tajwid · Course instructor",
    area: "Tajwid",
    experience: "8 yrs teaching experience",
    specialty: "Tajwid rules & recitation practice",
    degree: "Focus: Qur'anic recitation",
    bio: "Introduces the rules of tajwid step by step, with guided practice and patient feedback.",
    photo: "/img/placeholder.jpg",
  },
  {
    id: "hassan-ali",
    name: "Hassan Ali",
    role: "Arabic · Course instructor",
    area: "Arabic",
    experience: "9 yrs teaching experience",
    specialty: "Qur'anic Arabic & grammar",
    degree: "Focus: Arabic language",
    bio: "Makes Arabic approachable through vocabulary, grammar, and short passages from the Qur'an.",
    photo: "/img/placeholder.jpg",
  },
  {
    id: "yusuf-rahman",
    name: "Yusuf Rahman",
    role: "Recitation · Course instructor",
    area: "Recitation",
    experience: "10 yrs teaching experience",
    specialty: "Reading fluency & accuracy",
    degree: "Focus: Qur'anic recitation",
    bio: "Teaches learners to read the Qur'an accurately and fluently, letter by letter and verse by verse.",
    photo: "/img/placeholder.jpg",
  },
];

export function coursesByInstructor(name: string) {
  return COURSES.filter((c) => c.instructor === name).map((c) => ({
    id: c.id,
    title: c.title,
  }));
}
