import type { Metadata } from "next";
import { Fraunces, Archivo, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://charlesrazielvideography.vercel.app"),
  title: {
    default: "Charles Raziel — Video & Cinematography",
    template: "%s — Charles Raziel",
  },
  description:
    "Cinematic short-form video for dance, performance, and modelling. Brno, Czech Republic. Visual storytelling through movement, shadow, and atmosphere.",
  keywords: [
    "videographer Brno",
    "cinematography Czech Republic",
    "dance video",
    "performance video",
    "modelling video",
  ],
  openGraph: {
    type: "website",
    title: "Charles Raziel — Video & Cinematography",
    description:
      "Visual storytelling through movement, shadow, and atmosphere. Brno, Czech Republic.",
    siteName: "Charles Raziel",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${archivo.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
