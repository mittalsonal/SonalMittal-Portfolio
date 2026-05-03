import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

import "./styles/globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Sonal Mittal Portfolio",
  description:
    "Luxury editorial portfolio for Sonal Mittal, a Full stack developer | AI engineer focused on scalable systems, AI-powered products, and thoughtful user experiences.",
  icons: {
    icon: [
      { url: "/images/favicon.png", sizes: "32x32",   type: "image/png" },
      { url: "/images/favicon.png", sizes: "64x64",   type: "image/png" },
      { url: "/images/favicon.png", sizes: "192x192", type: "image/png" },
      { url: "/images/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/images/favicon.png",
    apple:    { url: "/images/favicon.png", sizes: "180x180", type: "image/png" },
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${dmSans.variable} bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}