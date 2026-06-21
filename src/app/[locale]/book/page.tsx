import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/reveal";

const PAD = "px-[clamp(20px,6vw,72px)]";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const dict = getDictionary(isLocale(raw) ? raw : defaultLocale);
  return { title: dict.nav.book, description: dict.book.body };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className={`mx-auto max-w-[1100px] ${PAD} pb-28 pt-36`}>
      <Reveal>
        <p className="font-grotesque text-[12px] uppercase tracking-[0.28em] text-brass-400">
          {dict.book.kicker}
        </p>
        <h1
          className="mt-4 max-w-[16ch] font-display leading-[1.02] text-bone-100"
          style={{ fontSize: "clamp(40px, 6vw, 76px)" }}
        >
          {dict.book.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-bone-400">{dict.book.body}</p>
      </Reveal>

      <div className="mt-12 flex min-h-72 items-center justify-center rounded-lg border border-dashed border-ink-600 bg-ink-800/50 p-10 text-center">
        <p className="font-grotesque text-[12px] uppercase tracking-[0.2em] text-bone-500">
          {dict.book.embedNote}
        </p>
      </div>

      <p className="mt-6 text-sm text-bone-500">
        {dict.book.terms}{" "}
        <Link href={`/${locale}/terms`} className="text-brass-400 underline-offset-4 hover:underline">
          {locale === "cs" ? "Podmínky" : "Terms"} →
        </Link>
      </p>
    </div>
  );
}
