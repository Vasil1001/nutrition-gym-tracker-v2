import { useState, useCallback, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Food, FoodSummary } from '@/lib/types'
import { useLocalStorageFoodCounts } from './useLocalStorageFoodCounts'
import { useSaveFoodSummary } from './useSaveFoodSummary'
import { toast } from 'react-hot-toast'

export function useFoodSelection(session: any, foods: Food[]) {
  const { foodCounts, setFoodCounts } = useLocalStorageFoodCounts()
  const [summaries, setSummaries] = useState<FoodSummary[]>([])

  const handleAddFood = useCallback(
    (food: Food) => {
      setFoodCounts((prev) => ({
        ...prev,
        [food.name]: (prev[food.name] || 0) + 1
      }))
    },
    [setFoodCounts]
  )

  const handleRemoveFood = useCallback(
    (food: Food) => {
      setFoodCounts((prevCounts) => {
        const currentCount = prevCounts[food.name] || 0
        if (currentCount > 1) {
          return { ...prevCounts, [food.name]: currentCount - 1 }
        } else {
          const newCounts = { ...prevCounts }
          delete newCounts[food.name]
          return newCounts
        }
      })
    },
    [setFoodCounts]
  )

  const handleClearSelectedFoods = useCallback(() => {
    setFoodCounts({})
  }, [setFoodCounts])

  const fetchSummaries = useCallback(async () => {
    if (!session) return

    try {
      const { data, error } = await supabase
        .from('food_summaries')
        .select('*')
        .eq('user_id', session.user.id)
        .order('date', { ascending: false })

      if (error) throw error
      setSummaries(data || [])
    } catch (error) {
      console.error('Error fetching summaries:', error)
      toast.error('Failed to load food history')
    }
  }, [session])

  const calculateSummaryData = useCallback(() => {
    return {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      user_id: session.user.id,
      totalProtein: Number(
        Object.entries(foodCounts)
          .reduce((total, [foodName, count]) => {
            const food = foods.find((f) => f.name === foodName)
            return total + (food ? food.protein * count : 0)
          }, 0)
          .toFixed(2)
      ),
      totalCalories: Number(
        Object.entries(foodCounts)
          .reduce((total, [foodName, count]) => {
            const food = foods.find((f) => f.name === foodName)
            return total + (food ? food.calories * count : 0)
          }, 0)
          .toFixed(2)
      ),
      totalCarbs: Number(
        Object.entries(foodCounts)
          .reduce((total, [foodName, count]) => {
            const food = foods.find((f) => f.name === foodName)
            return total + (food ? food.carbs * count : 0)
          }, 0)
          .toFixed(2)
      ),
      foods: Object.entries(foodCounts).map(([name, count]) => {
        const food = foods.find((f) => f.name === name)!
        return {
          name,
          count,
          protein: Number(food.protein * count),
          calories: Number(food.calories * count),
          carbs: Number(food.carbs * count)
        }
      })
    }
  }, [foodCounts, foods, session?.user?.id])

  const { saveFoodSummary } = useSaveFoodSummary({
    session,
    setSummaries,
    summaries,
    foodCounts,
    handleClearSelectedFoods,
    calculateSummaryData
  })

  const deleteFoodSummary = useCallback(
    async (summaryId: string) => {
      if (!session) return

      try {
        const { error } = await supabase
          .from('food_summaries')
          .delete()
          .eq('id', summaryId)
          .eq('user_id', session.user.id)

        if (error) throw error

        // Update local state after successful deletion
        setSummaries((prev) => prev.filter((summary) => summary.id !== summaryId))
        toast.success('Food summary deleted')
      } catch (error) {
        console.error('Error deleting summary:', error)
        toast.error('Failed to delete food summary')
      }
    },
    [session, setSummaries]
  )

  return {
    foodCounts,
    summaries,
    handleAddFood,
    handleRemoveFood,
    handleClearSelectedFoods,
    saveFoodSummary,
    fetchSummaries,
    deleteFoodSummary
  }
}
