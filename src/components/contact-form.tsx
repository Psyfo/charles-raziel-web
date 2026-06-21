"use client";

import { useState } from "react";
import { z } from "zod";
import { Dialog } from "@/components/dialog";

// Placeholder recipient — swap for the real inbox and wire to Resend in Phase 3.
const TO = "studio@charlesrazielvideography.com";

type Labels = {
  name: string;
  email: string;
  message: string;
  send: string;
  errorName: string;
  errorEmail: string;
  errorMessage: string;
  successTitle: string;
  successBody: string;
  successClose: string;
  emailDirect: string;
};

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm({ labels }: { labels: Labels }) {
  const schema = z.object({
    name: z.string().trim().min(2, labels.errorName),
    email: z.email(labels.errorEmail),
    message: z.string().trim().min(10, labels.errorMessage),
  });

  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [success, setSuccess] = useState(false);
  const [sentName, setSentName] = useState("");
  const [mailto, setMailto] = useState("");

  function update(field: "name" | "email" | "message", val: string) {
    setValues((v) => ({ ...v, [field]: val }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const next: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    const subject = encodeURIComponent(`New enquiry from ${result.data.name}`);
    const body = encodeURIComponent(
      `${result.data.message}\n\n— ${result.data.name}\n${result.data.email}`
    );
    setMailto(`mailto:${TO}?subject=${subject}&body=${body}`);
    setSentName(result.data.name);
    setSuccess(true);
  }

  const fieldBase =
    "w-full rounded-md border bg-ink-800 px-4 py-3 text-bone-100 placeholder:text-bone-600 outline-none transition-colors";

  const fieldClass = (err?: string) =>
    `${fieldBase} ${err ? "border-[#d98a6a] focus:border-[#d98a6a]" : "border-ink-600 focus:border-brass-400"}`;

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <Field
          label={labels.name}
          error={errors.name}
          input={
            <input
              className={fieldClass(errors.name)}
              placeholder={labels.name}
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              aria-label={labels.name}
              aria-invalid={!!errors.name}
            />
          }
        />
        <Field
          label={labels.email}
          error={errors.email}
          input={
            <input
              className={fieldClass(errors.email)}
              type="email"
              placeholder={labels.email}
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              aria-label={labels.email}
              aria-invalid={!!errors.email}
            />
          }
        />
        <Field
          label={labels.message}
          error={errors.message}
          input={
            <textarea
              className={`${fieldClass(errors.message)} min-h-40 resize-y`}
              placeholder={labels.message}
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              aria-label={labels.message}
              aria-invalid={!!errors.message}
            />
          }
        />
        <button
          type="submit"
          className="mt-1 w-fit rounded-full bg-brass-500 px-8 py-3.5 font-grotesque text-[12px] uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brass-300"
        >
          {labels.send}
        </button>
      </form>

      <Dialog
        open={success}
        onClose={() => setSuccess(false)}
        title={labels.successTitle}
        closeLabel={labels.successClose}
      >
        <span className="block">{labels.successBody.replace("{name}", sentName)}</span>
        <a
          href={mailto}
          className="mt-5 inline-block font-grotesque text-[11px] uppercase tracking-[0.16em] text-brass-400 underline-offset-4 transition-colors hover:text-brass-300 hover:underline"
        >
          {labels.emailDirect}
        </a>
      </Dialog>
    </>
  );
}

function Field({
  input,
  error,
}: {
  label: string;
  input: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      {input}
      {error && (
        <p className="mt-2 font-grotesque text-[11px] uppercase tracking-[0.12em] text-[#d98a6a]">
          {error}
        </p>
      )}
    </div>
  );
}
