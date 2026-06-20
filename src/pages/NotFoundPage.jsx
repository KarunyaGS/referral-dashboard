import { Link } from 'react-router-dom'
export default function NotFoundPage() {
  return (
    <main className="notfound">
      <p className="notfound-code">404</p>
      <h1 className="notfound-title">Page not found</h1>
      <p className="notfound-text">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to dashboard
      </Link>
    </main>
  )
}
