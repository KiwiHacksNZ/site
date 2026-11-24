import "./Stories.css";
import StoryMeta from "./StoryMeta";

export default function Stories({ stories = [] }) {
  return (
    <main className="stories-main">
      <h1 className="stories-heading display">Stories</h1>
      {stories.length > 0 ? (
        <p className="stories-intro">
          The high schoolers behind the projects: what they built, how they got
          there, and what they learned along the way.
        </p>
      ) : (
        <p className="stories-empty">No stories yet. Check back soon.</p>
      )}
      <div className="stories-grid">
        {stories.map((story) => (
          <article className="story-card" key={story.slug}>
            {story.cover ? (
              <img
                className="story-card-image"
                src={story.cover.url}
                alt={story.cover.alt}
                loading="lazy"
              />
            ) : null}
            <h2 className="story-card-title display">
              {/* Stretched over the whole card in CSS, so the card is one link. */}
              <a href={`/showcase/stories/${story.slug}`}>{story.title}</a>
            </h2>
            <p className="story-card-summary">{story.summary}</p>
            <StoryMeta story={story} />
          </article>
        ))}
      </div>
    </main>
  );
}
