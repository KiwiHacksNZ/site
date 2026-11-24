import { useEffect, useRef } from "react";
import EventCard from "./EventCard";

// More cards than this and the grid becomes a sideways row.
export const GRID_MAX = 3;
const SPEED = 0.03; // px per ms when drifting
const IDLE_MS = 3000;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function EventList({ events, label, reverse = false }) {
  const trackRef = useRef(null);
  const asRow = events.length > GRID_MAX;

  // Turntable: drift slowly while nobody is touching it, leftwards or (reverse)
  // rightwards. The cards are rendered twice, so jumping by half the width
  // loops without a visible seam.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    let frame;
    let last = performance.now();
    let pausedUntil = 0;
    let pos = track.scrollLeft;
    const pause = () => {
      pausedUntil = performance.now() + IDLE_MS;
    };

    const step = (now) => {
      const busy = now < pausedUntil || track.matches(":hover") || track.contains(document.activeElement);
      // Anything else that scrolled the row (a scrollbar, a jump to a focused
      // card) wins over our position.
      if (busy || Math.abs(track.scrollLeft - pos) > 1) {
        pos = track.scrollLeft;
      } else {
        const half = track.scrollWidth / 2;
        const moved = pos + (now - last) * SPEED * (reverse ? -1 : 1);
        pos = ((moved % half) + half) % half;
        track.scrollLeft = pos;
      }
      last = now;
      frame = requestAnimationFrame(step);
    };

    const events = ["pointerdown", "wheel", "touchstart", "keydown"];
    events.forEach((name) => track.addEventListener(name, pause, { passive: true }));
    frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      events.forEach((name) => track.removeEventListener(name, pause));
    };
  }, [reverse]);

  if (!asRow) {
    return (
      <ul className="project-grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="events-row" ref={trackRef} aria-label={label}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
      {events.map((event) => (
        <EventCard key={`${event.id}-copy`} event={event} hidden />
      ))}
    </ul>
  );
}
