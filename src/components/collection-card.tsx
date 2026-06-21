import Link from "next/link";
import Image from "next/image";

export function CollectionCard({
  href,
  cover,
  kicker,
  title,
  count,
  photosLabel,
  viewLabel,
}: {
  href: string;
  cover: string;
  kicker: string;
  title: string;
  count: number;
  photosLabel: string;
  viewLabel: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-lg border border-ink-700 bg-ink-800 transition-colors duration-500 hover:border-brass-500/60"
    >
      <div className="relative aspect-[3/4]">
        <Image
          src={cover}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/35 to-ink-900/5 transition-opacity duration-700 group-hover:opacity-75" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-transparent transition duration-500 group-hover:ring-brass-500/20" />

        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="font-grotesque text-[11px] uppercase tracking-[0.22em] text-brass-400">
            {kicker}
          </span>
          <h2 className="mt-2 font-display text-2xl leading-tight text-bone-100 sm:text-3xl">
            {title}
          </h2>
          <div className="mt-3 flex items-center gap-4">
            <span className="font-grotesque text-[11px] uppercase tracking-[0.16em] text-bone-400">
              {count} {photosLabel}
            </span>
            <span className="-translate-x-2 font-grotesque text-[11px] uppercase tracking-[0.16em] text-brass-300 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
              {viewLabel} →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
