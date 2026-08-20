import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://phil-health-map.imani-kirika116.chatgpt.site"),
  title: "PHIL | Personal Health Intelligence Layer",
  description:
    "A patient-controlled context layer that turns fragmented health information into a clear brief for better clinical conversations.",
  openGraph: {
    title: "PHIL | Personal Health Intelligence Layer",
    description:
      "Your health is not fragmented. Your health data is. Explore a patient-controlled, human-reviewed health context prototype.",
    type: "website",
    images: [
      {
        url: "/assets/prototype-hero.jpg",
        width: 1363,
        height: 936,
        alt: "PHIL interactive prototype overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PHIL | Personal Health Intelligence Layer",
    description:
      "A patient-controlled context layer for clearer clinical conversations.",
    images: ["/assets/prototype-hero.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
