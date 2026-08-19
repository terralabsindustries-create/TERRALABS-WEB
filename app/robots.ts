import type { MetadataRoute } from "next";
import { site } from "../src/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing user-specific should ever reach an index.
        disallow: ["/api/", "/onboarding/", "/client-login"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
