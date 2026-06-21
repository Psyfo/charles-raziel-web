# Charles Raziel — Web

Cinematic, bilingual (EN/CS) portfolio for Charles Raziel, a Brno-based videographer and dancer.
Rebuild off Squarespace. Reel-first, dark editorial art direction.

Live (preview): https://charlesrazielvideography.vercel.app

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (design tokens in `src/app/globals.css`)
- **next/font** — Fraunces (display) · Archivo (structural) · Inter (text), `latin-ext` for Czech
- Lightweight i18n via a `[locale]` segment (`/en`, `/cs`) + JSON dictionaries (no middleware)
- Deployed on **Vercel**

## Scripts

```bash
npm run dev        # local dev (Turbopack)
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Structure

```
src/
  app/
    layout.tsx            root layout: fonts, metadata, <html>/<body>
    page.tsx              redirects / -> /en
    icon.svg              favicon (crescent/aperture mark)
    opengraph-image.tsx   dynamic OG image
    [locale]/             en + cs pages (home, films, stills, about, services, contact, book, terms)
  components/             logo, header, footer, reel-card, reel-grid, contact-form
  data/reels.ts           reel catalogue (titles real, video = placeholder)
  i18n/                   config, dictionaries, en.json, cs.json
  lib/cn.ts               className helper
docs/                     brand.md, PLAN.md
```

## Status — what's real vs. placeholder

This is **Phase 0/1**: a complete, deployable foundation with the full design system and all pages.

Placeholders to replace as assets/credentials arrive:
- **Video:** reels use a single placeholder clip (`src/data/reels.ts`). Replace with Charles's masters re-hosted on **Cloudflare Stream** (titles, categories, and durations are already real).
- **CMS:** content is a typed local module, shaped to the planned **Sanity** schema. Wire Sanity (custom-themed Studio) in Phase 1.
- **Booking:** `/book` has a placeholder box for the **Acuity** embed.
- **Contact form:** posts via `mailto:` to a placeholder address; wire **Resend** + a real inbox in Phase 3.
- **Stills:** branded placeholder tiles until the real galleries are added.
- **Socials:** footer links point to platform roots until handles are supplied.

See `docs/PLAN.md` for the full roadmap and `docs/brand.md` for the design system.

## Workflow

`main` is protected. All changes go through a PR; CI (`.github/workflows/ci.yml`) runs
typecheck + lint + build and must pass before merge. Vercel deploys previews per PR and
production on merge to `main`.
