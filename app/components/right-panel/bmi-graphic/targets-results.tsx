import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { SavedTargets } from '@/lib/types'

// Define the BMI results interface for type safety
interface BMIResults {
  bmi: number
  calorieTarget: number
  proteinTarget: number
  weightKg?: number
  heightCm?: number
  sex?: string
  activityLevel?: string
  fitnessGoal?: string
  unitSystem?: string
  weightLbs?: number
  heightInches?: number
}

type TargetsResultsProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  results: BMIResults
  onSaveTargets: (targets: SavedTargets) => void
}

function TargetsResults({ isOpen, onOpenChange, results, onSaveTargets }: TargetsResultsProps) {
  const { bmi, calorieTarget, proteinTarget } = results

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { status: 'Underweight', color: 'text-blue-500' }
    else if (bmi >= 18.5 && bmi < 25) return { status: 'Normal weight', color: 'text-green-500' }
    else if (bmi >= 25 && bmi < 30) return { status: 'Overweight', color: 'text-orange-500' }
    else return { status: 'Obese', color: 'text-red-500' }
  }

  const bmiStatus = getBMIStatus(bmi)

  // BMI Scale Parameters
  const bmiMin = 15
  const bmiMax = 35
  const bmiRange = bmiMax - bmiMin

  // Clamp the BMI position between 0% and 100%
  const bmiPosition = Math.max(0, Math.min(100, ((bmi - bmiMin) / bmiRange) * 100))

  // Categories segments
  const underweightMax = ((18.5 - bmiMin) / bmiRange) * 100
  const normalMax = ((25 - bmiMin) / bmiRange) * 100
  const overweightMax = ((30 - bmiMin) / bmiRange) * 100

  const handleSaveTargets = () => {
    const carbsTarget = Math.round((results.calorieTarget * 0.5) / 4)
    onSaveTargets({
      calories: { target: Math.round(results.calorieTarget), current: 0 },
      protein: { target: Math.round(results.proteinTarget), current: 0 },
      carbs: { target: carbsTarget, current: 0 },
      bmi: results.bmi,
      bmiPosition: bmiPosition,
      bmiStatus: { status: bmiStatus.status, color: bmiStatus.color.replace('text-', '') },
      underweightMax: underweightMax,
      normalMax: normalMax,
      overweightMax: overweightMax
    })

    // After saving targets, also persist them to localStorage for persistence across page refreshes
    if (typeof window !== 'undefined') {
      const nutritionTargets = {
        calories: { target: Math.round(results.calorieTarget), current: 0 },
        protein: { target: Math.round(results.proteinTarget), current: 0 },
        carbs: { target: carbsTarget, current: 0 }
      }

      localStorage.setItem('nutritionTargets', JSON.stringify(nutritionTargets))

      // Save BMI data separately
      const bmiData = {
        bmi: results.bmi,
        bmiPosition: bmiPosition,
        bmiStatus: { status: bmiStatus.status, color: bmiStatus.color.replace('text-', '') },
        underweightMax: underweightMax,
        normalMax: normalMax,
        overweightMax: overweightMax
      }

      localStorage.setItem('bmiData', JSON.stringify(bmiData))
    }

    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto py-6 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Your Calculated Targets
          </DialogTitle>
          <p className="text-center text-sm text-muted-foreground">
            Based on your inputs, here are your recommended targets
          </p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* BMI Scale */}
          <div className="relative mt-4 h-6">
            {/* Underweight */}
            <div
              className="absolute h-4 rounded-l bg-blue-500"
              style={{ width: `${underweightMax}%` }}></div>
            {/* Normal weight */}
            <div
              className="absolute h-4 bg-green-500"
              style={{
                left: `${underweightMax}%`,
                width: `${normalMax - underweightMax}%`
              }}></div>
            {/* Overweight */}
            <div
              className="absolute h-4 bg-orange-500"
              style={{
                left: `${normalMax}%`,
                width: `${overweightMax - normalMax}%`
              }}></div>
            {/* Obese */}
            <div
              className="absolute h-4 rounded-r bg-red-500"
              style={{
                left: `${overweightMax}%`,
                width: `${100 - overweightMax}%`
              }}></div>
            {/* BMI Indicator */}
            <div
              className="absolute top-0 -mt-3 h-7 w-[1px] bg-black"
              style={{ left: `${bmiPosition}%` }}>
              <div
                className={`absolute -left-3 -top-5 text-[0.85rem] font-bold ${bmiStatus.color}`}>
                {bmi.toFixed(1)}
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

          <div className="mt-10 space-y-3 rounded-lg border border-border p-4">
            <p className="flex items-center justify-between">
              <span className="font-medium">BMI:</span>
              <span className={`${bmiStatus.color}`}>
                {bmi.toFixed(1)} - {bmiStatus.status}
              </span>
            </p>
            <p className="flex items-center justify-between">
              <span className="font-medium">Daily Calories:</span>
              <span>{calorieTarget.toFixed(0)} kcal</span>
            </p>
            <p className="flex items-center justify-between">
              <span className="font-medium">Daily Protein:</span>
              <span>{proteinTarget.toFixed(1)} g</span>
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto">
            Start Over
          </Button>
          <Button onClick={handleSaveTargets} className="w-full sm:w-auto">
            Save Targets
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TargetsResults
