"use client";

import { useState } from "react";
import Image from "next/image";
import { Mark } from "@/components/logo";
import { formatDuration, type Reel } from "@/data/reels";
import { cn } from "@/lib/cn";

const GLOW_POSITIONS = [
  "left-[-20%] top-[8%]",
  "right-[-20%] top-[18%]",
  "left-[15%] bottom-[-15%]",
  "right-[-12%] bottom-[-10%]",
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
          <video
            className="absolute inset-0 h-full w-full bg-ink-900 object-cover"
            src={reel.video}
            controls
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 block text-left"
            aria-label={`${playLabel}: ${reel.title}`}
          >
            <Image
              src={reel.thumb}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.12]"
            />
            {/* black-gold wash — lightens on hover to reveal the frame */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/55 to-ink-900/25 transition-opacity duration-700 ease-out group-hover:opacity-40" />
            <div
              className={cn(
                "pointer-events-none absolute h-2/3 w-2/3 rounded-full bg-brass-500/20 blur-3xl transition-all duration-700 group-hover:bg-brass-500/30",
                glow
              )}
            />
            {/* persistent bottom scrim keeps the title readable */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-900 via-ink-900/70 to-transparent" />

            <Mark className="absolute right-4 top-4 h-7 w-7 text-brass-500/50" />
            <span className="absolute left-4 top-4 font-grotesque text-[10px] uppercase tracking-[0.22em] text-bone-200 drop-shadow">
              {categoryLabel}
            </span>

            <span className="absolute bottom-[4.5rem] left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-bone-100/50 bg-ink-900/30 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-brass-400 group-hover:bg-brass-500">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-bone-100 transition-colors group-hover:fill-ink-900" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>

            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-display text-xl leading-tight text-bone-100">
                {reel.title}
              </h3>
              <span className="mt-2 block font-grotesque text-[11px] uppercase tracking-[0.18em] text-bone-400">
                {formatDuration(reel.durationSeconds)}
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
