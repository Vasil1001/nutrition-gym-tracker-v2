'use client'

import { useState, useCallback, useEffect } from 'react'
import { Food, FoodSummary } from '@/lib/types'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'react-hot-toast'
import { calculateTotalNutrition } from '@/lib/foods'

interface FoodManagementState {
  isLoading: boolean
  foodsArray: Food[]
  selectedFoods: Food[]
  foodCounts: { [key: string]: number }
  summaries: FoodSummary[]
}

export function useFoodManagement(userId: string | undefined) {
  const [state, setState] = useState<FoodManagementState>(() => {
    // Initialize from localStorage if available
    const initialState = {
      isLoading: true,
      foodsArray: [],
      selectedFoods: [],
      foodCounts: {},
      summaries: []
    }

    if (typeof window !== 'undefined') {
      const savedSelectedFoods = localStorage.getItem('selectedFoods')
      const savedFoodCounts = localStorage.getItem('foodCounts')

      if (savedSelectedFoods) {
        initialState.selectedFoods = JSON.parse(savedSelectedFoods)
      }

      if (savedFoodCounts) {
        initialState.foodCounts = JSON.parse(savedFoodCounts)
      }
    }

    return initialState
  })

  // Persistence to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedFoods', JSON.stringify(state.selectedFoods))
      localStorage.setItem('foodCounts', JSON.stringify(state.foodCounts))
    }
  }, [state.selectedFoods, state.foodCounts])

  // Food management actions
  const handleAddFood = useCallback((food: Food) => {
    setState((prev) => ({
      ...prev,
      selectedFoods: [...prev.selectedFoods, food],
      foodCounts: {
        ...prev.foodCounts,
        [food.name]: (prev.foodCounts[food.name] || 0) + 1
      }
    }))
  }, [])

  const handleRemoveFood = useCallback((food: Food) => {
    setState((prev) => {
      const currentCount = prev.foodCounts[food.name] || 0
      if (currentCount > 1) {
        return {
          ...prev,
          foodCounts: {
            ...prev.foodCounts,
            [food.name]: currentCount - 1
          }
        }
      } else {
        const newCounts = { ...prev.foodCounts }
        delete newCounts[food.name]
        return {
          ...prev,
          selectedFoods: prev.selectedFoods.filter((f) => f.name !== food.name),
          foodCounts: newCounts
        }
      }
    })
  }, [])

  const fetchFoods = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('foods').select('*').eq('user_id', userId)

      if (error) throw error
      setState((prev) => ({ ...prev, foodsArray: data || [], isLoading: false }))
    } catch (error) {
      console.error('Error fetching foods:', error)
      setState((prev) => ({ ...prev, foodsArray: [], isLoading: false }))
    }
  }, [userId])

  const fetchSummaries = useCallback(async () => {
    if (!userId) return

    try {
      const { data, error } = await supabase
        .from('food_summaries')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })

      if (error) throw error
      setState((prev) => ({ ...prev, summaries: data || [] }))
    } catch (error) {
      console.error('Error fetching summaries:', error)
      toast.error('Failed to load food history')
    }
  }, [userId])

  const handleSaveDay = async () => {
    if (!userId) return
    if (Object.keys(state.foodCounts).length === 0) {
      toast.error('Please select some foods before saving.')
      return
    }

    const { totalProtein, totalCalories, totalCarbs, foodItems } = calculateTotalNutrition(
      state.selectedFoods,
      state.foodCounts
    )

    const summaryData = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      user_id: userId,
      totalProtein,
      totalCalories,
      totalCarbs,
      foods: foodItems.filter((item) => item !== null)
    }

    try {
      const { error } = await supabase.from('food_summaries').insert(summaryData)
      if (error) throw error

      setState((prev) => ({ ...prev, summaries: [summaryData, ...prev.summaries] }))
      toast.success('Your daily food summary has been saved.')
      handleClearSelectedFoods()
    } catch (error) {
      console.error('Error saving summary:', error)
      toast.error('Failed to save your daily food summary.')
    }
  }

  const handleClearSelectedFoods = useCallback(() => {
    setState((prev) => ({
      ...prev,
      selectedFoods: [],
      foodCounts: {}
    }))
  }, [])

  return {
    ...state,
    handleAddFood,
    handleRemoveFood,
    handleClearSelectedFoods,
    fetchFoods,
    fetchSummaries,
    handleSaveDay
  }
}
