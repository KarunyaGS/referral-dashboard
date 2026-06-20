import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import OverviewSection from '../components/OverviewSection.jsx'
import ServiceSummary from '../components/ServiceSummary.jsx'
import ShareReferral from '../components/ShareReferral.jsx'
import ReferralsTable from '../components/ReferralsTable.jsx'
import { fetchReferrals } from '../api.js'
export default function DashboardPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    fetchReferrals()
      .then((d) => {
        if (active) setData(d)
      })
      .catch((err) => {
        if (!active) return
        const status = err.status ? ` (status ${err.status})` : ''
        setError(`${err.message}${status}`)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])
  return (
    <>
      <Navbar />
      <main className="container dashboard">
        <header className="page-header">
          <h1>Referral Dashboard</h1>
          <p className="page-subtitle">
            Track your referrals, earnings, and partner activity in one place.
          </p>
        </header>
        {loading && <p className="state-msg">Loading…</p>}
        {error && (
          <p className="state-msg error" role="alert">
            {error}
          </p>
        )}
        {!loading && !error && data && (
          <>
            <OverviewSection metrics={data.metrics} />
            <ServiceSummary summary={data.serviceSummary} />
            <ShareReferral referral={data.referral} />
            <ReferralsTable />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
