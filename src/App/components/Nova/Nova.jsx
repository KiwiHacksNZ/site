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
      <h2 className="mono">KiwiHacks Nova</h2>
      <p className="nova-lede">
        Three free 24-hour hackathons for high school students, in three cities.
      </p>

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
          Zealand. Three cities, three weekends, three free 24-hour hackathons
          for high schoolers. A nova is a star that suddenly bursts bright, and
          that is the idea: light up Wellington, Christchurch, and Auckland with
          students building real things.
        </p>
        <p>
          You team up, you get 24 hours, and you finish something. Mentors will
          be around for the entire event, and beginner-friendly workshops mean
          you do not need any prior experience to get started. Food, drinks, and
          swag are all included, and everything is completely free.
        </p>
      </div>

      <div className="nova-actions">
        <a
          className="nova-sign-up-link nova-primary"
          href="https://kiwihacks.fillout.com/nova"
          target="_blank"
          rel="noreferrer"
        >
          <b>Sign up for Nova</b>
        </a>
        <SquiggleLink
          href="https://nova.kiwihacks.org"
          target="_blank"
          rel="noreferrer"
        >
          Go to the Nova site &rarr;
        </SquiggleLink>
      </div>
    </section>
  );
}
