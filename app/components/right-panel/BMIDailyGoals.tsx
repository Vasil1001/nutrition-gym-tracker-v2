'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useState, useEffect } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { getBmiStatus, calculateBmiPosition, getBmiRangePositions } from '@/lib/bmi-utils'
import { NutritionTarget, SavedTargets } from '@/lib/types'
import BMITargetsManager from './bmi-graphic/bmi-targets-manager'

interface NutritionGoalsCardProps {
  savedTargets: SavedTargets
  onGoalsUpdate: (targets: SavedTargets) => void
}

export default function BMIDailyGoals({ savedTargets, onGoalsUpdate }: NutritionGoalsCardProps) {
  const { session } = useAuth()

  // Initialize BMI data with localStorage values, savedTargets, or default values
  const [bmiData, setBmiData] = useState(() => {
    // Get BMI range positions from library function
    const { underweightMax, normalMax, overweightMax } = getBmiRangePositions()

    // Initialize with defaults
    let initialBmiData = {
      bmi: savedTargets.bmi || 0,
      bmiPosition: savedTargets.bmiPosition || 0,
      bmiStatus: savedTargets.bmiStatus || { status: '', color: '' },
      underweightMax: savedTargets.underweightMax || underweightMax,
      normalMax: savedTargets.normalMax || normalMax,
      overweightMax: savedTargets.overweightMax || overweightMax
    }

    // Try to load from localStorage if we're in the browser
    if (typeof window !== 'undefined') {
      try {
        const savedBmiData = localStorage.getItem('bmiData')
        if (savedBmiData) {
          const parsedBmiData = JSON.parse(savedBmiData)
          // Merge with current initialBmiData, preferring localStorage values
          initialBmiData = {
            ...initialBmiData,
            ...parsedBmiData
          }
        }
      } catch (error) {
        console.error('Error loading BMI data from localStorage:', error)
      }
    }

    return initialBmiData
  })

  // Update BMI data when savedTargets change
  useEffect(() => {
    if (savedTargets.bmi) {
      const bmiStatus = savedTargets.bmiStatus || getBmiStatus(savedTargets.bmi)
      const bmiPosition = savedTargets.bmiPosition || calculateBmiPosition(savedTargets.bmi)
      const { underweightMax, normalMax, overweightMax } = getBmiRangePositions()

      setBmiData({
        bmi: savedTargets.bmi,
        bmiPosition: bmiPosition,
        bmiStatus: bmiStatus,
        underweightMax: savedTargets.underweightMax || underweightMax,
        normalMax: savedTargets.normalMax || normalMax,
        overweightMax: savedTargets.overweightMax || overweightMax
      })
    }
  }, [savedTargets])

  const handleGoalsUpdate = (newTargets: SavedTargets) => {
    if (newTargets.bmi) {
      const bmiStatus = newTargets.bmiStatus || getBmiStatus(newTargets.bmi)
      const bmiPosition = newTargets.bmiPosition || calculateBmiPosition(newTargets.bmi)
      const { underweightMax, normalMax, overweightMax } = getBmiRangePositions()

      setBmiData({
        bmi: newTargets.bmi,
        bmiPosition: bmiPosition,
        bmiStatus: bmiStatus,
        underweightMax: newTargets.underweightMax || underweightMax,
        normalMax: newTargets.normalMax || normalMax,
        overweightMax: newTargets.overweightMax || overweightMax
      })
    }
    onGoalsUpdate(newTargets)
  }

  const nutrients = [
    { key: 'calories', label: 'Calories', unit: '' },
    { key: 'protein', label: 'Protein', unit: 'g' },
    { key: 'carbs', label: 'Carbs', unit: 'g' }
  ]

  // Helper function to get target value
  const getTargetValue = (key: keyof typeof savedTargets): number | null => {
    const target = savedTargets[key]
    if (typeof target === 'object' && target !== null && 'target' in target) {
      return (target as NutritionTarget).target
    } else if (typeof target === 'number') {
      return target
    }
    return null
  }

  return (
    <div className="space-y-4">
      <Card className="group">
        <CardHeader className="flex flex-row items-center justify-between p-3 align-middle">
          <CardTitle className="text-sm">Daily Goals</CardTitle>
          {session && (
            <div className="flex items-center">
              <BMITargetsManager savedTargets={savedTargets} onSaveTargets={handleGoalsUpdate} />
            </div>
          )}
        </CardHeader>
        <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-[500px]">
          <CardContent className="mt-3 flex flex-col justify-between gap-1 text-sm lg:gap-2">
            <div className="mb-5 flex gap-2">
              {nutrients.map(({ key, label, unit }) => (
                <div
                  key={key}
                  className="flex w-full flex-col items-center gap-1 rounded-lg p-2.5 text-xs font-medium tracking-tight dark:bg-[#19191f] lg:text-sm">
                  <span>{label}</span>
                  {getTargetValue(key as keyof typeof savedTargets)}
                  {unit}
                </div>
              ))}
            </div>
            {bmiData.bmi > 0 && (
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
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
