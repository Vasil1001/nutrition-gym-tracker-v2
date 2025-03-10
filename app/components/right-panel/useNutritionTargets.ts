import { useState, useEffect } from 'react'

interface NutritionTargets {
  calories: { current: number; target: number }
  protein: { current: number; target: number }
  carbs: { current: number; target: number }
}

export function useNutritionTargets(initialTargets?: NutritionTargets) {
  const defaultTargets = {
    calories: { current: 0, target: 2000 },
    protein: { current: 0, target: 150 },
    carbs: { current: 0, target: 250 }
  }

  const [targets, setTargets] = useState<NutritionTargets>(initialTargets || defaultTargets)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nutritionTargets')
      if (saved) {
        setTargets(JSON.parse(saved))
      }
    }
  }, [])

  const updateTargets = (newTargets: NutritionTargets) => {
    setTargets(newTargets)
    if (typeof window !== 'undefined') {
      localStorage.setItem('nutritionTargets', JSON.stringify(newTargets))
    }
  }

  return { targets, updateTargets }
}
