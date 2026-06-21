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
  return { title: dict.nav.about, description: dict.about.title };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className={`mx-auto max-w-[1400px] ${PAD} pb-28 pt-36`}>
      <p className="font-grotesque text-[12px] uppercase tracking-[0.28em] text-brass-400">
        {dict.about.kicker}
      </p>
      <h1
        className="mt-4 max-w-[18ch] font-display leading-[1.02] text-bone-100"
        style={{ fontSize: "clamp(40px, 6vw, 76px)" }}
      >
        {dict.about.title}
      </h1>

      <div className="mt-16 grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-ink-700 bg-gradient-to-br from-ink-600 via-ink-800 to-ink-900">
          <div className="absolute -left-[15%] top-[10%] h-2/3 w-2/3 rounded-full bg-brass-500/15 blur-3xl" />
          <Mark className="absolute bottom-6 right-6 h-12 w-12 text-brass-500/40" />
        </div>
        <div>
          <p className="font-sans text-lg leading-relaxed text-bone-300">
            {dict.about.body}
          </p>
          <p className="mt-8 border-l-2 border-brass-500 pl-5 font-display text-xl italic text-bone-200">
            {dict.about.reach}
          </p>
        </div>
      </div>
    </div>
  );
}
