import { site } from "../src/lib/site";

/**
 * Structured data. Every claim below appears in the site's own copy — the licence
 * number and issuing authority come from the legal pages. Do not add performance,
 * return, or regulatory claims here that the site does not already state and
 * cannot substantiate; structured data is machine-read and treated as assertion.
 */

const organization = {
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/images/TERRA_OPS_LOGO__2_-1.png`,
  },
  description: site.description,
  slogan: site.tagline,
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
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "en",
};

const graph = {
  "@context": "https://schema.org",
  "@graph": [organization, website],
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
