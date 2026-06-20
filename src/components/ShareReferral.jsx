import { useState } from 'react'
export default function ShareReferral({ referral }) {
  const [copied, setCopied] = useState('')
  const copy = async (text, which) => {
    try {
      await navigator.clipboard.writeText(text || '')
      setCopied(which)
      setTimeout(() => setCopied(''), 1500)
    } catch {
    }
  }
  return (
    <section className="section share" aria-label="Share referral">
      <h2 className="section-title">Refer friends and earn more</h2>
      <div className="share-row">
        <label htmlFor="referral-link">Your Referral Link</label>
        <div className="share-control">
          <input
            id="referral-link"
            type="text"
            readOnly
            value={referral.link || ''}
          />
          <button
            type="button"
            className="btn"
            onClick={() => copy(referral.link, 'link')}
          >
            Copy
          </button>
        </div>
      </div>
      <div className="share-row">
        <label htmlFor="referral-code">Your Referral Code</label>
        <div className="share-control">
          <input
            id="referral-code"
            type="text"
            readOnly
            value={referral.code || ''}
          />
          <button
            type="button"
            className="btn"
            onClick={() => copy(referral.code, 'code')}
          >
            Copy
          </button>
        </div>
      </div>
      <span className="copied-note" role="status" aria-live="polite">
        {copied === 'link' ? 'Link copied!' : copied === 'code' ? 'Code copied!' : ''}
      </span>
    </section>
  )
}
