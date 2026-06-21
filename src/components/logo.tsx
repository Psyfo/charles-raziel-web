import { cn } from "@/lib/cn";

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-9 w-9", className)}
      role="img"
      aria-label="Charles Raziel"
    >
      <circle cx="32" cy="32" r="20.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="13" fill="currentColor" />
      <circle cx="37.5" cy="27" r="12.5" fill="var(--mark-cut, #0b0a08)" />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Mark className={cn("text-brass-500", markClassName)} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[19px] font-medium tracking-tight text-bone-100">
          Charles Raziel
        </span>
        <span className="font-grotesque text-[9px] uppercase tracking-[0.28em] text-bone-500">
          Video &amp; Cinematography
        </span>
      </span>
    </span>
  );
}
