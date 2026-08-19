/**
 * Single source of truth for site-wide metadata.
 *
 * Every value here was taken from the existing site copy — the domain from the
 * footer links, the licence and authority from the legal pages, the handles from
 * the social bar. Nothing here is invented. Update this file, not the individual
 * metadata exports.
 */

export const site = {
  name: "TERRALABS INDUSTRIES",
  shortName: "TERRALABS",
  url: "https://www.terralabsindustries.com",

  title: "TERRALABS INDUSTRIES | AI-Driven XAU/USD Trading",
  description:
    "AI-driven XAU/USD trading powered by SNAIT adaptive intelligence. Institutional-grade gold algorithmic execution from Dubai. DIEZA licensed, No. 75343.",

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
