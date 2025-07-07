import { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, Heart, MoreHorizontal } from 'lucide-react'

function Player() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(30)
  const [currentTime, setCurrentTime] = useState('1:23')
  const [totalTime, setTotalTime] = useState('3:45')
  const [isLiked, setIsLiked] = useState(false)
  const progressRef = useRef(null)
  
  // Mock current track
  const currentTrack = {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    cover: 'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }
  
  const toggleMute = () => {
    setIsMuted(!isMuted)
  }
  
  const toggleLike = () => {
    setIsLiked(!isLiked)
  }
  
  const handleProgressClick = (e) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const clickPosition = e.clientX - rect.left
      const newProgress = (clickPosition / rect.width) * 100
      setProgress(Math.min(Math.max(newProgress, 0), 100))
    }
  }
  
  return (
    <div className="bg-surface border-t border-theme p-3 glass-effect">
      <div className="flex items-center justify-between">
        {/* Track info */}
        <div className="flex items-center w-1/4">
          <div className="relative group">
            <img 
              src={currentTrack.cover} 
              alt={currentTrack.title} 
              className="w-14 h-14 object-cover rounded-md mr-3 shadow-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
              <button className="text-white">
                <Play size={24} />
              </button>
            </div>
          </div>
          <div className="hidden sm:block">
            <h4 className="font-medium truncate">{currentTrack.title}</h4>
            <p className="text-sm text-secondary truncate">{currentTrack.artist}</p>
          </div>
          <button 
            onClick={toggleLike}
            className={`ml-3 ${isLiked ? 'text-primary' : 'text-secondary hover:text-white'} transition-colors`}
          >
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        {/* Player controls */}
        <div className="flex flex-col items-center w-2/4">
          <div className="flex items-center gap-4">
            <button className="text-secondary hover:text-white transition-colors">
              <Shuffle size={18} />
            </button>
            <button className="text-secondary hover:text-white transition-colors">
              <SkipBack size={20} />
            </button>
            <button 
              onClick={togglePlay}
              className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button className="text-secondary hover:text-white transition-colors">
              <SkipForward size={20} />
            </button>
            <button className="text-secondary hover:text-white transition-colors">
              <Repeat size={18} />
            </button>
          </div>
          
          <div className="w-full flex items-center gap-2 mt-2">
            <span className="text-xs text-secondary">{currentTime}</span>
            <div 
              ref={progressRef}
              onClick={handleProgressClick}
              className="flex-1 h-1 bg-surface-highlight rounded-full overflow-hidden cursor-pointer group"
            >
              <div 
                className="h-full bg-primary group-hover:bg-primary transition-all"
                style={{ width: `${progress}%` }}
              >
                <div className="relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
            <span className="text-xs text-secondary">{totalTime}</span>
          </div>
        </div>
        
        {/* Volume controls */}
        <div className="flex items-center justify-end gap-2 w-1/4">
          <button 
            onClick={toggleMute}
            className="text-secondary hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <div className="w-20 h-1 bg-surface-highlight rounded-full overflow-hidden hidden sm:block group cursor-pointer">
            <div 
              className="h-full bg-white group-hover:bg-primary transition-colors"
              style={{ width: `${isMuted ? 0 : volume}%` }}
            >
              <div className="relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
          <button className="text-secondary hover:text-white transition-colors ml-2">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Player
