import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { format } from 'date-fns'
import { FoodSummary } from '@/lib/types'
import { ProgressCircle } from '../charts/progress-circle'
import { ProgressRings } from '../charts/progress-rings'
import { ProteinChart } from '../charts/protein-chart'

interface SummaryModalProps {
  selectedSummary: FoodSummary | null
  userTargets: { calories: number; protein: number; carbs: number }
  setSelectedSummary: (summary: FoodSummary | null) => void
  summaries: FoodSummary[]
}

export default function SummaryModal({
  selectedSummary,
  userTargets,
  setSelectedSummary,
  summaries
}: SummaryModalProps) {
  return (
    <Dialog open={!!selectedSummary} onOpenChange={() => setSelectedSummary(null)}>
      <DialogContent className="mx-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-xl p-0  sm:mx-auto lg:max-w-3xl">
        <div className="max-h-[calc(90vh-2rem)] overflow-y-auto px-3 py-4 sm:px-6">
          <DialogHeader>
            <DialogTitle className="flex justify-center">
              {selectedSummary && format(new Date(selectedSummary.date), 'MMMM dd, yyyy')}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-6 sm:gap-8">
            <div className="mx-auto flex max-w-[500px] justify-center gap-2 xs:gap-3 sm:gap-6 md:gap-8">
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
            <div className="rounded-lg border p-4">
              <h3 className="mb-4 text-lg font-semibold">Protein Progress</h3>
              <ProteinChart data={summaries} selectedSummaryId={selectedSummary?.id} />
            </div>
            <div className="flex flex-col rounded-lg border">
              <div className="border-b p-3 sm:p-4">
                <div className="flex flex-col items-center gap-4 px-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-4">
                  <div className="flex items-center justify-center">
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
                  <div className="grid grid-cols-3 gap-4 sm:flex sm:flex-1 sm:justify-end sm:gap-8">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-muted-foreground sm:text-sm">Protein</span>
                      <span className="text-xl font-bold text-blue-500 sm:text-2xl">
                        {Math.round(selectedSummary?.totalProtein || 0)}g
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-muted-foreground sm:text-sm">Calories</span>
                      <span className="text-xl font-bold text-orange-500 sm:text-2xl">
                        {Math.round(selectedSummary?.totalCalories || 0)}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-muted-foreground sm:text-sm">Carbs</span>
                      <span className="text-xl font-bold text-green-500 sm:text-2xl">
                        {Math.round(selectedSummary?.totalCarbs || 0)}g
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-h-[300px] overflow-y-auto p-3 sm:p-4">
                <div className="divide-y">
                  {selectedSummary?.foods.map((food, index) => (
                    <div
                      key={index}
                      className="flex flex-col py-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-accent px-1.5 py-0.5 text-xs font-medium">
                          x{food.count}
                        </span>
                        <span className="text-xs font-medium sm:text-sm">{food.name}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-2 pl-8 text-sm text-muted-foreground sm:mt-0 sm:pl-0 sm:text-sm">
                        <span className="whitespace-nowrap">{food.protein.toFixed()}g protein</span>
                        <span className="whitespace-nowrap">{food.calories.toFixed()} cal</span>
                        <span className="whitespace-nowrap">{food.carbs.toFixed()}g carbs</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
