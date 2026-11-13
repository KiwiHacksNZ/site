import "./Hackathons.css";
import Navbar from "../Navbar/Navbar";
import { ORG } from "../org";
import { FaArrowUpRightFromSquare, FaLocationDot, FaRegCalendar } from "react-icons/fa6";

const GROUPS = [
  {
    category: "kiwihacks",
    title: "KiwiHacks events",
    blurb: "Hackathons and workshops we run ourselves.",
  },
  {
    category: "community-hackathon",
    title: "Community hackathons",
    blurb: "Hackathons run by other people that high schoolers can join.",
  },
  {
    category: "community-event",
    title: "Other community events",
    blurb: "Meetups, workshops and conferences worth knowing about.",
  },
];

// Dates arrive as plain YYYY-MM-DD strings. Reading them as UTC and formatting
// in UTC keeps the day from shifting with the visitor's timezone.
function parseDate(value) {
  return new Date(`${value}T00:00:00Z`);
}

function formatDay(date, options) {
  return new Intl.DateTimeFormat("en-NZ", { timeZone: "UTC", ...options }).format(date);
}

function formatDateRange(startValue, endValue) {
  const start = parseDate(startValue);
  const end = parseDate(endValue || startValue);
  const full = { day: "numeric", month: "short", year: "numeric" };

  if (startValue === endValue || !endValue) {
    return formatDay(start, { weekday: "short", ...full });
  }

  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  const sameMonth = sameYear && start.getUTCMonth() === end.getUTCMonth();

  if (sameMonth) {
    return `${start.getUTCDate()}-${formatDay(end, full)}`;
  }
  if (sameYear) {
    return `${formatDay(start, { day: "numeric", month: "short" })} - ${formatDay(end, full)}`;
  }
  return `${formatDay(start, full)} - ${formatDay(end, full)}`;
}

function ListingCard({ listing }) {
  const place = listing.online ? "Online" : listing.location;

  return (
    <li className="hackathons-card">
      <a href={listing.url} target="_blank" rel="noopener noreferrer">
        {listing.logoUrl ? (
          <img
            src={listing.logoUrl}
            alt=""
            className="hackathons-card-logo"
            loading="lazy"
            draggable="false"
          />
        ) : (
          <span className="hackathons-card-logo hackathons-card-logo-fallback" aria-hidden="true">
            {listing.name.charAt(0)}
          </span>
        )}
        <span className="hackathons-card-body">
          <span className="hackathons-card-name">
            {listing.name}
            <FaArrowUpRightFromSquare aria-hidden="true" className="hackathons-card-external" />
          </span>
          <span className="hackathons-card-meta">
            <span>
              <FaRegCalendar aria-hidden="true" />
              {formatDateRange(listing.startDate, listing.endDate)}
            </span>
            {place ? (
              <span>
                <FaLocationDot aria-hidden="true" />
                {place}
              </span>
            ) : null}
          </span>
        </span>
      </a>
    </li>
  );
}

export default function Hackathons({ listings = [] }) {
  return (
    <>
      <Navbar />

      <main className="hackathons-main">
        <header className="hackathons-header">
          <h1 className="display">Hackathons in New Zealand</h1>
          <p>
            What's on for high school coders between KiwiHacks events. Ours, other people's
            hackathons, and community events worth turning up to.
          </p>
        </header>

        {GROUPS.map((group) => {
          const items = listings.filter((listing) => listing.category === group.category);
          const headingId = `hackathons-${group.category}`;

          return (
            <section className="hackathons-group" key={group.category} aria-labelledby={headingId}>
              <div className="hackathons-group-heading">
                <h2 id={headingId}>{group.title}</h2>
                <p>{group.blurb}</p>
              </div>

              {items.length > 0 ? (
                <ul className="hackathons-list">
                  {items.map((listing) => (
                    <ListingCard listing={listing} key={listing.id} />
                  ))}
                </ul>
              ) : (
                <p className="hackathons-empty">Nothing coming up right now. Check back soon.</p>
              )}
            </section>
          );
        })}

        <p className="hackathons-submit">
          Running an event high schoolers should know about? Email{" "}
          <a href={`mailto:${ORG.email}`}>{ORG.email}</a> and we'll take a look.
        </p>
      </main>
    </>
  );
}
