import "./About.css";
import Carousel from "../Carousel/Carousel";

const photos = [
  { src: "/assets/gallery/DSCF3841.jpg", alt: "Students working together at a KiwiHacks event" },
  { src: "/assets/gallery/DSCF4012.jpg", alt: "A hardware project taking shape on a workbench" },
  { src: "/assets/gallery/DSCF2200.jpg", alt: "Hackers deep in a project at KiwiHacks" },
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
          built and run entirely by teenagers. Every event, every poster, and
          every site we have made, including this one, was put together by New
          Zealand high schoolers.
        </p>
        <p className="about-text">
          A KiwiHacks event is a chance to meet new people, learn new skills,
          and build something you are actually proud of, whether that is an app,
          a game, a website, a hardware project, or something nobody has seen
          before. Mentors are around for the entire event, and
          beginner-friendly workshops mean you do not need any prior experience
          to get started.
        </p>
        <p className="about-text">
          We have run these before. Our organisers ran hackathons in Auckland
          before KiwiHacks existed, and at KiwiHacks &rsquo;26 earlier this year
          over 100 high schoolers turned up and every team left with a project
          they built themselves. This year we are taking KiwiHacks nationwide.
        </p>
        <p className="about-text">
          Whatever your skill level, you are welcome. Just sign up, show up, and
          give it a go.
        </p>
      </div>
      <div className="about-photos">
        <Carousel photos={photos} />
      </div>
    </section>
  );
}
