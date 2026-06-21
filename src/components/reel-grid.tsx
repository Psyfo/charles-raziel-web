"use client";

import { useState } from "react";
import { ReelCard } from "@/components/reel-card";
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
}: {
  reels: Reel[];
  locale: Locale;
  allLabel: string;
  playLabel: string;
}) {
  const [active, setActive] = useState<CategoryKey | "all">("all");
  const present = orderedCategories.filter((c) =>
    reels.some((r) => r.category === c)
  );
  const filtered =
    active === "all" ? reels : reels.filter((r) => r.category === active);

  const tab = (key: CategoryKey | "all", label: string) => (
    <button
      key={key}
      type="button"
      onClick={() => setActive(key)}
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
      <div className="flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-ink-700 py-5">
        {tab("all", allLabel)}
        {present.map((c) => tab(c, categoryLabel(c, locale)))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((reel, i) => (
          <ReelCard
            key={reel.id}
            reel={reel}
            index={i}
            categoryLabel={categoryLabel(reel.category, locale)}
            playLabel={playLabel}
          />
        ))}
      </div>
    </div>
  );
}
