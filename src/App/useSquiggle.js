import { useEffect, useRef } from "react";
import { squigglePath, SQUIGGLE_HEIGHT } from "./squiggle";

// One ticker for every squiggle on the page, rather than a rAF loop each.
const subscribers = new Set();
let frame = null;
let previous = 0;

function tick(now) {
  const elapsed = previous ? Math.min((now - previous) / 1000, 0.1) : 0;
  previous = now;
  subscribers.forEach((advance) => advance(elapsed));
  frame = subscribers.size ? requestAnimationFrame(tick) : null;
}

function subscribe(advance) {
  subscribers.add(advance);
  if (!frame) {
    previous = 0;
    frame = requestAnimationFrame(tick);
  }

  return () => {
    subscribers.delete(advance);
    if (!subscribers.size && frame) {
      cancelAnimationFrame(frame);
      frame = null;
    }
  };
}

const PAN_SPEED = 11; // px/sec — slow enough to read as the line redrawing itself
const HOVER_SPEED = 34;

export function useSquiggle() {
  const link = useRef(null);
  const path = useRef(null);

  useEffect(() => {
    const linkNode = link.current;
    const pathNode = path.current;
    if (!linkNode || !pathNode) return;

    const seed = Math.floor(Math.random() * 1e9);
    let width = linkNode.offsetWidth;
    let offset = Math.random() * 500;
    let hovered = false;

    const draw = () =>
      pathNode.setAttribute("d", squigglePath({ width, offset, seed }));

    draw();

    // Matches the site's blanket rule of no animation on small screens or for
    // anyone asking for reduced motion — they get a still squiggle.
    const still = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 768px)",
    );

    const observer = new ResizeObserver(() => {
      if (Math.abs(linkNode.offsetWidth - width) < 1) return;
      width = linkNode.offsetWidth;
      draw();
    });
    observer.observe(linkNode);

    const enter = () => {
      hovered = true;
    };
    const leave = () => {
      hovered = false;
    };
    linkNode.addEventListener("pointerenter", enter);
    linkNode.addEventListener("pointerleave", leave);

    let unsubscribe = null;
    const sync = () => {
      unsubscribe?.();
      unsubscribe = still.matches
        ? null
        : subscribe((elapsed) => {
            offset += elapsed * (hovered ? HOVER_SPEED : PAN_SPEED);
            draw();
          });
    };
    sync();
    still.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      still.removeEventListener("change", sync);
      linkNode.removeEventListener("pointerenter", enter);
      linkNode.removeEventListener("pointerleave", leave);
      unsubscribe?.();
    };
  }, []);

  return { link, path, height: SQUIGGLE_HEIGHT };
}
