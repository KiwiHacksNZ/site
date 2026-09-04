import { useSquiggle } from "../useSquiggle";

export default function SquiggleLink({ className = "", children, ...rest }) {
  const { link, path, height } = useSquiggle();

  return (
    <a {...rest} ref={link} className={`squiggle ${className}`.trim()}>
      {children}
      <svg
        className="squiggle-line"
        height={height}
        aria-hidden="true"
        focusable="false"
      >
        <path ref={path} />
      </svg>
    </a>
  );
}
