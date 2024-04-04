import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Minus, MinusIcon, Plus, PlusIcon } from 'lucide-react'
import { Food, FoodProps } from './food-list'
import App from '../../../components/ui/icons/plus-icon'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function FoodAsListTable({ foods, foodCounts, onAdd, onRemove }: FoodProps) {
  // Initialize counts as an object mapping food names to their counts
  const [counts, setCounts] = useState<{ [key: string]: number }>({})

  const handleAdd = (food: Food) => {
    // Increment count for the specific food
    const newCount = (foodCounts[food.name] || 0) + 1
    setCounts({ ...foodCounts, [food.name]: newCount })
    onAdd(food)
  }

  const handleRemove = (food: Food) => {
    // Decrement count for the specific food if it's greater than 0
    if (counts[food.name] > 0) {
      const newCount = foodCounts[food.name] - 1
      setCounts({ ...foodCounts, [food.name]: newCount })
      onRemove(food)
    }
  }
  return (
    <Card className="my-2 ml-2 ">
      <CardContent className="rounded-xl p-0 outline outline-8 outline-[#2e3039]">
        <div className="overflow-auto rounded-xl ">
          <Table className="">
            <TableHeader className="w-full bg-[#19191f]">
              <TableRow>
                <TableHead>Food</TableHead>
                <TableHead className="text-end">Serving</TableHead>
                <TableHead className="text-end">Calories</TableHead>
                <TableHead className="text-end">Protein</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foods.map((food, index) => (
                <TableRow
                  key={index}
                  className="group relative dark:bg-[#19191f] dark:hover:bg-[#2e3039] dark:hover:outline-0">
                  <TableCell className="flex gap-3 font-semibold">
                    <div
                      className={cn(
                        foodCounts[food.name] > 0 ? 'flex' : 'hidden',
                        'w-10 items-center justify-start gap-2 font-supreme text-sm font-medium text-muted-foreground transition-all delay-150 group-hover:flex'
                      )}>
                      <Minus
                        className="h-4 w-4 cursor-pointer opacity-0 group-hover:opacity-100 hover:text-foreground"
                        onClick={() => handleRemove(food)}
                      />
                      <p className="text-bold text-[0.9rem] tracking-tighter text-white">
                        {cn(foodCounts[food.name] > 0 && '', foodCounts[food.name])}
                      </p>
                      <Plus
                        className="h-4 w-4 cursor-pointer opacity-0 group-hover:opacity-100 hover:text-foreground"
                        onClick={() => handleAdd(food)}
                      />
                    </div>
                    {food.name}
                  </TableCell>
                  <TableCell className="text-end">{food.servingSize} g</TableCell>
                  <TableCell className="text-end">{food.calories} cal</TableCell>
                  <TableCell className="mr-1.5 flex justify-end text-end">
                    {food.protein} g
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
