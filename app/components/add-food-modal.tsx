import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Food } from '@/lib/foods'

type AddFoodModalProps = {
  onAddFood: (food: Food) => void
}

export function AddFoodModal({ onAddFood }: AddFoodModalProps) {
  const [open, setOpen] = useState(false)
  const [newFood, setNewFood] = useState<Food>({
    name: '',
    servingSize: '',
    protein: '',
    calories: '',
    carbs: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddFood(newFood)
    setOpen(false)
    setNewFood({
      name: '',
      servingSize: '',
      protein: '',
      calories: '',
      carbs: ''
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded px-2.5 py-2 text-xs transition duration-300 lg:text-sm">
          Add Food
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Food</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              value={newFood.name}
              onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="serving">Serving Size</label>
            <Input
              id="serving"
              value={newFood.servingSize}
              onChange={(e) => setNewFood({ ...newFood, servingSize: e.target.value })}
              required
              placeholder="e.g., 100g"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="protein">Protein (g)</label>
            <Input
              id="protein"
              value={newFood.protein}
              onChange={(e) => setNewFood({ ...newFood, protein: e.target.value })}
              required
              type="number"
              step="0.1"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="calories">Calories</label>
            <Input
              id="calories"
              value={newFood.calories}
              onChange={(e) => setNewFood({ ...newFood, calories: e.target.value })}
              required
              type="number"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="carbs">Carbs (g)</label>
            <Input
              id="carbs"
              value={newFood.carbs}
              onChange={(e) => setNewFood({ ...newFood, carbs: e.target.value })}
              required
              type="number"
              step="0.1"
            />
          </div>
          <Button type="submit">Add Food</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
