import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { LogOut, Edit2, User as UserIcon } from 'lucide-react'

function Profile() {
  const { user, signOut } = useAuth()
  const [loading, setLoading] = useState(false)
  
  // Mock user stats
  const stats = {
    playlists: 12,
    following: 45,
    followers: 23,
  }
  
  // Mock recently played
  const recentlyPlayed = [
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600', playedAt: '2 hours ago' },
    { id: 2, title: 'Save Your Tears', artist: 'The Weeknd', cover: 'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=600', playedAt: 'Yesterday' },
    { id: 3, title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', cover: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=600', playedAt: '2 days ago' },
  ]
  
  const handleSignOut = async () => {
    try {
      setLoading(true)
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-dark text-4xl font-bold">
            {user.email?.charAt(0).toUpperCase() || <UserIcon size={40} />}
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-1">Profile</h1>
            <p className="text-gray-400">{user.email}</p>
            
            <div className="flex gap-6 mt-3 text-sm">
              <div>
                <span className="font-bold">{stats.playlists}</span> Playlists
              </div>
              <div>
                <span className="font-bold">{stats.following}</span> Following
              </div>
              <div>
                <span className="font-bold">{stats.followers}</span> Followers
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button className="px-4 py-2 rounded-full border border-gray-600 text-sm font-medium flex items-center gap-2 hover:border-white transition">
            <Edit2 size={16} />
            Edit Profile
          </button>
          
          <button 
            onClick={handleSignOut}
            disabled={loading}
            className="px-4 py-2 rounded-full border border-gray-600 text-sm font-medium flex items-center gap-2 hover:border-white transition disabled:opacity-50"
          >
            <LogOut size={16} />
            {loading ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </div>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recently Played</h2>
        <div className="bg-dark-light rounded-lg overflow-hidden">
          {recentlyPlayed.map((track, index) => (
            <div 
              key={track.id}
              className="flex items-center p-3 hover:bg-dark-lighter transition"
            >
              <div className="w-8 text-center text-gray-400 mr-3">
                {index + 1}
              </div>
              <img 
                src={track.cover} 
                alt={track.title} 
                className="w-12 h-12 object-cover rounded mr-3"
              />
              <div className="flex-1">
                <h4 className="font-medium">{track.title}</h4>
                <p className="text-sm text-gray-400">{track.artist}</p>
              </div>
              <div className="text-sm text-gray-400">
                {track.playedAt}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <div className="bg-dark-light rounded-lg p-4">
          <div className="mb-4 pb-4 border-b border-dark-lighter">
            <h3 className="font-medium mb-1">Email</h3>
            <p className="text-gray-400">{user.email}</p>
          </div>
          
          <div className="mb-4 pb-4 border-b border-dark-lighter">
            <h3 className="font-medium mb-1">Password</h3>
            <p className="text-gray-400">••••••••</p>
            <button className="text-primary text-sm mt-2 hover:underline">
              Change password
            </button>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Subscription</h3>
            <p className="text-gray-400">Free Plan</p>
            <button className="bg-primary text-white rounded-full px-4 py-2 text-sm font-medium mt-3 hover:bg-primary/90 transition">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile
