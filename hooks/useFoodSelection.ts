import { useState, useCallback, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Food, FoodSummary } from '@/lib/types'

export function useFoodSelection(session: any, toast: any) {
  const [selectedFoods, setSelectedFoods] = useState<Food[]>(() => {
    const savedSelectedFoods = localStorage.getItem('selectedFoods')
    return savedSelectedFoods ? JSON.parse(savedSelectedFoods) : []
  })
  const [foodCounts, setFoodCounts] = useState<{ [key: string]: number }>(() => {
    const savedFoodCounts = localStorage.getItem('foodCounts')
    return savedFoodCounts ? JSON.parse(savedFoodCounts) : {}
  })
  const [summaries, setSummaries] = useState<FoodSummary[]>([])

  const handleAddFood = useCallback((food: Food) => {
    setSelectedFoods((prev) => [...prev, food])
    setFoodCounts((prev) => ({
      ...prev,
      [food.name]: (prev[food.name] || 0) + 1
    }))
  }, [])

  const handleRemoveFood = useCallback((food: Food) => {
    setFoodCounts((prevCounts) => {
      const currentCount = prevCounts[food.name] || 0
      if (currentCount > 1) {
        return { ...prevCounts, [food.name]: currentCount - 1 }
      } else {
        const newCounts = { ...prevCounts }
        delete newCounts[food.name]
        setSelectedFoods((prev) => prev.filter((f) => f.name !== food.name))
        return newCounts
      }
    })
  }, [])

  const handleClearSelectedFoods = useCallback(() => {
    setSelectedFoods([])
    setFoodCounts({})
  }, [])

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
      toast({
        title: 'Error',
        description: 'Failed to load food history',
        variant: 'destructive'
      })
    }
  }, [session, toast])

  const calculateSummaryData = () => {
    return {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      user_id: session.user.id,
      totalProtein: Number(
        Object.entries(foodCounts)
          .reduce((total, [foodName, count]) => {
            const food = selectedFoods.find((f) => f.name === foodName)
            return total + (food ? food.protein * count : 0)
          }, 0)
          .toFixed(2)
      ),
      totalCalories: Number(
        Object.entries(foodCounts)
          .reduce((total, [foodName, count]) => {
            const food = selectedFoods.find((f) => f.name === foodName)
            return total + (food ? food.calories * count : 0)
          }, 0)
          .toFixed(2)
      ),
      totalCarbs: Number(
        Object.entries(foodCounts)
          .reduce((total, [foodName, count]) => {
            const food = selectedFoods.find((f) => f.name === foodName)
            return total + (food ? food.carbs * count : 0)
          }, 0)
          .toFixed(2)
      ),
      foods: Object.entries(foodCounts).map(([name, count]) => {
        const food = selectedFoods.find((f) => f.name === name)!
        return {
          name,
          count,
          protein: Number(food.protein * count),
          calories: Number(food.calories * count),
          carbs: Number(food.carbs * count)
        }
      })
    }
  }

  const handleSaveDay = async () => {
    const summaryData = calculateSummaryData()

    try {
      console.log('Saving summary:', summaryData)
      const { error } = await supabase.from('food_summaries').insert(summaryData)

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      setSummaries([summaryData, ...summaries])
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

  useEffect(() => {
    localStorage.setItem('selectedFoods', JSON.stringify(selectedFoods))
    localStorage.setItem('foodCounts', JSON.stringify(foodCounts))
  }, [selectedFoods, foodCounts])

  return {
    selectedFoods,
    foodCounts,
    summaries,
    handleAddFood,
    handleRemoveFood,
    handleClearSelectedFoods,
    handleSaveDay,
    fetchSummaries
  }
}
