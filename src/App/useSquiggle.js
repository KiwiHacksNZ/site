import { useEffect, useRef } from "react";
import { randomSquiggle, squiggleUri } from "./squiggle";

// Pixels per second, so the hover slide reads at one speed whatever width the
// tile happened to come out at.
const SLIDE_SPEED = 55;

// Returns a ref to attach to the link. The path is written straight onto the
// node rather than rendered as a style prop: randomising during SSR would
// produce markup the client can't hydrate.
export function useSquiggle({ light = false } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const squiggle = randomSquiggle();
    const vars = {
      "--squiggle": squiggleUri(
        squiggle,
        light ? "#ffffff" : "#76b070",
        light ? 0.55 : 1,
      ),
      "--squiggle-hover": squiggleUri(squiggle, light ? "#ffffff" : "#2e522b"),
      "--squiggle-size": `${squiggle.width}px ${squiggle.height}px`,
      "--squiggle-shift": `${squiggle.width}px`,
      "--squiggle-duration": `${(squiggle.width / SLIDE_SPEED).toFixed(2)}s`,
    };

    Object.entries(vars).forEach(([name, value]) =>
      node.style.setProperty(name, value),
    );
  }, [light]);

  return ref;
}
