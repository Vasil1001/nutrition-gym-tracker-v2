import React from 'react'

interface ProgressRingsProps {
  calories: { current: number; target: number }
  protein: { current: number; target: number }
  carbs: { current: number; target: number }
}

export const ProgressRings: React.FC<ProgressRingsProps> = ({ calories, protein, carbs }) => {
  const rings = [
    { ...calories, color: '#FF9800', radius: 40 },
    { ...protein, color: '#2196F3', radius: 30 },
    { ...carbs, color: '#4CAF50', radius: 20 }
  ]

  const circleProps = (current: number, target: number, radius: number) => {
    const percentage = Math.min(100, (current / target) * 100)
    const circumference = 2 * Math.PI * radius
    const offset = circumference * (1 - percentage / 100)
    return { circumference, offset }
  }

  return (
    <div className="flex items-start justify-start gap-6 ">
      <svg className="h-24 w-24" viewBox="0 0 100 100">
        {rings.map((ring, i) => {
          const { circumference, offset } = circleProps(ring.current, ring.target, ring.radius)
          return (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={ring.radius}
              stroke={ring.color}
              strokeWidth="6"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
            />
          )
        })}
      </svg>
      <div className="flex flex-col justify-between text-left text-xs">
        <div>
          {calories.current.toFixed()}/{calories.target} cal
        </div>
        <div>
          {protein.current.toFixed()}/{protein.target} g Protein
        </div>
        <div>
          {carbs.current.toFixed()}/{carbs.target} g Carbs
        </div>
      </div>
    </div>
  )
}
