import "./FAQ.css";
import { FaChevronDown } from "react-icons/fa6";
import { faqs } from "./faqs";

export default function FAQ() {
  return (
    <section id="faq" className="faq-section">
      <div
        className="tape-divider-container"
        style={{ backgroundImage: "url(/assets/tape.png)" }}
        aria-hidden="true"
      ></div>
      <h2 className="mono">FAQ</h2>

      <div className="faq-list">
        {faqs.map(({ question, answer }) => (
          <details className="faq-box" key={question}>
            <summary className="mono faq-question">
              {question}
              <FaChevronDown className="faq-chevron" aria-hidden="true" />
            </summary>
            <p className="faq-answer">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
