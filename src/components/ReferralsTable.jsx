import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchReferrals } from '../api.js'
import { formatDate, formatProfit } from '../format.js'
const PAGE_SIZE = 10
export default function ReferralsTable() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [sort, setSort] = useState('desc') 
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350)
    return () => clearTimeout(t)
  }, [search])
  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    fetchReferrals({ search: debouncedSearch, sort })
      .then((data) => {
        if (!active) return
        setRows(data.referrals)
      })
      .catch((err) => {
        if (!active) return
        const status = err.status ? ` (status ${err.status})` : ''
        setError(`${err.message}${status}`)
        setRows([])
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [debouncedSearch, sort])
  const total = rows.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * PAGE_SIZE
  const pageRows = rows.slice(start, start + PAGE_SIZE)
  const from = total === 0 ? 0 : start + 1
  const to = Math.min(start + PAGE_SIZE, total)
  const goTo = (id) => navigate(`/referral/${id}`)
  return (
    <section className="section" aria-label="All referrals">
      <h2 className="section-title">All referrals</h2>
      <div className="table-controls">
        <input
          type="search"
          className="search-input"
          placeholder="Name or service…"
          aria-label="Search referrals"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label className="sort-control">
          Sort by date
          <select
            aria-label="Sort by date"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </label>
      </div>
      {loading && <p className="state-msg">Loading…</p>}
      {error && (
        <p className="state-msg error" role="alert">
          {error}
        </p>
      )}
      {!loading && !error && (
        <>
          <div className="table-wrap">
            <table className="referrals-table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Service</th>
                  <th scope="col">Date</th>
                  <th scope="col">Profit</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="empty-row">
                      No matching entries
                    </td>
                  </tr>
                ) : (
                  pageRows.map((row) => (
                    <tr
                      key={row.id}
                      className="data-row"
                      role="button"
                      tabIndex={0}
                      onClick={() => goTo(row.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          goTo(row.id)
                        }
                      }}
                    >
                      <td>{row.name}</td>
                      <td>{row.serviceName}</td>
                      <td>{formatDate(row.date)}</td>
                      <td>{formatProfit(row.profit)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <p className="showing">
              Showing {from}–{to} of {total} entries
            </p>
            <div className="pagination">
              <button
                type="button"
                className="btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
              >
                Previous
              </button>
              {totalPages > 1 &&
                Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    type="button"
                    key={n}
                    className={`btn page-btn${n === safePage ? ' active' : ''}`}
                    aria-current={n === safePage ? 'page' : undefined}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                ))}
              <button
                type="button"
                className="btn"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
