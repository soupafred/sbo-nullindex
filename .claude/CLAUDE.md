# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Something** by **nullindex** — a web Back-Office platform for event operations. Users are event-operator companies, independent event organizers, and ticket issuers.

- **Current focus:** Event and Ticket operations. Coupons and other modules come in a later stage — don't build ahead for them.
- **Scope:** Frontend only. There is no backend yet, so API calls must go through a mockable boundary that can be swapped for the real BE later.
- **Out of scope:** A separate mobile app (for ticket buyers / coupon users) is planned but is not this repo's responsibility.
- **Pending from the user** (don't invent these; ask if blocked):
  - System specification & requirements
  - Code architecture / folder conventions
  - UI design system — no colors, typography, or component styling defined yet. Keep components unstyled/neutral until specified.
- **Priorities:** Runtime performance and UX are first-class. Favor lazy-loaded routes/components, minimal client JS, and avoiding unnecessary reactivity or re-renders.

Project context (specs, decisions) lives in `.claude/`. When the user provides specs or architecture docs, store them there and reference them from this file.

## Stack

Nuxt 4 (srcDir is `app/`) · Vue 3 · TypeScript · pnpm.
Nuxt modules: `@nuxt/eslint`, `@nuxt/fonts`, `@nuxt/icon`, `@nuxt/image`, `@nuxt/test-utils`, `@pinia/nuxt` (state management).
Also installed but **not yet used**: `reka-ui` (headless UI primitives — the likely base for components once design lands).

`app/app.vue` is still the Nuxt starter (`<NuxtWelcome />`); there are no pages, layouts, or components yet.

## Commands

```bash
pnpm install            # also runs `nuxt prepare` (generates .nuxt/, needed by eslint & tsconfig)
pnpm dev                # http://localhost:3000
pnpm build              # production build
pnpm preview            # preview production build
pnpm lint               # eslint (config generated into .nuxt/eslint.config.mjs)
pnpm lint:fix
```

### Tests

All tests live under `tests/` (single root — don't create a `test/` folder):

| Runner | Project | Location | Environment |
|---|---|---|---|
| Vitest | `unit` | `tests/unit/*.{test,spec}.ts` | node |
| Vitest | `nuxt` | `tests/nuxt/*.{test,spec}.ts` | Nuxt runtime + happy-dom |
| Playwright | `chromium` | `tests/e2e/` | real browser via `@nuxt/test-utils/playwright` |

Playwright is scoped to `tests/e2e/` so it never picks up Vitest specs (both use `*.spec.ts`).

```bash
pnpm test:unit                     # vitest --project unit
pnpm test:nuxt                     # vitest --project nuxt
pnpm test -- --run                 # all vitest projects, single run (plain `pnpm test` watches)
pnpm exec vitest run tests/unit/foo.test.ts       # single file
pnpm exec vitest run -t "test name"               # single test by name
pnpm test:e2e                      # playwright
pnpm exec playwright test tests/e2e/foo.spec.ts -g "name"
```

Vitest globs are non-recursive (`tests/unit/*`), so tests in subfolders won't be picked up unless `vitest.config.ts` is changed.

## Environment notes

Development happens on Windows. If `.nuxt/` is missing or stale (eslint/TS errors about missing imports), run `pnpm exec nuxt prepare`.
