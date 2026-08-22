import "./About.css";

const stats = [
  { value: "3", label: "cities running events" },
  { value: "100+", label: "teenage participants" },
  { value: "100%", label: "run by high schoolers" },
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="text">
        <h2>Run by teens, for teens.</h2>
        <p className="about-text">
          KiwiHacks is New Zealand&apos;s first high school hackathon club. Every
          site (yes, even this one), every piece of art, every event, and
          everything else was made by Kiwi high schoolers &mdash; because a club
          for high schoolers should be run by them.
        </p>
        <p className="about-text">
          Our events are a chance to meet new people, learn some new skills, and
          build something you&apos;re actually proud of &mdash; an app, a game, a
          website, a robot, or a chair that runs away from you.
        </p>
        <p className="about-text">
          We&apos;ve done this before. Our organisers ran hackathons like
          Scrapyard and Counterspell in Auckland before KiwiHacks existed, and
          KiwiHacks now runs events across the country.
        </p>
        <p className="about-text">
          No matter your skill level, you&apos;re welcome. Just sign up, show up,
          and give it a go.
        </p>

        <dl className="about-stats">
          {stats.map(({ value, label }) => (
            <div key={label} className="about-stat">
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <img
        className="example"
        src="/assets/example.jpg"
        alt="Students hacking at previous events"
        loading="lazy"
      />
    </section>
  );
}
