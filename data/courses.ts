export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "All levels";
export type CourseCategory =
  | "Foundations"
  | "Recitation"
  | "Tajwid"
  | "Memorization"
  | "Tafsir"
  | "Arabic"
  | "Themes";

export interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  level: CourseLevel;
  instructor: string;
  role: string;
  rating: number;
  reviews: number;
  students: number;
  lessons: number;
  hours: number;
  /** Price in INR (paise dropped, whole rupees). */
  price: number;
  oldPrice?: number;
  tag?: string;
  blurb: string;
  image: string;
}

export const CATEGORIES: ("All" | CourseCategory)[] = [
  "All",
  "Foundations",
  "Recitation",
  "Tajwid",
  "Memorization",
  "Tafsir",
  "Arabic",
  "Themes",
];

export const LEVELS: ("All" | CourseLevel)[] = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
  "All levels",
];

/** Format a whole-rupee amount as INR, e.g. 7499 -> "₹7,499". */
export function inr(n: number): string {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export const COURSES: Course[] = [
  {
    id: "understanding-quran",
    title: "Understanding the Qur'an",
    category: "Foundations",
    level: "Beginner",
    instructor: "Bilal Ahmed",
    role: "Foundations instructor",
    rating: 4.9,
    reviews: 2314,
    students: 18400,
    lessons: 32,
    hours: 10,
    price: 7499,
    oldPrice: 9999,
    tag: "Bestseller",
    blurb: "Learn how to approach the Qur'an, understand its themes, context, and meanings.",
    image: "/img/placeholder.jpg",
  },
  {
    id: "recitation-beginners",
    title: "Qur'anic Recitation for Beginners",
    category: "Recitation",
    level: "Beginner",
    instructor: "Yusuf Rahman",
    role: "Recitation instructor",
    rating: 4.8,
    reviews: 1560,
    students: 12700,
    lessons: 30,
    hours: 9,
    price: 6499,
    tag: "New",
    blurb: "Learn to read the Qur'an accurately, letter by letter, at your own pace.",
    image: "/img/placeholder.jpg",
  },
  {
    id: "tajwid-essentials",
    title: "Tajwid Essentials",
    category: "Tajwid",
    level: "Beginner",
    instructor: "Zainab Malik",
    role: "Tajwid instructor",
    rating: 4.9,
    reviews: 2080,
    students: 16900,
    lessons: 34,
    hours: 10,
    price: 6999,
    oldPrice: 9499,
    blurb: "Study the rules of pronunciation that help you recite clearly and correctly.",
    image: "/img/placeholder.jpg",
  },
  {
    id: "hifz-foundations",
    title: "Memorization Foundations",
    category: "Memorization",
    level: "Beginner",
    instructor: "Imran Siddiq",
    role: "Memorization instructor",
    rating: 4.9,
    reviews: 3102,
    students: 26900,
    lessons: 40,
    hours: 12,
    price: 7999,
    oldPrice: 10999,
    tag: "Bestseller",
    blurb: "A structured approach to memorizing short chapters, with revision routines that stick.",
    image: "/img/placeholder.jpg",
  },
  {
    id: "tafsir-essentials",
    title: "Essentials of Tafsir",
    category: "Tafsir",
    level: "Intermediate",
    instructor: "Amina Yusuf",
    role: "Tafsir instructor",
    rating: 4.8,
    reviews: 1740,
    students: 11300,
    lessons: 34,
    hours: 10,
    price: 8499,
    blurb: "Learn the methods scholars use to interpret the Qur'an, verse by verse and theme by theme.",
    image: "/img/placeholder.jpg",
  },
  {
    id: "arabic-for-quran",
    title: "Arabic for Qur'an",
    category: "Arabic",
    level: "Beginner",
    instructor: "Hassan Ali",
    role: "Arabic instructor",
    rating: 4.8,
    reviews: 4210,
    students: 31200,
    lessons: 48,
    hours: 14,
    price: 6999,
    oldPrice: 9499,
    blurb: "Build the vocabulary and grammatical foundations needed to better understand Qur'anic Arabic.",
    image: "/img/placeholder.jpg",
  },
  {
    id: "quranic-arabic-next",
    title: "Qur'anic Arabic: Next Steps",
    category: "Arabic",
    level: "Intermediate",
    instructor: "Hassan Ali",
    role: "Arabic instructor",
    rating: 4.8,
    reviews: 1105,
    students: 8600,
    lessons: 36,
    hours: 11,
    price: 6499,
    oldPrice: 7999,
    tag: "Updated",
    blurb: "Go beyond basics: sentence structure, frequent verb forms, and reading short passages.",
    image: "/img/placeholder.jpg",
  },
  {
    id: "quran-themes-reflection",
    title: "Qur'anic Themes & Reflection",
    category: "Themes",
    level: "All levels",
    instructor: "Fatima Noor",
    role: "Themes instructor",
    rating: 4.9,
    reviews: 890,
    students: 7200,
    lessons: 24,
    hours: 7,
    price: 5499,
    blurb: "Explore mercy, justice, patience, and gratitude as they appear across the Qur'an.",
    image: "/img/placeholder.jpg",
  },
  {
    id: "juz-amma-study",
    title: "Studying Juz' Amma",
    category: "Tafsir",
    level: "Beginner",
    instructor: "Amina Yusuf",
    role: "Tafsir instructor",
    rating: 4.8,
    reviews: 986,
    students: 7400,
    lessons: 28,
    hours: 8,
    price: 5499,
    tag: "New",
    blurb: "A guided study of the short chapters at the end of the Qur'an — themes, context, and key words.",
    image: "/img/placeholder.jpg",
  },
  {
    id: "quranic-stories",
    title: "Stories in the Qur'an",
    category: "Themes",
    level: "Beginner",
    instructor: "Fatima Noor",
    role: "Themes instructor",
    rating: 4.8,
    reviews: 1187,
    students: 9200,
    lessons: 30,
    hours: 9,
    price: 5999,
    blurb: "Study the narratives of the Qur'an — their themes, lessons, and historical context.",
    image: "/img/placeholder.jpg",
  },
  {
    id: "tajwid-practice-lab",
    title: "Tajwid Practice Lab",
    category: "Tajwid",
    level: "Intermediate",
    instructor: "Zainab Malik",
    role: "Tajwid instructor",
    rating: 4.8,
    reviews: 1320,
    students: 10800,
    lessons: 30,
    hours: 9,
    price: 5999,
    oldPrice: 8499,
    blurb: "Apply tajwid rules through guided recitation practice and personal teacher feedback.",
    image: "/img/placeholder.jpg",
  },
  {
    id: "hifz-revision",
    title: "Revision & Retention for Memorizers",
    category: "Memorization",
    level: "Intermediate",
    instructor: "Omar Farouk",
    role: "Memorization instructor",
    rating: 4.8,
    reviews: 764,
    students: 6100,
    lessons: 26,
    hours: 7,
    price: 5999,
    blurb: "Build a sustainable revision routine to retain what you have memorized.",
    image: "/img/placeholder.jpg",
  },
];
