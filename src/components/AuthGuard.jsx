import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AuthGuard({ children, requireAuth = true }) {
  const { user } = useAuth()
  
  // If we require authentication and user is not logged in, redirect to login
  if (requireAuth && !user) {
    return <Navigate to="/login" replace />
  }
  
  // If we require guest (no auth) and user is logged in, redirect to home
  if (!requireAuth && user) {
    return <Navigate to="/" replace />
  }
  
  // Otherwise, render the children
  return children
}

export default AuthGuard
