'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ProgressCircle } from '../charts/progress-circle'

interface ProgressMetricsCardProps {
  totals: {
    protein: number
    calories: number
    carbs: number
  }
  targets: {
    calories: { current: number; target: number }
    protein: { current: number; target: number }
    carbs: { current: number; target: number }
  }
}

export default function ProgressMetricsCard({ totals, targets }: ProgressMetricsCardProps) {
  const nutrients = [
    { key: 'calories', label: 'Calories', color: '#FF9800' },
    { key: 'protein', label: 'Protein', color: '#2196F3' },
    { key: 'carbs', label: 'Carbs', color: '#4CAF50' }
  ]

  return (
    <Card>
      <CardContent>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {nutrients.map(({ key, label, color }) => (
            <ProgressCircle
              key={key}
              current={totals[key as keyof typeof totals]}
              target={targets[key as keyof typeof targets].target}
              label={label}
              color={color}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
