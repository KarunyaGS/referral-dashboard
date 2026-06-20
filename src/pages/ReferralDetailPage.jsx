import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { fetchReferralById } from '../api.js'
import { formatDate, formatProfit } from '../format.js'
export default function ReferralDetailPage() {
  const { id } = useParams()
  const [row, setRow] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  useEffect(() => {
    let active = true
    setLoading(true)
    setNotFound(false)
    fetchReferralById(id)
      .then((found) => {
        if (!active) return
        if (found) setRow(found)
        else setNotFound(true)
      })
      .catch(() => {
        if (active) setNotFound(true)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [id])
  return (
    <>
      <Navbar />
      <main className="container detail">
        <h1>Referral Details</h1>
        {loading && <p className="state-msg">Loading…</p>}
        {!loading && notFound && (
          <div className="section">
            <h2>Referral not found</h2>
            <p className="state-msg">
              We couldn’t find a referral for this link.
            </p>
            <Link to="/" className="btn btn-primary">
              <span aria-hidden="true">←</span> Back to dashboard
            </Link>
          </div>
        )}
        {!loading && !notFound && row && (
          <div className="section">
            <h2 className="detail-name">{row.name}</h2>
            <dl className="detail-list">
              <div className="detail-item">
                <dt>Referral ID</dt>
                <dd>{row.id}</dd>
              </div>
              <div className="detail-item">
                <dt>Service Name</dt>
                <dd>{row.serviceName}</dd>
              </div>
              <div className="detail-item">
                <dt>Date</dt>
                <dd>{formatDate(row.date)}</dd>
              </div>
              <div className="detail-item">
                <dt>Profit</dt>
                <dd>{formatProfit(row.profit)}</dd>
              </div>
            </dl>
            <Link to="/" className="back-link">
              <span aria-hidden="true">←</span> Back to dashboard
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
