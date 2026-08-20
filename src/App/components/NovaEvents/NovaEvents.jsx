import "./NovaEvents.css";

const events = [
  {
    city: "Wellington",
    dates: "28 - 29 September 2026",
    venue: "Venue to be announced",
    confirmed: false,
  },
  {
    city: "Christchurch",
    dates: "2 - 3 October 2026",
    venue: "Venue to be announced",
    confirmed: false,
  },
  {
    city: "Auckland",
    dates: "10 - 11 October 2026",
    venue: "MIT Marae, Manukau",
    confirmed: true,
  },
];

export default function NovaEvents() {
  return (
    <section id="nova" className="nova-events">
      <h1 className="mono">KiwiHacks Nova</h1>
      <p className="nova-events-subtitle">
        Our biggest hackathon series yet is coming to three cities across
        Aotearoa this September and October. Free to attend, open to all high
        schoolers, no experience required.
      </p>
      <div className="nova-events-grid">
        {events.map((event) => (
          <div className="nova-event-card" key={event.city}>
            <h2 className="nova-event-city mono">{event.city}</h2>
            <p className="nova-event-dates">{event.dates}</p>
            <p className={`nova-event-venue${event.confirmed ? " confirmed" : ""}`}>
              {event.venue}
            </p>
          </div>
        ))}
      </div>
      <a
        className="nova-sign-up-link nova-events-cta"
        href="https://nova.kiwihacks.org"
        target="_blank"
        rel="noreferrer"
      >
        <b>Sign up for KiwiHacks Nova!</b>
      </a>
    </section>
  );
}
