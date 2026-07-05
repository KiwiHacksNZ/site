import "./Hero.css";
import LogoText from "../../../assets/kiwihackstext.png?url";
import StarsImage from "../../../assets/stars.png?url";

export default function Hero() {
  return (
    <header id="home">
      <img
        src={StarsImage}
        alt="Background Stars"
        className="stars"
        aria-hidden="true"
        draggable="false"
      />
      <img
        src={StarsImage}
        alt="Background Stars"
        className="stars"
        aria-hidden="true"
        draggable="false"
      />
      <img
        src={StarsImage}
        alt="Background Stars"
        className="stars"
        aria-hidden="true"
        draggable="false"
      />
      <img
        src={StarsImage}
        alt="Background Stars"
        className="stars"
        aria-hidden="true"
        draggable="false"
      />
      <img
        src={StarsImage}
        alt="Background Stars"
        className="stars"
        aria-hidden="true"
        draggable="false"
      />
      <img
        src={StarsImage}
        alt="Background Stars"
        className="stars"
        aria-hidden="true"
        draggable="false"
      />
      <img
        src={StarsImage}
        alt="Background Stars"
        className="stars"
        aria-hidden="true"
        draggable="false"
      />
      <img
        src={StarsImage}
        alt="Background Stars"
        className="stars"
        aria-hidden="true"
        draggable="false"
      />
      <img
        src={StarsImage}
        alt="Background Stars"
        className="stars"
        aria-hidden="true"
        draggable="false"
      />

      <img
        src={LogoText}
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
