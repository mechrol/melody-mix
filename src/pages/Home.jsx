import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Play, Clock, Heart } from 'lucide-react'

function Home() {
  const { user } = useAuth()
  const [featuredPlaylists, setFeaturedPlaylists] = useState([
    { id: 1, title: 'Today\'s Top Hits', description: 'The hottest tracks right now', cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 2, title: 'Chill Vibes', description: 'Laid back beats for relaxation', cover: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 3, title: 'Workout Mix', description: 'Energy boosting tracks for your workout', cover: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 4, title: 'Focus Flow', description: 'Concentration enhancing music', cover: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 5, title: 'Throwback Hits', description: 'Classic tracks from the past', cover: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ])
  
  const [recentlyPlayed, setRecentlyPlayed] = useState([
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 2, title: 'Save Your Tears', artist: 'The Weeknd', cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 3, title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', cover: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ])
  
  const [newReleases, setNewReleases] = useState([
    { id: 1, title: 'Planet Her', artist: 'Doja Cat', cover: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 2, title: 'SOUR', artist: 'Olivia Rodrigo', cover: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 3, title: 'Justice', artist: 'Justin Bieber', cover: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 4, title: 'Happier Than Ever', artist: 'Billie Eilish', cover: 'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 5, title: 'Montero', artist: 'Lil Nas X', cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ])
  
  const [topTracks, setTopTracks] = useState([
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', plays: '1.2B' },
    { id: 2, title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', duration: '3:35', plays: '980M' },
    { id: 3, title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', album: 'F*CK LOVE 3', duration: '2:21', plays: '875M' },
    { id: 4, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23', plays: '820M' },
    { id: 5, title: 'good 4 u', artist: 'Olivia Rodrigo', album: 'SOUR', duration: '2:58', plays: '790M' },
  ])
  
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (isLoading) {
    return (
      <div className="p-6 animate-fade-in">
        {/* Skeleton loader */}
        <div className="h-8 w-64 bg-surface-highlight rounded-md mb-8"></div>
        
        <div className="mb-8">
          <div className="h-6 w-48 bg-surface-highlight rounded-md mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-surface rounded-lg p-3">
                <div className="w-full aspect-square bg-surface-highlight rounded-md mb-3"></div>
                <div className="h-4 w-3/4 bg-surface-highlight rounded-md mb-2"></div>
                <div className="h-3 w-1/2 bg-surface-highlight rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="p-6 animate-fade-in">
      {/* Welcome section with gradient background */}
      <div className="relative mb-8 p-6 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-500/30"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            {user ? `Welcome back, ${user.email.split('@')[0]}!` : 'Welcome to Melody Mix'}
          </h1>
          {!user && (
            <p className="text-secondary text-lg">
              Discover and enjoy your favorite music. 
              <Link to="/login" className="text-primary hover:underline ml-1 font-medium">
                Log in
              </Link> or 
              <Link to="/register" className="text-primary hover:underline ml-1 font-medium">
                sign up
              </Link> to create playlists and save your favorites.
            </p>
          )}
        </div>
      </div>
      
      {/* Featured playlists */}
      <section className="mb-10 animate-slide-up" style={{animationDelay: '0.1s'}}>
        <h2 className="text-xl font-bold mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featuredPlaylists.map((playlist) => (
            <div 
              key={playlist.id}
              className="bg-surface p-4 rounded-lg card-hover group"
            >
              <div className="relative mb-4">
                <img 
                  src={playlist.cover} 
                  alt={playlist.title} 
                  className="w-full aspect-square object-cover rounded-md shadow-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                  <button className="bg-primary text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all shadow-lg hover:scale-105">
                    <Play size={24} fill="currentColor" />
                  </button>
                </div>
              </div>
              <h3 className="font-bold truncate">{playlist.title}</h3>
              <p className="text-sm text-secondary truncate">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Top tracks section */}
      <section className="mb-10 animate-slide-up" style={{animationDelay: '0.2s'}}>
        <h2 className="text-xl font-bold mb-4">Top Tracks</h2>
        <div className="bg-surface rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-theme">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-secondary">#</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-secondary">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-secondary hidden md:table-cell">Album</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-secondary hidden md:table-cell">Plays</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-secondary">
                  <Clock size={16} />
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-secondary"></th>
              </tr>
            </thead>
            <tbody>
              {topTracks.map((track, index) => (
                <tr 
                  key={track.id} 
                  className="hover:bg-surface-highlight transition-colors group"
                >
                  <td className="px-4 py-3 text-secondary group-hover:text-white">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div>
                        <div className="font-medium group-hover:text-primary transition-colors">{track.title}</div>
                        <div className="text-sm text-secondary">{track.artist}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-secondary hidden md:table-cell">{track.album}</td>
                  <td className="px-4 py-3 text-secondary hidden md:table-cell">{track.plays}</td>
                  <td className="px-4 py-3 text-secondary text-right">{track.duration}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary">
                      <Heart size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
      {/* Recently played - only show if user is logged in */}
      {user && (
        <section className="mb-10 animate-slide-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-xl font-bold mb-4">Recently Played</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentlyPlayed.map((track) => (
              <div 
                key={track.id}
                className="flex items-center bg-surface p-3 rounded-lg card-hover group"
              >
                <div className="relative mr-3">
                  <img 
                    src={track.cover} 
                    alt={track.title} 
                    className="w-14 h-14 object-cover rounded-md shadow-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                    <button className="bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={16} fill="currentColor" />
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium truncate group-hover:text-primary transition-colors">{track.title}</h3>
                  <p className="text-sm text-secondary truncate">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* New releases */}
      <section className="animate-slide-up" style={{animationDelay: '0.4s'}}>
        <h2 className="text-xl font-bold mb-4">New Releases</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {newReleases.map((album) => (
            <div 
              key={album.id}
              className="bg-surface p-4 rounded-lg card-hover group"
            >
              <div className="relative mb-4">
                <img 
                  src={album.cover} 
                  alt={album.title} 
                  className="w-full aspect-square object-cover rounded-md shadow-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                  <button className="bg-primary text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all shadow-lg hover:scale-105">
                    <Play size={24} fill="currentColor" />
                  </button>
                </div>
              </div>
              <h3 className="font-bold truncate">{album.title}</h3>
              <p className="text-sm text-secondary truncate">{album.artist}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
