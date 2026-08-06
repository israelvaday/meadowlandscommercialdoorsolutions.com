import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { BIZ } from "@/lib/business";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MobileDock } from "@/components/site/MobileDock";
import { localBusinessJsonLd } from "@/lib/schema";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "optional", adjustFontFallback: true });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "optional", adjustFontFallback: true });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "optional", adjustFontFallback: true });

export const metadata: Metadata = {
  metadataBase: new URL(BIZ.url),
  title: {
    default: `${BIZ.name} — Door Supply, Installation & Repair NYC`,
    template: `%s — ${BIZ.name}`,
  },
  description:
    `${BIZ.name} provides commercial and residential door supply, custom installation, hardware, and structural door repairs across Brooklyn, Manhattan, and Queens. Free estimates — call ${BIZ.phone}.`,
  keywords: [
    "door supply Brooklyn",
    "door installation NYC",
    "door repair Brooklyn NY",
    "commercial doors NYC",
    "custom door installation Queens",
    "door hardware supply Manhattan",
  ],
  openGraph: {
    type: "website",
    siteName: BIZ.name,
    url: BIZ.url,
    locale: "en_US",
    title: `${BIZ.name} — Door Supply, Installation & Repair NYC`,
    description:
      "Commercial and residential door supply, custom installation, hardware, and structural repairs across Brooklyn, Manhattan & Queens.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: `${BIZ.name} — NYC door supply and installation`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BIZ.name} — NYC door supply & repair`,
    description: "Door supply, installation, hardware, and structural repair for Brooklyn, Manhattan, and Queens.",
    images: ["/opengraph-image.png"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0E12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${inter.variable} ${jakarta.variable} ${mono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'if(location.protocol==="http:"&&location.hostname==="hillmandoorsupplyanddoorrepair.com"){location.replace("https://"+location.host+location.pathname+location.search+location.hash)}',
          }}
        />
      </head>
      <body className="font-sans bg-ink-950 text-ink-50 antialiased">
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
