import React from 'react'

interface ProgressRingsProps {
  calories: { current: number; target: number }
  protein: { current: number; target: number }
  carbs: { current: number; target: number }
  showLabels?: boolean
}

export const ProgressRings: React.FC<ProgressRingsProps> = ({
  calories,
  protein,
  carbs,
  showLabels = true
}) => {
  const rings = [
    {
      ...calories,
      color: '#FF9800',
      mutedColor: 'rgba(255, 152, 0, 0.2)',
      radius: 36
    },
    {
      ...protein,
      color: '#2196F3',
      mutedColor: 'rgba(33, 150, 243, 0.2)',
      radius: 27
    },
    {
      ...carbs,
      color: '#4CAF50',
      mutedColor: 'rgba(76, 175, 80, 0.2)',
      radius: 18
    }
  ]

  const circleProps = (current: number, target: number, radius: number) => {
    const percentage = Math.min(100, (current / target) * 100)
    const circumference = 2 * Math.PI * radius
    const offset = circumference * (1 - percentage / 100)
    return { circumference, offset }
  }

  return (
    <div className="flex flex-row items-center justify-center gap-4 sm:flex-col sm:gap-1.5">
      <svg className="h-20 w-20" viewBox="0 0 100 100">
        {rings.map((ring, i) => {
          const { circumference, offset } = circleProps(ring.current, ring.target, ring.radius)
          return (
            <React.Fragment key={i}>
              {/* Background circle (muted) */}
              <circle
                cx="50"
                cy="50"
                r={ring.radius}
                stroke={ring.mutedColor}
                strokeWidth="5"
                fill="none"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r={ring.radius}
                stroke={ring.color}
                strokeWidth="5"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
              />
            </React.Fragment>
          )
        })}
      </svg>
      {showLabels && (
        <div className="flex flex-col items-start justify-center gap-0.5 sm:items-center">
          <div className="flex items-start gap-1 text-xs" style={{ color: '#FF9800' }}>
            <span>{Math.round(calories.current)}c</span>
            <span className="xs:hidden">{calories.current >= calories.target ? 'cal' : ''}</span>
            <span className="xs:inline hidden">
              {calories.current >= calories.target ? 'cal' : `/ ${calories.target}cal`}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs" style={{ color: '#2196F3' }}>
            <span>{Number(protein.current).toFixed(1)}g</span>
            <span className="xs:hidden">{protein.current >= protein.target ? '' : ''}</span>
            <span className="xs:inline hidden">
              {protein.current >= protein.target ? '' : `/ ${protein.target}g`}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs" style={{ color: '#4CAF50' }}>
            <span>{Math.round(carbs.current)}ca</span>
            <span className="xs:hidden">{carbs.current >= carbs.target ? 'Carbs' : ''}</span>
            <span className="xs:inline hidden">
              {carbs.current >= carbs.target ? 'Carbs' : `/ ${carbs.target}carb`}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
