# Something — Back Office

**Something** by **nullindex** is a web back-office platform for event management. It is used by event-operator companies, independent event organizers, and ticket issuers.

> **Status:** Early stage. This repository is the frontend only; the backend is not available yet. Customer-facing features (ticket buyers, coupon users) belong to a separate mobile app and are out of scope here.

## Scope

| Stage | Modules |
|---|---|
| Current | Event operations, Ticket operations |
| Next | Coupon management and more |

System specification, code architecture, and the UI design system will be defined as the project progresses.

## Tech stack

- [Nuxt 4](https://nuxt.com) (source in `app/`), Vue 3, TypeScript
- Pinia (state), Reka UI (headless components)
- `@nuxt/fonts`, `@nuxt/icon`, `@nuxt/image`
- ESLint via `@nuxt/eslint`
- Vitest + Playwright via `@nuxt/test-utils`
- pnpm

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview the production build |
| `pnpm generate` | Static generation |
| `pnpm lint` / `pnpm lint:fix` | Lint (and auto-fix) |
| `pnpm test:unit` | Unit tests (`tests/unit/`) |
| `pnpm test:nuxt` | Tests in the Nuxt runtime (`tests/nuxt/`) |
| `pnpm test:e2e` | End-to-end tests with Playwright (`tests/e2e/`) |

## Branches

- `releases/dev` — development (default)
- `releases/prod` — production

---

© nullindex
