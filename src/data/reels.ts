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
  /** Placeholder video — to be replaced with Cloudflare Stream IDs and real masters. */
  youtubeId: string;
  featured?: boolean;
};

// NOTE: titles are Charles's real work; the underlying video is a placeholder
// (a single stable public clip) until the master files are supplied.
const PLACEHOLDER = "aqz-KE-bpKQ";

export const reels: Reel[] = [
  { id: "christmas-day", title: "Christmas Day", category: "events", durationSeconds: 117, youtubeId: PLACEHOLDER, featured: true },
  { id: "express-choreo", title: "E.X.P.R.E.S.S. Choreo by @minx.dance.group", category: "choreographies", durationSeconds: 111, youtubeId: PLACEHOLDER, featured: true },
  { id: "day-in-the-park", title: "A Day in the Park with @leninawtf", category: "locations", durationSeconds: 109, youtubeId: PLACEHOLDER },
  { id: "beauty-and-elegance", title: "Beauty and Elegance", category: "modelling", durationSeconds: 100, youtubeId: PLACEHOLDER, featured: true },
  { id: "new-years-day-2026", title: "New Year's Day 2026", category: "events", durationSeconds: 98, youtubeId: PLACEHOLDER },
  { id: "high-heels-renata", title: "High Heels Choreography with Renata", category: "choreographies", durationSeconds: 80, youtubeId: PLACEHOLDER, featured: true },
  { id: "miss-right-runway", title: "Miss Right 2026 — Runway Highlights", category: "events", durationSeconds: 77, youtubeId: PLACEHOLDER, featured: true },
  { id: "twerk-power", title: "Twerk & Power", category: "choreographies", durationSeconds: 76, youtubeId: PLACEHOLDER },
  { id: "geekd-up", title: "Geek'd Up by Femme + Core Crew at Coredhlab", category: "workshops", durationSeconds: 72, youtubeId: PLACEHOLDER },
  { id: "festive-comedic", title: "A Festive and Comedic Time", category: "events", durationSeconds: 68, youtubeId: PLACEHOLDER },
  { id: "labyrinth", title: "Labyrinth Under the Market", category: "locations", durationSeconds: 65, youtubeId: PLACEHOLDER, featured: true },
  { id: "twerk-paula", title: "Twerk Choreography by @Paula.Arendasova", category: "choreographies", durationSeconds: 62, youtubeId: PLACEHOLDER },
  { id: "strain-rate", title: "Strain Rate Concert", category: "concert", durationSeconds: 51, youtubeId: PLACEHOLDER, featured: true },
  { id: "nigy-boy-hush", title: "Nigy Boy — Hush, by @lufkalufka", category: "choreographies", durationSeconds: 48, youtubeId: PLACEHOLDER },
  { id: "model-diana", title: "Model Work with Diana Surovčíková", category: "modelling", durationSeconds: 48, youtubeId: PLACEHOLDER },
  { id: "contemporary-stela", title: "Contemporary by Stela", category: "choreographies", durationSeconds: 48, youtubeId: PLACEHOLDER },
  { id: "miss-right-wholesome", title: "Miss Right 2026 — Wholesome Moments", category: "events", durationSeconds: 47, youtubeId: PLACEHOLDER },
  { id: "joel-brno", title: "Joel // Active Immortals, First Time in Brno", category: "workshops", durationSeconds: 46, youtubeId: PLACEHOLDER },
  { id: "model-sofia", title: "Model Work with Sofia Klymko", category: "modelling", durationSeconds: 44, youtubeId: PLACEHOLDER },
  { id: "miss-right-hype", title: "Miss Right 2026 — Hype Montage", category: "events", durationSeconds: 40, youtubeId: PLACEHOLDER },
  { id: "model-katerina", title: "Model Work with Kateřina Přerovská", category: "modelling", durationSeconds: 39, youtubeId: PLACEHOLDER },
  { id: "model-barbora-p", title: "Model Work with Barbora Prosecká", category: "modelling", durationSeconds: 30, youtubeId: PLACEHOLDER },
  { id: "model-barbora-sofia", title: "Model Work with Barbora and Sofia", category: "modelling", durationSeconds: 30, youtubeId: PLACEHOLDER },
  { id: "miss-right-contestants", title: "Miss Right 2026 — Contestants", category: "events", durationSeconds: 26, youtubeId: PLACEHOLDER },
];

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
