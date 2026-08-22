import "./CTA.css";
import SquiggleLink from "../SquiggleLink";

export default function CTA() {
  return (
    <section id="cta" className="cta">
      <p className="boldp">Ready?</p>
      <p className="lastp">Get started with building something real.</p>
      <div className="cta-actions">
        <a href="/discord" className="nova-sign-up-link nova-last-button">
          Join KiwiHacks!
        </a>
        <SquiggleLink href="#programs" className="cta-secondary">
          Explore current events &rarr;
        </SquiggleLink>
      </div>
      <p className="mono cta-fineprint">
        Free, forever. Open to any high schooler in NZ, 13&ndash;18.
      </p>
    </section>
  );
}
