import type { Metadata } from "next";
import { Oswald, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SEIZE DA FLAQ (SDF//26) — Shortlisted Teams Archive & RSVP",
  description:
    "Official Shortlisted Teams & RSVP Directory for Seize da Flaq 2026 (SDF//26), the premier cybersecurity Capture The Flag organized by Cyberonites Club, GLA University Mathura.",
  keywords: [
    "Seize da Flaq",
    "SDF 26",
    "Cyberonites Club",
    "GLA University",
    "CTF Shortlisted Teams",
    "Cybersecurity Capture The Flag",
  ],
  openGraph: {
    title: "SEIZE DA FLAQ (SDF//26) — Shortlisted Teams Archive",
    description:
      "Find your crew in the official shortlist for Seize da Flaq 2026. Screening round complete.",
    url: "https://seizedaflaq.cyberonites.com/",
    siteName: "Seize da Flaq",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/pricedown"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#08090B] text-[#EDE8DF] selection:bg-[#F37021] selection:text-black">
        {children}
      </body>
    </html>
  );
}
