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
  title: "Sonal Mittal | Full Stack Engineer & AI Builder",
  description:
    "Luxury editorial portfolio for Sonal Mittal, a Full Stack Engineer focused on scalable systems, AI-powered products, and thoughtful user experiences."
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
