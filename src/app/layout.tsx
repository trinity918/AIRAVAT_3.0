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
  title: "Lego Universe Hackathon",
  description: "A single-page hackathon website referencing the Lego universe",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${audiowide.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
