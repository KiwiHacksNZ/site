import "./About.css";
import Carousel from "../Carousel/Carousel";

const photos = [
  { src: "/assets/gallery/DSCF3841.jpg", alt: "Students working together at a KiwiHacks event" },
  { src: "/assets/gallery/DSCF4012.jpg", alt: "A hardware project taking shape on a workbench" },
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
          KiwiHacks is New Zealand&apos;s first high school hackathon club,
          running hackathons for high school students aged 13 to 18. Our events
          are a chance to meet new people, learn some new skills, and build
          something you&apos;re actually proud of, whether that&apos;s an app, a
          game, a website, a robot, or a chair that runs away from you.
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
      </div>
      <div className="about-photos">
        <Carousel photos={photos} />
      </div>
    </section>
  );
}
