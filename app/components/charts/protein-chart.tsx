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
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
  const [pageOffset, setPageOffset] = useState(0)
  const entriesPerPage = 7
  const [proteinTarget, setProteinTarget] = useState(150)

  // Load target from localStorage when component mounts
  useEffect(() => {
    try {
      const userTargets = JSON.parse(
        localStorage.getItem('nutritionTargets') || '{"protein":{"target":150}}'
      )
      setProteinTarget(userTargets.protein.target)
    } catch (error) {
      console.error('Failed to load protein target:', error)
      setProteinTarget(150) // Fallback value
    }
  }, [])

  // Sort all data by date
  const allSortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  // Get total possible pages
  const maxPages = Math.ceil(allSortedData.length / entriesPerPage)

  // Calculate the correct slice of data to show based on the current page offset
  const startIndex = Math.max(
    0,
    allSortedData.length - entriesPerPage - pageOffset * entriesPerPage
  )
  const endIndex = Math.min(
    allSortedData.length,
    allSortedData.length - pageOffset * entriesPerPage
  )

  const displayData = allSortedData.slice(Math.max(0, startIndex), endIndex).map((summary) => ({
    date: format(new Date(summary.date), 'MMM dd'),
    protein: summary.totalProtein,
    isSelected: summary.id === selectedSummaryId
  }))

  // Navigation handlers
  const showOlderData = () => {
    if (startIndex > 0) {
      setPageOffset(pageOffset + 1)
    }
  }

  const showNewerData = () => {
    if (pageOffset > 0) {
      setPageOffset(pageOffset - 1)
    }
  }

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
    const { width } = viewBox
    const x = width / 2
    const y = viewBox.y
    const labelValue = `Target ${proteinTarget}g`
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

  // Get date ranges for display
  const dateRange =
    displayData.length > 0
      ? `${displayData[0].date} - ${displayData[displayData.length - 1].date}`
      : 'No data'

  return (
    <div className={`w-full ${className}`}>
      <div className="mx-6 mb-2 mt-4 flex items-center justify-between">
        <h4 className="text-sm font-medium">Protein History</h4>
        <span className="text-xs text-muted-foreground">{dateRange}</span>
      </div>

      <div className="h-[210px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={displayData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="date"
              stroke="#666"
              fontSize={12}
              interval={Math.ceil(displayData.length / 7)}
              tick={({ x, y, payload }) => (
                <g transform={`translate(${x},${y})`}>
                  <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="middle"
                    fill={displayData[payload.index]?.isSelected ? '#2196F3' : '#666'}
                    fontWeight={displayData[payload.index]?.isSelected ? 'normal' : 'normal'}
                    fontSize={13}>
                    {payload.value}
                  </text>
                </g>
              )}
            />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip content={CustomTooltip} />
            <ReferenceLine
              y={proteinTarget}
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

      {allSortedData.length > entriesPerPage && (
        <div className="my-2 flex items-center justify-center gap-4 pt-1">
          <button
            onClick={showOlderData}
            disabled={startIndex <= 0}
            className={`flex items-center rounded-md border px-2 py-1 text-xs ${
              startIndex <= 0 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'
            }`}>
            <ChevronLeft className="mr-1 h-3 w-3" />
            Older
          </button>

          <span className="text-xs text-muted-foreground">
            Page {pageOffset + 1} of {Math.max(1, maxPages)}
          </span>

          <button
            onClick={showNewerData}
            disabled={pageOffset <= 0}
            className={`flex items-center rounded-md border px-2 py-1 text-xs ${
              pageOffset <= 0 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'
            }`}>
            Newer
            <ChevronRight className="ml-1 h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  )
}
