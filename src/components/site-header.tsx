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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
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
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled || open
            ? "border-b border-ink-700/80 bg-ink-900/85 backdrop-blur-md"
            : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-[clamp(20px,6vw,72px)]">
          <Link href={`/${locale}`} aria-label="Charles Raziel — home" className="relative z-50">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative font-grotesque text-[12px] uppercase tracking-[0.18em] transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-brass-400 after:transition-all after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)]",
                    active
                      ? "text-brass-400 after:w-full"
                      : "text-bone-200 hover:text-brass-300 after:w-0 hover:after:w-full"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
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
              className="relative z-50 flex h-10 w-10 items-center justify-center text-bone-100 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="relative block h-3 w-6">
                <span className={cn("absolute left-0 block h-px w-6 bg-current transition-all duration-300", open ? "top-1.5 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 top-1.5 block h-px w-6 bg-current transition-all duration-300", open ? "opacity-0" : "opacity-100")} />
                <span className={cn("absolute left-0 block h-px w-6 bg-current transition-all duration-300", open ? "top-1.5 -rotate-45" : "top-3")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-viewport overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          open ? "" : "pointer-events-none"
        )}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink-900 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open ? "opacity-100" : "opacity-0"
          )}
        />
        <div className="pointer-events-none absolute -right-[20%] top-[10%] h-[50vh] w-[50vh] rounded-full bg-brass-500/10 blur-[120px]" />
        {open && (
          <nav className="relative flex h-full flex-col items-center justify-center gap-7 px-6">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className="cr-menu-item font-display text-4xl leading-none text-bone-100 transition-colors hover:text-brass-300"
                style={{ animationDelay: `${i * 70 + 120}ms` }}
              >
                {l.label}
              </Link>
            ))}
            <div
              className="cr-menu-item mt-6 flex items-center gap-7"
              style={{ animationDelay: `${links.length * 70 + 160}ms` }}
            >
              <Link
                href={`/${locale}/book`}
                className="rounded-full bg-brass-500 px-7 py-3 font-grotesque text-[12px] uppercase tracking-[0.16em] text-ink-900"
              >
                {dict.nav.book}
              </Link>
              <Link
                href={altPath}
                className="font-grotesque text-[13px] uppercase tracking-[0.2em] text-bone-400"
              >
                {otherLocale.toUpperCase()}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </>
  );
}
