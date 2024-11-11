import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Pencil } from 'lucide-react'
import Onboarding from '@/components/ui/overview/onboarding/onboarding'

interface NutritionGoals {
  calories: { current: number; target: number }
  protein: { current: number; target: number }
  carbs: { current: number; target: number }
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

const NutritionProgress: React.FC<NutritionProgressProps> = ({ initialGoals, onGoalsUpdate }) => {
  const [goals, setGoals] = useState<NutritionGoals>(initialGoals)
  const [showOnboarding, setShowOnboarding] = useState(false)

  const handleSetTargetsClick = () => {
    setShowOnboarding(true)
  }

  const handleCloseOnboarding = () => {
    setShowOnboarding(false)
  }

  const handleGoalsUpdate = (newTargets: any) => {
    const newGoals = {
      calories: { current: goals.calories.current, target: newTargets.calories.target },
      protein: { current: goals.protein.current, target: newTargets.protein.target },
      carbs: { current: goals.carbs.current, target: newTargets.carbs.target }
    }
    setGoals(newGoals)
    if (onGoalsUpdate) {
      onGoalsUpdate(newGoals)
    }
    handleCloseOnboarding()
  }

  useEffect(() => {
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
      <Card className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between pb-0">
          <CardTitle className="text-xl">Daily Goals</CardTitle>
          <Pencil
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={handleSetTargetsClick}
          />
        </CardHeader>
        <CardContent className="flex justify-between text-sm">
          {nutrients.map(({ key, label, unit }) => (
            <div key={key}>
              {label}: {goals[key].target}
              {unit ?? ''}
            </div>
          ))}
        </CardContent>
      </Card>

      {showOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[black] bg-opacity-50">
          <div className="relative w-full max-w-md rounded-lg bg-[#34343f] p-6 shadow-lg">
            <button
              onClick={handleCloseOnboarding}
              className="absolute right-2 top-2 text-2xl text-gray-500 hover:text-gray-700">
              &times;
            </button>
            <Onboarding onComplete={handleGoalsUpdate} onSaveTargets={handleGoalsUpdate} />
          </div>
        </div>
      )}
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
