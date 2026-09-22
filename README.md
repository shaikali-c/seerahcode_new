# Seerah

Online Qur'anic education platform built with Next.js (App Router), Tailwind CSS v4, Motion, and Phosphor icons.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page: hero, program, how it works, featured courses, faculty preview, testimonials, enroll, FAQ, about |
| `/courses` | Full course catalog with search, category/level filters, and sorting |
| `/courses/[id]` | Course detail: outcomes, curriculum, instructor, related courses |
| `/faculty` | Filterable faculty directory |
| `/enroll` | 3-step checkout (review → details → payment), `?course=` for a specific course, `?step=` for deep-linking a step |
| `/login` | Sign in / create account (student or instructor) — demo only |
| `/terms`, `/privacy` | Legal pages |

## Develop

```bash
bun install
bun run dev
```

Open http://localhost:3000.

```bash
bun run lint   # eslint
bun run build  # production build
```

## Structure

- `app/` — routes, layout, metadata, sitemap, robots, 404
- `components/` — UI (header, footer, sections, forms)
- `data/` — `courses.ts`, `faculty.ts`, `program.ts`, `faq.ts` (single source of content)
- `public/img/` — images (currently a shared placeholder)
