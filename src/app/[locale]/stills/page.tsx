import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { collections } from "@/data/collections";
import { CollectionCard } from "@/components/collection-card";
import { Reveal } from "@/components/reveal";

const PAD = "px-[clamp(20px,6vw,72px)]";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const dict = getDictionary(isLocale(raw) ? raw : defaultLocale);
  return { title: dict.stills.title, description: dict.stills.intro };
}

export default async function StillsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className={`mx-auto max-w-[1400px] ${PAD} pb-28 pt-36`}>
      <Reveal>
        <p className="font-grotesque text-[12px] uppercase tracking-[0.28em] text-brass-400">
          {dict.stills.kicker}
        </p>
        <h1 className="mt-4 font-display leading-none text-bone-100" style={{ fontSize: "clamp(48px, 9vw, 120px)" }}>
          {dict.stills.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-bone-400">{dict.stills.intro}</p>
      </Reveal>

      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
        {collections.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 80}>
            <CollectionCard
              href={`/${locale}/stills/${c.slug}`}
              cover={c.cover}
              kicker={c.kicker[locale]}
              title={c.title[locale]}
              count={c.images.length}
              photosLabel={dict.stills.photos}
              viewLabel={dict.stills.viewCollection}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
