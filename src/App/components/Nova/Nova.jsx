import "./Nova.css";

const stats = [
  { value: "3", label: "events" },
  { value: "300+", label: "teenage participants" },
  { value: "100%", label: "run by high schoolers" },
];

export default function Nova() {
  return (
    <section id="nova" className="nova">
      <h2>But for Nova, we&apos;re going national.</h2>

      <dl className="nova-stats">
        {stats.map(({ value, label }) => (
          <div key={label} className="nova-stat">
            <dt>{value}</dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
