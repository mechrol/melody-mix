import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import AuthGuard from './components/AuthGuard'
import Home from './pages/Home'
import Search from './pages/Search'
import Library from './pages/Library'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

function App() {
  const { loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-app">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }
  
  return (
    <Routes>
      {/* Auth pages - only accessible when logged out */}
      <Route 
        path="/login" 
        element={
          <AuthGuard requireAuth={false}>
            <Login />
          </AuthGuard>
        } 
      />
      <Route 
        path="/register" 
        element={
          <AuthGuard requireAuth={false}>
            <Register />
          </AuthGuard>
        } 
      />
      <Route 
        path="/forgot-password" 
        element={
          <AuthGuard requireAuth={false}>
            <ForgotPassword />
          </AuthGuard>
        } 
      />
      <Route 
        path="/reset-password" 
        element={
          <AuthGuard requireAuth={false}>
            <ResetPassword />
          </AuthGuard>
        } 
      />
      
      {/* Main layout with nested routes */}
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        
        {/* Protected routes - require authentication */}
        <Route 
          path="library" 
          element={
            <AuthGuard requireAuth={true}>
              <Library />
            </AuthGuard>
          } 
        />
        <Route 
          path="profile" 
          element={
            <AuthGuard requireAuth={true}>
              <Profile />
            </AuthGuard>
          } 
        />
        <Route 
          path="settings" 
          element={<Settings />} 
        />
      </Route>
    </Routes>
  )
}

export default App
