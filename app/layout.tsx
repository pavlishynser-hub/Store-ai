import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurora-cosmetics.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aurora Cosmetics | Modern Skincare Rituals",
    template: "%s | Aurora Cosmetics",
  },
  description:
    "Discover curated Allies of Skin and Medik8 treatments designed to nurture radiant, resilient complexions. Shop modern skincare rituals with effortless checkout.",
  keywords: [
    "cosmetics",
    "skincare",
    "Allies of Skin",
    "Medik8",
    "retinal",
    "hyaluronic serum",
  ],
  openGraph: {
    title: "Aurora Cosmetics | Modern Skincare Rituals",
    description:
      "Curated Allies of Skin and Medik8 essentials for luminous, resilient skin. Explore our hero treatments and checkout securely with Stripe.",
    url: siteUrl,
    siteName: "Aurora Cosmetics",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1612810806695-30ba0cb9b0bf?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Minimalist skincare bottles on a marble surface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurora Cosmetics | Modern Skincare Rituals",
    description:
      "Discover Allies of Skin and Medik8 bestsellers. Hydrating serums, retinal treatments, and barrier balms delivered to your door.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-background`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
