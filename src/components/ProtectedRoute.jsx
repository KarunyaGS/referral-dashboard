import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { TOKEN_COOKIE } from '../config.js'
export default function ProtectedRoute({ children }) {
  const token = Cookies.get(TOKEN_COOKIE)
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}
