import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "../sanity/client";

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function imageUrl(image, width) {
  if (!builder || !image?.asset) return null;
  return builder.image(image).width(width).fit("max").auto("format").url();
}

const FIELDS = `_id, title, summary, city, startsAt, endsAt, url, image`;

// A Sanity outage shows empty sections instead of breaking the page.
async function fetchEvents(query) {
  if (!sanityClient) return [];
  try {
    const events = await sanityClient.fetch(query);
    return events.filter((event) => imageUrl(event.image, 600));
  } catch (error) {
    console.error("Events failed", error);
    return [];
  }
}

// Ours: upcoming soonest first, past newest first.
export async function kiwihacksEvents() {
  const [upcoming, past] = await Promise.all([
    fetchEvents(`*[_type == "event" && endsAt >= now()] | order(startsAt asc){${FIELDS}}`),
    fetchEvents(`*[_type == "event" && endsAt < now()] | order(startsAt desc){${FIELDS}}`),
  ]);
  return { upcoming, past };
}

// Theirs: upcoming only.
export const communityEvents = () =>
  fetchEvents(
    `*[_type == "communityEvent" && endsAt >= now()] | order(startsAt asc){${FIELDS}, organiser, cost, logo}`,
  );

const TIME_ZONE = "Pacific/Auckland";
const part = (date, options) => new Intl.DateTimeFormat("en-NZ", { timeZone: TIME_ZONE, ...options }).format(date);
const day = (date) => part(date, { weekday: "short", day: "numeric", month: "short" }).replace(",", "");

// "Sat 4 Apr", or "4 – 5 Apr" / "30 Apr – 2 May" for multi-day events.
export function formatCardDate(startsAt, endsAt, { year = false } = {}) {
  const start = new Date(startsAt);
  const end = new Date(endsAt);
  const dayMonth = (date) => part(date, { day: "numeric", month: "short" });
  let text;
  if (day(start) === day(end)) text = year ? dayMonth(start) : day(start);
  else if (part(start, { month: "short" }) === part(end, { month: "short" }))
    text = `${part(start, { day: "numeric" })} – ${dayMonth(end)}`;
  else text = `${dayMonth(start)} – ${dayMonth(end)}`;
  return year ? `${text} ${part(end, { year: "numeric" })}` : text;
}
