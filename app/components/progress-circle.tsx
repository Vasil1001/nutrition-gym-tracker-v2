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
    <div className="rounded-lg bg-card p-3 shadow-sm md:border-0 bg-transparent md:p-0 md:shadow-none">
      <div className="flex flex-col items-center gap-2">
        <div className="relative h-20 w-20 md:h-14 md:w-14 lg:h-20 lg:w-20">
          <svg className="h-full w-full" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r={radius} stroke="#e5e7eb" strokeWidth="8" fill="none" />
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
            <div
              className={`text-xs md:text-[10px] ${
                current >= target ? '' : 'text-muted-foreground'
              }`}>
              {current.toFixed(0)}
              <span className="hidden lg:inline">
                {current >= target ? '' : `/${target}`}
                {label === 'Protein' || label === 'Carbs' ? 'g' : ''}
              </span>
              <span className="lg:hidden">
                {label === 'Protein' || label === 'Carbs' ? 'g' : ''}
              </span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold md:text-xs lg:text-sm">{label}</div>
        </div>
      </div>
    </div>
  )
}
