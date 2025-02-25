import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

export async function POST(request: Request) {
  const { email } = await request.json()
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }
  try {
    const { data, error } = await supabase.auth.admin.listUsers()
    if (error) {
      throw error
    }
    const userExists = data.users.some((user) => user.email === email)
    return NextResponse.json({ exists: userExists })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
