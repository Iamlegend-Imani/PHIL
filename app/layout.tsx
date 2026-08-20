import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "From Signal to Safeguard",
  description: "A public AI–cyber decision-operations research prototype.",
  other: {
    "codex-preview": "development",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
