import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const PAD = "px-[clamp(20px,6vw,72px)]";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const dict = getDictionary(isLocale(raw) ? raw : defaultLocale);
  return { title: dict.services.title, description: dict.services.intro };
}

export default async function ServicesPage({
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
        {dict.services.kicker}
      </p>
      <h1 className="mt-4 font-display leading-none text-bone-100" style={{ fontSize: "clamp(48px, 9vw, 120px)" }}>
        {dict.services.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-bone-400">{dict.services.intro}</p>

      <div className="mt-16 space-y-px overflow-hidden rounded-lg border border-ink-700">
        {dict.services.items.map((s, i) => (
          <div
            key={s.name}
            className="grid gap-6 bg-ink-800 p-8 transition-colors hover:bg-ink-700 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10"
          >
            <span className="font-display text-3xl text-brass-500">0{i + 1}</span>
            <div>
              <h2 className="font-display text-2xl text-bone-100">{s.name}</h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-bone-400">
                {s.summary}
              </p>
            </div>
            <span className="font-grotesque text-[13px] uppercase tracking-[0.16em] text-bone-300">
              {s.price}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-sm text-bone-500">{dict.services.priceNote}</p>

      <Link
        href={`/${locale}/book`}
        className="mt-10 inline-block rounded-full bg-brass-500 px-8 py-4 font-grotesque text-[12px] uppercase tracking-[0.18em] text-ink-900 transition-colors hover:bg-brass-300"
      >
        {dict.services.bookCta}
      </Link>
    </div>
  );
}
