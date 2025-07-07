import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid, List, Clock, Search, Plus } from 'lucide-react'

function Library() {
  const [viewMode, setViewMode] = useState('grid')
  const [filter, setFilter] = useState('all')
  
  const playlists = [
    { id: 1, title: 'Liked Songs', owner: 'You', tracks: 42, cover: 'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=600', lastPlayed: '2 days ago' },
    { id: 2, title: 'Chill Vibes', owner: 'You', tracks: 18, cover: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=600', lastPlayed: '1 week ago' },
    { id: 3, title: 'Workout Mix', owner: 'You', tracks: 25, cover: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=600', lastPlayed: '3 days ago' },
    { id: 4, title: 'Today\'s Top Hits', owner: 'Melody Mix', tracks: 50, cover: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600', lastPlayed: 'Yesterday' },
    { id: 5, title: 'Throwback Thursday', owner: 'Melody Mix', tracks: 35, cover: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600', lastPlayed: '4 days ago' },
  ]
  
  const filteredPlaylists = filter === 'all' 
    ? playlists 
    : playlists.filter(playlist => 
        filter === 'yours' 
          ? playlist.owner === 'You' 
          : playlist.owner !== 'You'
      )
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Library</h1>
        
        <div className="flex items-center gap-2">
          <button 
            className="p-2 rounded-full hover:bg-dark-light transition"
            title="Search in library"
          >
            <Search size={20} />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-dark-light transition"
            title="Create playlist"
          >
            <Plus size={20} />
          </button>
          <div className="flex border border-dark-lighter rounded-md overflow-hidden">
            <button 
              className={`p-1.5 ${viewMode === 'grid' ? 'bg-dark-lighter' : 'bg-transparent'}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <Grid size={18} />
            </button>
            <button 
              className={`p-1.5 ${viewMode === 'list' ? 'bg-dark-lighter' : 'bg-transparent'}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-6 flex gap-2">
        <button 
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            filter === 'all' ? 'bg-white text-dark' : 'bg-dark-light text-white'
          }`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            filter === 'yours' ? 'bg-white text-dark' : 'bg-dark-light text-white'
          }`}
          onClick={() => setFilter('yours')}
        >
          Your Playlists
        </button>
        <button 
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            filter === 'melody' ? 'bg-white text-dark' : 'bg-dark-light text-white'
          }`}
          onClick={() => setFilter('melody')}
        >
          Melody Mix
        </button>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredPlaylists.map((playlist) => (
            <Link 
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className="bg-dark-light p-3 rounded-lg hover:bg-dark-lighter transition"
            >
              <img 
                src={playlist.cover} 
                alt={playlist.title} 
                className="w-full aspect-square object-cover rounded-md mb-3"
              />
              <h3 className="font-medium truncate">{playlist.title}</h3>
              <p className="text-sm text-gray-400 truncate">
                {playlist.owner} • {playlist.tracks} tracks
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-dark-light rounded-lg overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-4 py-2 border-b border-dark-lighter text-sm text-gray-400">
            <div className="w-8">#</div>
            <div>Title</div>
            <div className="text-right">Tracks</div>
            <div className="flex items-center">
              <Clock size={16} />
            </div>
          </div>
          
          {filteredPlaylists.map((playlist, index) => (
            <Link 
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-4 py-3 hover:bg-dark-lighter transition items-center"
            >
              <div className="w-8 text-gray-400">{index + 1}</div>
              <div className="flex items-center">
                <img 
                  src={playlist.cover} 
                  alt={playlist.title} 
                  className="w-10 h-10 object-cover rounded mr-3"
                />
                <div>
                  <h3 className="font-medium">{playlist.title}</h3>
                  <p className="text-sm text-gray-400">{playlist.owner}</p>
                </div>
              </div>
              <div className="text-gray-400 text-right">{playlist.tracks}</div>
              <div className="text-gray-400 text-sm">{playlist.lastPlayed}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Library
