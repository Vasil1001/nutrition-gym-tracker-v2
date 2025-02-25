'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import Onboarding from '@/app/components/right-panel/bmi-graphic/onboarding'
import { useAuth } from '@/app/context/AuthContext'
import { getBmiStatus, calculateBmiPosition } from '@/lib/bmi-utils'
import { NutritionTarget, SavedTargets } from '@/lib/types'

interface NutritionGoalsCardProps {
  savedTargets: SavedTargets
  onGoalsUpdate: (targets: SavedTargets) => void
}

// Extracted component for BMI visualization
function BmiVisualizer({ bmi }: { bmi: number }) {
  const { status, color } = getBmiStatus(bmi)
  const position = calculateBmiPosition(bmi)

  return (
    <div className="mt-2">
      <div className="mb-1 text-sm font-medium">BMI: {bmi.toFixed(1)}</div>
      <div className="relative h-2 w-full rounded-full bg-gray-200">
        <div
          className="absolute h-4 w-4 rounded-full border-2 border-white"
          style={{
            backgroundColor: color,
            left: `${position}%`,
            top: '-4px'
          }}
        />
        <div className="mt-4 text-xs text-gray-500">{status}</div>
      </div>
    </div>
  )
}

export default function BMIDailyGoals({ savedTargets, onGoalsUpdate }: NutritionGoalsCardProps) {
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

  const handleSetTargetsClick = () => {
    setShowOnboarding(true)
  }

  const handleCloseOnboarding = () => {
    setShowOnboarding(false)
  }

  const handleGoalsUpdate = (newTargets: SavedTargets) => {
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
      <Card className="group">
        <CardHeader className="flex flex-row items-center justify-between p-3 align-middle">
          <CardTitle className="text-sm">Daily Goals</CardTitle>
          {session && (
            <Pencil
              className="h-5 w-5 cursor-pointer text-blue-500 hover:text-blue-600"
              onClick={handleSetTargetsClick}
            />
          )}
        </CardHeader>
        <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-[500px]">
          <CardContent className="mt-3 flex flex-1 justify-between gap-1 text-sm lg:gap-4">
            {nutrients.map(({ key, label, unit }) => (
              <div
                className="flex w-full flex-col items-center gap-1 rounded-lg p-2.5 text-xs font-medium tracking-tight dark:bg-[#19191f] lg:text-sm"
                key={key}>
                <span>{label}</span>
                {(() => {
                  const target = savedTargets[key as keyof typeof savedTargets]
                  if (typeof target === 'object' && target !== null && 'target' in target) {
                    return (target as NutritionTarget).target
                  } else if (typeof target === 'number') {
                    return target
                  }
                  return null
                })()}
                {unit}
              </div>
            ))}
          </CardContent>
        </div>
      </Card>
      {bmiData.bmi > 0 && (
        <CardContent className="rounded-lg bg-[#2e3039] pt-4">
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
        </CardContent>
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
