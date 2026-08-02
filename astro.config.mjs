import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import sanity from "@sanity/astro";
import { loadEnv } from "vite";

// astro.config runs before Astro loads .env, so read it explicitly.
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  "",
);

// The integration builds a Sanity client at server start, which throws without
// a projectId and 500s every route. Skip it (and /studio) when unconfigured so
// a missing variable can only cost an empty showcase, not the whole site.
const sanityIntegrations = PUBLIC_SANITY_PROJECT_ID
  ? [
      sanity({
        projectId: PUBLIC_SANITY_PROJECT_ID,
        dataset: PUBLIC_SANITY_DATASET || "production",
        apiVersion: "2026-08-02",
        useCdn: true,
        studioBasePath: "/studio",
      }),
    ]
  : [];

// https://astro.build/config
export default defineConfig({
  integrations: [...sanityIntegrations, react()],
  output: "server",
  adapter: vercel(),
  redirects: {
    "/discord": "https://discord.gg/SNdNUQ4Vp7",
    "/chat": "https://discord.gg/SNdNUQ4Vp7",
    "/community": "https://discord.gg/SNdNUQ4Vp7",
    "/dc": "https://discord.gg/SNdNUQ4Vp7",
    "/github": "https://github.com/N1k0s1/kiwihacks",
    "/code": "https://github.com/N1k0s1/kiwihacks",
    "/repo": "https://github.com/N1k0s1/kiwihacks",
    "/register": "https://kiwihacks.fillout.com/nova",
    "/countmein": "https://kiwihacks.fillout.com/nova",
    "/signup": "https://kiwihacks.fillout.com/nova",
    "/parents-guide":
      "https://docs.google.com/document/d/14HMPfRkPQrFVf1E87cvsUqguILbtwoifEJ5hYUwhgRM/edit",
    "/parentsguide":
      "https://docs.google.com/document/d/14HMPfRkPQrFVf1E87cvsUqguILbtwoifEJ5hYUwhgRM/edit",
    "/parents":
      "https://docs.google.com/document/d/14HMPfRkPQrFVf1E87cvsUqguILbtwoifEJ5hYUwhgRM/edit",
    "/coc": "/code-of-conduct",
    "/conduct": "/code-of-conduct",
  },
});
