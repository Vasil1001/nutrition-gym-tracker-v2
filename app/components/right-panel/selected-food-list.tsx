'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Food } from '@/lib/types'
import { Plus, Minus } from 'lucide-react'

interface SelectedFoodListProps {
  selectedFoods: Food[]
  foodCounts: { [key: string]: number }
  onAdd: (food: Food) => void
  onRemove: (food: Food) => void
  totals: {
    protein: number
    calories: number
    carbs: number
  }
}

export default function SelectedFoodList({
  selectedFoods,
  foodCounts,
  onAdd,
  onRemove,
  totals
}: SelectedFoodListProps) {
  const hasSelectedFoods = Object.keys(foodCounts).length > 0

  return (
    <div className="mx-2 mt-6 flex flex-1 flex-col overflow-hidden rounded-xl rounded-b-none outline outline-8 outline-[#2e3039]">
      {!hasSelectedFoods ? (
        <div className="flex h-[200px] items-center justify-center text-muted-foreground">
          No foods selected
        </div>
      ) : (
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-[#19191f]">
            <TableRow>
              <TableHead className="w-[40px] text-left">#</TableHead>
              <TableHead className="w-[150px]">Food</TableHead>
              <TableHead className="w-[1px] text-center">Protein</TableHead>
              <TableHead className="w-[1px] text-center">Calories</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="max-h-[calc(100%-6rem)] overflow-y-auto">
            {Object.entries(foodCounts).map(([foodName, count], i) => {
              const food = selectedFoods.find((f) => f.name === foodName)
              if (!food || count === 0) return null
              return (
                <TableRow className="group dark:hover:bg-[#2e3039]" key={i}>
                  <TableCell className="w-[10px] text-left font-medium text-muted-foreground">
                    x{count}
                  </TableCell>
                  <TableCell className="w-[150px]">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium">{foodName}</span>
                      </div>
                      <div className="hidden items-center gap-1 group-hover:flex">
                        <Minus
                          onClick={() => onRemove(food)}
                          className="h-4 w-4 cursor-pointer transition-colors hover:text-red-500 active:text-red-600"
                        />
                        <Plus
                          onClick={() => onAdd(food)}
                          className="h-4 w-4 cursor-pointer transition-colors hover:text-emerald-500 active:text-emerald-600"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="border-r text-center">
                    {(Number(food.protein) * count).toFixed()}g
                  </TableCell>
                  <TableCell className="text-center">
                    {(Number(food.calories) * count).toFixed()}cal
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
      <div className="sticky bottom-0 w-full border-t bg-[#2e3039] text-sm hover:bg-[#2e3039]">
        <div className="table w-full">
          <TableRow>
            <TableCell className="w-[40px] border-none py-3 text-center text-muted-foreground">
              #
            </TableCell>
            <TableCell className="w-[150px] border-none py-3 font-medium">Total</TableCell>
            <TableCell className="w-[1px] border-r border-none py-3 text-center">
              {totals.protein.toFixed()}g
            </TableCell>
            <TableCell className="w-[1px] border-none py-3 text-center">
              {totals.calories.toFixed()}cal
            </TableCell>
          </TableRow>
        </div>
      </div>
    </div>
  )
}
