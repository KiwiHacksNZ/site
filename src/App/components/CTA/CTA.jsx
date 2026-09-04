import "./CTA.css";
import SquiggleLink from "../SquiggleLink";

export default function CTA() {
  return (
    <section id="cta" className="cta">
      <p className="boldp">Come to the next one.</p>
      <p className="lastp">Sign up, show up, and give it a go.</p>
      <div className="cta-actions">
        <a href="/discord" className="nova-sign-up-link nova-last-button">
          Join the Discord
        </a>
        <SquiggleLink href="#nova" className="cta-secondary">
          See what&apos;s on &rarr;
        </SquiggleLink>
      </div>
      <p className="mono cta-fineprint">
        Free to join. Open to any high school student in New Zealand, years 9 to
        13.
      </p>
    </section>
  );
}
