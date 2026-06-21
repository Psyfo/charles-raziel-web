import Link from "next/link";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { reels, categoryLabel } from "@/data/reels";
import { ReelCard } from "@/components/reel-card";

const PAD = "px-[clamp(20px,6vw,72px)]";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const featured = reels.filter((r) => r.featured).slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="pointer-events-none absolute -right-[10%] top-[8%] h-[55vh] w-[55vh] rounded-full bg-brass-500/15 blur-[120px]" />
        <div className="pointer-events-none absolute -left-[8%] bottom-[2%] h-[40vh] w-[40vh] rounded-full bg-brass-700/10 blur-[120px]" />
        <div className={`relative mx-auto w-full max-w-[1400px] ${PAD} pt-32`}>
          <p className="cr-rise font-grotesque text-[12px] uppercase tracking-[0.32em] text-brass-400">
            {dict.site.descriptor} · {dict.site.location}
          </p>
          <h1
            className="cr-rise mt-8 max-w-[16ch] font-display font-light leading-[0.95] tracking-tight text-bone-100"
            style={{ fontSize: "clamp(44px, 8vw, 104px)", animationDelay: "0.08s" }}
          >
            {dict.home.heroLine}
          </h1>
          <p
            className="cr-rise mt-8 max-w-xl font-display text-xl italic text-bone-300"
            style={{ animationDelay: "0.16s" }}
          >
            {dict.home.heroSub}
          </p>
          <div
            className="cr-rise mt-12 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.24s" }}
          >
            <Link
              href={`/${locale}/films`}
              className="rounded-full bg-brass-500 px-7 py-3.5 font-grotesque text-[12px] uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brass-300"
            >
              {dict.home.watchReels}
            </Link>
            <Link
              href={`/${locale}/book`}
              className="rounded-full border border-bone-100/25 px-7 py-3.5 font-grotesque text-[12px] uppercase tracking-[0.16em] text-bone-100 transition-colors hover:border-brass-400 hover:text-brass-300"
            >
              {dict.home.bookCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className={`mx-auto max-w-[1400px] ${PAD} py-24`}>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-grotesque text-[12px] uppercase tracking-[0.28em] text-brass-400">
              {dict.home.featuredKicker}
            </p>
            <h2 className="mt-3 font-display text-4xl text-bone-100 sm:text-5xl">
              {dict.home.featuredTitle}
            </h2>
          </div>
          <Link
            href={`/${locale}/films`}
            className="hidden shrink-0 font-grotesque text-[12px] uppercase tracking-[0.18em] text-bone-400 transition-colors hover:text-brass-300 sm:block"
          >
            {dict.home.featuredAll} →
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((reel, i) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              index={i}
              categoryLabel={categoryLabel(reel.category, locale)}
              playLabel={dict.films.play}
            />
          ))}
        </div>
      </section>

      {/* Ethos */}
      <section className="border-t border-ink-700">
        <div className={`mx-auto grid max-w-[1400px] gap-10 ${PAD} py-28 md:grid-cols-2`}>
          <div>
            <p className="font-grotesque text-[12px] uppercase tracking-[0.28em] text-brass-400">
              {dict.home.ethosKicker}
            </p>
            <h2 className="mt-5 font-display text-3xl leading-tight text-bone-100 sm:text-4xl">
              {dict.home.ethosTitle}
            </h2>
          </div>
          <p className="self-end font-sans text-lg leading-relaxed text-bone-300">
            {dict.home.ethosBody}
          </p>
        </div>
      </section>

      {/* Services teaser */}
      <section className="border-t border-ink-700">
        <div className={`mx-auto max-w-[1400px] ${PAD} py-24`}>
          <p className="font-grotesque text-[12px] uppercase tracking-[0.28em] text-brass-400">
            {dict.home.servicesKicker}
          </p>
          <h2 className="mt-3 font-display text-4xl text-bone-100 sm:text-5xl">
            {dict.home.servicesTitle}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {dict.services.items.map((s, i) => (
              <div
                key={s.name}
                className="flex flex-col justify-between rounded-lg border border-ink-700 bg-ink-800 p-8 transition-colors hover:border-brass-500/50"
              >
                <div>
                  <span className="font-grotesque text-[12px] tracking-[0.2em] text-brass-500">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-2xl text-bone-100">
                    {s.name}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-bone-400">
                    {s.summary}
                  </p>
                </div>
                <p className="mt-8 font-grotesque text-[12px] uppercase tracking-[0.18em] text-bone-500">
                  {s.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — light editorial band */}
      <section className="bg-bone-50 text-ink-900">
        <div className={`mx-auto max-w-[1400px] ${PAD} py-28 text-center`}>
          <h2 className="mx-auto max-w-[18ch] font-display text-4xl leading-tight sm:text-6xl">
            {dict.home.ctaTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-ink-400">
            {dict.home.ctaBody}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="mt-10 inline-block rounded-full bg-ink-900 px-8 py-4 font-grotesque text-[12px] uppercase tracking-[0.18em] text-bone-100 transition-colors hover:bg-brass-600 hover:text-ink-900"
          >
            {dict.home.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
