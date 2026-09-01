import "./Benefits.css";
import SquiggleLink from "../SquiggleLink";
import { FaDiscord, FaLaptopCode, FaShirt } from "react-icons/fa6";

const benefits = [
  {
    Icon: FaDiscord,
    title: "The Discord",
    body: "This is where KiwiHackers are in between events. Ask for help when you are stuck, show people what you are making, find a team, and hear about new events first.",
    href: "/discord",
    linkText: "Join the Discord",
  },
  {
    Icon: FaLaptopCode,
    title: "Workshops and mentors",
    body: "Total beginners are welcome, and a lot of KiwiHackers write their first line of code at an event. We run workshops and have mentors on hand all weekend. Designers, artists, and storytellers fit right in too.",
  },
  {
    Icon: FaShirt,
    title: "Free entry, food, and swag",
    body: "Food, mentors, workshops, and swag are all covered by our sponsors. You bring a laptop and charger, a water bottle, and a sleeping bag. Cost is never a barrier at KiwiHacks.",
  },
];

export default function Benefits() {
  return (
    <section id="community" className="benefits">
      <h2 className="mono">Being a KiwiHacker</h2>
      <p className="benefits-lede">
        KiwiHacks is not only the events. Here is what you get the rest of the
        year.
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
