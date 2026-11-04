import "../PrivacyPolicy/PrivacyPolicy.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../App/components/Footer/Footer";
import { ORG } from "../org";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="pp-main">
        <section className="pp-card">
          <h1 className="pp-title mono">Contact Us</h1>
          <p className="pp-subtitle">
            Questions about our events, sponsorship, or anything else? We&apos;re
            happy to hear from you, and we reply fast.
          </p>

          <div className="pp-section">
            <h2 className="pp-heading mono">Email</h2>
            <p className="pp-text">
              The quickest way to reach us is{" "}
              <a href={`mailto:${ORG.email}`}>{ORG.email}</a>. This goes to the
              whole organising team.
            </p>
          </div>

          <div className="pp-section">
            <h2 className="pp-heading mono">Postal address</h2>
            <p className="pp-text">
              {ORG.legalName}
              {ORG.address.map((line) => (
                <span key={line}>
                  <br />
                  {line}
                </span>
              ))}
            </p>
          </div>

          <div className="pp-section">
            <h2 className="pp-heading mono">Online</h2>
            <ul className="pp-list">
              <li>
                <a href="/discord">Discord</a>: chat with the community and the
                organisers
              </li>
              <li>
                <a href="https://www.instagram.com/kiwihacks/" target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://nz.linkedin.com/company/kiwihacks" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="pp-section">
            <h2 className="pp-heading mono">Got something specific?</h2>
            <ul className="pp-list">
              <li>
                <strong>Sponsors and partners:</strong> email{" "}
                <a href={`mailto:${ORG.email}`}>{ORG.email}</a> and see{" "}
                <a href="/#partnerships">who already supports us</a>.
              </li>
              <li>
                <strong>Parents and guardians:</strong> read our{" "}
                <a href="/parents-guide" target="_blank" rel="noreferrer">
                  Parents&apos; Guide
                </a>{" "}
                and <a href="/safeguarding">safeguarding policy</a>.
              </li>
              <li>
                <strong>Reporting a concern at an event:</strong> follow the
                steps in our <a href="/code-of-conduct">Code of Conduct</a>.
              </li>
              <li>
                <strong>Your personal information:</strong> see our{" "}
                <a href="/privacy-policy">Privacy Policy</a>.
              </li>
            </ul>
          </div>

          <div className="pp-cta-row">
            <a className="pp-primary-cta" href="/">
              <b>Back to Home</b>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
