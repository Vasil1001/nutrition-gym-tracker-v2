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
import { Food, FoodProps } from './food-list'

export default function FoodAsListTable({ foods, foodCounts, onAdd, onRemove }: FoodProps) {
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
                <TableHead>Food</TableHead>
                <TableHead className="text-center">Serving</TableHead>
                <TableHead className="text-center">Calories</TableHead>
                <TableHead className="text-center">Protein</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foods.map((food, index) => (
                <TableRow
                  key={index}
                  className="group relative dark:bg-[#19191f] dark:hover:bg-[#2e3039] dark:hover:outline-0">
                  <TableCell className="flex gap-3 border-r text-center font-semibold">
                    <div
                      className={cn(
                        foodCounts[food.name] > 0 ? 'flex' : 'hidden',
                        'w-12 items-center justify-start gap-2 font-supreme text-sm font-medium text-muted-foreground transition-all delay-150 group-hover:flex'
                      )}>
                      <Minus
                        className="h-5 w-5 cursor-pointer opacity-0 group-hover:opacity-100 hover:text-foreground"
                        onClick={() => handleRemove(food)}
                      />
                      <p className="text-bold text-[0.9rem] tracking-tighter text-white">
                        {cn(foodCounts[food.name] > 0 && '', foodCounts[food.name])}
                      </p>
                      <Plus
                        className="h-5 w-5 cursor-pointer opacity-0 group-hover:opacity-100 hover:text-foreground"
                        onClick={() => handleAdd(food)}
                      />
                    </div>
                    {food.name}
                  </TableCell>
                  <TableCell className="border-r text-center">{food.servingSize} g</TableCell>
                  <TableCell className="border-r text-center">{food.calories} cal</TableCell>
                  <TableCell className="flex justify-center text-end">{food.protein} g</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
