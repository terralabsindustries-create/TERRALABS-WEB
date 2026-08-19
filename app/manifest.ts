import type { MetadataRoute } from "next";
import { site } from "../src/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: site.backgroundColor,
    theme_color: site.themeColor,
    icons: [
      { src: "/images/TERRA_OPS_LOGO__2_-1.png", sizes: "any", type: "image/png" },
    ],
  };
}
