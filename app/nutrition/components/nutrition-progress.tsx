import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Pencil } from 'lucide-react'
import Onboarding from '@/components/ui/overview/onboarding/onboarding'
import { ProgressCircle } from './progress-circle'

interface NutritionGoals {
  calories: { current: number; target: number }
  protein: { current: number; target: number }
  carbs: { current: number; target: number }
}

interface NutritionProgressProps {
  initialGoals: NutritionGoals
  onGoalsUpdate?: (goals: NutritionGoals) => void
}

const NutritionProgress: React.FC<NutritionProgressProps> = ({ initialGoals, onGoalsUpdate }) => {
  const [goals, setGoals] = useState<NutritionGoals>(initialGoals)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [bmiData, setBmiData] = useState({
    bmi: 0,
    bmiPosition: 0,
    bmiStatus: { status: '', color: '' },
    underweightMax: 18.5,
    normalMax: 25,
    overweightMax: 30
  })

  const getBmiStatus = (bmi: number) => {
    if (bmi < 18.5) return { status: 'Underweight', color: '#2196F3' } // Blue
    if (bmi < 25) return { status: 'Healthy Weight', color: '#4CAF50' } // Green
    if (bmi < 30) return { status: 'Overweight', color: '#FF9800' } // Orange
    return { status: 'Obese', color: '#F44336' } // Red
  }

  const calculateBmiPosition = (bmi: number) => {
    // Calculate position on a scale of 0-100
    if (bmi < 18.5) return (bmi / 18.5) * 18.5
    if (bmi < 25) return 18.5 + ((bmi - 18.5) / 6.5) * (25 - 18.5)
    if (bmi < 30) return 25 + ((bmi - 25) / 5) * (30 - 25)
    return Math.min(100, 30 + ((bmi - 30) / 5) * (35 - 30))
  }

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
    // Store BMI data when targets are updated
    if (newTargets.bmi) {
      const bmiStatus = getBmiStatus(newTargets.bmi)
      const bmiPosition = calculateBmiPosition(newTargets.bmi)
      setBmiData({
        bmi: newTargets.bmi,
        bmiPosition: bmiPosition,
        bmiStatus: bmiStatus,
        underweightMax: 18.5,
        normalMax: 25,
        overweightMax: 30
      })
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
        <CardContent className="mt-3 flex gap-4 justify-between text-sm">
          {nutrients.map(({ key, label, unit }) => (
            <div
              className="flex flex-col items-center w-full gap-2 rounded-lg bg-[#19191f] p-2.5 font-bold tracking-tight"
              key={key}>
              <span>{label}</span>
              {goals[key].target}
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
      {bmiData.bmi > 0 && (
        <Card className="mb-4">
          <CardContent className="pt-4">
            <div className="relative mt-4 h-6">
              {/* Underweight */}
              <div
                className="absolute h-4 rounded-l bg-blue-500"
                style={{ width: `${bmiData.underweightMax}%` }}></div>
              {/* Normal weight */}
              <div
                className="absolute h-4 bg-green-500"
                style={{
                  left: `${bmiData.underweightMax}%`,
                  width: `${bmiData.normalMax - bmiData.underweightMax}%`
                }}></div>
              {/* Overweight */}
              <div
                className="absolute h-4 bg-orange-500"
                style={{
                  left: `${bmiData.normalMax}%`,
                  width: `${bmiData.overweightMax - bmiData.normalMax}%`
                }}></div>
              {/* Obese */}
              <div
                className="absolute h-4 rounded-r bg-red-500"
                style={{
                  left: `${bmiData.overweightMax}%`,
                  width: `${100 - bmiData.overweightMax}%`
                }}></div>
              {/* BMI Indicator */}
              {/* Update BMI Indicator position calculation */}
              <div
                className="absolute top-0 -mt-3 h-7 w-0.5 bg-black"
                style={{ left: `${bmiData.bmiPosition}%` }}>
                <div
                  className="absolute -left-3 -top-5 text-[0.85rem] font-bold"
                  style={{ color: bmiData.bmiStatus.color }}>
                  {bmiData.bmi.toFixed(1)}
                </div>
              </div>
              {/* Labels */}
              <div className="absolute mt-5 flex w-full justify-between text-xs text-white/65">
                <span>Under</span>
                <span>Normal</span>
                <span>Over</span>
                <span>Obese</span>
              </div>
            </div>
            <div>
              <p className="mt-8">
                BMI:{' '}
                <span style={{ color: bmiData.bmiStatus.color }}>
                  {bmiData.bmi.toFixed(1)} - {bmiData.bmiStatus.status}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Today's 3 Progress circles */}
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
