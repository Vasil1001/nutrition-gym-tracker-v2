import React from 'react'

function Targets({
  results,
  onSaveTargets
}: {
  results: any
  onSaveTargets: (targets: any) => void
}) {
  const { bmi, calorieTarget, proteinTarget } = results

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { status: 'Underweight', color: 'blue' }
    else if (bmi >= 18.5 && bmi < 25) return { status: 'Normal weight', color: 'green' }
    else if (bmi >= 25 && bmi < 30) return { status: 'Overweight', color: 'orange' }
    else return { status: 'Obese', color: 'red' }
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
      calories: { target: Math.round(results.calorieTarget) },
      protein: { target: Math.round(results.proteinTarget) },
      carbs: { target: carbsTarget },
      bmi: results.bmi,
      bmiPosition: bmiPosition,
      bmiStatus: bmiStatus,
      underweightMax: underweightMax,
      normalMax: normalMax,
      overweightMax: overweightMax
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold"></h2>
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
          className="absolute top-0 -mt-3 h-7 w-0.5 bg-black"
          style={{ left: `${bmiPosition}%` }}>
          <div
            className="absolute -left-3 -top-5 text-[0.85rem] font-bold"
            style={{ color: bmiStatus.color }}>
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
      <div>
        <p className="mt-8">
          BMI:{' '}
          <span style={{ color: bmiStatus.color }}>
            {bmi.toFixed(1)} - {bmiStatus.status}
          </span>
        </p>
      </div>

      <p>Suggested Calories: {calorieTarget.toFixed(0)} kcal/day</p>
      <p>Suggested Protein: {proteinTarget.toFixed(1)} g/day</p>
      <div className="flex gap-4">
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded bg-gray-300 px-4 py-2 text-black">
          Restart
        </button>
        <button
          onClick={handleSaveTargets}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
          Save Targets
        </button>
      </div>
    </div>
  )
}

export default Targets
