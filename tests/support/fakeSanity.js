import { evaluate, parse } from "groq-js";

// Stands in for the Sanity client at the one seam the pages depend on. It runs
// the page's real GROQ query over in-memory documents with groq-js, Sanity's
// own GROQ evaluator, so the query's filtering and ordering are exercised.
// `now` fixes what GROQ's now() returns, so "future-dated" is deterministic.
export function createFakeSanityClient(documents, { now }) {
  return {
    config: () => ({ projectId: "test1234", dataset: "test" }),
    async fetch(query, params = {}) {
      const tree = parse(query, { params });
      const result = await evaluate(tree, {
        dataset: documents,
        params,
        timestamp: now,
      });
      return result.get();
    },
  };
}
