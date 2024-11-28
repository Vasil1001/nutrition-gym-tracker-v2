import { supabase } from '@/lib/supabaseClient'

export const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.error('Error logging out:', error)
  // Optionally, redirect to the login page
}
