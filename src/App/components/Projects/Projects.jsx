import "./Projects.css";
import SquiggleLink from "../SquiggleLink";
import { FaArrowUpRightFromSquare, FaCodeBranch } from "react-icons/fa6";

export default function Projects({ projects = [] }) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="projects">
      <h2 className="mono">Made by Kiwi teens.</h2>
      <p className="projects-lede">
        Real projects built at our hackathons, by high schoolers who mostly
        hadn&apos;t met each other that morning.
      </p>

      <ul className="project-grid">
        {projects.map((project) => (
          <li key={project.id} className="project-card">
            {project.imageUrl ? (
              <img
                className="project-image"
                src={project.imageUrl}
                alt={`${project.title} screenshot`}
                loading="lazy"
                draggable="false"
              />
            ) : null}
            <div className="project-body">
              <h3>{project.title}</h3>
              <p className="mono project-team">
                {project.team}
                {project.event ? ` · ${project.event}` : null}
              </p>
              <p className="project-description">{project.description}</p>
              <div className="project-actions">
                {project.demoUrl ? (
                  <SquiggleLink href={project.demoUrl} target="_blank" rel="noreferrer">
                    <FaArrowUpRightFromSquare aria-hidden="true" />
                    Try it out
                  </SquiggleLink>
                ) : null}
                {project.repoUrl ? (
                  <SquiggleLink href={project.repoUrl} target="_blank" rel="noreferrer">
                    <FaCodeBranch aria-hidden="true" />
                    Source
                  </SquiggleLink>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <SquiggleLink className="projects-more" href="/showcase">
        See every project &rarr;
      </SquiggleLink>
    </section>
  );
}
