import "./Hero.css";

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
      <h1 className="hero-headline">Where Kiwi teens make cool stuff.</h1>
      <p className="hero-lede">
        KiwiHacks is New Zealand's high school hackathon club &mdash; a
        community of teenagers who build things together, run entirely by
        teenagers.
      </p>

      <div className="hero-actions">
        <a className="hero-join" href="/discord">
          <b>Join us!</b>
        </a>
        <a className="hero-secondary squiggle" href="#programs">
          See what's on &rarr;
        </a>
      </div>

      <p className="mono hero-fineprint">
        Free, forever. Open to any high schooler in NZ, 13&ndash;18.
      </p>
    </header>
  );
}
