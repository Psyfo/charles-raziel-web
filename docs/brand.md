# Charles Raziel — Brand Guidelines

> Standalone brand reference for the Charles Raziel videography site.
> Status: **v0.2 — art direction.** Client defers on aesthetics; design lead has full creative
> latitude. This is built for the established purpose (a reel-first cinematic portfolio for a
> dancer-filmmaker), not constrained by the previous Squarespace site.

## Brand Overview

**Name:** Charles Raziel
**Descriptor:** Video & Cinematography
**Based:** Brno, Czech Republic · works across Central Europe
**Discipline:** Short-form cinematic video for dance, performance, modelling, and events. Also editorial photography.
**Positioning line:** _"Visual storytelling through movement, shadow, and atmosphere."_
**One-liner:** A dancer-turned-filmmaker making intimate, atmospheric short films of bodies in motion.

## Aesthetic Philosophy

The brand is a **dark cinema and a fashion magazine spread, fused.** The screen is the gallery; the page is the layout. Six principles, each a design-theory decision, not a taste preference:

1. **Figure–ground is the whole game.** His work is warm, luminous, polychromatic. A near-black ground turns every reel and still into the luminous *figure*. The interface is the dark room; his footage is the projected light. This is why the canvas is dark, not a mood choice.
2. **The work is the only chroma.** Because his imagery spans every hue (amber Christmas light, magenta studio gels, cool daylight), the brand frame must be **achromatic plus one accent**. Any louder brand color would fight the imagery. Drama comes from contrast, scale, space, and motion, never from brand saturation.
3. **Dramatic typographic contrast.** A high-contrast display serif against a tight structural grotesque. Big jumps in scale (a perfect-fourth ratio), not gentle steps. The body, the curve, the line: the type should feel like couture, the structure like a contact sheet.
4. **Negative space as composition.** Space is an active element, not leftover. Asymmetry and tension over centered safety. Let single images breathe at full bleed; let headlines sit off-axis.
5. **Motion on intent.** Stillness until the viewer leans in. Nothing autoplays with sound. Hover or tap brings a reel to life. The site rewards curiosity rather than demanding attention.
6. **Restraint is the flex.** Going all out here means precision, not ornament: an exact grid, a real type scale, choreographed motion, immaculate spacing. Discipline reads as premium.

## Brand Colors

A warm-neutral spine (ink + bone) plus a single antique-gold accent (brass). The neutrals carry a deliberate warm undertone so the dark never feels like cold digital black; it feels like a dim, warm room. Brass echoes the warm key-light in his footage and signals craft without shouting.

| Token | Hex | Role |
| ----- | --- | ---- |
| Ink (canvas) | `#0B0A08` | Primary background — warm near-black |
| Bone (light) | `#F5F2EA` | Text on dark, light-section background |
| Brass (accent) | `#C8A24A` | Accents, links, focus, rules, CTAs |

### Ink — warm neutral dark scale (canvas & surfaces)

- `--cr-ink-50:  #EAE8E3`
- `--cr-ink-100: #CCC8BF`
- `--cr-ink-200: #ABA69B`
- `--cr-ink-300: #898379`
- `--cr-ink-400: #625D54`
- `--cr-ink-500: #423E38`
- `--cr-ink-600: #2D2A25`
- `--cr-ink-700: #1E1C18`
- `--cr-ink-800: #141210`
- `--cr-ink-900: #0B0A08` (Primary canvas)

### Bone — warm off-white scale (light text & surfaces)

- `--cr-bone-50:  #FCFBF7`
- `--cr-bone-100: #F5F2EA` (Primary text-on-dark / light background)
- `--cr-bone-200: #ECE8DC`
- `--cr-bone-300: #DED8C8`
- `--cr-bone-400: #C9C1AD`
- `--cr-bone-500: #AFA68E`
- `--cr-bone-600: #928873`
- `--cr-bone-700: #746B59`
- `--cr-bone-800: #554F42`
- `--cr-bone-900: #37322A`

### Brass — antique-gold accent scale

