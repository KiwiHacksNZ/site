import "./Benefits.css";
import SquiggleLink from "../SquiggleLink";
import { FaDiscord, FaNoteSticky, FaPizzaSlice } from "react-icons/fa6";

const benefits = [
  {
    Icon: FaDiscord,
    title: "The Discord",
    body: "This is where KiwiHackers are in between events. Ask for help when you are stuck, show people what you are making, find a team, and hear about new events first.",
    href: "/discord",
    linkText: "Join the Discord",
  },
  {
    Icon: FaNoteSticky,
    title: "Free stickers",
    body: (
      <>
        Ship something in the <a href="/discord">Discord</a> and we will mail you
        KiwiHacks stickers, anywhere in New Zealand. Post a project with a
        screenshot and a link, fill in the short form the bot sends you, and they
        turn up in your letterbox.
      </>
    ),
  },
  {
    Icon: FaPizzaSlice,
    title: "Community lock-ins",
    body: (
      <>
        Once a month, come into the office from 10am to 4pm to build projects,
        meet up with your friends, and have fun together. Free pizza. Invites go
        out in the <a href="/discord">Discord</a>.
      </>
    ),
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
            {benefit.body ? <p>{benefit.body}</p> : null}
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
