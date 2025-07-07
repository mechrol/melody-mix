import { useState } from 'react'
import { useTheme, themes } from '../context/ThemeContext'
import { Palette, ChevronDown, Check } from 'lucide-react'

function ThemeSelector() {
  const { currentTheme, changeTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  
  const toggleDropdown = () => setIsOpen(!isOpen)
  
  const handleThemeChange = (themeKey) => {
    changeTheme(themeKey)
    setIsOpen(false)
  }
  
  return (
    <div className="relative">
      <button 
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-surface-highlight hover:bg-opacity-80 transition-all"
      >
        <Palette size={16} />
        <span className="text-sm font-medium">{themes[currentTheme].name}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-surface rounded-md shadow-lg z-50 animate-fade-in">
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => handleThemeChange(key)}
              className="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-surface-highlight transition-colors"
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: theme.colors.primary }}
                ></div>
                <span>{theme.name}</span>
              </div>
              {currentTheme === key && (
                <Check size={16} className="text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ThemeSelector
