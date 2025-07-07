import { Link, useLocation } from 'react-router-dom'
import { Home, Search, Library, PlusCircle, Heart, User, LogOut, Settings } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import ThemeSelector from './ThemeSelector'

function Sidebar() {
  const location = useLocation()
  const { user, signOut } = useAuth()
  
  const isActive = (path) => location.pathname === path
  
  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }
  
  return (
    <div className="h-full bg-surface flex flex-col transition-colors">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text">Melody Mix</h1>
        </div>
      </div>
      
      <nav className="mt-2 flex-1">
        <ul>
          <li>
            <Link
              to="/"
              className={`flex items-center gap-3 px-6 py-3 hover:bg-surface-highlight transition-colors ${
                isActive('/') ? 'text-primary font-medium' : 'text-secondary'
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className={`flex items-center gap-3 px-6 py-3 hover:bg-surface-highlight transition-colors ${
                isActive('/search') ? 'text-primary font-medium' : 'text-secondary'
              }`}
            >
              <Search size={20} />
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link
              to="/library"
              className={`flex items-center gap-3 px-6 py-3 hover:bg-surface-highlight transition-colors ${
                isActive('/library') ? 'text-primary font-medium' : 'text-secondary'
              }`}
            >
              <Library size={20} />
              <span>Your Library</span>
            </Link>
          </li>
        </ul>
        
        <div className="mt-8 px-6">
          <div className="pt-6 border-t border-theme">
            <button className="flex items-center gap-3 text-secondary hover:text-white transition-colors w-full py-2">
              <PlusCircle size={20} />
              <span>Create Playlist</span>
            </button>
            <button className="flex items-center gap-3 text-secondary hover:text-white transition-colors mt-4 w-full py-2">
              <Heart size={20} />
              <span>Liked Songs</span>
            </button>
          </div>
        </div>
        
        <div className="mt-auto px-6 mb-4">
          <ThemeSelector />
        </div>
      </nav>
      
      <div className="p-6 border-t border-theme">
        {user ? (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-surface-highlight flex items-center justify-center text-primary font-bold">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <span className="block font-medium truncate">{user.email.split('@')[0]}</span>
                <span className="block text-sm text-secondary truncate">{user.email}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Link
                to="/profile"
                className={`flex items-center gap-3 py-2 px-3 rounded-md ${
                  isActive('/profile') ? 'bg-surface-highlight text-primary' : 'text-secondary hover:text-white hover:bg-surface-highlight'
                } transition-colors`}
              >
                <User size={18} />
                <span>Profile</span>
              </Link>
              
              <Link
                to="/settings"
                className={`flex items-center gap-3 py-2 px-3 rounded-md ${
                  isActive('/settings') ? 'bg-surface-highlight text-primary' : 'text-secondary hover:text-white hover:bg-surface-highlight'
                } transition-colors`}
              >
                <Settings size={18} />
                <span>Settings</span>
              </Link>
              
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 py-2 px-3 rounded-md text-secondary hover:text-white hover:bg-surface-highlight transition-colors"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <Link
              to="/login"
              className="block w-full py-2 text-center rounded-full bg-white text-black font-medium hover:bg-opacity-90 transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="block w-full py-2 text-center rounded-full border border-white text-white font-medium hover:bg-white/10 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
