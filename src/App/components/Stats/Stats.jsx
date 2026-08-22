import "./Stats.css";

const stats = [
  { value: "3", label: "cities" },
  { value: "100+", label: "teenage participants" },
  { value: "100%", label: "run by high schoolers" },
];

export default function Stats() {
  return (
    <section id="stats" className="stats">
      <h2>And now we&apos;re going national.</h2>

      <dl className="stats-grid">
        {stats.map(({ value, label }) => (
          <div key={label} className="stat">
            <dt>{value}</dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
