import { supabase } from '@/lib/supabaseClient'
import type { Session } from '@supabase/supabase-js'
import type { FoodSummary } from '@/lib/types'

interface ToastOptions {
  title: string
  description: string
  variant?: string
}

interface UseSaveFoodSummaryProps {
  session: Session | null
  toast: (options: ToastOptions) => void
  setSummaries: React.Dispatch<React.SetStateAction<FoodSummary[]>>
  summaries: FoodSummary[]
  foodCounts: { [key: string]: number }
  handleClearSelectedFoods: () => void
  calculateSummaryData: () => FoodSummary
}

export const useSaveFoodSummary = ({
  session,
  toast,
  setSummaries,
  summaries,
  foodCounts,
  handleClearSelectedFoods,
  calculateSummaryData
}: UseSaveFoodSummaryProps) => {
  const saveFoodSummary = async () => {
    if (!session) {
      toast({
        title: 'Session Error',
        description: 'No user session found.',
        variant: 'destructive'
      })
      return
    }

    if (Object.keys(foodCounts).length === 0) {
      toast({
        title: 'No food selected',
        description: 'Please select food to save.',
        variant: 'destructive'
      })
      return
    }

    const summaryData = calculateSummaryData()

    try {
      console.log('Saving summary:', summaryData)
      const { error } = await supabase.from('food_summaries').insert(summaryData)

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      setSummaries((prevSummaries) => [summaryData, ...prevSummaries])
      toast({
        title: 'Day saved!',
        description: 'Your daily food summary has been saved.'
      })
      handleClearSelectedFoods()
    } catch (error) {
      console.error('Error saving summary:', error)
      toast({
        title: 'Error',
        description: 'Failed to save food summary. Check console for details.',
        variant: 'destructive'
      })
    }
  }

  return { saveFoodSummary }
}
