import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { TOKEN_COOKIE } from '../config.js'
export default function Navbar() {
  const navigate = useNavigate()
  const handleLogout = () => {
    Cookies.remove(TOKEN_COOKIE)
    navigate('/login')
  }
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" aria-label="Go to dashboard home">
          Go Business
        </Link>
        <nav aria-label="Primary" className="navbar-nav">
          <Link to="/">Home</Link>
        </nav>
        <button type="button" className="btn" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  )
}
