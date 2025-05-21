'use client'

import { Food } from '@/lib/types'
import SelectedFoodList from './selected-food-list'
import BMIDailyGoals from './BMIDailyGoals'
import ProgressMetricsCard from './progress-metrics-card'
import { useNutritionTotals } from '@/hooks/useNutritionTotals'
import { useUserTargets } from '@/hooks/useUserTargets'
import { useAuth } from '@/app/context/AuthContext'

interface RightPanelProps {
  selectedFoods: Food[]
  foodCounts: { [key: string]: number }
  onAdd: (food: Food) => void
  onRemove: (food: Food) => void
  proteinPercentageChange?: number // Added new prop
}

export default function RightPanel({
  selectedFoods,
  foodCounts,
  onAdd,
  onRemove,
  proteinPercentageChange // Added new prop
}: RightPanelProps) {
  const { session } = useAuth()
  const userTargetsResult = useUserTargets(session)
  const { targets, updateTargets } = userTargetsResult || {
    targets: {
      calories: { target: 2000, current: 0 },
      protein: { target: 150, current: 0 },
      carbs: { target: 250, current: 0 }
    },
    updateTargets: () => {}
  }
  const totals = useNutritionTotals(selectedFoods, foodCounts)

  return (
    <div className="relative order-1 max-h-[calc(100vh-11rem)] overflow-y-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/30  md:order-2 lg:border-l">
      <div className="space-y-4 pt-4 lg:pl-4">
        <BMIDailyGoals savedTargets={targets} onGoalsUpdate={updateTargets} />
        <ProgressMetricsCard totals={totals} targets={targets} />
        <div className="mt-4">
          <SelectedFoodList
            selectedFoods={selectedFoods}
            foodCounts={foodCounts}
            onAdd={onAdd}
            onRemove={onRemove}
            totals={totals}
            proteinPercentageChange={proteinPercentageChange} // Pass prop
          />
        </div>
      </div>
    </div>
  )
}
