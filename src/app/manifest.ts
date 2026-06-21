import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Charles Raziel — Video & Cinematography",
    short_name: "Charles Raziel",
    description:
      "Cinematic short-form video for dance, performance, and modelling. Brno, Czech Republic.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0a08",
    theme_color: "#0b0a08",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
