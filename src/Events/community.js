import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "../sanity/client";

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function imageUrl(image, width) {
  if (!builder || !image) return null;
  try {
    return builder.image(image).width(width).fit("max").auto("format").url();
  } catch {
    return null;
  }
}

const FIELDS = `title, "slug": slug.current, eventType, format, city, startsAt, endsAt, venue, audience, cost,
  signupUrl, websiteUrl, summary, about, headerImage, photos, organiser, logo`;

const dated = (value) => !Number.isNaN(+new Date(value));

// A document missing its banner or dates is skipped. One bad record must not 500 the events page.
const listable = (event) =>
  event?.title &&
  event.slug &&
  event.organiser &&
  event.summary &&
  event.city &&
  dated(event.startsAt) &&
  dated(event.endsAt) &&
  imageUrl(event.headerImage, 600);

async function fetchEvents(query, params) {
  if (!sanityClient) return [];
  try {
    const rows = await sanityClient.fetch(query, params);
    return Array.isArray(rows) ? rows : [];
  } catch (error) {
    console.error("Community events failed", error);
    return [];
  }
}

export async function upcomingCommunityEvents() {
  const events = await fetchEvents(
    `*[_type == "communityEvent" && endsAt >= now()] | order(startsAt asc){${FIELDS}}`,
  );
  return events.filter(listable);
}

export async function communityEvent(slug) {
  if (!sanityClient) return null;
  try {
    const event = await sanityClient.fetch(
      `*[_type == "communityEvent" && slug.current == $slug][0]{${FIELDS}}`,
      { slug },
    );
    if (!listable(event) || !event.about) return null;
    return event;
  } catch (error) {
    console.error("Community events failed", error);
    return null;
  }
}

export async function communitySitemapEntries() {
  const events = await fetchEvents(
    `*[_type == "communityEvent" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
  );
  return events.filter((event) => event.slug);
}
