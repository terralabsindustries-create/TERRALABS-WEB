/**
 * Single source of truth for site-wide metadata.
 *
 * Every value here was taken from the existing site copy — the domain from the
 * footer links, the licence and authority from the legal pages, the handles from
 * the social bar. Nothing here is invented. Update this file, not the individual
 * metadata exports.
 */

export const site = {
  name: "TerraLabs Industries",
  // The site copy renders the wordmark in caps; keep it as an alternate name so
  // both forms resolve to the same entity in search.
  alternateName: "TERRALABS INDUSTRIES",
  shortName: "TerraLabs",

  // Origin only — used for metadataBase. Never add a trailing slash here.
  url: "https://www.terralabsindustries.com",
  // Canonical form of the homepage. Next normalises the root path to the
  // origin with no trailing slash; for the root URL the two forms are
  // equivalent to Google, and forcing the slash via trailingSlash: true makes
  // /opengraph-image 308-redirect, which strict social crawlers mishandle.
  canonical: "https://www.terralabsindustries.com",

  title: "TerraLabs Industries | AI & Technology Company",
  description:
    "TerraLabs Industries builds AI-powered software and intelligent trading platforms, including Pythagoras Stardust — a machine-learning gold trading engine.",

  tagline: "Synthetic Neural Adaptive Intelligence Technology",

  keywords: [
    "XAU/USD trading",
    "AI gold trading",
    "algorithmic trading Dubai",
    "SNAIT",
    "Aurelius-1",
    "automated gold trading",
    "MT5 algorithmic trading",
    "quantitative trading UAE",
    "DIEZA licensed trading",
    "regime switching model",
  ],

  locale: "en_US",

  // Brand
  themeColor: "#FF5C39",
  backgroundColor: "#0A0A0A",

  // Registration — as stated on the site's own legal pages
  licence: "75343",
  authority: "Dubai Integrated Economic Zones Authority (DIEZA)",

  location: {
    locality: "Dubai",
    region: "Dubai",
    country: "AE",
    area: "Dubai Digital Park (DDP)",
  },

  phone: "+971543434848",
  whatsapp: "https://wa.me/971543434848",

  social: [
    "https://twitter.com/terralabs",
    "https://linkedin.com/company/terralabs",
    "https://instagram.com/terralabs",
    "https://facebook.com/terralabs",
    "https://youtube.com/@terralabs",
  ],
} as const;

export type Site = typeof site;
