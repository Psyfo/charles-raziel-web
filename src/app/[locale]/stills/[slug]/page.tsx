import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { collections, getCollection } from "@/data/collections";
import { StillsGallery } from "@/components/stills-gallery";
import { Reveal } from "@/components/reveal";

const PAD = "px-[clamp(20px,6vw,72px)]";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const collection = getCollection(slug);
  if (!collection) return {};
  return {
    title: collection.title[locale],
    description: collection.description[locale],
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const collection = getCollection(slug);
  if (!collection) notFound();

  return (
    <div className={`mx-auto max-w-[1400px] ${PAD} pb-28 pt-36`}>
      <Reveal>
        <Link
          href={`/${locale}/stills`}
          className="font-grotesque text-[12px] uppercase tracking-[0.18em] text-bone-500 transition-colors hover:text-brass-300"
        >
          ← {dict.stills.allCollections}
        </Link>
        <p className="mt-8 font-grotesque text-[12px] uppercase tracking-[0.28em] text-brass-400">
          {collection.kicker[locale]}
        </p>
        <h1
          className="mt-3 font-display leading-[1.02] text-bone-100"
          style={{ fontSize: "clamp(40px, 7vw, 88px)" }}
        >
          {collection.title[locale]}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-bone-400">
          {collection.description[locale]}
        </p>
        <span className="mt-6 block font-grotesque text-[12px] uppercase tracking-[0.2em] text-bone-500">
          {collection.images.length} {dict.stills.photos}
        </span>
      </Reveal>

      <div className="mt-14">
        <StillsGallery images={collection.images} closeLabel={dict.films.close} />
      </div>
    </div>
  );
}
