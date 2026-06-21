"use client";

import { useState } from "react";
import { Mark } from "@/components/logo";
import { formatDuration, type Reel } from "@/data/reels";
import { cn } from "@/lib/cn";

const GLOW_POSITIONS = [
  "left-[-20%] top-[10%]",
  "right-[-20%] top-[20%]",
  "left-[20%] bottom-[-15%]",
  "right-[-10%] bottom-[-10%]",
];

export function ReelCard({
  reel,
  categoryLabel,
  playLabel,
  index = 0,
}: {
  reel: Reel;
  categoryLabel: string;
  playLabel: string;
  index?: number;
}) {
  const [playing, setPlaying] = useState(false);
  const glow = GLOW_POSITIONS[index % GLOW_POSITIONS.length];

  return (
    <div className="group relative overflow-hidden rounded-lg border border-ink-700 bg-ink-800 transition-colors duration-500 hover:border-brass-500/60">
      <div className="relative aspect-[9/16]">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&mute=1&rel=0&playsinline=1`}
            title={reel.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 block text-left"
            aria-label={`${playLabel}: ${reel.title}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-ink-600 via-ink-800 to-ink-900" />
            <div
              className={cn(
                "absolute h-2/3 w-2/3 rounded-full bg-brass-500/20 blur-3xl transition-opacity duration-700 group-hover:bg-brass-500/30",
                glow
              )}
            />
            <Mark className="absolute right-4 top-4 h-7 w-7 text-brass-500/40" />

            <span className="absolute left-4 top-4 font-grotesque text-[10px] uppercase tracking-[0.22em] text-bone-300">
              {categoryLabel}
            </span>

            <span className="absolute bottom-20 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-bone-100/40 bg-ink-900/40 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-brass-400 group-hover:bg-brass-500">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-bone-100 transition-colors group-hover:fill-ink-900" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900 to-transparent p-5 pt-16">
              <h3 className="font-display text-xl leading-tight text-bone-100">
                {reel.title}
              </h3>
              <span className="mt-2 block font-grotesque text-[11px] uppercase tracking-[0.18em] text-bone-500">
                {formatDuration(reel.durationSeconds)}
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
