'use client'

import { Food } from '@/lib/types'
import SelectedFoodList from './selected-food-list'
import BMIDailyGoals from './BMIDailyGoals'
import ProgressMetricsCard from './progress-metrics-card'
import { useNutritionTotals } from '@/hooks/useNutritionTotals'
import { useNutritionTargets } from '@/app/components/right-panel/useNutritionTargets'


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
  const { targets, updateTargets } = useNutritionTargets()
  const totals = useNutritionTotals(selectedFoods, foodCounts)

  return (
    <div className="relative order-1 max-h-[calc(100vh-11rem)]  md:order-2 lg:border-l">
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
          />
        </div>
      </div>
    </div>
  )
}
