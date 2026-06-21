export type Still = { src: string; w: number; h: number };

// Real editorial photography by Charles Raziel (downloaded from his current site,
// self-hosted). All shot 3:4 portrait. Will move into Sanity in Phase 1.
export const stills: Still[] = Array.from({ length: 18 }, (_, i) => ({
  src: `/images/stills/photo-${String(i + 1).padStart(2, "0")}.jpg`,
  w: 1500,
  h: 1998,
}));
