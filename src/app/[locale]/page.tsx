import Link from "next/link";
import Image from "next/image";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { reels } from "@/data/reels";
import { ReelGrid } from "@/components/reel-grid";
import { Reveal } from "@/components/reveal";

const PAD = "px-[clamp(20px,6vw,72px)]";
const SERVICE_IMAGES = [
  "/images/stills/photo-05.jpg",
  "/images/reels/reel-08.jpg",
  "/images/reels/reel-12.jpg",
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const featured = reels.filter((r) => r.featured).slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Charles Raziel — Video & Cinematography",
    description: dict.home.heroSub,
    image: "https://charlesrazielvideography.vercel.app/opengraph-image",
    url: `https://charlesrazielvideography.vercel.app/${locale}`,
    areaServed: "Central Europe",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brno",
      addressCountry: "CZ",
    },
    knowsLanguage: ["en", "cs"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <Image
          src="/images/hero-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-70 motion-reduce:hidden"
          src="/videos/hero-dance.mp4"
          poster="/images/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/75 to-ink-900/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/10 to-transparent" />
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
        <Reveal>
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
        </Reveal>

        <div className="mt-12">
          <ReelGrid
            reels={featured}
            locale={locale}
            allLabel={dict.films.all}
            playLabel={dict.films.play}
            closeLabel={dict.films.close}
            showFilter={false}
          />
        </div>
      </section>

      {/* Ethos */}
      <section className="border-t border-ink-700">
        <Reveal className={`mx-auto grid max-w-[1400px] gap-10 ${PAD} py-28 md:grid-cols-2`}>
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
        </Reveal>
      </section>

      {/* Services teaser */}
      <section className="border-t border-ink-700">
        <div className={`mx-auto max-w-[1400px] ${PAD} py-24`}>
          <Reveal>
            <p className="font-grotesque text-[12px] uppercase tracking-[0.28em] text-brass-400">
              {dict.home.servicesKicker}
            </p>
            <h2 className="mt-3 font-display text-4xl text-bone-100 sm:text-5xl">
              {dict.home.servicesTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {dict.services.items.map((s, i) => (
              <Reveal key={s.name} delay={i * 90}>
                <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink-700 bg-ink-800 transition-colors hover:border-brass-500/50">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={SERVICE_IMAGES[i % SERVICE_IMAGES.length]}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/30 to-transparent" />
                    <span className="absolute left-5 top-4 font-grotesque text-[12px] tracking-[0.2em] text-brass-300">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-7">
                    <div>
                      <h3 className="font-display text-2xl text-bone-100">{s.name}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-bone-400">
                        {s.summary}
                      </p>
                    </div>
                    <p className="mt-6 font-grotesque text-[12px] uppercase tracking-[0.18em] text-bone-500">
                      {s.price}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — light editorial band */}
      <section className="bg-bone-50 text-ink-900">
        <Reveal className={`mx-auto max-w-[1400px] ${PAD} py-28 text-center`}>
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
        </Reveal>
      </section>
    </>
  );
}
