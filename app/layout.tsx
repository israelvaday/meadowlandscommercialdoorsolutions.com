import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { BIZ, hasPhone } from "@/lib/business";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MobileDock } from "@/components/site/MobileDock";
import { localBusinessJsonLd } from "@/lib/schema";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "optional", adjustFontFallback: true });
const jakarta = Inter({ subsets: ["latin"], variable: "--font-jakarta", display: "optional", adjustFontFallback: true });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "optional", adjustFontFallback: true });

export const metadata: Metadata = {
  metadataBase: new URL(BIZ.url),
  title: {
    default: `${BIZ.name} — Commercial Doors in Jersey City & the Meadowlands`,
    template: `%s — ${BIZ.name}`,
  },
  description:
    `${BIZ.name} installs and repairs commercial overhead doors, rolling steel, loading docks, high-speed doors, fire-rated assemblies, and storefronts from ${BIZ.address.full}.${hasPhone ? ` Call ${BIZ.phone}.` : " Request a free quote."}`,
  keywords: [
    "commercial door jersey city",
    "overhead door meadowlands",
    "rolling steel door hudson county",
    "loading dock door nj",
    "commercial door repair jersey city nj",
    "storefront door downtown jersey city",
  ],
  openGraph: {
    type: "website",
    siteName: BIZ.name,
    url: BIZ.url,
    locale: "en_US",
    title: `${BIZ.name} — Commercial Doors · Jersey City`,
    description:
      `Commercial overhead, rolling steel, dock, and storefront door systems across ${BIZ.region}.`,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: `${BIZ.name} — commercial door systems in Jersey City`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BIZ.name} — Jersey City commercial doors`,
    description: `Overhead, rolling steel, dock, and storefront systems for ${BIZ.regionShort}.`,
    images: ["/opengraph-image.png"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#030508",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${display.variable} ${jakarta.variable} ${mono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'if(location.protocol==="http:"&&location.hostname==="meadowlandscommercialdoorsolutions.com"){location.replace("https://"+location.host+location.pathname+location.search+location.hash)}',
          }}
        />
      </head>
      <body className="bg-ink-950 font-sans text-ink-50 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileDock />
        <Toaster position="top-center" theme="dark" richColors />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
      </body>
    </html>
  );
}
