import { useState } from "react";
import "./Hackathons.css";
import Navbar from "../Navbar/Navbar";
import { ORG } from "../org";
import { FaDiscord, FaPlus } from "react-icons/fa6";

const HERO_IMAGE = "/assets/gallery/DSCF7194.jpg";

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

const FORMATS = [
  { value: "online", label: "Online" },
  { value: "in-person", label: "In person" },
];

const ADD_EVENT_HREF = `mailto:${ORG.email}?subject=${encodeURIComponent(
  "Add my event to kiwihacks.com/hackathons",
)}&body=${encodeURIComponent(
  "Event name:\nDates:\nCity (or online):\nWebsite:\nWho it's for:\n",
)}`;

// Dates arrive as plain YYYY-MM-DD strings. Reading them as UTC and formatting
// in UTC keeps the day from shifting with the visitor's timezone.
function parseDate(value) {
  return new Date(`${value}T00:00:00Z`);
}

function formatDay(date, options) {
  return new Intl.DateTimeFormat("en-NZ", { timeZone: "UTC", ...options }).format(date);
}

// "14 November", "14-15 November", "30 November - 2 December", with the year
// added only when the event isn't this year.
function formatDateRange(startValue, endValue, currentYear) {
  const start = parseDate(startValue);
  const end = parseDate(endValue || startValue);
  const showYear =
    start.getUTCFullYear() !== currentYear || end.getUTCFullYear() !== currentYear;
  const dayMonth = { day: "numeric", month: "long" };
  const withYear = showYear ? { ...dayMonth, year: "numeric" } : dayMonth;

  if (!endValue || startValue === endValue) {
    return formatDay(start, withYear);
  }

  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  if (sameYear && start.getUTCMonth() === end.getUTCMonth()) {
    return `${start.getUTCDate()}-${formatDay(end, withYear)}`;
  }
  return `${formatDay(start, sameYear ? dayMonth : withYear)} - ${formatDay(end, withYear)}`;
}

function formatLabel(format) {
  return FORMATS.find((f) => f.value === format)?.label ?? "In person";
}

function whereAndWhen(listing, currentYear) {
  const dates = formatDateRange(listing.startDate, listing.endDate, currentYear);
  const when = listing.time ? `${dates}, ${listing.time}` : dates;
  const place = listing.format === "online" ? null : listing.location;
  return place ? `${when}: ${place}` : when;
}

function ListingCard({ listing, currentYear, featured = false, past = false }) {
  const style = listing.bannerUrl ? { backgroundImage: `url(${listing.bannerUrl})` } : undefined;
  const Tag = featured ? "div" : "li";
  const className = [
    "hk-card-link",
    `hk-card-${listing.category}`,
    listing.bannerUrl ? "hk-card-has-banner" : null,
    past ? "hk-card-past" : null,
  ]
    .filter(Boolean)
    .join(" ");
  // Past events often have no live site any more, so the link is optional.
  const Inner = listing.url ? "a" : "div";
  const linkProps = listing.url
    ? { href: listing.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Tag className={`hk-card${featured ? " hk-card-featured" : ""}`}>
      <Inner {...linkProps} className={className} style={style}>
        <span className={`hk-badge hk-badge-${listing.format}`}>{formatLabel(listing.format)}</span>
        <span className="hk-card-title">
          {listing.logoUrl ? (
            <img src={listing.logoUrl} alt="" className="hk-card-logo" loading="lazy" draggable="false" />
          ) : null}
          <span className="hk-card-name">{listing.name}</span>
        </span>
        <span className="hk-card-when">{whereAndWhen(listing, currentYear)}</span>
        {listing.note ? <span className="hk-card-note">{listing.note}</span> : null}
        {featured ? <span className="hk-card-cta">Find out more</span> : null}
      </Inner>
    </Tag>
  );
}

export default function Hackathons({
  listings = [],
  pastListings = [],
  currentYear = new Date().getFullYear(),
}) {
  const [formatFilter, setFormatFilter] = useState(null);

  const byFormat = (listing) => !formatFilter || listing.format === formatFilter;
  const visible = listings.filter(byFormat);
  const visiblePast = pastListings.filter(byFormat);
  const featured = visible.filter((listing) => listing.featured);

  return (
    <>
      <Navbar />

      <main className="hk-main">
        <header className="hk-hero" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
          <a className="hk-add-event" href={ADD_EVENT_HREF}>
            <FaPlus aria-hidden="true" />
            Add your event
          </a>
          <div className="hk-hero-inner">
            <h1 className="display">
              Upcoming High School Hackathons in <span>New Zealand</span>
            </h1>
          </div>
        </header>

        <section className="hk-subscribe" aria-label="Get new events">
          <div>
            <h2>Want to hear when new events are added?</h2>
            <p>We post every new listing in the KiwiHacks Discord, along with the rest of the club.</p>
          </div>
          <a className="hk-button" href="/discord" target="_blank" rel="noopener noreferrer">
            <FaDiscord aria-hidden="true" />
            Join the Discord
          </a>
        </section>

        <div className="hk-filters" role="group" aria-label="Filter by format">
          {FORMATS.map((format) => (
            <button
              key={format.value}
              type="button"
              className={`hk-filter hk-filter-${format.value}`}
              aria-pressed={formatFilter === format.value}
              onClick={() =>
                setFormatFilter((current) => (current === format.value ? null : format.value))
              }
            >
              {format.label}
            </button>
          ))}
        </div>

        {featured.length > 0 ? (
          <section className="hk-featured" aria-label="Featured">
            {featured.map((listing) => (
              <ListingCard listing={listing} currentYear={currentYear} featured key={listing.id} />
            ))}
          </section>
        ) : null}

        {GROUPS.map((group) => {
          const items = visible.filter(
            (listing) => listing.category === group.category && !listing.featured,
          );
          const hasFeatured = featured.some((listing) => listing.category === group.category);
          const headingId = `hk-${group.category}`;

          return (
            <section className="hk-group" key={group.category} aria-labelledby={headingId}>
              <div className="hk-group-heading">
                <h2 id={headingId}>{group.title}</h2>
                <p>{group.blurb}</p>
              </div>

              {items.length > 0 ? (
                <ul className="hk-grid">
                  {items.map((listing) => (
                    <ListingCard listing={listing} currentYear={currentYear} key={listing.id} />
                  ))}
                </ul>
              ) : hasFeatured ? null : (
                <p className="hk-empty">
                  {formatFilter
                    ? `No ${formatLabel(formatFilter).toLowerCase()} events here right now.`
                    : "Nothing coming up right now. Check back soon."}
                </p>
              )}
            </section>
          );
        })}

        {visiblePast.length > 0 ? (
          <section className="hk-group hk-past" aria-labelledby="hk-past">
            <div className="hk-group-heading">
              <h2 id="hk-past">Past events</h2>
              <p>What we've run so far.</p>
            </div>
            <ul className="hk-grid">
              {visiblePast.map((listing) => (
                <ListingCard listing={listing} currentYear={currentYear} past key={listing.id} />
              ))}
            </ul>
          </section>
        ) : null}

        <p className="hk-footnote">
          Running an event high schoolers should know about?{" "}
          <a href={ADD_EVENT_HREF}>Send it to us</a> and we'll add it.
        </p>
      </main>
    </>
  );
}
