import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import { Mail, ArrowLeft, Music, Send } from 'lucide-react'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!email) {
      setError('Please enter your email address')
      return
    }
    
    try {
      setError('')
      setMessage('')
      setLoading(true)
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      
      if (error) throw error
      
      setMessage('Check your email for a password reset link')
    } catch (err) {
      setError('Failed to send password reset email')
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
          <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          {message && (
            <div className="bg-green-500/20 border border-green-500 text-green-100 px-4 py-3 rounded-lg mb-4">
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
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
              <p className="text-sm text-secondary mt-2">
                We'll send you a link to reset your password.
              </p>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 px-4 rounded-full font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? 'Sending...' : (
                <>
                  Send Reset Link
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center text-primary hover:underline font-medium">
              <ArrowLeft size={16} className="mr-1" />
              Back to login
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-theme">
            <Link to="/" className="block text-center text-secondary hover:text-white transition-colors">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
