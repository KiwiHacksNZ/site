import "./Nova.css";
import SquiggleLink from "../SquiggleLink";

const stats = [
  { value: "3", label: "cities" },
  { value: "300+", label: "high schoolers" },
  { value: "$0", label: "to take part" },
];

export default function Nova() {
  return (
    <section id="nova" className="nova">
      <h2 className="mono">But for Nova, we&apos;re going national.</h2>

      <dl className="nova-stats">
        {stats.map(({ value, label }) => (
          <div key={label} className="nova-stat">
            <dt>{value}</dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>

      <div className="nova-copy">
        <p>
          KiwiHacks Nova is a constellation of three hackathons across New
          Zealand: three cities, three weekends, three free 24-hour
          hackathons for high schoolers. A nova is a star that suddenly bursts
          bright, and that&apos;s the idea: light up Wellington, Christchurch,
          and Auckland with students building real things.
        </p>
        <p>
          You team up, you get 24 hours, and you ship. Mentors are around for the
          whole event and beginner-friendly workshops mean you don&apos;t need
          any prior experience to start. Food, drinks, and swag are all included,
          and every bit of it is free.
        </p>
      </div>

      <div className="nova-actions">
        <a
          className="nova-sign-up-link nova-primary"
          href="https://kiwihacks.fillout.com/nova"
          target="_blank"
          rel="noreferrer"
        >
          <b>Sign up</b>
        </a>
        <SquiggleLink
          href="https://nova.kiwihacks.org"
          target="_blank"
          rel="noreferrer"
        >
          View site &rarr;
        </SquiggleLink>
      </div>
    </section>
  );
}
