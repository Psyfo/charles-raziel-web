"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export function StillsGallery({
  images,
  closeLabel,
}: {
  images: string[];
  closeLabel: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);

  const prev = useCallback(
    () => setOpen((i) => (i === null ? null : (i + images.length - 1) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
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

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    touchY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null || touchY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    const dy = e.changedTouches[0].clientY - touchY.current;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
    touchX.current = null;
    touchY.current = null;
  };

  const arrow =
    "hidden h-12 w-12 items-center justify-center rounded-full border border-bone-100/25 bg-ink-900/50 text-2xl text-bone-100 backdrop-blur-sm transition-all hover:scale-110 hover:border-brass-400 hover:bg-brass-500 hover:text-ink-900 sm:flex";

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-ink-800"
            aria-label={`Open photograph ${i + 1}`}
          >
            <Image
              src={src}
              alt={`Photography by Charles Raziel — ${i + 1}`}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
            <span className="pointer-events-none absolute inset-0 bg-ink-900/10 ring-1 ring-inset ring-transparent transition duration-500 group-hover:bg-transparent group-hover:ring-brass-500/60" />
          </button>
        ))}
      </div>

      {open !== null &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="cr-overlay-in fixed inset-0 z-[100] flex touch-none select-none flex-col bg-ink-900/96 backdrop-blur-md"
            onClick={() => setOpen(null)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-5 py-5 sm:px-8">
              <span className="font-grotesque text-[12px] uppercase tracking-[0.2em] text-bone-400">
                {String(open + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="font-grotesque text-[12px] uppercase tracking-[0.18em] text-bone-300 transition-colors hover:text-brass-300"
              >
                {closeLabel}
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center gap-4 px-4 pb-8 sm:gap-8 sm:px-8">
              <button type="button" onClick={(e) => { e.stopPropagation(); prev(); }} className={arrow} aria-label="Previous">
                ‹
              </button>
              <div className="relative h-full w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
                <Image
                  key={open}
                  src={images[open]}
                  alt={`Photography by Charles Raziel — ${open + 1}`}
                  fill
                  sizes="90vw"
                  className="cr-fade object-contain"
                  priority
                />
              </div>
              <button type="button" onClick={(e) => { e.stopPropagation(); next(); }} className={arrow} aria-label="Next">
                ›
              </button>
            </div>

            <p className="pb-6 text-center font-grotesque text-[10px] uppercase tracking-[0.22em] text-bone-600 sm:hidden">
              Swipe to browse
            </p>
          </div>,
          document.body
        )}
    </>
  );
}
