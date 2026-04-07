import type { Metadata } from "next";
import { Geist_Mono, Geist } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { SITE_CONFIG } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: SITE_CONFIG.name, template: `%s | ${SITE_CONFIG.name}` },
  description: SITE_CONFIG.description,
  alternates: {
    types: {
      "application/rss+xml": `${SITE_CONFIG.url}/feed.xml`,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-[var(--color-bg-primary)]"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
