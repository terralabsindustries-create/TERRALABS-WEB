import type { Metadata, Viewport } from "next";
import { site } from "../src/lib/site";
import { JsonLd } from "./json-ld";
import "../src/styles/index.css";

export const metadata: Metadata = {
  // Makes every relative URL below (OG images, canonicals) resolve absolutely.
  metadataBase: new URL(site.url),

  title: {
    default: site.title,
    // Child routes set only their own name: "Pricing" -> "Pricing | TERRALABS INDUSTRIES"
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],

  applicationName: site.name,
  generator: "Next.js",
  category: "technology",

  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,

  alternates: {
    canonical: site.canonical,
  },

  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.canonical,
    locale: site.locale,
    // Resolved from app/opengraph-image.tsx
  },

  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: "@terralabs",
    site: "@terralabs",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: site.themeColor,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
