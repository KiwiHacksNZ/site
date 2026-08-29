import "./Footer.css";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaDiscord,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer>
      <div className="footer-signature-container">
        <picture>
          <source srcSet="/assets/signatures-wide.png" media="(min-width: 768px)" />
          <img
            src="/assets/signatures.png"
            alt="Signatures of the KiwiHacks team"
            className="signatures"
            draggable="false"
          />
        </picture>
      </div>
      <div className="footer-text">
        <p className="footer-text-piece">© 2026 KiwiHacks Incorporated</p>
        <p className="footer-text-piece">
          Built with ❤️ by teens, for teens.
        </p>
        <p className="footer-text-piece">
          <a
            href="https://github.com/KiwiHacksNZ/site"
            target="_blank"
            rel="noreferrer"
          >
            View our code on GitHub
          </a>
        </p>
      </div>
      <div className="footer-links">
        <a
          href="../discord"
          target="_blank"
          className="footer-link"
          aria-label="Discord"
        >
          <FaDiscord />
        </a>
        <a
          href="https://www.instagram.com/kiwihacks/"
          target="_blank"
          className="footer-link"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://nz.linkedin.com/company/kiwihacks"
          target="_blank"
          className="footer-link"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/orgs/KiwiHacksNZ"
          target="_blank"
          className="footer-link"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
      </div>
      <div className="footer-important-links">
        <p>Important Links</p>
        <a href="../code-of-conduct">Code of Conduct</a>
        <a href="../privacy-policy">Privacy Policy</a>
        <a href="../status">Status</a>
      </div>
    </footer>
  );
}
