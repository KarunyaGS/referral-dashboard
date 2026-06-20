export default function ServiceSummary({ summary }) {
  const rows = [
    ['Service', summary.service],
    ['Your Referrals', summary.yourReferrals],
    ['Active Referrals', summary.activeReferrals],
    ['Total Ref. Earnings', summary.totalRefEarnings],
  ]
  return (
    <section className="section" aria-label="Service summary">
      <h2 className="section-title">Service summary</h2>
      <dl className="summary-grid">
        {rows.map(([label, value]) => (
          <div className="summary-item" key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
