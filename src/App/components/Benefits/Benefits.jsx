import "./Benefits.css";
import SquiggleLink from "../SquiggleLink";
import { FaDiscord, FaLaptopCode, FaShirt, FaTrophy } from "react-icons/fa6";

const benefits = [
  {
    Icon: FaDiscord,
    title: "The Discord",
    body: "Where KiwiHacks actually lives between events. Share what you're building, get unstuck, find teammates, and find out about new events first.",
    href: "/discord",
    linkText: "Join the Discord",
  },
  {
    Icon: FaLaptopCode,
    title: "Workshops for beginners",
    body: "Never written a line of code? Every hackathon runs free workshops on the basics, and there are always mentors around. Everyone finishes a project.",
  },
  {
    Icon: FaTrophy,
    title: "A place to show it off",
    body: "Projects built at our events go up on the showcase, so what you make at a weekend hackathon doesn't disappear when the weekend ends.",
    href: "/showcase",
    linkText: "See the showcase",
  },
  {
    Icon: FaShirt,
    title: "Free swag, food, and entry",
    body: "Our partners cover the lot. Stickers, shirts, meals, snacks, and a venue — you bring a laptop and something to sleep on.",
  },
];

export default function Benefits() {
  return (
    <section id="community" className="benefits">
      <h2>Everything that comes with joining.</h2>
      <p className="benefits-lede">
        KiwiHacks isn&apos;t just the events &mdash; here&apos;s what you get as
        part of the club.
      </p>

      <ul className="benefit-grid">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="benefit-card">
            <benefit.Icon className="benefit-icon" aria-hidden="true" />
            <h3>{benefit.title}</h3>
            <p>{benefit.body}</p>
            {benefit.href ? (
              <SquiggleLink href={benefit.href} className="benefit-link">
                {benefit.linkText} &rarr;
              </SquiggleLink>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
