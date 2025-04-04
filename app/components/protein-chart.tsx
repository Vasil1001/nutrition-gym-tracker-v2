'use client'
import { FoodSummary } from '@/lib/types'
import { format } from 'date-fns'
import {
  LineChart,
  Line,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis
} from 'recharts'

interface ProteinChartProps {
  data: FoodSummary[]
  selectedSummaryId?: string
  className?: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
        <p className="mb-1 text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">
          <span className="text-blue-500">{payload[0].value}g</span>
          <span className="ml-1 text-sm text-muted-foreground">protein</span>
        </p>
      </div>
    )
  }
  return null
}

export function ProteinChart({ data, selectedSummaryId, className = '' }: ProteinChartProps) {
  const sortedData = [...data]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7)
    .map((summary) => ({
      date: format(new Date(summary.date), 'MMM dd'),
      protein: summary.totalProtein,
      isSelected: summary.id === selectedSummaryId
    }))

  const userTargets = JSON.parse(
    localStorage.getItem('nutritionTargets') || '{"protein":{"target":150}}'
  )

  const CustomDot = ({ cx, cy, payload }: any) => {
    if (payload.isSelected) {
      return (
        <svg x={cx - 6} y={cy - 6} width="12" height="12" fill="currentColor">
          <circle cx="6" cy="6" r="6" fill="#2196F3" stroke="white" strokeWidth="2" />
        </svg>
      )
    }
    return (
      <svg x={cx - 4} y={cy - 4} width="8" height="8" fill="currentColor">
        <circle cx="4" cy="4" r="4" fill="#2196F3" />
      </svg>
    )
  }

  const renderCustomizedLabel = (props: any) => {
    const { viewBox } = props
    const { width, height } = viewBox
    const x = width / 2
    const y = viewBox.y
    const target = JSON.parse(
      localStorage.getItem('nutritionTargets') || '{"protein":{"target":150}}'
    ).protein.target
    const labelValue = `Target ${target}g`
    const labelWidth = labelValue.length * 8
    const rectHeight = 22
    const rectWidth = labelWidth + 3

    return (
      <g>
        <rect
          x={x - rectWidth / 2}
          y={y - rectHeight / 2}
          width={rectWidth}
          height={rectHeight}
          fill="rgba(33, 150, 243, 0.4)"
          rx={3}
        />
        <text
          x={x}
          y={y + 5}
          dy={0}
          textAnchor="middle"
          fill="white"
          fontSize={13}
          fontWeight={400}>
          {labelValue}
        </text>
      </g>
    )
  }

  return (
    <div className={`h-[200px] w-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sortedData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis
            dataKey="date"
            stroke="#666"
            fontSize={12}
            interval={Math.ceil(sortedData.length / 7)}
            tick={({ x, y, payload }) => (
              <g transform={`translate(${x},${y})`}>
                <text
                  x={0}
                  y={0}
                  dy={16}
                  textAnchor="middle"
                  fill={sortedData[payload.index].isSelected ? '#2196F3' : '#666'}
                  fontWeight={sortedData[payload.index].isSelected ? 'normal' : 'normal'}
                  fontSize={13}>
                  {payload.value}
                </text>
              </g>
            )}
          />
          <YAxis stroke="#666" fontSize={12} />
          <Tooltip content={CustomTooltip} />
          <ReferenceLine
            y={userTargets.protein.target}
            stroke="#2196F3"
            strokeDasharray="3 3"
            label={renderCustomizedLabel}
          />
          <Line
            type="monotone"
            dataKey="protein"
            stroke="#2196F3"
            strokeWidth={2}
            dot={<CustomDot />}
            activeDot={{ r: 8, fill: '#2196F3', stroke: '#000' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
