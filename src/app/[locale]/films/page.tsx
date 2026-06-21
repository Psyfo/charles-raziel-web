import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { reels } from "@/data/reels";
import { ReelGrid } from "@/components/reel-grid";

const PAD = "px-[clamp(20px,6vw,72px)]";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  return { title: dict.films.title, description: dict.films.intro };
}

export default async function FilmsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className={`mx-auto max-w-[1400px] ${PAD} pb-24 pt-36`}>
      <p className="font-grotesque text-[12px] uppercase tracking-[0.28em] text-brass-400">
        {dict.films.kicker}
      </p>
      <h1 className="mt-4 font-display leading-none text-bone-100" style={{ fontSize: "clamp(48px, 9vw, 120px)" }}>
        {dict.films.title}
      </h1>
      <p className="mt-6 max-w-xl text-lg text-bone-400">{dict.films.intro}</p>

      <div className="mt-14">
        <ReelGrid
          reels={reels}
          locale={locale}
          allLabel={dict.films.all}
          playLabel={dict.films.play}
        />
      </div>
    </div>
  );
}
