import { SimpleNavbarWithHoverEffects } from "@/components/ui/layout/resizeable-navbar";
import { CenteredWithLogo } from "@/components/ui/layout/footer";
import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { RoleModalProvider } from "@/lib/providers/role-modal-provider";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clubhousebaseball.com"),

  title: {
    default: "Clubhouse Baseball | Find Youth Baseball Organizations & Tournaments",
    template: "%s | Clubhouse Baseball",
  },

  description:
    "Clubhouse Baseball connects parents, players, coaches, and tournament directors in one place. Discover youth baseball organizations, teams, tryouts, and tournaments across the United States.",

  keywords: [
    "youth baseball",
    "baseball organizations",
    "travel baseball teams",
    "youth baseball tournaments",
    "baseball tryouts",
    "club baseball",
    "select baseball",
    "baseball coaches",
    "baseball teams near me",
    "Clubhouse Baseball",
  ],

  authors: [{ name: "Clubhouse Baseball" }],
  creator: "Clubhouse Baseball",
  publisher: "Clubhouse Baseball",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  twitter: {
    card: "summary_large_image",
    title: "Clubhouse Baseball | Youth Baseball Organizations & Tournaments",
    description:
      "Find youth baseball teams, organizations, tryouts, and tournaments — all in one place with Clubhouse Baseball.",
    images: ["/og-image.webp"], // replace when final OG image is ready
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://clubhousebaseball.com",
    title: "Clubhouse Baseball | Youth Baseball Organizations & Tournaments",
    description:
      "Clubhouse Baseball helps parents, players, coaches, and tournament directors connect. Explore youth baseball organizations, teams, tryouts, and events nationwide.",
    siteName: "Clubhouse Baseball",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Clubhouse Baseball platform for youth baseball organizations and tournaments",
        type: "image/webp",
      },
    ],
  },

  alternates: {
    canonical: "https://clubhousebaseball.com",
  },

  category: "sports",
  classification: "Sports & Recreation",

  other: {
    "geo.region": "US",
    "geo.placename": "United States",
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
        className={`${poppins.variable} ${inter.variable} antialiased`}
      >
        <RoleModalProvider>
          <SimpleNavbarWithHoverEffects />
          {children}
          <CenteredWithLogo />
        </RoleModalProvider>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
