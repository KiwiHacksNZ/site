import "./Swag.css";
import Shirt_Front from "../../../assets/Swag/shirt-front.png?url";
import Shirt_Back from "../../../assets/Swag/shirt-back.png?url";

export default function Swag() {
  return (
    <section id="swag" className="swag-section">
      <h1 className="mono">Free Swag!</h1>
      <p className="swag-text">
        Everyone who attends will get a free, limited-edition KiwiHacks
        T-shirt as well as other cool merch and stickers!
      </p>
      <div className="swag-container">
        <div className="swag-box">
          {/* Replace with your actual front T-shirt image import */}
          <img
            src={Shirt_Front}
            alt="KiwiHacks T-shirt Front"
            loading="lazy"
            draggable="false"
          />
          <p className="mono">Shirt Front</p>
        </div>
        <div className="swag-box">
          {/* Replace with your actual actual back T-shirt image import */}
          <img
            src={Shirt_Back}
            alt="KiwiHacks T-shirt Back"
            loading="lazy"
            draggable="false"
          />
          <p className="mono">Shirt Back</p>
        </div>
      </div>
    </section>
  );
}
