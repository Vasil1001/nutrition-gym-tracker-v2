import { Card, CardContent } from '@/components/ui/card'
import { format } from 'date-fns'
import { FoodSummary } from '@/lib/types'
import { ProgressRings } from '@/app/components/charts/progress-rings'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface FoodSummaryCardProps {
  summary: FoodSummary
  userTargets: {
    calories: number
    protein: number
    carbs: number
  }
  isSelected: boolean
  onClick: () => void
  onDelete: (summaryId: string) => void
}

export default function FoodSummaryCard({
  summary,
  userTargets,
  isSelected,
  onClick,
  onDelete
}: FoodSummaryCardProps) {
  const isProteinTargetHit = summary.totalProtein >= userTargets.protein
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering card's onClick
    setShowDeleteDialog(true)
  }

  const handleConfirmDelete = () => {
    onDelete(summary.id)
    setShowDeleteDialog(false)
  }

  return (
    <>
      <Card
        className={`cursor-pointer transition-colors hover:bg-accent/50 ${
          isProteinTargetHit ? 'border-2 border-blue-500/50 bg-blue-500/10' : ''
        } ${isSelected ? 'ring-2 ring-primary' : ''}`}
        onClick={onClick}>
        <CardContent className="flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">
              {format(new Date(summary.date), 'MMM dd, yyyy')}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
              onClick={handleDeleteClick}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
          <ProgressRings
            calories={{ current: summary.totalCalories, target: userTargets.calories }}
            protein={{ current: summary.totalProtein, target: userTargets.protein }}
            carbs={{ current: summary.totalCarbs || 0, target: userTargets.carbs }}
          />
        </CardContent>
      </Card>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Food Summary</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this food summary from{' '}
              {format(new Date(summary.date), 'MMMM dd, yyyy')}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
