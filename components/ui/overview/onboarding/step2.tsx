import React from "react"

function Step2({ onNext }: any) {
  const [activityLevel, setActivityLevel] = React.useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (activityLevel) {
      onNext({ activityLevel })
    } else {
      alert('Please select an activity level.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Select Activity Level:</p>
      <label>
        <input
          type="radio"
          value="Sedentary"
          checked={activityLevel === 'Sedentary'}
          onChange={(e) => setActivityLevel(e.target.value)}
        />
        Sedentary (Weight × 14): Little to no exercise
      </label>
      <label>
        <input
          type="radio"
          value="Moderately Active"
          checked={activityLevel === 'Moderately Active'}
          onChange={(e) => setActivityLevel(e.target.value)}
        />
        Moderately Active (Weight × 16): Regular exercise 3-5 days/week
      </label>
      <label>
        <input
          type="radio"
          value="Highly Active"
          checked={activityLevel === 'Highly Active'}
          onChange={(e) => setActivityLevel(e.target.value)}
        />
        Highly Active (Weight × 18): Intense exercise 6-7 days/week
      </label>
      <button type="submit">Next</button>
    </form>
  )
}

export default Step2