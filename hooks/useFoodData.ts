import { useState, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Food } from '@/lib/types'

export function useFoodData(session: any) {
  const [foodsArray, setFoods] = useState<Food[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchFoods = useCallback(async () => {
    if (!session) {
      setFoods([])
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('foods')
        .select('*')
        .eq('user_id', session.user.id)

      if (error) throw error
      setFoods(data || [])
    } catch (error) {
      console.error('Error fetching foods:', error)
      setFoods([])
    } finally {
      setIsLoading(false)
    }
  }, [session])

  return { foodsArray, isLoading, fetchFoods, setFoods }
}
