export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. "2026-09-10". */
  date: string;
  readMins: number;
  topic: string;
  sections: BlogSection[];
}

export const POSTS: Post[] = [
  {
    slug: "how-to-approach-a-surah",
    title: "How to approach a surah: a five-step reading method",
    description:
      "A practical method for reading any surah with attention — structure, context, themes, and reflection — in under thirty minutes.",
    date: "2026-09-10",
    readMins: 6,
    topic: "Foundations",
    sections: [
      {
        paragraphs: [
          "Most of us open the Qur'an, read a translation of a few verses, close it, and carry on with the day. Nothing wrong with that — but it is not study. Study is what happens when a reading leaves a mark you can point to a week later.",
          "The method below is what we teach in the first modules of Understanding the Qur'an. It takes about twenty to thirty minutes for a short surah, and it works equally well on Al-Fatihah and on a long passage you have been avoiding.",
        ],
      },
      {
        heading: "1. Read the whole surah once, without stopping",
        paragraphs: [
          "Before you look up a single word, read the surah end to end in your preferred translation. The goal is to feel its shape: where it opens, where it turns, where it lands.",
          "Resist the urge to analyse on this pass. You are gathering the terrain, not conquering it.",
        ],
      },
      {
        heading: "2. Mark the structure",
        paragraphs: [
          "On a sheet of paper, write the verse numbers where the subject shifts. Most surahs divide into three to five blocks: an opening address, a set of signs or stories, a warning or promise, and a closing line.",
          "You are not producing a scholarly commentary. You are answering one question: what is this surah doing, in order?",
        ],
      },
      {
        heading: "3. Get the context",
        paragraphs: [
          "Look up the occasion of revelation if one is recorded for a key verse, and note whether the surah is Makki or Madani. Context does not replace the text — it explains why the text takes the form it does.",
          "One reliable source in your notes is enough. Do not open five tafsirs on day one; you will drown.",
        ],
      },
      {
        heading: "4. Trace one theme",
        paragraphs: [
          "Pick a single thread — mercy, patience, gratitude, warning — and highlight every verse that touches it. Watching one theme run across a surah teaches you more than a summary of every verse at once.",
          "By the end you should be able to say, in one sentence, what the surah says about your chosen theme.",
        ],
      },
      {
        heading: "5. Write one reflection and one action",
        paragraphs: [
          "Close the notes with two lines. First: what I understand now that I did not before. Second: one thing this changes this week — a habit, an apology, a practice, a conversation.",
          "A reading without a next step evaporates by Thursday. A reading with one small action compounds.",
        ],
      },
      {
        paragraphs: [
          "That is the whole method: read, mark, contextualise, trace, act. Do it weekly on one surah and in a year you will have studied fifty-two with real understanding — not fifty-two skimmed.",
          "If you want the method guided, with worksheets and teacher feedback, it is the spine of our Understanding the Qur'an course.",
        ],
      },
    ],
  },
  {
    slug: "memorization-routine-that-survives-a-busy-week",
    title: "A memorization routine that survives a busy week",
    description:
      "Why oversized hifz targets fail, and how to size a daily routine for your worst week instead of your best one.",
    date: "2026-09-02",
    readMins: 5,
    topic: "Memorization",
    sections: [
      {
        paragraphs: [
          "The usual pattern: motivation spikes on Sunday, ten new lines are memorised, life gets loud on Wednesday, the ten lines are half-forgotten by Friday, and by the next Sunday the whole project feels like a failure worth abandoning.",
          "The problem is almost never sincerity. It is target size.",
        ],
      },
      {
        heading: "Size the routine for your worst week",
        paragraphs: [
          "Ask a different question than 'how much can I memorise?' Ask: what can I still do on the week my child is sick, my deadline lands, and I travel mid-week?",
          "For most people that answer is fifteen to twenty minutes a day, or even ten. That number is not a compromise — it is the target. Everything above it is a bonus you add on good days, never a baseline you promise on hard ones.",
        ],
      },
      {
        heading: "Anchor it to something you already do",
        paragraphs: [
          "New habits that float unattached die. Attach the session to an existing one: after Fajr, after the school run, immediately before lunch, right after you get home and before you sit down.",
          "The cue matters more than the duration. Ten minutes attached to a daily anchor will outperform an hour you have to remember.",
        ],
      },
      {
        heading: "Protect first-day repeats",
        paragraphs: [
          "New material is fragile in the first forty-eight hours. If you only ever add and never repeat, you are not memorising — you are accumulating amnesia with good intentions.",
          "A workable split: new lines first, then repeat everything from the last three days, then one longer run of older material. On exhausted days, drop the new entirely and keep the repeats.",
        ],
      },
      {
        heading: "Track, do not judge",
        paragraphs: [
          "Keep a plain ledger: date, lines added, minutes spent, what was repeated. No streaks, no scores, no shame column. The ledger exists so that when a plateau comes — and it will — you can see that you are still showing up.",
          "Plateaus are data, not verdicts. They usually mean the revision system needs adjusting, not that you have stopped being able to memorise.",
        ],
      },
      {
        paragraphs: [
          "Motivation got you this far. A routine sized for real life is what keeps you there. Start smaller than you think you need to, attach it to an anchor you already keep, and protect the repeats before anything else.",
          "The full weekly plan, ledger template, and revision cycles are laid out in Memorization Foundations.",
        ],
      },
    ],
  },
  {
    slug: "what-tajwid-actually-changes",
    title: "What tajwid rules actually change in your recitation",
    description:
      "Tajwid is often taught as a list of rules to pass. In practice it changes three things: accuracy, meaning, and presence.",
    date: "2026-08-24",
    readMins: 5,
    topic: "Tajwid",
    sections: [
      {
        paragraphs: [
          "Ask learners why they want tajwid and you hear variants of: because I should, because my Arabic teacher said so, because I want to recite properly in Taraweeh. All true. None of them explain what actually changes on day thirty-one.",
          "Three things change. They are worth naming, because they tell you what to practise and what to ignore.",
        ],
      },
      {
        heading: "1. The words you produce match the words you mean",
        paragraphs: [
          "This is the obvious one. A misplaced letter, a swallowed noon, a ghunnah held too long — these are not cosmetic. Arabic is a language where a vowel or a doubling can shift the word entirely.",
          "Tajwid, at its core, is pronunciation hygiene. It makes the sounds you intend the sounds that leave your mouth, especially under speed or emotion.",
        ],
      },
      {
        heading: "2. Stopping and starting stops breaking sentences",
        paragraphs: [
          "Rules of waqf — where to stop, where not to — are the least glamorous and most transformative part of tajwid. A well-placed stop keeps a promise; a careless one inverts it.",
          "If you lead prayers or read to your family, learning where NOT to stop will change how you are understood more than any single letter rule.",
        ],
      },
      {
        heading: "3. Recitation slows down enough to think",
        paragraphs: [
          "Ghunnah timing, measured madd, deliberate waqf — all of it forces a pace at which meaning can catch up with sound. Rushed recitation is fluent and empty; ruled recitation is slower and alive.",
          "This is why the same surah felt different after your first tajwid lesson: you were hearing it, not just clearing it.",
        ],
      },
      {
        heading: "What to practise first",
        paragraphs: [
          "If you are starting from zero, order matters. Points of articulation first — if the letters are wrong, rules only standardise the wrongness. Then noon sakinah and meem sakinah, because they appear on every page. Then waqf. Madd and the finer points come after the basics are automatic.",
          "And practise by recording yourself. Your ear forgives your own recitation in real time; a recording does not.",
        ],
      },
      {
        paragraphs: [
          "Tajwid is not a certificate to collect. It is accuracy, intelligibility, and presence — in that order of practical value. Learn it in that order too.",
          "If you want the drills and feedback loop, Tajwid Essentials covers the rules and Tajwid Practice Lab turns them automatic.",
        ],
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
