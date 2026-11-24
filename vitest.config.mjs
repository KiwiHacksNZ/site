import { getViteConfig } from "astro/config";

// Runs tests through Astro's own Vite setup, so .astro pages and React
// components compile exactly as they do on the site.
export default getViteConfig({
  test: {
    include: ["tests/**/*.test.js"],
  },
});
