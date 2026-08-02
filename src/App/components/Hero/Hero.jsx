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
      <h2 className="mono subtitle">
        New Zealand's high school hackathon club
      </h2>
    </header>
  );
}
