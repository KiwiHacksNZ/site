import "./Team.css";
import NikoImage from "../../../assets/People/niko.jpg";
import JoshImage from "../../../assets/People/josh.jpg";
import KyleImage from "../../../assets/People/kyle.jpg";
import ChristieImage from "../../../assets/People/christie.jpg";
import MaggieImage from "../../../assets/People/maggie.jpg";
import SebastianImage from "../../../assets/People/sebastian.jpg";
import KieraImage from "../../../assets/People/kiera.jpg";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhoneFlip,
  FaGitlab,
} from "react-icons/fa6";

export default function Team() {
  return (
    <section id="team">
      <h1>Meet the Team!</h1>
      <div className="meet-the-team">
        <div className="team-member-div">
          <img src={NikoImage} alt="Niko Purdie" loading="lazy" />
          <h2>Niko Purdie</h2>
          <div className="team-socials">
            <a
              href="mailto:niko@kiwihacks.org"
              aria-label="Email"
              target="_blank"
              rel="noreferrer"
            >
              <FaEnvelope />
            </a>
            <a
              href="tel:0221350419"
              aria-label="Phone"
              target="_blank"
              rel="noreferrer"
            >
              <FaPhoneFlip />
            </a>
            <a
              href="https://www.instagram.com/niko_p101/?hl=en"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/nikopurdie?originalSubdomain=nz"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/N1k0s1"
              aria-label="Github"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
          </div>
          <p>
            I'm a 17 year old coder from Sacred Heart College and the lead
            organiser of KiwiHacks. This is the fourth hackathon I've
            organized for students in Auckland! I'm passionate about both
            sailing and coding, and I'm super excited to help create an
            awesome experience for everyone who attends!!
          </p>
        </div>

        <div className="team-member-div">
          <img
            src={SebastianImage}
            alt="Sebastian Johnson"
            loading="lazy"
          />
          <h2>Sebastian Johnson</h2>
          <div className="team-socials">
            <a
              href="mailto:pakkid@stuffandthings.cc"
              aria-label="Email"
              target="_blank"
              rel="noreferrer"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://www.instagram.com/le_snakey"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/sebastian-johnson-61389138b"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/pakkid"
              aria-label="Github"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
          </div>
          <p>
            I'm a 15 year old student from Pakuranga College helping out
            with the website and technical infrastructure for KiwiHacks. I'm
            passionate about technology, AV, and building cool systems that
            make events run smoothly. I'm excited to help bring KiwiHacks to
            life and see the amazing projects people create during the
            hackathon!
          </p>
        </div>

        <div className="team-member-div">
          <img src={JoshImage} alt="Josh Palmer" loading="lazy" />
          <h2>Josh Palmer</h2>
          <div className="team-socials">
            <a
              href="mailto:josh@kiwihacks.org"
              aria-label="Email"
              target="_blank"
              rel="noreferrer"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://www.linkedin.com/in/josh-palmer-b9942237b/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/heycastawhat"
              aria-label="Github"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://gitlab.com/castawhat"
              aria-label="GitLab"
              target="_blank"
              rel="noreferrer"
            >
              <FaGitlab />
            </a>
          </div>
          <p>
            I'm a 14 year old scout from Selwyn College leading outreach +
            helping out the website. I'm passionate about coding & learning.
            I love the thrill of getting a project finally working & I'm
            super excited to see what people create at KiwiHacks!
          </p>
        </div>

        <div className="team-member-div">
          <img src={KyleImage} alt="Kyle Bendall" loading="lazy" />
          <h2>Kyle Bendall</h2>
          <div className="team-socials">
            <a
              href="mailto:kyle@kiwihacks.org"
              aria-label="Email"
              target="_blank"
              rel="noreferrer"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://linkedin.com/in/kyle-b-134a48390"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/Dekoder-py"
              aria-label="Github"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://gitlab.com/dekoder-py"
              aria-label="GitLab"
              target="_blank"
              rel="noreferrer"
            >
              <FaGitlab />
            </a>
          </div>
          <p>
            I'm a 16 year old coder from Marcellin College leading website
            building and helping with outreach. I'm passionate about coding
            and learning (and playing video games). I'm excited to help
            people create something cool at KiwiHacks!
          </p>
        </div>

        <div className="team-member-div">
          <img
            src={ChristieImage}
            alt="Christie Berenshteyn"
            loading="lazy"
          />
          <h2>Christie Berenshteyn</h2>
          <div className="team-socials">
            <a
              href="mailto:christie@kiwihacks.org"
              aria-label="Email"
              target="_blank"
              rel="noreferrer"
            >
              <FaEnvelope />
            </a>
            {/* <a href="https://www.linkedin.com/in/christie-berenshteyn-3b3b3b/" aria-label="LinkedIn" target="_blank" rel="noreferrer"><FaLinkedin /></a> */}
            <a
              href="https://github.com/Christie125"
              aria-label="Github"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
          </div>
          <p>
            I'm a Year 11 Glendowie College student helping with outreach
            and marketing, among other things. Outside of coding, I enjoy
            playing the piano, baking, learning new things, and leading
            several school clubs. I'm really excited to make KiwiHacks New
            Zealand's BEST hackathon!
          </p>
        </div>

        <div className="team-member-div">
          <img src={MaggieImage} alt="Maggie Berenshteyn" loading="lazy" />
          <h2>Maggie Berenshteyn</h2>
          <div className="team-socials">
            <a
              href="mailto:maggie.berenshteyn@gmail.com"
              aria-label="Email"
              target="_blank"
              rel="noreferrer"
            >
              <FaEnvelope />
            </a>
            {/* <a href="https://www.linkedin.com/in/maggie-berenshteyn-3b3b3b/" aria-label="LinkedIn" target="_blank" rel="noreferrer"><FaLinkedin /></a>
          <a href="https://github.com/MaggieBerenshteyn" aria-label="Github" target="_blank" rel="noreferrer"><FaGithub /></a> */}
          </div>
          <p>
            I'm a 15 year old student from Glendowie College who organises
            the social media and advertising for KiwiHacks. I'm excited to
            help spread the word about KiwiHacks to make it a super fun
            event for everyone!
          </p>
        </div>

        <div className="team-member-div">
          <img src={KieraImage} alt="Kiera Langridge" loading="lazy" />
          <h2>Kiera Langridge</h2>
          <div className="team-socials">
            <a
              href="mailto:kiera.langridge@gmail.com"
              aria-label="Email"
              target="_blank"
              rel="noreferrer"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://www.linkedin.com/in/kiera-langridge-459098322/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
            {/* <a href="https://github.com/KieraLangridge" aria-label="Github" target="_blank" rel="noreferrer"><FaGithub /></a> */}
          </div>
          <p>
            I'm a 16 year old student from Baradene College helping out with
            outreach and branding. I'm passionate about learning, writing,
            and coding awesome projects. I can't wait to see what people
            create at KiwiHacks, and I'm so excited to help bring the event
            to life!
          </p>
        </div>
      </div>
    </section>
  );
}
