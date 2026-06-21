"use client";

import { useState, useCallback } from "react";
import { ReelCard } from "@/components/reel-card";
import { ReelLightbox } from "@/components/reel-lightbox";
import { Reveal } from "@/components/reveal";
import {
  categoryLabel,
  orderedCategories,
  type Reel,
  type CategoryKey,
} from "@/data/reels";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

export function ReelGrid({
  reels,
  locale,
  allLabel,
  playLabel,
  closeLabel,
  showFilter = true,
}: {
  reels: Reel[];
  locale: Locale;
  allLabel: string;
  playLabel: string;
  closeLabel: string;
  showFilter?: boolean;
}) {
  const [active, setActive] = useState<CategoryKey | "all">("all");
  const [open, setOpen] = useState<number | null>(null);

  const present = orderedCategories.filter((c) =>
    reels.some((r) => r.category === c)
  );
  const filtered =
    active === "all" ? reels : reels.filter((r) => r.category === active);

  const prev = useCallback(
    () => setOpen((i) => (i === null ? null : (i + filtered.length - 1) % filtered.length)),
    [filtered.length]
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? null : (i + 1) % filtered.length)),
    [filtered.length]
  );

  const select = (key: CategoryKey | "all") => {
    setActive(key);
    setOpen(null);
  };

  const tab = (key: CategoryKey | "all", label: string) => (
    <button
      key={key}
      type="button"
      onClick={() => select(key)}
      className={cn(
        "font-grotesque text-[12px] uppercase tracking-[0.18em] transition-colors",
        active === key ? "text-brass-400" : "text-bone-500 hover:text-bone-200"
      )}
    >
      {label}
    </button>
  );

  return (
    <div>
      {showFilter && (
        <div className="mb-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-ink-700 py-5">
          {tab("all", allLabel)}
          {present.map((c) => tab(c, categoryLabel(c, locale)))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((reel, i) => (
          <Reveal key={reel.id} delay={(i % 4) * 70}>
            <ReelCard
              reel={reel}
              index={i}
              categoryLabel={categoryLabel(reel.category, locale)}
              playLabel={playLabel}
              onOpen={() => setOpen(i)}
            />
          </Reveal>
        ))}
      </div>

      <ReelLightbox
        reels={filtered}
        index={open}
        locale={locale}
        closeLabel={closeLabel}
        onClose={() => setOpen(null)}
        onPrev={prev}
        onNext={next}
      />
    </div>
  );
}
