import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface Profile {
  user_id: string
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  default_city: string
  plan: 'free' | 'pro' | 'business'
  referral_code: string | null
}

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  signUp: (email: string, password: string, meta?: { full_name?: string; phone?: string; city?: string }) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signInWithGoogle: () => Promise<any>
  signInWithOtp: (phone: string) => Promise<any>
  verifyOtp: (phone: string, token: string) => Promise<any>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase.from('profiles').select('*').eq('user_id', userId).single()
    setProfile(data)
  }

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) fetchProfile(s.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) fetchProfile(s.user.id)
      else setProfile(null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, meta?: { full_name?: string; phone?: string; city?: string }) => {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: meta?.full_name, phone: meta?.phone } }
    })
    if (res.data.user) {
      const code = 'REF' + res.data.user.id.slice(0, 8).toUpperCase()
      await supabase.from('profiles').upsert({
        user_id: res.data.user.id,
        full_name: meta?.full_name || null,
        phone: meta?.phone || null,
        default_city: meta?.city || 'Mumbai',
        plan: 'free',
        referral_code: code
      })
    }
    return res
  }

  const signIn = async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password })
  }

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } })
    if (error) {
      if (error.message?.includes('not enabled') || error.message?.includes('unsupported')) {
        throw new Error('Google login is not configured yet. Please use email/password.')
      }
      throw error
    }
    return { data, error }
  }

  const signInWithOtp = async (phone: string) => {
    return supabase.auth.signInWithOtp({ phone })
  }

  const verifyOtp = async (phone: string, token: string) => {
    return supabase.auth.verifyOtp({ phone, token, type: 'sms' })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signUp, signIn, signInWithGoogle, signInWithOtp, verifyOtp, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
