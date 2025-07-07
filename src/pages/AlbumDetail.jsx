import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FaPlay, FaHeart, FaClock } from 'react-icons/fa'

function AlbumDetail() {
  const { id } = useParams()
  const [album, setAlbum] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setAlbum({
        id: parseInt(id),
        title: id === '1' ? 'After Hours' : `Album ${id}`,
        artist: 'The Weeknd',
        releaseDate: 'March 20, 2020',
        image: 'https://via.placeholder.com/300',
        tracks: [
          { id: 1, title: 'Alone Again', duration: '4:10' },
          { id: 2, title: 'Too Late', duration: '3:59' },
          { id: 3, title: 'Hardest To Love', duration: '3:31' },
          { id: 4, title: 'Scared To Live', duration: '3:11' },
          { id: 5, title: 'Snowchild', duration: '4:07' },
          { id: 6, title: 'Escape From LA', duration: '5:56' },
          { id: 7, title: 'Heartless', duration: '3:18' },
          { id: 8, title: 'Faith', duration: '4:43' },
          { id: 9, title: 'Blinding Lights', duration: '3:20' },
          { id: 10, title: 'In Your Eyes', duration: '3:57' },
          { id: 11, title: 'Save Your Tears', duration: '3:35' },
          { id: 12, title: 'Repeat After Me (Interlude)', duration: '3:15' },
          { id: 13, title: 'After Hours', duration: '6:01' },
          { id: 14, title: 'Until I Bleed Out', duration: '3:10' },
        ]
      })
      setLoading(false)
    }, 1000)
  }, [id])
  
  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row items-center md:items-end mb-8">
            <div className="w-48 h-48 bg-dark-lighter rounded-md mb-4 md:mb-0 md:mr-6"></div>
            <div className="flex-1">
              <div className="h-4 bg-dark-lighter rounded w-24 mb-2"></div>
              <div className="h-8 bg-dark-lighter rounded w-64 mb-4"></div>
              <div className="h-4 bg-dark-lighter rounded w-48 mb-2"></div>
              <div className="h-4 bg-dark-lighter rounded w-32"></div>
            </div>
          </div>
          
          <div className="h-10 bg-dark-lighter rounded mb-6"></div>
          
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-16 bg-dark-lighter rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  if (!album) {
    return (
      <div className="p-6">
        <p>Album not found</p>
      </div>
    )
  }
  
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end mb-8">
        <img 
          src={album.image} 
          alt={album.title} 
          className="w-48 h-48 shadow-lg mb-4 md:mb-0 md:mr-6"
        />
        
        <div>
          <p className="text-sm font-medium uppercase">Album</p>
          <h1 className="text-4xl md:text-5xl font-bold my-2">{album.title}</h1>
          <div className="flex items-center">
            <p className="font-medium">{album.artist}</p>
            <span className="mx-2">•</span>
            <p className="text-sm text-gray-300">{album.releaseDate}</p>
            <span className="mx-2">•</span>
            <p className="text-sm text-gray-300">{album.tracks.length} songs</p>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center mb-6">
        <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary-light mr-4">
          <FaPlay className="text-white ml-1" />
        </button>
        
        <button className="text-2xl text-gray-400 hover:text-white">
          <FaHeart />
        </button>
      </div>
      
      {/* Tracks */}
      <div>
        <div className="grid grid-cols-12 gap-4 text-gray-400 text-sm border-b border-dark-lighter pb-2 px-4">
          <div className="col-span-1">#</div>
          <div className="col-span-10">Title</div>
          <div className="col-span-1 flex justify-end">
            <FaClock />
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          {album.tracks.map((track, index) => (
            <div 
              key={track.id}
              className="grid grid-cols-12 gap-4 p-2 rounded-md hover:bg-dark-lighter"
            >
              <div className="col-span-1 flex items-center text-gray-400">
                {index + 1}
              </div>
              <div className="col-span-10 flex items-center">
                <div>
                  <p className="font-medium">{track.title}</p>
                </div>
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

export default AlbumDetail
