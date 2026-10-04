# Brushup

A compact, searchable reference site for quickly refreshing software concepts. Python is the first topic collection; keep the Brushup brand broad so more subjects can be added later.

## Run & Operate

- `pnpm --filter @workspace/python-brush-up run dev` — run the Brushup web app
- `pnpm --filter @workspace/python-brush-up run typecheck` — check the app's TypeScript

## Stack

- React, TypeScript, Vite, Tailwind CSS, React Router
- Frontend-only: no app backend, database, or login

## Where things live

- `artifacts/python-brush-up/src/App.tsx` — routes, shared layout, search, and page rendering
- `artifacts/python-brush-up/src/content/` — topic catalog, refresher copy, and Markdown lessons

## Architecture decisions

- Keep lesson copy outside React components so topic sets can grow independently from the UI.
- Keep Python as the first subject collection, not part of the product name.
- Use short plain-English explanations and compact API/method tables so lessons are easy to scan.

## Product

- Home, topic index, topic detail, and a quick refresher
- Client-side search across lessons and API names
- Light and dark themes

## User preferences

- Use simpler wording and explain useful built-in functions, methods, and related APIs with examples.
- Keep topic pages complete enough to refresh the important details quickly.

## Gotchas

- Lesson Markdown tables are rendered by the app's own Markdown renderer; keep the table format consistent with existing lessons.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
