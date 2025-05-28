import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function HostProtectedRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to="/hostlogin" replace />;
  }
  return children;
}

export { ProtectedRoute, HostProtectedRoute };
