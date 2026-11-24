// Shared by the Studio schema and the site, so a tag's stored value and its
// display title can never drift apart. Values are stable: rename a title
// freely, but never change a value once stories use it.
export const STORY_TAGS = [
  { title: "Web app", value: "web-app" },
  { title: "Mobile app", value: "mobile-app" },
  { title: "Desktop app", value: "desktop-app" },
  { title: "Hardware", value: "hardware" },
  { title: "3D and XR", value: "3d-xr" },
  { title: "Games and simulations", value: "games-simulations" },
  { title: "AI and ML", value: "ai-ml" },
  { title: "Fintech", value: "fintech" },
  { title: "Data and visualisation", value: "data-viz" },
  { title: "Education", value: "education" },
  { title: "Tools and utilities", value: "tools-utilities" },
  { title: "Community and leadership", value: "community-leadership" },
  { title: "Social good", value: "social-good" },
  { title: "Cybersecurity", value: "cybersecurity" },
];

export const NZ_REGIONS = [
  "Northland",
  "Auckland",
  "Waikato",
  "Bay of Plenty",
  "Gisborne",
  "Hawke's Bay",
  "Taranaki",
  "Manawatū-Whanganui",
  "Wellington",
  "Tasman",
  "Nelson",
  "Marlborough",
  "West Coast",
  "Canterbury",
  "Otago",
  "Southland",
];

const TAG_TITLES = new Map(STORY_TAGS.map((tag) => [tag.value, tag.title]));

export function tagTitle(value) {
  return TAG_TITLES.get(value) ?? value;
}
