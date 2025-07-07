import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaPlay, FaHeart } from 'react-icons/fa'

function ArtistDetail() {
  const { id } = useParams()
  const [artist, setArtist] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setArtist({
        id: parseInt(id),
        name: id === '1' ? 'The Weeknd' : `Artist ${id}`,
        image: 'https://via.placeholder.com/300',
        monthlyListeners: '85,432,109',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
        topTracks: [
          { id: 1, title: 'Blinding Lights', album: 'After Hours', duration: '3:20', plays: '2,432,109,876' },
          { id: 2, title: 'Save Your Tears', album: 'After Hours', duration: '3:35', plays: '1,876,543,210' },
          { id: 3, title: 'Starboy', album: 'Starboy', duration: '3:50', plays: '1,765,432,109' },
          { id: 4, title: 'The Hills', album: 'Beauty Behind the Madness', duration: '3:41', plays: '1,654,321,098' },
          { id: 5, title: 'Call Out My Name', album: 'My Dear Melancholy,', duration: '3:48', plays: '1,543,210,987' },
        ],
        albums: [
          { id: 1, title: 'After Hours', year: '2020', image: 'https://via.placeholder.com/150' },
          { id: 2, title: 'Starboy', year: '2016', image: 'https://via.placeholder.com/150' },
          { id: 3, title: 'Beauty Behind the Madness', year: '2015', image: 'https://via.placeholder.com/150' },
          { id: 4, title: 'My Dear Melancholy,', year: '2018', image: 'https://via.placeholder.com/150' },
        ],
        similar: [
          { id: 2, name: 'Dua Lipa', image: 'https://via.placeholder.com/100' },
          { id: 3, name: 'Post Malone', image: 'https://via.placeholder.com/100' },
          { id: 4, name: 'Bruno Mars', image: 'https://via.placeholder.com/100' },
          { id: 5, name: 'Ariana Grande', image: 'https://via.placeholder.com/100' },
        ]
      })
      setLoading(false)
    }, 1000)
  }, [id])
  
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-gradient-to-b from-dark-lighter to-dark"></div>
        <div className="p-6">
          <div className="flex items-center mb-8">
            <div className="w-40 h-40 rounded-full bg-dark-lighter mr-6"></div>
            <div>
              <div className="h-8 bg-dark-lighter rounded w-48 mb-4"></div>
              <div className="h-4 bg-dark-lighter rounded w-32"></div>
            </div>
          </div>
          
          <div className="h-6 bg-dark-lighter rounded w-32 mb-4"></div>
          <div className="space-y-4 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-dark-lighter rounded"></div>
            ))}
          </div>
          
          <div className="h-6 bg-dark-lighter rounded w-32 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="bg-dark-lighter h-40 rounded"></div>
                <div className="h-4 bg-dark-lighter rounded w-3/4"></div>
                <div className="h-3 bg-dark-lighter rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  if (!artist) {
    return (
      <div className="p-6">
        <p>Artist not found</p>
      </div>
    )
  }
  
  return (
    <div>
      {/* Header */}
      <div 
        className="bg-gradient-to-b from-primary-dark to-dark pt-40 pb-6 px-6 bg-center bg-cover"
        style={{ backgroundImage: `url(${artist.image})`, backgroundBlendMode: 'overlay' }}
      >
        <div className="flex items-end">
          <div>
            <h1 className="text-5xl font-bold mb-2">{artist.name}</h1>
            <p className="text-sm">{artist.monthlyListeners} monthly listeners</p>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="p-6 flex items-center">
        <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary-light mr-4">
          <FaPlay className="text-white ml-1" />
        </button>
        
        <button className="text-2xl text-gray-400 hover:text-white mr-4">
          <FaHeart />
        </button>
        
        <button className="px-4 py-2 border border-gray-600 rounded-full text-sm hover:border-white">
          Follow
        </button>
      </div>
      
      {/* Popular */}
      <div className="px-6 pb-8">
        <h2 className="text-xl font-bold mb-4">Popular</h2>
        
        <div className="space-y-2">
          {artist.topTracks.map((track, index) => (
            <div 
              key={track.id}
              className="grid grid-cols-12 gap-4 p-2 rounded-md hover:bg-dark-lighter"
            >
              <div className="col-span-1 flex items-center text-gray-400">
                {index + 1}
              </div>
              <div className="col-span-6 flex items-center min-w-0">
                <div>
                  <p className="font-medium truncate">{track.title}</p>
                  <p className="text-sm text-gray-400 truncate">{track.plays} plays</p>
                </div>
              </div>
              <div className="col-span-4 hidden md:flex items-center text-gray-400 truncate">
                {track.album}
              </div>
              <div className="col-span-1 flex items-center justify-end text-gray-400 text-sm">
                {track.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Albums */}
      <div className="px-6 pb-8">
        <h2 className="text-xl font-bold mb-4">Albums</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {artist.albums.map((album) => (
            <Link 
              key={album.id}
              to={`/album/${album.id}`}
              className="bg-dark-light p-3 rounded-lg hover:bg-dark-lighter transition"
            >
              <img src={album.image} alt={album.title} className="w-full aspect-square object-cover rounded-md mb-2" />
              <h3 className="font-medium text-sm truncate">{album.title}</h3>
              <p className="text-gray-400 text-xs">{album.year}</p>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Similar Artists */}
      <div className="px-6 pb-8">
        <h2 className="text-xl font-bold mb-4">Fans Also Like</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {artist.similar.map((similar) => (
            <Link 
              key={similar.id}
              to={`/artist/${similar.id}`}
              className="bg-dark-light p-3 rounded-lg hover:bg-dark-lighter transition text-center"
            >
              <img 
                src={similar.image} 
                alt={similar.name} 
                className="w-24 h-24 rounded-full object-cover mx-auto mb-2" 
              />
              <h3 className="font-medium text-sm">{similar.name}</h3>
              <p className="text-gray-400 text-xs">Artist</p>
            </Link>
          ))}
        </div>
      </div>
      
      {/* About */}
      <div className="px-6 pb-8">
        <h2 className="text-xl font-bold mb-4">About</h2>
        
        <p className="text-gray-300">{artist.bio}</p>
      </div>
    </div>
  )
}

export default ArtistDetail
