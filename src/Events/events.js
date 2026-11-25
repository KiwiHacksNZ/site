export const TIME_ZONE = "Pacific/Auckland";

const part = (date, options) =>
  new Intl.DateTimeFormat("en-NZ", { timeZone: TIME_ZONE, ...options }).format(date);

// en-NZ renders "9:00 am"; the design writes "9:00am".
const time = (date) => part(date, { hour: "numeric", minute: "2-digit" }).replace(/\s/g, "");
const day = (date) => part(date, { weekday: "short", day: "numeric", month: "short" }).replace(",", "");

export const formatStart = (date) => `${day(date)} ${part(date, { year: "numeric" })} · ${time(date)}`;
export const formatShortDay = day;

export function formatRange(start, end) {
  if (day(start) === day(end)) return `${day(start)}, ${time(start)} to ${time(end)}`;
  return `${day(start)}, ${time(start)}\nto ${day(end)}, ${time(end)}`;
}

export function formatCardDate(start, end) {
  if (day(start) === day(end)) return day(start);
  const month = (date) => part(date, { month: "short", year: "numeric" });
  const dayMonth = (date) => part(date, { day: "numeric", month: "short" });
  return month(start) === month(end)
    ? `${part(start, { day: "numeric" })} – ${dayMonth(end)}`
    : `${dayMonth(start)} – ${dayMonth(end)}`;
}

const nzOffset = (ms) => {
  const nz = new Date(new Date(ms).toLocaleString("en-US", { timeZone: TIME_ZONE }));
  const utc = new Date(new Date(ms).toLocaleString("en-US", { timeZone: "UTC" }));
  return nz - utc;
};

// A datetime-local value has no zone; the form means NZ time. The offset is
// looked up twice because the first guess can land on the far side of a
// daylight-saving change.
export function nzLocalToDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if (!match) return new Date(NaN);
  const [y, mo, d, h, mi] = match.slice(1).map(Number);
  const wall = Date.UTC(y, mo - 1, d, h, mi);
  if (!new Date(wall).toISOString().startsWith(value)) return new Date(NaN);
  const first = wall - nzOffset(wall);
  return new Date(wall - nzOffset(first));
}

