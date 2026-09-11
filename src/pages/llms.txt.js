import { renderToStaticMarkup } from "react-dom/server";
import { faqs } from "../App/components/FAQ/faqs.jsx";
import sponsors from "../App/sponsors.json";
import schema from "../SEO/schema.json";

export const prerender = false;

const SITE = "https://kiwihacks.org";

// Everything below is derived from the same data the pages render, so this file
// cannot quietly drift out of date the way a hand-maintained copy would.
const graph = schema["@graph"] ?? [];
const org = graph.find((node) => node["@type"] === "Organization") ?? {};
const events = graph.filter((node) => node["@type"] === "Event");

const SOCIAL_LABELS = {
  "www.instagram.com": "Instagram",
  "nz.linkedin.com": "LinkedIn",
  "github.com": "GitHub",
};

const TIER_LABELS = {
  gold: "Gold",
  silver: "Silver",
  bronze: "Bronze",
  "in-kind": "In-kind",
};

// The FAQ answers are React nodes with links in them. Rendering them and
// stripping the tags keeps one source of truth for the wording.
function answerToText(answer) {
  return renderToStaticMarkup(answer)
    .replace(/<[^>]+>/g, "")
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// The schema dates carry no timezone ("2026-09-28T09:00"), so new Date() would
// read them as local and land a day early once formatted. Read the parts off
// the string instead and never build a Date at all.
function parts(stamp) {
  const [y, m, d] = stamp.slice(0, 10).split("-").map(Number);
  return { year: y, month: m, day: d };
}

function formatDateRange(start, end) {
  const from = parts(start);
  const to = parts(end);
  if (from.year === to.year && from.month === to.month) {
    if (from.day === to.day) {
      return `${from.day} ${MONTHS[from.month - 1]} ${from.year}`;
    }
    return `${from.day} to ${to.day} ${MONTHS[to.month - 1]} ${to.year}`;
  }
  return (
    `${from.day} ${MONTHS[from.month - 1]} ${from.year} to ` +
    `${to.day} ${MONTHS[to.month - 1]} ${to.year}`
  );
}

function buildDocument() {
  const lines = [];
  const push = (...rows) => lines.push(...rows);

  push(
    "# KiwiHacks",
    "",
    "> New Zealand's first high school hackathon club. We run free hackathons for",
    "> high school students aged 13 to 18, and everything is organised by high",
    "> schoolers. Attending is free, and no prior experience is needed.",
    "",
    "This file is a plain-text summary of kiwihacks.org for language models and",
    "other automated readers. It is generated from the same data the website",
    "renders, so it stays in step with the pages.",
    "",
    "## Organisation",
    "",
  );

  const founders = (Array.isArray(org.founder) ? org.founder : [org.founder])
    .filter(Boolean)
    .map((person) => `${person.name}${person.jobTitle ? ` (${person.jobTitle})` : ""}`);

  push(
    `- Name: ${org.name ?? "KiwiHacks"}`,
    org.legalName ? `- Legal name: ${org.legalName}` : null,
    org.identifier?.value ? `- ${org.identifier.propertyID}: ${org.identifier.value}` : null,
    org.foundingDate ? `- Founded: ${org.foundingDate}` : null,
    founders.length ? `- Founders: ${founders.join(", ")}` : null,
    "- Country: New Zealand",
    "- Who can take part: any high school student in New Zealand, aged 13 to 18",
    "- Cost to attend: free, including food, mentors, workshops and swag",
    `- Website: ${SITE}/`,
    `- Contact: niko@kiwihacks.org`,
    "",
    "## Events",
    "",
    "KiwiHacks Nova is a series of three free 24-hour hackathons for high school",
    "students, one in each of three cities.",
    "",
  );

  for (const event of events) {
    const where = event.location?.address?.addressLocality ?? "Location to be confirmed";
    const name = event.location?.name ?? "";
    const venue = /to be confirmed/i.test(name) ? null : name || null;
    push(
      `### ${event.name}`,
      "",
      `- Dates: ${formatDateRange(event.startDate, event.endDate)}`,
      `- City: ${where}`,
      `- Venue: ${venue ?? "to be confirmed"}`,
      event.description ? `- About: ${event.description}` : null,
      "",
    );
  }

  push("## Partners", "");

  for (const [tier, label] of Object.entries(TIER_LABELS)) {
    const inTier = sponsors.filter((sponsor) => sponsor.tier === tier);
    if (inTier.length === 0) continue;
    push(
      `### ${label} partners`,
      "",
      ...inTier.map((sponsor) => `- [${sponsor.name}](${sponsor.url})`),
      "",
    );
  }

  push(
    "Partnering with KiwiHacks supports the next generation of New Zealand",
    "builders. Enquiries go to niko@kiwihacks.org.",
    "",
    "## Frequently asked questions",
    "",
  );

  for (const { question, answer } of faqs) {
    push(`### ${question}`, "", answerToText(answer), "");
  }

  push(
    "## Links",
    "",
    `- [Home](${SITE}/)`,
    `- [Discord, where the club lives day to day](${SITE}/discord)`,
    `- [Project showcase](${SITE}/showcase)`,
    `- [The team](${SITE}/team)`,
    `- [Parents guide](${SITE}/parents-guide)`,
    `- [Code of conduct](${SITE}/code-of-conduct)`,
    `- [Privacy policy](${SITE}/privacy-policy)`,
    `- [Status](${SITE}/status)`,
    `- [Sign up for KiwiHacks Nova](https://kiwihacks.fillout.com/nova)`,
    `- [KiwiHacks Nova site](https://nova.kiwihacks.org)`,
    ...(org.sameAs ?? [])
      .filter((url) => !url.startsWith(`${SITE}/`))
      .map((url) => `- [${SOCIAL_LABELS[new URL(url).hostname] ?? new URL(url).hostname}](${url})`),
    "",
  );

  return lines.filter((line) => line !== null).join("\n");
}

export async function GET() {
  return new Response(buildDocument(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
