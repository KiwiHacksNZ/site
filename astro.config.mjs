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
      "https://docs.google.com/document/d/1ck6-ESzkWb7PadIQX_ifBKSJMPxpNK-LlxT3_3YLtvk/edit",
    "/parentsguide":
      "https://docs.google.com/document/d/1ck6-ESzkWb7PadIQX_ifBKSJMPxpNK-LlxT3_3YLtvk/edit",
    "/parents":
      "https://docs.google.com/document/d/1ck6-ESzkWb7PadIQX_ifBKSJMPxpNK-LlxT3_3YLtvk/edit",
    "/safeguarding-policy": "/safeguarding",
    "/child-safety": "/safeguarding",
    "/coc": "/code-of-conduct",
    "/conduct": "/code-of-conduct",
    "/privacy": "/privacy-policy",
    "/nova-akl-mentors-sheet":
      "https://drive.google.com/file/d/1josXmaASoc66Zbrc5FZvuFxWoiReDWlQ/view?usp=drive_link",
    "/nova-akl-mentors": "/nova-akl-mentors-sheet",
    "/nova-akl-attendees-sheet":
      "https://drive.google.com/file/d/1aR_0QKX7U5rO029tFq03zywKhk7X_L3O/view?usp=drive_link",
    "/nova-akl-attendees": "/nova-akl-attendees-sheet",
    "/nova-wlg-mentors-sheet":
      "https://drive.google.com/file/d/1SXgWNfE91MndE6r3ANQz1OlFKgnS3tI_/view?usp=drive_link",
    "/nova-wlg-mentors": "/nova-wlg-mentors-sheet",
    "/nova-wlg-attendees-sheet":
      "https://drive.google.com/file/d/1uWC1D_Nc9Xe-Zymf0akAaVKxyMEnyJ7k/view?usp=drive_link",
    "/nova-wlg-attendees": "/nova-wlg-attendees-sheet",
    "/nova-chch-mentors-sheet":
      "https://drive.google.com/file/d/1S4u6tw085OXozlxGrRvdQG9zvxkuVTUJ/view?usp=sharing",
    "/nova-chch-mentors": "/nova-chch-mentors-sheet",
    "/nova-chch-attendees-sheet":
      "https://drive.google.com/file/d/1e0_QPnEppkqR2qsapVLl8loRBzbgcyFQ/view?usp=sharing",
    "/nova-chch-attendees": "/nova-chch-attendees-sheet",
  },
});
