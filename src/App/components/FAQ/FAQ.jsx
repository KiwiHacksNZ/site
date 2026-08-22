import "./FAQ.css";
import { FaChevronDown } from "react-icons/fa6";

const faqs = [
  {
    question: "What is KiwiHacks?",
    answer: (
      <>
        KiwiHacks is New Zealand&apos;s first High School Hackathon club! We run
        hackathons for high schoolers (aged 13-18) by high schoolers.
      </>
    ),
  },
  {
    question: "Who can attend KiwiHacks events?",
    answer: (
      <>All high-school students 18 and under are welcome at KiwiHacks events!</>
    ),
  },
  {
    question: "I'm not a good coder. Can I come?",
    answer: (
      <>
        Absolutely &mdash; KiwiHacks is for creatives of all skill levels! We run
        workshops for beginners on how to code the basics, and everyone will
        finish a project at our hackathons.
      </>
    ),
  },
  {
    question: "When's the next event?",
    answer: (
      <>
        KiwiHacks Nova is our next hackathon, and it&apos;s taking place in
        Auckland, Wellington, and Christchurch! Everything we&apos;re running
        right now is listed <a href="#programs">further up this page</a>, and new
        events get announced in our <a href="/discord">Discord</a> first.
      </>
    ),
  },
  {
    question: "All this, for free?",
    answer: (
      <>
        Yep! KiwiHacks events (and swag!) are completely free thanks to our
        generous sponsors. Just sign up, turn up, and have fun!
      </>
    ),
  },
  {
    question: "What if my parents are concerned?",
    answer: (
      <>
        We understand that parents want to ensure their children are safe. Check
        out our{" "}
        <a href="./parents-guide" target="_blank">
          parents guide
        </a>
        . If your parents have any questions or concerns, we&apos;re here to help
        - please have them reach out to us at{" "}
        <a href="mailto:niko@kiwihacks.org">niko@kiwihacks.org</a>!
      </>
    ),
  },
  {
    question: "What if I have more questions?",
    answer: (
      <>
        No worries, just contact us! Feel free to reach out to us via email at{" "}
        <a href="mailto:niko@kiwihacks.org">niko@kiwihacks.org</a>.
      </>
    ),
  },
];

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
