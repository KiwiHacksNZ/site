import "./DateChangePage.css";
import Navbar from "../Navbar/Navbar";

export default function DateChangePage() {
  return (
    <>
      <Navbar />

      <main className="date-page-main">
        <section className="date-hero-card">
          <div className="date-brand-stack">
            <img
              src="/assets/kiwihackslogo.png"
              alt="KiwiHacks logo"
              className="date-page-logo"
              fetchPriority="high"
              width="140"
              height="140"
            />
            <img
              src="/assets/kiwihackstext.png"
              alt="KiwiHacks"
              className="date-page-wordmark"
              fetchPriority="high"
            />
          </div>

          <h1 className="date-page-title">Date Update</h1>
          <p className="date-page-subtitle">
            We shifted the event date so we can deliver a better weekend for everyone.
          </p>

          <div className="date-boxes-wrap">
            <div className="date-box date-box-old">
              <span className="date-box-label">Old date</span>
              <p className="date-box-text">March 28th - 29th, 2026</p>
            </div>

            <div className="date-box-divider" aria-hidden="true">
              now
            </div>

            <div className="date-box date-box-new">
              <span className="date-box-label">New date</span>
              <p className="date-box-text">May 2nd - 3rd, 2026</p>
            </div>
          </div>

          <p className="date-page-note">
            We have made the difficult decision to postpone KiwiHacks to May 2nd. The event will now run from May 2nd to 3rd at the GridAKL John Lysaght Startup Space.
          </p>

          <p className="date-page-note">
            This delay gives us time to make sure t-shirts arrive on schedule and gives the KiwiHacks team more time to deliver our biggest and best high school hackathon yet in 2026.
          </p>

          <div className="date-cta-row">
            <a
              className="date-primary-cta"
              href="https://forms.hackclub.com/kiwihacks"
              target="_blank"
              rel="noreferrer"
            >
              <b>Sign up for KiwiHacks</b>
            </a>

            <a className="date-secondary-cta" href="/">
              <b>Go back to Home</b>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
