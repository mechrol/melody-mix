import { createContext, useContext, useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Initialize Supabase client
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  useEffect(() => {
    // Check for active session
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        setUser(data?.session?.user || null)
      } catch (error) {
        console.error('Error checking session:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    
    checkSession()
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null)
        setLoading(false)
      }
    )
    
    return () => {
      if (authListener?.unsubscribe) {
        authListener.unsubscribe()
      }
    }
  }, [supabase])
  
  // Sign up function
  async function signUp(email, password) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (error) throw error
  }
  
  // Sign in function
  async function signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
  }
  
  // Sign out function
  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }
  
  const value = {
    user,
    signUp,
    signIn,
    signOut,
    loading,
  }
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
