import { createContext, useContext, useState, useEffect } from 'react'

// Available themes
export const themes = {
  dark: {
    name: 'Dark',
    colors: {
      background: '#121212',
      surface: '#181818',
      surfaceHighlight: '#282828',
      primary: '#1DB954',
      secondary: '#b3b3b3',
      text: '#FFFFFF',
      textSecondary: '#b3b3b3',
      border: '#333333',
      error: '#f44336',
      success: '#4caf50',
    },
  },
  midnight: {
    name: 'Midnight Blue',
    colors: {
      background: '#0A1929',
      surface: '#0F2942',
      surfaceHighlight: '#1A3A5F',
      primary: '#1E88E5',
      secondary: '#90CAF9',
      text: '#FFFFFF',
      textSecondary: '#B0BEC5',
      border: '#1E3A5F',
      error: '#f44336',
      success: '#4caf50',
    },
  },
  purple: {
    name: 'Purple Haze',
    colors: {
      background: '#170F23',
      surface: '#231B2E',
      surfaceHighlight: '#2E263B',
      primary: '#B468FF',
      secondary: '#9C7BB9',
      text: '#FFFFFF',
      textSecondary: '#B0BEC5',
      border: '#3E3451',
      error: '#f44336',
      success: '#4caf50',
    },
  },
  sunset: {
    name: 'Sunset',
    colors: {
      background: '#1F1D1B',
      surface: '#2A2724',
      surfaceHighlight: '#3A3530',
      primary: '#FF7043',
      secondary: '#FFB74D',
      text: '#FFFFFF',
      textSecondary: '#BDBDBD',
      border: '#3E3A36',
      error: '#f44336',
      success: '#4caf50',
    },
  },
}

const ThemeContext = createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('dark')
  
  // Load saved theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
      applyTheme(themes[savedTheme].colors)
    } else {
      applyTheme(themes.dark.colors)
    }
  }, [])
  
  // Apply theme colors to CSS variables
  const applyTheme = (colors) => {
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value)
    })
  }
  
  // Change theme function
  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName)
      applyTheme(themes[themeName].colors)
      localStorage.setItem('theme', themeName)
    }
  }
  
  const value = {
    currentTheme,
    themes,
    changeTheme,
  }
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
