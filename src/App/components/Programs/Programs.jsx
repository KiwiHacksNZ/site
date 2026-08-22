import "./Programs.css";

const programs = [
  {
    name: "KiwiHacks Nova",
    tagline: "Our biggest hackathon yet, in three cities at once.",
    description:
      "A free hackathon for high schoolers running in Auckland, Wellington, and Christchurch. Build a project, meet people who like the same weird things you do, and go home with swag.",
    status: "Sign-ups open",
    when: "Wellington 28–29 Sep · Christchurch 2–3 Oct · Auckland 10–11 Oct",
    href: "https://nova.kiwihacks.org",
    cta: "Start now",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="programs">
      <div
        className="tape-divider-container"
        style={{ backgroundImage: "url(/assets/tape.png)" }}
        aria-hidden="true"
      ></div>
      <h2>Everything we&apos;re running right now.</h2>
      <p className="programs-lede">
        Every one of these is free and open to any high schooler in New Zealand.
      </p>

      <ul className="program-grid">
        {programs.map((program) => (
          <li key={program.name} className="program-card">
            <span className="mono program-status">{program.status}</span>
            <h3>{program.name}</h3>
            <p className="program-tagline">{program.tagline}</p>
            <p className="program-description">{program.description}</p>
            <p className="mono program-when">{program.when}</p>
            <a
              className="program-cta"
              href={program.href}
              target="_blank"
              rel="noreferrer"
            >
              <b>{program.cta}</b>
            </a>
          </li>
        ))}

        <li className="program-card program-card-quiet">
          <span className="mono program-status">Next up</span>
          <h3>Whatever we dream up next</h3>
          <p className="program-description">
            We announce new hackathons, workshops, and side quests in our
            Discord first. Hang out there and you&apos;ll hear about them before
            anyone else.
          </p>
          <a className="program-cta program-cta-quiet" href="/discord">
            <b>Join the Discord</b>
          </a>
        </li>
      </ul>
    </section>
  );
}