- `--cr-brass-50:  #FAF3E1`
- `--cr-brass-100: #F1E2B7`
- `--cr-brass-200: #E6CD85`
- `--cr-brass-300: #DAB95B` (hover / focus ring on dark)
- `--cr-brass-400: #D0AB4D`
- `--cr-brass-500: #C8A24A` (Primary accent)
- `--cr-brass-600: #AB893B` (accent on light backgrounds)
- `--cr-brass-700: #886B2D`
- `--cr-brass-800: #654F20`
- `--cr-brass-900: #423514`

## Theme System

### Dark (default — cinematic)

- **Background:** `#0B0A08` (ink-900)
- **Surface / card:** `#141210` (ink-800)
- **Elevated / hover:** `#1E1C18` (ink-700)
- **Text:** `#F5F2EA` (bone-100)
- **Muted text:** `#AFA68E` (bone-500)
- **Accent:** `#C8A24A` (brass-500)
- **Hairline border:** `#1E1C18` (ink-700)
- **Focus ring:** `#DAB95B` (brass-300)

### Light (editorial — About, Terms, long-form)

- **Background:** `#FCFBF7` (bone-50)
- **Surface / card:** `#F5F2EA` (bone-100)
- **Text:** `#0B0A08` (ink-900)
- **Muted text:** `#625D54` (ink-400)
- **Accent:** `#AB893B` (brass-600 — darker for contrast on light)
- **Hairline border:** `#DED8C8` (bone-300)
- **Focus ring:** `#C8A24A` (brass-500)

## Typography

A fashion-editorial pairing: a high-contrast display **serif** for emotion, a structural **grotesque** for system and labels, and a neutral **sans** for reading. All three cover Latin Extended-A, so Czech diacritics (á č ď é ě í ň ó ř š ť ú ů ý ž) render perfectly.

### Display — Fraunces

