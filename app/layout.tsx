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
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurorabeauty.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aurora Beauty | Український магазин косметики",
    template: "%s | Aurora Beauty",
  },
  description:
    "Український інтернет-магазин Aurora Beauty: професійний догляд, сироватки та креми з доставкою по Україні.",
  keywords: [
    "косметика",
    "український магазин косметики",
    "догляд за шкірою",
    "сироватки",
    "крем для обличчя",
    "prom.ua косметика",
  ],
  openGraph: {
    title: "Aurora Beauty | Український магазин косметики",
    description:
      "Обирайте сертифіковану доглядову косметику від Aurora Beauty та оформлюйте замовлення через Prom.ua.",
    url: siteUrl,
    siteName: "Aurora Beauty",
    locale: "uk_UA",
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
    title: "Aurora Beauty | Український магазин косметики",
    description:
      "Професійний догляд за шкірою, найкращі сироватки та креми — замовляйте онлайн та отримуйте через Prom.ua.",
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
