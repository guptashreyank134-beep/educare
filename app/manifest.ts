import { MetadataRoute } from "next";

/**
 * Web app manifest (served at /manifest.webmanifest). Enables add-to-home-screen
 * on mobile and gives the brand a proper name/theme when saved.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dr. Shreyank Educare — Tutoring in Burnaby & Vancouver",
    short_name: "Educare",
    description:
      "PhD-led tutoring in Math, Physics, Chemistry and Coding for Grades 6–12 and university across Burnaby & Vancouver.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1d4ed8",
    icons: [
      {
        src: "/assets/logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
