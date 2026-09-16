import schemaData from "./schema.json";

export const SITE = "https://kiwihacks.org";

const DEFAULT_TITLE = "KiwiHacks - New Zealand's High School Hackathon Club";
const DEFAULT_DESCRIPTION =
  "KiwiHacks is New Zealand's high school hackathon club - free events for teenage coders and innovators, run by high schoolers, for high schoolers. KiwiHacks Nova is coming to Auckland, Wellington, and Christchurch.";
const OG_IMAGE = `${SITE}/kiwihacksimage.jpg`;

// Per-route overrides. A page not listed here still gets its own canonical and
// its own title; it just falls back to the site description.
const PAGES = {
  "/": {},
  "/team": {
    description:
      "The high schoolers who run KiwiHacks. Meet the organisers behind New Zealand's high school hackathon club and KiwiHacks Nova.",
  },
  "/showcase": {
    description:
      "Projects built by New Zealand high schoolers at KiwiHacks hackathons. Apps, games, websites and hardware, most of them made in a single weekend.",
  },
  "/code-of-conduct": {
    description:
      "The code of conduct every KiwiHacks attendee, mentor and organiser agrees to. How we keep our hackathons safe and welcoming.",
  },
  "/privacy-policy": {
    description:
      "How KiwiHacks collects, uses and protects the personal information of the high schoolers and guardians who sign up to our events.",
  },
  "/safeguarding": {
    description:
      "How KiwiHacks keeps the high schoolers at our events safe: our safeguarding commitments, the people responsible, and how to raise a concern.",
  },
  "/status": {
    description: "Live status of KiwiHacks services and event sign-ups.",
  },
  "/404": { noindex: true },
};

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// One page must resolve to exactly one canonical URL, so trailing slashes are
// dropped everywhere except the root.
export function canonicalPath(pathname = "/") {
  const trimmed = String(pathname).split("?")[0].replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

// Every page used to publish the homepage's WebPage node, which told search
// engines that /team and /showcase were the homepage. The organisation, events
// and website nodes are genuinely site-wide and stay on every page; the
// WebPage node is rebuilt for the page actually being rendered.
function buildStructuredData(url, title) {
  const graph = (schemaData["@graph"] ?? []).filter(
    (node) => node["@type"] !== "WebPage",
  );

  graph.push({
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    isPartOf: { "@id": `${SITE}/#website` },
    ...(url === `${SITE}/` ? { mainEntity: { "@id": `${SITE}/#org` } } : {}),
  });

  return JSON.stringify({ "@context": schemaData["@context"], "@graph": graph }, null, 2);
}

export function buildSeoHead({ pathname = "/", title, description, noindex } = {}) {
  const path = canonicalPath(pathname);
  const page = PAGES[path] ?? {};

  const pageTitle = title || page.title || DEFAULT_TITLE;
  const pageDescription = description || page.description || DEFAULT_DESCRIPTION;
  const isNoindex = noindex ?? page.noindex ?? false;
  const canonical = path === "/" ? `${SITE}/` : `${SITE}${path}`;

  const t = escapeAttribute(pageTitle);
  const d = escapeAttribute(pageDescription);

  return `
<title>${t}</title>
<link rel="canonical" href="${canonical}">
<meta name="description" content="${d}">
<meta name="robots" content="${isNoindex ? "noindex,follow" : "index,follow,max-image-preview:large"}">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="KiwiHacks">
<meta property="og:locale" content="en_NZ">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:alt" content="KiwiHacks logo">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
<meta name="twitter:image" content="${OG_IMAGE}">
<meta name="twitter:image:alt" content="KiwiHacks logo">
<meta name="google-site-verification" content="VqkpY5ewNGoc7i8GhhyaS7zRb9i1O44_6uHjQsr1Vpw">
<script type="application/ld+json">${buildStructuredData(canonical, pageTitle)}</script>
`;
}
