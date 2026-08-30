import "./Partners.css";
import sponsorsData from "../../sponsors.json";

export default function Partners() {
  const inKindSponsors = sponsorsData.filter((sponsor) => sponsor.inKind);
  const partnerSponsors = sponsorsData.filter((sponsor) => !sponsor.inKind);

  const renderSponsorGrid = (sponsors, dataRole = "partners") => (
    <div className="partners" data-role={dataRole}>
      {sponsors.map((sponsor, idx) => {
        const logoSrc = `/assets/Sponsors/${sponsor.logo}`;
        return (
          <a
            key={`${sponsor.name}-${idx}`}
            className="partner-link"
            data-role="partner-link"
            href={sponsor.url}
            target="_blank"
            rel="noreferrer"
          >
            <div className="partner" data-role="partner">
              <img
                className="partner-img"
                src={logoSrc}
                alt={sponsor.alt || `${sponsor.name} Logo`}
                loading="lazy"
                draggable="false"
              />
            </div>
          </a>
        );
      })}
    </div>
  );

  return (
    <section
      id="partnerships"
      className="partnerships"
      data-role="partners"
    >
      <div
        className="tape-divider-container"
        style={{ backgroundImage: "url(/assets/tape.png)" }}
        aria-hidden="true"
      ></div>
      <h2 className="mono">Run by teens, made possible by our partners.</h2>

      <p className="partner-text partner-text-center">
        KiwiHacks is free for every attendee, and it stays that way
        because of the people below. A HUGE thank you to our partners!
      </p>
      {renderSponsorGrid(partnerSponsors)}

      <h2 className="partner-subheading mono">In-Kind Partners</h2>
      {renderSponsorGrid(inKindSponsors, "in-kind-partners")}

      <p className="partner-text" data-role="partner-cta">
        {" "}
        By becoming a partner, you support the next generation of innovators
        and gain visibility for your brand within the tech community.
      </p>
      <br />
      <p className="partner-text" data-role="partner-contact">
        If you're interested in making KiwiHacks better by partnering
        with us, please reach out to{" "}
        <a href="mailto:niko@kiwihacks.org">niko@kiwihacks.org</a>.
      </p>
      <br />
      <p className="partner-text" data-role="partner-thanks">
        We're really grateful for your support.
      </p>
    </section>
  );
}
