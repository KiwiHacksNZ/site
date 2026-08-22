import "./FAQ.css";

export default function FAQ() {
  return (
    <section id="faq" className="faq-section" style={{ position: "relative" }}>
      <div
        className="tape-divider-container"
        style={{ backgroundImage: "url(/assets/tape.png)" }}
        aria-hidden="true"
      ></div>
      <h1 className="mono">FAQ</h1>
      <div className="faq-box">
        <h2 className="mono faq-question">What is KiwiHacks?</h2>
        <p className="faq-answer">
          KiwiHacks is New Zealand's first High School Hackathon club! We run
          hackathons for high schoolers (aged 13-18) by high schoolers.
        </p>
      </div>
      <div className="faq-box">
        <h2 className="mono faq-question">Who can attend KiwiHacks events?</h2>
        <p className="faq-answer">
          All high-school students 18 and under are welcome at KiwiHacks events!
        </p>
      </div>
      {/* TODO: Add back when fixed — these images break layout on large screens
    <img
      src={PolaroidImage2}
      alt=""
      className="small-decorative-image"
      loading="lazy"
    />
    */}

      <div className="faq-box">
        <h2 className="mono faq-question">I'm not a good coder. Can I come?</h2>
        <p className="faq-answer">
          Absolutely &mdash; KiwiHacks is for creatives of all skill levels! We
          run workshops for beginners on how to code the basics, and everyone
          will finish a project at our hackathons.
        </p>
      </div>
      <div className="faq-box">
        <h2 className="mono faq-question">When's the next event?</h2>
        <p className="faq-answer">
          KiwiHacks Nova is our next hackathon, and it's taking place in
          Auckland, Wellington, and Christchurch! Everything we're running right
          now is listed <a href="#programs">further up this page</a>, and new
          events get announced in our <a href="/discord">Discord</a> first.
        </p>
      </div>
      {/* TODO: Add back when fixed — these images break layout on large screens
    <img
      src={PolaroidImage1}
      alt=""
      className="small-decorative-image"
      loading="lazy"
    />
    */}

      <div className="faq-box">
        <h2 className="mono faq-question">All this, for free?</h2>
        <p className="faq-answer">
          Yep! KiwiHacks events (and swag!) are completely free thanks to our generous
          sponsors. Just sign up, turn up, and have fun!
        </p>
      </div>
      <div className="faq-box">
        <h2 className="mono faq-question">What if my parents are concerned?</h2>
        <p className="faq-answer">
          We understand that parents want to ensure their children are safe.
          Check out our{" "}
          <a href="./parents-guide" target="_blank">
            parents guide
          </a>
          . If your parents have any questions or concerns, we're here to help -
          please have them reach out to us at{" "}
          <a href="mailto:niko@kiwihacks.org">niko@kiwihacks.org</a>!
        </p>
      </div>
      <div className="faq-box">
        <h2 className="mono faq-question">What if I have more questions?</h2>
        <p className="faq-answer">
          No worries, just contact us! Feel free to reach out to us via email at{" "}
          <a href="mailto:niko@kiwihacks.org">niko@kiwihacks.org</a>.
        </p>
      </div>
    </section>
  );
}
