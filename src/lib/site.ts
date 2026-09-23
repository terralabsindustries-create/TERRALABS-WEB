/**
 * Single source of truth for site-wide metadata.
 *
 * Every value here was taken from the existing site copy — the domain from the
 * footer links, the licence and authority from the legal pages, the handles from
 * the social bar. Nothing here is invented. Update this file, not the individual
 * metadata exports.
 *
 * `platforms` is deliberately shared between app/json-ld.tsx and the homepage's
 * company section: the structured data and the visible copy are rendered from
 * the same strings, so machine-read claims can never drift from what a visitor
 * actually sees on the page.
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

  title:
    "TerraLabs Industries | Advanced AI, Financial Intelligence & Mobility Technology",

  // Used as the meta description, the OG/Twitter description and the manifest
  // description. Kept identical everywhere so search and social agree.
  description:
    "TerraLabs Industries is a global R&D institution developing advanced intelligence systems across financial technology, AI, mobility, road safety, infrastructure and human coordination.",

  // Boilerplate — one line, for directory listings and anywhere a single
  // sentence has to stand in for the company.
  descriptionShort:
    "TerraLabs Industries is a global R&D-driven technology institution developing advanced intelligence systems across finance, mobility, infrastructure and human networks.",

  // Long form, for the knowledge-panel style description in structured data.
  descriptionLong:
    "TerraLabs Industries is a global research and development institution building advanced intelligence systems across finance, mobility, infrastructure and human networks. Its technology ecosystem includes Pythagoras Stardust autonomous financial intelligence, Titanus-X quantitative systems, BlueBox One intelligent speed-governance technology, WeLoop human-coordination intelligence and TerraLabs’ advanced R&D infrastructure.",

  tagline: "Intelligence for Earth and Beyond.",

  // The company positioning copy, rendered verbatim by the homepage company
  // section. Structured data reuses the same strings.
  intro: [
    "TerraLabs Industries is a global research and development institution building advanced intelligence systems across finance, mobility, infrastructure and human networks.",
    "We research, engineer and deploy intelligent systems that learn, adapt and operate in complex real-world environments.",
    "Rather than operating around a single product or industry, TerraLabs develops a portfolio of specialised technology platforms supported by a common research, intelligence and engineering infrastructure.",
  ],

  // The fields TerraLabs works across. Rendered as a visible list and emitted
  // as Organization.knowsAbout.
  disciplines: [
    "Artificial Intelligence",
    "Financial Engineering",
    "Robotics & Embedded Systems",
    "Intelligent Mobility",
    "Advanced Computing",
    "Human Coordination Networks",
  ],

  closing: {
    heading: "One Intelligence Ecosystem. Multiple Industries.",
    lead: "TerraLabs Industries is built around a simple principle:",
    principle: "Intelligence should not remain static.",
    body: [
      "Systems should be capable of learning from information, adapting to changing environments, protecting the people and infrastructure around them and improving through continued research.",
      "Our technology portfolio spans different industries, but every TerraLabs project shares the same foundation:",
    ],
    foundation: [
      "Research",
      "Intelligence",
      "Engineering",
      "Governance",
      "Real-world deployment",
    ],
    statement:
      "We are building accountable intelligence for the systems on which tomorrow’s world will depend.",
  },

  platforms: [
    {
      id: "pythagoras-stardust",
      // Displayed with the trademark symbol; `name` stays clean for schema.org.
      name: "Pythagoras Stardust",
      display: "Pythagoras Stardust™",
      type: "Autonomous Financial Intelligence System",
      applicationCategory: "FinanceApplication",
      body: [
        "Pythagoras Stardust is TerraLabs Industries’ financial intelligence and execution platform, designed to analyse complex market environments and support autonomous, data-driven execution.",
        "Its architecture combines adaptive intelligence, deep reinforcement learning, decision frameworks, distributed learning, market-regime analysis and capital-preservation systems.",
        "Pythagoras Stardust is designed as a governed financial intelligence infrastructure rather than a broker, fund manager or custodian.",
      ],
      note: null,
    },
    {
      id: "titanus-x",
      name: "Titanus-X",
      display: "Titanus-X™",
      type: "High-Precision Options Intelligence",
      applicationCategory: "FinanceApplication",
      body: [
        "Titanus-X is TerraLabs Industries’ quantitative intelligence and execution system engineered for high-volatility, time-sensitive derivatives markets.",
        "The platform focuses on timing accuracy, controlled exposure, risk governance and capital preservation.",
      ],
      note: null,
    },
    {
      id: "bluebox-one",
      name: "BlueBox One",
      display: "BlueBox One",
      type: "Intelligent Speed Governance & Road-Safety Infrastructure",
      applicationCategory: "TransportationApplication",
      body: [
        "BlueBox One is an advanced mobility and road-safety technology being developed by TerraLabs Industries for intelligent speed governance and automated enforcement infrastructure.",
        "Instead of depending on a single isolated parameter, BlueBox One is designed around multi-parameter verification, analysing multiple relevant data points before producing an intelligent system verdict.",
        "The platform is being developed to support speed-violation detection, contextual verification and automated fine-processing workflows while improving the intelligence and reliability of road-speed enforcement.",
      ],
      note: "Certain technological provisions within BlueBox One are patent pending.",
    },
    {
      id: "weloop",
      name: "WeLoop",
      display: "WeLoop™",
      type: "Human Coordination Intelligence",
      applicationCategory: "SocialNetworkingApplication",
      body: [
        "WeLoop is an AI-driven human-coordination platform designed to connect people with real-world needs, opportunities and solutions through intelligent intent matching.",
        "The platform explores new models for real-time coordination, community trust and distributed participation.",
      ],
      note: null,
    },
    {
      id: "rd-laboratory",
      name: "TerraLabs R&D Laboratory",
      display: "TerraLabs R&D Laboratory",
      type: "Advanced Intelligence Research Infrastructure",
      applicationCategory: "DeveloperApplication",
      body: [
        "The TerraLabs R&D Laboratory provides the research and computational foundation behind the company’s technology ecosystem.",
        "It supports advanced simulations, machine-learning research, system validation, stress testing and the development of next-generation adaptive intelligence.",
      ],
      note: null,
    },
  ],

  // The people who run TerraLabs Industries. Rendered by the Board of Directors
  // section and emitted as schema.org Person nodes, so the names and titles a
  // crawler reads are exactly the ones a visitor sees. `jobTitle` is the full
  // title search engines resolve role queries ("TerraLabs Industries CTO")
  // against; `role` is the abbreviation, stated alongside it in the visible
  // copy so both forms match. `sameAs` takes each person's public profile URLs
  // (LinkedIn first) — the strongest signal tying the person to the company.
  leadership: [
    {
      id: "jyothish-vanaja-rajendran",
      name: "Jyothish Vanaja Rajendran",
      title: "Chief Executive Officer",
      jobTitle: "Chief Executive Officer",
      role: "CEO",
      founder: false,
      description:
        "Visionary technologist and serial entrepreneur pioneering AI-driven trading engines with mastery over execution science, system architecture, and enterprise infrastructure. Grounded in advanced computational systems and data science from early exposure to technology ecosystems, bridging business strategy with cutting-edge technical innovation. Since early 2000s, architecting multi-industry ventures across fintech, AI, blockchain (WEB 3.0), logistics, F&B, construction, and sustainable living infrastructure spanning India, UAE, Australia, and Southeast Asia. Steering TerraLabs Industries' strategic direction as Chief Executive Officer—guiding the vision behind Pythagoras Stardust™ in production while driving frontier research through Large Reasoning Models, neural algorithmic trading frameworks, and next-generation execution systems. Co-founder of Metawire (Blockchain Technology & Payment Gateways) and GastroLabs www.gastrolabs.xyz, with a civilization-scale vision focused on capital efficiency, AI-powered market intelligence, and sustainable, longevity-oriented living systems.",
      expertise: [
        "AI & Machine Learning",
        "Trading Algorithms",
        "Strategic Leadership",
        "Financial Technology",
        "Multi-Industry Innovation",
      ],
      highlights: "CEO • AI Pioneer • Serial Entrepreneur",
      tagline: "The man setting strategy and vision, from direction to execution",
      email: "jyothishvr@outlook.com",
      phone: "+971543434848",
      phoneDisplay: "+971 5 4343 4848",
      sameAs: [],
    },
    {
      id: "akbar-haleel",
      name: "Akbar Haleel",
      title: "Chief Technology Officer",
      jobTitle: "Chief Technology Officer",
      role: "CTO",
      founder: false,
      description:
        "Chief Technology Officer of TerraLabs Industries, leading engineering across the company's technology ecosystem—the software, infrastructure and intelligent systems behind Pythagoras Stardust™, Titanus-X™, BlueBox One, WeLoop™ and the TerraLabs R&D Laboratory. Responsible for system architecture, platform engineering and taking TerraLabs research from the laboratory into governed, real-world deployment.",
      expertise: [
        "System Architecture",
        "Platform Engineering",
        "AI Systems",
        "Technology Strategy",
      ],
      highlights: "CTO • Systems Architect • Platform Engineering",
      tagline: "The man engineering TerraLabs' technology, from architecture to production",
      email: null,
      phone: null,
      phoneDisplay: null,
      sameAs: [],
    },
    {
      id: "renjith-raj",
      name: "Renjith Raj",
      title: "Entrepreneur, Strategic Backer & Co-Founder",
      jobTitle: "Co-Founder",
      role: null,
      founder: true,
      description:
        "Strategic capital partner and institutional network architect driving TerraLabs Industries' market positioning and credibility. Multi-disciplinary Entrepreneur operating Industrial printing warehouses, Chain of Fitness units, Printing Material Supply chain. Orchestrating high-value relationships with institutional investors, regulatory bodies, and strategic partners across UAE and international markets. Expert in capital structuring, public positioning, and building institutional trust at scale.",
      expertise: [
        "Capital Strategy",
        "Institutional Networks",
        "Public Relations",
        "Strategic Partnerships",
      ],
      highlights: null,
      tagline: "The man behind capital, credibility and Public Positioning",
      email: "renjithrajrv@outlook.com",
      phone: "+971547474781",
      phoneDisplay: "+971 5 474747 81",
      sameAs: [],
    },
  ],

  // Deliberately entity-first, not head-term-first. TerraLabs does not compete
  // for generic phrases like "best AI company" or "innovation company"; the
  // strategy is to make the graph unambiguous — TerraLabs Industries as the
  // parent entity, each platform as a named child that always resolves back to
  // it. Branded and long-tail descriptors only.
  keywords: [
    "TerraLabs Industries",
    "Pythagoras Stardust by TerraLabs Industries",
    "Titanus-X by TerraLabs Industries",
    "BlueBox One by TerraLabs Industries",
    "WeLoop by TerraLabs Industries",
    "TerraLabs R&D Laboratory",
    "Pythagoras Stardust",
    "Titanus-X",
    "BlueBox One",
    "WeLoop",
    "autonomous financial intelligence system",
    "high-precision options intelligence",
    "intelligent speed governance",
    "multi-parameter speed verification",
    "automated fine processing",
    "human coordination intelligence",
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
export type Platform = (typeof site.platforms)[number];
export type Leader = (typeof site.leadership)[number];

/**
 * "TerraLabs Industries is led by <name>, Chief Executive Officer (CEO), and
 * <name>, Chief Technology Officer (CTO)." — one plain sentence naming each
 * executive with both forms of their title. Rendered as visible text in the
 * Board section so a search engine answering "who is the CTO of TerraLabs
 * Industries" has an unambiguous sentence to extract.
 */
export const leadershipStatement = () => {
  const executives = site.leadership
    .filter((leader) => leader.role)
    .map((leader) => `${leader.name}, ${leader.jobTitle} (${leader.role})`);
  const list =
    executives.length > 1
      ? `${executives.slice(0, -1).join(", ")}, and ${executives[executives.length - 1]}`
      : executives[0];
  return `${site.name} is led by ${list}.`;
};

/**
 * "<platform> by TerraLabs Industries" — the phrasing that ties each child
 * entity to the parent. Used for the visible byline on every platform block and
 * as a schema.org alternateName, so the relationship is stated the same way to
 * readers and to crawlers. Platforms whose name already carries the brand
 * (the R&D Laboratory) are left alone rather than repeated into nonsense.
 */
export const attribution = (platform: Platform) =>
  platform.name.includes("TerraLabs") ? null : `by ${site.name}`;
