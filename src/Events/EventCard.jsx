import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import SquiggleLink from "../App/components/SquiggleLink";

// Same card as "Built at our hackathons" on the homepage (Projects.css).
export default function EventCard({ event, hidden = false }) {
  const external = event.url?.startsWith("http");

  return (
    <li className="project-card" aria-hidden={hidden || undefined} inert={hidden || undefined}>
      <img className="project-image" src={event.imageSrc} alt={event.imageAlt} loading="lazy" draggable="false" />
      <div className="project-body">
        <h3>{event.title}</h3>
        <p className="mono project-team">{event.when}</p>
        <p className="project-description">{event.summary}</p>
        <div className="project-actions">
          <SquiggleLink href={event.url} {...(external && { target: "_blank", rel: "noreferrer" })}>
            {external && <FaArrowUpRightFromSquare aria-hidden="true" />}
            {event.cta}
          </SquiggleLink>
        </div>
      </div>
    </li>
  );
}
