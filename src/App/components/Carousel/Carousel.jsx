import { useCallback, useEffect, useRef, useState } from "react";
import "./Carousel.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const AUTOPLAY_MS = 6000;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Carousel({ photos, label = "Photos from our events" }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index) => {
      const track = trackRef.current;
      if (!track) return;

      const next = (index + photos.length) % photos.length;
      track.scrollTo({
        left: track.children[next].offsetLeft,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    },
    [photos.length],
  );

  // Nobody who asked for reduced motion wants photos advancing at them; they
  // still get the arrows and dots.
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;

    const timer = setInterval(() => goTo(active + 1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [active, paused, goTo]);

  // The track is a snap-scroll container, so which photo is showing comes from
  // its scroll position - that keeps swipe, arrows, and dots all in agreement.
  const onScroll = () => {
    const track = trackRef.current;
    if (track) setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <div
      className="carousel"
      role="group"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel-track" ref={trackRef} onScroll={onScroll}>
        {photos.map((photo, index) => (
          <div className="carousel-slide" key={photo.src}>
            <img
              src={photo.src}
              alt={photo.alt}
              loading={index === 0 ? "eager" : "lazy"}
              draggable="false"
            />
          </div>
        ))}
      </div>

      <p className="mono carousel-counter">
        {active + 1} / {photos.length}
      </p>

      <button
        type="button"
        className="carousel-arrow carousel-arrow-prev"
        onClick={() => goTo(active - 1)}
        aria-label="Previous photo"
      >
        <FaChevronLeft aria-hidden="true" />
      </button>
      <button
        type="button"
        className="carousel-arrow carousel-arrow-next"
        onClick={() => goTo(active + 1)}
        aria-label="Next photo"
      >
        <FaChevronRight aria-hidden="true" />
      </button>

      <div className="carousel-dots">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            className={`carousel-dot${index === active ? " is-active" : ""}`}
            onClick={() => goTo(index)}
            aria-label={`Go to photo ${index + 1}`}
            aria-current={index === active}
          />
        ))}
      </div>
    </div>
  );
}
