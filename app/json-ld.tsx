import { attribution, site } from "../src/lib/site";

/**
 * Structured data. Every claim below appears in the site's own copy — the licence
 * number and issuing authority come from the legal pages, and the organisation and
 * platform descriptions are the same strings the homepage renders as visible text.
 * Do not add performance, return, or regulatory claims here that the site does not
 * already state and cannot substantiate; structured data is machine-read and
 * treated as assertion.
 */

const organizationId = `${site.url}/#organization`;

const platformId = (id: string) => `${site.url}/#${id}`;

/**
 * Every way the platform is written elsewhere on the site or in the wild, so a
 * crawler resolving any of them lands on this one node. Omitted rather than left
 * empty when the canonical name is the only form.
 */
const alternateNames = (platform: (typeof site.platforms)[number]) => {
  const credit = attribution(platform);
  const names = [
    ...(platform.display !== platform.name ? [platform.display] : []),
    ...(credit ? [`${platform.name} ${credit}`] : []),
  ];
  return names.length ? { alternateName: names } : {};
};

/**
 * One node per platform in the technology ecosystem. Product is used uniformly:
 * it is valid for every entry (software platforms, mobility infrastructure and the
 * research laboratory alike) and carries no type-specific required properties that
 * the site cannot substantiate. Each `url` points at the platform's own anchor in
 * the homepage's ecosystem section, so a crawler can reach the visible copy the
 * description was taken from.
 */
const platforms = site.platforms.map((platform) => ({
  "@type": "Product",
  "@id": platformId(platform.id),
  name: platform.name,
  // Both the trademarked display form and the "<name> by TerraLabs Industries"
  // phrasing, so a crawler resolving any of the three lands on the same node.
  ...alternateNames(platform),
  category: platform.type,
  // The visible copy is a set of paragraphs; schema.org wants one string.
  description: platform.body.join(" "),
  url: `${site.canonical}/#${platform.id}`,
  brand: { "@id": organizationId },
  manufacturer: { "@id": organizationId },
}));

const organization = {
  "@type": "Organization",
  "@id": organizationId,
  name: site.name,
  alternateName: site.alternateName,
  url: site.canonical,
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/images/TERRA_OPS_LOGO__2_-1.png`,
  },
  description: site.descriptionLong,
  slogan: site.tagline,
  knowsAbout: [...site.disciplines],
  owns: site.platforms.map((platform) => ({ "@id": platformId(platform.id) })),
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.locality,
    addressRegion: site.location.region,
    addressCountry: site.location.country,
  },
  identifier: {
    "@type": "PropertyValue",
    name: `${site.authority} Licence`,
    value: site.licence,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    telephone: site.phone,
    areaServed: "AE",
    availableLanguage: ["en"],
  },
  sameAs: [...site.social],
};

const website = {
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.canonical,
  name: site.name,
  description: site.description,
  publisher: { "@id": organizationId },
  inLanguage: "en",
};

const graph = {
  "@context": "https://schema.org",
  "@graph": [organization, website, ...platforms],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // Escaping "<" closes off script-injection via any interpolated value.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
