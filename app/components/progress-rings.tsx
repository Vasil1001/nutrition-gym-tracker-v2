import React from 'react'

interface ProgressRingsProps {
  calories: { current: number; target: number }
  protein: { current: number; target: number }
  carbs: { current: number; target: number }
}

export const ProgressRings: React.FC<ProgressRingsProps> = ({ calories, protein, carbs }) => {
  const rings = [
    { ...calories, color: '#FF9800', radius: 30 },
    { ...protein, color: '#2196F3', radius: 22 },
    { ...carbs, color: '#4CAF50', radius: 14 }
  ]

  const circleProps = (current: number, target: number, radius: number) => {
    const percentage = Math.min(100, (current / target) * 100)
    const circumference = 2 * Math.PI * radius
    const offset = circumference * (1 - percentage / 100)
    return { circumference, offset }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-1.5">
      <svg className="h-20 w-20" viewBox="0 0 100 100">
        {rings.map((ring, i) => {
          const { circumference, offset } = circleProps(ring.current, ring.target, ring.radius)
          return (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={ring.radius}
              stroke={ring.color}
              strokeWidth="4"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
            />
          )
        })}
      </svg>
      <div className="flex flex-col items-center justify-center gap-0.5 font-semibold">
        <div className="flex items-center gap-1 text-xs" style={{ color: '#FF9800' }}>
          <span>{Math.round(calories.current)}</span>
          <span>{calories.current >= calories.target ? 'cal' : `/${calories.target}cal`}</span>
        </div>
        <div className="flex items-center gap-1 text-xs" style={{ color: '#2196F3' }}>
          <span>{Number(protein.current).toFixed(1)}g</span>
          <span>{protein.current >= protein.target ? 'Protein' : `/${protein.target}g`}</span>
        </div>
        <div className="flex items-center gap-1 text-xs" style={{ color: '#4CAF50' }}>
          <span>{Math.round(carbs.current)}g</span>
          <span>{carbs.current >= carbs.target ? 'Carbs' : `/${carbs.target}g`}</span>
        </div>
      </div>
    </div>
  )
}
