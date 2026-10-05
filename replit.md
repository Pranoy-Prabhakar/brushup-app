# Brushup

A compact, searchable reference site for quickly refreshing software concepts. Python is the first topic collection; keep the Brushup brand broad so more subjects can be added later.

## Run & Operate

- `pnpm --filter @workspace/brushup-web run dev` — run the Brushup web app
- `pnpm --filter @workspace/brushup-web run typecheck` — check the app's TypeScript

## Stack

- React, TypeScript, Vite, Tailwind CSS, React Router
- Frontend-only: no app backend, database, or login

## Where things live

- `artifacts/python-brush-up/src/App.tsx` — shared routes, layout, search, and page rendering
- `artifacts/python-brush-up/src/modules/` — module registry, module configuration, and topic content
- `artifacts/python-brush-up/src/modules/<module>/topics/` — Markdown lessons with frontmatter metadata

## Architecture decisions

- Keep lesson copy and its metadata together in Markdown so topic sets can grow independently from the UI.
- Keep Python as the first subject collection, not part of the product name.
- Use short plain-English explanations and compact API/method tables so lessons are easy to scan.

## Product

- Responsive module picker: Python is live; SQL, PySpark, and System Design are planned
- Python has a topic index, topic detail pages, and a Quick Refresher
- Planned modules are explicitly labeled; do not invent lesson content before it is requested
- Global client-side search spans all live modules
- Light and dark themes

## User preferences

- Use simpler wording and explain useful built-in functions, methods, and related APIs with examples.
- Keep topic pages complete enough to refresh the important details quickly.

## Gotchas

- Lesson Markdown is rendered with `react-markdown` and GitHub-flavored Markdown.
- Use `/python/topics` and `/python/quick-refresher` for new Python links; keep the older `/topics` and `/quick-refresher` routes working for existing bookmarks.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
