'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import Onboarding from '@/app/components/right-panel/bmi-graphic/onboarding'
import { useAuth } from '@/app/context/AuthContext'

interface NutritionGoalsCardProps {
  savedTargets: {
    calories: { current: number; target: number }
    protein: { current: number; target: number }
    carbs: { current: number; target: number }
  }
  onGoalsUpdate: (goals: any) => void
}

export default function NutritionGoalsCard({
  savedTargets,
  onGoalsUpdate
}: NutritionGoalsCardProps) {
  const { session } = useAuth()
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
    if (bmi < 18.5) return { status: 'Underweight', color: '#2196F3' }
    if (bmi < 25) return { status: 'Healthy Weight', color: '#4CAF50' }
    if (bmi < 30) return { status: 'Overweight', color: '#FF9800' }
    return { status: 'Obese', color: '#F44336' }
  }

  const calculateBmiPosition = (bmi: number) => {
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
    onGoalsUpdate(newTargets)
    handleCloseOnboarding()
  }

  const nutrients = [
    { key: 'calories', label: 'Calories', unit: '' },
    { key: 'protein', label: 'Protein', unit: 'g' },
    { key: 'carbs', label: 'Carbs', unit: 'g' }
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-0">
          <CardTitle className="text-xl">Daily Goals</CardTitle>
          {session && (
            <Pencil
              className="h-5 w-5 animate-pulse cursor-pointer text-blue-500 hover:text-blue-600"
              onClick={handleSetTargetsClick}
            />
          )}
        </CardHeader>
        <CardContent className="mt-3 flex flex-1 justify-between gap-1 text-sm lg:gap-4">
          {nutrients.map(({ key, label, unit }) => (
            <div
              className="flex w-full flex-col items-center gap-1 rounded-lg p-2.5 text-xs font-medium tracking-tight dark:bg-[#19191f] lg:text-sm"
              key={key}>
              <span>{label}</span>
              {savedTargets[key as keyof typeof savedTargets].target}
              {unit}
            </div>
          ))}
        </CardContent>
      </Card>

      {bmiData.bmi > 0 && (
        <Card>
          <CardContent className="pt-4">
            <div className="relative mt-4 h-6">
              {/* Underweight */}
              <div
                className="absolute h-4 rounded-l bg-blue-500"
                style={{ width: `${bmiData.underweightMax}%` }}
              />
              {/* Normal weight */}
              <div
                className="absolute h-4 bg-green-500"
                style={{
                  left: `${bmiData.underweightMax}%`,
                  width: `${bmiData.normalMax - bmiData.underweightMax}%`
                }}
              />
              {/* Overweight */}
              <div
                className="absolute h-4 bg-orange-500"
                style={{
                  left: `${bmiData.normalMax}%`,
                  width: `${bmiData.overweightMax - bmiData.normalMax}%`
                }}
              />
              {/* Obese */}
              <div
                className="absolute h-4 rounded-r bg-red-500"
                style={{
                  left: `${bmiData.overweightMax}%`,
                  width: `${100 - bmiData.overweightMax}%`
                }}
              />
              {/* BMI Indicator */}
              <div
                className="absolute top-0 -mt-3 h-7 w-[1px] bg-black"
                style={{ left: `${bmiData.bmiPosition}%` }}>
                <div
                  className="absolute -left-3 -top-4 text-[0.75rem] font-bold"
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
            {/* <div>
              <p className="text-xs mt-8">
                BMI:{' '}
                <span className='text-xs' style={{ color: bmiData.bmiStatus.color }}>
                  {bmiData.bmi.toFixed(1)} - {bmiData.bmiStatus.status}
                </span>
              </p>
            </div> */}
          </CardContent>
        </Card>
      )}

      {showOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[black]/50">
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
    </div>
  )
}
