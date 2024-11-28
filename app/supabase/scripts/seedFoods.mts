import { createClient } from '@supabase/supabase-js'
import { foods } from '@/lib/foods'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

const insertFoods = async () => {
  try {
    // Check if foods already exist
    const { data: existingFoods, error: fetchError } = await supabase.from('foods').select('id')
    if (fetchError) {
      console.error('Error fetching foods:', fetchError)
      return
    }

    if (existingFoods && existingFoods.length > 0) {
      console.log('Foods already exist in the database.')
      return
    }

    const { data, error } = await supabase.from('foods').insert(foods)
    if (error) {
      console.error('Error inserting foods:', error)
    } else {
      console.log('Successfully inserted foods:', data)
    }
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

insertFoods().then(() => {
  console.log('Seeding completed.')
  process.exit(0)
})