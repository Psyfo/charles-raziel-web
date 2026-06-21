"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { stills } from "@/data/stills";

export function StillsGallery({ closeLabel }: { closeLabel: string }) {
  const [open, setOpen] = useState<number | null>(null);

  const prev = useCallback(
    () => setOpen((i) => (i === null ? null : (i + stills.length - 1) % stills.length)),
    []
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? null : (i + 1) % stills.length)),
    []
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, prev, next]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {stills.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-ink-800"
            aria-label={`Open photograph ${i + 1}`}
          >
            <Image
              src={s.src}
              alt={`Photography by Charles Raziel — ${i + 1}`}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-transparent transition duration-500 group-hover:ring-brass-500/60" />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/95 p-4 backdrop-blur-sm sm:p-10"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute right-5 top-5 font-grotesque text-[12px] uppercase tracking-[0.18em] text-bone-300 transition-colors hover:text-brass-300"
          >
            {closeLabel}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 flex h-12 w-12 items-center justify-center text-2xl text-bone-200 transition-colors hover:text-brass-300 sm:left-8"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 flex h-12 w-12 items-center justify-center text-2xl text-bone-200 transition-colors hover:text-brass-300 sm:right-8"
            aria-label="Next"
          >
            ›
          </button>
          <div
            className="relative h-[82vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={stills[open].src}
              alt={`Photography by Charles Raziel — ${open + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
