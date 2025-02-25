import { Card, CardContent } from '@/components/ui/card'
import { format } from 'date-fns'
import { FoodSummary } from '@/lib/types'
import { ProgressRings } from '@/app/components/progress-rings'

interface FoodSummaryCardProps {
  summary: FoodSummary
  userTargets: {
    calories: number
    protein: number
    carbs: number
  }
  isSelected: boolean
  onClick: () => void
}

export default function FoodSummaryCard({
  summary,
  userTargets,
  isSelected,
  onClick
}: FoodSummaryCardProps) {
  const isProteinTargetHit = summary.totalProtein >= userTargets.protein

  return (
    <Card
      className={`cursor-pointer transition-colors hover:bg-accent/50 ${
        isProteinTargetHit ? 'border-2 border-blue-500/50 bg-blue-500/10' : ''
      } ${isSelected ? 'ring-2 ring-primary' : ''}`}
      onClick={onClick}>
      <CardContent className="flex flex-col gap-2 p-4">
        <div className="text-sm font-medium text-muted-foreground">
          {format(new Date(summary.date), 'MMM dd, yyyy')}
        </div>
        <ProgressRings
          calories={{ current: summary.totalCalories, target: userTargets.calories }}
          protein={{ current: summary.totalProtein, target: userTargets.protein }}
          carbs={{ current: summary.totalCarbs || 0, target: userTargets.carbs }}
        />
      </CardContent>
    </Card>
  )
}
