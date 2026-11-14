import "./WhatsNext.css";
import SquiggleLink from "../SquiggleLink";

const items = [
  {
    title: "The next hackathon",
    body: "We're planning our next free hackathons now. Dates and cities go to the Discord first, so join to hear before anyone else.",
    href: "/discord",
    linkText: "Join the Discord",
  },
  {
    title: "Monthly lock-ins",
    body: "Until then, come into the office once a month from 10am to 4pm to build projects with other KiwiHackers. Free pizza. Invites go out in the Discord.",
    href: "#community",
    linkText: "More about the community",
  },
  {
    title: "Partner with us",
    body: "Sponsors, schools, and mentors make every event free for students. If you'd like to help with the next one, get in touch.",
    href: "/contact",
    linkText: "Contact the team",
  },
];

export default function WhatsNext() {
  return (
    <section id="whats-next" className="whats-next">
      <h2 className="mono">What&apos;s next</h2>
      <p className="whats-next-lede">
        Our last event, KiwiHacks Nova, wrapped up in October 2026. Here&apos;s
        what&apos;s coming up.
      </p>

      <ul className="whats-next-grid">
        {items.map((item) => (
          <li key={item.title} className="whats-next-card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <SquiggleLink className="whats-next-link" href={item.href}>
              {item.linkText} &rarr;
            </SquiggleLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
