// Invented people and schools only. Stories are public, so test data must
// never contain a real student.

export const NOW = new Date("2026-11-25T00:00:00Z");

const image = (id, alt, extra = {}) => ({
  _type: "image",
  asset: { _type: "reference", _ref: `image-${id}-1200x800-jpg` },
  alt,
  ...extra,
});

const paragraph = (key, text) => ({
  _type: "block",
  _key: key,
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: `${key}s`, text, marks: [] }],
});

export const fullStory = {
  _id: "story-full",
  _type: "story",
  title: "Aroha built a rain gauge for her marae",
  slug: { _type: "slug", current: "aroha-rain-gauge" },
  summary: "A Year 12 student turned a weekend hackathon idea into a working sensor.",
  publishedAt: "2026-11-20T09:00:00Z",
  tags: ["hardware", "social-good"],
  school: "Fernvale College",
  region: "Canterbury",
  yearLevel: 12,
  signOff: true,
  coverImage: image("aaa111", "Aroha holding a small circuit board", {
    creditLine: "Photo: Fernvale College",
  }),
  body: [
    paragraph("p1", "It started with a leaking water tank."),
    {
      _type: "block",
      _key: "h1",
      style: "h2",
      markDefs: [],
      children: [{ _type: "span", _key: "h1s", text: "The build", marks: [] }],
    },
    {
      _type: "image",
      _key: "img1",
      asset: { _type: "reference", _ref: "image-bbb222-1200x800-jpg" },
      alt: "The rain gauge mounted on a fence post",
      caption: "Version two, mounted outside",
    },
  ],
};

export const tagOnlyStory = {
  _id: "story-tag-only",
  _type: "story",
  title: "Three friends shipped their first game",
  slug: { _type: "slug", current: "first-game" },
  summary: "A team game jam project that took second place.",
  publishedAt: "2026-10-01T09:00:00Z",
  tags: ["games-simulations"],
  signOff: true,
  body: [paragraph("p1", "None of them had used a game engine before.")],
};

export const middleStory = {
  _id: "story-middle",
  _type: "story",
  title: "Learning to code on a library computer",
  slug: { _type: "slug", current: "library-computer" },
  summary: "Two friends who taught themselves web development after school.",
  publishedAt: "2026-11-01T09:00:00Z",
  tags: ["web-app", "education"],
  school: "Kowhai High School and Totara Grammar",
  region: "Wellington",
  signOff: true,
  body: [paragraph("p1", "The library closed at five, so they worked fast.")],
};

export const draftStory = {
  ...fullStory,
  _id: "drafts.story-draft",
  title: "Unpublished draft story",
  slug: { _type: "slug", current: "unpublished-draft" },
};

export const futureStory = {
  ...tagOnlyStory,
  _id: "story-future",
  title: "Scheduled story for next year",
  slug: { _type: "slug", current: "scheduled-story" },
  publishedAt: "2027-01-15T09:00:00Z",
};

export const noSignOffStory = {
  ...tagOnlyStory,
  _id: "story-no-sign-off",
  title: "Story without a recorded sign-off",
  slug: { _type: "slug", current: "no-sign-off" },
  signOff: false,
};

export const noBodyStory = {
  _id: "story-no-body",
  _type: "story",
  title: "A story saved before its body was written",
  slug: { _type: "slug", current: "no-body" },
  summary: "Published with only a summary.",
  publishedAt: "2026-09-01T09:00:00Z",
  tags: ["education"],
  signOff: true,
};

export const emptyImageStory = {
  _id: "story-empty-image",
  _type: "story",
  title: "A story with an image block still waiting for its file",
  slug: { _type: "slug", current: "empty-image" },
  summary: "The image block was added but nothing was uploaded.",
  publishedAt: "2026-08-01T09:00:00Z",
  tags: ["hardware"],
  signOff: true,
  body: [
    paragraph("p1", "Text before the image."),
    { _type: "image", _key: "img1", alt: "" },
  ],
};

export const allDocuments = [
  tagOnlyStory,
  fullStory,
  middleStory,
  draftStory,
  futureStory,
  noSignOffStory,
  noBodyStory,
  emptyImageStory,
];
