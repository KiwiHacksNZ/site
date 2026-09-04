import "./FAQ.css";
import { FaChevronDown } from "react-icons/fa6";

const faqs = [
  {
    question: "What is KiwiHacks?",
    answer: (
      <>
        KiwiHacks is New Zealand&apos;s first high school hackathon club. We run
        free hackathons for high school students, and everything is organised by
        high schoolers.
      </>
    ),
  },
  {
    question: "Who can attend KiwiHacks events?",
    answer: (
      <>
        Any high school student in New Zealand, years 9 to 13. Come on your own
        or bring a team of friends. No experience is needed.
      </>
    ),
  },
  {
    question: "How do I join KiwiHacks?",
    answer: (
      <>
        Join the <a href="/discord">Discord</a>. That is where the club lives day
        to day. It is free, there is no form to fill in, and new events are
        announced there first.
      </>
    ),
  },
  {
    question: "I'm not a good coder. Can I come?",
    answer: (
      <>
        Yes. Total beginners are welcome and a lot of KiwiHackers write their
        first line of code at an event. We run workshops and have mentors on hand
        all weekend. Designers, artists, and storytellers fit right in too.
      </>
    ),
  },
  {
    question: "What should I bring to a hackathon?",
    answer: (
      <>
        A laptop and charger, any devices you want to build with, a water bottle,
        and a sleeping bag if you want to rest. Our events run for 24 hours, so
        pack like a sleepover. We cover the food, Wi-Fi, and the space.
      </>
    ),
  },
  {
    question: "When's the next event?",
    answer: (
      <>
        Everything we are running right now is{" "}
        <a href="#nova">further up this page</a>. New events are announced in the{" "}
        <a href="/discord">Discord</a> first.
      </>
    ),
  },
  {
    question: "All of this, for free?",
    answer: (
      <>
        Yes, completely free to attend. Food, mentors, workshops, and swag are
        all covered by our sponsors. Cost is never a barrier at KiwiHacks.
      </>
    ),
  },
  {
    question: "How about safety?",
    answer: (
      <>
        Our events are supervised by the KiwiHacks team around the clock. There
        is a secure venue with check-in and check-out, first aid on site, a clear{" "}
        <a href="/code-of-conduct">code of conduct</a>, and guardian contact
        details collected at sign-up.
      </>
    ),
  },
  {
    question: "What if my parents are concerned?",
    answer: (
      <>
        We are happy to talk. We run parent information sessions before each
        event, the venue is supervised the whole time, and a signed waiver is
        required to take part. Our{" "}
        <a href="./parents-guide" target="_blank">
          parents guide
        </a>{" "}
        covers most of it, and they can email{" "}
        <a href="mailto:niko@kiwihacks.org">niko@kiwihacks.org</a> with anything
        else.
      </>
    ),
  },
  {
    question: "What if I have more questions?",
    answer: (
      <>
        Email <a href="mailto:niko@kiwihacks.org">niko@kiwihacks.org</a> or join
        the KiwiHackers <a href="/discord">Discord</a>. We reply fast.
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
