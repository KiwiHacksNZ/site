import { PortableText } from "@portabletext/react";
import "./Stories.css";
import StoryMeta from "./StoryMeta";

// Body images arrive with their URL already built (see src/sanity/stories.js),
// so rendering needs no Sanity client.
const components = {
  types: {
    image: ({ value }) => (
      <figure className="story-figure">
        <img src={value.url} alt={value.alt} loading="lazy" />
        {value.caption ? <figcaption>{value.caption}</figcaption> : null}
      </figure>
    ),
  },
};

export default function StoryPage({ story }) {
  return (
    <main className="story-page">
      <header className="story-page-header">
        <h1 className="story-page-title display">{story.title}</h1>
        <StoryMeta story={story} />
      </header>
      {story.cover ? (
        <figure className="story-cover">
          <img src={story.cover.url} alt={story.cover.alt} />
          {story.cover.creditLine ? <figcaption>{story.cover.creditLine}</figcaption> : null}
        </figure>
      ) : null}
      <div className="story-body">
        <PortableText value={story.body} components={components} />
      </div>
    </main>
  );
}
