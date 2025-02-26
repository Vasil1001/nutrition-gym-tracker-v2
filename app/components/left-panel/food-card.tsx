'use client'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { FoodCardProps } from '@/lib/types'
import { Minus, Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
export default function FoodCard({
  food,
  count,
  onAdd,
  onRemove,
  onRemoveFoodCard
}: FoodCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const handleDeleteClick = () => {
    setShowDeleteDialog(true)
  }

  const handleConfirmDelete = () => {
    onRemoveFoodCard()
    setShowDeleteDialog(false)
  }
  const handleAdd = () => {
    onAdd()
  }

  const handleRemove = () => {
    if (count > 0) {
      onRemove()
    }
  }

  return (
    <div>
      <Card key={food.name} className="group flex h-full flex-col rounded-lg">
        <CardContent className="flex flex-1 flex-col rounded-xl p-3 text-base">
          <div className="flex flex-1 flex-col">
            <div className="mb-2">
              <div className="flex items-start justify-between">
                <div className="flex">
                  <CardTitle className="mb-1 flex items-center text-xs">
                    {count > 0 && (
                      <span className="mr-1 whitespace-nowrap text-xs font-medium text-white">
                        x{count}
                      </span>
                    )}
                    <div className="flex cursor-pointer" onClick={handleDeleteClick}>
                      <CardTitle className="flex text-sm font-medium hover:text-red-500 hover:line-through ">
                        {food.name}
                      </CardTitle>
                    </div>
                  </CardTitle>
                </div>
                <div className="relative z-10 flex shrink-0 items-end gap-0.5 font-supreme text-xs font-medium text-muted-foreground transition-all delay-150">
                  {count > 0 && (
                    <Minus
                      className="h-5 w-5 cursor-pointer opacity-0 group-hover:opacity-100 hover:text-foreground active:text-gray-400"
                      onClick={handleRemove}
                    />
                  )}
                  <Plus
                    className="h-5 w-5 cursor-pointer opacity-0 group-hover:opacity-100 hover:text-foreground active:text-gray-400"
                    onClick={handleAdd}
                  />
                </div>
              </div>
              <CardDescription>
                <p className="-mt-0.5 font-supreme text-xs text-muted-foreground">
                  Per {food.serving_size} serving
                </p>
              </CardDescription>
            </div>
            <div className="mt-auto flex items-center justify-evenly gap-4">
              <div className="flex flex-1 flex-col items-center rounded-sm border border-[#19191f] p-1">
                <div className="text-xs uppercase text-muted-foreground xl:hidden">PR</div>
                <div className="hidden text-xs uppercase text-muted-foreground xl:block">
                  Protein
                </div>
                <div className="text-xs">{food.protein}g</div>
              </div>
              <div className="flex flex-1 flex-col items-center rounded-sm border border-[#19191f] p-1">
                <div className="text-xs uppercase text-muted-foreground xl:hidden">CAL</div>
                <div className="hidden text-xs uppercase text-muted-foreground xl:block">
                  Calories
                </div>
                <div className="text-xs">{food.calories}c</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Food Card</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {food.name}? This action cannot be undone.
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
    </div>
  )
}
