# Charles Raziel — Build Plan

Rebuild of [charlesrazielvideography.com](https://www.charlesrazielvideography.com) off Squarespace
into a custom, cinematic, bilingual portfolio. Companion docs: [brand.md](./brand.md) ·
audit in [`../scrape/notes/findings.md`](../scrape/notes/findings.md).

## 1. Goals

- Beautiful, fast, **reel-first** presentation that does justice to strong source material.
- **Design-led and unconstrained** — art direction per [brand.md](./brand.md), not bounded by the old site.
- Full control, lower long-term cost than Squarespace Business.
- Easy self-maintenance (user assists Charles, per-incident / retainer) via a friendly CMS.
- Bilingual **EN (default) + CS** with a language picker (his clients are Czech).
- Keep what works: **Acuity** booking and **Zoho** invoicing, off-site payment.

## 2. Locked Stack

| Piece | Decision |
| ----- | -------- |
| Framework | **Next.js** (App Router) |
| Hosting | **Vercel** — launch on `charlesrazielvideography.vercel.app`; custom domain DNS repointed later by client. Pro ($20/mo) at launch. |
| CMS | **Sanity** (free tier), Studio embedded at `/studio`, **custom-themed** |
| Styling | Tailwind + CSS variables from [brand.md](./brand.md) |
| Type | Fraunces (display) · Archivo (structural) · Inter (text) — all via `next/font` |
| i18n | **next-intl**, locale routing `/` (en) + `/cs` |
| Video | **Cloudflare Stream** (re-host masters) — Bunny Stream as fallback |
| Images | **Sanity image CDN** (responsive transforms, AVIF/WebP) |
| Booking | **Acuity Scheduling** (embed, unchanged) |
| Invoicing | **Zoho Invoice** (off-site, unchanged) |
| Contact form | Serverless route + **Resend** (or Formspree) |
| Analytics | **Vercel Analytics** or **Plausible** |
| Payments | **None online.** Future tips/deposits = a Stripe/Ko-fi link, not a platform. |

## 3. Repo & Docs Layout

Single repo, single Vercel deploy (Studio co-located):

```
charles-raziel/
├─ docs/            brand.md, PLAN.md (this file), content-model.md, redirects.md
├─ scrape/          audit + raw HTML + findings (already captured)
├─ .github/workflows/  ci.yml (typecheck · lint · build)
├─ src/app/         Next.js App Router (localized [locale] segment)
├─ src/app/studio/  embedded Sanity Studio
├─ sanity/          schemas, structure, custom Studio theme + components
└─ public/          favicon/monogram, og fallbacks
```

## 4. Engineering Workflow — Git, CI/CD, Branch Protection

**Branch protection is mandatory. Everything moves via PR. No direct pushes to `main`.**

- **Repo:** GitHub `charles-raziel`. `main` is protected and treated as production.
- **Protection rules on `main`:** require a PR before merge; require status checks to pass (CI + Vercel preview); require branch up to date; linear history; block force-push and deletion. (Solo dev may self-approve, but the PR + green-check gate is enforced.)
- **Branches:** `feat/*`, `fix/*`, `chore/*`, cut from a freshly pulled `main`.
- **CI (GitHub Actions `ci.yml`, runs on every PR):** install → `tsc --noEmit` → `eslint .` → `next build`. This is the required status check. CI should never be the first to catch a type/compile error: run the gate locally before pushing.
- **CD — Vercel (native, the reason Vercel wins here):**
  - Every PR gets an automatic **preview deployment** (a real URL to review the branch). Wire it as a required check / review surface.
  - Merge to `main` → automatic **production deployment**. No custom deploy pipeline, no servers, no secrets juggling.
- **VPS contingency (not chosen):** if Charles ever went the VPS route like mobisynco / miracle / carina / ekuphumuleni, CD would need real work — GH Actions building then deploying via SSH/rsync or a Docker image to the host, plus PM2/systemd + nginx/Caddy, env via GH secrets or Doppler, and zero-downtime reload. **Vercel makes all of that moot**, which is exactly what a low-touch retainer wants. Recommendation: stay on Vercel; revisit only if cost or control ever forces it (Cloudflare Pages is the free-commercial middle ground before a full VPS).

## 5. Information Architecture

Consolidate the current 3 overlapping visual sections (Videos / Gallery / Photography) into a cleaner spine:

| New page | Replaces | Notes |
| -------- | -------- | ----- |
| **Home** | home | Reel-first: moving hero, featured reels, ethos, CTA to book. |
| **Films** | videos + collections | Reel grid with category filter; reel detail = full player. |
| **Stills** | photography + gallery | Photography + the "snapshots" set in one page; `kind` filter (photos vs stills-from-video) rather than two pages. |
| **About** | about | Editorial (light theme), portrait, ethos, Central Europe reach. |
| **Services** | services-store | 3 offerings as editorial cards, each → Book. No fake store. |
| **Book** | appointments | Acuity embed + consultation options. |
| **Contact** | contact | Form (Resend) + real social links + location. |
| **Terms** | terms-and-conditions | Light theme, long-form. |

All routes localized under `/[locale]`. Retire the `services-store` commerce pages entirely.

## 6. Sanity Content Models

Localization: **field-level** EN/CS via internationalized fields (one document per item, both languages inside). Schemas:

- **reel** — `title{en,cs}`, `slug`, `category` (ref), `videoProvider`, `playbackId`, `poster` (image), `aspectRatio` (default 9:16), `durationSeconds`, `caption{en,cs}`, `credits`, `featured` (bool), `publishedAt`, `seo`.
- **photoSet** — `title{en,cs}`, `slug`, `description{en,cs}`, `images[]` (hotspot), `kind` (photography | snapshots), `featured`, `publishedAt`.
- **category** — `title{en,cs}`, `slug`, `order` (Modelling, Locations, Concert, Choreographies, Dance workshops, Events…).
- **service** — `title{en,cs}`, `slug`, `summary{en,cs}`, `body{en,cs}`, `image`, `priceNote{en,cs}` (e.g. "from CZK 1,500"), `acuityLink`, `order`.
- **page** — flexible sections for Home/About (`hero`, `richText{en,cs}`, `portrait`, `pullQuote{en,cs}`).
- **siteSettings** (singleton) — wordmark, nav labels{en,cs}, socials, contact email, location, default SEO/OG, Acuity URL.

Seed task: migrate the 24 reels + photo sets, with clean slugs and real EN/CS titles (fixes the gibberish-slug problem).

## 7. Video Pipeline

1. Collect Charles's **original master files** (24 clips, ~25 min total, mostly 9:16). Do **not** rip the Squarespace blobs except as last-resort fallback (tokenized HLS = transcoded, not masters).
2. Upload to Cloudflare Stream → get `playbackId` + poster (or upload a chosen frame).
3. Reel card: poster by default, **muted loop on hover** (desktop) / tap-to-play (touch), HLS via the provider player or `hls.js`. Honor `prefers-reduced-motion`.
4. Reel detail page: full-screen-friendly player, title, caption, category, related reels.

Cost at this volume is a few dollars/month or less.

## 8. Design & Motion

Driven entirely by [brand.md](./brand.md) (v0.2): dark cinematic canvas, bone type, brass accent, Fraunces/Archivo/Inter on a perfect-fourth scale, 8px grid with wide asymmetric margins, choreographed reveals and hover-to-play loops. Tailwind theme generated from the brand CSS variables so tokens stay single-source.

## 9. Custom Sanity Studio

- Theme the Studio to the brand (ink/bone/brass) via `defineConfig({ theme })`.
- Custom `studio.components` (logo = CR monogram, navbar).
- Custom **reel input** component: thumbnail + duration + provider preview, so adding a reel feels bespoke, not like a form.
- Structure Builder: group by Reels / Stills / Services / Pages / Settings; singletons pinned.

## 10. SEO & Migration

- Fix every audit issue: unique titles (no more "Gallery 1"/"Store 2"), real meta descriptions, clean human slugs, fix homepage typo, wire real social links.
- `VideoObject` structured data per reel; `hreflang` for en/cs; generated `sitemap.xml` + `robots.txt`; per-page OG images.
- **Redirects:** launch is on the `vercel.app` subdomain, so 301s from old Squarespace URLs are wired but only take effect once the custom domain is repointed (client-managed, later). Map them now in `docs/redirects.md` so the cutover is a flip, not a scramble.

## 11. Integrations

- **Acuity:** embed the existing scheduler on Book + Services CTAs (unchanged).
- **Zoho:** unchanged, off-site after booking confirmation. No integration needed.
- **Contact form:** localized form → serverless route → Resend email to Charles (+ honeypot).
- **Analytics:** privacy-friendly (Plausible or Vercel Analytics).

## 12. Performance Targets

- LCP < 2.0s; no layout shift on hero/galleries (fix the current blank-flash via posters + blur-up).
- Sanity images: responsive `srcset`, AVIF/WebP, lazy below the fold.
- Video deferred until intent; posters lightweight.
- Lighthouse ≥ 95 across the board.

## 13. Delivery Phases

- **Phase 0 — Foundation:** create GitHub repo; **configure branch protection on `main` (PR-only)**; add `ci.yml` (typecheck · lint · build); scaffold Next.js + Tailwind + tokens + `next/font` (Fraunces/Archivo/Inter); embed Sanity Studio; connect Vercel, ship a hello-world to `charlesrazielvideography.vercel.app` with PR previews working.
- **Phase 1 — Content backbone:** Sanity schemas + custom Studio theme; i18n routing; siteSettings + nav + footer; seed categories.
- **Phase 2 — Video:** Cloudflare Stream setup, upload masters, reel card + detail, hover-to-play, Films page + filtering.
- **Phase 3 — Pages:** Stills, About, Services, Contact, Terms, Book (+ Acuity embed + contact form).
- **Phase 4 — Polish:** motion choreography, page transitions, OG images, SEO, redirects map, reduced-motion, QA in EN/CS.
- **Phase 5 — Launch:** Vercel Pro; verify on `vercel.app`; hand over Studio guide. Custom-domain DNS repoint done by client when ready (redirects flip on at that point).

Per the model-economy convention: main session writes specs/schemas and reviews diffs; **bulk component implementation delegated to subagents** (Sonnet/Haiku) once each phase's spec is locked. Each PR must pass the local quality gate before push.

## 14. Open / Resolved Decisions

- ✅ **Design:** full latitude granted to design lead; brand.md v0.2 is the direction.
- ✅ **Fonts:** Fraunces / Archivo / Inter (Anton dropped; all cover Czech glyphs).
- ✅ **Domain:** launch on `charlesrazielvideography.vercel.app`; client repoints custom-domain DNS later.
- ✅ **Git/CI:** branch protection + PR-only + GH Actions, mandatory. Vercel for CD.
- ✅ **Video host:** proceeding with Cloudflare Stream (Bunny fallback).
- ✅ **Stills:** photography + snapshots merged into one page with a `kind` filter.
- ⏳ **External dependency:** Charles to supply original master files for all 24 reels.

---

_Plan version: 0.2 · 2026-06-21_
