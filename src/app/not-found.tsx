import Link from "next/link";
import { Mark } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-900 px-6 text-center">
      <Link href="/en" aria-label="Charles Raziel — home">
        <Mark className="h-12 w-12 text-brass-500" />
      </Link>
      <p className="mt-10 font-grotesque text-[12px] uppercase tracking-[0.3em] text-brass-400">
        404
      </p>
      <h1 className="mt-4 max-w-[16ch] font-display text-4xl leading-tight text-bone-100 sm:text-5xl">
        This page slipped into the shadows.
      </h1>
      <p className="mt-5 max-w-md text-bone-400">
        {"The page you're looking for doesn't exist or has moved."}
      </p>
      <Link
        href="/en"
        className="mt-9 rounded-full bg-brass-500 px-7 py-3.5 font-grotesque text-[12px] uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brass-300"
      >
        Back home
      </Link>
    </div>
  );
}
