import "./Team.css";
import { teamMembers } from "./teamMembers";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhoneFlip,
  FaGitlab,
} from "react-icons/fa6";

const socialIcons = {
  email: FaEnvelope,
  phone: FaPhoneFlip,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  github: FaGithub,
  gitlab: FaGitlab,
};

function isExternalLink(href) {
  return href.startsWith("http");
}

export function TeamMemberCard({ member }) {
  return (
    <article className="team-member-div">
      <img src={member.image} alt={member.name} loading="lazy" />
      <h2>{member.name}</h2>
      <div className="team-socials">
        {member.links.map((link) => {
          const Icon = socialIcons[link.type];
          return (
            <a
              key={`${member.name}-${link.type}`}
              className={`team-social team-social-${link.type}`}
              href={link.href}
              aria-label={link.label}
              target={isExternalLink(link.href) ? "_blank" : undefined}
              rel={isExternalLink(link.href) ? "noreferrer" : undefined}
            >
              <Icon aria-hidden="true" />
            </a>
          );
        })}
      </div>
      <p>{member.bio}</p>
    </article>
  );
}

export default function Team({ heading = "Meet the Team!" }) {
  return (
    <section id="team">
      {heading ? <h1>{heading}</h1> : null}
      <div className="meet-the-team">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}
