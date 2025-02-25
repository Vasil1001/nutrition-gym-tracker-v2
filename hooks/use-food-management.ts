'use client'

import { useState, useCallback, useEffect } from 'react'
import { Food, FoodSummary } from '@/lib/types'
import { supabase } from '@/lib/supabaseClient'
import { useToast } from './use-toast'
import { calculateTotalNutrition } from '@/lib/foods'

interface FoodManagementState {
  isLoading: boolean
  foodsArray: Food[]
  selectedFoods: Food[]
  foodCounts: { [key: string]: number }
  summaries: FoodSummary[]
}

export function useFoodManagement(userId: string | undefined) {
  const { toast } = useToast()
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

  const handleClearSelectedFoods = useCallback(() => {
    setState((prev) => ({
      ...prev,
      selectedFoods: [],
      foodCounts: {}
    }))
  }, [])

  // Data fetching
  const fetchFoods = useCallback(async () => {
    if (!userId) {
      setState((prev) => ({ ...prev, foodsArray: [], isLoading: false }))
      return
    }

    try {
      setState((prev) => ({ ...prev, isLoading: true }))
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
      toast({
        title: 'Error',
        description: 'Failed to load food history',
        variant: 'destructive'
      })
    }
  }, [userId, toast])

  const handleSaveDay = async () => {
    if (!userId) return
    if (Object.keys(state.foodCounts).length === 0) {
      toast({
        title: 'No foods selected',
        description: 'Please select some foods before saving.',
        variant: 'destructive'
      })
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
      toast({
        title: 'Day saved!',
        description: 'Your daily food summary has been saved.'
      })
      handleClearSelectedFoods()
    } catch (error) {
      console.error('Error saving summary:', error)
      toast({
        title: 'Error',
        description: 'Failed to save your daily food summary.',
        variant: 'destructive'
      })
    }
  }

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
