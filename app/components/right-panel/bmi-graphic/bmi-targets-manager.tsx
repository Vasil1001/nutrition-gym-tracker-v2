import React, { useState, useEffect } from 'react'
import TargetsModal from './targets-modal'
import TargetsResults from './targets-results'
import { SavedTargets } from '@/lib/types'

interface BMITargetsManagerProps {
  savedTargets: SavedTargets
  onSaveTargets: (targets: SavedTargets) => void
}

// Define the BMI form data interface for better type safety
interface BMIFormData {
  bmi: number
  calorieTarget: number
  proteinTarget: number
  weightKg: number
  heightCm: number
  sex: string
  activityLevel: string
  fitnessGoal: string
  unitSystem: string
  weightLbs?: number
  heightInches?: number
}

function BMITargetsManager({ savedTargets, onSaveTargets }: BMITargetsManagerProps) {
  const [isTargetsModalOpen, setIsTargetsModalOpen] = useState(false)
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false)
  const [results, setResults] = useState<BMIFormData>({
    bmi: 0,
    calorieTarget: 0,
    proteinTarget: 0,
    weightKg: 0,
    heightCm: 0,
    sex: '',
    activityLevel: '',
    fitnessGoal: '',
    unitSystem: 'metric'
  })

  // Load saved form data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFormData = localStorage.getItem('bmiFormData')
      if (savedFormData) {
        try {
          const parsedFormData = JSON.parse(savedFormData) as BMIFormData
          setResults((prevResults) => ({
            ...prevResults,
            ...parsedFormData
          }))
        } catch (error) {
          console.error('Error parsing saved BMI form data:', error)
        }
      }
    }
  }, [])

  // Update results if savedTargets has BMI data
  useEffect(() => {
    if (savedTargets.bmi && savedTargets.calories && savedTargets.protein) {
      setResults((prevResults) => ({
        ...prevResults,
        bmi: savedTargets.bmi ?? 0, // Ensure bmi is always a number
        calorieTarget: savedTargets.calories.target,
        proteinTarget: savedTargets.protein.target
      }))
    }
  }, [savedTargets])

  const handleOpenTargetsModal = () => {
    setIsTargetsModalOpen(true)
  }

  const handleTargetsSubmit = (data: any) => {
    const { weightKg, heightCm, activityLevel, fitnessGoal, sex, unitSystem } = data
    const heightM = heightCm / 100
    const bmi = weightKg / (heightM * heightM)

    let calorieMultiplier = 14
    if (activityLevel === 'Sedentary') calorieMultiplier = 14
    else if (activityLevel === 'Moderately Active') calorieMultiplier = 16
    else if (activityLevel === 'Highly Active') calorieMultiplier = 18

    // Apply adjustments based on fitness goal
    let goalMultiplier = 1
    if (fitnessGoal === 'Build Muscle') goalMultiplier = 1.1
    else if (fitnessGoal === 'Lose Weight') goalMultiplier = 0.8

    // Use weight in lbs for calorieTarget calculation
    const calorieTarget = Math.round(data.weightLbs * calorieMultiplier * goalMultiplier)
    // Use weight in kg for proteinTarget calculation
    const proteinTarget = Math.round(weightKg * (fitnessGoal === 'Build Muscle' ? 1.8 : 1.6))

    const newResults: BMIFormData = {
      bmi,
      calorieTarget,
      proteinTarget,
      weightKg,
      heightCm,
      sex,
      activityLevel,
      fitnessGoal,
      unitSystem,
      weightLbs: data.weightLbs,
      heightInches: data.heightInches
    }

    setResults(newResults)

    // Save form data to localStorage for future editing
    if (typeof window !== 'undefined') {
      localStorage.setItem('bmiFormData', JSON.stringify(newResults))
    }

    setIsTargetsModalOpen(false)
    setIsResultsModalOpen(true)
  }

  return (
    <>
      <button
        onClick={handleOpenTargetsModal}
        className="flex items-center gap-1.5 rounded-md border border-border bg-background/50 p-2 text-xs text-muted-foreground hover:bg-accent/50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
        {savedTargets.bmi ? 'Edit Targets' : 'Set Targets'}
      </button>

      <TargetsModal
        isOpen={isTargetsModalOpen}
        onOpenChange={setIsTargetsModalOpen}
        onSubmit={handleTargetsSubmit}
        savedData={results}
      />

      <TargetsResults
        isOpen={isResultsModalOpen}
        onOpenChange={setIsResultsModalOpen}
        results={results}
        onSaveTargets={onSaveTargets}
      />
    </>
  )
}

export default BMITargetsManager
