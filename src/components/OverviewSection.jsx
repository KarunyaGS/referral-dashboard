export default function OverviewSection({ metrics }) {
  return (
    <section className="section" role="region" aria-label="Overview metrics">
      <h2 className="section-title">Overview</h2>
      <div className="metrics-grid">
        {metrics.map((m, idx) => (
          <div className="metric-card" key={m.id ?? idx}>
            <p className="metric-label">{m.label}</p>
            <p className="metric-value">{m.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
