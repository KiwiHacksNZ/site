import "./CTA.css";

export default function CTA() {
  return (
    <section id="cta" className="cta">
      <p className="boldp">Ready?</p>
      <p className="lastp">Get started with building something real.</p>
      <div className="cta-actions">
        <a href="/discord" className="nova-sign-up-link nova-last-button">
          Join KiwiHacks!
        </a>
        <a
          href="#programs"
          className="cta-secondary"
        >
          Explore current events &rarr;
        </a>
      </div>
      <p className="mono cta-fineprint">
        Free, forever. Open to any high schooler in NZ, 13&ndash;18.
      </p>
    </section>
  );
}
