import type { Metadata } from "next";
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
  return { title: dict.terms.title, description: dict.terms.body };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className={`mx-auto max-w-[820px] ${PAD} pb-28 pt-36`}>
      <p className="font-grotesque text-[12px] uppercase tracking-[0.28em] text-brass-400">
        {dict.terms.kicker}
      </p>
      <h1 className="mt-4 font-display leading-tight text-bone-100" style={{ fontSize: "clamp(40px, 6vw, 64px)" }}>
        {dict.terms.title}
      </h1>
      <p className="mt-8 text-lg leading-relaxed text-bone-400">{dict.terms.body}</p>
    </div>
  );
}
