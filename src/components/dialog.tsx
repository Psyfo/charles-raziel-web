"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

export function Dialog({
  open,
  onClose,
  title,
  children,
  closeLabel = "Close",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  closeLabel?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="cr-overlay-in fixed inset-0 z-[120] flex items-center justify-center p-5 bg-ink-900/80 backdrop-blur-md"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="cr-pop w-full max-w-md rounded-2xl border border-ink-600 bg-ink-800 p-9 text-center"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-brass-500/40 bg-brass-500/10">
          <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-brass-400" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h2 className="font-display text-2xl text-bone-100">{title}</h2>
        <div className="mt-3 text-[15px] leading-relaxed text-bone-400">{children}</div>
        <button
          type="button"
          onClick={onClose}
          className="mt-8 rounded-full bg-brass-500 px-7 py-3 font-grotesque text-[12px] uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brass-300"
        >
          {closeLabel}
        </button>
      </div>
    </div>,
    document.body
  );
}
