import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Mark } from "@/components/logo";

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

  const tiles = [0, 1, 2, 3, 4, 5];

  return (
    <div className={`mx-auto max-w-[1400px] ${PAD} pb-28 pt-36`}>
      <p className="font-grotesque text-[12px] uppercase tracking-[0.28em] text-brass-400">
        {dict.stills.kicker}
      </p>
      <h1 className="mt-4 font-display leading-none text-bone-100" style={{ fontSize: "clamp(48px, 9vw, 120px)" }}>
        {dict.stills.title}
      </h1>
      <p className="mt-6 max-w-xl text-lg text-bone-400">{dict.stills.intro}</p>

      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
        {tiles.map((i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-lg border border-ink-700 bg-gradient-to-br from-ink-600 via-ink-800 to-ink-900 ${
              i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
            }`}
          >
            <div className="absolute -right-[15%] top-[15%] h-2/3 w-2/3 rounded-full bg-brass-500/10 blur-3xl" />
            <Mark className="absolute bottom-5 left-5 h-8 w-8 text-brass-500/30" />
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-md text-sm text-bone-500">{dict.stills.note}</p>
    </div>
  );
}
