import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FaPlay, FaHeart, FaClock } from 'react-icons/fa'

function PlaylistDetail() {
  const { id } = useParams()
  const [playlist, setPlaylist] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      if (id === '1') {
        setPlaylist({
          id: 1,
          name: 'Liked Songs',
          description: 'Your favorite tracks',
          owner: 'You',
          followers: 0,
          image: 'https://via.placeholder.com/300',
          tracks: [
            { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', addedAt: '2023-06-15' },
            { id: 2, title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', duration: '3:35', addedAt: '2023-06-14' },
            { id: 3, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23', addedAt: '2023-06-10' },
            { id: 4, title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', album: 'F*CK LOVE 3: OVER YOU', duration: '2:21', addedAt: '2023-06-08' },
            { id: 5, title: 'good 4 u', artist: 'Olivia Rodrigo', album: 'SOUR', duration: '2:58', addedAt: '2023-06-05' },
          ]
        })
      } else {
        setPlaylist({
          id: parseInt(id),
          name: `Playlist ${id}`,
          description: 'Custom playlist',
          owner: 'You',
          followers: 0,
          image: 'https://via.placeholder.com/300',
          tracks: [
            { id: 1, title: 'Track 1', artist: 'Artist 1', album: 'Album 1', duration: '3:20', addedAt: '2023-06-15' },
            { id: 2, title: 'Track 2', artist: 'Artist 2', album: 'Album 2', duration: '3:35', addedAt: '2023-06-14' },
            { id: 3, title: 'Track 3', artist: 'Artist 3', album: 'Album 3', duration: '3:23', addedAt: '2023-06-10' },
          ]
        })
      }
      setLoading(false)
    }, 1000)
  }, [id])
  
  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="flex items-center mb-8">
            <div className="w-48 h-48 bg-dark-lighter rounded-md mr-6"></div>
            <div className="flex-1">
              <div className="h-4 bg-dark-lighter rounded w-24 mb-2"></div>
              <div className="h-8 bg-dark-lighter rounded w-64 mb-4"></div>
              <div className="h-4 bg-dark-lighter rounded w-48"></div>
            </div>
          </div>
          
          <div className="h-10 bg-dark-lighter rounded mb-6"></div>
          
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-dark-lighter rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  if (!playlist) {
    return (
      <div className="p-6">
        <p>Playlist not found</p>
      </div>
    )
  }
  
  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-b from-primary-dark to-dark p-6">
        <div className="flex flex-col md:flex-row items-center md:items-end">
          <img 
            src={playlist.image} 
            alt={playlist.name} 
            className="w-48 h-48 shadow-lg mb-4 md:mb-0 md:mr-6"
          />
          
          <div>
            <p className="text-sm font-medium uppercase">Playlist</p>
            <h1 className="text-4xl md:text-5xl font-bold my-2">{playlist.name}</h1>
            <p className="text-sm text-gray-300">{playlist.description}</p>
            <p className="text-sm mt-2">
              <span className="font-medium">{playlist.owner}</span> • {playlist.tracks.length} songs
            </p>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="p-6 flex items-center">
        <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary-light mr-4">
          <FaPlay className="text-white ml-1" />
        </button>
        
        <button className="text-2xl text-gray-400 hover:text-white">
          <FaHeart />
        </button>
      </div>
      
      {/* Tracks */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-12 gap-4 text-gray-400 text-sm border-b border-dark-lighter pb-2 px-4">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Title</div>
          <div className="col-span-3 hidden md:block">Album</div>
          <div className="col-span-2 hidden md:block">Date added</div>
          <div className="col-span-1 flex justify-end">
            <FaClock />
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          {playlist.tracks.map((track, index) => (
            <div 
              key={track.id}
              className="grid grid-cols-12 gap-4 p-2 rounded-md hover:bg-dark-lighter"
            >
              <div className="col-span-1 flex items-center text-gray-400">
                {index + 1}
              </div>
              <div className="col-span-5 flex items-center min-w-0">
                <div>
                  <p className="font-medium truncate">{track.title}</p>
                  <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                </div>
              </div>
              <div className="col-span-3 hidden md:flex items-center text-gray-400 truncate">
                {track.album}
              </div>
              <div className="col-span-2 hidden md:flex items-center text-gray-400 text-sm">
                {track.addedAt}
              </div>
              <div className="col-span-1 flex items-center justify-end text-gray-400 text-sm">
                {track.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlaylistDetail
