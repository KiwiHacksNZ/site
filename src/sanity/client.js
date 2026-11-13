import { createClient } from "@sanity/client";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";

// createClient throws without a projectId. Astro's SSR bundle evaluates this
// at server start, so an unset variable would 500 every route on the site, not
// just the showcase - hence the null instead of letting it throw.
export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion: "2026-08-02", useCdn: true })
  : null;

const token = import.meta.env.SANITY_WRITE_TOKEN;

// Writes only to the private submissions dataset; approving one in the Studio
// is what copies it into the public dataset.
export const submissionsClient =
  projectId && token
    ? createClient({
        projectId,
        dataset: import.meta.env.PUBLIC_SANITY_SUBMISSIONS_DATASET || "submissions",
        apiVersion: "2026-08-02",
        useCdn: false,
        token,
      })
    : null;
