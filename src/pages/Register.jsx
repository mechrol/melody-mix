import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, ArrowRight, Music, User, Check, X } from 'lucide-react'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()
  
  // Password validation
  const hasMinLength = password.length >= 6
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const passwordsMatch = password === confirmPassword && password !== ''
  
  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    
    if (!passwordsMatch) {
      setError('Passwords do not match')
      return
    }
    
    if (!hasMinLength || !hasUppercase || !hasNumber) {
      setError('Password does not meet requirements')
      return
    }
    
    try {
      setError('')
      setLoading(true)
      await signUp(email, password)
      navigate('/')
    } catch (err) {
      setError('Failed to create an account')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-app p-4 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4">
            <Music size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">Melody Mix</h1>
          <p className="text-secondary mt-2">Your favorite music, all in one place</p>
        </div>
        
        <div className="bg-surface rounded-xl p-8 shadow-lg animate-slide-up" style={{animationDelay: '0.1s'}}>
          <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-secondary" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-theme focus:border-primary focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-secondary mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-secondary" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-theme focus:border-primary focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
              
              {/* Password requirements */}
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-xs">
                  {hasMinLength ? (
                    <Check size={14} className="text-green-500 mr-1" />
                  ) : (
                    <X size={14} className="text-red-500 mr-1" />
                  )}
                  <span className={hasMinLength ? "text-green-500" : "text-secondary"}>
                    At least 6 characters
                  </span>
                </div>
                <div className="flex items-center text-xs">
                  {hasUppercase ? (
                    <Check size={14} className="text-green-500 mr-1" />
                  ) : (
                    <X size={14} className="text-red-500 mr-1" />
                  )}
                  <span className={hasUppercase ? "text-green-500" : "text-secondary"}>
                    At least one uppercase letter
                  </span>
                </div>
                <div className="flex items-center text-xs">
                  {hasNumber ? (
                    <Check size={14} className="text-green-500 mr-1" />
                  ) : (
                    <X size={14} className="text-red-500 mr-1" />
                  )}
                  <span className={hasNumber ? "text-green-500" : "text-secondary"}>
                    At least one number
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-secondary mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-secondary" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-theme focus:border-primary focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
                {confirmPassword && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {passwordsMatch ? (
                      <Check size={18} className="text-green-500" />
                    ) : (
                      <X size={18} className="text-red-500" />
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 px-4 rounded-full font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? 'Creating account...' : (
                <>
                  Sign Up
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Log in
              </Link>
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-theme">
            <Link to="/" className="block text-center text-secondary hover:text-white transition-colors">
              Continue as guest
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
