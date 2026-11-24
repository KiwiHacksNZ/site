import { useState } from "react";
import "./ForkPreviewPage.css";

export default function ForkPreviewPage({ children }) {
  const [hasEntered, setHasEntered] = useState(false);

  if (hasEntered) {
    return children;
  }

  return (
    <main className="fork-gate" role="main" aria-label="Fork preview gate">
      <div className="fork-gate-card">
        <p className="fork-gate-eyebrow">Fork Preview Mode</p>
        <h1>This version is intentionally non-indexable</h1>
        <p>
          This fork starts in preview mode so search engines do not rank it above
          the official KiwiHacks site.
        </p>
        <div className="fork-gate-actions">
          <button type="button" onClick={() => setHasEntered(true)}>
            Enter this fork
          </button>
          <a href="https://www.kiwihacks.com/" rel="noreferrer">
            Go to official site
          </a>
        </div>
      </div>
    </main>
  );
}