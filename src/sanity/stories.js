import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

// A story is live only once it has a slug, its sign-off is recorded, its
// published date has arrived, and it is not a draft. Studio already blocks
// publishing without sign-off; checking it here too means a story created any
// other way (API, import) still can't reach the site. The API version already
// hides drafts; the explicit check keeps that rule visible and testable.
const LIVE_STORY = `_type == "story" && defined(slug.current) && signOff == true && publishedAt <= now() && !(_id in path("drafts.**"))`;

// The fields a story card needs; the story page adds its body.
const CARD_FIELDS = `
  title,
  "slug": slug.current,
  summary,
  tags,
  school,
  region,
  yearLevel,
  coverImage
`;

function toImage(builder, image, width) {
  if (!image?.asset) return null;
  return {
    url: builder.image(image).width(width).fit("max").auto("format").url(),
    alt: image.alt ?? "",
  };
}

// Every live story, newest first, shaped for the story cards. Returns an empty
// list when Sanity is not configured, so the page shows its empty state.
export async function fetchStories() {
  const client = sanityClient;
  if (!client) return [];

  const stories = await client.fetch(
    `*[${LIVE_STORY}] | order(publishedAt desc){${CARD_FIELDS}}`,
  );

  const builder = imageUrlBuilder(client);
  return stories.map(({ coverImage, ...story }) => ({
    ...story,
    cover: toImage(builder, coverImage, 800),
  }));
}

// One live story by slug, shaped for the story page, or null when there is
// no such live story (unknown, draft, future-dated, no sign-off, or Sanity not
// configured).
export async function fetchStory(slug) {
  const client = sanityClient;
  if (!client) return null;

  const story = await client.fetch(
    `*[${LIVE_STORY} && slug.current == $slug][0]{${CARD_FIELDS}, body}`,
    { slug },
  );
  if (!story) return null;

  const builder = imageUrlBuilder(client);
  const { coverImage, body, ...rest } = story;
  const cover = toImage(builder, coverImage, 1600);

  return {
    ...rest,
    cover: cover ? { ...cover, creditLine: coverImage.creditLine ?? null } : null,
    // GROQ returns null, not undefined, for a story saved without a body.
    // Image blocks still waiting for an upload are dropped, not rendered empty.
    body: (body ?? []).flatMap((block) => {
      if (block._type !== "image") return [block];
      const image = toImage(builder, block, 1200);
      return image ? [{ ...block, ...image, caption: block.caption ?? null }] : [];
    }),
  };
}
