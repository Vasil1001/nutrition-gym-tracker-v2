// app/components/add-food-modal.tsx
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
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/app/context/AuthContext'
import { Food } from '@/lib/types'

type AddFoodModalProps = {
  onAddFood: (food: Food) => void
}

export function AddFoodModal({ onAddFood }: AddFoodModalProps) {
  const { session } = useAuth()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newFood, setNewFood] = useState<Omit<Food, 'id' | 'user_id'>>({
    name: '',
    serving_size: '',
    protein: 0,
    calories: 0,
    carbs: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session) {
      setError('You must be logged in to add food')
      return
    }

    const foodWithUserId: Food = {
      ...newFood,
      user_id: session.user.id
    }

    const { data, error: insertError } = await supabase
      .from('foods')
      .insert([foodWithUserId])
      .select()
      .single()

    if (insertError) {
      setError(insertError.message)
      console.error('Error adding food:', insertError)
      return
    }

    if (data) {
      onAddFood(data)
      setOpen(false)
      setNewFood({
        name: '',
        serving_size: '',
        protein: 0,
        calories: 0,
        carbs: 0
      })
      setError(null)
    }
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
          <DialogTitle className="text-center text-xl font-bold">Add New Food</DialogTitle>
          <p className="text-center text-sm text-muted-foreground">
            Add your custom food with nutritional values
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Food Name
              </label>
              <Input
                id="name"
                value={newFood.name}
                onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                className="rounded-md border border-[#30303b] bg-background/50 shadow-sm transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="serving" className="text-sm font-medium">
                Serving Size
              </label>
              <Input
                id="serving"
                value={newFood.serving_size}
                onChange={(e) => setNewFood({ ...newFood, serving_size: e.target.value })}
                className="rounded-md border border-[#30303b] bg-background/50 shadow-sm transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                required
                placeholder="e.g., 100g, 1 scoop"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <label htmlFor="protein" className="text-sm font-medium">
                Protein (g)
              </label>
              <Input
                id="protein"
                value={newFood.protein}
                onChange={(e) => setNewFood({ ...newFood, protein: parseFloat(e.target.value) })}
                className="rounded-md border border-[#30303b] bg-background/50 shadow-sm transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                required
                type="number"
                step="0.1"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="calories" className="text-sm font-medium">
                Calories
              </label>
              <Input
                id="calories"
                value={newFood.calories}
                onChange={(e) => setNewFood({ ...newFood, calories: parseFloat(e.target.value) })}
                className="rounded-md border border-[#30303b] bg-background/50 shadow-sm transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                required
                type="number"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="carbs" className="text-sm font-medium">
                Carbs (g)
              </label>
              <Input
                id="carbs"
                value={newFood.carbs}
                onChange={(e) => setNewFood({ ...newFood, carbs: parseFloat(e.target.value) })}
                className="rounded-md border border-[#30303b] bg-background/50 shadow-sm transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                required
                type="number"
                step="0.1"
              />
            </div>
          </div>
          <Button type="submit" className="mt-4 w-full">
            Add Food
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
