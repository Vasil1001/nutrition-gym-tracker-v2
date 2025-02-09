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
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-background/50 ">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold">Set Your Targets</h2>
        <p className="text-sm text-muted-foreground">
          Help us calculate your recommended daily targets
        </p>
      </div>

      <div className="space-y-6">
        {/* Unit System Toggle */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">Unit System</label>
          <div className="flex gap-2">
            {['metric', 'imperial'].map((unit) => (
              <label
                key={unit}
                className={`flex flex-1 cursor-pointer items-center justify-center rounded-md border p-2 text-sm transition-colors hover:bg-accent/50 ${
                  unitSystem === unit ? 'border-primary/50 bg-primary/5' : 'border-border'
                }`}>
                <input
                  type="radio"
                  value={unit}
                  checked={unitSystem === unit}
                  onChange={(e) => setUnitSystem(e.target.value)}
                  className="sr-only"
                />
                <span>{unit === 'metric' ? 'Metric (kg & cm)' : 'Imperial (lbs & inches)'}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sex selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">Biological Sex</label>
          <div className="flex gap-2">
            {['Male', 'Female'].map((gender) => (
              <label
                key={gender}
                className={`flex flex-1 cursor-pointer items-center justify-center rounded-md border p-2 text-sm transition-colors hover:bg-accent/50 ${
                  sex === gender ? 'border-primary/50 bg-primary/5' : 'border-border'
                }`}>
                <input
                  type="radio"
                  value={gender}
                  checked={sex === gender}
                  onChange={(e) => setSex(e.target.value)}
                  className="sr-only"
                />
                <span>{gender}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Weight and height inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="1"
              required
              className="w-full rounded-md border border-border bg-background/30 p-2 shadow-sm transition-colors focus:border-primary/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Height ({unitSystem === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min="1"
              required
              className="w-full rounded-md border border-border bg-background/30 p-2 shadow-sm transition-colors focus:border-primary/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Activity level selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">Activity Level</label>
          <div className="space-y-2">
            {[
              { value: 'Sedentary', desc: 'Little to no exercise' },
              { value: 'Moderately Active', desc: 'Regular exercise 3-5 days/week' },
              { value: 'Highly Active', desc: 'Intense exercise 6-7 days/week' }
            ].map((level) => (
              <label
                key={level.value}
                className={`flex cursor-pointer items-center rounded-md border p-2.5 transition-colors hover:bg-accent/50 ${
                  activityLevel === level.value ? 'border-primary/50 bg-primary/5' : 'border-border'
                }`}>
                <input
                  type="radio"
                  value={level.value}
                  checked={activityLevel === level.value}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="sr-only"
                />
                <div className="w-full">
                  <div className="text-sm font-medium">{level.value}</div>
                  <div className="text-xs text-muted-foreground">{level.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Fitness goal selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">Fitness Goal</label>
          <div className="grid grid-cols-3 gap-2">
            {['Build Muscle', 'Lose Weight', 'Maintain'].map((goal) => (
              <label
                key={goal}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-md border px-4 py-3 text-center transition-colors hover:bg-accent/50 ${
                  fitnessGoal === goal ? 'border-primary/50 bg-primary/5' : 'border-border'
                }`}>
                <input
                  type="radio"
                  value={goal}
                  checked={fitnessGoal === goal}
                  onChange={(e) => setFitnessGoal(e.target.value)}
                  className="sr-only"
                />
                <span className="text-sm">{goal}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-primary p-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
        Calculate Your Targets
      </button>
    </form>
  )
}

export default OnboardingModal
