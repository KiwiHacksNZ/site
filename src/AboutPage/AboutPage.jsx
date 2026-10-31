import "../PrivacyPolicy/PrivacyPolicy.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../App/components/Footer/Footer";
import { ORG } from "../org";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="pp-main">
        <section className="pp-card">
          <h1 className="pp-title mono">About KiwiHacks</h1>
          <p className="pp-subtitle">
            KiwiHacks is a New Zealand non-profit run by high schoolers, for
            high schoolers. We run free hackathons that help teenagers learn
            to build things with technology.
          </p>

          <div className="pp-section">
            <h2 className="pp-heading mono">Our mission</h2>
            <p className="pp-text">
              Our mission is to give every high school student in Aotearoa the
              chance to learn to code and build something they&apos;re proud
              of, for free, whatever their background or skill level. We do
              that by running hackathons, workshops, and a year-round community
              where students learn from each other and from mentors.
            </p>
          </div>

          <div className="pp-section">
            <h2 className="pp-heading mono">What we do</h2>
            <ul className="pp-list">
              <li>
                <strong>Free hackathons.</strong> Our events give students 24
                hours to team up and build an app, a game, a website, or a
                piece of hardware. Food, drinks, swag, mentors, and
                beginner-friendly workshops are included, and taking part costs
                nothing.
              </li>
              <li>
                <strong>KiwiHacks Nova.</strong> Three free 24-hour hackathons
                in Auckland, Wellington, and Christchurch, for more than 300
                high schoolers. See <a href="/#nova">Nova</a>.
              </li>
              <li>
                <strong>A year-round community.</strong> Our{" "}
                <a href="/discord">Discord</a> is where KiwiHackers share
                projects, ask for help, and hang out between events.
              </li>
              <li>
                <strong>Showing off student work.</strong> Projects built at our
                events live on our <a href="/showcase">showcase</a>.
              </li>
            </ul>
          </div>

          <div className="pp-section">
            <h2 className="pp-heading mono">Who we serve</h2>
            <p className="pp-text">
              Any high school student in New Zealand aged 13 to 18. You
              don&apos;t need any experience. Lots of KiwiHackers write their
              first line of code at one of our events.
            </p>
          </div>

          <div className="pp-section">
            <h2 className="pp-heading mono">How we&apos;re run</h2>
            <p className="pp-text">
              KiwiHacks is organised entirely by volunteer high school students.
              You can <a href="/team">meet the team</a>. Every attendee,
              mentor, and organiser agrees to our{" "}
              <a href="/code-of-conduct">Code of Conduct</a>, and our{" "}
              <a href="/safeguarding">safeguarding policy</a> sets out how we
              keep the young people at our events safe.
            </p>
          </div>

          <div className="pp-section">
            <h2 className="pp-heading mono">How we&apos;re funded</h2>
            <p className="pp-text">
              Our events are free for students. They&apos;re paid for by the{" "}
              <a href="/#partnerships">sponsors and partners</a> who support
              KiwiHacks. We&apos;re not a commercial business, we don&apos;t
              sell products or services, and as an incorporated society we
              don&apos;t pay profits to our members. The money we receive goes
              into running our events.
            </p>
          </div>

          <div className="pp-section">
            <h2 className="pp-heading mono">Legal details</h2>
            <p className="pp-text">
              KiwiHacks operates as {ORG.legalName}, a not-for-profit
              incorporated society registered in New Zealand.
            </p>
            <ul className="pp-list">
              <li>New Zealand Business Number (NZBN): {ORG.nzbn}</li>
              <li>Incorporated Societies registration number: {ORG.societyNumber}</li>
              <li>Incorporated: {ORG.incorporated}</li>
              <li>Registered address: {ORG.address.join(", ")}</li>
              <li>
                Email: <a href={`mailto:${ORG.email}`}>{ORG.email}</a>
              </li>
            </ul>
          </div>

          <div className="pp-cta-row">
            <a className="pp-primary-cta" href="/contact">
              <b>Get in touch</b>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
