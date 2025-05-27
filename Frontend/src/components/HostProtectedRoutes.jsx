import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function HostProtectedRoute({ children }) {
  const { isLoggedIn, user } = useAuth()

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  // If logged in but not a host, redirect to dashboard or another page
  if (user.role !== 'host') {
    return <Navigate to="/dashboard" replace />
  }

  // If logged in as a host, render the children
  return children
}

export default HostProtectedRoute
