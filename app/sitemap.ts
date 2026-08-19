import type { MetadataRoute } from "next";
import { site } from "../src/lib/site";

/**
 * The site is currently a single route — every section is a scroll anchor rather
 * than its own URL, so there is exactly one thing to submit. As App.tsx is split
 * into real routes, add each one here; Next serves this at /sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
