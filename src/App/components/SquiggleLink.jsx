import { useSquiggle } from "../useSquiggle";

export default function SquiggleLink({
  light = false,
  className = "",
  children,
  ...rest
}) {
  const ref = useSquiggle({ light });

  return (
    <a
      {...rest}
      ref={ref}
      className={`squiggle${light ? " squiggle-light" : ""} ${className}`.trim()}
    >
      {children}
    </a>
  );
}