[Fraunces](https://fonts.google.com/specimen/Fraunces) (variable; high `opsz`, high contrast, soft `WONK`). The hero voice: oversized headlines and the wordmark, often in italic for movement. Its old-style high contrast reads couture and feminine, matching the subject (the body, dance, elegance).

### Structural — Archivo

[Archivo](https://fonts.google.com/specimen/Archivo) (variable; use the Expanded grade for kickers/labels, heavy weights for occasional blunt impact). Uppercase, widely tracked. This is the contact-sheet voice: category labels, eyebrows, nav, metadata, captions. The architectural counterweight to Fraunces' curves.

### Text — Inter

[Inter](https://fonts.google.com/specimen/Inter) (variable). Body copy, UI, forms, anything that must simply be read. Invisible by design.

### Type Scale (perfect fourth, 1.333 · base 16px)

| Token | px (desktop) | Use |
| ----- | ------------ | --- |
| `--t-caption` | 12 | meta, eyebrows (Archivo, tracked) |
| `--t-body` | 16 | body (Inter) |
| `--t-lead` | 21 | intro paragraphs |
| `--t-h3` | 28 | sub-headings |
| `--t-h2` | 38 | section titles |
| `--t-h1` | 50 | page titles |
| `--t-display` | 67 | statement lines (Fraunces) |
| `--t-hero` | 90 | hero |
| `--t-mega` | 120 | full-bleed hero moments |

Render fluidly with `clamp()` between a mobile floor (~0.62×) and these desktop ceilings, e.g. hero = `clamp(48px, 9vw, 90px)`. Display/hero sizes use tight tracking (-0.02em) and ~0.95 line-height; body uses 1.6.

## Spacing & Grid

- **Spacing scale (8px base):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Vertical rhythm snaps to an 8px baseline.
- **Grid:** 12 columns, 24px gutters, fluid side margins (`clamp(20px, 6vw, 120px)`). Wide margins are part of the look.
- **Composition:** asymmetric by default. Place headlines and text blocks in a 5–7 column band offset from center; let key media go full-bleed (`100vw`). Use the rule-of-thirds and optical (not mathematical) centering.
- **Rhythm:** big sections, generous air. One idea per viewport. Reels are the repeating beat; everything else frames them.

## Logo / Wordmark

- **Primary wordmark:** `CHARLES RAZIEL` set in Fraunces, with `VIDEO & CINEMATOGRAPHY` beneath in Archivo, uppercase and tracked. The serif/grotesque pairing *is* the identity; no separate symbol required.
- **Monogram:** `CR` (Fraunces) for favicon, avatar, loading mark.
- **Color:** bone on ink / ink on bone. Brass reserved for accent strokes, never the full wordmark.

## Imagery

- **Every page leads with his work**, ideally moving (a muted reel loop) rather than a static image.
- Vertical 9:16 reels are the primary media unit and set the page's rhythm.
- Editorial portraits and stills fill the photography sections; crops generous, full-bleed where it earns it.
- No stock, no decorative icons. If it isn't his lens, it isn't on the page.

## Motion & Interaction

Motion is choreographed, not decorative. It should feel like a slow camera move and a curtain, never like a web animation.

- **Signature easing:** reveals use `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out, dramatic settle). Transitions use `cubic-bezier(0.65, 0, 0.35, 1)`.
- **Durations:** micro-interactions 150ms · standard 400ms · content reveal 600–800ms · page transition 500ms.
- **Scroll reveals:** content rises 16–24px and fades in as it enters; stagger grouped items 60–80ms. No bounce, ever.
- **Hover-to-play:** desktop reel cards play a muted loop on hover (poster until then); touch is tap-to-play. Subtle scale (1.0 → 1.02) and a brass hairline on hover.
- **Parallax:** restrained vertical parallax on full-bleed posters (≤ 8% travel).
- **Page transitions:** a brief film-curtain wipe / cross-fade between routes.
- **Cursor:** optional desktop cursor-aware brass highlight; tasteful, never gimmicky.
- **Reduced motion:** `prefers-reduced-motion` disables loops, parallax, and reveals; show posters and static layouts.

## Voice & Tone

- **Voice:** artist first. Intimate, confident, unhurried. Speaks of trust, collaboration, and atmosphere.
- **Tone:** warm but spare. Short lines. The work talks.
- **Bilingual:** English default, Czech (`/cs`) equal status. Every public string and reel caption exists in both.

## Accessibility

- Body contrast: bone-100 on ink-900 ≈ 17:1 (AAA). Keep ≥ 4.5:1 everywhere; brass-500 is for accents and large text on dark, not small body copy.
- Visible brass focus rings on every interactive element; full keyboard operability.
- Captions/subtitles on reels where speech matters. Never rely on color alone.
- Honor reduced-motion and respect logical heading order despite dramatic visual scale.

## Technical Implementation

```css
:root {
  /* Accent anchors */
  --cr-ink: #0b0a08;
  --cr-bone: #f5f2ea;
  --cr-brass: #c8a24a;

  /* Type families */
  --cr-font-display: 'Fraunces', Georgia, serif;
  --cr-font-grotesque: 'Archivo', system-ui, sans-serif;
  --cr-font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;

  /* Type scale (perfect fourth) */
  --t-body: 16px;
  --t-h2: 38px;
  --t-hero: clamp(48px, 9vw, 90px);

  /* Spacing base */
  --space: 8px;

  /* Motion */
  --ease-reveal: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-move: cubic-bezier(0.65, 0, 0.35, 1);

  /* Dark theme (default) */
  --bg: var(--cr-ink);
  --surface: #141210;
  --text: var(--cr-bone);
  --muted: #afa68e;
  --accent: var(--cr-brass);
  --border: #1e1c18;
  --focus: #dab95b;
}

[data-theme='light'] {
  --bg: #fcfbf7;
  --surface: #f5f2ea;
  --text: #0b0a08;
  --muted: #625d54;
  --accent: #ab893b;
  --border: #ded8c8;
  --focus: #c8a24a;
}
```

## Summary

A dark, cinematic, fashion-editorial identity: a warm near-black room, bone type, one antique-gold accent, a dramatic Fraunces-and-Archivo type pairing on a perfect-fourth scale, an 8px grid with wide asymmetric margins, and choreographed motion that activates on intent. The system recedes so his films and photographs supply all the color and drama. Bilingual EN/CZ throughout.

---

_Brand version: 0.2 · Updated 2026-06-21_
