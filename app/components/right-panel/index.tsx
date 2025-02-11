'use client'

import { Food } from '@/lib/types'
import SelectedFoodList from './selected-food-list'

import { useState, useEffect } from 'react'
import BMIDailyGoals from './nutrition-goals-card'
import ProgressMetricsCard from './progress-metrics-card'

interface RightPanelProps {
  selectedFoods: Food[]
  foodCounts: { [key: string]: number }
  onAdd: (food: Food) => void
  onRemove: (food: Food) => void
}

export default function RightPanel({
  selectedFoods,
  foodCounts,
  onAdd,
  onRemove
}: RightPanelProps) {
  const [savedTargets, setSavedTargets] = useState({
    calories: { current: 0, target: 2000 },
    protein: { current: 0, target: 150 },
    carbs: { current: 0, target: 250 }
  })

  const totals = {
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nutritionTargets')
      if (saved) {
        setSavedTargets(JSON.parse(saved))
      }
    }
  }, [])

  const handleGoalsUpdate = (newGoals: any) => {
    setSavedTargets(newGoals)
    if (typeof window !== 'undefined') {
      localStorage.setItem('nutritionTargets', JSON.stringify(newGoals))
    }
  }

  return (
    <div className="relative order-1 max-h-[calc(100vh-13rem)] overflow-hidden md:order-2 lg:border-l">
      <div className="space-y-4 pt-4 lg:pl-4">
        <BMIDailyGoals savedTargets={savedTargets} onGoalsUpdate={handleGoalsUpdate} />
        <ProgressMetricsCard totals={totals} targets={savedTargets} />
        <div className="mt-4">
          <SelectedFoodList
            selectedFoods={selectedFoods}
            foodCounts={foodCounts}
            onAdd={onAdd}
            onRemove={onRemove}
            totals={totals}
          />
        </div>
      </div>
    </div>
  )
}
