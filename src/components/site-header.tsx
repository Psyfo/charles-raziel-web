"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/cn";

export function SiteHeader({
  locale,
  dict,
}: {
  locale: string;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: { href: string; label: string }[] = [
    { href: `/${locale}/films`, label: dict.nav.films },
    { href: `/${locale}/stills`, label: dict.nav.stills },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const otherLocale: Locale = locale === "cs" ? "en" : "cs";
  const altPath = (() => {
    const seg = pathname.split("/");
    seg[1] = otherLocale;
    return seg.join("/") || `/${otherLocale}`;
  })();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open
          ? "border-b border-ink-700/80 bg-ink-900/85 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-[clamp(20px,6vw,72px)]">
        <Link href={`/${locale}`} aria-label="Charles Raziel — home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "font-grotesque text-[12px] uppercase tracking-[0.18em] transition-colors",
                pathname === l.href
                  ? "text-brass-400"
                  : "text-bone-200 hover:text-brass-300"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href={altPath}
            className="font-grotesque text-[12px] uppercase tracking-[0.18em] text-bone-400 transition-colors hover:text-brass-300"
            aria-label={`Switch language to ${otherLocale.toUpperCase()}`}
          >
            {otherLocale.toUpperCase()}
          </Link>
          <Link
            href={`/${locale}/book`}
            className="hidden rounded-full bg-brass-500 px-5 py-2.5 font-grotesque text-[12px] uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brass-300 sm:inline-block"
          >
            {dict.nav.book}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center text-bone-100 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="relative block h-3 w-6">
              <span
                className={cn(
                  "absolute left-0 block h-px w-6 bg-current transition-all duration-300",
                  open ? "top-1.5 rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 block h-px w-6 bg-current transition-all duration-300",
                  open ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-px w-6 bg-current transition-all duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink-700 bg-ink-900 px-[clamp(20px,6vw,72px)] py-6 lg:hidden">
          <nav className="flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl text-bone-100"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/book`}
              onClick={() => setOpen(false)}
              className="mt-2 inline-block w-fit rounded-full bg-brass-500 px-6 py-3 font-grotesque text-[12px] uppercase tracking-[0.16em] text-ink-900"
            >
              {dict.nav.book}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
