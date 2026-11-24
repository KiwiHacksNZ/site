import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeSanityClient } from "./support/fakeSanity.js";
import { renderPage } from "./support/renderPage.js";
import { NOW, allDocuments } from "./support/fixtures.js";
import StoryPage from "../src/pages/showcase/stories/[slug].astro";

const sanity = vi.hoisted(() => ({ client: null }));
vi.mock("../src/sanity/client", () => ({
  get sanityClient() {
    return sanity.client;
  },
}));

const renderStory = (slug) =>
  renderPage(StoryPage, { path: `/showcase/stories/${slug}`, params: { slug } });

describe("story page", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_SEO", "true");
    sanity.client = createFakeSanityClient(allDocuments, { now: NOW });
  });

  it("renders a published story in full", async () => {
    const { status, html } = await renderStory("aroha-rain-gauge");

    expect(status).toBe(200);
    expect(html).toMatch(/<h1[^>]*>Aroha built a rain gauge for her marae<\/h1>/);
    expect(html).toContain("<p>It started with a leaking water tank.</p>");
    expect(html).toContain("<h2>The build</h2>");
  });

  it("shows the same tags and meta line as the card, plus images with alt text and captions", async () => {
    const { html } = await renderStory("aroha-rain-gauge");

    expect(html).toContain("Hardware");
    expect(html).toContain("Social good");
    expect(html).toContain("Year 12 · Fernvale College · Canterbury");
    expect(html).toMatch(/<img[^>]+alt="Aroha holding a small circuit board"/);
    expect(html).toContain("Photo: Fernvale College");
    expect(html).toMatch(/<img[^>]+alt="The rain gauge mounted on a fence post"/);
    expect(html).toContain("Version two, mounted outside");
  });

  it("takes its page title and description from the story", async () => {
    const { html } = await renderStory("aroha-rain-gauge");

    expect(html).toContain("<title>Aroha built a rain gauge for her marae | KiwiHacks</title>");
    expect(html).toContain(
      '<meta name="description" content="A Year 12 student turned a weekend hackathon idea into a working sensor.">',
    );
    expect(html).toContain(
      '<link rel="canonical" href="https://kiwihacks.org/showcase/stories/aroha-rain-gauge">',
    );
  });

  it.each([
    ["an unknown slug", "does-not-exist"],
    ["a draft", "unpublished-draft"],
    ["a story dated in the future", "scheduled-story"],
  ])("returns the site's 404 page for %s", async (_label, slug) => {
    const { status, html } = await renderStory(slug);

    expect(status).toBe(404);
    expect(html).toContain("Error: Page Not Found");
    expect(html).toContain('<meta name="robots" content="noindex,follow">');
  });

  it("returns the site's 404 page for a story whose sign-off is not recorded", async () => {
    const { status } = await renderStory("no-sign-off");

    expect(status).toBe(404);
  });

  it("renders a story that has no body yet", async () => {
    const { status, html } = await renderStory("no-body");

    expect(status).toBe(200);
    expect(html).toContain("A story saved before its body was written");
  });

  it("skips a body image that has no uploaded file", async () => {
    const { status, html } = await renderStory("empty-image");

    expect(status).toBe(200);
    const body = html.slice(html.indexOf('class="story-body"'), html.indexOf("</main>"));
    expect(body).toContain("Text before the image.");
    expect(body).not.toContain("<img");
  });

  it("returns the 404 page when Sanity is not configured", async () => {
    sanity.client = null;

    const { status } = await renderStory("aroha-rain-gauge");

    expect(status).toBe(404);
  });

  it("links the navbar and footer to the right pages from a story", async () => {
    const { html } = await renderStory("aroha-rain-gauge");

    // Relative links like ../about resolve to /showcase/about from here.
    expect(html).not.toMatch(/href="\.\.\//);
    for (const path of ["/", "/about", "/#faq", "/showcase", "/team", "/contact", "/privacy-policy"]) {
      expect(html).toContain(`href="${path}"`);
    }
  });
});
