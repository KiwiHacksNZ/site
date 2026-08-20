import { useMemo, useState } from "react";
import "./Showcase.css";
import Navbar from "../Navbar/Navbar";
import {
  FaArrowUpRightFromSquare,
  FaChevronLeft,
  FaChevronRight,
  FaCodeBranch,
} from "react-icons/fa6";

function AwardPill({ project, variant = "large" }) {
  if (!project.place && !project.event) {
    return null;
  }

  return (
    <div className={`showcase-award showcase-award-${variant}`}>
      <span>{project.place}</span>
      <small>
        {project.event}
        {typeof project.points === "number" ? ` - ${project.points} points` : null}
      </small>
    </div>
  );
}

function ProjectActions({ project, compact = false }) {
  const className = compact
    ? "showcase-project-actions showcase-project-actions-compact"
    : "showcase-project-actions";

  return (
    <div className={className}>
      {project.repoUrl ? (
        <a href={project.repoUrl} target="_blank" rel="noreferrer">
          <FaCodeBranch aria-hidden="true" />
          Repo
        </a>
      ) : null}
      {project.demoUrl ? (
        <a href={project.demoUrl} target="_blank" rel="noreferrer">
          <FaArrowUpRightFromSquare aria-hidden="true" />
          Demo
        </a>
      ) : null}
    </div>
  );
}

export default function Showcase({ projects = [] }) {
  const featuredProjects = useMemo(() => {
    const featured = projects.filter((project) => project.featured).slice(0, 3);
    return featured.length > 0 ? featured : projects.slice(0, 3);
  }, [projects]);

  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const activeProject =
    featuredProjects[Math.min(activeFeaturedIndex, featuredProjects.length - 1)];
  const hasMultipleFeaturedProjects = featuredProjects.length > 1;

  const showPreviousProject = () => {
    setActiveFeaturedIndex((index) =>
      index === 0 ? featuredProjects.length - 1 : index - 1,
    );
  };

  const showNextProject = () => {
    setActiveFeaturedIndex((index) =>
      index === featuredProjects.length - 1 ? 0 : index + 1,
    );
  };

  return (
    <>
      <Navbar />

      <main className="showcase-main">
        {activeProject ? (
          <section className="showcase-hero-carousel" aria-label="Featured projects">
            {hasMultipleFeaturedProjects ? (
              <button
                className="showcase-carousel-arrow showcase-carousel-arrow-left"
                type="button"
                onClick={showPreviousProject}
                aria-label="Previous featured project"
              >
                <FaChevronLeft aria-hidden="true" />
              </button>
            ) : null}

            <article className="showcase-featured-card">
              <img
                src={activeProject.imageUrl}
                alt={`${activeProject.title} project screenshot`}
                className="showcase-featured-image"
                draggable="false"
              />
              <div className="showcase-featured-details">
                <h1 className="showcase-featured-title display">
                  {activeProject.title}
                </h1>
                <p className="showcase-project-team">{activeProject.team}</p>
                <p className="showcase-project-description">
                  {activeProject.description}
                </p>
                <AwardPill project={activeProject} />
                <ProjectActions project={activeProject} />
              </div>
            </article>

            {hasMultipleFeaturedProjects ? (
              <>
                <button
                  className="showcase-carousel-arrow showcase-carousel-arrow-right"
                  type="button"
                  onClick={showNextProject}
                  aria-label="Next featured project"
                >
                  <FaChevronRight aria-hidden="true" />
                </button>

                <div className="showcase-carousel-dots" aria-label="Featured project position">
                  {featuredProjects.map((project, index) => (
                    <button
                      className={index === activeFeaturedIndex ? "active" : ""}
                      key={project.id}
                      type="button"
                      onClick={() => setActiveFeaturedIndex(index)}
                      aria-label={`Show ${project.title}`}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </section>
        ) : (
          <section className="showcase-empty-state">
            <h1 className="display">Nova projects are coming soon</h1>
            <p>
              KiwiHacks Nova runs in Wellington, Christchurch, and Auckland this
              September and October. Winning and standout projects from each
              event will be added here after they wrap up. In the meantime, see
              what past KiwiHackers have built on our{" "}
              <a href="https://github.com/orgs/KiwiHacksNZ" target="_blank" rel="noreferrer">
                GitHub
              </a>{" "}
              or follow along on{" "}
              <a href="https://www.instagram.com/kiwihacks/" target="_blank" rel="noreferrer">
                Instagram
              </a>
              .
            </p>
          </section>
        )}

        {projects.length > 0 ? (
          <section className="showcase-projects-section">
            <div className="showcase-project-grid">
              {projects.map((project) => (
                <article className="showcase-project-card" key={project.id}>
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} project screenshot`}
                    className="showcase-project-image"
                    loading="lazy"
                    draggable="false"
                  />
                  <div className="showcase-project-body">
                    <h3>{project.title}</h3>
                    <p className="showcase-project-team">{project.team}</p>
                    <p className="showcase-project-description">
                      {project.description}
                    </p>
                    <div className="showcase-project-card-footer">
                      <ProjectActions project={project} compact />
                      <AwardPill project={project} variant="small" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
