import { Link } from 'react-router-dom'

function ArtistCard({ artist }) {
  return (
    <Link 
      to={`/artist/${artist.id}`}
      className="block group"
    >
      <div className="relative overflow-hidden rounded-full aspect-square bg-dark-light">
        {artist.image_url ? (
          <img 
            src={artist.image_url} 
            alt={artist.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-dark to-secondary-dark">
            <span className="text-4xl font-bold text-white opacity-50">
              {artist.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      
      <h3 className="mt-2 text-base font-medium text-center truncate">{artist.name}</h3>
      <p className="text-sm text-gray-400 text-center truncate">Artist</p>
    </Link>
  )
}

export default ArtistCard
