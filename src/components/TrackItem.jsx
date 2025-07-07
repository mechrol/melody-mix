import { FiPlay, FiPause, FiHeart, FiMoreHorizontal } from 'react-icons/fi'
import { usePlayer } from '../context/PlayerContext'

function TrackItem({ track, index, playlist }) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer()
  
  const isActive = currentTrack && currentTrack.id === track.id
  
  const handlePlayClick = () => {
    if (isActive) {
      togglePlay()
    } else {
      playTrack(track, playlist, index)
    }
  }
  
  // Format duration from seconds to MM:SS
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <div 
      className={`playlist-item flex items-center p-3 rounded-md ${
        isActive ? 'bg-dark-light' : ''
      }`}
    >
      <div className="flex items-center w-12 justify-center">
        {isActive && isPlaying ? (
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-primary animate-pulse"></div>
            <div className="w-1 h-4 bg-primary animate-pulse delay-75"></div>
            <div className="w-1 h-2 bg-primary animate-pulse delay-150"></div>
          </div>
        ) : (
          <span className="text-gray-400">{index + 1}</span>
        )}
      </div>
      
      <div className="h-10 w-10 bg-dark-light rounded overflow-hidden mr-3">
        {track.cover_url && (
          <img 
            src={track.cover_url} 
            alt={track.title} 
            className="h-full w-full object-cover"
          />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-medium truncate ${isActive ? 'text-primary' : 'text-white'}`}>
          {track.title}
        </h4>
        <p className="text-xs text-gray-400 truncate">{track.artist}</p>
      </div>
      
      <div className="text-xs text-gray-400 mx-4 hidden sm:block">
        {track.album}
      </div>
      
      <div className="text-xs text-gray-400 mx-4 hidden md:block">
        {formatDuration(track.duration)}
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={handlePlayClick}
          className={`p-2 rounded-full ${
            isActive ? 'bg-primary text-white' : 'bg-dark-light text-gray-300 hover:text-white'
          }`}
        >
          {isActive && isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
        </button>
        
        <button className="p-2 text-gray-400 hover:text-white">
          <FiHeart size={16} />
        </button>
        
        <button className="p-2 text-gray-400 hover:text-white">
          <FiMoreHorizontal size={16} />
        </button>
      </div>
    </div>
  )
}

export default TrackItem
