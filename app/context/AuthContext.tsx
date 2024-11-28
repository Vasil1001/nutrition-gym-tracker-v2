'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { Session } from '@supabase/supabase-js'

type AuthContextType = {
  session: Session | null
}

const AuthContext = createContext<AuthContextType>({ session: null })

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
