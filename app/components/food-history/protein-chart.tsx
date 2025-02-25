import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'
import { format } from 'date-fns'
import { FoodSummary } from '@/lib/types'

interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

interface ProteinChartProps {
  data: FoodSummary[]
  selectedSummaryId?: string
}

// Extract CustomTooltip to its own component
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

// Extract CustomDot to its own component
const CustomDot = ({ cx, cy, payload, selectedSummaryId }: any) => {
  const isSelected = payload.id === selectedSummaryId

  if (isSelected) {
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

export default function ProteinChart({ data, selectedSummaryId }: ProteinChartProps) {
  // Format data for the chart
  const chartData = data.map((summary) => ({
    date: format(new Date(summary.date), 'MMM dd'),
    protein: summary.totalProtein,
    id: summary.id
  }))

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="protein"
          stroke="#2196F3"
          strokeWidth={2}
          dot={(props) => <CustomDot {...props} selectedSummaryId={selectedSummaryId} />}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