export function calendarHref({ title, start, end, location, url }) {
  const stamp = (date) => date.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const text = (value) => value.replace(/[\\;,]/g, "\\$&").replace(/\r?\n/g, "\\n");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//KiwiHacks//Events//EN",
    "BEGIN:VEVENT",
    `UID:${url}`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${text(title)}`,
    location && `LOCATION:${text(location)}`,
    `URL:${url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics.join("\r\n"))}`;
}

export const mapsHref = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
export const mapsEmbed = (address) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

export const official = [
  {
    slug: "nova-auckland",
    title: "KiwiHacks Nova Auckland",
    city: "Auckland",
    format: "In person",
    suburb: "Ōtara",
    start: new Date("2026-10-09T09:00:00+13:00"),
    end: new Date("2026-10-10T11:00:00+13:00"),
    summary: "A free 24-hour hackathon for high schoolers in Auckland.",
    lede: "A free 24-hour hackathon for high schoolers, the last of three Nova events across New Zealand.",
    notice: [
      "Arrive before 9:00am on Friday",
      "for the pōwhiri, the formal welcome onto the marae.",
    ],
    about: [
      "KiwiHacks Nova is a constellation of three hackathons across New Zealand: Wellington, Christchurch and Auckland. A nova is a star that suddenly bursts bright, and that's the idea: light up each city with students building real things.",
      "Teams get 24 hours to build something and finish it: a game, a website, an app, a hardware project, or something completely unexpected. Mentors are around for the entire event, and beginner-friendly workshops mean nobody needs any prior experience. Designers, artists and storytellers fit right in too.",
    ],
    schedule: [
      {
        day: "Friday 9 October",
        items: [
          ["9:00am", "Pōwhiri"],
          ["10:00am", "Morning tea"],
          ["10:30am", "Opening ceremony and workshops"],
          ["12:00pm", "Building starts"],
          ["2:00pm", "Lunch"],
          ["7:00pm", "Dinner"],
          ["10:00pm", "Quiet building starts"],
        ],
      },
      {
        day: "Saturday 10 October",
        items: [
          ["7:00am", "Wake up"],
          ["8:00am", "Breakfast served"],
          ["9:00am", "Project submission"],
          ["9:30am", "Judges expo"],
          ["10:30am", "Prizegiving"],
          ["11:00am", "Closing ceremony"],
        ],
      },
    ],
    provided: [
      "Morning tea, lunch, dinner and breakfast",
      "Mentors and beginner workshops",
      "Wi-Fi and the space",
      "Swag and prizes",
    ],
    bring: [
      "A laptop, charger, and any devices you want to build with",
      "A water bottle",
      "Toiletries including deodorant, and a change of clothes",
      "A sleeping bag and small pillow. There are no showers.",
    ],
    photosFrom: "KiwiHacks 2026",
    photos: [
      ["/assets/gallery/DSCF7194.jpg", "Students working together at a KiwiHacks event"],
      ["/assets/gallery/DSCF2200.jpg", "High schoolers deep in a project at KiwiHacks"],
      ["/assets/gallery/DSCF3768.jpg", "Students showing off what they built"],
      ["/assets/gallery/DSCF3771.jpg", "Soldering and tinkering at a KiwiHacks event"],
    ],
    venue: "MIT Ngā Kete Wānanga Marae",
    address: "53 Otara Road, Ōtara, Auckland 2023",
    venueShort: ["Ngā Kete Wānanga Marae", "Ōtara, Auckland"],
    venueNote:
      "On the Manukau Institute of Technology Otara campus, who are hosting us. There's parking on campus for the Friday morning drop-off.",
    faqs: [
      [
        "I'm not a good coder. Can I come?",
        "Yes. Total beginners are welcome and a lot of KiwiHackers write their first line of code at the event. We run workshops and have mentors on hand all weekend.",
      ],
      [
        "Do I sleep at the venue?",
        "Yes, if you want the full experience. The event is closed-door and staffed with security for the whole 24 hours, with gender separated sleeping areas inside the venue, camping style on the floor.",
      ],
      [
        "Is it safe? What do parents need to know?",
        "The KiwiHacks team supervises around the clock. There's sign-in and sign-out, first aid on site, police-vetted mentors and organisers, and a code of conduct. A signed waiver is required, and the parent's guide covers supervision, sleeping, food and pick-up.",
      ],
    ],
    audience: "Any high school student in NZ, 13 to 18",
    cost: "Free. Food and swag included.",
    costShort: "Free",
    signupUrl: "/register",
    signupNote: "Opens the Nova sign-up form.",
    links: [
      ["Parent's guide", "/parents-guide"],
      ["Safeguarding policy", "/safeguarding"],
      ["Wellington and Christchurch", "https://nova.kiwihacks.org"],
    ],
    contact:
      "Questions? Text Niko on 022 135 0419, call the KiwiHacks line on 09 243 0984, or email niko@kiwihacks.org.",
  },
];

export const past = [
  {
    when: "Sep – Oct 2026",
    title: "KiwiHacks Nova",
    blurb: "Three free 24-hour hackathons in Wellington, Christchurch and Auckland, with 300+ high schoolers.",
    nova: true,
    href: "https://nova.kiwihacks.org",
    cta: "Go to the Nova site",
  },
  {
    when: "2 – 3 May 2026",
    title: "KiwiHacks 2026",
    blurb: "100+ high schoolers built 60+ projects in 24 hours at GridAKL.",
    image: ["/assets/gallery/kh26-group.jpg", "Everyone at KiwiHacks 2026 together for the group photo"],
    href: "/showcase",
    cta: "See what they built",
  },
  {
    when: "Sep 2025",
    title: "Daydream Auckland",
    blurb: "Our game jam for Hack Club's Daydream.",
    image: ["/assets/events/daydream.jpg", "Students hacking at Daydream Auckland"],
  },
  {
    when: "Mar 2025",
    title: "Scrapyard Auckland",
    blurb: "Our Hack Club Scrapyard, where you build the stupidest thing you can think of.",
    image: ["/assets/events/scrapyard.jpg", "Students in Scrapyard shirts hacking at Scrapyard Auckland"],
  },
];
