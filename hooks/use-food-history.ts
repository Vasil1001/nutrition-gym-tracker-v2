import { useState, useEffect } from 'react'
import { FoodSummary } from '@/lib/types'

interface FoodHistoryState {
  selectedSummary: FoodSummary | null
  showAllSummaries: boolean
  userTargets: {
    calories: number
    protein: number
    carbs: number
  }
}

export function useFoodHistory(summaries: FoodSummary[]) {
  const [state, setState] = useState<FoodHistoryState>({
    selectedSummary: null,
    showAllSummaries: false,
    userTargets: {
      calories: 2000,
      protein: 150,
      carbs: 250
    }
  })

  // Load user targets from localStorage
  useEffect(() => {
    const savedTargets = localStorage.getItem('nutritionTargets')
    if (savedTargets) {
      const targets = JSON.parse(savedTargets)
      setState((prev) => ({
        ...prev,
        userTargets: {
          calories: targets.calories.target,
          protein: targets.protein.target,
          carbs: targets.carbs.target
        }
      }))
    }
  }, [])

  const setSelectedSummary = (summary: FoodSummary | null) => {
    setState((prev) => ({ ...prev, selectedSummary: summary }))
  }

  const setShowAllSummaries = (show: boolean) => {
    setState((prev) => ({ ...prev, showAllSummaries: show }))
  }

  const isProteinTargetHit = (proteinAmount: number) => {
    return proteinAmount >= state.userTargets.protein
  }

  return {
    ...state,
    setSelectedSummary,
    setShowAllSummaries,
    isProteinTargetHit
  }
}
