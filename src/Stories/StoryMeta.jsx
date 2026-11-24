import { tagTitle } from "../sanity/storyOptions";

// The tag pills and the "Year 12 · School · Region" line, shared by the story
// cards and the story page so both always describe a story the same way.
export default function StoryMeta({ story }) {
  const details = [
    story.yearLevel ? `Year ${story.yearLevel}` : null,
    story.school,
    story.region,
  ].filter(Boolean);

  return (
    <div className="story-meta">
      <ul className="story-tags" aria-label="Tags">
        {(story.tags ?? []).map((tag) => (
          <li className="story-tag" key={tag}>
            {tagTitle(tag)}
          </li>
        ))}
      </ul>
      {details.length > 0 ? (
        <p className="story-details">{details.join(" · ")}</p>
      ) : null}
    </div>
  );
}
