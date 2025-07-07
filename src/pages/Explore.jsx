import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Explore() {
  const [categories, setCategories] = useState([])
  const [newReleases, setNewReleases] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setCategories([
        { id: 1, name: 'Pop', color: 'from-pink-500 to-purple-500', image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Hip-Hop', color: 'from-yellow-500 to-orange-500', image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Rock', color: 'from-red-500 to-pink-500', image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Electronic', color: 'from-blue-500 to-teal-500', image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'R&B', color: 'from-purple-500 to-indigo-500', image: 'https://via.placeholder.com/150' },
        { id: 6, name: 'Jazz', color: 'from-green-500 to-teal-500', image: 'https://via.placeholder.com/150' },
      ])
      
      setNewReleases([
        { id: 1, title: 'Planet Her', artist: 'Doja Cat', cover: 'https://via.placeholder.com/150' },
        { id: 2, title: 'SOUR', artist: 'Olivia Rodrigo', cover: 'https://via.placeholder.com/150' },
        { id: 3, title: 'Justice', artist: 'Justin Bieber', cover: 'https://via.placeholder.com/150' },
        { id: 4, title: 'Happier Than Ever', artist: 'Billie Eilish', cover: 'https://via.placeholder.com/150' },
        { id: 5, title: 'Call Me If You Get Lost', artist: 'Tyler, The Creator', cover: 'https://via.placeholder.com/150' },
      ])
      
      setLoading(false)
    }, 1000)
  }, [])
  
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Explore</h1>
        <div className="animate-pulse">
          <div className="h-6 bg-dark-lighter rounded w-48 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-dark-lighter rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Explore</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div 
              key={category.id}
              className={`h-32 rounded-lg overflow-hidden relative cursor-pointer bg-gradient-to-r ${category.color}`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">New Releases</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {newReleases.map((album) => (
            <Link key={album.id} to={`/album/${album.id}`} className="bg-dark-light p-3 rounded-lg hover:bg-dark-lighter transition">
              <img src={album.cover} alt={album.title} className="w-full aspect-square object-cover rounded-md mb-2" />
              <h3 className="font-medium text-sm truncate">{album.title}</h3>
              <p className="text-gray-400 text-xs truncate">{album.artist}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Explore
