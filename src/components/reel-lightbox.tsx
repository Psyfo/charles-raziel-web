"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { categoryLabel, formatDuration, type Reel } from "@/data/reels";
import type { Locale } from "@/i18n/config";

export function ReelLightbox({
  reels,
  index,
  locale,
  closeLabel,
  onClose,
  onPrev,
  onNext,
}: {
  reels: Reel[];
  index: number | null;
  locale: Locale;
  closeLabel: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const touchX = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onPrev, onNext]);

  if (index === null || typeof document === "undefined") return null;
  const reel = reels[index];
  if (!reel) return null;

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    touchY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null || touchY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    const dy = e.changedTouches[0].clientY - touchY.current;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) onNext();
      else onPrev();
    }
    touchX.current = null;
    touchY.current = null;
  };

  const arrow =
    "hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-bone-100/25 bg-ink-900/50 text-2xl text-bone-100 backdrop-blur-sm transition-all hover:scale-110 hover:border-brass-400 hover:bg-brass-500 hover:text-ink-900 sm:flex";

  return createPortal(
    <div
      className="cr-overlay-in fixed inset-0 z-[110] flex touch-none select-none flex-col bg-ink-900/96 backdrop-blur-md"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={reel.title}
    >
      <div className="flex items-center justify-between px-5 py-5 sm:px-8">
        <span className="font-grotesque text-[12px] uppercase tracking-[0.2em] text-bone-400">
          {String(index + 1).padStart(2, "0")} / {String(reels.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="font-grotesque text-[12px] uppercase tracking-[0.18em] text-bone-300 transition-colors hover:text-brass-300"
        >
          {closeLabel}
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center gap-4 px-4 pb-4 sm:gap-8 sm:px-8">
        <button type="button" onClick={(e) => { e.stopPropagation(); onPrev(); }} className={arrow} aria-label="Previous">
          ‹
        </button>

        <div className="flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
          <div
            className="relative overflow-hidden rounded-xl border border-ink-700 bg-ink-900"
            style={{ height: "min(72vh, calc((100vw - 6rem) * 16 / 9))", aspectRatio: "9 / 16" }}
          >
            <video
              key={reel.id}
              src={reel.video}
              className="h-full w-full object-cover"
              autoPlay
              controls
              playsInline
            />
          </div>
          <div className="text-center">
            <span className="font-grotesque text-[11px] uppercase tracking-[0.22em] text-brass-400">
              {categoryLabel(reel.category, locale)} · {formatDuration(reel.durationSeconds)}
            </span>
            <h3 className="mt-1 font-display text-xl text-bone-100">{reel.title}</h3>
          </div>
        </div>

        <button type="button" onClick={(e) => { e.stopPropagation(); onNext(); }} className={arrow} aria-label="Next">
          ›
        </button>
      </div>

      <p className="pb-5 text-center font-grotesque text-[10px] uppercase tracking-[0.22em] text-bone-600 sm:hidden">
        Swipe to browse
      </p>
    </div>,
    document.body
  );
}
