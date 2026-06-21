import type { Locale } from "@/i18n/config";

export type Collection = {
  slug: string;
  title: Record<Locale, string>;
  kicker: Record<Locale, string>;
  description: Record<Locale, string>;
  cover: string;
  images: string[];
};

const stills = (from: number, to: number) =>
  Array.from(
    { length: to - from + 1 },
    (_, i) => `/images/stills/photo-${String(from + i).padStart(2, "0")}.jpg`
  );

const stock = (name: string, n = 10) =>
  Array.from(
    { length: n },
    (_, i) => `/images/collections/${name}/${String(i + 1).padStart(2, "0")}.jpg`
  );

export const collections: Collection[] = [
  {
    slug: "editorial-portraits",
    title: { en: "Editorial Portraits", cs: "Editoriální portréty" },
    kicker: { en: "Studio · Portrait", cs: "Studio · Portrét" },
    description: {
      en: "Considered, light-driven portraiture shot in the studio and on location.",
      cs: "Promyšlená, světlem vedená portrétní tvorba ve studiu i v terénu.",
    },
    cover: "/images/stills/photo-03.jpg",
    images: stills(1, 9),
  },
  {
    slug: "beauty-and-light",
    title: { en: "Beauty & Light", cs: "Krása & světlo" },
    kicker: { en: "Boudoir · Intimate", cs: "Budoár · Intimní" },
    description: {
      en: "Soft, intimate sessions that celebrate confidence, form, and natural light.",
      cs: "Jemné, intimní focení oslavující sebevědomí, tvar a přirozené světlo.",
    },
    cover: "/images/stills/photo-13.jpg",
    images: stills(10, 18),
  },
  {
    slug: "dance-and-movement",
    title: { en: "Dance & Movement", cs: "Tanec & pohyb" },
    kicker: { en: "Choreography", cs: "Choreografie" },
    description: {
      en: "Dancers and performers captured mid-motion, where shadow and gesture meet.",
      cs: "Tanečníci a performeři zachycení v pohybu, kde se potkává stín a gesto.",
    },
    cover: "/images/collections/dance/01.jpg",
    images: stock("dance"),
  },
  {
    slug: "fashion-and-modelling",
    title: { en: "Fashion & Modelling", cs: "Móda & modeling" },
    kicker: { en: "Editorial", cs: "Editorial" },
    description: {
      en: "Editorial fashion work made with models, stylists, and collaborators.",
      cs: "Editoriální módní tvorba s modely, stylisty a spolupracovníky.",
    },
    cover: "/images/collections/fashion/01.jpg",
    images: stock("fashion"),
  },
  {
    slug: "stage-and-performance",
    title: { en: "Stage & Performance", cs: "Jeviště & performance" },
    kicker: { en: "Live", cs: "Živě" },
    description: {
      en: "Live performance and stage work, from rehearsal to the spotlight.",
      cs: "Živá performance a jevištní tvorba, od zkoušky až po reflektory.",
    },
    cover: "/images/collections/performance/01.jpg",
    images: stock("performance"),
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
