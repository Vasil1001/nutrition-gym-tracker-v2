import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { Food } from '@/lib/types'

interface FoodCardProps {
  foods: Food[]
  setFoods: React.Dispatch<React.SetStateAction<Food[]>>
  foodCounts: { [key: string]: number }
  onAdd: (food: Food) => void
  onRemove: (food: Food) => void
}

export default function FoodAsListTable({ foods, foodCounts, onAdd, onRemove }: FoodCardProps) {
  const [counts, setCounts] = useState<{ [key: string]: number }>({})

  const handleAdd = (food: Food) => {
    const newCount = (foodCounts[food.name] || 0) + 1
    setCounts({ ...foodCounts, [food.name]: newCount })
    onAdd(food)
  }

  const handleRemove = (food: Food) => {
    const newCount = foodCounts[food.name] - 1
    setCounts({ ...foodCounts, [food.name]: newCount })
    onRemove(food)
  }
  return (
    <Card className="m-2 ">
      <CardContent className="rounded-xl p-0 outline outline-8 outline-[#2e3039]">
        <div className="overflow-auto rounded-xl ">
          <Table className="">
            <TableHeader className="w-full bg-[#19191f]">
              <TableRow>
                <TableHead className="w-[50%]">Food</TableHead>
                <TableHead className="w-[16%] text-center">Serving</TableHead>
                <TableHead className="w-[17%] text-center">Calories</TableHead>
                <TableHead className="w-[17%] text-center">Protein</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foods.map((food, index) => (
                <TableRow
                  key={index}
                  className="group relative transition-all dark:bg-[#19191f] dark:hover:bg-[#2e3039] dark:hover:outline-0">
                  <TableCell className="flex w-[90%] border-r font-semibold">
                    <div className="flex  items-center">
                      <div
                        className={cn(
                          foodCounts[food.name] > 0
                            ? 'flex justify-start'
                            : 'hidden justify-center',
                          'w-11 items-center gap-2 font-supreme text-sm font-medium text-muted-foreground transition-all delay-150 group-hover:flex'
                        )}>
                        {foodCounts[food.name] > 0 && (
                          <p
                            onClick={() => handleRemove(food)}
                            className="cursor-pointer font-bold tracking-tighter opacity-0 transition-colors group-hover:opacity-100 hover:text-red-500 active:text-red-600">
                            —
                          </p>
                        )}
                        <span className="text-[0.9rem] font-bold tracking-tighter text-white transition-all delay-150">
                          {foodCounts[food.name] || ''}
                        </span>
                        <p
                          onClick={() => handleAdd(food)}
                          className="cursor-pointer font-bold  text-white opacity-0 transition-colors group-hover:opacity-100 hover:text-emerald-500 active:text-emerald-600">
                          +
                        </p>
                      </div>
                    </div>
                    <span className="ml-2">{food.name}</span>
                  </TableCell>
                  <TableCell className="w-[10%] border-r text-center">
                    {food.serving_size}
                  </TableCell>
                  <TableCell className="w-[10%] border-r text-center">{food.calories}cal</TableCell>
                  <TableCell className="w-[10%] text-center">{food.protein}g</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
