import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { Mark } from "@/components/logo";

export function SiteFooter({
  locale,
  dict,
}: {
  locale: string;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();

  const explore = [
    { href: `/${locale}/films`, label: dict.nav.films },
    { href: `/${locale}/stills`, label: dict.nav.stills },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const socials = [
    { href: "https://instagram.com", label: "Instagram" },
    { href: "https://tiktok.com", label: "TikTok" },
    { href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="border-t border-ink-700 bg-ink-900">
      <div className="mx-auto max-w-[1400px] px-[clamp(20px,6vw,72px)] py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 text-brass-500">
              <Mark className="h-10 w-10" />
            </div>
            <p className="mt-5 max-w-xs font-display text-xl leading-snug text-bone-200">
              {dict.footer.tagline}
            </p>
          </div>

          <FooterCol title={dict.footer.navTitle}>
            {explore.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-bone-400 transition-colors hover:text-brass-300"
              >
                {l.label}
              </Link>
            ))}
          </FooterCol>

          <FooterCol title={dict.footer.followTitle}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bone-400 transition-colors hover:text-brass-300"
              >
                {s.label}
              </a>
            ))}
          </FooterCol>

          <FooterCol title={dict.footer.locationTitle}>
            <span className="text-bone-400">{dict.site.location}</span>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-ink-700 pt-8 text-[12px] uppercase tracking-[0.18em] text-bone-600 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {dict.site.name}. {dict.footer.rights}
          </span>
          <span className="font-grotesque">{dict.site.descriptor}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-grotesque text-[11px] uppercase tracking-[0.24em] text-bone-600">
        {title}
      </h2>
      <div className="flex flex-col gap-3 text-[15px]">{children}</div>
    </div>
  );
}
