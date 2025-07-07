import { useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

function SearchInput({ onSearch, placeholder = 'Search...' }) {
  const [query, setQuery] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }
  
  const clearSearch = () => {
    setQuery('')
    onSearch('')
  }
  
  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <FiSearch size={18} />
        </span>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-dark-light rounded-full py-2 pl-10 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <FiX size={18} />
          </button>
        )}
      </div>
    </form>
  )
}

export default SearchInput
