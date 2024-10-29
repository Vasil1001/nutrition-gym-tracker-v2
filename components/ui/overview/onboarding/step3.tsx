import React from 'react'

function Step3({ userData, onNext }: any) {
  const [fitnessGoal, setFitnessGoal] = React.useState('')

  const calculateResults = () => {
    const { weight, height, activityLevel } = userData
    const weightKg = weight * 0.453592
    const heightM = height * 0.0254
    const bmi = weightKg / (heightM * heightM)

    let calorieMultiplier = 14
    if (activityLevel === 'Sedentary') calorieMultiplier = 14
    else if (activityLevel === 'Moderately Active') calorieMultiplier = 16
    else if (activityLevel === 'Highly Active') calorieMultiplier = 18

    const calorieTarget = weight * calorieMultiplier
    const proteinTarget = weightKg * 1.6

    onNext({ bmi, calorieTarget, proteinTarget, fitnessGoal })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (fitnessGoal) {
      calculateResults()
    } else {
      alert('Please select a fitness goal.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Select Fitness Goal:</p>
      <label>
        <input
          type="radio"
          value="Build Muscle"
          checked={fitnessGoal === 'Build Muscle'}
          onChange={(e) => setFitnessGoal(e.target.value)}
        />
        Build Muscle
      </label>
      <label>
        <input
          type="radio"
          value="Lose Weight"
          checked={fitnessGoal === 'Lose Weight'}
          onChange={(e) => setFitnessGoal(e.target.value)}
        />
        Lose Weight
      </label>
      <label>
        <input
          type="radio"
          value="Maintain"
          checked={fitnessGoal === 'Maintain'}
          onChange={(e) => setFitnessGoal(e.target.value)}
        />
        Maintain
      </label>
      <button type="submit">Calculate</button>
    </form>
  )
}

export default Step3
