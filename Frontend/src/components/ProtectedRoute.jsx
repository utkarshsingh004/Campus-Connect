import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />
  }

  return children
}

function HostProtectedRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/hostlogin" replace />;
  }

  return children;
}  

export { 
  ProtectedRoute,
  HostProtectedRoute
}