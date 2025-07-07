import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'
import Player from './Player'
import { useTheme } from '../context/ThemeContext'

function Layout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const { currentTheme } = useTheme()
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return (
    <div className="flex flex-col h-screen bg-app">
      <div className="flex flex-1 overflow-hidden">
        {!isMobile && (
          <div className="w-64 h-full hidden md:block">
            <Sidebar />
          </div>
        )}
        
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
      
      <div className="sticky bottom-0 left-0 right-0 z-10">
        <Player />
        {isMobile && <MobileNav />}
      </div>
    </div>
  )
}

export default Layout
