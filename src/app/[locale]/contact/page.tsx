import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ContactForm } from "@/components/contact-form";

const PAD = "px-[clamp(20px,6vw,72px)]";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const dict = getDictionary(isLocale(raw) ? raw : defaultLocale);
  return { title: dict.nav.contact, description: dict.contact.body };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className={`mx-auto max-w-[1400px] ${PAD} pb-28 pt-36`}>
      <div className="grid gap-14 md:grid-cols-2">
        <div>
          <p className="font-grotesque text-[12px] uppercase tracking-[0.28em] text-brass-400">
            {dict.contact.kicker}
          </p>
          <h1
            className="mt-4 max-w-[14ch] font-display leading-[1.02] text-bone-100"
            style={{ fontSize: "clamp(40px, 6vw, 76px)" }}
          >
            {dict.contact.title}
          </h1>
          <p className="mt-6 max-w-md text-lg text-bone-400">
            {dict.contact.body}
          </p>
          <p className="mt-10 font-grotesque text-[12px] uppercase tracking-[0.2em] text-bone-500">
            {dict.site.location}
          </p>
        </div>

        <div className="md:pt-10">
          <ContactForm
            labels={{
              name: dict.contact.name,
              email: dict.contact.email,
              message: dict.contact.message,
              send: dict.contact.send,
            }}
          />
        </div>
      </div>
    </div>
  );
}
