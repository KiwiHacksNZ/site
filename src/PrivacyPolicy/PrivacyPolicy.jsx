import "./PrivacyPolicy.css";
import Navbar from "../Navbar/Navbar";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <main className="pp-main">
        <section className="pp-card">
          <h1 className="pp-title mono">Privacy Policy</h1>
          <p className="pp-subtitle">
            KiwiHacks is a volunteer-run, non-commercial club. This page explains
            what personal information we collect, why we collect it, and how we
            look after it.
          </p>

          <div className="pp-section">
            <h2 className="pp-heading mono">Who we are</h2>
            <p className="pp-text">
              KiwiHacks is New Zealand's first high school hackathon club, run by
              high schoolers, for high schoolers. We organise free hackathons and
              related events (including KiwiHacks Nova) for teenage coders across
              Aotearoa. We are not a commercial business and do not sell products
              or services.
            </p>
          </div>

          <div className="pp-section">
            <h2 className="pp-heading mono">What information we collect</h2>
            <p className="pp-text">
              We collect information directly from you when you interact with
              KiwiHacks, including:
            </p>
            <ul className="pp-list">
              <li>
                <strong>Event sign-ups</strong> - name, email address, school,
                age, and (where relevant to an in-person event) emergency
                contact and dietary or accessibility information, collected
                through our sign-up forms.
              </li>
              <li>
                <strong>Parent or guardian details</strong> - where an attendee
                is under 18, we may collect a parent or guardian's contact
                details for consent and emergency purposes.
              </li>
              <li>
                <strong>Email correspondence</strong> - your email address and
                the contents of any message you send us, if you contact us
                directly or subscribe to our community newsletter.
              </li>
              <li>
                <strong>Community platforms</strong> - your username and
                activity if you join our Discord server, which has its own
                privacy terms set by Discord.
              </li>
              <li>
                <strong>Basic site analytics</strong> - anonymised, aggregated
                usage data (such as pages visited and general location) via
                Vercel Analytics, to help us understand how the site is used.
                We do not use this data to identify you individually.
              </li>
            </ul>
          </div>

          <div className="pp-section">
            <h2 className="pp-heading mono">How we use your information</h2>
            <p className="pp-text">We use the information we collect to:</p>
            <ul className="pp-list">
              <li>Run our events safely, including catering, seating, and emergency contact needs</li>
              <li>Communicate with you about events you've signed up for, including schedule changes</li>
              <li>Send occasional community updates and newsletters, which you can unsubscribe from at any time</li>
              <li>Improve KiwiHacks events and this website</li>
            </ul>
            <p className="pp-text">
              We do not sell, rent, or trade your personal information to
              anyone, and we do not use it for advertising.
            </p>
          </div>

          <div className="pp-section">
            <h2 className="pp-heading mono">Who we share it with</h2>
            <p className="pp-text">
              Your information is only accessible to the KiwiHacks organising
              team, on a need-to-know basis. We use a small number of trusted
              third-party services to help us run KiwiHacks, including Fillout
              (event sign-up forms), Brevo (email newsletters), and Google
              Workspace (internal record-keeping and communication). These
              providers only process your information on our behalf and under
              their own security and privacy terms.
            </p>
            <p className="pp-text">
              We may disclose information if required to by law, or where
              necessary to protect the safety of an attendee at one of our
              events.
            </p>
          </div>

          <div className="pp-section">
            <h2 className="pp-heading mono">Under-18 attendees</h2>
            <p className="pp-text">
              Most KiwiHackers are high school students aged 13-18. Where a
              sign-up requires parent or guardian consent, we ask for that
              consent as part of the registration process. Parents and
              guardians with questions about what information we hold about
              their teen, or how it's used, are welcome to email us at{" "}
              <a href="mailto:niko@kiwihacks.org">niko@kiwihacks.org</a>. See
              also our{" "}
              <a href="/parents-guide" target="_blank" rel="noreferrer">
                Parents' Guide
              </a>
              .
            </p>
          </div>

          <div className="pp-section">
            <h2 className="pp-heading mono">How long we keep it</h2>
            <p className="pp-text">
              We keep event sign-up information for as long as it's needed to
              run the relevant event and season, and to keep basic records for
              our sponsors and funders. You can ask us to delete your
              information at any time, and we'll do so unless we're required to
              keep it for a legitimate reason (such as financial record-keeping).
            </p>
          </div>

          <div className="pp-section">
            <h2 className="pp-heading mono">Your rights</h2>
            <p className="pp-text">
              Under the New Zealand Privacy Act 2020, you have the right to ask
              what personal information we hold about you, request a correction,
              or ask us to delete it. To do any of these, email us at{" "}
              <a href="mailto:niko@kiwihacks.org">niko@kiwihacks.org</a> and
              we'll get back to you within a reasonable time.
            </p>
          </div>

          <div className="pp-section">
            <h2 className="pp-heading mono">Changes to this policy</h2>
            <p className="pp-text">
              We may update this policy from time to time as KiwiHacks grows. If
              we make a significant change, we'll update the date below.
            </p>
            <p className="pp-text">
              <strong>Last updated:</strong> 20 August 2026
            </p>
          </div>

          <div className="pp-section">
            <h2 className="pp-heading mono">Contact us</h2>
            <p className="pp-text">
              If you have any questions about this privacy policy or how we
              handle your information, email us at{" "}
              <a href="mailto:niko@kiwihacks.org">niko@kiwihacks.org</a>.
            </p>
          </div>

          <div className="pp-cta-row">
            <a className="pp-primary-cta" href="/">
              <b>Back to Home</b>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
