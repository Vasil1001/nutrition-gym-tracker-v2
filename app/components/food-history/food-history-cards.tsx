import { useState, useEffect, useMemo } from 'react'
import { format } from 'date-fns'
import { FoodSummary } from '@/lib/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import FoodSummaryCard from './food-summary-card'
import SummaryModal from './summary-modal'
import { Trash2 } from 'lucide-react'

interface FoodHistoryCardsProps {
  summaries: FoodSummary[]
  handleSaveDay: () => void
  foodCounts: { [key: string]: number }
  onDeleteSummary: (summaryId: string) => void
}

export default function FoodHistoryCards({
  summaries,
  handleSaveDay,
  foodCounts,
  onDeleteSummary
}: FoodHistoryCardsProps) {
  const [selectedSummary, setSelectedSummary] = useState<FoodSummary | null>(null)
  const [showAllSummaries, setShowAllSummaries] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    open: boolean
    summaryId: string | null
  }>({
    open: false,
    summaryId: null
  })
  const [userTargets, setUserTargets] = useState({
    calories: 2000,
    protein: 150,
    carbs: 250
  })

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

  const sortedSummaries = useMemo(() => {
    return [...summaries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [summaries])

  const displayedSummaries = summaries.slice(0, 6)
  const hasMoreSummaries = summaries.length > 6

  const isProteinTargetHit = (proteinAmount: number) => {
    return proteinAmount >= userTargets.protein
  }

  const handleDeleteClick = (summaryId: string) => {
    setDeleteConfirmation({ open: true, summaryId })
  }

  const handleConfirmDelete = () => {
    if (deleteConfirmation.summaryId) {
      onDeleteSummary(deleteConfirmation.summaryId)
    }
    setDeleteConfirmation({ open: false, summaryId: null })
  }

  return (
    <div className="mb-10 mt-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-medium md:text-xl">Food History</h2>
          {hasMoreSummaries && (
            <Button
              variant="outline"
              onClick={() => setShowAllSummaries(true)}
              className="text-xs md:text-xs ">
              View All ({summaries.length})
            </Button>
          )}
        </div>
        <Button
          onClick={() => handleSaveDay()}
          disabled={Object.keys(foodCounts).length === 0}
          className="px-2 text-xs md:px-3 md:text-sm">
          Save Today&apos;s Food
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5">
        {displayedSummaries.map((summary) => (
          <FoodSummaryCard
            key={summary.id}
            summary={summary}
            userTargets={userTargets}
            isSelected={summary.id === selectedSummary?.id}
            onClick={() => setSelectedSummary(summary)}
            onDelete={onDeleteSummary}
          />
        ))}
      </div>

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
                  className={`flex cursor-pointer items-center justify-between p-4 hover:bg-accent/50 ${
                    isProteinTargetHit(summary.totalProtein) ? 'bg-blue-500/10' : ''
                  }`}>
                  <div
                    className="flex-grow"
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => handleDeleteClick(summary.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteConfirmation.open}
        onOpenChange={(open) => setDeleteConfirmation({ ...deleteConfirmation, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Food Summary</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this food summary? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmation({ open: false, summaryId: null })}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SummaryModal
        selectedSummary={selectedSummary}
        userTargets={userTargets}
        setSelectedSummary={setSelectedSummary}
        summaries={summaries}
        onDeleteSummary={onDeleteSummary}
      />
    </div>
  )
}
