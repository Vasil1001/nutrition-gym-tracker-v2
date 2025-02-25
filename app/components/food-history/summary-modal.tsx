import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { format } from 'date-fns'
import { FoodSummary } from '@/lib/types'
import { ProgressCircle } from '../progress-circle'
import { ProgressRings } from '../progress-rings'
import { ProteinChart } from '../protein-chart'

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
          <div className="rounded-lg border p-4">
            <h3 className="mb-4 text-lg font-semibold">Protein Progress</h3>
            <ProteinChart data={summaries} selectedSummaryId={selectedSummary?.id} />
          </div>
          <div className="flex flex-col rounded-lg border">
            <div className="border-b p-4">
              <div className="flex items-center justify-between px-4">
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
  )
}
