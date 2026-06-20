import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { SIGNIN_URL, TOKEN_COOKIE } from '../config.js'
export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  if (Cookies.get(TOKEN_COOKIE)) {
    return <Navigate to="/" replace />
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const response = await fetch(SIGNIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const responseJson = await response.json()
      if (response.ok) {
        const token = responseJson.data.token
        Cookies.set(TOKEN_COOKIE, token)
        navigate('/')
      } else {
        setError(responseJson.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <main className="login-screen">
      <section className="login-card">
        <h1 className="brand">Go Business</h1>
        <p className="tagline">Sign in to open your referral dashboard.</p>
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn btn-primary">
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </section>
    </main>
  )
}
