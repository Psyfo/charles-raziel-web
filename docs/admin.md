# Charles Raziel — Admin, CMS & Email Plan

Plan for the content layer: a **custom admin dashboard** backed by a **Sanity** project
(with the Sanity Studio kept as a fallback), an **auth** layer, a **route-group split**
(public vs admin), and **ZeptoMail** for transactional email. Companion: [PLAN.md](./PLAN.md) ·
[brand.md](./brand.md).

Status: **plan only.** The site is static today (`src/data/*.ts`); this describes the migration.

## 1. Goals

- Charles (and the user) manage all content without touching code.
- A **bespoke, on-brand admin dashboard** (the user's own UI) is the primary editor.
- The **Sanity Studio** stays available at `/studio` as a reliable fallback.
- Clean separation of the public site and the admin app.
- Beautiful transactional emails via **ZeptoMail** (Zoho), matching the existing Zoho Invoice stack.

## 2. Route-group restructure

Next.js route groups `( )` don't affect URLs — they let us give the public site and the admin
completely different layouts/chrome.

```
src/app/
  layout.tsx                      root: <html>/<body>, fonts, viewport  (stays)
  page.tsx                        redirect / -> /en                     (stays)
  not-found.tsx, sitemap.ts, robots.ts, manifest.ts, icon.svg,
  apple-icon.tsx, opengraph-image.tsx                                   (stay at root)

  (public)/                       public site — current locale layout
    [locale]/
      layout.tsx                  SiteHeader + SiteFooter
      page.tsx, films/, stills/[slug], about/, services/, contact/, book/, terms/

  (admin)/                        admin app — its own shell, no public header/footer
    admin/
      layout.tsx                  admin shell (sidebar, top bar, auth guard)
      page.tsx                    dashboard (counts, recent edits, quick actions)
      reels/                      list + create/edit reel
      collections/                list + create/edit photo collections
      services/                   edit the three services
      pages/                      edit home/about copy
      settings/                   site settings, socials, Acuity URL, SEO
      login/page.tsx             sign-in

  studio/[[...tool]]/page.tsx     Sanity Studio (embedded, custom-themed) — fallback

  api/                            route handlers
    contact/route.ts              validate + send via ZeptoMail
    revalidate/route.ts           Sanity webhook -> on-demand revalidation
```

**Migration note:** moving `app/[locale]/*` into `app/(public)/[locale]/*` is a file move only;
imports use the `@/` alias so they're unaffected. Metadata routes and the root redirect stay at
`app/` root (outside groups).

## 3. Sanity

- **Project:** create at sanity.io → `projectId` + `dataset` (`production`). Free tier covers this.
- **Client:** `next-sanity` (`@sanity/client`) for reads via **GROQ** in server components, replacing
  `src/data/reels.ts`, `collections.ts`, and the dictionary content blocks.
- **Image pipeline:** Sanity image CDN with `@sanity/image-url` (responsive, hotspot crop, AVIF/WebP)
  replaces the local `public/images/*`. Video stays on Cloudflare Stream; reels store the playback id +
  a Sanity poster.
- **Localization:** field-level EN/CS via `@sanity/document-internationalization` or
  internationalized-array fields, matching the current `{en,cs}` shape.

### Schemas (mirror today's types)

- **reel** — `title{en,cs}`, `slug`, `category` (ref), `videoProvider`, `playbackId`, `poster`,
  `aspectRatio`, `durationSeconds`, `caption{en,cs}`, `featured`, `publishedAt`, `seo`.
- **collection** (photoSet) — `title{en,cs}`, `slug`, `kicker{en,cs}`, `description{en,cs}`,
  `cover`, `images[]` (hotspot), `client`, `order`.
- **category** — `title{en,cs}`, `slug`, `order`.
- **service** — `title{en,cs}`, `summary{en,cs}`, `body{en,cs}`, `image`, `priceNote{en,cs}`, `order`.
- **page** — sections for home/about (`hero`, `richText{en,cs}`, `portrait`, `pullQuote{en,cs}`).
- **siteSettings** (singleton) — nav labels{en,cs}, socials, contact email, location, Acuity URL,
  default SEO/OG.

### Studio (fallback)

Embedded at `/studio` via `next-sanity`, custom-themed to the brand (ink/bone/brass) with
`defineConfig({ theme })` + custom `studio.components`. Always works even if the bespoke admin breaks.

## 4. Custom admin dashboard

Built in the `(admin)` group with the existing design system (Fraunces/Archivo/Inter, ink/bone/brass).

- **Reads:** same Sanity client/GROQ as the public site.
- **Writes:** a **server-side write token** (`SANITY_API_WRITE_TOKEN`, never sent to the client).
  Mutations run through **server actions** (or `app/api` route handlers) that call
  `client.create/patch/delete`. The browser never holds the token.
- **Uploads:** images go to Sanity assets via a server action; the admin UI shows the Sanity CDN URL.
- **UX:** dashboard with content counts + recent edits; list views with inline edit; a bespoke
  **reel editor** (thumbnail, duration, provider preview) and **collection editor** (drag-to-order
  image grid). This is where the "gorgeous custom admin" lives.
- **Optional path:** Sanity's **App SDK** (`@sanity/sdk-react`) can power the dashboard with
  Sanity-managed auth if we'd rather not run our own write token. Decide in Phase 1 (see §8).

## 5. Auth

Protect everything under `/admin` and the write APIs.

- **Auth.js (NextAuth v5)** with either a Google provider restricted to an email allowlist
  (Charles + the user) or a credentials provider with a hashed password in env. Google is cleaner.
- **Route protection:** Next 16 renamed middleware to **`proxy.ts`** (`src/proxy.ts`) — gate
  `/admin/:path*` there, redirecting unauthenticated users to `/admin/login`.
- Server actions/APIs re-check the session before any mutation (defense in depth).
- The Studio at `/studio` uses Sanity's own login (separate, fine).

## 6. ZeptoMail (transactional email)

Zoho's ZeptoMail, consistent with the existing Zoho Invoice stack.

- **Use cases:** contact-form notification to Charles + branded auto-reply to the sender;
  later, booking confirmations.
- **Integration:** ZeptoMail HTTP API (token in `ZEPTOMAIL_TOKEN`) from a server route
  (`app/api/contact/route.ts`). The contact form (already Zod-validated) POSTs here instead of
  building a `mailto:`; success still shows the custom dialog.
- **Templates:** ZeptoMail template API (or server-rendered HTML) styled to the brand —
  dark canvas, brass accent, Fraunces wordmark. Two templates: "new enquiry" (to Charles) and
  "we got your message" (to the client).
- **DNS:** ZeptoMail needs SPF/DKIM records on the sending domain — do this at the custom-domain
  cutover.

## 7. Data migration

1. Stand up Sanity + schemas; seed from the current `reels.ts` / `collections.ts` / dict content
   (a one-off import script using the write token).
2. Re-host the 24 master videos on Cloudflare Stream; set `playbackId` + poster per reel.
3. Swap the front-end reads from local modules to GROQ queries (server components; types via
   `sanity-typegen`).
4. Wire on-demand revalidation: a Sanity webhook → `app/api/revalidate` so edits go live fast.

## 8. Phased rollout

- **P1 — Foundation:** route-group split; create Sanity project + schemas; embed themed Studio;
  Sanity client + image-url; decide write-token-admin vs App SDK.
- **P2 — Read swap:** move reels/collections/services/pages/settings reads to Sanity; seed content;
  revalidation webhook.
- **P3 — Custom admin:** Auth.js + `proxy.ts` guard; dashboard; reel + collection editors; uploads.
- **P4 — Email:** ZeptoMail templates + `api/contact`; point the contact form at it.
- **P5 — Video + launch:** Cloudflare Stream masters; custom domain DNS (+ ZeptoMail SPF/DKIM).

## 9. Env / secrets (Doppler or Vercel envs)

`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_WRITE_TOKEN`,
`SANITY_WEBHOOK_SECRET`, `AUTH_SECRET`, `AUTH_GOOGLE_ID`/`AUTH_GOOGLE_SECRET` (+ allowlist),
`ZEPTOMAIL_TOKEN`, `CONTACT_TO_EMAIL`, Cloudflare Stream creds.

## 10. Needs from you

- A **Sanity** account/login (then I create the project + schemas).
- The **admin allowlist** (which emails can sign in).
- A **ZeptoMail** account + verified sender, and Charles's real inbox for `CONTACT_TO_EMAIL`.
- Confirm: custom admin via **own write token** (more control) vs **Sanity App SDK** (Sanity-managed auth).
