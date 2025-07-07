import { useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'

function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [categories, setCategories] = useState([
    { id: 1, name: 'Pop', color: 'from-pink-500 to-purple-500' },
    { id: 2, name: 'Hip-Hop', color: 'from-yellow-500 to-orange-500' },
    { id: 3, name: 'Rock', color: 'from-red-500 to-pink-500' },
    { id: 4, name: 'Electronic', color: 'from-blue-500 to-teal-500' },
    { id: 5, name: 'R&B', color: 'from-purple-500 to-indigo-500' },
    { id: 6, name: 'Jazz', color: 'from-green-500 to-teal-500' },
    { id: 7, name: 'Classical', color: 'from-gray-500 to-blue-500' },
    { id: 8, name: 'Country', color: 'from-yellow-500 to-green-500' },
  ])
  
  const handleSearch = (e) => {
    e.preventDefault()
    
    if (!query.trim()) return
    
    // Mock search results
    const mockResults = [
      { id: 1, type: 'track', title: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 2, type: 'track', title: 'Save Your Tears', artist: 'The Weeknd', cover: 'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 3, type: 'album', title: 'After Hours', artist: 'The Weeknd', cover: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 4, type: 'artist', name: 'The Weeknd', cover: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 5, type: 'playlist', title: 'The Weeknd Essentials', cover: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ]
    
    setResults(mockResults)
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Search</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-dark-lighter rounded-full bg-dark-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="What do you want to listen to?"
          />
        </div>
      </form>
      
      {results.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Top Result</h3>
            <div className="bg-dark-light p-4 rounded-lg flex items-start">
              <img 
                src={results[0].cover} 
                alt={results[0].title || results[0].name} 
                className="w-32 h-32 object-cover rounded-md"
              />
              <div className="ml-4">
                <span className="text-xs uppercase text-gray-400">
                  {results[0].type}
                </span>
                <h4 className="text-2xl font-bold mt-1">
                  {results[0].title || results[0].name}
                </h4>
                {results[0].artist && (
                  <p className="text-gray-400 mt-1">{results[0].artist}</p>
                )}
                <button className="mt-4 bg-primary text-white rounded-full px-6 py-2 font-medium hover:bg-primary/90 transition">
                  Play
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Songs</h3>
            <div className="bg-dark-light rounded-lg overflow-hidden">
              {results.filter(item => item.type === 'track').map((track, index) => (
                <div 
                  key={track.id}
                  className="flex items-center p-3 hover:bg-dark-lighter transition"
                >
                  <div className="w-8 text-center text-gray-400 mr-3">
                    {index + 1}
                  </div>
                  <img 
                    src={track.cover} 
                    alt={track.title} 
                    className="w-10 h-10 object-cover rounded mr-3"
                  />
                  <div>
                    <h4 className="font-medium">{track.title}</h4>
                    <p className="text-sm text-gray-400">{track.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Browse All</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div 
                key={category.id}
                className={`bg-gradient-to-br ${category.color} p-6 rounded-lg aspect-square flex items-end cursor-pointer hover:scale-105 transition`}
              >
                <h3 className="text-xl font-bold">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
