import { useState, useEffect, createContext, useContext } from 'react'
import { supabase, isConfigured } from '../lib/supabase'
import { isDemo, DEMO_USER } from '../lib/demo'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [demo, setDemo] = useState(isDemo())

  useEffect(() => {
    // Demo mode short-circuits Supabase entirely.
    if (isDemo()) {
      setUser(DEMO_USER)
      setDemo(true)
      setLoading(false)
      return
    }
    if (!isConfigured) {
      setLoading(false)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, demo }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
