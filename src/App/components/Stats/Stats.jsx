import "./Stats.css";

const stats = [
  { value: "3", label: "cities running events" },
  { value: "100+", label: "teenage participants" },
  { value: "100%", label: "run by high schoolers" },
];

export default function Stats() {
  return (
    <section id="stats" className="stats">
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
