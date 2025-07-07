import { Link } from 'react-router-dom'
import { FiPlay } from 'react-icons/fi'
import { usePlayer } from '../context/PlayerContext'

function AlbumCard({ album }) {
  const { playTrack } = usePlayer()
  
  const handlePlay = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (album.tracks && album.tracks.length > 0) {
      playTrack(album.tracks[0], album.tracks, 0)
    }
  }
  
  return (
    <Link 
      to={`/album/${album.id}`}
      className="block group"
    >
      <div className="relative overflow-hidden rounded-lg aspect-square bg-dark-light">
        {album.cover_url ? (
          <img 
            src={album.cover_url} 
            alt={album.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-dark to-secondary-dark">
            <span className="text-4xl font-bold text-white opacity-50">
              {album.title.charAt(0)}
            </span>
          </div>
        )}
        
        <button
          onClick={handlePlay}
          className="absolute right-2 bottom-2 p-3 bg-primary rounded-full text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:bg-primary-light hover:scale-105"
        >
          <FiPlay size={20} />
        </button>
      </div>
      
      <h3 className="mt-2 text-base font-medium truncate">{album.title}</h3>
      <p className="text-sm text-gray-400 truncate">{album.artist}</p>
    </Link>
  )
}

export default AlbumCard
