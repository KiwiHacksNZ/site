import { official } from "../Events/events.js";
import { communitySitemapEntries } from "../Events/community.js";

export const prerender = false;

const SITE = "https://kiwihacks.org";

const STATIC = [
  ["/", "2026-08-20", "weekly", "1.0"],
  ["/hackathons", "2026-11-14", "weekly", "0.9"],
  ["/hackathons/submit", "2026-11-14", "monthly", "0.6"],
  ["/showcase", "2026-08-20", "monthly", "0.8"],
  ["/team", "2026-07-04", "monthly", "0.6"],
  ["/about", "2026-10-31", "monthly", "0.7"],
  ["/contact", "2026-10-31", "yearly", "0.6"],
  ["/code-of-conduct", "2026-08-20", "yearly", "0.4"],
  ["/privacy-policy", "2026-11-14", "yearly", "0.4"],
  ["/safeguarding", "2026-10-31", "yearly", "0.4"],
  ["/status", "2026-10-31", "daily", "0.3"],
];

const escapeXml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const urlNode = (path, lastmod, changefreq, priority) => `  <url>
    <loc>${escapeXml(`${SITE}${path}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

export async function GET() {
  const seen = new Set(STATIC.map(([path]) => path));
  const events = [];
  for (const event of official) {
    const path = `/events/${event.slug}`;
    if (seen.has(path)) continue;
    seen.add(path);
    events.push(urlNode(path, "2026-11-14", "weekly", "0.7"));
  }
  for (const event of await communitySitemapEntries()) {
    const path = `/events/${event.slug}`;
    if (seen.has(path) || !/^[a-z0-9-]+$/.test(event.slug)) continue;
    seen.add(path);
    const lastmod = String(event._updatedAt ?? "").slice(0, 10) || "2026-11-14";
    events.push(urlNode(path, lastmod, "weekly", "0.6"));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC.map(([path, lastmod, changefreq, priority]) => urlNode(path, lastmod, changefreq, priority)).join("\n")}
${events.join("\n")}
</urlset>
`;
  return new Response(xml, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
}
