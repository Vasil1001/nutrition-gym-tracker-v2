import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Pencil } from 'lucide-react'

interface NutrientGoal {
  current: number
  target: number
}

interface NutritionGoals {
  calories: NutrientGoal
  protein: NutrientGoal
  carbs: NutrientGoal
}

interface ProgressCircleProps {
  current: number
  target: number
  label: string
  color: string
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ current, target, label, color }) => {
  const percentage = Math.min(100, (current / target) * 100)
  const circumference = 2 * Math.PI * 38
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 text-center">
        <div className="font-semibold">{label}</div>
      </div>

      <div className="relative h-24 w-24">
        <svg className="h-24 w-24" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            transform="rotate(-90 48 48)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-xs ${current >= target ? '' : 'text-muted-foreground'}`}>
            {current.toFixed(0)}
            {current >= target ? '' : `/${target}`}
            {label === 'Protein' || label === 'Carbs' ? 'g' : ''}
          </div>
        </div>
      </div>
    </div>
  )
}

interface NutritionProgressProps {
  initialGoals: NutritionGoals
  onGoalsUpdate?: (goals: NutritionGoals) => void
}

const defaultGoals: NutritionGoals = {
  calories: { current: 123, target: 2000 },
  protein: { current: 123, target: 150 },
  carbs: { current: 123, target: 250 }
}

const NutritionProgress: React.FC<NutritionProgressProps> = ({ initialGoals, onGoalsUpdate }) => {
  const [goals, setGoals] = React.useState<NutritionGoals>(initialGoals)

  React.useEffect(() => {
    setGoals(initialGoals)
  }, [initialGoals])

  const nutrients: Array<{
    key: keyof NutritionGoals
    label: string
    color: string
    unit?: string
  }> = [
    { key: 'calories', label: 'Calories', color: '#FF9800' },
    { key: 'protein', label: 'Protein', color: '#2196F3', unit: 'g' },
    { key: 'carbs', label: 'Carbs', color: '#4CAF50', unit: 'g' }
    // { key: 'fat', label: 'Fat', color: '#F44336', unit: 'g' }
  ]

  return (
    <div className="mx-auto">
      {/* Daily Goals Card */}
      <Card className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between pb-0">
          <CardTitle className="text-xl">Daily Goals</CardTitle>
          <Pencil
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              // Handle edit goals
              console.log('Edit goals clicked')
            }}
          />
        </CardHeader>
        <CardContent className="flex justify-between text-sm">
          {/* {nutrients.map(({ key, label, unit }) => (
            <div key={key}>
              {label}: {goals[key].target}
              {unit ?? ''}
            </div>
          ))} */}
        </CardContent>
      </Card>

      {/* Today's Progress Card */}
      <Card>
        <CardContent>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {nutrients.map(({ key, label, color }) => (
              <ProgressCircle
                key={key}
                current={goals[key].current}
                target={goals[key].target}
                label={label}
                color={color}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NutritionProgress
