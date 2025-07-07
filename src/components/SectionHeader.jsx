import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

function SectionHeader({ title, subtitle, link }) {
  return (
    <div className="flex justify-between items-end mb-4">
      <div>
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
      </div>
      
      {link && (
        <Link 
          to={link}
          className="flex items-center text-sm text-primary hover:text-primary-light"
        >
          <span>View all</span>
          <FiChevronRight size={16} />
        </Link>
      )}
    </div>
  )
}

export default SectionHeader
