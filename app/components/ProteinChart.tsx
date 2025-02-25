import React from 'react'

interface ProteinChartProps {
  protein: number
  target: number
}

const ProteinChart: React.FC<ProteinChartProps> = ({ protein, target }) => {
  const percentage = Math.min((protein / target) * 100, 100)
  return (
    <div className="relative mt-4 h-6">
      {/* Background Bar */}
      <div className="absolute inset-0 rounded bg-gray-200" />
      {/* Protein Fill */}
      <div className="absolute inset-0 rounded bg-blue-500" style={{ width: `${percentage}%` }} />
      {/* Protein Label */}
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
        {protein} / {target}g
      </div>
    </div>
  )
}

export default ProteinChart
