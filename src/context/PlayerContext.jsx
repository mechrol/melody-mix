import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { Howl } from 'howler'

const PlayerContext = createContext()

export function usePlayer() {
  return useContext(PlayerContext)
}

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [duration, setDuration] = useState(0)
  const [seek, setSeek] = useState(0)
  const [playlist, setPlaylist] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [repeat, setRepeat] = useState('none') // none, one, all
  const [shuffle, setShuffle] = useState(false)
  
  const soundRef = useRef(null)
  const seekInterval = useRef(null)

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unload()
      }
      if (seekInterval.current) {
        clearInterval(seekInterval.current)
      }
    }
  }, [])

  // Update seek position
  useEffect(() => {
    if (isPlaying && soundRef.current) {
      if (seekInterval.current) {
        clearInterval(seekInterval.current)
      }
      
      seekInterval.current = setInterval(() => {
        setSeek(soundRef.current.seek())
      }, 1000)
    } else if (seekInterval.current) {
      clearInterval(seekInterval.current)
    }
    
    return () => {
      if (seekInterval.current) {
        clearInterval(seekInterval.current)
      }
    }
  }, [isPlaying])

  // Handle track changes
  useEffect(() => {
    if (currentTrack) {
      if (soundRef.current) {
        soundRef.current.unload()
      }
      
      soundRef.current = new Howl({
        src: [currentTrack.audio_url],
        html5: true,
        volume,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onstop: () => setIsPlaying(false),
        onend: handleTrackEnd,
        onload: () => {
          setDuration(soundRef.current.duration())
        },
      })
      
      if (isPlaying) {
        soundRef.current.play()
      }
    }
  }, [currentTrack])

  // Handle volume changes
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(volume)
    }
  }, [volume])

  function handleTrackEnd() {
    if (repeat === 'one') {
      soundRef.current.play()
    } else if (repeat === 'all' || (playlist.length > 0 && currentIndex < playlist.length - 1)) {
      playNext()
    } else {
      setIsPlaying(false)
      setSeek(0)
    }
  }

  function playTrack(track, newPlaylist = null, index = 0) {
    setCurrentTrack(track)
    
    if (newPlaylist) {
      setPlaylist(newPlaylist)
      setCurrentIndex(index)
    }
    
    setIsPlaying(true)
  }

  function togglePlay() {
    if (!currentTrack) return
    
    if (isPlaying) {
      soundRef.current.pause()
    } else {
      soundRef.current.play()
    }
    
    setIsPlaying(!isPlaying)
  }

  function playNext() {
    if (playlist.length === 0) return
    
    let nextIndex
    
    if (shuffle) {
      // Get random index different from current
      do {
        nextIndex = Math.floor(Math.random() * playlist.length)
      } while (nextIndex === currentIndex && playlist.length > 1)
    } else {
      nextIndex = (currentIndex + 1) % playlist.length
    }
    
    setCurrentIndex(nextIndex)
    setCurrentTrack(playlist[nextIndex])
  }

  function playPrevious() {
    if (playlist.length === 0) return
    
    // If current position is more than 3 seconds, restart the song
    if (seek > 3) {
      seekTo(0)
      return
    }
    
    let prevIndex
    
    if (shuffle) {
      // Get random index different from current
      do {
        prevIndex = Math.floor(Math.random() * playlist.length)
      } while (prevIndex === currentIndex && playlist.length > 1)
    } else {
      prevIndex = (currentIndex - 1 + playlist.length) % playlist.length
    }
    
    setCurrentIndex(prevIndex)
    setCurrentTrack(playlist[prevIndex])
  }

  function seekTo(position) {
    if (!soundRef.current) return
    
    soundRef.current.seek(position)
    setSeek(position)
  }

  function toggleRepeat() {
    const modes = ['none', 'one', 'all']
    const currentIndex = modes.indexOf(repeat)
    const nextIndex = (currentIndex + 1) % modes.length
    setRepeat(modes[nextIndex])
  }

  function toggleShuffle() {
    setShuffle(!shuffle)
  }

  const value = {
    currentTrack,
    isPlaying,
    volume,
    duration,
    seek,
    playlist,
    currentIndex,
    repeat,
    shuffle,
    playTrack,
    togglePlay,
    playNext,
    playPrevious,
    seekTo,
    setVolume,
    toggleRepeat,
    toggleShuffle,
  }

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  )
}
