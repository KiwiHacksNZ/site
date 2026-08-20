import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <button
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={toggle}
        aria-label="Toggle navigation"
        type="button"
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <a href="../" className="nav-link" onClick={close}>Home</a>
        <a href="../#nova" className="nav-link" onClick={close}>Nova</a>
        <a href="../#about" className="nav-link" onClick={close}>About</a>
        <a href="../showcase" className="nav-link" onClick={close}>Showcase</a>
        <a href="../#faq" className="nav-link" onClick={close}>FAQ</a>
        <a href="../#partnerships" className="nav-link" onClick={close}>Partners</a>
        <a href="../team" className="nav-link" onClick={close}>Meet The Team</a>
        <a
          className="nav-signup"
          href="../signup"
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
        >
          <b>Sign up for KiwiHacks</b>
        </a>
      </div>
    </nav>
  );
}
