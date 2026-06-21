import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const BASE = "https://charlesrazielvideography.vercel.app";
const paths = [
  "",
  "/films",
  "/stills",
  "/about",
  "/services",
  "/contact",
  "/book",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((locale) =>
    paths.map((p) => ({
      url: `${BASE}/${locale}${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE}/${l}${p}`])
        ),
      },
    }))
  );
}
