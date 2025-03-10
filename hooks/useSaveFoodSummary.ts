import { supabase } from '@/lib/supabaseClient'
import type { Session } from '@supabase/supabase-js'
import type { FoodSummary } from '@/lib/types'
import { useCallback } from 'react'
import { toast } from 'react-hot-toast'

interface UseSaveFoodSummaryProps {
  session: Session | null
  setSummaries: React.Dispatch<React.SetStateAction<FoodSummary[]>>
  summaries: FoodSummary[]
  foodCounts: { [key: string]: number }
  handleClearSelectedFoods: () => void
  calculateSummaryData: () => FoodSummary
}

export const useSaveFoodSummary = ({
  session,
  setSummaries,
  summaries,
  foodCounts,
  handleClearSelectedFoods,
  calculateSummaryData
}: UseSaveFoodSummaryProps) => {
  const saveFoodSummary = useCallback(async () => {
    if (!session) {
      toast.error('No user session found.')
      return
    }

    if (Object.keys(foodCounts).length === 0) {
      toast.error('Please select food to save.')
      return
    }

    try {
      // Prepare and save data
      const summaryData = calculateSummaryData()
      const { error } = await supabase.from('food_summaries').insert(summaryData)

      if (error) {
        throw error
      }

      // Update UI on success
      setSummaries((prev) => [summaryData, ...prev])
      toast.success('Your daily food summary has been saved.')
      handleClearSelectedFoods()
    } catch (error) {
      console.error('Error saving food summary:', error)
      toast.error('Failed to save food summary.')
    }
  }, [session, foodCounts, calculateSummaryData, setSummaries, handleClearSelectedFoods])

  return { saveFoodSummary }
}
