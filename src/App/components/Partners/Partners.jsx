import "./Partners.css";
import sponsorsData from "../../sponsors.json";

// Order matters: this is the order the sections appear on the page. A tier with
// nobody in it is skipped entirely, so Bronze shows up the moment we sign one.
const TIERS = [
  { key: "gold", heading: "Gold partners" },
  { key: "silver", heading: "Silver partners" },
  { key: "bronze", heading: "Bronze partners" },
  { key: "in-kind", heading: "In-kind partners" },
];

function SponsorCard({ sponsor, tier }) {
  return (
    <a
      className="partner-link"
      data-role="partner-link"
      href={sponsor.url}
      target="_blank"
      rel="noreferrer"
    >
      <div className="partner" data-role="partner" data-tier={tier}>
        {/* Not every partner has given us a logo file yet, so the card falls
            back to their name rather than a broken image. */}
        {sponsor.logo ? (
          <img
            className="partner-img"
            src={`/assets/Sponsors/${sponsor.logo}`}
            alt={sponsor.alt || `${sponsor.name} Logo`}
            loading="lazy"
            draggable="false"
          />
        ) : (
          <p className="partner-name">{sponsor.name}</p>
        )}
      </div>
    </a>
  );
}

export default function Partners() {
  const tiers = TIERS.map((tier) => ({
    ...tier,
    sponsors: sponsorsData.filter((sponsor) => sponsor.tier === tier.key),
  })).filter((tier) => tier.sponsors.length > 0);

  return (
    <section id="partnerships" className="partnerships" data-role="partners">
      <div
        className="tape-divider-container"
        style={{ backgroundImage: "url(/assets/tape.png)" }}
        aria-hidden="true"
      ></div>
      <h2 className="mono">Our partners</h2>

      <p className="partner-text partner-text-center">
        KiwiHacks is free for everyone who attends, and it stays that way
        because of the organisations below. Thank you.
      </p>

      {tiers.map(({ key, heading, sponsors }, index) => (
        <div key={key} className="partner-tier" data-tier={key}>
          <h3
            className={`partner-subheading mono${index === 0 ? " partner-subheading-first" : ""}`}
          >
            {heading}
          </h3>
          <div className="partners" data-role="partners" data-tier={key}>
            {sponsors.map((sponsor) => (
              <SponsorCard key={sponsor.name} sponsor={sponsor} tier={key} />
            ))}
          </div>
        </div>
      ))}

      <p className="partner-text" data-role="partner-cta">
        {" "}
        Partnering with KiwiHacks supports the next generation of New Zealand
        builders, and puts your brand in front of the students, whānau, and
        mentors who come to our events.
      </p>
      <br />
      <p className="partner-text" data-role="partner-contact">
        If you would like to partner with KiwiHacks, email{" "}
        <a href="mailto:niko@kiwihacks.org">niko@kiwihacks.org</a>.
      </p>
      <br />
      <p className="partner-text" data-role="partner-thanks">
        We reply fast, and we&apos;re grateful for every bit of support.
      </p>
    </section>
  );
}
