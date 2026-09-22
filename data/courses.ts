export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "All levels";
export type CourseCategory =
  | "Foundations"
  | "Recitation"
  | "Tajwid"
  | "Memorization"
  | "Tafsir"
  | "Arabic"
  | "Themes";

export interface CurriculumModule {
  title: string;
  lessons: number;
  /** Individual lesson titles; length should equal `lessons`. */
  items?: string[];
}

/** A real excerpt from lesson 1 — shown as the free sample on the course page. */
export interface CourseSample {
  lesson: string;
  excerpt: string;
  points: string[];
  question: string;
}

export interface CourseReview {
  quote: string;
  name: string;
  meta: string;
}

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
  /** What the learner will be able to do after the course. */
  outcomes: string[];
  /** Module outline; lesson counts sum to `lessons`. */
  curriculum: CurriculumModule[];
  /** Free sample shown on the about-course page. */
  sample: CourseSample;
  /** Two featured written reviews shown on the about-course page. */
  featuredReviews: CourseReview[];
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
    outcomes: [
      "Approach a new surah with a clear reading method",
      "Explain why a passage was revealed and what it addressed",
      "Recognise the major themes that run across the Qur'an",
      "Build a personal reflection routine that you can keep up",
    ],
    curriculum: [
      {
        title: "Getting oriented",
        lessons: 7,
        items: [
          "How the Qur'an is organised",
          "Reading with a purpose",
          "Context before commentary",
          "Key terms you will keep meeting",
          "Building a study sheet",
          "Translation vs. interpretation",
          "Your first-week plan",
        ],
      },
      {
        title: "Major themes of the Qur'an",
        lessons: 9,
        items: [
          "Mercy and warning",
          "Guidance and misguidance",
          "Tawhid in plain terms",
          "The Day of Judgment",
          "Prophets as teachers",
          "Law and ethics",
          "Patience and perseverance",
          "Gratitude and heedlessness",
          "Tracing a theme across surahs",
        ],
      },
      {
        title: "Surah case studies",
        lessons: 10,
        items: [
          "Al-Fatihah as a model",
          "Al-Baqarah's opening address",
          "The story of Bani Isra'il in outline",
          "Surah Luqman: advice at home",
          "Surah Ar-Rahman: bounty and balance",
          "Surah Al-Asr: a four-line programme",
          "Surah Al-Falaq: seeking refuge",
          "Surah An-Nas: inner and outer threats",
          "Openings of Juz' Amma",
          "Choosing your own case study",
        ],
      },
      {
        title: "Reading with reflection",
        lessons: 6,
        items: [
          "Slowing down: one ayah at a time",
          "Notes that actually help",
          "A weekly reflection template",
          "Questions to ask every passage",
          "From notes to habits",
          "Continuing after the course",
        ],
      },
    ],
    sample: {
      lesson: "How the Qur'an is organised",
      excerpt:
        "Before you memorise a single structure chart, it helps to see why the Qur'an is arranged the way it is — not chronologically, but thematically. This first lesson maps the six major groupings of surahs and shows how knowing them changes the way a passage sounds when you open to it.",
      points: [
        "The order of surahs and why it is not the order of revelation",
        "How long surahs and short surahs balance each other",
        "A one-page map you will use for the rest of the course",
      ],
      question:
        "Think of the last passage you read. What would change if you knew where it sits in the whole Qur'an?",
    },
    featuredReviews: [
      {
        quote:
          "I had read translations for years but never knew where to start with actual study. The case-study modules gave me a method I still use every week.",
        name: "Sana M.",
        meta: "Understanding the Qur'an learner",
      },
      {
        quote:
          "Clear, unhurried, and free of fluff. Bilal explains context without drowning you in terminology — exactly what a beginner needs.",
        name: "Yusuf A.",
        meta: "Understanding the Qur'an learner",
      },
    ],
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
    outcomes: [
      "Recognise and pronounce every Arabic letter correctly",
      "Read short passages slowly and accurately on your own",
      "Use a guided routine to practise between lessons",
      "Identify the mistakes most beginners make — and fix them",
    ],
    curriculum: [
      {
        title: "Letters and their sounds",
        lessons: 10,
        items: [
          "The Arabic alphabet, laid out",
          "Throat letters",
          "Tongue letters",
          "Lip letters",
          "Noon, Qaf and Ghayn",
          "S, Z and SH distinctions",
          "Hamzah: stop and connect",
          "Long and short vowels",
          "Madd: stretching sounds",
          "Diacritics you must know",
        ],
      },
      {
        title: "Reading words",
        lessons: 8,
        items: [
          "Joining letters in practice",
          "Short-vowel drills",
          "Reading your first words",
          "Doubled letters (shaddah)",
          "Words with long vowels",
          "Sukuun and stopping",
          "Common sight words from the Qur'an",
          "Timed word drills",
        ],
      },
      {
        title: "Reading verses",
        lessons: 8,
        items: [
          "First verses: Al-Fatihah",
          "Short surahs: Al-Ikhlas and Al-Falaq",
          "Keeping a steady pace",
          "Stopping rules at ayah ends",
          "Al-Fatihah with tajwid basics",
          "Reading Juz' Amma selections",
          "A self-recording routine",
          "Preparing for teacher Q&A",
        ],
      },
      {
        title: "Fluency practice",
        lessons: 4,
        items: [
          "Speed without rushing",
          "Smooth transitions between words",
          "Extended passage practice",
          "Your fluency baseline test",
        ],
      },
    ],
    sample: {
      lesson: "The Arabic alphabet, laid out",
      excerpt:
        "Most beginners are handed the alphabet as a wall of shapes and told to memorise it. We start differently: letters grouped by where the sound is made — throat, tongue, or lips — so your ear, not just your eyes, learns the difference between similar letters.",
      points: [
        "The three letter families and what separates them",
        "Why S, SH and TH sound alike to new ears — and how to split them",
        "A 5-minute daily drill that fixes pronunciation fast",
      ],
      question:
        "Say the letters seen in your mind's eye — which pair feels hardest to tell apart when you hear them?",
    },
    featuredReviews: [
      {
        quote:
          "I could not read a single word of Arabic before this. Thirty lessons later I read Al-Fatihah properly for the first time in my life.",
        name: "Adeel R.",
        meta: "Recitation for Beginners learner",
      },
      {
        quote:
          "The letter-family approach finally fixed my S and SH mix-up that years of mosque classes never caught.",
        name: "Mariam H.",
        meta: "Recitation for Beginners learner",
      },
    ],
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
    outcomes: [
      "Apply the core rules of noon and meem tanween in recitation",
      "Place each letter from its correct point of articulation",
      "Read a passage applying the main tajwid rules",
      "Self-check your recitation with a clear correction routine",
    ],
    curriculum: [
      {
        title: "Points of articulation",
        lessons: 8,
        items: [
          "Why makhraj matters",
          "Throat points (halq)",
          "Tongue points (lisan)",
          "Lip points (shafatan)",
          "The nasal point (khayshum)",
          "Letter families compared",
          "Correcting common misplacements",
          "Self-check drills",
        ],
      },
      {
        title: "Rules of noon and tanween",
        lessons: 9,
        items: [
          "Izhar",
          "Idgham with ghunnah",
          "Idgham without ghunnah",
          "Iqlab",
          "Ikhfa",
          "Recognising the rule in context",
          "Tanween at stops",
          "Mixed drills",
          "Noon sakinah test",
        ],
      },
      {
        title: "Rules of meem",
        lessons: 7,
        items: [
          "Idgham of meem sakinah",
          "Ikhfa shafawi",
          "Izhar shafawi",
          "Madd as-silah",
          "The rule of waqf on meem",
          "Mixed meem drills",
          "Meem sakinah test",
        ],
      },
      {
        title: "Practical recitation",
        lessons: 10,
        items: [
          "Putting rules into verses",
          "Al-Fatihah, rule by rule",
          "Short-surah application",
          "Ghunnah timing",
          "Levels of madd",
          "Waqf and ibtida basics",
          "Common-mistakes clinic",
          "Recorded practice round",
          "Teacher feedback walkthrough",
          "Final recitation check",
        ],
      },
    ],
    sample: {
      lesson: "Why makhraj matters",
      excerpt:
        "Tajwid is not decoration on top of recitation — it is the difference between the word you mean and the word you actually produce. This lesson opens with the points of articulation: the physical places in the mouth where each letter is born, and how a one-centimetre slip changes meaning.",
      points: [
        "Locate the main makhraj points with guided mouth-mapping",
        "Hear the difference between correctly and incorrectly placed letters",
        "A self-record drill you will reuse in every later lesson",
      ],
      question:
        "Recite Al-Fatihah slowly and note any letter that feels vague — where in your mouth does it actually land?",
    },
    featuredReviews: [
      {
        quote:
          "Rules I had heard about for years in fragments finally clicked as a system. The mixed drills at the end are where it becomes automatic.",
        name: "Hana T.",
        meta: "Tajwid Essentials learner",
      },
      {
        quote:
          "Zainab catches the exact errors beginners make. My recordings from week 1 and week 4 sound like different reciters.",
        name: "Bilqis N.",
        meta: "Tajwid Essentials learner",
      },
    ],
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
    outcomes: [
      "Set up a memorization routine you can sustain weekly",
      "Memorize short chapters using proven techniques",
      "Run a revision system that keeps older portions fresh",
      "Track your progress without burning out",
    ],
    curriculum: [
      {
        title: "Setting up your routine",
        lessons: 8,
        items: [
          "Why routines beat motivation",
          "Choosing your daily slot",
          "Setting a realistic hifz target",
          "Environment and focus",
          "Warm-up before memorising",
          "Tracking without obsessing",
          "Plateaus: what they mean",
          "Your four-week plan",
        ],
      },
      {
        title: "Memorization techniques",
        lessons: 10,
        items: [
          "Listen–repeat–write loop",
          "Chunking an ayah",
          "Linking new to known",
          "Writing from memory",
          "Mirror recitation",
          "Fixing slippery ayahs",
          "Spacing first-day repeats",
          "Quality vs. quantity days",
          "Self-testing method",
          "When to move on",
        ],
      },
      {
        title: "Short surahs practice",
        lessons: 12,
        items: [
          "An-Nas",
          "Al-Falaq",
          "Al-Ikhlas",
          "Al-Masad",
          "An-Nasr",
          "Al-Kafirun",
          "Al-Qadr",
          "At-Tin",
          "Ad-Duha",
          "Ash-Sharh",
          "Al-Bayyinah stretch goal",
          "Full run: Juz' Amma sequence",
        ],
      },
      {
        title: "Revision systems",
        lessons: 10,
        items: [
          "Daily, weekly, monthly cycles",
          "The revision ledger",
          "Similar-verse confusion",
          "Audio companionship",
          "Group revision sessions",
          "Travel and illness plans",
          "Cold-recitation testing",
          "When revision feels rusty",
          "Balancing new and old",
          "Your long-term system",
        ],
      },
    ],
    sample: {
      lesson: "Why routines beat motivation",
      excerpt:
        "Motivation gets you through week one. Routine gets you through year one. This lesson builds the smallest daily hifz slot you will actually keep — then protects it against the two things that kill most routines: oversized targets and all-or-nothing thinking.",
      points: [
        "Set a target sized for your worst week, not your best",
        "Anchor the habit to an existing daily action",
        "Design a 10-minute fallback version of the session",
      ],
      question:
        "If you could only memorise for ten minutes a day for the next year, when would those ten minutes live?",
    },
    featuredReviews: [
      {
        quote:
          "I had started and quit hifz three times. The routine-first approach is the reason this attempt is still going six months later.",
        name: "Kamran S.",
        meta: "Memorization Foundations learner",
      },
      {
        quote:
          "The revision ledger alone is worth the course. Nothing slips away silently anymore — I know exactly what needs a second look.",
        name: "Zahra K.",
        meta: "Memorization Foundations learner",
      },
    ],
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
    outcomes: [
      "Describe the main tools scholars use when interpreting verses",
      "Read a short surah as a whole, not isolated lines",
      "Compare a thematic and a verse-by-verse approach",
      "Study a short surah yourself with a clear method",
    ],
    curriculum: [
      {
        title: "Tools of tafsir",
        lessons: 8,
        items: [
          "What tafsir is (and is not)",
          "The Qur'an explains the Qur'an",
          "Hadith in interpretation",
          "Arabic language tools",
          "Asbab al-nuzul (occasions of revelation)",
          "Classical vs. modern tafsir",
          "Reading tafsir responsibly",
          "Building your tafsir shelf",
        ],
      },
      {
        title: "Reading a surah whole",
        lessons: 10,
        items: [
          "The surah as a unit",
          "Opening and closing frames",
          "Repeating motifs",
          "Shifts in address",
          "Structural map: Al-Fatihah",
          "Structural map: Al-Asr",
          "Structural map: Al-Fil",
          "Outlining on one page",
          "Common fragmenting mistakes",
          "Practice: map your own surah",
        ],
      },
      {
        title: "Thematic study",
        lessons: 8,
        items: [
          "Choosing a theme",
          "Collecting evidence verses",
          "Ordering the evidence",
          "Themes of mercy",
          "Themes of justice",
          "Themes of the hereafter",
          "Writing a thematic note",
          "Presenting findings clearly",
        ],
      },
      {
        title: "Case study: short surahs",
        lessons: 8,
        items: [
          "Surah Al-Mulk overview",
          "Surah Al-Qalam overview",
          "Key vocabulary sets",
          "Cross-references to trace",
          "Verse-by-verse pass, part 1",
          "Verse-by-verse pass, part 2",
          "Thematic synthesis",
          "Your independent study plan",
        ],
      },
    ],
    sample: {
      lesson: "What tafsir is (and is not)",
      excerpt:
        "Tafsir has rules, sources, and boundaries — it is a discipline, not an opinion contest. This opening lesson separates tafsir from khurafat, tamwil, and casual 'what this means to me' readings, then shows the four sources every classical mufassir works from.",
      points: [
        "The hierarchy of sources: Qur'an, Sunnah, language, context",
        "Why personal opinion sits last, not first",
        "How to know when a claim you read online is out of bounds",
      ],
      question:
        "Recall an interpretation you heard that surprised you — which of the four sources would have tested it first?",
    },
    featuredReviews: [
      {
        quote:
          "Finally a tafsir course that teaches method, not just content. I can now open a commentary and know what I am looking at.",
        name: "Ibrahim F.",
        meta: "Essentials of Tafsir learner",
      },
      {
        quote:
          "The whole-surah mapping exercises changed how I read. Passages stopped being isolated lines and started being chapters with architecture.",
        name: "Nadia R.",
        meta: "Essentials of Tafsir learner",
      },
    ],
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
    outcomes: [
      "Recognise the high-frequency words of the Qur'an",
      "Understand basic noun and verb patterns",
      "Read short Qur'anic phrases with a translation",
      "Continue self-study with a clear grammar path",
    ],
    curriculum: [
      {
        title: "Core vocabulary",
        lessons: 12,
        items: [
          "High-frequency particles",
          "The most common verbs",
          "Family and people words",
          "Worship and prayer words",
          "Nature and time words",
          "Qualities and states",
          "Numbers and quantities",
          "Prepositions in context",
          "Pronoun recap set",
          "The vocabulary drilling method",
          "Reviewing with flashcards",
          "Vocabulary self-test",
        ],
      },
      {
        title: "Nouns and pronouns",
        lessons: 12,
        items: [
          "Sound masculine plural",
          "Sound feminine plural",
          "Broken plurals",
          "Demonstratives: this and that",
          "Interrogatives",
          "Attached pronouns",
          "Detached pronouns",
          "Idafa (possession)",
          "Adjective agreement",
          "Case endings: marfu, mafud, mansub",
          "The double (mutanna)",
          "Nouns practice set",
        ],
      },
      {
        title: "Verb basics",
        lessons: 12,
        items: [
          "Past vs. present forms",
          "Form I trilateral verbs",
          "Common derived forms, an overview",
          "Verb subjects",
          "Weak verbs",
          "Negation patterns",
          "Commands and prohibitions",
          "Participles",
          "Verbs in Juz' Amma",
          "Conjugation drills",
          "Recognising forms in context",
          "Verb self-test",
        ],
      },
      {
        title: "Reading Qur'anic phrases",
        lessons: 12,
        items: [
          "First phrases with translation",
          "Ayat al-Kursi, phrase by phrase",
          "Short-surah phrases",
          "Prepositional phrases in context",
          "Relative clauses (alladhi)",
          "Irregular verbs in phrases",
          "The sentence-mapping method",
          "Translating short verses",
          "Comparing translations critically",
          "Reading with a dictionary",
          "Timed reading practice",
          "Final translation exercise",
        ],
      },
    ],
    sample: {
      lesson: "High-frequency particles",
      excerpt:
        "A handful of small words — inna, wa, fa, lan, qad — carry more weight in the Qur'an than any long vocabulary list. This lesson teaches the top particles first, so that from lesson two onward you already know how a sentence is pointing before you translate a single noun.",
      points: [
        "The 12 particles that appear on almost every page",
        "How one letter can flip a sentence's emphasis",
        "A drill that moves particles from recognition to recall",
      ],
      question:
        "Open any page of the Qur'an — how many of the twelve can you point out in thirty seconds?",
    },
    featuredReviews: [
      {
        quote:
          "Fourteen hours of lessons and I translate short verses on my own now. The particle-first order is genius — everything else falls into place after it.",
        name: "Omar Z.",
        meta: "Arabic for Qur'an learner",
      },
      {
        quote:
          "I tried apps for two years with nothing to show. Structured lessons plus weekly Q&A is what finally moved me.",
        name: "Aisha B.",
        meta: "Arabic for Qur'an learner",
      },
    ],
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
    outcomes: [
      "Parse simple Qur'anic sentences structure by structure",
      "Work with the most common verb forms",
      "Read connected short passages with support",
      "Translate short verses with growing confidence",
    ],
    curriculum: [
      {
        title: "Sentence structure",
        lessons: 9,
        items: [
          "Nominal vs. verbal sentences",
          "Predicate patterns",
          "Object positions",
          "Circumstantial phrases (hal)",
          "Conditioning: idha and in",
          "Coordination: wa, thumma, fa",
          "Questions and answers",
          "Negation structures",
          "Parsing workshop",
        ],
      },
      {
        title: "Verb forms",
        lessons: 9,
        items: [
          "Form I review",
          "Form IV: causation",
          "Form V: reflexive",
          "Form VIII: reciprocal",
          "Form X: seeking",
          "Form II and intensive meaning",
          "Weak-root forms",
          "Patterns across forms",
          "Form identification drill",
        ],
      },
      {
        title: "Connected reading",
        lessons: 9,
          items: [
          "Reading without translating first",
          "Chunking long ayahs",
          "Following the thread across ayahs",
          "Pronoun references: huwa, hum, ha",
          "Connectors: fa, wa, inna",
          "Reading selections from Al-Qasas",
          "Reading selections from Ar-Rahman",
          "Pausing for structure",
          "Passage reading check",
        ],
      },
      {
        title: "Translation skills",
        lessons: 9,
        items: [
          "Word order in translation",
          "Calque traps",
          "Rendering the idafa",
          "Translating verb aspect",
          "Keeping key Arabic terms",
          "Noting ambiguity honestly",
          "Editing your draft",
          "Comparing with a published translation",
          "Final translation piece",
        ],
      },
    ],
    sample: {
      lesson: "Nominal vs. verbal sentences",
      excerpt:
        "Every Qur'anic sentence is either nominal (built on a noun) or verbal (built on a verb) — and that choice changes what the writer emphasises. This lesson shows how the same meaning lands differently depending on which door the sentence walks through.",
      points: [
            "Spot the two sentence types instantly in any ayah",
        "Why the Qur'an often opens with the verb when action matters",
        "A parsing routine you will run on every passage from now on",
      ],
      question:
        "Take two ayahs you know well — which type is each, and what does the choice emphasise?",
    },
    featuredReviews: [
      {
        quote:
          "The bridge from grammar tables to actual passage reading is seamless. I stopped translating word-by-word and started seeing sentences.",
        name: "Tariq M.",
        meta: "Qur'anic Arabic: Next Steps learner",
      },
      {
        quote:
          "Perfect sequel to Arabic for Qur'an. The verb-form section alone re-clarified years of half-learned patterns.",
        name: "Sumaya D.",
        meta: "Qur'anic Arabic: Next Steps learner",
      },
    ],
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
    outcomes: [
      "Trace a single theme across multiple surahs",
      "Connect what you read to everyday decisions",
      "Write short, structured reflections",
      "Choose passages for your own weekly reflection",
    ],
    curriculum: [
      {
        title: "Mercy and compassion",
        lessons: 6,
        items: [
          "Defining rahma in the Qur'an",
          "Mercy in the openings",
          "Stories of mercy",
          "Self-mercy in practice",
          "Mercy and warning together",
          "Writing a mercy reflection",
        ],
      },
      {
        title: "Justice and patience",
        lessons: 6,
        items: [
          "Adl in Qur'anic ethics",
          "Patience as discipline",
          "Responding to harm",
          "Patience in the stories",
          "Justice at home and at work",
          "Writing a justice reflection",
        ],
      },
      {
        title: "Gratitude and worship",
        lessons: 6,
        items: [
          "Shukr beyond saying thanks",
          "Gratitude in provision",
          "Gratitude in hardship",
          "Worship as response",
          "Shukr and contentment",
          "Writing a gratitude reflection",
        ],
      },
      {
        title: "Bringing it together",
        lessons: 6,
        items: [
          "Themes across surahs",
          "Choosing your weekly theme",
          "Building a theme notebook",
          "Sharing reflections",
          "The theme-study method, reviewed",
          "Continuing after the course",
        ],
      },
    ],
    sample: {
      lesson: "Defining rahma in the Qur'an",
      excerpt:
        "Rahma is usually translated as mercy, but the Qur'an uses it as something active — a force that creates, nurtures, and keeps returning. This lesson gathers the word's key occurrences and lets you hear how its meaning widens from verse to verse.",
      points: [
        "Where rahma appears in the Qur'an's own openings",
        "How the word connects to creation, revelation, and community",
        "A reflection template you will use all course",
      ],
      question:
        "When did you last experience something you would call rahma — what did it actually look like?",
    },
    featuredReviews: [
      {
        quote:
          "The shortest course I have taken and the one I still think about. My Friday reflection routine started in module one.",
        name: "Layla P.",
        meta: "Themes & Reflection learner",
      },
      {
        quote:
          "Fatima connects verses to real decisions without watering anything down. It reads like study, not sentiment.",
        name: "Jonas E.",
        meta: "Themes & Reflection learner",
      },
    ],
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
    outcomes: [
      "Explain the structure of Juz' Amma and how its surahs relate",
      "Study short surahs with context and key vocabulary",
      "Recite with better understanding of meaning",
      "Keep a personal study sheet for each surah",
    ],
    curriculum: [
      {
        title: "Structure of Juz' Amma",
        lessons: 6,
        items: [
          "Where Juz' Amma sits in the mushaf",
          "The descending order",
          "Makki vs. Madani in this juz'",
          "Reading the juz' as pairs",
          "Surah groupings to know",
          "Your juz' study map",
        ],
      },
      {
        title: "Short surahs I",
        lessons: 8,
        items: [
          "An-Naba'",
          "An-Nazi'at",
          "Abasa",
          "At-Takwir",
          "Al-Infitar",
          "Al-Mutaffifin",
          "Al-Inshiqaq",
          "Al-Buruj",
        ],
      },
      {
        title: "Short surahs II",
        lessons: 8,
        items: [
          "At-Tariq",
          "Al-A'la",
          "Al-Ghashiyah",
          "Al-Fajr",
          "Al-Balad",
          "Ash-Shams",
          "Al-Layl",
          "Ad-Duha",
        ],
      },
      {
        title: "Key words and themes",
        lessons: 6,
        items: [
          "Recurring key words in Juz' Amma",
          "Names of Allah in the juz'",
          "Hereafter imagery",
          "Ethical vignettes",
          "Core vocabulary list: Juz' Amma",
          "Final review session",
        ],
      },
    ],
    sample: {
      lesson: "Where Juz' Amma sits in the mushaf",
      excerpt:
        "The last juz' is where most Muslims spend their recitation life — yet few know how it is organised. This lesson shows the descending structure of Juz' Amma and why the surahs are ordered the way they are, giving you a map for everything that follows.",
      points: [
        "The logic behind the juz's arrangement",
        "How to use pair-groupings when studying",
        "A one-page map for the whole juz'",
      ],
      question:
        "Which surahs of Juz' Amma do you already know well — and did you ever notice how they sit next to each other?",
    },
    featuredReviews: [
      {
        quote:
          "I memorised these surahs as a child without understanding them. This course filled in twenty years of blanks in eight lessons.",
        name: "Rashid A.",
        meta: "Studying Juz' Amma learner",
      },
      {
        quote:
          "Perfect starter before tafsir proper. Short, focused, and the key-word sessions stick with you during salah.",
        name: "Maryam J.",
        meta: "Studying Juz' Amma learner",
      },
    ],
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
    outcomes: [
      "Summarise the major stories and where they appear",
      "Identify the lessons each narrative is built around",
      "Place stories in their historical context",
      "Discuss a story with structure, not just retelling",
    ],
    curriculum: [
      {
        title: "Prophets in the Qur'an",
        lessons: 8,
        items: [
          "Adam: creation and trust",
          "Nuh: patience with a people",
          "Ibrahim: questioning and certainty",
          "Yusuf: from pit to palace",
          "Musa and Pharaoh",
          "Isa: signs and the limits of signs",
          "Muhammad in the Qur'an's own voice",
          "The prophets as one story",
        ],
      },
      {
        title: "Stories of patience",
        lessons: 8,
        items: [
          "Ayyub's illness",
          "Yunus in the whale",
          "Zakariyya's quiet dua",
          "Maryam's solitude",
          "The companions of the cave",
          "The owner of the two gardens",
          "Patience in the battle-context stories",
          "Choosing your patience story",
        ],
      },
      {
        title: "Stories and their lessons",
        lessons: 8,
        items: [
          "The people of the book",
          "The hypocrites' episode",
          "Bilal and the first call",
          "The people of the cave, revisited",
          "Context of Al-Ahzab",
          "Lessons vs. plot details",
          "Historical context essentials",
          "Extracting the moral properly",
        ],
      },
      {
        title: "Telling vs. studying stories",
        lessons: 6,
        items: [
          "Storytelling vs. study",
          "Do not invent dialogue",
          "Finding the story's claim",
          "Discussion prompts for groups",
          "Presenting a story in five minutes",
          "Final project: your story brief",
        ],
      },
    ],
    sample: {
      lesson: "Adam: creation and trust",
      excerpt:
        "The Qur'an opens its story cycle not with miracles but with a test of trust — and a mistake that becomes a lesson rather than a permanent stain. This lesson reads the Adam narrative as the Qur'an tells it, stripped of later folklore additions.",
      points: [
        "What the Qur'an actually says about the fall — and what it does not",
        "The role of Iblis as a pattern, not a detour",
        "How this story frames every prophet story that follows",
      ],
      question:
        "Where in your own life has a mistake turned into an instruction you now live by?",
    },
    featuredReviews: [
      {
        quote:
          "Finally a stories course that stays inside the Qur'anic text instead of importing folk tales. Structured, careful, and readable.",
        name: "Hiba C.",
        meta: "Stories in the Qur'an learner",
      },
      {
        quote:
          "The 'telling vs. studying' module made me a better discussion leader in our family halaqah.",
        name: "Farid W.",
        meta: "Stories in the Qur'an learner",
      },
    ],
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
    outcomes: [
      "Diagnose your own recurring recitation errors",
      "Drill specific rules with focused exercises",
      "Submit recordings and act on teacher feedback",
      "Recite longer passages with steadier rules",
    ],
    curriculum: [
      {
        title: "Diagnostic recitation",
        lessons: 6,
        items: [
          "Recording your baseline",
          "Common error patterns",
          "The self-assessment checklist",
          "Identifying weak letters",
          "Choosing focus rules",
          "Setting lab goals",
        ],
      },
      {
        title: "Targeted rule drills",
        lessons: 10,
        items: [
          "Izhar drill set",
          "Iqlab drill set",
          "Ikhfa drill set",
          "Idgham drill set",
          "Meem sakinah drills",
          "Madd length drills",
          "Ghunnah timing drills",
          "Waqf choice drills",
          "Mixed rule sprints",
          "Timed accuracy runs",
        ],
      },
      {
        title: "Guided practice rounds",
        lessons: 8,
        items: [
          "Round 1: short surahs",
          "Round 2: Al-Fatihah polish",
          "Round 3: long-ayah chunking",
          "Round 4: Juz' Amma selection",
          "Round 5: unfamiliar passage",
          "Round 6: slow, precise pass",
          "Round 7: natural-pace pass",
          "Round 8: mock assessment",
        ],
      },
      {
        title: "Feedback and fixes",
        lessons: 6,
        items: [
          "Reading teacher notes",
          "Fixing your top three errors",
          "Re-record and compare",
          "When to request extra review",
          "Building your correction sheet",
          "Final recitation submission",
        ],
      },
    ],
    sample: {
      lesson: "Recording your baseline",
      excerpt:
        "You cannot fix what you cannot hear. This lesson sets up your diagnostic recording — a two-minute passage read naturally, no warm-up — and walks you through marking it against a checklist so every later drill targets a real, observed error.",
      points: [
        "What equipment and environment you need (less than you think)",
        "The exact marking checklist used in the course",
        "How to choose your top three errors without overwhelm",
      ],
      question:
        "Listen to yourself reciting today — which error shows up in almost every line?",
    },
    featuredReviews: [
      {
        quote:
          "Theory courses told me the rules; this lab made them automatic. The re-record and compare exercise is brutally effective.",
        name: "Suleiman K.",
        meta: "Tajwid Practice Lab learner",
      },
      {
        quote:
          "Personal feedback on my recordings within two days. My ghunnah timing finally sounds consistent.",
        name: "Rabia R.",
        meta: "Tajwid Practice Lab learner",
      },
    ],
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
    outcomes: [
      "Audit what you know and what is slipping",
      "Build a spaced revision plan that fits your week",
      "Drill weak points before they fade",
      "Keep long-term retention without daily overload",
    ],
    curriculum: [
      {
        title: "Auditing what you know",
        lessons: 6,
        items: [
          "Listing what you know",
          "The cold-recitation test method",
          "Marking shaky passages",
          "Heat-map your hifz",
          "Setting revision priorities",
          "Audit worksheet walkthrough",
        ],
      },
      {
        title: "Spaced revision plans",
        lessons: 8,
        items: [
          "Spacing intervals that work",
          "Daily revision blocks",
          "Weekly full runs",
          "Monthly cycles",
          "Balancing new and old",
          "Fitting revision into a busy week",
          "Tracking revision simply",
          "Your eight-week revision plan",
        ],
      },
      {
        title: "Weak-point drills",
        lessons: 6,
        items: [
          "Targeting sticky ayahs",
          "Similar-verse confusion",
          "Beginning-of-surah anchors",
          "Mid-surah drop-offs",
          "Timed weak-point reps",
          "Clearing your weak list",
        ],
      },
      {
        title: "Long-term retention",
        lessons: 6,
        items: [
          "The forgetting curve, plainly",
          "Audio companionship",
          "Group revision benefits",
          "Keeping hifz during travel or illness",
          "The annual review cycle",
          "Sustaining after the course",
        ],
      },
    ],
    sample: {
      lesson: "Listing what you know",
      excerpt:
        "Revision fails when it is vague. This first lesson builds an honest inventory of your hifz — what is solid, what is shaky, what is gone — so your revision plan points at reality instead of at the comfortable parts you already know well.",
      points: [
        "A simple inventory format: solid / shaky / lost",
        "Why 'I think I know it' is not a status",
        "How the inventory drives every plan that follows",
      ],
      question:
        "If tested cold tonight on any surah you have memorised — which ones would you bet on, and which ones would you hesitate on?",
    },
    featuredReviews: [
      {
        quote:
          "I had 30 surahs 'memorised' and no idea which ones were real. The audit showed me — and the plan fixed them.",
        name: "Adam Y.",
        meta: "Revision & Retention learner",
      },
      {
        quote:
          "Forty minutes a week, structured, no guilt. Everything I memorised for my wedding two years ago is back and stable.",
        name: "Noor S.",
        meta: "Revision & Retention learner",
      },
    ],
  },
];
