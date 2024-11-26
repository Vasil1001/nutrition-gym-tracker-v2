interface ProgressCircleProps {
  current: number
  target: number
  label: string
  color: string
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  current,
  target,
  label,
  color
}) => {
  const percentage = Math.min(100, (current / target) * 100)
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - percentage / 100)

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 text-center">
        <div className="font-semibold">{label}</div>
      </div>

      <div className="relative h-24 w-24">
        <svg className="h-24 w-24" viewBox="0 0 96 96">
          <circle 
            cx="48" 
            cy="48" 
            r={radius} 
            stroke="#e5e7eb" 
            strokeWidth="8" 
            fill="none" 
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ 
              transition: 'stroke-dashoffset 0.5s ease',
              transformOrigin: 'center',
              transform: 'rotate(-90deg)'
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-xs ${current >= target ? '' : 'text-muted-foreground'}`}>
            {current.toFixed(0)}
            {current >= target ? '' : `/${target}`}
            {label === 'Protein' || label === 'Carbs' ? 'g' : ''}
          </div>
        </div>
      </div>
    </div>
  )
}