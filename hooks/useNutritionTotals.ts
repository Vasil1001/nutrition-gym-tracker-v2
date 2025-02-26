import { useMemo } from 'react'
import { Food } from '@/lib/types'

/**
 * Custom hook to calculate nutrition totals from selected foods
 * @param selectedFoods Array of selected food items
 * @param foodCounts Object with food name keys and quantity values
 * @returns Object containing calculated totals for protein, calories, and carbs
 */
export function useNutritionTotals(selectedFoods: Food[], foodCounts: { [key: string]: number }) {
  const totals = useMemo(() => {
    return {
      protein: Object.keys(foodCounts).reduce((total, foodName) => {
        const food = selectedFoods.find((f) => f.name === foodName)
        return total + (food ? Number(food.protein) * foodCounts[foodName] : 0)
      }, 0),
      calories: Object.keys(foodCounts).reduce((total, foodName) => {
        const food = selectedFoods.find((f) => f.name === foodName)
        return total + (food ? Number(food.calories) * foodCounts[foodName] : 0)
      }, 0),
      carbs: Object.keys(foodCounts).reduce((total, foodName) => {
        const food = selectedFoods.find((f) => f.name === foodName)
        return total + (food ? Number(food.carbs) * foodCounts[foodName] : 0)
      }, 0)
    }
  }, [selectedFoods, foodCounts])

  return totals
}
