import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import "./Showcase.css";
import Navbar from "../Navbar/Navbar";
import { api } from "../../convex/_generated/api";
import { isConvexConfigured } from "../convexConfig";
import AppConvexProvider from "../ConvexProvider";
import {
  FaArrowUpRightFromSquare,
  FaChevronLeft,
  FaChevronRight,
  FaCodeBranch,
} from "react-icons/fa6";

const emptyProjects = [];

function AwardPill({ project, variant = "large" }) {
  return (
    <div className={`showcase-award showcase-award-${variant}`}>
      <span>{project.place}</span>
      <small>
        {project.event} - {project.points} points
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
      <a href={project.repoUrl} target="_blank" rel="noreferrer">
        <FaCodeBranch aria-hidden="true" />
        Repo
      </a>
      <a href={project.demoUrl} target="_blank" rel="noreferrer">
        <FaArrowUpRightFromSquare aria-hidden="true" />
        Demo
      </a>
    </div>
  );
}

function ShowcaseContent() {
  const convexReady = isConvexConfigured();
  const dbProjects = useQuery(
    api.projects.list,
    convexReady ? {} : "skip",
  );
  const isLoadingProjects = convexReady && dbProjects === undefined;
  const visibleProjects = dbProjects ?? emptyProjects;
  const featuredProjects = useMemo(
    () => {
      const featured = visibleProjects
        .filter((project) => project.featured)
        .slice(0, 3);
      return featured.length > 0 ? featured : visibleProjects.slice(0, 3);
    },
    [visibleProjects],
  );
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
        {isLoadingProjects ? (
          <section className="showcase-loading-state" aria-live="polite">
            <h1 className="display">Loading projects</h1>
            <p>Fetching the latest showcase entries.</p>
          </section>
        ) : activeProject ? (
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
                src={activeProject.imageUrl || activeProject.image}
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
                      key={project._id || project.id}
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
            <h1 className="display">No projects yet</h1>
            <p>Projects will appear here after they are added to the showcase.</p>
          </section>
        )}

        {!isLoadingProjects && visibleProjects.length > 0 ? (
          <section className="showcase-projects-section">
            <div className="showcase-project-grid">
              {visibleProjects.map((project) => (
                <article className="showcase-project-card" key={project._id || project.id}>
                  <img
                    src={project.imageUrl || project.image}
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

export default function Showcase() {
  return (
    <AppConvexProvider>
      <ShowcaseContent />
    </AppConvexProvider>
  );
}
