import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeSanityClient } from "./support/fakeSanity.js";
import { renderPage } from "./support/renderPage.js";
import { NOW, allDocuments } from "./support/fixtures.js";
import StoriesPage from "../src/pages/showcase/stories/index.astro";

const sanity = vi.hoisted(() => ({ client: null }));
vi.mock("../src/sanity/client", () => ({
  get sanityClient() {
    return sanity.client;
  },
}));

const renderStories = () => renderPage(StoriesPage, { path: "/showcase/stories" });

// The HTML of the one card whose title matches, so assertions stay on that card.
function cardFor(html, title) {
  const card = html
    .split("<article")
    .slice(1)
    .find((chunk) => chunk.includes(title));
  if (!card) throw new Error(`No card for "${title}"`);
  return card.slice(0, card.indexOf("</article>"));
}

describe("stories page", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_SEO", "true");
    sanity.client = createFakeSanityClient(allDocuments, { now: NOW });
  });

  it("lists published stories newest first", async () => {
    const { status, html } = await renderStories();

    expect(status).toBe(200);
    const newest = html.indexOf("Aroha built a rain gauge for her marae");
    const middle = html.indexOf("Learning to code on a library computer");
    const oldest = html.indexOf("Three friends shipped their first game");
    expect(newest).toBeGreaterThan(-1);
    expect(middle).toBeGreaterThan(newest);
    expect(oldest).toBeGreaterThan(middle);
  });

  it("leaves out drafts and stories dated in the future", async () => {
    const { html } = await renderStories();

    expect(html).not.toContain("Unpublished draft story");
    expect(html).not.toContain("Scheduled story for next year");
  });

  it("leaves out a story whose sign-off is not recorded", async () => {
    const { html } = await renderStories();

    expect(html).not.toContain("Story without a recorded sign-off");
  });

  it("links each card to its story", async () => {
    const { html } = await renderStories();
    const card = cardFor(html, "Aroha built a rain gauge for her marae");

    expect(card).toContain('href="/showcase/stories/aroha-rain-gauge"');
  });

  it("shows a story's tags and its year level, school and region", async () => {
    const { html } = await renderStories();
    const card = cardFor(html, "Aroha built a rain gauge for her marae");

    expect(card).toContain("Hardware");
    expect(card).toContain("Social good");
    expect(card).toContain("Year 12 · Fernvale College · Canterbury");
  });

  it("skips missing details without empty labels or stray separators", async () => {
    const { html } = await renderStories();
    const tagOnly = cardFor(html, "Three friends shipped their first game");
    const noYear = cardFor(html, "Learning to code on a library computer");

    expect(tagOnly).toContain("Games and simulations");
    expect(tagOnly).not.toContain("·");
    expect(tagOnly).not.toContain("Year ");
    expect(noYear).toContain("Kowhai High School and Totara Grammar · Wellington<");
    expect(noYear).not.toContain("Year ");
  });

  it("shows a cover image with its alt text, and no placeholder when there is none", async () => {
    const { html } = await renderStories();
    const withCover = cardFor(html, "Aroha built a rain gauge for her marae");
    const withoutCover = cardFor(html, "Three friends shipped their first game");

    expect(withCover).toMatch(/<img[^>]+alt="Aroha holding a small circuit board"/);
    expect(withCover).toContain("cdn.sanity.io/images/test1234/test/aaa111-1200x800.jpg");
    expect(withoutCover).not.toContain("<img");
  });

  it("has its own title, description and canonical address", async () => {
    const { html } = await renderStories();

    expect(html).toContain("<title>Stories | KiwiHacks</title>");
    expect(html).toMatch(/<meta name="description" content="Stories of New Zealand high schoolers/);
    expect(html).toContain('<link rel="canonical" href="https://kiwihacks.org/showcase/stories">');
  });

  it("shows an empty state when Sanity is not configured", async () => {
    sanity.client = null;

    const { status, html } = await renderStories();

    expect(status).toBe(200);
    expect(html).toContain("No stories yet");
    expect(html).not.toContain("<article");
  });
});
