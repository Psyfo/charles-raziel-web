"use client";

import { useState } from "react";

// Placeholder recipient — swap for the real inbox and wire to Resend in Phase 3.
const TO = "studio@charlesrazielvideography.com";

export function ContactForm({
  labels,
}: {
  labels: {
    name: string;
    email: string;
    message: string;
    send: string;
  };
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`New enquiry from ${name || "the website"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${TO}?subject=${subject}&body=${body}`;
  }

  const field =
    "w-full rounded-md border border-ink-600 bg-ink-800 px-4 py-3 text-bone-100 placeholder-bone-600 outline-none transition-colors focus:border-brass-400";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input
        className={field}
        placeholder={labels.name}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        aria-label={labels.name}
      />
      <input
        className={field}
        type="email"
        placeholder={labels.email}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-label={labels.email}
      />
      <textarea
        className={`${field} min-h-40 resize-y`}
        placeholder={labels.message}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        aria-label={labels.message}
      />
      <button
        type="submit"
        className="mt-2 w-fit rounded-full bg-brass-500 px-8 py-3.5 font-grotesque text-[12px] uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brass-300"
      >
        {labels.send}
      </button>
    </form>
  );
}
