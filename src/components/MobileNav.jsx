import { Link, useLocation } from 'react-router-dom'
import { Home, Search, Library, User, Settings } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function MobileNav() {
  const location = useLocation()
  const { user } = useAuth()
  
  const isActive = (path) => location.pathname === path
  
  return (
    <div className="bg-surface border-t border-theme">
      <div className="flex justify-around">
        <Link 
          to="/" 
          className={`flex flex-col items-center py-3 px-5 ${
            isActive('/') ? 'text-primary' : 'text-secondary'
          }`}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          to="/search" 
          className={`flex flex-col items-center py-3 px-5 ${
            isActive('/search') ? 'text-primary' : 'text-secondary'
          }`}
        >
          <Search size={20} />
          <span className="text-xs mt-1">Search</span>
        </Link>
        
        <Link 
          to="/library" 
          className={`flex flex-col items-center py-3 px-5 ${
            isActive('/library') ? 'text-primary' : 'text-secondary'
          }`}
        >
          <Library size={20} />
          <span className="text-xs mt-1">Library</span>
        </Link>
        
        <Link 
          to={user ? "/profile" : "/login"} 
          className={`flex flex-col items-center py-3 px-5 ${
            isActive('/login') || isActive('/profile') || isActive('/register') ? 'text-primary' : 'text-secondary'
          }`}
        >
          <User size={20} />
          <span className="text-xs mt-1">{user ? 'Profile' : 'Login'}</span>
        </Link>
        
        <Link 
          to="/settings" 
          className={`flex flex-col items-center py-3 px-5 ${
            isActive('/settings') ? 'text-primary' : 'text-secondary'
          }`}
        >
          <Settings size={20} />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </div>
  )
}

export default MobileNav
