import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FoodSummary } from '@/lib/types'
import { format } from 'date-fns'
import { useState, useEffect, useMemo } from 'react'
import { ProgressCircle } from './progress-circle'
import { ProgressRings } from './progress-rings'
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
import { Button } from '@/components/ui/button'
import { ProteinChart } from './protein-chart'

interface FoodHistoryCardsProps {
  summaries: FoodSummary[]
  handleSaveDay: () => void
  foodCounts: { [key: string]: number }
}

// Update the tooltip props to allow undefined values
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

// Render helper to pass into Tooltip's content
const renderCustomTooltip = (props: CustomTooltipProps) => <CustomTooltip {...props} />

export default function FoodHistoryCards({
  summaries,
  handleSaveDay,
  foodCounts
}: FoodHistoryCardsProps) {
  const [selectedSummary, setSelectedSummary] = useState<FoodSummary | null>(null)
  const [showAllSummaries, setShowAllSummaries] = useState(false)
  const [userTargets, setUserTargets] = useState({
    calories: 2000,
    protein: 150,
    carbs: 250
  })

  // Load user targets from localStorage
  useEffect(() => {
    const savedTargets = localStorage.getItem('nutritionTargets')
    if (savedTargets) {
      const targets = JSON.parse(savedTargets)
      setUserTargets({
        calories: targets.calories.target,
        protein: targets.protein.target,
        carbs: targets.carbs.target
      })
    }
  }, [])

  // Sort summaries only once when summaries change
  const sortedSummaries = useMemo(() => {
    return [...summaries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [summaries])

  // Format data for the line chart using memoized sortedSummaries
  const chartData = sortedSummaries.map((summary) => ({
    date: format(new Date(summary.date), 'MMM dd'),
    protein: summary.totalProtein,
    isSelected: summary.id === selectedSummary?.id
  }))

  // Custom dot component to highlight selected date
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

  const displayedSummaries = summaries.slice(0, 6)
  const hasMoreSummaries = summaries.length > 6

  // Helper function to check if protein target was hit
  const isProteinTargetHit = (proteinAmount: number) => {
    return proteinAmount >= userTargets.protein
  }

  return (
    <div className="mb-10 mt-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Food History</h2>
          {hasMoreSummaries && (
            <Button variant="outline" onClick={() => setShowAllSummaries(true)} className="text-sm">
              View All ({summaries.length})
            </Button>
          )}
        </div>
        <Button onClick={handleSaveDay} disabled={Object.keys(foodCounts).length === 0}>
          Save Today&apos;s Food
        </Button>
      </div>

      {/* Main grid showing first 6 cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {displayedSummaries.map((summary) => (
          <Card
            key={summary.id}
            className={`cursor-pointer transition-colors hover:bg-accent/50 ${
              isProteinTargetHit(summary.totalProtein)
                ? 'border-2 border-blue-500/50 bg-blue-500/10'
                : ''
            }`}
            onClick={() => setSelectedSummary(summary)}>
            <CardContent className="flex flex-col gap-2 p-4">
              <div className="text-sm font-medium text-muted-foreground">
                {format(new Date(summary.date), 'MMM dd, yyyy')}
              </div>
              <ProgressRings
                calories={{ current: summary.totalCalories, target: userTargets.calories }}
                protein={{ current: summary.totalProtein, target: userTargets.protein }}
                carbs={{ current: summary.totalCarbs || 0, target: userTargets.carbs }}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Modal */}
      <Dialog open={showAllSummaries} onOpenChange={setShowAllSummaries}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>All Food History</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <div className="divide-y">
              {summaries.map((summary) => (
                <div
                  key={summary.id}
                  className={`cursor-pointer p-4 hover:bg-accent/50 ${
                    isProteinTargetHit(summary.totalProtein) ? 'bg-blue-500/10' : ''
                  }`}
                  onClick={() => {
                    setSelectedSummary(summary)
                    setShowAllSummaries(false)
                  }}>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      {format(new Date(summary.date), 'MMMM dd, yyyy')}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{summary.totalCalories} calories</span>
                      <span
                        className={
                          isProteinTargetHit(summary.totalProtein)
                            ? 'font-semibold text-blue-500'
                            : ''
                        }>
                        {Number(summary.totalProtein).toFixed()}g protein
                      </span>
                      <span>{summary.totalCarbs}g carbs</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Existing Details Modal */}
      <Dialog open={!!selectedSummary} onOpenChange={() => setSelectedSummary(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex justify-center">
              {selectedSummary && format(new Date(selectedSummary.date), 'MMMM dd, yyyy')}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-8">
            <div className="mx-auto flex max-w-[500px] justify-center gap-8">
              {selectedSummary && (
                <>
                  <ProgressCircle
                    current={selectedSummary.totalCalories}
                    target={userTargets.calories}
                    label="Calories"
                    color="#FF9800"
                  />
                  <ProgressCircle
                    current={selectedSummary.totalProtein}
                    target={userTargets.protein}
                    label="Protein"
                    color="#2196F3"
                  />
                  <ProgressCircle
                    current={selectedSummary.totalCarbs || 0}
                    target={userTargets.carbs}
                    label="Carbs"
                    color="#4CAF50"
                  />
                </>
              )}
            </div>
            {/* Protein Progress Chart */}
            <div className="rounded-lg border p-4">
              <h3 className="mb-4 text-lg font-semibold">Protein Progress</h3>
              <ProteinChart data={summaries} selectedSummaryId={selectedSummary?.id} />
            </div>
            <div className="flex flex-col rounded-lg border">
              {/* Totals section */}
              <div className="border-b p-4">
                <div className="flex items-center justify-between px-4">
                  {/* Progress Rings without labels */}
                  <div className="flex items-center">
                    <ProgressRings
                      calories={{
                        current: selectedSummary?.totalCalories || 0,
                        target: userTargets.calories
                      }}
                      protein={{
                        current: selectedSummary?.totalProtein || 0,
                        target: userTargets.protein
                      }}
                      carbs={{
                        current: selectedSummary?.totalCarbs || 0,
                        target: userTargets.carbs
                      }}
                      showLabels={false}
                    />
                  </div>
                  <div className="flex flex-1 justify-end gap-8">
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-muted-foreground">Total Protein</span>
                      <span className="text-2xl font-bold text-blue-500">
                        {Number(selectedSummary?.totalProtein).toFixed(1)}g
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-muted-foreground">Total Calories</span>
                      <span className="text-2xl font-bold text-orange-500">
                        {Math.round(selectedSummary?.totalCalories || 0)}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-muted-foreground">Total Carbs</span>
                      <span className="text-2xl font-bold text-green-500">
                        {Math.round(selectedSummary?.totalCarbs || 0)}g
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable food list */}
              <div className="max-h-[300px] overflow-y-auto p-4">
                <div className="divide-y">
                  {selectedSummary?.foods.map((food, index) => (
                    <div key={index} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-accent px-2 py-0.5 text-sm font-medium">
                          x{food.count}
                        </span>
                        <span className="font-medium">{food.name}</span>
                      </div>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{Number(food.protein).toFixed()}g protein</span>
                        <span>{Number(food.calories).toFixed()} cal</span>
                        <span>{Number(food.carbs).toFixed()}g carbs</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
