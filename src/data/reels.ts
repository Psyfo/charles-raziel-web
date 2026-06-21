import type { Locale } from "@/i18n/config";

export type CategoryKey =
  | "modelling"
  | "choreographies"
  | "workshops"
  | "concert"
  | "locations"
  | "events";

export const categories: Record<CategoryKey, Record<Locale, string>> = {
  modelling: { en: "Modelling", cs: "Modeling" },
  choreographies: { en: "Choreographies", cs: "Choreografie" },
  workshops: { en: "Dance workshops", cs: "Taneční workshopy" },
  concert: { en: "Concert", cs: "Koncert" },
  locations: { en: "Locations", cs: "Lokace" },
  events: { en: "Events", cs: "Akce" },
};

export type Reel = {
  id: string;
  title: string;
  category: CategoryKey;
  durationSeconds: number;
  featured?: boolean;
  /** Placeholder dance thumbnail (royalty-free) until real poster frames arrive. */
  thumb: string;
  /** Placeholder dance clip (royalty-free) until Charles's masters are re-hosted. */
  video: string;
};

type RawReel = Omit<Reel, "thumb" | "video">;

// NOTE: titles/categories/durations are Charles's real work. Thumbnails and clips are
// royalty-free dance placeholders (Pexels) until his masters land on Cloudflare Stream.
const rawReels: RawReel[] = [
  { id: "christmas-day", title: "Christmas Day", category: "events", durationSeconds: 117, featured: true },
  { id: "express-choreo", title: "E.X.P.R.E.S.S. Choreo by @minx.dance.group", category: "choreographies", durationSeconds: 111, featured: true },
  { id: "day-in-the-park", title: "A Day in the Park with @leninawtf", category: "locations", durationSeconds: 109 },
  { id: "beauty-and-elegance", title: "Beauty and Elegance", category: "modelling", durationSeconds: 100, featured: true },
  { id: "new-years-day-2026", title: "New Year's Day 2026", category: "events", durationSeconds: 98 },
  { id: "high-heels-renata", title: "High Heels Choreography with Renata", category: "choreographies", durationSeconds: 80, featured: true },
  { id: "miss-right-runway", title: "Miss Right 2026 — Runway Highlights", category: "events", durationSeconds: 77, featured: true },
  { id: "twerk-power", title: "Twerk & Power", category: "choreographies", durationSeconds: 76 },
  { id: "geekd-up", title: "Geek'd Up by Femme + Core Crew at Coredhlab", category: "workshops", durationSeconds: 72 },
  { id: "festive-comedic", title: "A Festive and Comedic Time", category: "events", durationSeconds: 68 },
  { id: "labyrinth", title: "Labyrinth Under the Market", category: "locations", durationSeconds: 65, featured: true },
  { id: "twerk-paula", title: "Twerk Choreography by @Paula.Arendasova", category: "choreographies", durationSeconds: 62 },
  { id: "strain-rate", title: "Strain Rate Concert", category: "concert", durationSeconds: 51, featured: true },
  { id: "nigy-boy-hush", title: "Nigy Boy — Hush, by @lufkalufka", category: "choreographies", durationSeconds: 48 },
  { id: "model-diana", title: "Model Work with Diana Surovčíková", category: "modelling", durationSeconds: 48 },
  { id: "contemporary-stela", title: "Contemporary by Stela", category: "choreographies", durationSeconds: 48 },
  { id: "miss-right-wholesome", title: "Miss Right 2026 — Wholesome Moments", category: "events", durationSeconds: 47 },
  { id: "joel-brno", title: "Joel // Active Immortals, First Time in Brno", category: "workshops", durationSeconds: 46 },
  { id: "model-sofia", title: "Model Work with Sofia Klymko", category: "modelling", durationSeconds: 44 },
  { id: "miss-right-hype", title: "Miss Right 2026 — Hype Montage", category: "events", durationSeconds: 40 },
  { id: "model-katerina", title: "Model Work with Kateřina Přerovská", category: "modelling", durationSeconds: 39 },
  { id: "model-barbora-p", title: "Model Work with Barbora Prosecká", category: "modelling", durationSeconds: 30 },
  { id: "model-barbora-sofia", title: "Model Work with Barbora and Sofia", category: "modelling", durationSeconds: 30 },
  { id: "miss-right-contestants", title: "Miss Right 2026 — Contestants", category: "events", durationSeconds: 26 },
];

export const reels: Reel[] = rawReels.map((r, i) => ({
  ...r,
  thumb: `/images/reels/reel-${String((i % 18) + 1).padStart(2, "0")}.jpg`,
  video: `/videos/sample-${(i % 3) + 1}.mp4`,
}));

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function categoryLabel(key: CategoryKey, locale: Locale): string {
  return categories[key][locale];
}

export const orderedCategories: CategoryKey[] = [
  "modelling",
  "choreographies",
  "workshops",
  "concert",
  "locations",
  "events",
];
