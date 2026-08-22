import { useEffect, useState } from "react";
import "./Status.css";
import Navbar from "../Navbar/Navbar";

// Uptime data is produced by KiwiHacksNZ/status (Upptime), which re-checks every
// five minutes on GitHub Actions and commits the summary back to the repo. Reading
// it straight from raw.githubusercontent.com keeps this page a static build with no
// server of its own, and keeps the monitor independent of our own infrastructure.
const SUMMARY_URL =
  "https://raw.githubusercontent.com/KiwiHacksNZ/status/master/history/summary.json";

const STATUS_REPO = "https://github.com/KiwiHacksNZ/status";

const RANGES = [
  { key: "Day", label: "24h" },
  { key: "Week", label: "7d" },
  { key: "Month", label: "30d" },
  { key: "Year", label: "1y" },
];

function chipLabel(status) {
  if (status === "up") return "Operational";
  if (status === "degraded") return "Degraded";
  if (status === "down") return "Down";
  return "Unknown";
}

export default function Status() {
  const [services, setServices] = useState(null);
  const [error, setError] = useState(null);
  const [range, setRange] = useState("Week");

  useEffect(() => {
    let cancelled = false;

    fetch(SUMMARY_URL, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setServices(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const worst = !services
    ? "unknown"
    : services.some((s) => s.status === "down")
      ? "down"
      : services.some((s) => s.status === "degraded")
        ? "degraded"
        : "up";

  const bannerClass =
    worst === "up" ? "all-good" : worst === "unknown" ? "loading" : worst;

  const bannerText = () => {
    if (error) return "Could not load live status right now.";
    if (!services) return "Checking every service...";
    if (worst === "up") return "All systems are operational";
    const bad = services.filter((s) => s.status !== "up").length;
    return `${bad} ${bad === 1 ? "service is" : "services are"} having trouble`;
  };

  return (
    <>
      <Navbar />

      <main className="status-main">
        <section className="status-card">
          <h1 className="status-title mono">Status</h1>
          <p className="status-subtitle">
            Live uptime for every KiwiHacks service. Checked every five minutes,
            from outside our own infrastructure.
          </p>

          <div className={`status-banner ${bannerClass}`}>
            <span className={`status-dot ${worst}`} aria-hidden="true" />
            <span>{bannerText()}</span>
          </div>

          <div className="status-range-row">
            <h2 className="status-range-label mono">Services</h2>
            <div className="status-range" role="group" aria-label="Time range">
              {RANGES.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  aria-pressed={range === r.key}
                  onClick={() => setRange(r.key)}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="status-message">
              Live status is unavailable at the moment. You can still read the raw
              history on{" "}
              <a href={STATUS_REPO} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              .
            </p>
          )}

          {!services && !error && (
            <p className="status-message">Loading live status...</p>
          )}

          {services && (
            <ul className="status-list">
              {services.map((s) => {
                const uptime = s[`uptime${range}`] ?? s.uptime ?? "0%";
                const time = s[`time${range}`] ?? s.time;
                const pct = parseFloat(String(uptime).replace("%", "")) || 0;

                return (
                  <li className="status-item" key={s.slug}>
                    <div className="status-item-head">
                      <h3 className="status-item-name mono">
                        <a href={s.url} target="_blank" rel="noopener noreferrer">
                          {s.name}
                        </a>
                      </h3>
                      <span className={`status-chip ${s.status}`}>
                        {chipLabel(s.status)}
                      </span>
                    </div>

                    <ul className="status-meta">
                      <li>
                        <span className="label">Uptime: </span>
                        <span className="value">{uptime}</span>
                      </li>
                      <li>
                        <span className="label">Average response: </span>
                        <span className="value">{time} ms</span>
                      </li>
                    </ul>

                    <div
                      className={`status-bar ${s.status}`}
                      role="img"
                      aria-label={`${uptime} uptime`}
                    >
                      <span style={{ width: `${Math.min(pct, 100)}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <p className="status-note">
            Something broken that is not listed here? Email{" "}
            <a href="mailto:niko@kiwihacks.org">niko@kiwihacks.org</a>. Full
            incident history lives on{" "}
            <a href={STATUS_REPO} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            .
          </p>

          <div className="status-cta-row">
            <a className="status-primary-cta" href="/">
              <b>Back to Home</b>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
