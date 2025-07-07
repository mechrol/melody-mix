import { useState } from 'react'
import { useTheme, themes } from '../context/ThemeContext'
import { Check, Moon, Sun, Monitor } from 'lucide-react'

function Settings() {
  const { currentTheme, changeTheme } = useTheme()
  
  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="bg-surface rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Appearance</h2>
        
        <div className="mb-6">
          <h3 className="text-md font-medium mb-3 text-secondary">Theme</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => changeTheme(key)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  currentTheme === key 
                    ? 'border-primary' 
                    : 'border-theme hover:border-white/30'
                }`}
                style={{ backgroundColor: theme.colors.surface }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium" style={{ color: theme.colors.text }}>{theme.name}</span>
                  {currentTheme === key && (
                    <Check size={18} style={{ color: theme.colors.primary }} />
                  )}
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: theme.colors.primary }}></div>
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: theme.colors.background }}></div>
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: theme.colors.surfaceHighlight }}></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-surface rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Account</h2>
        
        <div className="mb-4">
          <h3 className="text-md font-medium mb-2 text-secondary">Email Preferences</h3>
          <div className="flex items-center mb-3">
            <input 
              type="checkbox" 
              id="newsletter" 
              className="w-4 h-4 accent-primary mr-2"
            />
            <label htmlFor="newsletter" className="text-sm">Receive newsletter and updates</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="marketing" 
              className="w-4 h-4 accent-primary mr-2"
            />
            <label htmlFor="marketing" className="text-sm">Receive marketing emails</label>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-2 text-secondary">Privacy</h3>
          <div className="flex items-center mb-3">
            <input 
              type="checkbox" 
              id="activity" 
              className="w-4 h-4 accent-primary mr-2"
              defaultChecked
            />
            <label htmlFor="activity" className="text-sm">Share my listening activity</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="recommendations" 
              className="w-4 h-4 accent-primary mr-2"
              defaultChecked
            />
            <label htmlFor="recommendations" className="text-sm">Use my data for recommendations</label>
          </div>
        </div>
      </div>
      
      <div className="bg-surface rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Playback</h2>
        
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2 text-secondary">Audio Quality</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input 
                type="radio" 
                id="normal" 
                name="quality" 
                className="w-4 h-4 accent-primary mr-2"
              />
              <label htmlFor="normal" className="text-sm">Normal (128 kbps)</label>
            </div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="high" 
                name="quality" 
                className="w-4 h-4 accent-primary mr-2"
                defaultChecked
              />
              <label htmlFor="high" className="text-sm">High (256 kbps)</label>
            </div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="ultra" 
                name="quality" 
                className="w-4 h-4 accent-primary mr-2"
              />
              <label htmlFor="ultra" className="text-sm">Ultra (320 kbps)</label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-2 text-secondary">Autoplay</h3>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="autoplay" 
              className="w-4 h-4 accent-primary mr-2"
              defaultChecked
            />
            <label htmlFor="autoplay" className="text-sm">Autoplay similar songs when my music ends</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
