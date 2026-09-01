import "./Hero.css";
import SquiggleLink from "../SquiggleLink";

const STARS_IMAGE = "/assets/stars.png";

export default function Hero() {
  return (
    <header id="home">
      <img
        src={STARS_IMAGE}
        alt="Background Stars"
        className="stars"
        aria-hidden="true"
        draggable="false"
      />
      <img
        src={STARS_IMAGE}
        alt="Background Stars"
        className="stars"
        aria-hidden="true"
        draggable="false"
      />
      <img
        src={STARS_IMAGE}
        alt="Background Stars"
        className="stars"
        aria-hidden="true"
        draggable="false"
      />
      <img
        src={STARS_IMAGE}
        alt="Background Stars"
        className="stars"
        aria-hidden="true"
        draggable="false"
      />
      <img
        src={STARS_IMAGE}
        alt="Background Stars"
        className="stars"
        aria-hidden="true"
        draggable="false"
      />
      <img
        src={STARS_IMAGE}
        alt="Background Stars"
        className="stars"
        aria-hidden="true"
        draggable="false"
      />
      <img
        src={STARS_IMAGE}
        alt="Background Stars"
        className="stars"
        aria-hidden="true"
        draggable="false"
      />
      <img
        src={STARS_IMAGE}
        alt="Background Stars"
        className="stars"
        aria-hidden="true"
        draggable="false"
      />
      <img
        src={STARS_IMAGE}
        alt="Background Stars"
        className="stars"
        aria-hidden="true"
        draggable="false"
      />

      <img
        src="/assets/kiwihackstext.png"
        alt="Kiwihacks"
        className="kiwihacks-text"
        fetchPriority="high"
        draggable="false"
      />
      <h1 className="mono hero-headline">
        New Zealand&apos;s high school hackathon club.
      </h1>
      <p className="hero-lede">
        We run free hackathons for high school students across New Zealand, and
        a Discord where KiwiHackers hang out in between them. Everything is
        organised by high schoolers.
      </p>

      <div className="hero-banner">
        <p className="mono">
          On now &middot; KiwiHacks Nova &middot; Wellington, Christchurch,
          Auckland
        </p>
      </div>

      <div className="hero-actions">
        <a className="hero-join" href="/discord">
          <b>Join the Discord</b>
        </a>
        <SquiggleLink className="hero-secondary" href="#nova">
          Read about Nova &rarr;
        </SquiggleLink>
      </div>

      <p className="mono hero-fineprint">
        Free to join. Open to any high school student in New Zealand, years 9 to
        13.
      </p>
    </header>
  );
}
