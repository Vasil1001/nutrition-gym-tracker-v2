'use client'

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
import { Weight } from '@/lib/types'

type AddWeightModalProps = {
  onAddWeight: (weight: Weight) => void
}

export function AddWeightModal({ onAddWeight }: AddWeightModalProps) {
  const [open, setOpen] = useState(false)
  const [newWeight, setNewWeight] = useState<Weight>({
    exercise: '',
    kgLifted: 0,
    reps: 0,
    sets: 0,
    date: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newWeight.exercise.trim() === '') {
      alert('Exercise name is required.')
      return
    }
    onAddWeight(newWeight)
    setOpen(false)
    setNewWeight({
      exercise: '',
      kgLifted: 0,
      reps: 0,
      sets: 0,
      date: new Date().toISOString().split('T')[0]
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded px-2.5 py-2 text-xs transition duration-300 lg:text-sm">
          Add Weight
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Weight</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Exercise */}
          <div className="grid gap-2">
            <label htmlFor="exercise">Exercise</label>
            <Input
              id="exercise"
              value={newWeight.exercise}
              onChange={(e) => setNewWeight({ ...newWeight, exercise: e.target.value })}
              required
            />
          </div>
          {/* Kg Lifted */}
          <div className="grid gap-2">
            <label htmlFor="kgLifted">Kg Lifted</label>
            <Input
              id="kgLifted"
              type="number"
              value={newWeight.kgLifted || ''}
              onChange={(e) =>
                setNewWeight({ ...newWeight, kgLifted: parseFloat(e.target.value) || 0 })
              }
              required
              step="0.1"
            />
          </div>
          {/* Reps */}
          <div className="grid gap-2">
            <label htmlFor="reps">Reps</label>
            <Input
              id="reps"
              type="number"
              value={newWeight.reps || ''}
              onChange={(e) => setNewWeight({ ...newWeight, reps: parseInt(e.target.value) || 0 })}
              required
              step="1"
            />
          </div>
          {/* Sets */}
          <div className="grid gap-2">
            <label htmlFor="sets">Sets</label>
            <Input
              id="sets"
              type="number"
              value={newWeight.sets || ''}
              onChange={(e) => setNewWeight({ ...newWeight, sets: parseInt(e.target.value) || 0 })}
              required
              step="1"
            />
          </div>
          {/* Date */}
          <div className="grid gap-2">
            <label htmlFor="date">Date</label>
            <Input
              id="date"
              type="date"
              value={newWeight.date}
              onChange={(e) => setNewWeight({ ...newWeight, date: e.target.value })}
              required
            />
          </div>
          {/* Submit Button */}
          <Button type="submit">Add Weight</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
