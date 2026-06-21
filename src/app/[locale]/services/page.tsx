import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/reveal";

const PAD = "px-[clamp(20px,6vw,72px)]";
const SERVICE_IMAGES = [
  "/images/stills/photo-05.jpg",
  "/images/reels/reel-08.jpg",
  "/images/reels/reel-12.jpg",
];

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
      <Reveal>
        <p className="font-grotesque text-[12px] uppercase tracking-[0.28em] text-brass-400">
          {dict.services.kicker}
        </p>
        <h1 className="mt-4 font-display leading-none text-bone-100" style={{ fontSize: "clamp(48px, 9vw, 120px)" }}>
          {dict.services.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-bone-400">{dict.services.intro}</p>
      </Reveal>

      <div className="mt-16 space-y-5">
        {dict.services.items.map((s, i) => (
          <Reveal key={s.name} delay={i * 80}>
            <div className="group grid gap-6 overflow-hidden rounded-lg border border-ink-700 bg-ink-800 p-6 transition-colors hover:border-brass-500/50 md:grid-cols-[220px_1fr_auto] md:items-center md:gap-10">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                <Image
                  src={SERVICE_IMAGES[i % SERVICE_IMAGES.length]}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 220px, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
              </div>
              <div>
                <span className="font-grotesque text-[12px] tracking-[0.2em] text-brass-500">
                  0{i + 1}
                </span>
                <h2 className="mt-2 font-display text-2xl text-bone-100">{s.name}</h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-bone-400">
                  {s.summary}
                </p>
              </div>
              <span className="font-grotesque text-[13px] uppercase tracking-[0.16em] text-bone-300">
                {s.price}
              </span>
            </div>
          </Reveal>
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
