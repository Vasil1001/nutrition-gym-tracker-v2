import React, { useState } from 'react'

function OnboardingModal({ onSubmit }: any) {
  const [sex, setSex] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [unitSystem, setUnitSystem] = useState('metric') // 'metric' or 'imperial'
  const [activityLevel, setActivityLevel] = useState('')
  const [fitnessGoal, setFitnessGoal] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (sex && Number(weight) > 0 && Number(height) > 0 && activityLevel && fitnessGoal) {
      let weightKg = Number(weight)
      let heightCm = Number(height)
      let weightLbs = Number(weight)
      let heightInches = Number(height)

      if (unitSystem === 'imperial') {
        // Convert lbs to kg and inches to cm
        weightKg = weightLbs * 0.453592
        heightCm = heightInches * 2.54
      } else {
        // Convert kg to lbs and cm to inches
        weightLbs = weightKg / 0.453592
        heightInches = heightCm / 2.54
      }

      const data = {
        sex,
        weightKg,
        weightLbs,
        heightCm,
        heightInches,
        activityLevel,
        fitnessGoal
      }
      onSubmit(data)
    } else {
      alert('Please fill all fields with valid values.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold">Set Your Targets</h2>
      <div className="space-y-4">
        {/* Unit System Toggle */}
        <div className="space-y-2">
          <label className="block font-medium">Unit System:</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="metric"
                checked={unitSystem === 'metric'}
                onChange={(e) => setUnitSystem(e.target.value)}
                className="mr-2"
              />
              Metric (kg & cm)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="imperial"
                checked={unitSystem === 'imperial'}
                onChange={(e) => setUnitSystem(e.target.value)}
                className="mr-2"
              />
              Imperial (lbs & inches)
            </label>
          </div>
        </div>
        {/* Sex selection */}
        <div className="space-y-2">
          <label className="block font-medium">Sex:</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="Male"
                checked={sex === 'Male'}
                onChange={(e) => setSex(e.target.value)}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Female"
                checked={sex === 'Female'}
                onChange={(e) => setSex(e.target.value)}
                className="mr-2"
              />
              Female
            </label>
          </div>
        </div>
        {/* Weight and height inputs */}
        <div className="space-y-2">
          <label className="block">
            Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'}):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="1"
              required
              className="mt-1 block w-full rounded-md border border-gray-300"
            />
          </label>
          <label className="block">
            Height ({unitSystem === 'metric' ? 'cm' : 'inches'}):
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min="1"
              required
              className="mt-1 block w-full rounded-md border border-gray-300"
            />
          </label>
        </div>
        {/* Activity level selection */}
        <div className="space-y-2">
          <label className="block font-medium">Activity Level:</label>
          <div className="space-y-1">
            <label className="flex items-center">
              <input
                type="radio"
                value="Sedentary"
                checked={activityLevel === 'Sedentary'}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="mr-2"
              />
              Sedentary: Little to no exercise
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Moderately Active"
                checked={activityLevel === 'Moderately Active'}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="mr-2"
              />
              Moderately Active: Regular exercise 3-5 days/week
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Highly Active"
                checked={activityLevel === 'Highly Active'}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="mr-2"
              />
              Highly Active: Intense exercise 6-7 days/week
            </label>
          </div>
        </div>
        {/* Fitness goal selection */}
        <div className="space-y-2">
          <label className="block font-medium">Fitness Goal:</label>
          <div className="space-y-1">
            <label className="flex items-center">
              <input
                type="radio"
                value="Build Muscle"
                checked={fitnessGoal === 'Build Muscle'}
                onChange={(e) => setFitnessGoal(e.target.value)}
                className="mr-2"
              />
              Build Muscle
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Lose Weight"
                checked={fitnessGoal === 'Lose Weight'}
                onChange={(e) => setFitnessGoal(e.target.value)}
                className="mr-2"
              />
              Lose Weight
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Maintain"
                checked={fitnessGoal === 'Maintain'}
                onChange={(e) => setFitnessGoal(e.target.value)}
                className="mr-2"
              />
              Maintain
            </label>
          </div>
        </div>
      </div>
      <button type="submit" className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
        Calculate
      </button>
    </form>
  )
}

export default OnboardingModal
