import "./About.css";
import Carousel from "../Carousel/Carousel";
import SquiggleLink from "../SquiggleLink";

const photos = [
  { src: "/assets/gallery/DSCF3841.jpg", alt: "Students working together at a KiwiHacks event" },
  { src: "/assets/gallery/kh26-group.jpg", alt: "Everyone at KiwiHacks 2026 together for the group photo" },
  { src: "/assets/gallery/DSCF2200.jpg", alt: "High schoolers deep in a project at KiwiHacks" },
  { src: "/assets/gallery/DSCF3768.jpg", alt: "Students showing off what they built" },
  { src: "/assets/gallery/DSCF3771.jpg", alt: "Soldering and tinkering at a KiwiHacks event" },
  { src: "/assets/gallery/DSCF7194.jpg", alt: "The KiwiHacks crew mid-hackathon" },
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="text">
        <h2 className="mono">About KiwiHacks</h2>
        <p className="about-text">
          KiwiHacks is New Zealand&apos;s first high school hackathon club, a
          non-profit running free hackathons for high school students aged 13
          to 18 years. Our events are a chance to meet new people, learn new
          skills, and build something you&apos;re actually proud of! Our
          KiwiHackers design their own games from art to physics, build rocket
          simulators and robots you can control with your phone, and much,
          much more.
        </p>
        <p className="about-text">
          It&apos;s run by high schoolers, for high schoolers. Every site (yes,
          even this one), every piece of art, and every event was made by Kiwi
          high schoolers, because a club for high schoolers should be run by
          them.
        </p>
        <p className="about-text">
          No matter your skill level, you&apos;re welcome. Just sign up, show up,
          and give it a go.
        </p>
        <p className="about-text">
          <SquiggleLink href="/about">More about us &rarr;</SquiggleLink>
        </p>
      </div>
      <div className="about-photos">
        <Carousel photos={photos} />
      </div>
    </section>
  );
}
