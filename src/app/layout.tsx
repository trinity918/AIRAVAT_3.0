import type { Metadata } from "next";
import { Audiowide, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airavat 3.0",
  description: "AIRAVAT 3.0 - 24 hour AI Hackathon by IEEE CS SPIT",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${audiowide.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
